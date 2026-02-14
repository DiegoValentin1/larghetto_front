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
            instrumento: "",
            fecha_inicio: "",
            fecha_fin: "",
            duracion_meses: ""
        },
        validationSchema: yup.object().shape({
            promocion: yup.string().required("Campo obligatorio").min(1, "Minimo 1 caracteres"),
            descuento: yup.string().matches(/^[0-9]+(\.[0-9]+)?$/, 'Ingrese un número válido').required('Campoobligatorio'),
            duracion_meses: yup.number()
                .nullable()
                .integer('Debe ser un número entero')
                .min(0, 'No puede ser negativo')
                .transform((value, originalValue) => originalValue === '' ? null : value),
            fecha_inicio: yup.date().nullable(),
            fecha_fin: yup.date().nullable()
                .when('fecha_inicio', (fecha_inicio, schema) => {
                    return fecha_inicio ? schema.min(fecha_inicio, 'La fecha fin debe ser posterior a la fecha inicio') : schema;
                }),
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
                                descuento: values.descuento,
                                duracion_meses: values.duracion_meses || null,
                                fecha_inicio: values.fecha_inicio || null,
                                fecha_fin: values.fecha_fin || null
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
                <Form.Group className='mb-3'>
                    <Form.Label htmlFor='duracion_meses'>Duración del Beneficio (Meses)</Form.Label>
                    <Form.Control
                        type='number'
                        name='duracion_meses'
                        placeholder="0"
                        min="0"
                        value={form.values.duracion_meses || ''}
                        onChange={form.handleChange}
                    />
                    {
                        form.errors.duracion_meses && (<span className='error-text'>{form.errors.duracion_meses}</span>)
                    }
                    <Form.Text className="text-muted">
                        Dejar en 0 o vacío para que sea permanente. Ejemplo: 6 meses = descuento válido por 6 meses desde la inscripción del alumno.
                    </Form.Text>
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label htmlFor='fecha_inicio'>Fecha de Inicio (Opcional)</Form.Label>
                    <Form.Control type='date' name='fecha_inicio' value={form.values.fecha_inicio} onChange={form.handleChange} />
                    {
                        form.errors.fecha_inicio && (<span className='error-text'>{form.errors.fecha_inicio}</span>)
                    }
                    <Form.Text className="text-muted">Deja vacío si la promoción no tiene fecha de inicio</Form.Text>
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label htmlFor='fecha_fin'>Fecha de Fin (Opcional)</Form.Label>
                    <Form.Control type='date' name='fecha_fin' value={form.values.fecha_fin} onChange={form.handleChange} />
                    {
                        form.errors.fecha_fin && (<span className='error-text'>{form.errors.fecha_fin}</span>)
                    }
                    <Form.Text className="text-muted">Deja vacío si la promoción no tiene fecha de expiración</Form.Text>
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