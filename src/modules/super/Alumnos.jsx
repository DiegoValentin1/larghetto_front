import React, { useContext, useState, useEffect, Suspense } from 'react'
import DataTable from 'react-data-table-component';
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
    const [showStatusMenu, setShowStatusMenu] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [switchActivo, setSwitchActivo] = useState(true);
    const [switchCampus, setSwitchCampus] = useState(false);
    const [cargando, setCargando] = useState(false);
    const { user } = useContext(AuthContext);
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
            selector: (row) => (new Date() < new Date(row.proximo_pago)) ? <div>✅</div> : <div>✖️</div>,
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
                <div style={{ width: "100%", display: "flex", justifyContent: "end" }}>
                    {(row.estado == 0 && (user.data.role === 'SUPER' || (user.data.campus === 'centro' && user.data.role === 'ENCARGADO'))) && <div style={{ paddingRight: "10px" }}>
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
                    <div style={{ paddingLeft: 10 }}>
                        <IoMdRepeat className='DataIcon' onClick={() => {
                            setSelectedStudentId(row.alu_id)
                            setShowStatusMenu(!showStatusMenu);
                        }} style={{ height: 20, width: 25, marginBottom: 0 }} />
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
                (item.matricula && item.matricula.toLowerCase().includes(valorInput.toLowerCase())) ||
                (item.name && item.name.toLowerCase().includes(valorInput.toLowerCase()))
            );
        }));
    }

    useEffect(() => {
        const fetchMaterial = async () => {
            const response = await AxiosClient({
                method: "GET",
                url: (switchCampus || superCampus === 0 && user.data.role==="SUPER") ?
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
                url: (switchCampus || superCampus === 0 && user.data.role==="SUPER") ?
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
                url: (switchCampus || superCampus === 0 && user.data.role==="SUPER") ?
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
                url: (switchCampus || superCampus === 0 && user.data.role==="SUPER") ?
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
                url: (switchCampus || superCampus === 0 && user.data.role==="SUPER") ?
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
                await cargarDatos();
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
                        await cargarDatos();
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

    const cargarDatos = async () => {
        setCargando(false);
        try {
            const response = await AxiosClient({
                url: (switchCampus || superCampus === 0 && user.data.role==="SUPER") ?
                    "/personal/" : (superCampus === 1 ?
                        "/personal/getalumno/centro" :
                        (superCampus === 2 ? "/personal/getalumno/bugambilias" :
                            (superCampus === 3 ? "/personal/getalumno/cuautla" : 
                            (superCampus === 4 ? "/personal/getalumno/CDMX" : "/personal/getalumno/" + user.data.campus)
                            ))),
                method: "GET",
            });
            console.log(response);
            if (!response.error) {
                console.log(response);
                const responseCamp = response;
                setDatos(responseCamp);
                // setTotalMensualidad(await responseCamp.reduce((acum, item) => {
                //     var temp = item.estado !== 0 ? acum + (item.mensualidad - (item.mensualidad * (item.descuento / 100))) : acum + 0;
                //     return temp;

                // }, 0));
                // console.log(responseCamp.reduce((acum, item) => { return acum + (item.mensualidad - (item.mensualidad * (item.descuento / 100))) }, 0));
                setTotalStatus(responseCamp.reduce((contador, item) => {
                    const estado = item.estado;
                    if (contador[estado] !== undefined) {
                        contador[estado]++;
                    } else {
                        contador[estado] = 1;
                    }
                    return contador;
                }, {}));
                console.log(responseCamp.reduce((contador, item) => {
                    const estado = item.estado;
                    if (contador[estado] !== undefined) {
                        contador[estado]++;
                    } else {
                        contador[estado] = 1;
                    }
                    return contador;
                }, {}))
                handleInputChange(null);
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

        setCargando(true);
    }


    const aplicarEstilosAlSiguienteDiv = () => {
        const div1 = document.querySelector('.sc-kgTSHT');
        const div2 = div1 && div1.nextElementSibling;
        if (div1) {
            console.log(div1)
            div1.style.overflowY = 'scroll';
            div1.style.height = "80%";
        }
    };
    useEffect(() => {

        cargarDatos();
    }, []);

    useEffect(() => {

        cargarDatos();
    }, [switchCampus, superCampus]);

    useEffect(() => { aplicarEstilosAlSiguienteDiv(); });

    return (
        < >
            <div style={{ justifyContent: 'ceneter', alignItems: "center", backgroundColor: "transparent", height: "92vh", padding: 20 }}>
                <div>
                    <div className="App">
                        <div style={{ display: "flex", flexDirection: "row", height: "7%", width: "100%" }}>
                            <div style={{ width: "70%", height: "100%", display: "grid", gridTemplateColumns:"1fr 1fr 1fr 1fr 1fr"}}>
                                <div style={{ width: "100%", height: "50%", display: "flex", alignItems: "center", fontSize: "13px", marginRight: "3rem", flexDirection: "column" }}>
                                    <div style={{ fontSize: "clamp(8px, 1vw, 13px)", height: "90%" }}>Total Mensualidad</div>
                                    <div>${totalMensualidad ? totalMensualidad.toLocaleString('en', { maximumFractionDigits: 2 }) : 0}</div>
                                </div>
                                <div style={{ width: "100%", height: "50%", display: "flex", alignItems: "center", fontSize: "13px", marginRight: "3rem", flexDirection: "column", color: "green" }}>
                                    <div style={{ fontSize: "clamp(8px, 1vw, 13px)", height: "90%" }}>Pagos Obtenidos </div>
                                    {/* <div style={{ fontSize: "clamp(6px, 1vw, 10px)", height: "90%" }}>({new Date().toLocaleString('es', { month: 'long' }).toUpperCase()})</div> */}
                                    <div style={{ color: "green" }}>${pagosMes ? pagosMes.toLocaleString('en', { maximumFractionDigits: 2 }) : 0}</div>
                                </div>
                                <div style={{ width: "100%", height: "50%", display: "flex", alignItems: "center", fontSize: "13px", marginRight: "3rem", flexDirection: "column", color: "red" }}>
                                    <div style={{ fontSize: "clamp(8px, 1vw, 13px)", height: "90%" }}>Pagos Faltantes</div>
                                    <div style={{ color: "red" }}>${totalFaltantes ? (totalFaltantes).toLocaleString('en', { maximumFractionDigits: 2 }) : 0}</div>
                                </div>
                                <div style={{ width: "100%", height: "50%", display: "flex", alignItems: "center", fontSize: "13px", marginRight: "3rem", flexDirection: "column", color: "#F0BA14" }}>
                                    <div style={{ fontSize: "clamp(8px, 1vw, 13px)", height: "90%" }}>Inscripciones</div>
                                    <div style={{ color: "#F0BA14" }}>${totalInscripciones ? totalInscripciones.toLocaleString('en', { maximumFractionDigits: 2 }) : 0}</div>
                                </div>
                                {user.data.role==="SUPER" && <div style={{ width: "100%", height: "100%", display: "grid", placeItems:"center" , fontSize: "13px", marginRight: "3rem" }}>
                                <FaRegMoneyBillAlt onClick={()=>setIsSuperPagos(true)} className='icon' style={{height:"30px", width:"30px", color:"black"}}/>
                                </div>}

                                {/* <div style={{ width: "auto", height: "50%", display: "flex", alignItems: "start", fontSize: "16px", marginRight: "3rem", flexDirection: "column" }}>
                                    <div style={{ fontSize: "11px", height: "70%" }}>Total Mensualidad</div>
                                    <div>${totalMensualidad ? totalMensualidad.toFixed(2) : 0}</div>
                                </div>
                                <div style={{ width: "auto", height: "50%", display: "flex", alignItems: "start", fontSize: "16px", marginRight: "3rem", flexDirection: "column" }}>
                                    <div style={{ fontSize: "11px", height: "70%" }}>Faltantes</div>
                                    <div>${totalMensualidad ? totalMensualidad.toFixed(2) : 0}</div>
                                </div> */}
                            </div>
                            <div style={{ width: "50%", height: "100%", display: "flex", flexDirection: "row", justifyContent: "start" }}>
                                <div className='statusMain'>
                                    <div
                                        style={{ backgroundColor: "#A0A2A2" }} className='statusButton'
                                    ></div>
                                    <div style={{ marginLeft: "0.15rem" }}>{totalStatus[1] ? totalStatus[1] : "0"}</div>
                                    <div
                                        style={{ backgroundColor: "#F0BA14" }} className='statusButton'></div>
                                    <div style={{ marginLeft: "0.15rem" }}>{totalStatus[2] ? totalStatus[2] : "0"}</div>
                                    <div
                                        style={{ backgroundColor: "#14F0B7" }} className='statusButton'
                                    ></div>
                                    <div style={{ marginLeft: "0.15rem" }}>{totalStatus[3] ? totalStatus[3] : "0"}</div>
                                    <div
                                        style={{ backgroundColor: "#40DC51" }} className='statusButton'
                                    ></div>
                                    <div style={{ marginLeft: "0.15rem" }}>{totalStatus[4] ? totalStatus[4] : "0"}</div>
                                    <div
                                        style={{ backgroundColor: "#ED2C75" }} className='statusButton'
                                    ></div>
                                    <div style={{ marginLeft: "0.15rem" }}>{totalStatus[5] ? totalStatus[5] : "0"}</div>
                                    <div
                                        style={{ backgroundColor: "#1F175A" }} className='statusButton'
                                    ></div>
                                    <div style={{ marginLeft: "0.15rem" }}>{totalStatus[6] ? totalStatus[6] : "0"}</div>
                                    <div
                                        style={{ backgroundColor: "#DAE175" }} className='statusButton'
                                    ></div>
                                    <div style={{ marginLeft: "0.15rem" }}>{totalStatus[7] ? totalStatus[7] : "0"}</div>
                                    <div
                                        style={{ backgroundColor: "#702390" }} className='statusButton'
                                    ></div>
                                    <div style={{ marginLeft: "0.15rem" }}>{totalStatus[8] ? totalStatus[8] : "0"}</div>
                                    <div
                                        style={{ backgroundColor: "rgb(220, 48, 48)" }} className='statusButton'
                                    ></div>
                                    <div style={{ marginLeft: "0.15rem" }}>{totalStatus[0] ? totalStatus[0] : "0"}</div>
                                </div>
                                <div className='statusTotalMain'>
                                    <div style={{ fontSize: "clamp(8px, 1vw, 13px)", height: "90%" }}>Total Cursos</div>
                                    <div>{totalClases}</div>
                                </div>
                            </div>
                        </div>
                        <DataTable


                            title={

                                <div style={{ display: "flex", flexDirection: "row" }}>

                                    <div style={{ width: "15%", paddingTop: 3 }}>
                                        Alumnos
                                    </div>

                                    {(user.data.campus === 'centro' && user.data.role === 'ENCARGADO') && <div style={{ width: "70%", height: "5vh", display: "flex", flexDirection: "row", justifyContent: "end", marginRight: "1rem" }}>
                                        <div className={`switch ${switchCampus ? "switchonC" : "switchoffC"}`} onClick={() => setSwitchCampus(!switchCampus)}>
                                            <div className={`onoff ${switchCampus ? "" : "switchinactivoC"} `}>Centro</div>
                                            <div className={`onoff ${switchCampus ? "switchactivoC" : ""}`}>Todos</div>
                                        </div>
                                    </div>}

                                    {(user.data.role === 'SUPER') && <div style={{ width: "70%", height: "5vh", display: "flex", flexDirection: "row", justifyContent: "end", marginRight: "1rem", marginBottom:"0.8rem" }}>
                                        <div className={`switch switchonC`} style={{backgroundColor:"rgb(79, 79, 190)"}}>
                                            <div className={`onoff ${superCampus === 0 && "switchactivoC"}`} onClick={() => setSuperCampus(0)}>Todos</div>
                                            <div className={`onoff ${superCampus === 1 && "switchactivoC"}`} onClick={() => setSuperCampus(1)}>Centro</div>
                                            <div className={`onoff ${superCampus === 2 && "switchactivoC"}`} onClick={() => setSuperCampus(2)}>Bugambilias</div>
                                            <div className={`onoff ${superCampus === 3 && "switchactivoC"}`} onClick={() => setSuperCampus(3)}>Cuautla</div>
                                            <div className={`onoff ${superCampus === 4 && "switchactivoC"}`} onClick={() => setSuperCampus(4)}>CDMX</div>
                                        </div>
                                    </div>}

                                    <div style={{ width: "70%", height: "5vh", display: "flex", flexDirection: "row", justifyContent: "end", marginRight: "1rem" }}>
                                        <div className={`switch ${switchActivo ? "switchon" : "switchoff"}`} onClick={() => setSwitchActivo(!switchActivo)}>
                                            <div className={`onoff ${switchActivo ? "switchactivo" : ""} `}>Activo</div>
                                            <div className={`onoff ${switchActivo ? "" : "switchinactivo"}`}>Inactivo</div>
                                        </div>
                                    </div>

                                    <input
                                        id='inputFilter'
                                        className='inputSearch'
                                        type="text"
                                        placeholder="Buscar..."
                                        style={{marginBottom:"0.4rem"}}
                                        onChange={(event) => handleInputChange(event)}
                                    />
                                    <div >
                                        <FeatherIcon className='DataIcon' icon={'user-plus'} onClick={() => setIsOpen(true)} style={{ height: 40, width: 40 }} />
                                    </div>



                                    {showStatusMenu && <div className='StatusMenu' style={{ position: "absolute", width: "20rem", height: "2rem", backgroundColor: "#f0f0f0", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)", borderRadius: "0.8rem", right: 100 }} onClick={() => setShowStatusMenu(false)}>
                                        <div className="StatusMenuOption" style={{ marginTop: "0.4rem", marginLeft: "0.6rem", backgroundColor: "#A0A2A2", padding: "0.6rem", borderRadius: "0.5rem", width: "1rem", height: "1rem" }} onClick={() => {
                                            changeStatus(selectedStudentId, 1);
                                        }}></div>
                                        <div className="StatusMenuOption" style={{ marginTop: "0.4rem", marginLeft: "0.6rem", backgroundColor: "#F0BA14", padding: "0.6rem", borderRadius: "0.5rem", width: "1rem", height: "1rem" }} onClick={() => {
                                            changeStatus(selectedStudentId, 2);
                                        }}></div>
                                        <div className="StatusMenuOption" style={{ marginTop: "0.4rem", marginLeft: "0.6rem", backgroundColor: "#14F0B7", padding: "0.6rem", borderRadius: "0.5rem", width: "1rem", height: "1rem" }} onClick={() => {
                                            changeStatus(selectedStudentId, 3);
                                        }}></div>
                                        <div className="StatusMenuOption" style={{ marginTop: "0.4rem", marginLeft: "0.6rem", backgroundColor: "#40DC51", padding: "0.6rem", borderRadius: "0.5rem", width: "1rem", height: "1rem" }} onClick={() => {
                                            changeStatus(selectedStudentId, 4);
                                        }}></div>
                                        <div className="StatusMenuOption" style={{ marginTop: "0.4rem", marginLeft: "0.6rem", backgroundColor: "#ED2C75", padding: "0.6rem", borderRadius: "0.5rem", width: "1rem", height: "1rem" }} onClick={() => {
                                            changeStatus(selectedStudentId, 5);
                                        }}></div>
                                        <div className="StatusMenuOption" style={{ marginTop: "0.4rem", marginLeft: "0.6rem", backgroundColor: "#1F175A", padding: "0.6rem", borderRadius: "0.5rem", width: "1rem", height: "1rem" }} onClick={() => {
                                            changeStatus(selectedStudentId, 6);
                                        }}></div>
                                        <div className="StatusMenuOption" style={{ marginTop: "0.4rem", marginLeft: "0.6rem", backgroundColor: "#DAE175", padding: "0.6rem", borderRadius: "0.5rem", width: "1rem", height: "1rem" }} onClick={() => {
                                            changeStatus(selectedStudentId, 7);
                                        }}></div>
                                        <div className="StatusMenuOption" style={{ marginTop: "0.4rem", marginLeft: "0.6rem", backgroundColor: "#702390", padding: "0.6rem", borderRadius: "0.5rem", width: "1rem", height: "1rem" }} onClick={() => {
                                            changeStatus(selectedStudentId, 8);
                                        }}></div>
                                        {
                                            (((user.data.role === "RECEPCION" || user.data.role === "ENCARGADO") && new Date().getDate() < 15) || (user.data.role === "ENCARGADO" && user.data.campus === 'centro') || (user.data.role === "SUPER") ) ?
                                                <div className="StatusMenuOption" style={{ marginTop: "0.4rem", marginLeft: "0.6rem", backgroundColor: "rgb(220, 48, 48)", padding: "0.6rem", borderRadius: "0.5rem", width: "1rem", height: "1rem" }} onClick={() => {
                                                    changeStatus(selectedStudentId, 0);
                                                }}></div> :
                                                ""
                                        }
                                    </div>}

                                </div>
                            }
                            columns={columns}
                            data={showFilter ?
                                (switchActivo ? filtrados.filter(item => item.estado !== 0) : filtrados.filter(item => item.estado === 0)) :
                                (switchActivo ? datos.filter(item => item.estado !== 0) : datos.filter(item => item.estado === 0))}
                            highlightOnHover
                            paginationPerPage={6}
                            paginationComponentOptions={{
                                rowsPerPageText: '',
                                noRowsPerPage: true,
                            }}
                            defaultSortFieldId={4}

                        />
                    </div>
                </div>
            </div >








            {isOpen && <AddUserForm isOpen={isOpen} cargarDatos={cargarDatos} onClose={() => setIsOpen(false)} />
            }
            {isEditing && <EditUserForm isOpen={isEditing} cargarDatos={cargarDatos} onClose={() => setIsEditting(false)} objeto={selectedObject} />}
            {isInfo && <AlumnoInfo isOpen={isInfo} objeto={selectedObject} onClose={() => setIsInfo(false)} />}
            {isSuperPagos && <SuperPagos isOpen={isSuperPagos} objeto={selectedObject} onClose={() => setIsSuperPagos(false)} />}
        </>

    )
}

