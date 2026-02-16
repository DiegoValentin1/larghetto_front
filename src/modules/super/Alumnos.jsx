import React, { useContext, useState, useEffect, Suspense, useRef } from 'react'
import DataTable from 'react-data-table-component';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaPlus, FaTrashAlt, FaEdit, FaRegMoneyBillAlt } from 'react-icons/fa'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { IoMdRepeat } from 'react-icons/io'
import { MdDeleteOutline } from "react-icons/md";
import "bootstrap/dist/css/bootstrap.min.css";
import AxiosClient from "../../shared/plugins/axios";
import Alert, { confirmTitle, confirmMsj } from "../../shared/plugins/alerts";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import '../../utils/styles/DataTable.css'
import { AddUserForm } from './SuperForms/AddAlumnoForm';
import { Edit } from 'feather-icons-react/build/IconComponents';
import { EditUserForm } from './SuperForms/EditAlumnoForm';
import { AlumnoInfo } from './Components/AlumnoInfo';
import { AuthContext } from '../auth/authContext';
import { BarLoader } from 'react-spinners';
import { SuperPagos } from './Components/SuperPagos';
import Modal from 'react-modal';
import { useInView } from 'react-intersection-observer';
import SolicitarBajaModal from './Components/SolicitarBajaModal';

const statusColors = [
    { color: "#A0A2A2", description: "Activo", estado: 1 },
    { color: "#F0BA14", description: "Nuevo", estado: 2 },
    { color: "#14F0B7", description: "Curso doble", estado: 3 },
    { color: "#40DC51", description: "Curso triple", estado: 4 },
    { color: "#ED2C75", description: "Curso cuadruple (Certificación)", estado: 5 },
    { color: "#1F175A", description: "Reingreso", estado: 6 },
    { color: "#DAE175", description: "Situación", estado: 7 },
    { color: "#702390", description: "Inglés", estado: 8 },
    { color: "rgb(220, 48, 48)", description: "Bajo", estado: 0 }
];



