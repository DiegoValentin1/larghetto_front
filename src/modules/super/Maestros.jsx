import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component';
import { Container, Card } from 'react-bootstrap';
import { FaPlus, FaTrashAlt, FaEdit, FaArchive } from 'react-icons/fa'
import { MdDeleteForever } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import AxiosClient from "../../shared/plugins/axios";
import Alert from "../../shared/plugins/alerts";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import '../../utils/styles/DataTable.css'
import { AddTeeForm } from './SuperForms/AddTeeForm';
import { EditTeeForm } from './SuperForms/EditTeeForm';
import { AddMaestroForm } from './SuperForms/AddMaestroForm';
import { EditMaestroForm } from './SuperForms/EditMaestroForm';
import { AiOutlineBarChart } from 'react-icons/ai'
import { MaestroChart } from './SuperForms/MaestroChart';
import { MaestroClases } from './Components/MaestroClases';
import { GrSchedule } from "react-icons/gr";




export default function SuperMaterialesTee() {
    const navigate = useNavigate();
    useEffect(() => {
        console.log("Activoooo");
    }, []);
    const [selectedObject, setSelectedObject] = useState({});
    const session = JSON.parse(localStorage.getItem('user') || null);
    const columns = [
        {
            name: 'Nombre',
            selector: 'name',
            sortable: true
        },
        {
            name: 'Email',
            selector: 'email',
            sortable: true,
        },
        {
            name: 'Telefono',
            selector: 'telefono',
            sortable: true,
        },
        {
            name: 'Fecha de Inicio',
            selector: (row) => row.fecha_inicio ? row.fecha_inicio.substring(0, 10) : "",
            sortable: true,
        },
        session.data.role === 'SUPER' &&
        {
            name: 'Campus',
            selector: row => row.campus.charAt(0).toUpperCase() + row.campus.slice(1),
            sortable: true,
        },
        {
            name: 'Status',
            selector: 'status',
            sortable: true,
            cell: (row) => {
                if (row.status) {
                    return <div style={{ marginLeft: "0.8rem", backgroundColor: "#40DC51", padding: "0.2rem", borderRadius: "0.5rem", width: "1rem", height: "1rem" }}></div>;
                } else {
                    return <div style={{ marginLeft: "0.8rem", backgroundColor: "#DC3030", padding: "0.2rem", borderRadius: "0.5rem", width: "1rem", height: "1rem" }}></div>;
                }
            }
        },
        {
            name: '',
            cell: (row) => session.data.role === 'RECEPCION' ? (
                <div style={{ width: "100%", display: "flex", justifyContent: "end" }}>
                    <div style={{ paddingRight: 10 }}>
                        <GrSchedule className='DataIcon' onClick={() => {
                            setSelectedObject(row);
                            setIsClases(true);
                        }} style={{ height: 25, width: 25, marginBottom: 0 }} />
                    </div>
                </div>
            ) : 
            (
                <div style={{ width: "100%", display: "flex", justifyContent: "end" }}>
                    {/* <div style={{ paddingRight: 10 }}>
                        <AiOutlineBarChart className='DataIcon' onClick={() => {
                            setSelectedObject(row);
                            setIsChart(true);
                        }} style={{ height: 25, width: 25, marginBottom: 0 }} />
                    </div> */}
                    <div style={{ paddingRight: 10 }}>
                        <GrSchedule className='DataIcon' onClick={() => {
                            setSelectedObject(row);
                            setIsClases(true);
                        }} style={{ height: 25, width: 25, marginBottom: 0 }} />
                    </div>
                    <div style={{ paddingRight: 10 }}>
                        <FaEdit className='DataIcon' onClick={() => {

                            setSelectedObject(row);
                            filtrarInstrumentos(instrumentosMaestros.filter(objeto => objeto.maestro_id === row.user_id))

                            setIsEditting(true);
                        }} style={{ height: 25, width: 25, marginBottom: 0 }} />
                    </div>
                    <div style={{ paddingLeft: 10 }}>
                        <FaArchive className='DataIcon' onClick={() => {
                            archivarMaestro(row.user_id, row.name);
                        }} style={{ height: 25, width: 25, marginBottom: 0, color: '#f59e0b' }} title="Archivar maestro" />
                    </div>

                </div>
            ),
        },
    ];

const filtrarInstrumentos = (lista) => {
    setMaestroInstrumentos(lista);
}


const [isEditing, setIsEditting] = useState(false);
const [isChart, setIsChart] = useState(false);
const [isClases, setIsClases] = useState(false);
const [isOpen, setIsOpen] = useState(false);
const [datos, setDatos] = useState([]);
const [instrumentosMaestros, setInstrumentosMaestros] = useState([]);
const [maestroInstrumentos, setMaestroInstrumentos] = useState([]);
const [filtrados, setFiltrados] = useState([]);
const [showFilter, setShowFilter] = useState(false);


const archivarMaestro = async (id, nombre) => {
    Alert.fire({
        title: '¿Archivar Maestro?',
        html: `
            <p><strong>Maestro:</strong> ${nombre}</p>
            <p>El maestro será movido a la sección de "Archivados" y no aparecerá en la lista principal.</p>
            <p style="font-size: 0.875rem; color: #6c757d;">Podrás restaurarlo más tarde desde la vista de Archivados.</p>
        `,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#f59e0b',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, archivar',
        cancelButtonText: 'Cancelar'
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const response = await AxiosClient({
                    url: `/personal/teacher/permanente/${id}`,
                    method: "DELETE",
                });

                if (response.archived) {
                    Alert.fire({
                        title: "Maestro Archivado",
                        html: `
                            <p>${response.message}</p>
                            ${response.registros_historicos > 0 ? `
                                <p><strong>Registros históricos preservados:</strong> ${response.registros_historicos}</p>
                                <ul style="text-align: left; font-size: 0.875rem; color: #6c757d;">
                                    ${response.detalles.map(d => `<li>${d}</li>`).join('')}
                                </ul>
                            ` : ''}
                        `,
                        icon: "success",
                    });

                    // Limpiar búsqueda y recargar DIRECTAMENTE del servidor
                    const inputBusqueda = document.getElementById('inputFilter');
                    if (inputBusqueda) {
                        inputBusqueda.value = '';
                    }
                    setShowFilter(false);

                    // Petición directa al servidor (sin depender de estados)
                    AxiosClient({
                        url: '/personal/teacher',
                        method: 'GET'
                    }).then(response => {
                        if (!response.error) {
                            // Filtrar por campus si no es SUPER
                            const responseCamp = session.data.role === 'SUPER'
                                ? response
                                : response.filter(item => item.campus === session.data.campus);
                            setDatos(responseCamp);
                            setFiltrados([]);
                        }
                    }).catch(err => console.error('Error al recargar:', err));
                }
            } catch (err) {
                Alert.fire({
                    title: "ERROR",
                    text: err.response?.data?.message || "Error al procesar la eliminación",
                    icon: "error",
                });
                console.log(err);
            }
        }
    });
};

