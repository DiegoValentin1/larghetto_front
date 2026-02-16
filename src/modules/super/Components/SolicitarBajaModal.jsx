import React, { useState, useContext } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import AxiosClient from '../../../shared/plugins/axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../../auth/authContext';

const SolicitarBajaModal = ({ show, onHide, alumnoId, alumnoNombre, onSuccess }) => {
    const { user } = useContext(AuthContext);
    const [motivo, setMotivo] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!motivo || motivo.trim() === '') {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'El motivo es obligatorio',
            });
            return;
        }

        try {
            setLoading(true);

            const response = await AxiosClient({
                url: '/personal/alumno/solicitar-baja',
                method: 'POST',
                data: JSON.stringify({
                    alumno_id: alumnoId,
                    motivo: motivo.trim(),
                    empleado: user.data.name,
                }),
            });

            Swal.fire({
                icon: 'success',
                title: 'Solicitud Enviada',
                text: 'La solicitud de baja ha sido enviada al administrador para su aprobación.',
                confirmButtonText: 'Entendido',
            });

            setMotivo('');
            onHide();
            if (onSuccess) onSuccess();
        } catch (error) {
            console.error('Error al solicitar baja:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message || 'Error al enviar la solicitud de baja',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setMotivo('');
        onHide();
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Solicitar Baja de Alumno</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="mb-3">
                    <strong>Alumno:</strong> {alumnoNombre}
                </div>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Motivo de la Baja <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={4}
                            placeholder="Describe el motivo de la baja..."
                            value={motivo}
                            onChange={(e) => setMotivo(e.target.value)}
                            required
                            disabled={loading}
                        />
                        <Form.Text className="text-muted">
                            Esta solicitud será enviada al administrador para su aprobación.
                        </Form.Text>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose} disabled={loading}>
                    Cancelar
                </Button>
                <Button variant="warning" onClick={handleSubmit} disabled={loading || !motivo.trim()}>
                    {loading ? 'Enviando...' : 'Enviar Solicitud'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default SolicitarBajaModal;
