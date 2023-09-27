import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Form, Modal, FormGroup } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import FeatherIcon from 'feather-icons-react'
import AxiosClient from '../../../shared/plugins/axios';
import Alert, { confirmMsj, confirmTitle, succesMsj, successTitle, errorMsj, errorTitle } from '../../../shared/plugins/alerts'

export const AddUserForm = ({ isOpen, cargarDatos, onClose, option }) => {
    const form = useFormik({
        initialValues: {
            email: "",
            password: "",
            rol: "",
            nombre: ""
        },
        validationSchema: yup.object().shape({
            email: yup.string().required("Campo obligatorio").min(1, "Minimo 1 caracteres").email('Correo electrónico inválido'),
            password: yup.string().required("Campo obligatorio").min(8, "Minimo 8 caracteres"),
            nombre: yup.string().required("Campo obligatorio").min(1, "Minimo 1 caracteres"),
            empresa: yup.string().required("Campo obligatorio").min(1, "Minimo 1 caracteres"),
            rol: yup.string().required("Campo obligatorio"),
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
                            email: values.email,
                            password: values.password,
                            rol: values.rol,
                            name:values.nombre
                        }));
                        const response = await AxiosClient({
                            method: "POST",
                            url: "/auth/register",
                            data: JSON.stringify({
                                email: values.email,
                                password: values.password,
                                role: values.rol,
                                name:values.nombre,
                                empresa: values.empresa
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
            <Modal.Title>Registrar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={form.handleSubmit}>
                <Form.Group className='mb-3'>
                    <Form.Label htmlFor='nombre'>Nombre</Form.Label>
                    <Form.Control name='nombre' placeholder="Pablo" value={form.values.nombre} onChange={form.handleChange} />
                    {
                        form.errors.nombre && (<span className='error-text'>{form.errors.nombre}</span>)
                    }
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label htmlFor='empresa'>Empresa</Form.Label>
                    <Form.Control name='empresa' placeholder="Pemex" value={form.values.empresa} onChange={form.handleChange} />
                    {
                        form.errors.empresa && (<span className='error-text'>{form.errors.empresa}</span>)
                    }
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label htmlFor='email'>Email</Form.Label>
                    <Form.Control type='email' name='email' placeholder="correo@dominio.com" value={form.values.email} onChange={form.handleChange} />
                    {
                        form.errors.email && (<span className='error-text'>{form.errors.email}</span>)
                    }
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label htmlFor='abbreviation'>Contraseña</Form.Label>
                    <Form.Control type='password' name='password' placeholder="*****" value={form.values.password} onChange={form.handleChange} />
                    {
                        form.errors.password && (<span className='error-text'>{form.errors.password}</span>)
                    }
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="rol">Rol</Form.Label>
                    <Form.Select
                        name="rol"
                        value={form.values.rol}
                        onChange={form.handleChange}
                    >
                        <option value="">Selecciona un rol</option>
                        {!option ? <option key={1} value={'ADMIN'}>
                            Amdinistrador
                        </option> : null}
                        <option key={2} value={'USER'}>
                            Usuario
                        </option>
                    </Form.Select>
                    {
                        form.errors.rol && (<span className='error-text'>{form.errors.rol}</span>)
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