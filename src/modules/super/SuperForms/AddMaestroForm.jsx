import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Form, Modal, FormGroup } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import FeatherIcon from 'feather-icons-react'
import AxiosClient from '../../../shared/plugins/axios';
import Alert, { confirmMsj, confirmTitle, succesMsj, successTitle, errorMsj, errorTitle } from '../../../shared/plugins/alerts';
import '../../../utils/styles/UserNuevoTrabajo.css';
import { TbHomeSearch} from 'react-icons/tb'

export const AddMaestroForm = ({ isOpen, cargarDatos, onClose, option }) => {
    const [menor, setMenor] = useState(false);
    const [maestros, setMaestros] = useState([]);
    const [instrumentos, setInstrumentos] = useState([]);
    const [horarios, setHorarios] = useState([]);
    const [promociones, setPromociones] = useState([]);
    const [maestroInstrumentos, setMaestroInstrumentos] = useState([]);
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

    useEffect(() => {
        if (menor) {
            schema = yup.object().shape({
                nombre: yup.string().required("Campo obligatorio").min(1, "Minimo 1 caracteres"),
                email: yup.string().required("Campo obligatorio").min(1, "Minimo 1 caracteres").email('Correo electrónico inválido'),
                password: yup.string().required("Campo obligatorio").min(8, "Minimo 8 caracteres"),
                fechaNacimiento: yup.string().required("Campo obligatorio"),
                comprobante: yup.string().required("Campo obligatorio"),
                fecha_inicio: yup.string().required("Campo obligatorio"),
                nivel: yup.string().required("Obligatorio").min(1, "Minimo 1 caracteres"),
                domicilio: yup.string().required("Campo obligatorio").min(1, "Minimo 1 caracteres"),
                municipio: yup.string().required("Campo obligatorio").min(1, "Minimo 1 caracteres"),
                telefono: yup.string().required("Campo obligatorio").min(10, 'Minimo 10 Dígitos').max(10, 'Maximo 10 Dígitos'),
                contactoEmergencia: yup.string().required("Campo obligatorio").min(10, 'Minimo 10 Dígitos').max(10, 'Maximo 10 Dígitos'),
                mensualidad: yup.string().required("Obligatorio").min(1, "Minimo 1 caracteres"),
                maestro: yup.string().required("Campo obligatorio"),
                instrumento: yup.string().required("Campo obligatorio"),
                promocion: yup.string().required("Campo obligatorio"),
                dia: yup.string().required("Campo obligatorio"),
                hora: yup.string().required("Campo obligatorio"),
                nombreMadre: yup.string().required("Campo obligatorio").min(1, "Minimo 1 caracteres"),
                madreTelefono: yup.string().required("Campo obligatorio").min(10, 'Minimo 10 Dígitos').max(10, 'Maximo 10 Dígitos'),
                nombrePadre: yup.string().required("Campo obligatorio").min(1, "Minimo 1 caracteres"),
                padreTelefono: yup.string().required("Campo obligatorio").min(10, 'Minimo 10 Dígitos').max(10, 'Maximo 10 Dígitos'),
            });
        } else {
            schema = yup.object().shape({
                nombre: yup.string().required("Campo obligatorio").min(1, "Minimo 1 caracteres"),
                email: yup.string().required("Campo obligatorio").min(1, "Minimo 1 caracteres").email('Correo electrónico inválido'),
                password: yup.string().required("Campo obligatorio").min(8, "Minimo 8 caracteres"),
                fechaNacimiento: yup.string().required("Campo obligatorio"),
                nivel: yup.string().required("Obligatorio").min(1, "Minimo 1 caracteres"),
                domicilio: yup.string().required("Campo obligatorio").min(1, "Minimo 1 caracteres"),
                municipio: yup.string().required("Campo obligatorio").min(1, "Minimo 1 caracteres"),
                telefono: yup.string().required("Campo obligatorio").min(10, 'Minimo 10 Dígitos').max(10, 'Maximo 10 Dígitos'),
                contactoEmergencia: yup.string().required("Campo obligatorio").min(10, 'Minimo 10 Dígitos').max(10, 'Maximo 10 Dígitos'),
                mensualidad: yup.string().required("Obligatorio").min(1, "Minimo 1 caracteres"),
                maestro: yup.string().required("Campo obligatorio"),
                instrumento: yup.string().required("Campo obligatorio"),
                promocion: yup.string().required("Campo obligatorio"),
                dia: yup.string().required("Campo obligatorio"),
                hora: yup.string().required("Campo obligatorio")
            });
        }
    }, [menor]);

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
                fecha_inicio: yup.string().required("Campo obligatorio"),
                domicilio: yup.string().required("Campo obligatorio").min(1, "Minimo 1 caracteres"),
                municipio: yup.string().required("Campo obligatorio").min(1, "Minimo 1 caracteres"),
                telefono: yup.string().required("Campo obligatorio").min(10, 'Minimo 10 Dígitos').max(10, 'Maximo 10 Dígitos'),
                contactoEmergencia: yup.string().required("Campo obligatorio").min(10, 'Minimo 10 Dígitos').max(10, 'Maximo 10 Dígitos'),
                clabe: yup.string().required("Obligatorio").min(1, "Minimo 1 caracteres"),
                cuenta: yup.string().required("Obligatorio").min(1, "Minimo 1 caracteres"),
                banco: yup.string().required("Obligatorio").min(1, "Minimo 1 caracteres"),
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
                            url: "/personal/teacher",
                            data: JSON.stringify({ ...values, campus:session.data.campus, role: "MAESTRO", maestroInstrumentos, comprobante: values.comprobante ? 1 : 0}),
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

    useEffect(() => {
        const fetchMaterial = async () => {
            const response = await AxiosClient({
                method: "GET",
                url: "/personal/teacher",
            });
            if (!response.error) {
                setMaestros(response);
                return response;
            }
        };
        fetchMaterial();
    }, []);
    useEffect(() => {
        const fetchMaterial = async () => {
            const response = await AxiosClient({
                method: "GET",
                url: "/instrumento/dos",
            });
            if (!response.error) {
                setInstrumentos(response);
                return response;
            }
        };
        fetchMaterial();
    }, []);
    useEffect(() => {
        const fetchMaterial = async () => {
            const response = await AxiosClient({
                method: "GET",
                url: "/promocion",
            });
            if (!response.error) {
                setPromociones(response);
                return response;
            }
        };
        fetchMaterial();
    }, []);


    const handleAddInstrumento = (nombreInstrumento) => {
        const objetoEnLista1 = instrumentos.find(objeto => objeto.instrumento === nombreInstrumento);
        var temp = [...maestroInstrumentos]
        if (objetoEnLista1) {
          temp.push({ ...objetoEnLista1 });
          setMaestroInstrumentos(temp);
        }
      }
    
      const handleSubInstrumento = (nombreInstrumento) => {
        const index = maestroInstrumentos.indexOf(maestroInstrumentos.find(objeto => objeto.instrumento === nombreInstrumento));
        const temp = [...maestroInstrumentos]
        if (index !== -1) {
          temp.splice(index, 1);
          setMaestroInstrumentos(temp);
        }
        console.log(maestroInstrumentos)
      }

    const handleClose = () => {
        form.resetForm();
        onClose();
    }
    return <Modal
    backdrop='static'
    keyboard={false}
    show={isOpen}
    onHide={handleClose}
    size="xl"
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
        Registrar Maestro
      </Modal.Title>
    </Modal.Header>
    <Modal.Body style={{
        padding: '2rem',
        backgroundColor: '#FFFFFF',
        maxHeight: '75vh',
        overflow: 'auto'
    }}>
      <Form onSubmit={form.handleSubmit}>
        <div style={{
            fontSize: "1.25rem",
            fontWeight: "700",
            color: "#1F2937",
            marginBottom: "1.5rem",
            paddingBottom: "0.75rem",
            borderBottom: "2px solid #E5E7EB"
        }}>
            Datos del Maestro
        </div>
        <div className="InputContainer4">
          <Form.Group className='mb-3'>
            <Form.Label style={labelStyle} htmlFor='name'>Nombre</Form.Label>
            <Form.Control style={inputStyle} name='name' placeholder="Pablo" value={form.values.name} onChange={form.handleChange} />
            {
              form.errors.name && (<span className='error-text' style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.name}</span>)
            }
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label style={labelStyle} htmlFor='fechaNacimiento'>Fecha de Nacimiento</Form.Label>
            <Form.Control type='date' name='fechaNacimiento' placeholder="" value={form.values.fechaNacimiento} onChange={form.handleChange} />
            {
              form.errors.fechaNacimiento && (<span className='error-text' style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.fechaNacimiento}</span>)
            }
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label style={labelStyle} htmlFor='email'>Email</Form.Label>
            <Form.Control type='email' name='email' placeholder="correo@dominio.com" value={form.values.email} onChange={form.handleChange} />
            {
              form.errors.email && (<span className='error-text' style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.email}</span>)
            }
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label style={labelStyle} htmlFor='fecha_inicio'>Fecha de Inicio</Form.Label>
            <Form.Control type='date' name='fecha_inicio' placeholder="" value={form.values.fecha_inicio} onChange={form.handleChange} />
            {
              form.errors.fecha_inicio && (<span className='error-text' style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.fecha_inicio}</span>)
            }
          </Form.Group>
          {/* <Form.Group className="mb-3">
                      <Form.Label style={labelStyle} htmlFor="hora">Horario</Form.Label>
                      <div className="InputSelect">
                          <Form.Select
                              className="TeeRedInputCompleto"
                              placeholder=""
                              name="hora"
                              value={form.values.hora}
                              onChange={form.handleChange}
                          >
                              <option value="">Selecciona un Horario</option>
                              <option value="08:00">08:00</option>
                              <option value="09:00">09:00</option>
                              <option value="10:00">10:00</option>
                              <option value="11:00">11:00</option>
                              <option value="12:00">12:00</option>
                              <option value="13:00">13:00</option>
                              <option value="14:00">14:00</option>
                              <option value="15:00">15:00</option>
                              <option value="16:00">16:00</option>
                              <option value="17:00">17:00</option>
                              <option value="18:00">18:00</option>
                          </Form.Select>
                      </div>

                      {form.errors.hora && (
                          <span className="error-text">{form.errors.hora}</span>
                      )}
                  </Form.Group> */}
          {/* <Form.Group className='mb-3'>
                          <Form.Label style={labelStyle} htmlFor='abbreviation'>Contraseña</Form.Label>
                          <Form.Control type='password' name='password' placeholder="*****" value={form.values.password} onChange={form.handleChange} />
                          {
                              form.errors.password && (<span className='error-text' style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.password}</span>)
                          }
                      </Form.Group> */}
        </div>
        <div className="InputContainer4" style={{ width: "100%" }}>
          <Form.Group className='mb-3'>
            <Form.Label style={labelStyle} htmlFor='domicilio'>Domicilio</Form.Label>
            <Form.Control style={inputStyle} name='domicilio' placeholder="Calle #34" value={form.values.domicilio} onChange={form.handleChange} />
            {
              form.errors.domicilio && (<span className='error-text' style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.domicilio}</span>)
            }
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label style={labelStyle} htmlFor='municipio'>Municipio</Form.Label>
            <Form.Control style={inputStyle} name='municipio' placeholder="Temixco" value={form.values.municipio} onChange={form.handleChange} />
            {
              form.errors.municipio && (<span className='error-text' style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.municipio}</span>)
            }
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label style={labelStyle} htmlFor='telefono'>Telefono</Form.Label>
            <Form.Control type='number' min={0} name='telefono' placeholder="7771234567" value={form.values.telefono} onChange={form.handleChange} />
            {
              form.errors.telefono && (<span className='error-text' style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.telefono}</span>)
            }
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label style={labelStyle} htmlFor='contactoEmergencia'>Contacto de Emergencia</Form.Label>
            <Form.Control type='number' min={0} name='contactoEmergencia' placeholder="7777654321" value={form.values.contactoEmergencia} onChange={form.handleChange} />
            {
              form.errors.contactoEmergencia && (<span className='error-text' style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.contactoEmergencia}</span>)
            }
          </Form.Group>
          {/* <Form.Group className="mb-3">
                      <Form.Label style={labelStyle} htmlFor="dia">Día</Form.Label>
                      <div className="InputSelect">
                          <Form.Select
                              className="TeeRedInputCompleto"
                              placeholder=""
                              name="dia"
                              value={form.values.dia}
                              onChange={form.handleChange}
                          >
                              <option value="">Selecciona un Día</option>
                              <option value="Lunes">Lunes</option>
                              <option value="Martes">Martes</option>
                              <option value="Miercoles">Miercoles</option>
                              <option value="Jueves">Jueves</option>
                              <option value="Viernes">Viernes</option>
                              <option value="Sabado">Sabado</option>
                              <option value="Domingo">Domingo</option>
                          </Form.Select>
                      </div>

                      {form.errors.dia && (
                          <span className="error-text">{form.errors.dia}</span>
                      )}
                  </Form.Group> */}
        </div>
        <div style={{
            fontSize: "1.25rem",
            fontWeight: "700",
            color: "#1F2937",
            marginBottom: "1.5rem",
            marginTop: "2rem",
            paddingBottom: "0.75rem",
            borderBottom: "2px solid #E5E7EB"
        }}>
            Datos Bancarios
        </div>
        <div className="InputContainer4-2">
          <div className="InputContainer3" style={{ width: "89%" }}>
            <Form.Group className='mb-3'>
              <Form.Label style={labelStyle} htmlFor='clabe'>Clabe</Form.Label>
              <Form.Control style={inputStyle} name='clabe' placeholder="123456789012345678" value={form.values.clabe} onChange={form.handleChange} />
              {
                form.errors.clabe && (<span className='error-text' style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.clabe}</span>)
              }
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label style={labelStyle} htmlFor='cuenta'>Cuenta</Form.Label>
              <Form.Control style={inputStyle} name='cuenta' placeholder="1234567890123456" value={form.values.cuenta} onChange={form.handleChange} />
              {
                form.errors.cuenta && (<span className='error-text' style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.cuenta}</span>)
              }
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label style={labelStyle} htmlFor='banco'>Banco</Form.Label>
              <Form.Control style={inputStyle} name='banco' placeholder="BBVA" value={form.values.banco} onChange={form.handleChange} />
              {
                form.errors.banco && (<span className='error-text' style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.banco}</span>)
              }
            </Form.Group>
          </div>
          <div className="InputContainer1" style={{ width: "10%" }}>
            <Form.Group className='mb-3' id='ComprobanteInput'>
              <Form.Label style={labelStyle} htmlFor='comprobante'>
                <TbHomeSearch className='DataIcon' style={{ height: 20, width: 25, marginBottom: 0 }} /></Form.Label>
              <Form.Check checked={form.values.comprobante} id='CheckInput' name='comprobante' placeholder="" value={form.values.comprobante} onChange={form.handleChange} />
              {
                form.errors.comprobante && (<span className='error-text' style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.comprobante}</span>)
              }
            </Form.Group>
          </div>
        </div>
        <div style={{
            fontSize: "1.25rem",
            fontWeight: "700",
            color: "#1F2937",
            marginBottom: "1.5rem",
            marginTop: "2rem",
            paddingBottom: "0.75rem",
            borderBottom: "2px solid #E5E7EB"
        }}>
            Instrumentos
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{
              padding: '1rem',
              borderRadius: '12px',
              backgroundColor: '#FFFFFF',
              border: '2px solid #E5E7EB',
              minHeight: '200px'
          }}>
            <p style={{
                fontSize: '0.875rem',
                fontWeight: '700',
                color: '#1F2937',
                marginBottom: '1rem',
                padding: '0.75rem',
                backgroundColor: '#F9FAFB',
                borderRadius: '8px',
                textAlign: 'center'
            }}>
                Instrumentos No Impartidos
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {instrumentos.filter(objeto1 =>
                !maestroInstrumentos.some(objeto2 => objeto1.instrumento === objeto2.instrumento)
              ).map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleAddInstrumento(item.instrumento)}
                  style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '8px',
                      backgroundColor: '#F3F4F6',
                      color: '#4B5563',
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      border: '2px solid #E5E7EB'
                  }}
                  onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#10B981';
                      e.currentTarget.style.color = '#FFFFFF';
                      e.currentTarget.style.borderColor = '#10B981';
                  }}
                  onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#F3F4F6';
                      e.currentTarget.style.color = '#4B5563';
                      e.currentTarget.style.borderColor = '#E5E7EB';
                  }}
                >
                  {item.instrumento}
                </div>
              ))}
            </div>
          </div>
          <div style={{
              padding: '1rem',
              borderRadius: '12px',
              backgroundColor: '#FFFFFF',
              border: '2px solid #E5E7EB',
              minHeight: '200px'
          }}>
            <p style={{
                fontSize: '0.875rem',
                fontWeight: '700',
                color: '#1F2937',
                marginBottom: '1rem',
                padding: '0.75rem',
                backgroundColor: '#EFF6FF',
                borderRadius: '8px',
                textAlign: 'center'
            }}>
                Instrumentos Impartidos
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {maestroInstrumentos.map((item) => (
                <div
                  key={item.id}
                  onClick={()=>handleSubInstrumento(item.instrumento)}
                  style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '8px',
                      backgroundColor: '#2563EB',
                      color: '#FFFFFF',
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      border: '2px solid #2563EB'
                  }}
                  onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#EF4444';
                      e.currentTarget.style.borderColor = '#EF4444';
                  }}
                  onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#2563EB';
                      e.currentTarget.style.borderColor = '#2563EB';
                  }}
                >
                  {item.instrumento}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* <div className="InputContainer4-2">
                  <div className="InputContainer5">
                      <Form.Group className="mb-3">
                          <Form.Label style={labelStyle} htmlFor="maestro">Maestro</Form.Label>
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
                                      <option key={item.id} value={item.id}>
                                          {item.name}
                                      </option>
                                  ))}
                              </Form.Select>
                          </div>

                          {form.errors.maestro && (
                              <span className="error-text">{form.errors.maestro}</span>
                          )}
                      </Form.Group>
                      <Form.Group className="mb-3">
                          <Form.Label style={labelStyle} htmlFor="instrumento">Instrumento</Form.Label>
                          <div className="InputSelect">
                              <Form.Select
                                  className="TeeRedInputCompleto"
                                  placeholder=""
                                  name="instrumento"
                                  value={form.values.instrumento}
                                  onChange={form.handleChange}
                              >
                                  <option value="">Selecciona un Instrumento</option>
                                  {instrumentos.map((item) => (
                                      <option key={item.id} value={item.id}>
                                          {item.instrumento}
                                      </option>
                                  ))}
                              </Form.Select>
                          </div>

                          {form.errors.instrumento && (
                              <span className="error-text">{form.errors.instrumento}</span>
                          )}
                      </Form.Group>

                  </div>
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