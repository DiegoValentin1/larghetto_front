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
    const [isEditing, setIsEditting] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [alumnosActivos, setAlumnosActivos] = useState(0);
    const [centro, setCentro] = useState([]);
    const [buga, setBuga] = useState([]);
    const [cuautla, setCuautla] = useState([]);
    const [total, setTotal] = useState([]);
    const [actual, setActual] = useState([]);
    const [diasAnio, setDiasAnio] = useState(['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']);
    const [logs, setLogs] = useState([]);
    const [titulo, setTitulo] = useState('');

    const procesarLista = (listaOriginal) => {
        let totalesPorMes = {};

        listaOriginal.forEach(item => {
            let fecha = new Date(item.fecha);
            let mes = fecha.getMonth() + 1;
            let total = parseInt(item.total);

            if (!totalesPorMes[mes]) {
                totalesPorMes[mes] = 0;
            }
            totalesPorMes[mes] += total;
        });

        let mesesDelAnio = [];
        let totalesOrdenados = [];

        for (let i = 1; i <= 12; i++) {
            let mesNombre = new Date(2023, i - 1, 1).toLocaleString('default', { month: 'long' });
            let total = totalesPorMes[i - 1] || 0;

            mesesDelAnio.push(mesNombre);
            totalesOrdenados.push(total);
        }

        return totalesOrdenados;
    };

    const ordenarLista = (listaOriginal) => {
        // Crear un objeto para almacenar los totales
        let totalesPorCampus = {
            centro: 0,
            bugambilias: 0,
            cuautla: 0
        };
    
        // Calcular los totales de acuerdo a la lista original
        listaOriginal.forEach(item => {
            totalesPorCampus[item.campus] = item.total;
        });
    
        // Obtener la lista de totales
        let totales = [
            totalesPorCampus.centro,
            totalesPorCampus.bugambilias,
            totalesPorCampus.cuautla
        ];
    
        // Obtener el total general
        let totalGeneral = totales.reduce((acc, curr) => acc + curr, 0);
        totales.push(totalGeneral);
    
        return totales;
    };

    const cargarCentro = async (mactu, total) => {
        try {
            const response = await AxiosClient({
                url: "/stats/centro/",
                method: "GET",
            });
            console.log(response);
            if (!response.error) {
                let temp = procesarLista(response);
                temp[mactu] = total;
                setCentro(temp);
                console.log(temp)
            }
        } catch (err) {
            console.log(err);
        }
    }

    const cargarBuga = async (mactu, total) => {
        try {
            const response = await AxiosClient({
                url: "/stats/buga/",
                method: "GET",
            });
            console.log(response);
            if (!response.error) {
                let temp = procesarLista(response);
                temp[mactu] = total;
                setBuga(temp);
                console.log(temp)
            }
        } catch (err) {
            console.log(err);
        }
    }

    const cargarCuautla = async (mactu, total) => {
        try {
            const response = await AxiosClient({
                url: "/stats/cuautla/",
                method: "GET",
            });
            console.log(response);
            if (!response.error) {
                let temp = procesarLista(response);
                temp[mactu] = total;
                setCuautla(temp);
                console.log(temp)
            }
        } catch (err) {
            console.log(err);
        }
    }

    const cargarTotal = async (mactu, total) => {
        try {
            const response = await AxiosClient({
                url: "/stats/total/",
                method: "GET",
            });
            console.log(response);
            if (!response.error) {
                let temp = procesarLista(response);
                temp[mactu] = total;
                setTotal(temp);
                console.log(temp)
            }
        } catch (err) {
            console.log(err);
        }
    }

    const cargarActual = async () => {
        try {
            const response = await AxiosClient({
                url: "/stats/actual/",
                method: "GET",
            });
            console.log(response);
            if (!response.error) {
                let fechaActual = new Date();
                let mactu = fechaActual.getMonth();
                const ordenada = ordenarLista(response);
                console.log(ordenada);
                cargarCentro(mactu, ordenada[0]);
                cargarBuga(mactu, ordenada[1]);
                cargarCuautla(mactu, ordenada[2]);
                cargarTotal(mactu, ordenada[3]);
            }
        } catch (err) {
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
        cargarActual();
    }, []);

    return (
        < >
            <div style={{ justifyContent: 'ceneter', alignItems: "center", backgroundColor: "transparent", height: "92vh", padding: 20 }}>
                <div>
                    <div className="App">
                        <div className="ContainerCharts DashboardContainer">
                            <div className="DashboardTitle">
                                <div>Centro</div>
                                <div>Bugambilias</div>
                                <div>Cuautla</div>
                            </div>
                            <div className="ChartBox">
                                <div className="ChartContainer" onClick={() => { setIsOpen(true); setTitulo('Registro de Alumnos Centro'); setSelectedObject(centro) }}>
                                    <Bar data={{ labels: diasAnio, datasets: [{ label: "Alumnos Inscritos", data: centro && centro }] }} />
                                </div>
                                <div className="ChartContainer" onClick={() => { setIsOpen(true); setTitulo('Registro de Alumnos Bugambilias'); setSelectedObject(buga) }}>
                                    <Bar data={{ labels: diasAnio, datasets: [{ label: "Alumnos Inscritos", data: buga && buga }] }} />
                                </div>
                                <div className="ChartContainer" onClick={() => { setIsOpen(true); setTitulo('Registro de Alumnos Cuautla'); setSelectedObject(cuautla) }}>
                                    <Bar data={{ labels: diasAnio, datasets: [{ label: "Alumnos Inscritos", data: cuautla && cuautla }] }} />
                                </div>
                            </div>
                        </div>
                        <div className="ContainerLogs DashboardContainer">
                            <div className="DashboardTitle">
                                <div>Larghetto</div>
                                <div></div>
                                <div>Cambios Recientes</div>
                            </div>
                            <div className="ChartBox">
                                <div className="ChartContainer" onClick={() => { setIsOpen(true); setTitulo('Registro de Alumnos Larghetto'); setSelectedObject(total) }}>
                                    <Bar data={{ labels: diasAnio, datasets: [{ label: "Alumnos Inscritos", data: total && total }] }} />
                                </div>
                                <div className="ChartContainer">
                                    {/* <Bar data={{ labels: diasAnio, datasets: [{ label: "Alumnos Inscritos", data: [215, 211, 213] }] }} /> */}
                                </div>
                                <div className="ChartContainer" style={{ padding: "0.5rem" }}>
                                    <div style={{ fontSize: "14px" }}>{`${logs[0] ? logs[0].fecha.substring(0, 10) : ""}  ${logs[0] ? logs[0].autor : ""} ${logs[0] ? logs[0].accion : ""}`} </div>
                                    <div style={{ fontSize: "14px" }}>{`${logs[1] ? logs[1].fecha.substring(0, 10) : ""}  ${logs[1] ? logs[1].autor : ""}  ${logs[1] ? logs[1].accion : ""}`}</div>
                                    <div style={{ fontSize: "14px" }}>{`${logs[2] ? logs[2].fecha.substring(0, 10) : ""}  ${logs[2] ? logs[2].autor : ""}  ${logs[2] ? logs[2].accion : ""}`}</div>
                                    <div style={{ fontSize: "14px" }}>{`${logs[3] ? logs[3].fecha.substring(0, 10) : ""}  ${logs[3] ? logs[3].autor : ""}  ${logs[3] ? logs[3].accion : ""}`}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <ChartAlumnos alumnosActivos={selectedObject} isOpen={isOpen} onClose={() => setIsOpen(false)} titulo={titulo} />
            {/* <EditMaestroForm isOpen={isEditing} cargarDatos={cargarDatos} onClose={() => setIsEditting(false)} objeto={selectedObject}/> */}
        </>

    )
}
