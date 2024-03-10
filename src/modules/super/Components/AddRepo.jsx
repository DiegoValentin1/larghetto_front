import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Form, Modal, FormGroup } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import FeatherIcon from 'feather-icons-react'
import AxiosClient from '../../../shared/plugins/axios';
import Alert, { confirmMsj, confirmTitle, succesMsj, successTitle, errorMsj, errorTitle } from '../../../shared/plugins/alerts'

export const AddRepoForm = ({ isOpen, onClose, objeto }) => {
    const [maestros, setMaestros] = useState([]);

    useEffect(() => {
        const fetchMaterial = async () => {
            const response = await AxiosClient({
                method: "GET",
                url: "/personal/teacher",
            });
            if (!response.error) {
                console.log(response);
                setMaestros(response);
                return response;
            }
        };
        fetchMaterial();
    }, []);

    const form = useFormik({
        initialValues: {
            instrumento: ""
        },
        validationSchema: yup.object().shape({
        }),
        onSubmit: async (values) => {
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
                        console.log(JSON.stringify({
                            instrumento: values.instrumento,
                        }));
                        const response = await AxiosClient({
                            method: "POST",
                            url: "/instrumento/repo",
                            data: JSON.stringify({
                                fecha: values.fechaNacimiento,
                                alumno_id:objeto.user_id,
                                maestro_id:values.maestro
                            }),
                        });
                        console.log(response);
                        if (!response.error) {
                            Alert.fire({
                                title: successTitle,
                                text: succesMsj,
                                icon: "success",
                                confirmButtonColor: "#3085d6",
                                confirmButtonText: "Aceptar"
                            }).then((result) => {
                                if (result.isConfirmed) handleClose();
                            });
                        }
                        return response;
                    } catch (error) {
                        console.log(error);
                        Alert.fire({
                            title: errorTitle,
                            text: errorMsj,
                            icon: "error",
                            confirmButtonColor: "#3085d6",
                            confirmButtonText: "Aceptar"
                        }).then((result) => {
                            if (result.isConfirmed) handleClose();
                        });
                    }
                }
            });
        }
    });

    const handleClose = () => {
        form.resetForm();
        onClose();
    }
    return <Modal
        backdrop='static'
        keyboard={false}
        show={isOpen}
        onHide={handleClose}
    >
        <Modal.Header closeButton>
            <Modal.Title>Registrar Reposición</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={form.handleSubmit}>
                <Form.Group className='mb-3'>
                    <Form.Label htmlFor='fechaNacimiento'>Fecha de Reposición</Form.Label>
                    <Form.Control type='date' name='fechaNacimiento' placeholder="" value={form.values.fechaNacimiento} onChange={form.handleChange} />
                    {
                        form.errors.fechaNacimiento && (<span className='error-text'>{form.errors.fechaNacimiento}</span>)
                    }
                </Form.Group>
                <Form.Group className="mb-3">
                                <Form.Label htmlFor="maestro">Maestro</Form.Label>
                                <div className="InputSelect">
                                    <Form.Select
                                        className="TeeRedInputCompleto"
                                        placeholder=""
                                        name="maestro"
                                        value={form.values.maestro}
                                        onChange={form.handleChange}
                                    >
                                        <option value="">Selecciona un Maestro</option>
                                        {maestros.map((item) => (
                                            <option key={item.id} value={item.user_id}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </div>

                                {form.errors.maestro && (
                                    <span className="error-text">{form.errors.maestro}</span>
                                )}
                            </Form.Group>
                <FormGroup className='mb-3'>
                    <Row>
                        <Col className='text-end'>
                            <Button variant='outline-danger' className='me-2' onClick={handleClose}>
                                <FeatherIcon icon='x' />&nbsp;Cancelar
                            </Button>
                            <Button variant='outline-success' type='submit'>
                                <FeatherIcon icon='check'>&nbsp;Guardar</FeatherIcon>
                            </Button>
                        </Col>
                    </Row>
                </FormGroup>
            </Form>
        </Modal.Body>
    </Modal>
};