export default function Users() {
    const [selectedObject, setSelectedObject] = useState({});
    const [selectedStudentId, setSelectedStudentId] = useState(0);
    const [totalMensualidad, setTotalMensualidad] = useState(0);
    const [totalFaltantes, setTotalFaltantes] = useState(0);
    const [totalInscripciones, setTotalInscripciones] = useState(0);
    const [contador, setContador] = useState(0);
    const [totalClases, setTotalClases] = useState(0);
    const [superCampus, setSuperCampus] = useState(0);
    const [inner, setInner] = useState("");
    const [totalStatus, setTotalStatus] = useState({});
    const [showStatusMenu, setShowStatusMenu] = useState(null); // Guarda el ID del alumno con menú abierto
    const [showFilter, setShowFilter] = useState(false);
    const [switchActivo, setSwitchActivo] = useState(true);
    const [switchCampus, setSwitchCampus] = useState(false);
    const [cargando, setCargando] = useState(false);
    const [isInitialLoad, setIsInitialLoad] = useState(true); // Solo para carga inicial
    const { user } = useContext(AuthContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalDescription, setModalDescription] = useState("");

    // Estados para modal de solicitud de baja
    const [showSolicitudBajaModal, setShowSolicitudBajaModal] = useState(false);
    const [alumnoParaBaja, setAlumnoParaBaja] = useState(null);

    // Estados para infinite scroll
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const searchTimeoutRef = useRef(null);
    const isLoadingRef = useRef(false); // Flag para evitar llamadas múltiples
    const { ref: loadMoreRef, inView } = useInView({
        threshold: 0.5,
        triggerOnce: false
    });

    const openModal = (description) => {
        setModalDescription(description);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalDescription("");
    };
    const columns = [
        {
            name: 'Matricula',
            selector: 'matricula',
            sortable: true,
        },
        {
            name: 'Nombre',
            selector: 'name',
            sortable: true,
        },
        {
            name: 'Mensualidad',
            selector: (row) => row.mensualidad && (row.mensualidad - (row.mensualidad * (row.descuento / 100))).toLocaleString('en', { maximumFractionDigits: 2, minimumFractionDigits: 2 }),
            sortable: true,
        },
        {
            name: 'Inscripción',
            selector: (row) => row.inscripcion && row.inscripcion.toLocaleString('en', { maximumFractionDigits: 2, minimumFractionDigits: 2 }),
            sortable: true,
        },
        {
            name: 'Próximo Pago',
            selector: (row) => { return row.proximo_pago ? row.proximo_pago.substring(0, 10) : '' },
            sortable: true,
        },
        {
            name: 'Pago del Mes',
            selector: (row) => {
                if (!row.proximo_pago) return <div>N/A</div>;
                // Normalizar ambas fechas a solo YYYY-MM-DD sin horas
                const hoy = new Date().setHours(0, 0, 0, 0);
                const vencimiento = new Date(row.proximo_pago).setHours(0, 0, 0, 0);
                return hoy <= vencimiento ? <div>✅</div> : <div>✖️</div>;
            },
            sortable: true,
        },
        (user.data.role === 'SUPER' || switchCampus) &&
        {
            name: 'Campus',
            selector: row => row.campus.charAt(0).toUpperCase() + row.campus.slice(1),
            sortable: true,
        },
        {
            name: 'Status',
            selector: 'estado',
            sortable: true,
            cell: (row) => {
                if (row.estado == 1) {
                    return <div style={{ marginLeft: "0.8rem", backgroundColor: "#A0A2A2", padding: "0.2rem", borderRadius: "0.5rem", width: "1rem", height: "1rem" }}></div>;
                }
                else if (row.estado == 2) {
                    return <div style={{ marginLeft: "0.8rem", backgroundColor: "#F0BA14", padding: "0.2rem", borderRadius: "0.5rem", width: "1rem", height: "1rem" }}></div>;
                } else if (row.estado == 3) {
                    return <div style={{ marginLeft: "0.8rem", backgroundColor: "#14F0B7", padding: "0.2rem", borderRadius: "0.5rem", width: "1rem", height: "1rem" }}></div>;
                } else if (row.estado == 4) {
                    return <div style={{ marginLeft: "0.8rem", backgroundColor: "#40DC51", padding: "0.2rem", borderRadius: "0.5rem", width: "1rem", height: "1rem" }}></div>;
                } else if (row.estado == 5) {
                    return <div style={{ marginLeft: "0.8rem", backgroundColor: "#ED2C75", padding: "0.2rem", borderRadius: "0.5rem", width: "1rem", height: "1rem" }}></div>;
                } else if (row.estado == 6) {
                    return <div style={{ marginLeft: "0.8rem", backgroundColor: "#1F175A", padding: "0.2rem", borderRadius: "0.5rem", width: "1rem", height: "1rem" }}></div>;
                } else if (row.estado == 7) {
                    return <div style={{ marginLeft: "0.8rem", backgroundColor: "#DAE175", padding: "0.2rem", borderRadius: "0.5rem", width: "1rem", height: "1rem" }}></div>;
                } else if (row.estado == 8) {
                    return <div style={{ marginLeft: "0.8rem", backgroundColor: "#702390", padding: "0.2rem", borderRadius: "0.5rem", width: "1rem", height: "1rem" }}></div>;
                } else if (row.estado == 0) {
                    return <div style={{ marginLeft: "0.8rem", backgroundColor: "rgb(220, 48, 48)", padding: "0.2rem", borderRadius: "0.5rem", width: "1rem", height: "1rem" }}></div>;
                }
            }
        },
        {
            name: '',
            cell: (row) => (
                <div style={{ width: "100%", display: "flex", justifyContent: "end", position: "relative" }}>
                    {(row.estado == 0 && (user.data.role === 'SUPER' || (user.data.campus === 'bugambilias' && user.data.role === 'ENCARGADO'))) && <div style={{ paddingRight: "10px" }}>
                        <MdDeleteOutline className='DataIcon' onClick={async () => {
                            await eliminateStudent(row.user_id, row.personal_id);
                        }} style={{ height: 24, width: 25, marginBottom: 0 }} />
                    </div>}
                    <div style={{ paddingRight: "10px" }}>
                        <AiOutlineInfoCircle className='DataIcon' onClick={async () => {

                            setSelectedObject(row);
                            setIdUser(row.user_id);
                            console.log(row);
                            console.log(selectedObject);
                            setIsInfo(true);
                        }} style={{ height: 24, width: 25, marginBottom: 0 }} />
                    </div>
                    <div style={{ paddingRight: "0px" }}>
                        <FaEdit className='DataIcon' onClick={() => {

                            setSelectedObject(row);
                            console.log(row);
                            console.log(selectedObject);
                            setIsEditting(true);
                        }} style={{ height: 20, width: 25, marginBottom: 0 }} />
                    </div>
                    <div style={{ paddingLeft: 10, position: "relative" }}>
                        <IoMdRepeat className='DataIcon' onClick={(e) => {
                            e.stopPropagation();
                            // TODOS los roles pueden ver el menú de status
                            setSelectedStudentId(row.alu_id);
                            setAlumnoParaBaja({
                                id: row.user_id,
                                nombre: row.name
                            });
                            setShowStatusMenu(showStatusMenu === row.alu_id ? null : row.alu_id);
                        }} style={{ height: 20, width: 25, marginBottom: 0 }} />

                        {/* Menú de status como tooltip */}
                        {showStatusMenu === row.alu_id && (
                            <div style={{
                                position: "absolute",
                                right: '0',
                                top: '100%',
                                marginTop: '0.5rem',
                                zIndex: 1000,
                                backgroundColor: "#ffffff",
                                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
                                borderRadius: "0.8rem",
                                padding: '0.75rem',
                                minWidth: '22rem'
                            }} onClick={(e) => e.stopPropagation()}>
                                {/* Título del tooltip */}
                                <div style={{
                                    fontSize: '0.875rem',
                                    fontWeight: '600',
                                    color: '#374151',
                                    marginBottom: '0.75rem',
                                    paddingBottom: '0.5rem',
                                    borderBottom: '1px solid #E5E7EB'
                                }}>
                                    Cambiar estatus de {row.name}
                                </div>

                                {/* Grid de status */}
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(9, 1fr)',
                                    gap: '0.5rem'
                                }}>
                                <div title="Activo" className="StatusMenuOption" style={{ backgroundColor: "#A0A2A2", borderRadius: "0.5rem", cursor: 'pointer', width: '1.8rem', height: '1.8rem', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'} onClick={() => { setShowStatusMenu(null); changeStatus(row.alu_id, 1); }}></div>
                                <div title="Nuevo" className="StatusMenuOption" style={{ backgroundColor: "#F0BA14", borderRadius: "0.5rem", cursor: 'pointer', width: '1.8rem', height: '1.8rem', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'} onClick={() => { setShowStatusMenu(null); changeStatus(row.alu_id, 2); }}></div>
                                <div title="Curso Doble" className="StatusMenuOption" style={{ backgroundColor: "#14F0B7", borderRadius: "0.5rem", cursor: 'pointer', width: '1.8rem', height: '1.8rem', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'} onClick={() => { setShowStatusMenu(null); changeStatus(row.alu_id, 3); }}></div>
                                <div title="Curso Triple" className="StatusMenuOption" style={{ backgroundColor: "#40DC51", borderRadius: "0.5rem", cursor: 'pointer', width: '1.8rem', height: '1.8rem', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'} onClick={() => { setShowStatusMenu(null); changeStatus(row.alu_id, 4); }}></div>
                                <div title="Curso Cuádruple" className="StatusMenuOption" style={{ backgroundColor: "#ED2C75", borderRadius: "0.5rem", cursor: 'pointer', width: '1.8rem', height: '1.8rem', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'} onClick={() => { setShowStatusMenu(null); changeStatus(row.alu_id, 5); }}></div>
                                <div title="Reingreso" className="StatusMenuOption" style={{ backgroundColor: "#1F175A", borderRadius: "0.5rem", cursor: 'pointer', width: '1.8rem', height: '1.8rem', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'} onClick={() => { setShowStatusMenu(null); changeStatus(row.alu_id, 6); }}></div>
                                <div title="Situación" className="StatusMenuOption" style={{ backgroundColor: "#DAE175", borderRadius: "0.5rem", cursor: 'pointer', width: '1.8rem', height: '1.8rem', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'} onClick={() => { setShowStatusMenu(null); changeStatus(row.alu_id, 7); }}></div>
                                <div title="Inglés" className="StatusMenuOption" style={{ backgroundColor: "#702390", borderRadius: "0.5rem", cursor: 'pointer', width: '1.8rem', height: '1.8rem', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'} onClick={() => { setShowStatusMenu(null); changeStatus(row.alu_id, 8); }}></div>
                                {(((user.data.role === "RECEPCION" || user.data.role === "ENCARGADO") && new Date().getDate() < 15) || (user.data.role === "ENCARGADO" && user.data.campus === 'bugambilias') || (user.data.role === "SUPER")) &&
                                    <div title="Bajo" className="StatusMenuOption" style={{ backgroundColor: "rgb(220, 48, 48)", borderRadius: "0.5rem", cursor: 'pointer', width: '1.8rem', height: '1.8rem', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'} onClick={() => {
                                        setShowStatusMenu(null);
                                        if (user.data.role === 'RECEPCION') {
                                            setShowSolicitudBajaModal(true);
                                        } else {
                                            changeStatus(row.alu_id, 0);
                                        }
                                    }}></div>
                                }
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ),
        },
    ];




    const [isEditing, setIsEditting] = useState(false);
    const [isInfo, setIsInfo] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isSuperPagos, setIsSuperPagos] = useState(false);
    const [datos, setDatos] = useState([]);
    const [filtrados, setFiltrados] = useState([]);
    const [pagosMes, setPagosMes] = useState(0);
    const [idUser, setIdUser] = useState();

    // Trigger loadMore cuando el usuario llega al final (solo cuando inView cambia a true)
    useEffect(() => {
        const loadMore = async () => {
            // Verificaciones para evitar bucle infinito
            if (!inView) return;
            if (!hasMore) return;
            if (isLoadingMore) return;
            if (searchQuery) return;
            if (isLoadingRef.current) return; // Evitar llamadas múltiples

            console.log('🔄 Cargando más alumnos desde offset:', offset);
            isLoadingRef.current = true;
            setIsLoadingMore(true);

            try {
                await cargarDatos(false);
            } catch (error) {
                console.error('Error cargando más:', error);
            } finally {
                setIsLoadingMore(false);
                isLoadingRef.current = false;
            }
        };

        loadMore();
    }, [inView]); // Solo depende de inView

    const handleInputChange = (event) => {
        if (!event) {
            setShowFilter(false);
            setSearchQuery('');
            const imp = document.getElementById('inputFilter');
            if (imp) imp.value = "";
            // Resetear y cargar desde inicio
            cargarDatos(true);
            return
        }

        const valorInput = event.target.value;
        setShowFilter(valorInput.length === 0 ? false : true);

        // Limpiar timeout anterior
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        // Si el input está vacío, limpiar búsqueda inmediatamente
        if (valorInput.length === 0) {
            setSearchQuery('');
            setDatos([]);
            setOffset(0);
            setHasMore(true);

            // Cargar INMEDIATAMENTE todos los alumnos (sin esperar al estado)
            const campusParam = (switchCampus || superCampus === 0 && user.data.role === "SUPER") ?
                null : (superCampus === 1 ? "centro" :
                    (superCampus === 2 ? "bugambilias" :
                        (superCampus === 3 ? "cuautla" :
                            (superCampus === 4 ? "CDMX" : user.data.campus))));

            const url = `/personal/lazy?offset=0&limit=100${campusParam ? `&campus=${campusParam}` : ''}`;

            AxiosClient({ url, method: "GET" })
                .then(response => {
                    if (!response.error) {
                        setDatos(response);
                        setHasMore(response.length >= 100);
                        setOffset(response.length >= 100 ? 100 : 0);
                    }
                })
                .catch(err => console.error('Error al cargar:', err));

            return;
        }

        // CORRECCIÓN: Actualizar searchQuery y usar valorInput directamente en el setTimeout
        setSearchQuery(valorInput);
        console.log('Buscando:', valorInput);

        // Usar valorInput directamente (no depender del estado searchQuery que es asíncrono)
        searchTimeoutRef.current = setTimeout(() => {
            console.log('Ejecutando búsqueda con:', valorInput);
            setDatos([]);
            setOffset(0);
            setHasMore(true);

            // Construir URL directamente con valorInput
            const campusParam = (switchCampus || superCampus === 0 && user.data.role === "SUPER") ?
                null : (superCampus === 1 ? "centro" :
                    (superCampus === 2 ? "bugambilias" :
                        (superCampus === 3 ? "cuautla" :
                            (superCampus === 4 ? "CDMX" : user.data.campus))));

            const url = `/personal/search?q=${encodeURIComponent(valorInput)}&offset=0&limit=100${campusParam ? `&campus=${campusParam}` : ''}`;

            AxiosClient({ url, method: "GET" })
                .then(response => {
                    if (!response.error) {
                        setDatos(response);
                        setHasMore(response.length >= 100);
                        setOffset(response.length >= 100 ? 100 : 0);
                    }
                })
                .catch(err => console.error('Error en búsqueda:', err));
        }, 300);
    }

    useEffect(() => {
        const fetchMaterial = async () => {
            const response = await AxiosClient({
                method: "GET",
                url: (switchCampus || superCampus === 0 && user.data.role === "SUPER") ?
                    "/stats/pagos/suma/total" : (superCampus === 1 ?
                        "/stats/pagos/suma/centro" :
                        (superCampus === 2 ? "/stats/pagos/suma/bugambilias" :
                            (superCampus === 3 ? "/stats/pagos/suma/cuautla" :
                                (superCampus === 4 ? "/stats/pagos/suma/CDMX" : "/stats/pagos/suma/" + user.data.campus)))),
            });
            if (!response.error) {
                console.log(response);
                console.log(response[0]['total_pagado']);
                setPagosMes(response[0]['total_pagado']);
            }
        };
        fetchMaterial();
    }, [switchCampus, superCampus]);

    useEffect(() => {
        const fetchMaterial = async () => {
            const response = await AxiosClient({
                method: "GET",
                url: (switchCampus || superCampus === 0 && user.data.role === "SUPER") ?
                    "/stats/pagos/total/mensualidades" : (superCampus === 1 ?
                        "/stats/pagos/total/mensualidades/centro" :
                        (superCampus === 2 ? "/stats/pagos/total/mensualidades/bugambilias" :
                            (superCampus === 3 ? "/stats/pagos/total/mensualidades/cuautla" :
                                (superCampus === 4 ? "/stats/pagos/total/mensualidades/CDMX" : "/stats/pagos/total/mensualidades/" + user.data.campus)))),
            });
            if (!response.error) {
                console.log(response);
                console.log(response[0]['total_mensualidad']);
                setTotalMensualidad(response[0]['total_mensualidad']);
            }
        };
        fetchMaterial();
    }, [switchCampus, superCampus]);

    useEffect(() => {
        const fetchMaterial = async () => {
            const response = await AxiosClient({
                method: "GET",
                url: (switchCampus || superCampus === 0 && user.data.role === "SUPER") ?
                    "/stats/pagos/falta/total/" : (superCampus === 1 ?
                        "/stats/pagos/falta/centro" :
                        (superCampus === 2 ? "/stats/pagos/falta/bugambilias" :
                            (superCampus === 3 ? "/stats/pagos/falta/cuautla" :
                                (superCampus === 4 ? "/stats/pagos/falta/CDMX" : "/stats/pagos/falta/" + user.data.campus)))),
            });
            console.log(response);
            if (!response.error) {
                console.log(response);
                console.log(response[0]['lol']);
                setTotalFaltantes(response[0]['lol']);
            }
        };
        fetchMaterial();
    }, [switchCampus, superCampus]);

    useEffect(() => {
        const fetchMaterial = async () => {
            const response = await AxiosClient({
                method: "GET",
                url: (switchCampus || superCampus === 0 && user.data.role === "SUPER") ?
                    "/stats/pagos/total/inscripciones/" : (superCampus === 1 ?
                        "/stats/pagos/total/inscripciones/centro" :
                        (superCampus === 2 ? "/stats/pagos/total/inscripciones/bugambilias" :
                            (superCampus === 3 ? "/stats/pagos/total/inscripciones/cuautla" :
                                (superCampus === 4 ? "/stats/pagos/total/inscripciones/CDMX" : "/stats/pagos/total/inscripciones/" + user.data.campus)))),
            });
            if (!response.error) {
                console.log(response);
                console.log(response[0]['total_inscripciones']);
                setTotalInscripciones(response[0]['total_inscripciones']);
            }
        };
        fetchMaterial();
    }, [switchCampus, superCampus]);

    useEffect(() => {
        const fetchMaterial = async () => {
            const response = await AxiosClient({
                method: "GET",
                url: (switchCampus || superCampus === 0 && user.data.role === "SUPER") ?
                    "/instrumento/clases/total/" : (superCampus === 1 ?
                        "/instrumento/clases/total/centro" :
                        (superCampus === 2 ? "/instrumento/clases/total/bugambilias" :
                            (superCampus === 3 ? "/instrumento/clases/total/cuautla" :
                                (superCampus === 4 ? "/instrumento/clases/total/CDMX" : "/instrumento/clases/total/" + user.data.campus)))),
            });
            if (!response.error) {
                console.log(response);
                console.log(response[0]['count(*)']);
                setTotalClases(response[0]['count(*)']);
            }
        };
        fetchMaterial();
    }, [switchCampus, superCampus]);

    const changeStatus = async (id, estado) => {
        console.log(id, estado);
        try {
            const response = await AxiosClient({
                url: "/personal/alumno/eliminar",
                method: "PUT",
                data: JSON.stringify({ id: id, estado: estado })
            });
            if (!response.error) {
                Alert.fire({
                    title: "EXITO",
                    text: "Cambio de Status Exitoso",
                    icon: "success",
                });
                await cargarDatos(true);
            }
        } catch (err) {
            Alert.fire({
                title: "VERIFICAR DATOS",
                text: "asdasdas",
                icon: "error",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Aceptar",
            });
            console.log(err);
        }
    }

    const eliminateStudent = async (uid, pid) => {
        console.log(uid, pid);
        return Alert.fire({
            title: confirmTitle,
            text: confirmMsj,
            icon: "warning",
            confirmButtonColor: "#009574",
            confirmButtonText: "Aceptar",
            cancelButtonColor: '#DD6B55',
            cancelButtonText: 'Cancelar',
            reverseButtons: true,
            backdrop: true,
            showCancelButton: true,
            showLoaderOnConfirm: true,
            allowOutsideClick: () => !Alert.isLoading,
            preConfirm: async () => {
                try {
                    const response = await AxiosClient({
                        url: `/personal/alumno/${uid}/${pid}`,
                        method: "DELETE"
                    });
                    if (!response.error) {
                        Alert.fire({
                            title: "EXITO",
                            text: "Alumno Eliminado Exitosamente",
                            icon: "success",
                        });
                        await cargarDatos(true);
                    }
                } catch (err) {
                    Alert.fire({
                        title: "VERIFICAR DATOS",
                        text: "Error Al Eliminar Alumno",
                        icon: "error",
                        confirmButtonColor: "#3085d6",
                        confirmButtonText: "Aceptar",
                    });
                    console.log(err);
                }
            }
        });

    }

    const cargarDatos = async (reset = false) => {
        // Solo mostrar loading en toda la tabla si es reset (carga inicial o cambio de filtros)
        if (reset) {
            setIsInitialLoad(true);
        }

        try {
            // Reset para cuando cambian filtros
            const currentOffset = reset ? 0 : offset;
            if (reset) {
                setDatos([]);
                setOffset(0);
                setHasMore(true);
            }

            // Determinar campus según filtros
            const campusParam = (switchCampus || superCampus === 0 && user.data.role === "SUPER") ?
                null : (superCampus === 1 ? "centro" :
                    (superCampus === 2 ? "bugambilias" :
                        (superCampus === 3 ? "cuautla" :
                            (superCampus === 4 ? "CDMX" : user.data.campus))));

            // Cargar alumnos con infinite scroll
            const url = searchQuery ?
                `/personal/search?q=${encodeURIComponent(searchQuery)}&offset=${currentOffset}&limit=100${campusParam ? `&campus=${campusParam}` : ''}` :
                `/personal/lazy?offset=${currentOffset}&limit=100${campusParam ? `&campus=${campusParam}` : ''}`;

            const response = await AxiosClient({
                url: url,
                method: "GET",
            });

            console.log('Alumnos cargados:', response.length);

            if (!response.error) {
                if (reset) {
                    setDatos(response);
                } else {
                    setDatos(prev => [...prev, ...response]);
                }

                // Si retorna menos de 100, ya no hay más
                if (response.length < 100) {
                    setHasMore(false);
                } else {
                    setOffset(currentOffset + 100);
                }

                // Cargar conteo de status desde backend
                const statusUrl = `/personal/status-count${campusParam ? `?campus=${campusParam}` : ''}`;
                const statusResponse = await AxiosClient({
                    url: statusUrl,
                    method: "GET",
                });
                setTotalStatus(statusResponse);
            }
        } catch (err) {
            Alert.fire({
                title: "VERIFICAR DATOS",
                text: "Error al cargar datos",
                icon: "error",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Aceptar",
            });
            console.log(err);
        } finally {
            // SIEMPRE poner isInitialLoad en false al terminar (éxito o error)
            setIsInitialLoad(false);
            setCargando(true);
        }
    }


    useEffect(() => {
        cargarDatos(true);
    }, []);

    useEffect(() => {
        cargarDatos(true);
    }, [switchCampus, superCampus]);

    // Estilos personalizados para DataTable
    const customTableStyles = {
        headRow: {
            style: {
                backgroundColor: '#F3F4F6',
                borderBottom: '2px solid #E5E7EB',
                minHeight: '52px',
            },
        },
        headCells: {
            style: {
                color: '#1F2937',
                fontSize: '0.875rem',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                paddingLeft: '1rem',
                paddingRight: '1rem',
            },
        },
        rows: {
            style: {
                minHeight: '60px',
                fontSize: '0.875rem',
                color: '#1F2937',
                borderBottom: '1px solid #E5E7EB',
                transition: 'background-color 0.2s ease',
                '&:nth-of-type(odd)': {
                    backgroundColor: '#FFFFFF',
                },
                '&:nth-of-type(even)': {
                    backgroundColor: '#F9FAFB',
                },
            },
            highlightOnHoverStyle: {
                backgroundColor: '#F3F4F6',
                borderBottomColor: '#D1D5DB',
                outline: '1px solid #E5E7EB',
            },
        },
        cells: {
            style: {
                paddingLeft: '1rem',
                paddingRight: '1rem',
            },
        },
        pagination: {
            style: {
                borderTop: '1px solid #E5E7EB',
                backgroundColor: '#FFFFFF',
                minHeight: '56px',
            },
            pageButtonsStyle: {
                borderRadius: '8px',
                height: '36px',
                width: '36px',
                padding: '8px',
                margin: '0 4px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                backgroundColor: 'transparent',
                color: '#6B7280',
                fill: '#6B7280',
                '&:disabled': {
                    cursor: 'not-allowed',
                    color: '#D1D5DB',
                    fill: '#D1D5DB',
                },
                '&:hover:not(:disabled)': {
                    backgroundColor: '#F3F4F6',
                    color: '#1F2937',
                },
                '&:focus': {
                    outline: 'none',
                },
            },
        },
    };

    return (
        <>
        <Container fluid className="p-4" style={{ minHeight: '92vh' }}>
            {/* FASE 2: KPIs con Cards Responsivas */}
            <Row className="mb-4 g-3">
                {/* Card 1: Total Mensualidad */}
                <Col xl={3} lg={6} md={6} sm={12}>
                    <Card style={{
                        borderLeft: '4px solid #2563EB',
                        borderRadius: '12px',
                        border: '1px solid #E5E7EB',
                        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                        height: '100%'
                    }}>
                        <Card.Body style={{ padding: '1.25rem' }}>
                            <div style={{
                                fontSize: '0.75rem',
                                color: '#6B7280',
                                fontWeight: '600',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                marginBottom: '0.5rem'
                            }}>
                                Total Mensualidad
                            </div>
                            <div style={{
                                fontSize: '1.75rem',
                                fontWeight: '700',
                                color: '#1F2937'
                            }}>
                                ${totalMensualidad ? totalMensualidad.toLocaleString('en', { maximumFractionDigits: 2 }) : 0}
                            </div>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Card 2: Pagos Obtenidos */}
                <Col xl={3} lg={6} md={6} sm={12}>
                    <Card style={{
                        borderLeft: '4px solid #10B981',
                        borderRadius: '12px',
                        border: '1px solid #E5E7EB',
                        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                        height: '100%'
                    }}>
                        <Card.Body style={{ padding: '1.25rem' }}>
                            <div style={{
                                fontSize: '0.75rem',
                                color: '#6B7280',
                                fontWeight: '600',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                marginBottom: '0.5rem'
                            }}>
                                Pagos Obtenidos
                            </div>
                            <div style={{
                                fontSize: '1.75rem',
                                fontWeight: '700',
                                color: '#10B981'
                            }}>
                                ${pagosMes ? pagosMes.toLocaleString('en', { maximumFractionDigits: 2 }) : 0}
                            </div>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Card 3: Pagos Faltantes */}
                <Col xl={3} lg={6} md={6} sm={12}>
                    <Card style={{
                        borderLeft: '4px solid #EF4444',
                        borderRadius: '12px',
                        border: '1px solid #E5E7EB',
                        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                        height: '100%'
                    }}>
                        <Card.Body style={{ padding: '1.25rem' }}>
                            <div style={{
                                fontSize: '0.75rem',
                                color: '#6B7280',
                                fontWeight: '600',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                marginBottom: '0.5rem'
                            }}>
                                Pagos Faltantes
                            </div>
                            <div style={{
                                fontSize: '1.75rem',
                                fontWeight: '700',
                                color: '#EF4444'
                            }}>
                                ${totalFaltantes ? totalFaltantes.toLocaleString('en', { maximumFractionDigits: 2 }) : 0}
                            </div>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Card 4: Inscripciones */}
                <Col xl={3} lg={6} md={6} sm={12}>
                    <Card style={{
                        borderLeft: '4px solid #F59E0B',
                        borderRadius: '12px',
                        border: '1px solid #E5E7EB',
                        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                        height: '100%'
                    }}>
                        <Card.Body style={{ padding: '1.25rem' }}>
                            <div style={{
                                fontSize: '0.75rem',
                                color: '#6B7280',
                                fontWeight: '600',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                marginBottom: '0.5rem'
                            }}>
                                Inscripciones
                            </div>
                            <div style={{
                                fontSize: '1.75rem',
                                fontWeight: '700',
                                color: '#F59E0B'
                            }}>
                                ${totalInscripciones ? totalInscripciones.toLocaleString('en', { maximumFractionDigits: 2 }) : 0}
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Icono de SuperPagos (solo SUPER) */}
            {user.data.role === "SUPER" && (
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
                    <FaRegMoneyBillAlt
                        onClick={() => setIsSuperPagos(true)}
                        style={{
                            height: "32px",
                            width: "32px",
                            color: "#2563EB",
                            cursor: 'pointer',
                            transition: 'color 0.2s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#1D4ED8'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#2563EB'}
                    />
                </div>
            )}

            {/* FASE 3: Leyenda de Status y Total Cursos */}
            <Row className="mb-3 align-items-center">
                <Col xs={12}>
                    <div style={{
                        display: 'flex',
                        gap: '1rem',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        {/* Leyenda de Status */}
                        <div style={{
                            display: 'flex',
                            gap: '1rem',
                            flexWrap: 'wrap',
                            alignItems: 'center'
                        }}>
                            {statusColors.map((status, index) => (
                                <div
                                    key={index}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => Alert.fire({
                                        title: <div style={{ color: status.color }}>{status.description}</div>,
                                        text: "",
                                        icon: "info",
                                        confirmButtonColor: "#3085d6",
                                        confirmButtonText: "Aceptar",
                                    })}
                                >
                                    <div style={{
                                        backgroundColor: status.color,
                                        width: '18px',
                                        height: '18px',
                                        borderRadius: '4px',
                                        boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                                    }} />
                                    <span style={{
                                        fontSize: '0.875rem',
                                        fontWeight: '600',
                                        color: '#374151'
                                    }}>
                                        {totalStatus[status.estado] || "0"}
                                    </span>
                                    <span style={{
                                        fontSize: '0.75rem',
                                        color: '#6B7280'
                                    }}>
                                        {status.description}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Total Cursos - Badge pequeño */}
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: '#FFFFFF',
                            padding: '0.5rem 1rem',
                            borderRadius: '20px',
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            boxShadow: '0 2px 4px rgba(102, 126, 234, 0.3)'
                        }}>
                            <span style={{ opacity: 0.9 }}>Total Cursos:</span>
                            <span style={{ fontSize: '1.125rem', fontWeight: '700' }}>{totalClases}</span>
                        </div>
                    </div>
                </Col>
            </Row>

            {/* FASE 4: DataTable en Card */}
            <Card style={{
                borderRadius: '16px',
                border: 'none',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden'
            }}>
                <Card.Body className="p-0">
                    <DataTable
                        customStyles={customTableStyles}
                        title={
                            <div style={{ padding: '1.5rem' }}>
                                {/* Primera fila: Título y Switches de filtros */}
                                <div style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: "1rem",
                                    alignItems: "center",
                                    marginBottom: "1rem"
                                }}>
                                    <div style={{
                                        fontSize: "1.5rem",
                                        fontWeight: "700",
                                        color: "#1F2937",
                                        flex: "1 1 auto",
                                        minWidth: "120px"
                                    }}>
                                        Alumnos
                                    </div>

                                    {(user.data.campus === 'bugambilias' && user.data.role === 'ENCARGADO') && (
                                        <div
                                            className={`switch ${switchCampus ? "switchonC" : "switchoffC"}`}
                                            onClick={() => setSwitchCampus(!switchCampus)}
                                            style={{
                                                borderRadius: '10px',
                                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                                overflow: 'hidden'
                                            }}
                                        >
                                            <div className={`onoff ${switchCampus ? "" : "switchinactivoC"} `}>Centro</div>
                                            <div className={`onoff ${switchCampus ? "switchactivoC" : ""}`}>Todos</div>
                                        </div>
                                    )}

                                    {(user.data.role === 'SUPER') && (
                                        <div
                                            className={`switch switchonC`}
                                            style={{
                                                backgroundColor: "rgb(79, 79, 190)",
                                                borderRadius: '10px',
                                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                                overflow: 'hidden'
                                            }}
                                        >
                                            <div className={`onoff ${superCampus === 0 && "switchactivoC"}`} onClick={() => setSuperCampus(0)}>Todos</div>
                                            <div className={`onoff ${superCampus === 1 && "switchactivoC"}`} onClick={() => setSuperCampus(1)}>Centro</div>
                                            <div className={`onoff ${superCampus === 2 && "switchactivoC"}`} onClick={() => setSuperCampus(2)}>Bugambilias</div>
                                            <div className={`onoff ${superCampus === 3 && "switchactivoC"}`} onClick={() => setSuperCampus(3)}>Cuautla</div>
                                            <div className={`onoff ${superCampus === 4 && "switchactivoC"}`} onClick={() => setSuperCampus(4)}>CDMX</div>
                                        </div>
                                    )}

                                    <div
                                        className={`switch ${switchActivo ? "switchon" : "switchoff"}`}
                                        onClick={() => setSwitchActivo(!switchActivo)}
                                        style={{
                                            borderRadius: '10px',
                                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                            overflow: 'hidden'
                                        }}
                                    >
                                        <div className={`onoff ${switchActivo ? "switchactivo" : ""} `}>Activo</div>
                                        <div className={`onoff ${switchActivo ? "" : "switchinactivo"}`}>Inactivo</div>
                                    </div>
                                </div>

                                {/* Segunda fila: Búsqueda y Agregar alumno */}
                                <div style={{
                                    display: "flex",
                                    gap: "0.75rem",
                                    alignItems: "center",
                                    justifyContent: "flex-end",
                                    position: "relative"
                                }}>
                                    <input
                                        id='inputFilter'
                                        className='inputSearch'
                                        type="text"
                                        placeholder="Buscar por matrícula o nombre..."
                                        style={{
                                            width: "320px",
                                            maxWidth: "100%",
                                            height: "42px",
                                            borderRadius: "10px",
                                            border: "2px solid #E5E7EB",
                                            backgroundColor: "#F9FAFB",
                                            padding: "0 1rem",
                                            fontSize: "0.875rem",
                                            transition: "all 0.2s ease",
                                            outline: "none"
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = '#2563EB';
                                            e.target.style.backgroundColor = '#FFFFFF';
                                            e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = '#E5E7EB';
                                            e.target.style.backgroundColor = '#F9FAFB';
                                            e.target.style.boxShadow = 'none';
                                        }}
                                        onChange={(event) => handleInputChange(event)}
                                    />

                                    <div
                                        onClick={() => setIsOpen(true)}
                                        style={{
                                            height: 42,
                                            width: 42,
                                            borderRadius: '10px',
                                            backgroundColor: '#2563EB',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                            boxShadow: '0 2px 4px rgba(37, 99, 235, 0.3)',
                                            flexShrink: 0
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = '#1D4ED8';
                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                            e.currentTarget.style.boxShadow = '0 4px 6px rgba(37, 99, 235, 0.4)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = '#2563EB';
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = '0 2px 4px rgba(37, 99, 235, 0.3)';
                                        }}
                                    >
                                        <FeatherIcon
                                            icon={'user-plus'}
                                            style={{
                                                height: 20,
                                                width: 20,
                                                color: '#FFFFFF'
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        }
                        columns={columns}
                        data={switchActivo ? datos.filter(item => item.estado !== 0) : datos.filter(item => item.estado === 0)}
                        highlightOnHover
                        defaultSortFieldId={4}
                        pagination={false}
                        progressPending={isInitialLoad}
                    />

                    {/* Indicador de carga para infinite scroll */}
                    {!searchQuery && hasMore && datos.length > 0 && cargando && (
                        <div
                            ref={loadMoreRef}
                            style={{
                                padding: '1rem',
                                textAlign: 'center',
                                color: '#6B7280',
                                fontSize: '0.875rem',
                                backgroundColor: '#F9FAFB',
                                borderTop: '1px solid #E5E7EB'
                            }}
                        >
                            {isLoadingMore ? 'Cargando más alumnos...' : 'Scroll para cargar más'}
                        </div>
                    )}

                    {!hasMore && !searchQuery && datos.length > 0 && (
                        <div
                            style={{
                                padding: '1rem',
                                textAlign: 'center',
                                color: '#9CA3AF',
                                fontSize: '0.875rem',
                                backgroundColor: '#F9FAFB',
                                borderTop: '1px solid #E5E7EB'
                            }}
                        >
                            No hay más alumnos para mostrar
                        </div>
                    )}
                </Card.Body>
            </Card>

            {/* Backdrop para cerrar menú al click afuera */}
            {showStatusMenu && (
                <div
                    onClick={() => setShowStatusMenu(null)}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 999,
                        backgroundColor: 'transparent'
                    }}
                />
            )}
        </Container>









            {/* Modales */}
            {isOpen && <AddUserForm isOpen={isOpen} cargarDatos={cargarDatos} onClose={() => setIsOpen(false)} />}
            {isEditing && <EditUserForm isOpen={isEditing} cargarDatos={cargarDatos} onClose={() => setIsEditting(false)} objeto={selectedObject} />}
            {isInfo && <AlumnoInfo isOpen={isInfo} objeto={selectedObject} onClose={() => setIsInfo(false)} />}
            {isSuperPagos && <SuperPagos isOpen={isSuperPagos} objeto={selectedObject} onClose={() => setIsSuperPagos(false)} />}

            {/* Modal de Solicitud de Baja */}
            <SolicitarBajaModal
                show={showSolicitudBajaModal}
                onHide={() => setShowSolicitudBajaModal(false)}
                alumnoId={alumnoParaBaja?.id}
                alumnoNombre={alumnoParaBaja?.nombre}
                onSuccess={() => cargarDatos()}
            />
        </>
    )
}