const changeStatus = async (id) => {
    try {
        const response = await AxiosClient({
            url: "/personal/" + id,
            method: "DELETE",
        });
        if (!response.error) {
            Alert.fire({
                title: "EXITO",
                text: "Cambio de Status Exitoso",
                icon: "success",
            });
            cargarDatos();
        }
    } catch (err) {
        Alert.fire({
            title: "VERIFICAR DATOS",
            text: "",
            icon: "error",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Aceptar",
        });
        console.log(err);
    }
}

const handleInputChange = (event) => {
    if (!event) {
        setShowFilter(false);
        const imp = document.getElementById('inputFilter');
        if (imp) imp.value = "";
        return
    }
    const valorInput = event.target.value;
    setShowFilter(valorInput.lenght === 0 ? false : true)
    console.log('Valor actual del input:', valorInput);
    setFiltrados(datos.filter(item => {
        return (
            (item.name && item.name.toLowerCase().includes(valorInput.toLowerCase()))
        );
    }));
}

const cargarDatos = async () => {
    try {
        const response = await AxiosClient({
            url: "/personal/teacher",
            method: "GET",
        });
        console.log(response);
        if (!response.error) {
            const responseCamp = session.data.role === 'SUPER' ? response : response.filter(item => item.campus === session.data.campus);
            setDatos(responseCamp);
        }
    } catch (err) {
        Alert.fire({
            title: "VERIFICAR DATOS",
            text: "USUARIO Y/O CONTRASEÑA INCORRECTOS",
            icon: "error",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Aceptar",
        });
        console.log(err);
    }
}

