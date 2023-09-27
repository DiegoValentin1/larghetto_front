import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Form, Modal, FormGroup } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import FeatherIcon from 'feather-icons-react'
import AxiosClient from '../../../shared/plugins/axios';
import Alert, { confirmMsj, confirmTitle, succesMsj, successTitle, errorMsj, errorTitle } from '../../../shared/plugins/alerts'

export const AddTeeForm = ({ isOpen, cargarDatos, onClose }) => {
    const form = useFormik({
        initialValues: {
            grade: "",
            SMYS: ""
        },
        validationSchema: yup.object().shape({
            grade: yup.string().required("Campo obligatorio").min(1, "Minimo 1 caracteres"),
            SMYS: yup.string().required("Campo obligatorio").min(1, "Minimo 1 caracteres"),
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
                            grade: values.grade,
                            SMYS: values.rol,
                        }));
                        const response = await AxiosClient({
                            method: "POST",
                            url: "/tee/",
                            data: JSON.stringify({
                                grade: values.grade,
                                smys: values.SMYS,
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
            <Modal.Title>Registrar Material Tee Reducción</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={form.handleSubmit}>
                <Form.Group className='mb-3'>
                    <Form.Label htmlFor='grade'>Grade</Form.Label>
                    <Form.Control name='grade' placeholder="WPHY 42" value={form.values.grade} onChange={form.handleChange} />
                    {
                        form.errors.grade && (<span className='error-text'>{form.errors.grade}</span>)
                    }
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label htmlFor='abbreviation'>SMYS</Form.Label>
                    <Form.Control name='SMYS' placeholder="290" value={form.values.SMYS} onChange={form.handleChange} />
                    {
                        form.errors.SMYS && (<span className='error-text'>{form.errors.SMYS}</span>)
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