import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Form, Modal, FormGroup } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import FeatherIcon from 'feather-icons-react'
import AxiosClient from '../plugins/axios';
import Alert, { confirmMsj, confirmTitle, succesMsj, successTitle, errorMsj, errorTitle } from '../plugins/alerts';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export const ChangePassword = ({ isOpen, onClose }) => {
    const [showPass, setShowPass] = useState(false);
    const [showPass2, setShowPass2] = useState(false);
    const [showPassOld, setShowPassOld] = useState(false);
    const form = useFormik({
        initialValues: {
            instrumento: ""
        },
        validationSchema: yup.object().shape({
            email: yup.string().required("Campo obligatorio").min(1, "Minimo 1 caracteres"),
            password: yup.string().required("Campo obligatorio").min(1, "Minimo 1 caracteres"),
            passwordrep: yup.string().required("Campo obligatorio").min(1, "Minimo 1 caracteres").oneOf([yup.ref('password'), null], 'Las contraseñas deben coincidir'),
            oldpassword: yup.string().required("Campo obligatorio").min(1, "Minimo 1 caracteres"),
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
                            url: "/auth/changepass",
                            data: JSON.stringify({
                                email: values.email,
                                oldpassword: values.oldpassword,
                                newpassword: values.password
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
            <Modal.Title>Cambiar Contraseña</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={form.handleSubmit}>
                <Form.Group className='mb-3'>
                    <Form.Label htmlFor='email'>Correo Electrónico</Form.Label>
                    <Form.Control name='email' placeholder="usuario@larghetto.com.mx" value={form.values.email} onChange={form.handleChange} />
                    {
                        form.errors.email && (<span className='error-text'>{form.errors.email}</span>)
                    }
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label htmlFor='oldpassword'>Contraseña Antigua</Form.Label>
                    <div className="inputpass">
                        <Form.Control type={`${showPassOld ? "text" : "password"}`} name='oldpassword' placeholder="*******" value={form.values.oldpassword} onChange={form.handleChange} />
                        <div className="showpass" onClick={() => setShowPassOld(!showPassOld)}>
                            {showPassOld ? <FaRegEyeSlash className='icon' /> : <FaRegEye className='icon' />}
                        </div>
                    </div>
                    {
                        form.errors.oldpassword && (<span className='error-text'>{form.errors.oldpassword}</span>)
                    }
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label htmlFor='password'>Contraseña</Form.Label>
                    <div className="inputpass">
                        <Form.Control type={`${showPass ? "text" : "password"}`} name='password' placeholder="*******" value={form.values.password} onChange={form.handleChange} />
                        <div className="showpass" onClick={() => setShowPass(!showPass)}>
                            {showPass ? <FaRegEyeSlash className='icon' /> : <FaRegEye className='icon' />}
                        </div>
                    </div>
                    {
                        form.errors.password && (<span className='error-text'>{form.errors.password}</span>)
                    }
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label htmlFor='passwordrep'>Repetir Contraseña</Form.Label>
                    <div className="inputpass">
                        <Form.Control type={`${showPass2 ? "text" : "password"}`} name='passwordrep' placeholder="*******" value={form.values.passwordrep} onChange={form.handleChange} />
                        <div className="showpass" onClick={() => setShowPass2(!showPass2)}>
                            {showPass2 ? <FaRegEyeSlash className='icon' /> : <FaRegEye className='icon' />}
                        </div>
                    </div>
                    {
                        form.errors.passwordrep && (<span className='error-text'>{form.errors.passwordrep}</span>)
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