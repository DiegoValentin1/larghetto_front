import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Button, Badge, Form, Modal } from 'react-bootstrap';
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
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3 d-flex justify-content-between align-items-center">
                            <h5 className="m-0 font-weight-bold text-primary">
                                Solicitudes de Baja de Alumnos
                            </h5>
                            <Form.Select
                                value={filtroEstado}
                                onChange={(e) => setFiltroEstado(e.target.value)}
                                style={{ width: '200px' }}
                            >
                                <option value="">Todas</option>
                                <option value="PENDIENTE">Pendientes</option>
                                <option value="APROBADA">Aprobadas</option>
                                <option value="RECHAZADA">Rechazadas</option>
                            </Form.Select>
                        </div>
                        <div className="card-body">
                            {loading ? (
                                <div className="text-center">
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Cargando...</span>
                                    </div>
                                </div>
                            ) : (
                                <DataTable
                                    columns={columns}
                                    data={solicitudes}
                                    pagination
                                    paginationPerPage={10}
                                    highlightOnHover
                                    noDataComponent="No hay solicitudes de baja"
                                    defaultSortFieldId={5}
                                    defaultSortAsc={false}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>

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
        </div>
    );
}