useEffect(() => {
    const fetchMaterial = async () => {
        const response = await AxiosClient({
            method: "GET",
            url: "/instrumento/teacher",
        });
        if (!response.error) {
            console.log(response)
            setInstrumentosMaestros(response);
            return response;
        }
    };
    fetchMaterial();
}, [isEditing, isOpen]);


useEffect(() => {
    cargarDatos();
}, []);

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
                                {/* Primera fila: Título */}
                                <div style={{
                                    display: "flex",
                                    alignItems: "center",
                                    marginBottom: "1rem"
                                }}>
                                    <div style={{
                                        fontSize: "1.5rem",
                                        fontWeight: "700",
                                        color: "#1F2937",
                                        flex: "1 1 auto"
                                    }}>
                                        Maestros
                                    </div>
                                </div>

                                {/* Segunda fila: Búsqueda y Agregar */}
                                <div style={{
                                    display: "flex",
                                    gap: "0.75rem",
                                    alignItems: "center",
                                    justifyContent: "flex-end"
                                }}>
                                    <input
                                        id='inputFilter'
                                        className='inputSearch'
                                        type="text"
                                        placeholder="Buscar por nombre..."
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

                                    {/* Botón Ver Archivados - Solo SUPER y ENCARGADO */}
                                    {(session.data.role === 'SUPER' || session.data.role === 'ENCARGADO') && (
                                        <div
                                            onClick={() => navigate('/maestros-archivados')}
                                            style={{
                                                height: 42,
                                                width: 42,
                                                borderRadius: '10px',
                                                backgroundColor: '#6B7280',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s ease',
                                                boxShadow: '0 2px 4px rgba(107, 114, 128, 0.3)',
                                                flexShrink: 0
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.backgroundColor = '#4B5563';
                                                e.currentTarget.style.transform = 'translateY(-2px)';
                                                e.currentTarget.style.boxShadow = '0 4px 6px rgba(107, 114, 128, 0.4)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.backgroundColor = '#6B7280';
                                                e.currentTarget.style.transform = 'translateY(0)';
                                                e.currentTarget.style.boxShadow = '0 2px 4px rgba(107, 114, 128, 0.3)';
                                            }}
                                            title="Ver Maestros Archivados"
                                        >
                                            <FaArchive
                                                style={{
                                                    height: 18,
                                                    width: 18,
                                                    color: '#FFFFFF'
                                                }}
                                            />
                                        </div>
                                    )}

                                    {session.data.role !== 'RECEPCION' && (
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
                                                icon={'plus'}
                                                style={{
                                                    height: 20,
                                                    width: 20,
                                                    color: '#FFFFFF'
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        }
                        columns={columns}
                        data={showFilter ? filtrados : datos}
                        highlightOnHover
                    />
                </Card.Body>
            </Card>
        </Container>

        {/* Modales */}
        {isOpen && <AddMaestroForm isOpen={isOpen} cargarDatos={cargarDatos} onClose={() => setIsOpen(false)} />}
        {isEditing && <EditMaestroForm isOpen={isEditing} cargarDatos={cargarDatos} onClose={() => setIsEditting(false)} objeto={selectedObject} maIn={maestroInstrumentos} />}
        {isChart && <MaestroChart isOpen={isChart} cargarDatos={cargarDatos} onClose={() => setIsChart(false)} objeto={selectedObject} />}
{isClases && <MaestroClases isOpen={isClases} cargarDatos={cargarDatos} onClose={() => setIsClases(false)} objeto={selectedObject} />}
    </>
)
}
