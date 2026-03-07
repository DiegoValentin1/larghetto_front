import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Form, Modal, FormGroup } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import FeatherIcon from 'feather-icons-react'
import AxiosClient from '../../../shared/plugins/axios';
import Alert, { confirmMsj, confirmTitle, succesMsj, successTitle, errorMsj, errorTitle } from '../../../shared/plugins/alerts';
import '../../../utils/styles/UserNuevoTrabajo.css';

export const AddRecepcionistaForm = ({ isOpen, cargarDatos, onClose, option }) => {
    const [menor, setMenor] = useState(false);
    const session = JSON.parse(localStorage.getItem('user') || null);
    let schema;

    // Estilos modernos
    const inputStyle = {
        height: '42px',
        borderRadius: '10px',
        border: '2px solid #E5E7EB',
        backgroundColor: '#F9FAFB',
        fontSize: '0.875rem',
        transition: 'all 0.2s ease',
    };

    const labelStyle = {
        fontSize: '0.875rem',
        fontWeight: '600',
        color: '#6B7280',
        marginBottom: '0.5rem'
    };

    const form = useFormik({
        initialValues: {
            email: "",
            role: "ALUMNO",
            nombre: "",
            fechaNacimiento: "",

        },
        validationSchema:
            yup.object().shape({
                name: yup.string().required("Campo obligatorio").min(1, "Minimo 1 caracteres"),
                email: yup.string().required("Campo obligatorio").min(1, "Minimo 1 caracteres").email('Correo electrónico inválido'),
                fechaNacimiento: yup.string().required("Campo obligatorio"),
                domicilio: yup.string().required("Campo obligatorio").min(1, "Minimo 1 caracteres"),
                municipio: yup.string().required("Campo obligatorio").min(1, "Minimo 1 caracteres"),
                telefono: yup.string().required("Campo obligatorio").min(10, 'Minimo 10 Dígitos').max(10, 'Maximo 10 Dígitos'),
                contactoEmergencia: yup.string().required("Campo obligatorio").min(10, 'Minimo 10 Dígitos').max(10, 'Maximo 10 Dígitos'),
                // clabe: yup.string().required("Obligatorio").min(1, "Minimo 1 caracteres"),
                // cuenta: yup.string().required("Obligatorio").min(1, "Minimo 1 caracteres"),
                // banco: yup.string().required("Obligatorio").min(1, "Minimo 1 caracteres"),
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
                        console.log(JSON.stringify({ ...values, role: "ALUMNO" }));
                        const response = await AxiosClient({
                            method: "POST",
                            url: "/personal/user",
                            data: JSON.stringify({ ...values, role: "RECEPCION", campus:session.data.campus }),
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
    }
    return <Modal
        backdrop='static'
        keyboard={false}
        show={isOpen}
        onHide={handleClose}
        size="lg"
        centered
        style={{
            backdropFilter: 'blur(4px)'
        }}
    >
        <Modal.Header
            closeButton
            style={{
                backgroundColor: '#F9FAFB',
                borderBottom: '2px solid #E5E7EB',
                padding: '1.25rem 1.5rem'
            }}
        >
            <Modal.Title style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#1F2937'
            }}>
                Registrar Recepcionista
            </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{
            padding: '2rem',
            backgroundColor: '#FFFFFF',
            maxHeight: '75vh',
            overflow: 'auto'
        }}>
            <Form onSubmit={form.handleSubmit}>
                <div className="InputContainer4">
                    <Form.Group className='mb-3'>
                        <Form.Label htmlFor='name' style={labelStyle}>Nombre</Form.Label>
                        <Form.Control name='name' placeholder="Pablo" value={form.values.name} onChange={form.handleChange} style={inputStyle} />
                        {
                            form.errors.name && (<span className='error-text' style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.name}</span>)
                        }
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label htmlFor='fechaNacimiento' style={labelStyle}>Fecha de Nacimiento</Form.Label>
                        <Form.Control type='date' name='fechaNacimiento' placeholder="" value={form.values.fechaNacimiento} onChange={form.handleChange} style={inputStyle} />
                        {
                            form.errors.fechaNacimiento && (<span className='error-text' style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.fechaNacimiento}</span>)
                        }
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label htmlFor='email' style={labelStyle}>Email</Form.Label>
                        <Form.Control type='email' name='email' placeholder="correo@dominio.com" value={form.values.email} onChange={form.handleChange} style={inputStyle} />
                        {
                            form.errors.email && (<span className='error-text' style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.email}</span>)
                        }
                    </Form.Group>
                    <Form.Group className='mb-3'>
                            <Form.Label htmlFor='abbreviation' style={labelStyle}>Contraseña</Form.Label>
                            <Form.Control type='password' name='password' placeholder="*****" value={form.values.password} onChange={form.handleChange} style={inputStyle} />
                            {
                                form.errors.password && (<span className='error-text' style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.password}</span>)
                            }
                        </Form.Group>
                </div>
                <div className="InputContainer4" style={{ width: "100%" }}>
                    <Form.Group className='mb-3'>
                        <Form.Label htmlFor='domicilio' style={labelStyle}>Domicilio</Form.Label>
                        <Form.Control name='domicilio' placeholder="Calle #34" value={form.values.domicilio} onChange={form.handleChange} style={inputStyle} />
                        {
                            form.errors.domicilio && (<span className='error-text' style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.domicilio}</span>)
                        }
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label htmlFor='municipio' style={labelStyle}>Municipio</Form.Label>
                        <Form.Control name='municipio' placeholder="Temixco" value={form.values.municipio} onChange={form.handleChange} style={inputStyle} />
                        {
                            form.errors.municipio && (<span className='error-text' style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.municipio}</span>)
                        }
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label htmlFor='telefono' style={labelStyle}>Telefono</Form.Label>
                        <Form.Control type='number' min={0} name='telefono' placeholder="7771234567" value={form.values.telefono} onChange={form.handleChange} style={inputStyle} />
                        {
                            form.errors.telefono && (<span className='error-text' style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.telefono}</span>)
                        }
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label htmlFor='contactoEmergencia' style={labelStyle}>Contacto de Emergencia</Form.Label>
                        <Form.Control type='number' min={0} name='contactoEmergencia' placeholder="7777654321" value={form.values.contactoEmergencia} onChange={form.handleChange} style={inputStyle} />
                        {
                            form.errors.contactoEmergencia && (<span className='error-text' style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.contactoEmergencia}</span>)
                        }
                    </Form.Group>
                </div>
                {/* <div className="InputContainer3">
                    <Form.Group className='mb-3'>
                        <Form.Label htmlFor='clabe'>Clabe</Form.Label>
                        <Form.Control name='clabe' placeholder="123456789012345678" value={form.values.clabe} onChange={form.handleChange} />
                        {
                            form.errors.clabe && (<span className='error-text'>{form.errors.clabe}</span>)
                        }
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label htmlFor='cuenta'>Cuenta</Form.Label>
                        <Form.Control name='cuenta' placeholder="1234567890123456" value={form.values.cuenta} onChange={form.handleChange} />
                        {
                            form.errors.cuenta && (<span className='error-text'>{form.errors.cuenta}</span>)
                        }
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label htmlFor='banco'>Banco</Form.Label>
                        <Form.Control name='banco' placeholder="BBVA" value={form.values.banco} onChange={form.handleChange} />
                        {
                            form.errors.banco && (<span className='error-text'>{form.errors.banco}</span>)
                        }
                    </Form.Group>
                </div> */}
                <FormGroup className='mb-3'>
                    <Row style={{ padding: "1.5rem 0 0 0", borderTop: "2px solid #E5E7EB", marginTop: "2rem" }}>
                        <Col className='text-end' style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                            <button
                                type="button"
                                onClick={handleClose}
                                style={{
                                    backgroundColor: '#EF4444',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    padding: '0.625rem 1.25rem',
                                    fontSize: '0.875rem',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#DC2626';
                                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = '#EF4444';
                                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                                }}
                            >
                                <FeatherIcon icon='x' size={18} />
                                Cancelar
                            </button>
                            <button
                                type='submit'
                                style={{
                                    backgroundColor: '#10B981',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    padding: '0.625rem 1.25rem',
                                    fontSize: '0.875rem',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#059669';
                                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = '#10B981';
                                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                                }}
                            >
                                <FeatherIcon icon='check' size={18} />
                                Guardar
                            </button>
                        </Col>
                    </Row>
                </FormGroup>
            </Form>
        </Modal.Body>
    </Modal>
};