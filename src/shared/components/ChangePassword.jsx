import React, { useState } from 'react'
import { Form, Modal, FormGroup } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import FeatherIcon from 'feather-icons-react'
import AxiosClient from '../plugins/axios';
import Alert, { confirmMsj, confirmTitle, succesMsj, successTitle, errorMsj, errorTitle } from '../plugins/alerts';

export const ChangePassword = ({ isOpen, onClose }) => {
    const session = JSON.parse(localStorage.getItem('user') || null);
    const tokenPayload = session?.data?.token ? JSON.parse(atob(session.data.token.split('.')[1])) : {};
    const email = tokenPayload.email;
    const [showPassOld, setShowPassOld] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [showPass2, setShowPass2] = useState(false);

    const inputStyle = {
        height: '42px',
        borderRadius: '10px',
        border: '2px solid #E5E7EB',
        backgroundColor: '#F9FAFB',
        fontSize: '0.875rem',
        paddingRight: '2.5rem',
    };

    const labelStyle = {
        fontSize: '0.875rem',
        fontWeight: '600',
        color: '#6B7280',
        marginBottom: '0.5rem',
    };

    const form = useFormik({
        initialValues: { oldpassword: '', password: '', passwordrep: '' },
        validationSchema: yup.object().shape({
            oldpassword: yup.string().required("Campo obligatorio"),
            password: yup.string().required("Campo obligatorio").min(6, "Mínimo 6 caracteres"),
            passwordrep: yup.string().required("Campo obligatorio").oneOf([yup.ref('password'), null], 'Las contraseñas no coinciden'),
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
                        const response = await AxiosClient({
                            method: "POST",
                            url: "/auth/changepass",
                            data: JSON.stringify({
                                email: email,
                                oldpassword: values.oldpassword,
                                newpassword: values.password,
                            }),
                        });
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
                        Alert.fire({
                            title: errorTitle,
                            text: error.response?.data?.message || errorMsj,
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
    };

    return (
        <Modal backdrop='static' keyboard={false} show={isOpen} onHide={handleClose} centered>
            <Modal.Header
                closeButton
                style={{
                    backgroundColor: '#F9FAFB',
                    borderBottom: '2px solid #E5E7EB',
                    padding: '1.25rem 1.5rem',
                }}
            >
                <Modal.Title style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1F2937', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FeatherIcon icon="lock" size={20} />
                    Cambiar Contraseña
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ padding: '1.75rem', backgroundColor: '#FFFFFF' }}>
                <Form onSubmit={form.handleSubmit}>

                    <Form.Group className='mb-3'>
                        <Form.Label style={labelStyle}>Contraseña actual</Form.Label>
                        <div style={{ position: 'relative' }}>
                            <Form.Control
                                type={showPassOld ? 'text' : 'password'}
                                name="oldpassword"
                                placeholder="••••••••"
                                value={form.values.oldpassword}
                                onChange={form.handleChange}
                                style={inputStyle}
                            />
                            <div onClick={() => setShowPassOld(!showPassOld)} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: '#9CA3AF', display: 'flex' }}>
                                <FeatherIcon icon={showPassOld ? 'eye-off' : 'eye'} size={16} />
                            </div>
                        </div>
                        {form.errors.oldpassword && <span style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.oldpassword}</span>}
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Form.Label style={labelStyle}>Nueva contraseña</Form.Label>
                        <div style={{ position: 'relative' }}>
                            <Form.Control
                                type={showPass ? 'text' : 'password'}
                                name="password"
                                placeholder="••••••••"
                                value={form.values.password}
                                onChange={form.handleChange}
                                style={inputStyle}
                            />
                            <div onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: '#9CA3AF', display: 'flex' }}>
                                <FeatherIcon icon={showPass ? 'eye-off' : 'eye'} size={16} />
                            </div>
                        </div>
                        {form.errors.password && <span style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.password}</span>}
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Form.Label style={labelStyle}>Repetir nueva contraseña</Form.Label>
                        <div style={{ position: 'relative' }}>
                            <Form.Control
                                type={showPass2 ? 'text' : 'password'}
                                name="passwordrep"
                                placeholder="••••••••"
                                value={form.values.passwordrep}
                                onChange={form.handleChange}
                                style={inputStyle}
                            />
                            <div onClick={() => setShowPass2(!showPass2)} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: '#9CA3AF', display: 'flex' }}>
                                <FeatherIcon icon={showPass2 ? 'eye-off' : 'eye'} size={16} />
                            </div>
                        </div>
                        {form.errors.passwordrep && <span style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.passwordrep}</span>}
                    </Form.Group>

                    <FormGroup style={{ paddingTop: '1rem', borderTop: '2px solid #E5E7EB', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                        <button
                            type="button"
                            onClick={handleClose}
                            style={{ backgroundColor: '#EF4444', color: 'white', border: 'none', borderRadius: '8px', padding: '0.625rem 1.25rem', fontSize: '0.875rem', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                        >
                            <FeatherIcon icon='x' size={16} />
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            style={{ backgroundColor: '#10B981', color: 'white', border: 'none', borderRadius: '8px', padding: '0.625rem 1.25rem', fontSize: '0.875rem', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                        >
                            <FeatherIcon icon='check' size={16} />
                            Guardar
                        </button>
                    </FormGroup>
                </Form>
            </Modal.Body>
        </Modal>
    );
};
