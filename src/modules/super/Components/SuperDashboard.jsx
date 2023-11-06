import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component';
import { FaPlus, FaTrashAlt, FaEdit } from 'react-icons/fa'
import "bootstrap/dist/css/bootstrap.min.css";
import Alert from "../../../shared/plugins/alerts";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import AxiosClient from "../../../shared/plugins/axios";
import '../../../utils/styles/SuperDashboard.css'
import { ChartAlumnos } from './Charts/ChartAlumnos';
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'




export default function SuperDashboard() {
    const [selectedObject, setSelectedObject] = useState({});
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
            name: 'Domicilio',
            selector: 'domicilio',
            sortable: true,
        },
        {
            name: 'Fecha de Inicio',
            selector: (row) => row.fecha_inicio ? row.fecha_inicio.substring(0, 10) : "",
            sortable: true,
        },
        {
            name: 'C. de Domicilio',
            selector: 'comprobante',
            sortable: true,
            cell: (row) => {
                if (row.comprobante) {
                    return <div style={{ marginLeft: "0.8rem", backgroundColor: "#40DC51", padding: "0.2rem", borderRadius: "0.5rem", width: "1rem", height: "1rem" }}></div>;
                } else {
                    return <div style={{ marginLeft: "0.8rem", backgroundColor: "#DC3030", padding: "0.2rem", borderRadius: "0.5rem", width: "1rem", height: "1rem" }}></div>;
                }
            }
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
            cell: (row) => (
                <div style={{ width: "100%", display: "flex", justifyContent: "end" }}>
                    <div style={{ paddingRight: 10 }}>
                        <FaEdit className='DataIcon' onClick={() => {

                            setSelectedObject(row);
                            setIsEditting(true);
                        }} style={{ height: 20, width: 25, marginBottom: 0 }} />
                    </div>
                    {
                        row.status ? (<div style={{ paddingLeft: 10 }}>
                            <FaTrashAlt className='DataIcon' onClick={() => {
                                changeStatus(row.user_id);
                            }} style={{ height: 20, width: 25, marginBottom: 0 }} />
                        </div>) : (
                            <div style={{ paddingLeft: 10 }}>
                                <FaPlus className='DataIcon' onClick={() => {
                                    changeStatus(row.user_id);
                                }} style={{ height: 20, width: 25, marginBottom: 0 }} />
                            </div>
                        )
                    }

                </div>
            ),
        },
    ];


    const [isEditing, setIsEditting] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [alumnosActivos, setAlumnosActivos] = useState(0);
    const [logs, setLogs] = useState([]);

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

    const cargarDatos = async () => {
        try {
            const response = await AxiosClient({
                url: "/personal/alumno/activos",
                method: "GET",
            });
            console.log(response);
            if (!response.error) {
                setAlumnosActivos(response[0].alumnosActivos);
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
    const cargarLogs = async () => {
        try {
            const response = await AxiosClient({
                url: "/instrumento/lastest",
                method: "GET",
            });
            console.log(response);
            if (!response.error) {
                setLogs(response);
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
        cargarLogs();
        cargarDatos();
    }, []);

    return (
        < >
            <div style={{ justifyContent: 'ceneter', alignItems: "center", backgroundColor: "transparent", height: "92vh", padding: 20 }}>
                <div>
                    <div className="App">
                        <div className="ContainerCharts DashboardContainer">
                            <div className="DashboardTitle">Estadísticas</div>
                            <div className="ChartBox">
                                <div className="ChartContainer" onClick={() => setIsOpen(true)}>
                                    <Bar data={{ labels: ["Agosto", "Septiembre", "Octubre"], datasets: [{ label: "Alumnos Inscritos", data: [4, 5, alumnosActivos] }] }} />
                                </div>
                                <div className="ChartContainer">
                                    {/* <Bar data={{ labels: ["Junio", "Julio", "Agosto"], datasets: [{ label: "Alumnos Inscritos", data: [215, 211, 213] }] }} /> */}
                                </div>
                                <div className="ChartContainer"></div>
                            </div>
                        </div>
                        <div className="ContainerLogs DashboardContainer">
                            <div className="DashboardTitle">Logs</div>
                            <div className="ChartBox">
                                <div className="ChartContainer" style={{padding:"0.5rem"}}>
                                    <div style={{fontSize:"14px"}}>{`${logs[0] ? logs[0].fecha.substring(0,10) : ""}  ${logs[0] ?logs[0].autor : ""} ${logs[0] ?logs[0].accion : ""}`} </div>
                                    <div style={{fontSize:"14px"}}>{`${logs[1] ? logs[1].fecha.substring(0,10) : ""}  ${logs[1] ?logs[1].autor : ""}  ${logs[1] ?logs[1].accion : ""}`}</div>
                                    <div style={{fontSize:"14px"}}>{`${logs[2] ? logs[2].fecha.substring(0,10) : ""}  ${logs[2] ?logs[2].autor : ""}  ${logs[2] ?logs[2].accion : ""}`}</div>
                                    <div style={{fontSize:"14px"}}>{`${logs[3] ? logs[3].fecha.substring(0,10) : ""}  ${logs[3] ?logs[3].autor : ""}  ${logs[3] ?logs[3].accion : ""}`}</div>
                                </div>
                                <div className="ChartContainer"></div>
                                <div className="ChartContainer"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <ChartAlumnos alumnosActivos={alumnosActivos} isOpen={isOpen} cargarDatos={cargarDatos} onClose={() => setIsOpen(false)} />
            {/* <EditMaestroForm isOpen={isEditing} cargarDatos={cargarDatos} onClose={() => setIsEditting(false)} objeto={selectedObject}/> */}
        </>

    )
}
