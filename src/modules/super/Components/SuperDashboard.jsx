import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Tabs, Tab, Form } from 'react-bootstrap';
import { FaPlus, FaTrashAlt, FaEdit, FaChartLine, FaMoneyBillWave } from 'react-icons/fa'
import "bootstrap/dist/css/bootstrap.min.css";
import Alert from "../../../shared/plugins/alerts";
import AxiosClient from "../../../shared/plugins/axios";
import { ChartAlumnos } from './Charts/ChartAlumnos';
import { Bar, Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js/auto'
import { LogTable } from './Charts/LogTable';
import { BarLoader } from 'react-spinners';

// Registrar componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);




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

    // Estados de Reportes
    const [loading, setLoading] = useState(false);
    const [year, setYear] = useState(new Date().getFullYear());
    const [datosAlumnos, setDatosAlumnos] = useState([]);
    const [datosPagos, setDatosPagos] = useState([]);

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

    const cargarCentro = async (mactu, total, yearFilter) => {
        try {
            const response = await AxiosClient({
                url: `/stats/centro/?year=${yearFilter}`,
                method: "GET",
            });
            if (!response.error) {
                let temp = procesarLista(response);
                temp[mactu] = total;
                setCentro(temp);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const cargarBuga = async (mactu, total, yearFilter) => {
        try {
            const response = await AxiosClient({
                url: `/stats/buga/?year=${yearFilter}`,
                method: "GET",
            });
            if (!response.error) {
                let temp = procesarLista(response);
                temp[mactu] = total;
                setBuga(temp);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const cargarCDMX = async (mactu, total, yearFilter) => {
        try {
            const response = await AxiosClient({
                url: `/stats/cdmx/?year=${yearFilter}`,
                method: "GET",
            });
            if (!response.error) {
                let temp = procesarLista(response);
                temp[mactu] = total;
                setCdmx(temp);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const cargarCuautla = async (mactu, total, yearFilter) => {
        try {
            const response = await AxiosClient({
                url: `/stats/cuautla/?year=${yearFilter}`,
                method: "GET",
            });
            if (!response.error) {
                let temp = procesarLista(response);
                temp[mactu] = total;
                setCuautla(temp);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const cargarTotal = async (mactu, total, yearFilter) => {
        try {
            const response = await AxiosClient({
                url: `/stats/total/?year=${yearFilter}`,
                method: "GET",
            });
            if (!response.error) {
                let temp = procesarLista(response);
                temp[mactu] = total;
                setTotal(temp);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const cargarActual = async (yearFilter) => {
        try {
            const response = await AxiosClient({
                url: "/stats/actual/",
                method: "GET",
            });
            if (!response.error) {
                let fechaActual = new Date();
                let mactu = fechaActual.getMonth();
                const ordenada = ordenarLista(response);
                cargarCentro(mactu, ordenada[0], yearFilter);
                cargarBuga(mactu, ordenada[1], yearFilter);
                cargarCuautla(mactu, ordenada[2], yearFilter);
                cargarCDMX(mactu, ordenada[3], yearFilter);
                cargarTotal(mactu, ordenada[4], yearFilter);
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

    // Funciones de Reportes
    const cargarHistoricoAlumnos = async () => {
        try {
            setLoading(true);
            const response = await AxiosClient({
                url: `/stats/alumnos/historico?year=${year}`,
                method: 'GET',
            });

            console.log('Respuesta histórico alumnos:', response);
            setDatosAlumnos(response || []);
        } catch (error) {
            console.error('Error al cargar histórico de alumnos:', error);
            Alert.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al cargar el histórico de alumnos',
            });
        } finally {
            setLoading(false);
        }
    };

    const cargarHistoricoPagos = async () => {
        try {
            setLoading(true);
            const response = await AxiosClient({
                url: `/stats/pagos/historico?year=${year}`,
                method: 'GET',
            });

            console.log('Respuesta histórico pagos:', response);
            setDatosPagos(response || []);
        } catch (error) {
            console.error('Error al cargar histórico de pagos:', error);
            Alert.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al cargar el histórico de pagos',
            });
        } finally {
            setLoading(false);
        }
    };

    // Preparar datos para gráfico de alumnos
    const prepararDatosAlumnos = () => {
        const mesesArray = Array(12).fill(0);
        const campusData = {};

        datosAlumnos.forEach(item => {
            const mes = new Date(item.fecha).getMonth();
            const campus = item.campus;

            if (!campusData[campus]) {
                campusData[campus] = Array(12).fill(0);
            }

            campusData[campus][mes] = item.total;
        });

        const datasets = Object.keys(campusData).map((campus, index) => {
            const colors = {
                'centro': '#FF6384',
                'bugambilias': '#36A2EB',
                'cuautla': '#FFCE56',
                'CDMX': '#4BC0C0',
                'coyoacan': '#9966FF'
            };

            return {
                label: campus.charAt(0).toUpperCase() + campus.slice(1),
                data: campusData[campus],
                borderColor: colors[campus] || '#000',
                backgroundColor: colors[campus] || '#000',
                tension: 0.3
            };
        });

        return {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            datasets
        };
    };

    // Preparar datos para gráfico de pagos
    const prepararDatosPagos = () => {
        const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
        const normales = Array(12).fill(0);
        const descuentos = Array(12).fill(0);
        const recargos = Array(12).fill(0);

        datosPagos.forEach(item => {
            const index = item.mes - 1;
            normales[index] = parseFloat(item.pagos_normales) || 0;
            descuentos[index] = parseFloat(item.pagos_descuento) || 0;
            recargos[index] = parseFloat(item.pagos_recargo) || 0;
        });

        return {
            labels: meses,
            datasets: [
                {
                    label: 'Pagos Normales',
                    data: normales,
                    backgroundColor: '#36A2EB',
                },
                {
                    label: 'Con Descuento 5%',
                    data: descuentos,
                    backgroundColor: '#FFCE56',
                },
                {
                    label: 'Con Recargo 10%',
                    data: recargos,
                    backgroundColor: '#FF6384',
                }
            ]
        };
    };

    const optionsLine = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: `Evolución de Alumnos por Campus - ${year}`,
            },
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    const optionsBar = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: `Ingresos por Tipo de Pago - ${year}`,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function(value) {
                        return '$' + value.toLocaleString('es-MX');
                    }
                }
            }
        }
    };

    useEffect(() => {
        cargarLogs();
    }, []);

    useEffect(() => {
        cargarActual(year);
        cargarHistoricoAlumnos();
        cargarHistoricoPagos();
    }, [year]);

    // Calcular totales de pagos
    const calcularTotalesPagos = () => {
        if (datosPagos.length === 0) return { normales: 0, descuentos: 0, recargos: 0, total: 0 };

        return {
            normales: datosPagos.reduce((sum, item) => sum + parseFloat(item.pagos_normales || 0), 0),
            descuentos: datosPagos.reduce((sum, item) => sum + parseFloat(item.pagos_descuento || 0), 0),
            recargos: datosPagos.reduce((sum, item) => sum + parseFloat(item.pagos_recargo || 0), 0),
            total: datosPagos.reduce((sum, item) => sum + parseFloat(item.total_mes || 0), 0)
        };
    };

    const totalesPagos = calcularTotalesPagos();

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

                {/* Selector de año GLOBAL */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                    <span style={{ fontSize: '1rem', fontWeight: '700', color: '#1F2937' }}>Año:</span>
                    <Form.Select
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        style={{
                            width: '120px',
                            height: '42px',
                            borderRadius: '10px',
                            border: '2px solid #E5E7EB',
                            backgroundColor: '#F9FAFB',
                            fontSize: '0.875rem',
                            fontWeight: '600'
                        }}
                    >
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>
                    </Form.Select>
                    <span style={{ fontSize: '0.875rem', color: '#6B7280' }}>
                        Filtrando todos los módulos por {year}
                    </span>
                </div>

                {/* Sección de Reportes Históricos */}
                <Card style={{
                    borderRadius: '16px',
                    border: 'none',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    overflow: 'hidden',
                    marginBottom: '2rem'
                }}>
                    <Card.Body style={{ padding: '1.5rem' }}>
                        {/* Título */}
                        <div style={{
                            fontSize: "1.5rem",
                            fontWeight: "700",
                            color: "#1F2937",
                            marginBottom: "1.5rem"
                        }}>
                            Reportes Históricos
                        </div>

                        {loading && (
                            <div className="text-center mb-3">
                                <BarLoader color="#2563EB" width="100%" />
                            </div>
                        )}

                        <Tabs defaultActiveKey="alumnos" className="mb-3">
                            {/* TAB 1: Histórico de Alumnos */}
                            <Tab
                                eventKey="alumnos"
                                title={
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <FaChartLine size={16} />
                                        Histórico de Alumnos
                                    </span>
                                }
                            >
                                <div style={{ height: '400px' }}>
                                    {datosAlumnos.length > 0 ? (
                                        <Line data={prepararDatosAlumnos()} options={optionsLine} />
                                    ) : (
                                        <div className="text-center text-muted mt-5">
                                            <p>No hay datos disponibles para el año {year}</p>
                                        </div>
                                    )}
                                </div>
                            </Tab>

                            {/* TAB 2: Histórico de Pagos */}
                            <Tab
                                eventKey="pagos"
                                title={
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <FaMoneyBillWave size={16} />
                                        Histórico de Pagos
                                    </span>
                                }
                            >
                                <div style={{ height: '400px' }}>
                                    {datosPagos.length > 0 ? (
                                        <Bar data={prepararDatosPagos()} options={optionsBar} />
                                    ) : (
                                        <div className="text-center text-muted mt-5">
                                            <p>No hay datos de pagos disponibles para el año {year}</p>
                                        </div>
                                    )}
                                </div>
                                {datosPagos.length > 0 && (
                                    <div style={{ marginTop: '2rem' }}>
                                        <div style={{
                                            fontSize: '1.125rem',
                                            fontWeight: '600',
                                            color: '#1F2937',
                                            marginBottom: '1rem'
                                        }}>
                                            Resumen del Año {year}:
                                        </div>
                                        <Row className="g-3">
                                            <Col md={3}>
                                                <Card style={{
                                                    borderLeft: '4px solid #36A2EB',
                                                    borderRadius: '12px',
                                                    border: '1px solid #E5E7EB',
                                                    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                                                    textAlign: 'center'
                                                }}>
                                                    <Card.Body>
                                                        <div style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '0.5rem' }}>
                                                            Total Pagos Normales
                                                        </div>
                                                        <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#36A2EB' }}>
                                                            ${totalesPagos.normales.toLocaleString('es-MX', {minimumFractionDigits: 2})}
                                                        </div>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                            <Col md={3}>
                                                <Card style={{
                                                    borderLeft: '4px solid #FFCE56',
                                                    borderRadius: '12px',
                                                    border: '1px solid #E5E7EB',
                                                    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                                                    textAlign: 'center'
                                                }}>
                                                    <Card.Body>
                                                        <div style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '0.5rem' }}>
                                                            Con Descuento 5%
                                                        </div>
                                                        <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#FFCE56' }}>
                                                            ${totalesPagos.descuentos.toLocaleString('es-MX', {minimumFractionDigits: 2})}
                                                        </div>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                            <Col md={3}>
                                                <Card style={{
                                                    borderLeft: '4px solid #FF6384',
                                                    borderRadius: '12px',
                                                    border: '1px solid #E5E7EB',
                                                    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                                                    textAlign: 'center'
                                                }}>
                                                    <Card.Body>
                                                        <div style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '0.5rem' }}>
                                                            Con Recargo 10%
                                                        </div>
                                                        <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#FF6384' }}>
                                                            ${totalesPagos.recargos.toLocaleString('es-MX', {minimumFractionDigits: 2})}
                                                        </div>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                            <Col md={3}>
                                                <Card style={{
                                                    borderLeft: '4px solid #10B981',
                                                    borderRadius: '12px',
                                                    border: '1px solid #E5E7EB',
                                                    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                                                    textAlign: 'center'
                                                }}>
                                                    <Card.Body>
                                                        <div style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '0.5rem' }}>
                                                            Total General
                                                        </div>
                                                        <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#10B981' }}>
                                                            ${totalesPagos.total.toLocaleString('es-MX', {minimumFractionDigits: 2})}
                                                        </div>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        </Row>
                                    </div>
                                )}
                            </Tab>
                        </Tabs>
                    </Card.Body>
                </Card>

                {/* Primera fila de gráficos: Centro, Bugambilias, Cuautla */}
                <Row className="mb-4 g-3">
                    <Col xxl={4} xl={6} lg={6} md={12}>
                        <Card
                            style={{
                                borderRadius: '12px',
                                border: 'none',
                                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                overflow: 'hidden',
                                height: '100%',
                                minHeight: '400px'
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

                    <Col xxl={4} xl={6} lg={6} md={12}>
                        <Card
                            style={{
                                borderRadius: '12px',
                                border: 'none',
                                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                overflow: 'hidden',
                                height: '100%',
                                minHeight: '400px'
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

                    <Col xxl={4} xl={6} lg={6} md={12}>
                        <Card
                            style={{
                                borderRadius: '12px',
                                border: 'none',
                                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                overflow: 'hidden',
                                height: '100%',
                                minHeight: '400px'
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
                    <Col xxl={4} xl={6} lg={6} md={12}>
                        <Card
                            style={{
                                borderRadius: '12px',
                                border: 'none',
                                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                overflow: 'hidden',
                                height: '100%',
                                minHeight: '400px'
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

                    <Col xxl={4} xl={6} lg={6} md={12}>
                        <Card
                            style={{
                                borderRadius: '12px',
                                border: 'none',
                                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                                overflow: 'hidden',
                                height: '100%',
                                minHeight: '400px'
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

                    <Col xxl={4} xl={6} lg={6} md={12}>
                        <Card
                            style={{
                                borderRadius: '12px',
                                border: 'none',
                                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                overflow: 'hidden',
                                height: '100%',
                                minHeight: '400px'
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
