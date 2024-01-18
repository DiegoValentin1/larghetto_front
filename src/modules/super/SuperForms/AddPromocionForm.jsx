import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Form, Modal, FormGroup } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import FeatherIcon from 'feather-icons-react'
import AxiosClient from '../../../shared/plugins/axios';
import Alert, { confirmMsj, confirmTitle, succesMsj, successTitle, errorMsj, errorTitle } from '../../../shared/plugins/alerts'

export const AddPromocionForm = ({ isOpen, cargarDatos, onClose }) => {
    const form = useFormik({
        initialValues: {
            instrumento: ""
        },
        validationSchema: yup.object().shape({
            promocion: yup.string().required("Campo obligatorio").min(1, "Minimo 1 caracteres"),
            descuento: yup.string().matches(/^[0-9]+(\.[0-9]+)?$/, 'Ingrese un número válido').required('Campoobligatorio'),
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
                            url: "/promocion/",
                            data: JSON.stringify({
                                promocion: values.promocion,
                                descuento: values.descuento
                            }),
                        });
                        console.log(response);
                        if (!response.error) {
                            cargarDatos();
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
            <Modal.Title>Registrar Promoción</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={form.handleSubmit}>
                <Form.Group className='mb-3'>
                    <Form.Label htmlFor='promocion'>Nombre de la Promoción</Form.Label>
                    <Form.Control name='promocion' placeholder="Mitad de Precio" value={form.values.promocion} onChange={form.handleChange} />
                    {
                        form.errors.promocion && (<span className='error-text'>{form.errors.promocion}</span>)
                    }
                </Form.Group>
                <Form.Group className='mb-3'>
                    <div style={{ display: "flex", flexDirection: "row", width: "100%" }} htmlFor='descuento'><p style={{ width: "40%" }}>Porcentaje de Descuento</p>  <div style={{ fontSize: "10px", width: "30%", display: "flex", justifyContent: "start", alignItems: "end" }}><p ></p></div></div>

                    <Form.Control type='text' name='descuento' placeholder="55" value={form.values.descuento} onChange={form.handleChange} />
                    {
                        form.errors.descuento && (<span className='error-text'>{form.errors.descuento}</span>)
                    }
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