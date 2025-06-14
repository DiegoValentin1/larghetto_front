import React, { useState, useEffect } from "react";
import { Button, Col, Row, Form, Modal, FormGroup } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import FeatherIcon from "feather-icons-react";
import AxiosClient from "../../../shared/plugins/axios";
import Alert, {
  confirmMsj,
  confirmTitle,
  succesMsj,
  successTitle,
  errorMsj,
  errorTitle,
} from "../../../shared/plugins/alerts";
import { TbHomeSearch } from 'react-icons/tb'

export const EditMaestroForm = ({
  isOpen,
  cargarDatos,
  onClose,
  objeto,
  option,
  maIn,
}) => {
  console.log(objeto)
  const [menor, setMenor] = useState(false);
  const [maestros, setMaestros] = useState([]);
  const [instrumentos, setInstrumentos] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [promociones, setPromociones] = useState([]);
  const [maestroInstrumentos, setMaestroInstrumentos] = useState([]);
  const [numInstrumentos, setNumInstrumentos] = useState(1);
  const [errorConf, setErrorConf] = useState({
    name: yup.string().required("Campo obligatorio").min(1, "Minimo 1 caracteres"),
    email: yup.string().required("Campo obligatorio").min(1, "Minimo 1 caracteres").email('Correo electrónico inválido'),
    fechaNacimiento: yup.string().required("Campo obligatorio"),
    comprobante: yup.string().required("Campo obligatorio"),
    domicilio: yup.string().required("Campo obligatorio").min(1, "Minimo 1 caracteres"),
    municipio: yup.string().required("Campo obligatorio").min(1, "Minimo 1 caracteres"),
    telefono: yup.string().required("Campo obligatorio").min(10, 'Minimo 10 Dígitos').max(10, 'Maximo 10 Dígitos'),
    contactoEmergencia: yup.string().required("Campo obligatorio").min(10, 'Minimo 10 Dígitos').max(10, 'Maximo 10 Dígitos'),
    clabe: yup.string().required("Obligatorio").min(1, "Minimo 1 caracteres"),
    cuenta: yup.string().required("Obligatorio").min(1, "Minimo 1 caracteres"),
    banco: yup.string().required("Obligatorio").min(1, "Minimo 1 caracteres"),
    fecha_inicio: yup.string().required("Campo obligatorio"),
  });

  useEffect(() => {
    setMaestroInstrumentos(maIn);
  }, [maIn])

  const handleInstrumentosNumber = () => {
    if (numInstrumentos < 10) {
      for (let i = 1; i <= numInstrumentos; i++) {
        const tempErr = {};
        const index = i + 1;
        
        tempErr[`instrumento${index}`] = yup.string().required("Campo obligatorio");
        tempErr[`hora${index}`] = yup.string().required("Campo obligatorio");
        tempErr[`dia${index}`] = yup.string().required("Campo obligatorio");
        console.log(index, i, tempErr);
        setErrorConf({ ...errorConf, ...tempErr });
      }
      setNumInstrumentos(numInstrumentos + 1);
    } else {
      Alert.fire({
        title: "Limite de Instrumentos",
        text: "El limite de instrumentos permitido es de 10",
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
      });
    }
  }

  const form = useFormik({
    initialValues: {
      email: "",
      role: "ALUMNO",
      nombre: "",
      fechaNacimiento: "",

    },
    validationSchema:
      yup.object().shape(errorConf),
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
            const clases = [];

            for (let i = 1; i <= numInstrumentos; i++) {
              clases.push({
                instrumento: values[`instrumento${i}`],
                dia: values[`dia${i}`],
                hora: values[`hora${i}`]
              });
            }
            console.log(JSON.stringify({ ...values, role: "ALUMNO" }));
            const response = await AxiosClient({
              method: "PUT",
              url: "/personal/teacher",
              data: JSON.stringify({ ...values, clases, user_id: objeto.user_id, maestroInstrumentos, role: "MAESTRO", comprobante: values.comprobante ? 1 : 0 }),
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

  React.useMemo(() => {
    const { personal_id, name, email, fechaNacimiento, domicilio, municipio, telefono, contactoEmergencia, clabe, cuenta, banco, fecha_inicio, comprobante } = objeto;

    form.values.id = personal_id;
    form.values.name = name;
    form.values.email = email;
    form.values.fechaNacimiento = fechaNacimiento ? fechaNacimiento.substring(0, 10) : fechaNacimiento;
    form.values.clabe = clabe;
    form.values.domicilio = domicilio;
    form.values.municipio = municipio;
    form.values.telefono = telefono;
    form.values.contactoEmergencia = contactoEmergencia;
    form.values.cuenta = cuenta;
    form.values.banco = banco;
    form.values.fecha_inicio = fecha_inicio ? fecha_inicio.substring(0, 10) : fecha_inicio;
    form.values.comprobante = comprobante == 1 ? true : false;
    console.log(maestroInstrumentos);

    const fetchMaterial = async () => {
      const response = await AxiosClient({
        method: "GET",
        url: `/clase/maestro/${objeto.user_id}`,
      });
      if (!response.error) {
        console.log(response);
        for (let i = 0; i < Math.min(response.length, 10); i++) {

          const index = i + 1;
          form.values[`instrumento${index}`] = response[i].id_instrumento;
          form.values[`hora${index}`] = response[i].hora;
          form.values[`dia${index}`] = response[i].dia;
        }

        for (let i = 0; i <= Math.min(response.length, 10); i++) {
          const tempErr = {};
          const index = i + 1;
          tempErr[`instrumento${index}`] = yup.string().required("Campo obligatorio");
          tempErr[`hora${index}`] = yup.string().required("Campo obligatorio");
          tempErr[`dia${index}`] = yup.string().required("Campo obligatorio");
          setErrorConf({ ...errorConf, ...tempErr });
        }

        console.log(form.values);
        setNumInstrumentos(response.length > 0 ? response.length : 1);
        return response;
      }
    };
    objeto.user_id && fetchMaterial();
  }, [objeto]);

  const handleClose = () => {
    form.resetForm();
    onClose();
  };

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

  return (
    <Modal
      backdrop='static'
      keyboard={false}
      show={isOpen}
      onHide={handleClose}
      style={{ width: "90vw", display: "flex", alignContent: "start", justifyItems: "start", marginLeft: "5vw", padding: "0", height: "auto", backgroundColor: "white", borderRadius: "1rem", marginTop: "1rem" }}
      dialogClassName="modalAlumnoActualizar"
      id="modalAlumnoR"
    >
      <Modal.Header closeButton >
        <Modal.Title>Actualizar Maestro</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={form.handleSubmit}>
          <div style={{ fontSize: "20px", fontWeight: "bolder", borderBottom: "solid 1px black" }}>Datos del Maestro</div>
          <div className="InputContainer4">
            <Form.Group className='mb-3'>
              <Form.Label htmlFor='name'>Nombre</Form.Label>
              <Form.Control name='name' placeholder="Pablo" value={form.values.name} onChange={form.handleChange} />
              {
                form.errors.name && (<span className='error-text'>{form.errors.name}</span>)
              }
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label htmlFor='fechaNacimiento'>Fecha de Nacimiento</Form.Label>
              <Form.Control type='date' name='fechaNacimiento' placeholder="" value={form.values.fechaNacimiento} onChange={form.handleChange} />
              {
                form.errors.fechaNacimiento && (<span className='error-text'>{form.errors.fechaNacimiento}</span>)
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
              <Form.Label htmlFor='fecha_inicio'>Fecha de Inicio</Form.Label>
              <Form.Control type='date' name='fecha_inicio' placeholder="" value={form.values.fecha_inicio} onChange={form.handleChange} />
              {
                form.errors.fecha_inicio && (<span className='error-text'>{form.errors.fecha_inicio}</span>)
              }
            </Form.Group>
            {/* <Form.Group className="mb-3">
                        <Form.Label htmlFor="hora">Horario</Form.Label>
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
                            <Form.Label htmlFor='abbreviation'>Contraseña</Form.Label>
                            <Form.Control type='password' name='password' placeholder="*****" value={form.values.password} onChange={form.handleChange} />
                            {
                                form.errors.password && (<span className='error-text'>{form.errors.password}</span>)
                            }
                        </Form.Group> */}
          </div>
          <div className="InputContainer4" style={{ width: "100%" }}>
            <Form.Group className='mb-3'>
              <Form.Label htmlFor='domicilio'>Domicilio</Form.Label>
              <Form.Control name='domicilio' placeholder="Calle #34" value={form.values.domicilio} onChange={form.handleChange} />
              {
                form.errors.domicilio && (<span className='error-text'>{form.errors.domicilio}</span>)
              }
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label htmlFor='municipio'>Municipio</Form.Label>
              <Form.Control name='municipio' placeholder="Temixco" value={form.values.municipio} onChange={form.handleChange} />
              {
                form.errors.municipio && (<span className='error-text'>{form.errors.municipio}</span>)
              }
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label htmlFor='telefono'>Telefono</Form.Label>
              <Form.Control type='number' min={0} name='telefono' placeholder="7771234567" value={form.values.telefono} onChange={form.handleChange} />
              {
                form.errors.telefono && (<span className='error-text'>{form.errors.telefono}</span>)
              }
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label htmlFor='contactoEmergencia'>Contacto de Emergencia</Form.Label>
              <Form.Control type='number' min={0} name='contactoEmergencia' placeholder="7777654321" value={form.values.contactoEmergencia} onChange={form.handleChange} />
              {
                form.errors.contactoEmergencia && (<span className='error-text'>{form.errors.contactoEmergencia}</span>)
              }
            </Form.Group>
            {/* <Form.Group className="mb-3">
                        <Form.Label htmlFor="dia">Día</Form.Label>
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
          <div style={{ fontSize: "20px", fontWeight: "bolder", borderBottom: "solid 1px black" }}>Datos Bancarios</div>
          <div className="InputContainer4-2">
            <div className="InputContainer3" style={{ width: "89%" }}>
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
            </div>
            <div className="InputContainer1" style={{ width: "10%" }}>
              <Form.Group className='mb-3' id='ComprobanteInput'>
                <Form.Label htmlFor='comprobante'>
                  <TbHomeSearch className='DataIcon' style={{ height: 20, width: 25, marginBottom: 0 }} /></Form.Label>
                <Form.Check checked={form.values.comprobante} id='CheckInput' name='comprobante' placeholder="" value={form.values.comprobante} onChange={form.handleChange} />
                {
                  form.errors.comprobante && (<span className='error-text'>{form.errors.comprobante}</span>)
                }
              </Form.Group>
            </div>
          </div>

          {/* Horario de los profesores */}

          <div style={{ fontSize: "20px", fontWeight: "bolder", borderBottom: "solid 1px black", display: "flex", paddingBottom: "5px" }}>
            <div style={{ width: "58%" }}>Horarios</div>
            <div className="InstrumentosSub" onClick={() => numInstrumentos > 1 && setNumInstrumentos(numInstrumentos - 1)}>
              Disminuir Horarios
            </div>
            <div className="InstrumentosAdd" onClick={() => handleInstrumentosNumber()}>
              Añadir Horarios
            </div>
          </div>
          {
            Array.from({ length: 10 }, (_, index) => {
              const instrumentoIndex = index + 1;
              return numInstrumentos >= instrumentoIndex && (
                <div className="InputContainer3" style={{ height: "100%" }} key={instrumentoIndex}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor={`instrumento${instrumentoIndex}`}>Instrumento</Form.Label>
                    <div className="InputSelect">
                      <Form.Select
                        className="TeeRedInputCompleto"
                        placeholder=""
                        name={`instrumento${instrumentoIndex}`}
                        value={form.values[`instrumento${instrumentoIndex}`]}
                        onChange={form.handleChange}
                      >
                        <option value="">Selecciona un Instrumento</option>
                        {maestroInstrumentos.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.instrumento}
                          </option>
                        ))}
                      </Form.Select>
                    </div>

                    {form.errors[`instrumento${instrumentoIndex}`] && (
                      <span className="error-text">{form.errors[`instrumento${instrumentoIndex}`]}</span>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor={`dia${instrumentoIndex}`}>Día</Form.Label>
                    <div className="InputSelect">
                      <Form.Select
                        className="TeeRedInputCompleto"
                        placeholder=""
                        name={`dia${instrumentoIndex}`}
                        value={form.values[`dia${instrumentoIndex}`]}
                        onChange={form.handleChange}
                      >
                        <option value="">Selecciona un Día</option>
                        <option value="Lunes">Lunes</option>
                        <option value="Martes">Martes</option>
                        <option value="Miércoles">Miércoles</option>
                        <option value="Jueves">Jueves</option>
                        <option value="Viernes">Viernes</option>
                        <option value="Sábado">Sábado</option>
                        <option value="Domingo">Domingo</option>
                      </Form.Select>
                    </div>

                    {form.errors[`dia${instrumentoIndex}`] && (
                      <span className="error-text">{form.errors[`dia${instrumentoIndex}`]}</span>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor={`hora${instrumentoIndex}`}>Horario</Form.Label>
                    <div className="InputSelect">
                      <Form.Select
                        className="TeeRedInputCompleto"
                        placeholder=""
                        name={`hora${instrumentoIndex}`}
                        value={form.values[`hora${instrumentoIndex}`]}
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

                    {form.errors[`hora${instrumentoIndex}`] && (
                      <span className="error-text">{form.errors[`hora${instrumentoIndex}`]}</span>
                    )}
                  </Form.Group>
                </div>
              );
            })
          }



          <div style={{ fontSize: "20px", fontWeight: "bolder", borderBottom: "solid 1px black" }}>Instrumentos</div>
          <div className="MaestroInstrumentosContainer">
            <div className="InstrumentosContainer">
              <p className="InstrumentosInstrumentoTitulo">Instrumentos No Impartidos</p>
              {instrumentos.filter(objeto1 =>
                !maestroInstrumentos.some(objeto2 => objeto1.instrumento === objeto2.instrumento)
              ).map((item) => (
                <div className="InstrumentosInstrumento" key={item.id} onClick={() => handleAddInstrumento(item.instrumento)}>
                  {item.instrumento}
                </div>
              ))}
            </div>
            <div className="InstrumentosContainer">
              <p className="InstrumentosInstrumentoTitulo">Instrumentos Impartidos</p>
              {maestroInstrumentos.map((item) => (
                <div className="InstrumentosInstrumento" key={item.id} onClick={() => handleSubInstrumento(item.instrumento)}>
                  {item.instrumento}
                </div>
              ))}
            </div>
          </div>



          <FormGroup className='mb-3'>
            <Row style={{ padding: "10px" }}>
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
  );
};
