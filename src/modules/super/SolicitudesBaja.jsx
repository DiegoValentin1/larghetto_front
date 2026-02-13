import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Container, Card, Button, Badge, Form, Modal } from 'react-bootstrap';
import { FaCheck, FaTimes, FaEye } from 'react-icons/fa';
import AxiosClient from '../../shared/plugins/axios';
import Swal from 'sweetalert2';
import '../../utils/styles/DataTable.css';

export default function SolicitudesBaja() {
    const [solicitudes, setSolicitudes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filtroEstado, setFiltroEstado] = useState('PENDIENTE');

    // Modal para aprobar/rechazar
    const [showModal, setShowModal] = useState(false);
    const [modalTipo, setModalTipo] = useState(''); // 'aprobar' o 'rechazar'
    const [solicitudSeleccionada, setSolicitudSeleccionada] = useState(null);
    const [respuesta, setRespuesta] = useState('');

    useEffect(() => {
        cargarSolicitudes();
    }, [filtroEstado]);

    const cargarSolicitudes = async () => {
        try {
            setLoading(true);
            const response = await AxiosClient({
                url: `/personal/solicitudes-baja?estado=${filtroEstado}`,
                method: 'GET',
            });

            setSolicitudes(response || []);
        } catch (error) {
            console.error('Error al cargar solicitudes:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al cargar las solicitudes de baja',
            });
        } finally {
            setLoading(false);
        }
    };

    const abrirModal = (tipo, solicitud) => {
        setModalTipo(tipo);
        setSolicitudSeleccionada(solicitud);
        setRespuesta('');
        setShowModal(true);
    };

    const cerrarModal = () => {
        setShowModal(false);
        setModalTipo('');
        setSolicitudSeleccionada(null);
        setRespuesta('');
    };

    const handleAprobarRechazar = async () => {
        if (!respuesta.trim() && modalTipo === 'rechazar') {
            Swal.fire({
                icon: 'warning',
                title: 'Campo requerido',
                text: 'Debes proporcionar un motivo al rechazar',
            });
            return;
        }

        try {
            const endpoint = modalTipo === 'aprobar'
                ? `/personal/solicitudes-baja/${solicitudSeleccionada.id}/aprobar`
                : `/personal/solicitudes-baja/${solicitudSeleccionada.id}/rechazar`;

            await AxiosClient({
                url: endpoint,
                method: 'PUT',
                data: JSON.stringify({
                    respuesta: respuesta.trim() || (modalTipo === 'aprobar' ? 'Aprobado' : 'Rechazado'),
                }),
            });

            Swal.fire({
                icon: 'success',
                title: modalTipo === 'aprobar' ? 'Solicitud Aprobada' : 'Solicitud Rechazada',
                text: modalTipo === 'aprobar'
                    ? 'El alumno ha sido dado de baja exitosamente'
                    : 'La solicitud ha sido rechazada',
            });

            cerrarModal();
            cargarSolicitudes();
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message || 'Error al procesar la solicitud',
            });
        }
    };

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

    const columns = [
        {
            name: 'Matrícula',
            selector: row => row.matricula,
            sortable: true,
            width: '110px',
        },
        {
            name: 'Alumno',
            selector: row => row.alumno_nombre,
            sortable: true,
            width: '200px',
        },
        {
            name: 'Campus',
            selector: row => row.campus.charAt(0).toUpperCase() + row.campus.slice(1),
            sortable: true,
            width: '120px',
        },
        {
            name: 'Solicitante',
            selector: row => row.solicitante_nombre,
            sortable: true,
            width: '180px',
        },
        {
            name: 'Fecha Solicitud',
            selector: row => new Date(row.fecha_solicitud).toLocaleDateString('es-MX'),
            sortable: true,
            width: '140px',
        },
        {
            name: 'Motivo',
            selector: row => row.motivo,
            cell: row => (
                <div style={{ whiteSpace: 'normal', padding: '8px 0' }}>
                    {row.motivo.length > 50 ? row.motivo.substring(0, 50) + '...' : row.motivo}
                </div>
            ),
            width: '250px',
        },
        {
            name: 'Estado',
            selector: row => row.estado,
            sortable: true,
            cell: row => (
                <Badge
                    bg={
                        row.estado === 'PENDIENTE' ? 'warning' :
                        row.estado === 'APROBADA' ? 'success' :
                        'danger'
                    }
                >
                    {row.estado}
                </Badge>
            ),
            width: '120px',
        },
        {
            name: 'Acciones',
            cell: row => (
                <div className="d-flex gap-2">
                    {row.estado === 'PENDIENTE' && (
                        <>
                            <Button
                                variant="success"
                                size="sm"
                                onClick={() => abrirModal('aprobar', row)}
                                title="Aprobar"
                            >
                                <FaCheck />
                            </Button>
                            <Button
                                variant="danger"
                                size="sm"
                                onClick={() => abrirModal('rechazar', row)}
                                title="Rechazar"
                            >
                                <FaTimes />
                            </Button>
                        </>
                    )}
                    {row.estado !== 'PENDIENTE' && (
                        <Button
                            variant="info"
                            size="sm"
                            onClick={() => {
                                Swal.fire({
                                    title: `Solicitud ${row.estado}`,
                                    html: `
                                        <p><strong>Aprobada/Rechazada por:</strong> ${row.aprobador_nombre || 'N/A'}</p>
                                        <p><strong>Fecha:</strong> ${row.fecha_respuesta ? new Date(row.fecha_respuesta).toLocaleDateString('es-MX') : 'N/A'}</p>
                                        <p><strong>Respuesta:</strong> ${row.respuesta || 'Sin comentarios'}</p>
                                    `,
                                    icon: 'info',
                                });
                            }}
                            title="Ver detalles"
                        >
                            <FaEye />
                        </Button>
                    )}
                </div>
            ),
            width: '150px',
        },
    ];

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
                                    <div style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between"
                                    }}>
                                        <div style={{
                                            fontSize: "1.5rem",
                                            fontWeight: "700",
                                            color: "#1F2937"
                                        }}>
                                            Solicitudes de Baja de Alumnos
                                        </div>

                                        <Form.Select
                                            value={filtroEstado}
                                            onChange={(e) => setFiltroEstado(e.target.value)}
                                            style={{
                                                width: '200px',
                                                height: '42px',
                                                borderRadius: '10px',
                                                border: '2px solid #E5E7EB',
                                                backgroundColor: '#F9FAFB',
                                                fontSize: '0.875rem',
                                                transition: 'all 0.2s ease'
                                            }}
                                        >
                                            <option value="">Todas</option>
                                            <option value="PENDIENTE">Pendientes</option>
                                            <option value="APROBADA">Aprobadas</option>
                                            <option value="RECHAZADA">Rechazadas</option>
                                        </Form.Select>
                                    </div>
                                </div>
                            }
                            columns={columns}
                            data={solicitudes}
                            pagination
                            paginationPerPage={10}
                            paginationRowsPerPageOptions={[10, 20, 30, 50]}
                            highlightOnHover
                            noDataComponent="No hay solicitudes de baja"
                            defaultSortFieldId={5}
                            defaultSortAsc={false}
                            progressPending={loading}
                            progressComponent={
                                <div style={{ padding: '2rem', textAlign: 'center' }}>
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Cargando...</span>
                                    </div>
                                </div>
                            }
                        />
                    </Card.Body>
                </Card>
            </Container>

            {/* Modal para Aprobar/Rechazar */}
            <Modal show={showModal} onHide={cerrarModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {modalTipo === 'aprobar' ? 'Aprobar Solicitud' : 'Rechazar Solicitud'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {solicitudSeleccionada && (
                        <>
                            <p><strong>Alumno:</strong> {solicitudSeleccionada.alumno_nombre}</p>
                            <p><strong>Matrícula:</strong> {solicitudSeleccionada.matricula}</p>
                            <p><strong>Solicitante:</strong> {solicitudSeleccionada.solicitante_nombre}</p>
                            <p><strong>Motivo:</strong> {solicitudSeleccionada.motivo}</p>
                            <hr />
                            <Form.Group>
                                <Form.Label>
                                    {modalTipo === 'aprobar' ? 'Comentario (opcional)' : 'Motivo del rechazo *'}
                                </Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={respuesta}
                                    onChange={(e) => setRespuesta(e.target.value)}
                                    placeholder={
                                        modalTipo === 'aprobar'
                                            ? 'Comentario adicional...'
                                            : 'Explica por qué se rechaza la solicitud...'
                                    }
                                    required={modalTipo === 'rechazar'}
                                />
                            </Form.Group>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cerrarModal}>
                        Cancelar
                    </Button>
                    <Button
                        variant={modalTipo === 'aprobar' ? 'success' : 'danger'}
                        onClick={handleAprobarRechazar}
                    >
                        {modalTipo === 'aprobar' ? 'Aprobar' : 'Rechazar'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
