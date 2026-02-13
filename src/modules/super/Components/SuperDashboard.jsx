import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaPlus, FaTrashAlt, FaEdit } from 'react-icons/fa'
import "bootstrap/dist/css/bootstrap.min.css";
import Alert from "../../../shared/plugins/alerts";
import AxiosClient from "../../../shared/plugins/axios";
import { ChartAlumnos } from './Charts/ChartAlumnos';
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'
import { LogTable } from './Charts/LogTable';




export default function SuperDashboard() {
    const [selectedObject, setSelectedObject] = useState({});
    const [isEditing, setIsEditting] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isLog, setIsLog] = useState(false);
    const [alumnosActivos, setAlumnosActivos] = useState(0);
    const [centro, setCentro] = useState([]);
    const [buga, setBuga] = useState([]);
    const [cuautla, setCuautla] = useState([]);
    const [cdmx, setCdmx] = useState([]);
    const [total, setTotal] = useState([]);
    const [actual, setActual] = useState([]);
    const [diasAnio, setDiasAnio] = useState(['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']);
    const [logs, setLogs] = useState([]);
    const [titulo, setTitulo] = useState('');

    const procesarLista = (listaOriginal) => {
        let totalesPorMes = {};
        console.log(listaOriginal);
        listaOriginal.forEach(item => {
            let fecha = new Date(item.fecha);
            fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset() + 180);
            let mes = fecha.getMonth() + 1;
            let total = parseInt(item.total);

            if (!totalesPorMes[mes]) {
                totalesPorMes[mes] = 0;
            }
            totalesPorMes[mes] += total;
            console.log(totalesPorMes, fecha, mes, total);
        });

        let mesesDelAnio = [];
        let totalesOrdenados = [];
        const year = new Date().getFullYear();
        for (let i = 1; i <= 12; i++) {
            let mesNombre = new Date(year, i - 1, 1).toLocaleString('default', { month: 'long' });
            let total = totalesPorMes[i] || 0;
            console.log(i, mesNombre, total);

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
            cuautla: 0,
            CDMX:0
        };

        // Calcular los totales de acuerdo a la lista original
        listaOriginal.forEach(item => {
            totalesPorCampus[item.campus] = item.total;
        });

        // Obtener la lista de totales
        let totales = [
            totalesPorCampus.centro,
            totalesPorCampus.bugambilias,
            totalesPorCampus.cuautla,
            totalesPorCampus.CDMX,
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

    const cargarCDMX = async (mactu, total) => {
        try {
            const response = await AxiosClient({
                url: "/stats/cdmx/",
                method: "GET",
            });
            console.log(response);
            if (!response.error) {
                let temp = procesarLista(response);
                console.log(temp);
                temp[mactu] = total;
                console.log(temp, mactu, total);
                setCdmx(temp);
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
                console.log(temp);
                temp[mactu] = total;
                console.log(temp, mactu, total);
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
                cargarCDMX(mactu, ordenada[3])
                cargarTotal(mactu, ordenada[4]);
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



    const devolverFecha = (fecha) => {
        const opciones = {
            weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric',
            second: 'numeric', hour12: false, timeZone: 'America/Mexico_City'
        };
        const tempfecha = new Date(fecha);
        const fechaFormateada = new Intl.DateTimeFormat('es-ES', opciones).format(tempfecha);
        return fechaFormateada;
    }

    return (
        <>
            <Container fluid className="p-4" style={{ minHeight: '92vh' }}>
                {/* Primera fila de gráficos: Centro, Bugambilias, Cuautla */}
                <Row className="mb-4 g-3">
                    <Col lg={4} md={6} sm={12}>
                        <Card
                            style={{
                                borderRadius: '12px',
                                border: 'none',
                                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                overflow: 'hidden'
                            }}
                            onClick={() => { setIsOpen(true); setTitulo('Registro de Alumnos Centro'); setSelectedObject(centro) }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-4px)';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.1)';
                            }}
                        >
                            <Card.Header style={{
                                backgroundColor: '#1F2937',
                                color: '#FFFFFF',
                                fontWeight: '700',
                                fontSize: '1rem',
                                textAlign: 'center',
                                padding: '1rem',
                                borderBottom: 'none'
                            }}>
                                Centro
                            </Card.Header>
                            <Card.Body style={{ padding: '1rem' }}>
                                <Bar data={{ labels: diasAnio, datasets: [{ label: "Alumnos Inscritos", data: centro && centro, backgroundColor: '#FF6384' }] }} />
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col lg={4} md={6} sm={12}>
                        <Card
                            style={{
                                borderRadius: '12px',
                                border: 'none',
                                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                overflow: 'hidden'
                            }}
                            onClick={() => { setIsOpen(true); setTitulo('Registro de Alumnos Bugambilias'); setSelectedObject(buga) }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-4px)';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.1)';
                            }}
                        >
                            <Card.Header style={{
                                backgroundColor: '#1F2937',
                                color: '#FFFFFF',
                                fontWeight: '700',
                                fontSize: '1rem',
                                textAlign: 'center',
                                padding: '1rem',
                                borderBottom: 'none'
                            }}>
                                Bugambilias
                            </Card.Header>
                            <Card.Body style={{ padding: '1rem' }}>
                                <Bar data={{ labels: diasAnio, datasets: [{ label: "Alumnos Inscritos", data: buga && buga, backgroundColor: '#36A2EB' }] }} />
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col lg={4} md={6} sm={12}>
                        <Card
                            style={{
                                borderRadius: '12px',
                                border: 'none',
                                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                overflow: 'hidden'
                            }}
                            onClick={() => { setIsOpen(true); setTitulo('Registro de Alumnos Cuautla'); setSelectedObject(cuautla) }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-4px)';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.1)';
                            }}
                        >
                            <Card.Header style={{
                                backgroundColor: '#1F2937',
                                color: '#FFFFFF',
                                fontWeight: '700',
                                fontSize: '1rem',
                                textAlign: 'center',
                                padding: '1rem',
                                borderBottom: 'none'
                            }}>
                                Cuautla
                            </Card.Header>
                            <Card.Body style={{ padding: '1rem' }}>
                                <Bar data={{ labels: diasAnio, datasets: [{ label: "Alumnos Inscritos", data: cuautla && cuautla, backgroundColor: '#FFCE56' }] }} />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Segunda fila de gráficos: Larghetto (Total), CDMX, Cambios Recientes */}
                <Row className="g-3">
                    <Col lg={4} md={6} sm={12}>
                        <Card
                            style={{
                                borderRadius: '12px',
                                border: 'none',
                                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                overflow: 'hidden'
                            }}
                            onClick={() => { setIsOpen(true); setTitulo('Registro de Alumnos Larghetto'); setSelectedObject(total) }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-4px)';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.1)';
                            }}
                        >
                            <Card.Header style={{
                                backgroundColor: '#667eea',
                                color: '#FFFFFF',
                                fontWeight: '700',
                                fontSize: '1rem',
                                textAlign: 'center',
                                padding: '1rem',
                                borderBottom: 'none'
                            }}>
                                Larghetto
                            </Card.Header>
                            <Card.Body style={{ padding: '1rem' }}>
                                <Bar data={{ labels: diasAnio, datasets: [{ label: "Alumnos Inscritos", data: total && total, backgroundColor: '#667eea' }] }} />
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col lg={4} md={6} sm={12}>
                        <Card
                            style={{
                                borderRadius: '12px',
                                border: 'none',
                                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                                overflow: 'hidden'
                            }}
                        >
                            <Card.Header style={{
                                backgroundColor: '#1F2937',
                                color: '#FFFFFF',
                                fontWeight: '700',
                                fontSize: '1rem',
                                textAlign: 'center',
                                padding: '1rem',
                                borderBottom: 'none'
                            }}>
                                CDMX
                            </Card.Header>
                            <Card.Body style={{ padding: '1rem' }}>
                                <Bar data={{ labels: diasAnio, datasets: [{ label: "Alumnos Inscritos", data: cdmx && cdmx, backgroundColor: '#4BC0C0' }] }} />
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col lg={4} md={6} sm={12}>
                        <Card
                            style={{
                                borderRadius: '12px',
                                border: 'none',
                                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                overflow: 'hidden'
                            }}
                            onClick={() => setIsLog(!isLog)}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-4px)';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.1)';
                            }}
                        >
                            <Card.Header style={{
                                backgroundColor: '#1F2937',
                                color: '#FFFFFF',
                                fontWeight: '700',
                                fontSize: '1rem',
                                textAlign: 'center',
                                padding: '1rem',
                                borderBottom: 'none'
                            }}>
                                Cambios Recientes
                            </Card.Header>
                            <Card.Body style={{ padding: '1rem' }}>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.75rem',
                                    fontSize: '0.875rem',
                                    color: '#374151'
                                }}>
                                    {[0, 1, 2, 3].map(index => (
                                        <div key={index} style={{
                                            padding: '0.5rem',
                                            backgroundColor: '#F9FAFB',
                                            borderRadius: '6px',
                                            borderLeft: '3px solid #2563EB'
                                        }}>
                                            {logs[index] ? `${devolverFecha(logs[index].fecha)} ${logs[index].autor} ${logs[index].accion}` : '—'}
                                        </div>
                                    ))}
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            {/* Modales */}
            <ChartAlumnos alumnosActivos={selectedObject} isOpen={isOpen} onClose={() => setIsOpen(false)} titulo={titulo} />
            <LogTable loglist={logs} isOpen={isLog} onClose={() => setIsLog(false)} />
        </>
    )
}
