import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Form, Row, Col, Card } from 'react-bootstrap';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import AxiosClient from '../../shared/plugins/axios';
import Alert from '../../shared/plugins/alerts';
import { BarLoader } from 'react-spinners';

// Registrar componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

export default function Reportes() {
    const [loading, setLoading] = useState(false);
    const [yearAlumnos, setYearAlumnos] = useState(new Date().getFullYear());
    const [yearPagos, setYearPagos] = useState(new Date().getFullYear());
    const [datosAlumnos, setDatosAlumnos] = useState([]);
    const [datosPagos, setDatosPagos] = useState([]);

    useEffect(() => {
        cargarHistoricoAlumnos();
    }, [yearAlumnos]);

    useEffect(() => {
        cargarHistoricoPagos();
    }, [yearPagos]);

    const cargarHistoricoAlumnos = async () => {
        try {
            setLoading(true);
            const response = await AxiosClient({
                url: `/stats/alumnos/historico?year=${yearAlumnos}`,
                method: 'GET',
            });

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
                url: `/stats/pagos/historico?year=${yearPagos}`,
                method: 'GET',
            });

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
                text: `Evolución de Alumnos por Campus - ${yearAlumnos}`,
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
                text: `Ingresos por Tipo de Pago - ${yearPagos}`,
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

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <Card className="shadow mb-4">
                        <Card.Header className="py-3">
                            <h5 className="m-0 font-weight-bold text-primary">Reportes Históricos</h5>
                        </Card.Header>
                        <Card.Body>
                            {loading && (
                                <div className="text-center mb-3">
                                    <BarLoader color="#36d7b7" width="100%" />
                                </div>
                            )}

                            <Tabs defaultActiveKey="alumnos" className="mb-3">
                                {/* TAB 1: Histórico de Alumnos */}
                                <Tab eventKey="alumnos" title="📊 Histórico de Alumnos">
                                    <Row className="mb-3">
                                        <Col md={3}>
                                            <Form.Group>
                                                <Form.Label>Año:</Form.Label>
                                                <Form.Select
                                                    value={yearAlumnos}
                                                    onChange={(e) => setYearAlumnos(e.target.value)}
                                                >
                                                    <option value="2024">2024</option>
                                                    <option value="2025">2025</option>
                                                    <option value="2026">2026</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <div style={{ height: '400px' }}>
                                        {datosAlumnos.length > 0 ? (
                                            <Line data={prepararDatosAlumnos()} options={optionsLine} />
                                        ) : (
                                            <div className="text-center text-muted mt-5">
                                                <p>No hay datos disponibles para el año {yearAlumnos}</p>
                                            </div>
                                        )}
                                    </div>
                                </Tab>

                                {/* TAB 2: Histórico de Pagos */}
                                <Tab eventKey="pagos" title="💰 Histórico de Pagos">
                                    <Row className="mb-3">
                                        <Col md={3}>
                                            <Form.Group>
                                                <Form.Label>Año:</Form.Label>
                                                <Form.Select
                                                    value={yearPagos}
                                                    onChange={(e) => setYearPagos(e.target.value)}
                                                >
                                                    <option value="2024">2024</option>
                                                    <option value="2025">2025</option>
                                                    <option value="2026">2026</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <div style={{ height: '400px' }}>
                                        {datosPagos.length > 0 ? (
                                            <Bar data={prepararDatosPagos()} options={optionsBar} />
                                        ) : (
                                            <div className="text-center text-muted mt-5">
                                                <p>No hay datos de pagos disponibles para el año {yearPagos}</p>
                                            </div>
                                        )}
                                    </div>
                                    {datosPagos.length > 0 && (
                                        <div className="mt-4">
                                            <h6>Resumen del Año {yearPagos}:</h6>
                                            <Row>
                                                <Col md={3}>
                                                    <Card className="text-center">
                                                        <Card.Body>
                                                            <h6>Total Pagos Normales</h6>
                                                            <h4 className="text-primary">
                                                                ${datosPagos.reduce((sum, item) => sum + parseFloat(item.pagos_normales || 0), 0).toLocaleString('es-MX', {minimumFractionDigits: 2})}
                                                            </h4>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                                <Col md={3}>
                                                    <Card className="text-center">
                                                        <Card.Body>
                                                            <h6>Con Descuento 5%</h6>
                                                            <h4 className="text-warning">
                                                                ${datosPagos.reduce((sum, item) => sum + parseFloat(item.pagos_descuento || 0), 0).toLocaleString('es-MX', {minimumFractionDigits: 2})}
                                                            </h4>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                                <Col md={3}>
                                                    <Card className="text-center">
                                                        <Card.Body>
                                                            <h6>Con Recargo 10%</h6>
                                                            <h4 className="text-danger">
                                                                ${datosPagos.reduce((sum, item) => sum + parseFloat(item.pagos_recargo || 0), 0).toLocaleString('es-MX', {minimumFractionDigits: 2})}
                                                            </h4>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                                <Col md={3}>
                                                    <Card className="text-center">
                                                        <Card.Body>
                                                            <h6>Total General</h6>
                                                            <h4 className="text-success">
                                                                ${datosPagos.reduce((sum, item) => sum + parseFloat(item.total_mes || 0), 0).toLocaleString('es-MX', {minimumFractionDigits: 2})}
                                                            </h4>
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
                </div>
            </div>
        </div>
    );
}
