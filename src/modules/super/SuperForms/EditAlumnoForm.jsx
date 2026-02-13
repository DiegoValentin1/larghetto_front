import React, { useState, useEffect, useContext } from "react";
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
import { FaPlus } from 'react-icons/fa'
import { BiMinus } from 'react-icons/bi'

import "../../../utils/styles/DataTable.css"
import { AuthContext } from "../../auth/authContext";

// const instrumentoForm = (numero) => {
//   return <div className="InputContainer4-2">
//     <div className="InputContainer4" style={{ width: "100%" }}>
//       <Form.Group className="mb-3">
//         <Form.Label htmlFor="maestro">Maestro</Form.Label>
//         <div className="InputSelect">
//           <Form.Select style={inputStyle}
//             
//             
//             name="maestro3"
//             value={form.values[`maestro${numero}`]}
//             onChange={form.handleChange}
//           >
//             <option value="">Selecciona un Maestro</option>
//             {maestros.map((item) => (
//               <option key={item.id} value={item.user_id}>
//                 {item.name}
//               </option>
//             ))}
//           </Form.Select>
//         </div>

//         {form.errors.maestro3 && (
//           <span className="error-text">{form.errors.maestro3}</span>
//         )}
//       </Form.Group>
//       <Form.Group className="mb-3">
//         <Form.Label htmlFor="instrumento">Instrumento</Form.Label>
//         <div className="InputSelect">
//           <Form.Select style={inputStyle}
//             
//             
//             name="instrumento3"
//             value={form.values.instrumento3}
//             onChange={form.handleChange}
//           >
//             <option value="">Selecciona un Instrumento</option>
//             {instrumentos.map((item) => (
//               <option key={item.id} value={item.id}>
//                 {item.instrumento}
//               </option>
//             ))}
//           </Form.Select>
//         </div>

//         {form.errors.instrumento3 && (
//           <span className="error-text">{form.errors.instrumento3}</span>
//         )}
//       </Form.Group>
//       <Form.Group className="mb-3">
//         <Form.Label htmlFor="dia">Día</Form.Label>
//         <div className="InputSelect">
//           <Form.Select style={inputStyle}
//             
//             
//             name="dia3"
//             value={form.values.dia3}
//             onChange={form.handleChange}
//           >
//             <option value="">Selecciona un Día</option>
//             <option value="Lunes">Lunes</option>
//             <option value="Martes">Martes</option>
//             <option value="Miercoles">Miercoles</option>
//             <option value="Jueves">Jueves</option>
//             <option value="Viernes">Viernes</option>
//             <option value="Sabado">Sabado</option>
//             <option value="Domingo">Domingo</option>
//           </Form.Select>
//         </div>

//         {form.errors.dia3 && (
//           <span className="error-text">{form.errors.dia3}</span>
//         )}
//       </Form.Group>
//       <Form.Group className="mb-3">
//         <Form.Label htmlFor="hora">Horario</Form.Label>
//         <div className="InputSelect">
//           <Form.Select style={inputStyle}
//             
//             
//             name="hora3"
//             value={form.values.hora3}
//             onChange={form.handleChange}
//           >
//             <option value="">Selecciona un Horario</option>
//             <option value="08:00">08:00</option>
//             <option value="09:00">09:00</option>
//             <option value="10:00">10:00</option>
//             <option value="11:00">11:00</option>
//             <option value="12:00">12:00</option>
//             <option value="13:00">13:00</option>
//             <option value="14:00">14:00</option>
//             <option value="15:00">15:00</option>
//             <option value="16:00">16:00</option>
//             <option value="17:00">17:00</option>
//             <option value="18:00">18:00</option>
//           </Form.Select>
//         </div>

//         {form.errors.hora3 && (
//           <span className="error-text">{form.errors.hora3}</span>
//         )}
//       </Form.Group>
//     </div>
//   </div>
// }

export const EditUserForm = ({
  isOpen,
  cargarDatos,
  onClose,
  objeto,
  option
}) => {
  console.log(objeto)
  const [menor, setMenor] = useState(false);
  const [maestros, setMaestros] = useState([]);
  const [instrumentos, setInstrumentos] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [numInstrumentos, setNumInstrumentos] = useState(1);
  const [promociones, setPromociones] = useState([]);
  const [pagos, setPagos] = useState([]);
  const [instrumentosMaestros, setInstrumentosMaestros] = useState([]);
  const { user } = useContext(AuthContext);

  // Estilos modernos para inputs y selects
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
    validationSchema: menor ?
      yup.object().shape({
        name: yup.string().required("Campo obligatorio").matches(/^([^ ]* [^ ]*){2,}$/, "Minimo 2 espacios"),
        email: yup.string().required("Campo obligatorio").min(1, "Minimo 1 caracteres").email('Correo electrónico inválido'),
        fechaNacimiento: yup.string().required("Campo obligatorio"),
        nivel: yup.string().required("Obligatorio").min(1, "Minimo 1 caracteres"),
        domicilio: yup.string().required("Campo obligatorio").min(1, "Minimo 1 caracteres").max(250, "Maximo 250 caracteres"),
        municipio: yup.string().required("Campo obligatorio").min(1, "Minimo 1 caracteres"),
        telefono: yup.string().required("Campo obligatorio").min(10, 'Minimo 10 Dígitos').max(10, 'Maximo 10 Dígitos'),
        contactoEmergencia: yup.string().required("Campo obligatorio").min(10, 'Minimo 10 Dígitos').max(10, 'Maximo 10 Dígitos'),
        mensualidad: yup.string().required("Obligatorio").min(1, "Minimo 1 caracteres"),
        promocion: yup.string().required("Campo obligatorio"),
        fechaInicio: yup.string().required("Campo obligatorio"),
        inscripcion: yup.string().required("Obligatorio").min(1, "Minimo 1 caracteres"),
        // nombreMadre: yup.string().required("Campo obligatorio").min(1, "Minimo 1 caracteres"),
        // madreTelefono: yup.string().required("Campo obligatorio").min(10, 'Minimo 10 Dígitos').max(10, 'Maximo 10 Dígitos'),
        // nombrePadre: yup.string().required("Campo obligatorio").min(1, "Minimo 1 caracteres"),
        // padreTelefono: yup.string().required("Campo obligatorio").min(10, 'Minimo 10 Dígitos').max(10, 'Maximo 10 Dígitos'),
      })
      :
      yup.object().shape({
        name: yup.string().required("Campo obligatorio").matches(/^([^ ]* [^ ]*){2,}$/, "Minimo 2 espacios"),
        email: yup.string().required("Campo obligatorio").min(1, "Minimo 1 caracteres").email('Correo electrónico inválido'),
        fechaNacimiento: yup.string().required("Campo obligatorio"),
        fechaInicio: yup.string().required("Campo obligatorio"),
        inscripcion: yup.string().required("Obligatorio").min(1, "Minimo 1 caracteres"),
        nivel: yup.string().required("Obligatorio").min(1, "Minimo 1 caracteres"),
        domicilio: yup.string().required("Campo obligatorio").min(1, "Minimo 1 caracteres").max(250, "Maximo 250 caracteres"),
        municipio: yup.string().required("Campo obligatorio").min(1, "Minimo 1 caracteres"),
        telefono: yup.string().required("Campo obligatorio").min(10, 'Minimo 10 Dígitos').max(10, 'Maximo 10 Dígitos'),
        contactoEmergencia: yup.string().required("Campo obligatorio").min(10, 'Minimo 10 Dígitos').max(10, 'Maximo 10 Dígitos'),
        mensualidad: yup.string().required("Obligatorio").min(1, "Minimo 1 caracteres"),
        promocion: yup.string().required("Campo obligatorio"),
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
            const clases = [];

            for (let i = 1; i <= numInstrumentos; i++) {
              clases.push({
                maestro: values[`maestro${i}`],
                instrumento: values[`instrumento${i}`],
                dia: values[`dia${i}`],
                hora: values[`hora${i}`]
              });
            }
            console.log(JSON.stringify({ ...values, role: "ALUMNO" }));
            console.log("Holaaaaaaa", clases, numInstrumentos, pagos)
            const response = await AxiosClient({
              method: "PUT",
              url: "/personal/alumno",
              data: JSON.stringify({ ...values, role: "ALUMNO", clases, user_id: objeto.user_id, pagos }),
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
        url: "/instrumento/teacher",
      });
      if (!response.error) {
        console.log(response)
        setInstrumentosMaestros(response);
        return response;
      }
    };
    fetchMaterial();
  }, []);

  useEffect(() => {
    const fechaActual = new Date(`${new Date().getFullYear()}-01-01T00:00:00`);
    fechaActual.setMonth(fechaActual.getMonth() - 1);
    console.log(fechaActual);
    const fetchMaterial = async () => {
      const response = await AxiosClient({
        method: "GET",
        url: "/stats/pagos/" + objeto.user_id,
      });
      if (!response.error) {
        console.log(response)
        setPagos(response.map((item) => ({ fecha: item.fecha.slice(0, 10), tipo: item.tipo })));
        console.log(response.map((item) => ({ fecha: item.fecha.slice(0, 10), tipo: item.tipo })));
        handleInputPago(response.map((item) => ({ fecha: item.fecha.slice(0, 10), tipo: item.tipo })));
      }
    };
    fetchMaterial();
  }, []);

  useEffect(() => {
    const fetchMaterial = async () => {
      const response = await AxiosClient({
        method: "GET",
        url: "/personal/teacher/active",
      });
      if (!response.error) {
        console.log(response);
        const responseCamp = user.data.role === 'SUPER' ? response : response.filter(item => item.campus === user.data.campus);
        setMaestros(responseCamp);
        return response;
      }
    };
    fetchMaterial();
  }, [isOpen]);

  useEffect(() => {
    const fetchMaterial = async () => {
      const response = await AxiosClient({
        method: "GET",
        url: "/instrumento",
      });
      if (!response.error) {
        console.log(response);
        setInstrumentos(response);
        return response;
      }
    };
    fetchMaterial();
  }, []);

  const manejarCambioSelect = (event, mes) => {
    const colores = {
      0: "gray",
      1: "green",
      2: "yellow",
      3: "red",
      4: "purple",
      5: "orange",
      6: "pink"
    };
    let { value } = event.target;
    let nuevoMes = mes.split("");
    const mesFormated = nuevoMes[0] === "0" ? nuevoMes[1] : nuevoMes[0] + nuevoMes[1];
    value = parseInt(value);
    const nomMes = document.getElementById('mes' + mesFormated);
    const currentYear = new Date().getFullYear();
    if (value !== 0) {
      nomMes.style.backgroundColor = colores[value];
      const nuevaFecha = `${currentYear}-${mes.toString().padStart(2, '0')}-01`;
      const nuevosPagos = pagos.filter(pago => pago.fecha !== nuevaFecha);
      setPagos([...nuevosPagos, { fecha: nuevaFecha, tipo: value }]);
      console.log([...nuevosPagos, { fecha: nuevaFecha, tipo: value }]);
    } else {
      nomMes.style.backgroundColor = colores[0];
      
      const fechaRemovida = `${currentYear}-${mes.toString().padStart(2, '0')}-01`;
      setPagos(pagos.filter(fecha => fecha.fecha !== fechaRemovida));
      console.log(pagos.filter(fecha => fecha.fecha !== fechaRemovida));
    }
  };

  const handleInputPago = (listaFechas) => {
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

    // Encontrar el mes más alto en la lista de fechas
    let mesMasAlto = 0;
    const listaFechasTemp = [];
    for (let i = 0; i < listaFechas.length; i++) {
      const fecha = new Date(listaFechas[i].fecha);
      const tipo = listaFechas[i].tipo;
      const diferenciaGMT = -7 * 60;
      fecha.setUTCMinutes(fecha.getUTCMinutes() - diferenciaGMT);

      const currentYear = new Date().getFullYear();
      if (fecha.getFullYear() === currentYear) {
        listaFechasTemp.push({ fecha, tipo });
        const mes = fecha.getMonth() + 1;
        console.log(fecha, mes, mesMasAlto);
        if (mes > mesMasAlto) {
          mesMasAlto = mes;
        }
      }
    }
    const colores = {
      0: "gray",
      1: "green",
      2: "yellow",
      3: "red",
      4: "purple",
      5: "orange",
      6: "pink"
    };

    // Marcar y habilitar los checkboxes
    for (let i = 1; i <= 12; i++) {
      const nomMes = document.getElementById('mes' + i);
      nomMes.style.borderRadius = "1rem";
      const checkbox = document.getElementById('pago' + i);
      if (i <= mesMasAlto || i < new Date().getMonth()) {
        const fechaEnMes = listaFechasTemp.find(fecha => new Date(fecha.fecha).getMonth() + 1 === i);
        checkbox.value = fechaEnMes ? fechaEnMes.tipo : "0";
        checkbox.disabled = !((user.data.role === 'SUPER' || (user.data.campus === 'centro' && user.data.role === 'ENCARGADO')));
        nomMes.style.backgroundColor = fechaEnMes ? colores[fechaEnMes.tipo] : colores[0];
      } else {
        checkbox.value = "0";
        nomMes.style.backgroundColor = "gray";
      }
    }
  }

  useEffect(() => {
    const fetchMaterial = async () => {
      const response = await AxiosClient({
        method: "GET",
        url: "/promocion",
      });
            if (!response.error) {
        const sortedResponse = response.sort((a, b) => b.status - a.status);
        setPromociones(sortedResponse);
        return sortedResponse;
      }
    };
    fetchMaterial();

  }, []);

  React.useMemo(() => {
    const { personal_id, name, email, fechaNacimiento, nivel, domicilio, municipio, telefono, contactoEmergencia, mensualidad, promocion_id, observaciones, nombreMadre, nombrePadre, madreTelefono, padreTelefono, inscripcion, fecha_inicio } = objeto;
    form.values.id = personal_id;
    form.values.name = name;
    form.values.email = email;
    form.values.fechaNacimiento = fechaNacimiento ? fechaNacimiento.substring(0, 10) : fechaNacimiento;
    form.values.nivel = nivel;
    form.values.domicilio = domicilio;
    form.values.municipio = municipio;
    form.values.telefono = telefono;
    form.values.contactoEmergencia = contactoEmergencia;
    form.values.mensualidad = mensualidad;
    form.values.promocion = promocion_id;
    // form.values.hora = hora ? hora.substring(0, 5) : hora;
    form.values.observaciones = observaciones;
    form.values.nombreMadre = nombreMadre;
    form.values.nombrePadre = nombrePadre;
    form.values.madreTelefono = madreTelefono;
    form.values.padreTelefono = padreTelefono;
    form.values.inscripcion = inscripcion;
    form.values.fechaInicio = fecha_inicio ? fecha_inicio.substring(0, 10) : fecha_inicio;
    setMenor(nombreMadre !== 'N/A' ? true : false);


    const fetchMaterial = async () => {
      const response = await AxiosClient({
        method: "GET",
        url: `/instrumento/${objeto.user_id}`,
      });
      if (!response.error) {
        console.log(response);
        for (let i = 0; i < Math.min(response.length, 8); i++) {

          const index = i + 1;
          console.log("adkjenfuefefef", index, i)
          form.values[`maestro${index}`] = response[i].id_maestro;
          form.values[`instrumento${index}`] = response[i].id_instrumento;
          form.values[`hora${index}`] = response[i].hora;
          form.values[`dia${index}`] = response[i].dia;
        }

        console.log(form.values);
        setNumInstrumentos(response.length > 0 ? response.length : 1);
        return response;
      }
    };
    objeto.user_id && fetchMaterial();
  }, [objeto]);

  const handleInstrumentosNumber = () => {
    if (numInstrumentos < 8) {
      setNumInstrumentos(numInstrumentos + 1)
    } else {
      Alert.fire({
        title: "Limite de Instrumentos",
        text: "El limite de instrumentos permitido es de 8",
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



  const handleClose = () => {
    form.resetForm();
    onClose();
  };
  return (
    <Modal
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
          Actualizar Alumno
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
            Datos del Alumno
          </div>
          <div className="InputContainer4-2">
            <div className="InputContainer4" style={{ width: "100%" }}>
              <Form.Group className='mb-3'>
                <Form.Label htmlFor='name' style={labelStyle}>Nombre</Form.Label>
                <Form.Control name='name' placeholder="Pablo" value={form.values.name} onChange={form.handleChange} style={inputStyle} />
                {
                  form.errors.name && (<span className='error-text' style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.name}</span>)
                }
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label htmlFor='fechaNacimiento' style={labelStyle}>Fecha de Nacimiento</Form.Label>
                <Form.Control type='date' name='fechaNacimiento' value={form.values.fechaNacimiento} onChange={form.handleChange} style={inputStyle} />
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
              <Form.Group className="mb-3">
                <Form.Label htmlFor="promocion" style={labelStyle}>Promocion</Form.Label>
                <Form.Select style={inputStyle}
                  name="promocion"
                  value={form.values.promocion}
                  onChange={form.handleChange}
                  style={inputStyle}
                >
                  <option value="">Selecciona una Promocion</option>
                  {promociones.map((item) => item.status ? (
                    <option key={item.id} value={item.id}>
                      {item.promocion}
                    </option>
                  ) : (
                    <option key={item.id} value={item.id} disabled>
                      {item.promocion}
                    </option>
                  ))}
                </Form.Select>
                {form.errors.promocion && (
                  <span className="error-text" style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.promocion}</span>
                )}
              </Form.Group>
            </div>
          </div>
          <div className="InputContainer4-2">
            <div className="InputContainer4" style={{ width: "100%" }}>
              <Form.Group className='mb-3'>
                <Form.Label htmlFor='nivel' style={labelStyle}>Nivel</Form.Label>
                <Form.Control name='nivel' placeholder="1" value={form.values.nivel} onChange={form.handleChange} style={inputStyle} />
                {
                  form.errors.nivel && (<span className='error-text' style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.nivel}</span>)
                }
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label htmlFor='mensualidad' style={labelStyle}>Mensualidad</Form.Label>
                <Form.Control name='mensualidad' placeholder="0" value={form.values.mensualidad} onChange={form.handleChange} style={inputStyle} />
                {
                  form.errors.mensualidad && (<span className='error-text' style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.mensualidad}</span>)
                }
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label htmlFor='inscripcion' style={labelStyle}>Inscripción</Form.Label>
                <Form.Control name='inscripcion' placeholder="0" value={form.values.inscripcion} onChange={form.handleChange} style={inputStyle} />
                {
                  form.errors.inscripcion && (<span className='error-text' style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.inscripcion}</span>)
                }
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label htmlFor='fechaInicio' style={labelStyle}>Fecha de Inicio</Form.Label>
                <Form.Control type='date' name='fechaInicio' value={form.values.fechaInicio} onChange={form.handleChange} style={inputStyle} />
                {
                  form.errors.fechaInicio && (<span className='error-text' style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.fechaInicio}</span>)
                }
              </Form.Group>
            </div>

          </div>
          <div className="InputContainer4" style={{ height: "50%" }}>
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
          <div className="InputTextArea" style={{ width: "100%" }}>

            <Form.Group className='mb-3 AlumnoGroupTextArea'>
              <Form.Label htmlFor='observaciones' style={labelStyle}>Observaciones</Form.Label>
              <Form.Control
                as='textarea'
                name='observaciones'
                placeholder="Escriba las observaciones"
                value={form.values.observaciones}
                onChange={form.handleChange}
                style={{
                  minHeight: '100px',
                  borderRadius: '10px',
                  border: '2px solid #E5E7EB',
                  backgroundColor: '#F9FAFB',
                  fontSize: '0.875rem',
                  transition: 'all 0.2s ease',
                  padding: '0.75rem'
                }}
              />
              {
                form.errors.observaciones && (<span className='error-text' style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.observaciones}</span>)
              }
            </Form.Group>
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
            Pagos Por Mes
          </div>
          <div className="InputContainer12" style={{ height: "50%" }}>
            <div>
              <div id="mes1" style={{ padding: '0.5rem', borderRadius: '8px', fontWeight: '600', fontSize: '0.875rem', color: '#1F2937', textAlign: 'center', marginBottom: '0.5rem' }}>Enero</div>
              <div id="mes2" style={{ padding: '0.5rem', borderRadius: '8px', fontWeight: '600', fontSize: '0.875rem', color: '#1F2937', textAlign: 'center', marginBottom: '0.5rem' }}>Febrero</div>
              <div id="mes3" style={{ padding: '0.5rem', borderRadius: '8px', fontWeight: '600', fontSize: '0.875rem', color: '#1F2937', textAlign: 'center', marginBottom: '0.5rem' }}>Marzo</div>
              <div id="mes4" style={{ padding: '0.5rem', borderRadius: '8px', fontWeight: '600', fontSize: '0.875rem', color: '#1F2937', textAlign: 'center', marginBottom: '0.5rem' }}>Abril</div>
              <div id="mes5" style={{ padding: '0.5rem', borderRadius: '8px', fontWeight: '600', fontSize: '0.875rem', color: '#1F2937', textAlign: 'center', marginBottom: '0.5rem' }}>Mayo</div>
              <div id="mes6" style={{ padding: '0.5rem', borderRadius: '8px', fontWeight: '600', fontSize: '0.875rem', color: '#1F2937', textAlign: 'center', marginBottom: '0.5rem' }}>Junio</div>
            </div>
            {/* <div>
              <input type="checkbox" name="" id="pago1" className="pagoInput" onChange={(e) => manejarCambioCheckbox(e, '01')} />
              <input type="checkbox" name="" id="pago2" className="pagoInput" onChange={(e) => manejarCambioCheckbox(e, '02')} />
              <input type="checkbox" name="" id="pago3" className="pagoInput" onChange={(e) => manejarCambioCheckbox(e, '03')} />
              <input type="checkbox" name="" id="pago4" className="pagoInput" onChange={(e) => manejarCambioCheckbox(e, '04')} />
              <input type="checkbox" name="" id="pago5" className="pagoInput" onChange={(e) => manejarCambioCheckbox(e, '05')} />
              <input type="checkbox" name="" id="pago6" className="pagoInput" onChange={(e) => manejarCambioCheckbox(e, '06')} />
              <input type="checkbox" name="" id="pago7" className="pagoInput" onChange={(e) => manejarCambioCheckbox(e, '07')} />
              <input type="checkbox" name="" id="pago8" className="pagoInput" onChange={(e) => manejarCambioCheckbox(e, '08')} />
              <input type="checkbox" name="" id="pago9" className="pagoInput" onChange={(e) => manejarCambioCheckbox(e, '09')} />
              <input type="checkbox" name="" id="pago10" className="pagoInput" onChange={(e) => manejarCambioCheckbox(e, '10')} />
              <input type="checkbox" name="" id="pago11" className="pagoInput" onChange={(e) => manejarCambioCheckbox(e, '11')} />
              <input type="checkbox" name="" id="pago12" className="pagoInput" onChange={(e) => manejarCambioCheckbox(e, '12')} />
            </div> */}
            <div>
              <select id="pago1" className="pagoInput" style={{ height: '38px', borderRadius: '8px', border: '2px solid #E5E7EB', backgroundColor: '#F9FAFB', fontSize: '0.75rem', padding: '0.5rem', cursor: 'pointer' }} onChange={(e) => manejarCambioSelect(e, '01')}>
                <option value="0">No ha pagado</option>
                <option value="1">Pago Normal</option>
                <option value="2">Pago Oportuno</option>
                <option value="3">Pago Tardío</option>
                <option value="4">Equivalencia 25%</option>
                <option value="5">Equivalencia 50%</option>
                <option value="6">Equivalencia 75%</option>
              </select>
              <select id="pago2" className="pagoInput" style={{ height: '38px', borderRadius: '8px', border: '2px solid #E5E7EB', backgroundColor: '#F9FAFB', fontSize: '0.75rem', padding: '0.5rem', cursor: 'pointer' }} onChange={(e) => manejarCambioSelect(e, '02')}>
                <option value="0">No ha pagado</option>
                <option value="1">Pago Normal</option>
                <option value="2">Pago Oportuno</option>
                <option value="3">Pago Tardío</option>
                <option value="4">Equivalencia 25%</option>
                <option value="5">Equivalencia 50%</option>
                <option value="6">Equivalencia 75%</option>
              </select>
              <select id="pago3" className="pagoInput" style={{ height: '38px', borderRadius: '8px', border: '2px solid #E5E7EB', backgroundColor: '#F9FAFB', fontSize: '0.75rem', padding: '0.5rem', cursor: 'pointer' }} onChange={(e) => manejarCambioSelect(e, '03')}>
                <option value="0">No ha pagado</option>
                <option value="1">Pago Normal</option>
                <option value="2">Pago Oportuno</option>
                <option value="3">Pago Tardío</option>
                <option value="4">Equivalencia 25%</option>
                <option value="5">Equivalencia 50%</option>
                <option value="6">Equivalencia 75%</option>
              </select>
              <select id="pago4" className="pagoInput" style={{ height: '38px', borderRadius: '8px', border: '2px solid #E5E7EB', backgroundColor: '#F9FAFB', fontSize: '0.75rem', padding: '0.5rem', cursor: 'pointer' }} onChange={(e) => manejarCambioSelect(e, '04')}>
                <option value="0">No ha pagado</option>
                <option value="1">Pago Normal</option>
                <option value="2">Pago Oportuno</option>
                <option value="3">Pago Tardío</option>
                <option value="4">Equivalencia 25%</option>
                <option value="5">Equivalencia 50%</option>
                <option value="6">Equivalencia 75%</option>
              </select>
              <select id="pago5" className="pagoInput" style={{ height: '38px', borderRadius: '8px', border: '2px solid #E5E7EB', backgroundColor: '#F9FAFB', fontSize: '0.75rem', padding: '0.5rem', cursor: 'pointer' }} onChange={(e) => manejarCambioSelect(e, '05')}>
                <option value="0">No ha pagado</option>
                <option value="1">Pago Normal</option>
                <option value="2">Pago Oportuno</option>
                <option value="3">Pago Tardío</option>
                <option value="4">Equivalencia 25%</option>
                <option value="5">Equivalencia 50%</option>
                <option value="6">Equivalencia 75%</option>
              </select>
              <select id="pago6" className="pagoInput" style={{ height: '38px', borderRadius: '8px', border: '2px solid #E5E7EB', backgroundColor: '#F9FAFB', fontSize: '0.75rem', padding: '0.5rem', cursor: 'pointer' }} onChange={(e) => manejarCambioSelect(e, '06')}>
                <option value="0">No ha pagado</option>
                <option value="1">Pago Normal</option>
                <option value="2">Pago Oportuno</option>
                <option value="3">Pago Tardío</option>
                <option value="4">Equivalencia 25%</option>
                <option value="5">Equivalencia 50%</option>
                <option value="6">Equivalencia 75%</option>
              </select>



            </div>
            <div>
              <div id="mes7" style={{ padding: '0.5rem', borderRadius: '8px', fontWeight: '600', fontSize: '0.875rem', color: '#1F2937', textAlign: 'center', marginBottom: '0.5rem' }}>Julio</div>
              <div id="mes8" style={{ padding: '0.5rem', borderRadius: '8px', fontWeight: '600', fontSize: '0.875rem', color: '#1F2937', textAlign: 'center', marginBottom: '0.5rem' }}>Agosto</div>
              <div id="mes9" style={{ padding: '0.5rem', borderRadius: '8px', fontWeight: '600', fontSize: '0.875rem', color: '#1F2937', textAlign: 'center', marginBottom: '0.5rem' }}>Septiembre</div>
              <div id="mes10" style={{ padding: '0.5rem', borderRadius: '8px', fontWeight: '600', fontSize: '0.875rem', color: '#1F2937', textAlign: 'center', marginBottom: '0.5rem' }}>Octubre</div>
              <div id="mes11" style={{ padding: '0.5rem', borderRadius: '8px', fontWeight: '600', fontSize: '0.875rem', color: '#1F2937', textAlign: 'center', marginBottom: '0.5rem' }}>Noviembre</div>
              <div id="mes12" style={{ padding: '0.5rem', borderRadius: '8px', fontWeight: '600', fontSize: '0.875rem', color: '#1F2937', textAlign: 'center', marginBottom: '0.5rem' }}>Diciembre</div>
            </div>
            <div>
              <select id="pago7" className="pagoInput" style={{ height: '38px', borderRadius: '8px', border: '2px solid #E5E7EB', backgroundColor: '#F9FAFB', fontSize: '0.75rem', padding: '0.5rem', cursor: 'pointer' }} onChange={(e) => manejarCambioSelect(e, '07')}>
                <option value="0">No ha pagado</option>
                <option value="1">Pago Normal</option>
                <option value="2">Pago Oportuno</option>
                <option value="3">Pago Tardío</option>
                <option value="4">Equivalencia 25%</option>
                <option value="5">Equivalencia 50%</option>
                <option value="6">Equivalencia 75%</option>
              </select>
              <select id="pago8" className="pagoInput" style={{ height: '38px', borderRadius: '8px', border: '2px solid #E5E7EB', backgroundColor: '#F9FAFB', fontSize: '0.75rem', padding: '0.5rem', cursor: 'pointer' }} onChange={(e) => manejarCambioSelect(e, '08')}>
                <option value="0">No ha pagado</option>
                <option value="1">Pago Normal</option>
                <option value="2">Pago Oportuno</option>
                <option value="3">Pago Tardío</option>
                <option value="4">Equivalencia 25%</option>
                <option value="5">Equivalencia 50%</option>
                <option value="6">Equivalencia 75%</option>
              </select>
              <select id="pago9" className="pagoInput" style={{ height: '38px', borderRadius: '8px', border: '2px solid #E5E7EB', backgroundColor: '#F9FAFB', fontSize: '0.75rem', padding: '0.5rem', cursor: 'pointer' }} onChange={(e) => manejarCambioSelect(e, '09')}>
                <option value="0">No ha pagado</option>
                <option value="1">Pago Normal</option>
                <option value="2">Pago Oportuno</option>
                <option value="3">Pago Tardío</option>
                <option value="4">Equivalencia 25%</option>
                <option value="5">Equivalencia 50%</option>
                <option value="6">Equivalencia 75%</option>
              </select>
              <select id="pago10" className="pagoInput" style={{ height: '38px', borderRadius: '8px', border: '2px solid #E5E7EB', backgroundColor: '#F9FAFB', fontSize: '0.75rem', padding: '0.5rem', cursor: 'pointer' }} onChange={(e) => manejarCambioSelect(e, '10')}>
                <option value="0">No ha pagado</option>
                <option value="1">Pago Normal</option>
                <option value="2">Pago Oportuno</option>
                <option value="3">Pago Tardío</option>
                <option value="4">Equivalencia 25%</option>
                <option value="5">Equivalencia 50%</option>
                <option value="6">Equivalencia 75%</option>
              </select>
              <select id="pago11" className="pagoInput" style={{ height: '38px', borderRadius: '8px', border: '2px solid #E5E7EB', backgroundColor: '#F9FAFB', fontSize: '0.75rem', padding: '0.5rem', cursor: 'pointer' }} onChange={(e) => manejarCambioSelect(e, '11')}>
                <option value="0">No ha pagado</option>
                <option value="1">Pago Normal</option>
                <option value="2">Pago Oportuno</option>
                <option value="3">Pago Tardío</option>
                <option value="4">Equivalencia 25%</option>
                <option value="5">Equivalencia 50%</option>
                <option value="6">Equivalencia 75%</option>
              </select>
              <select id="pago12" className="pagoInput" style={{ height: '38px', borderRadius: '8px', border: '2px solid #E5E7EB', backgroundColor: '#F9FAFB', fontSize: '0.75rem', padding: '0.5rem', cursor: 'pointer' }} onChange={(e) => manejarCambioSelect(e, '12')}>
                <option value="0">No ha pagado</option>
                <option value="1">Pago Normal</option>
                <option value="2">Pago Oportuno</option>
                <option value="3">Pago Tardío</option>
                <option value="4">Equivalencia 25%</option>
                <option value="5">Equivalencia 50%</option>
                <option value="6">Equivalencia 75%</option>
              </select>



            </div>
          </div>
          <div style={{
            fontSize: "1.25rem",
            fontWeight: "700",
            color: "#1F2937",
            marginBottom: "1.5rem",
            marginTop: "2rem",
            paddingBottom: "0.75rem",
            borderBottom: "2px solid #E5E7EB",
            display: "flex",
            alignItems: "center",
            gap: "1rem"
          }}>
            <div style={{ flex: "1" }}>Instrumentos</div>
            <button
              type="button"
              onClick={() => numInstrumentos > 1 && setNumInstrumentos(numInstrumentos - 1)}
              disabled={numInstrumentos === 1}
              style={{
                backgroundColor: numInstrumentos === 1 ? '#D1D5DB' : '#EF4444',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '0.5rem 1rem',
                fontSize: '0.875rem',
                fontWeight: '600',
                cursor: numInstrumentos === 1 ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                if (numInstrumentos > 1) {
                  e.currentTarget.style.backgroundColor = '#DC2626';
                }
              }}
              onMouseLeave={(e) => {
                if (numInstrumentos > 1) {
                  e.currentTarget.style.backgroundColor = '#EF4444';
                }
              }}
            >
              Disminuir Instrumentos
            </button>
            <button
              type="button"
              onClick={() => handleInstrumentosNumber()}
              style={{
                backgroundColor: '#10B981',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '0.5rem 1rem',
                fontSize: '0.875rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#059669';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#10B981';
              }}
            >
              Añadir Instrumentos
            </button>
          </div>
          <div className="InputContainer4" style={{ height: "100%" }}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="maestro" style={labelStyle}>Maestro</Form.Label>

                <Form.Select style={inputStyle}
                  
                  
                  name="maestro1"
                  value={form.values.maestro1}
                  onChange={form.handleChange}
                >
                  <option value="">Selecciona un Maestro</option>
                  {maestros.map((item) => (
                    <option key={item.id} value={item.user_id}>
                      {item.name}
                    </option>
                  ))}
                </Form.Select>


              {form.errors.maestro1 && (
                <span className="error-text" style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.maestro1}</span>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="instrumento" style={labelStyle}>Instrumento</Form.Label>

                <Form.Select style={inputStyle}
                  
                  
                  name="instrumento1"
                  value={form.values.instrumento1}
                  onChange={form.handleChange}
                >
                  <option value="">Selecciona un Instrumento</option>
                  {instrumentos.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.instrumento}
                    </option>
                  ))}
                </Form.Select>


              {form.errors.instrumento1 && (
                <span className="error-text" style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.instrumento1}</span>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="dia" style={labelStyle}>Día</Form.Label>

                <Form.Select style={inputStyle}
                  
                  
                  name="dia1"
                  value={form.values.dia1}
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


              {form.errors.dia1 && (
                <span className="error-text" style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.dia1}</span>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="hora" style={labelStyle}>Horario</Form.Label>

                <Form.Select style={inputStyle}
                  
                  
                  name="hora1"
                  value={form.values.hora1}
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


              {form.errors.hora1 && (
                <span className="error-text" style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.hora1}</span>
              )}
            </Form.Group>
          </div>
          {
            numInstrumentos > 1 &&
            <div className="InputContainer4-2">
              <div className="InputContainer4" style={{ width: "100%" }}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="maestro" style={labelStyle}>Maestro</Form.Label>
                    <Form.Select style={inputStyle}
                      
                      
                      name="maestro2"
                      value={form.values.maestro2}
                      onChange={form.handleChange}
                    >
                      <option value="">Selecciona un Maestro</option>
                      {maestros.map((item) => (
                        <option key={item.id} value={item.user_id}>
                          {item.name}
                        </option>
                      ))}
                    </Form.Select>

                  {form.errors.maestro2 && (
                    <span className="error-text" style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.maestro2}</span>
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="instrumento" style={labelStyle}>Instrumento</Form.Label>
                    <Form.Select style={inputStyle}
                      
                      
                      name="instrumento2"
                      value={form.values.instrumento2}
                      onChange={form.handleChange}
                    >
                      <option value="">Selecciona un Instrumento</option>
                      {instrumentos.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.instrumento}
                        </option>
                      ))}
                    </Form.Select>

                  {form.errors.instrumento2 && (
                    <span className="error-text" style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.instrumento2}</span>
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="dia" style={labelStyle}>Día</Form.Label>
                    <Form.Select style={inputStyle}
                      
                      
                      name="dia2"
                      value={form.values.dia2}
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

                  {form.errors.dia2 && (
                    <span className="error-text" style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.dia2}</span>
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="hora" style={labelStyle}>Horario</Form.Label>
                    <Form.Select style={inputStyle}
                      
                      
                      name="hora2"
                      value={form.values.hora2}
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

                  {form.errors.hora2 && (
                    <span className="error-text" style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.hora2}</span>
                  )}
                </Form.Group>
              </div>
            </div>
          }
          {
            numInstrumentos > 2 &&
            <div className="InputContainer4-2">
              <div className="InputContainer4" style={{ width: "100%" }}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="maestro" style={labelStyle}>Maestro</Form.Label>
                    <Form.Select style={inputStyle}
                      
                      
                      name="maestro3"
                      value={form.values.maestro3}
                      onChange={form.handleChange}
                    >
                      <option value="">Selecciona un Maestro</option>
                      {maestros.map((item) => (
                        <option key={item.id} value={item.user_id}>
                          {item.name}
                        </option>
                      ))}
                    </Form.Select>

                  {form.errors.maestro3 && (
                    <span className="error-text" style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.maestro3}</span>
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="instrumento" style={labelStyle}>Instrumento</Form.Label>
                    <Form.Select style={inputStyle}
                      
                      
                      name="instrumento3"
                      value={form.values.instrumento3}
                      onChange={form.handleChange}
                    >
                      <option value="">Selecciona un Instrumento</option>
                      {instrumentos.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.instrumento}
                        </option>
                      ))}
                    </Form.Select>

                  {form.errors.instrumento3 && (
                    <span className="error-text" style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.instrumento3}</span>
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="dia" style={labelStyle}>Día</Form.Label>
                    <Form.Select style={inputStyle}
                      
                      
                      name="dia3"
                      value={form.values.dia3}
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

                  {form.errors.dia3 && (
                    <span className="error-text" style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.dia3}</span>
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="hora" style={labelStyle}>Horario</Form.Label>
                    <Form.Select style={inputStyle}
                      
                      
                      name="hora3"
                      value={form.values.hora3}
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

                  {form.errors.hora3 && (
                    <span className="error-text" style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.hora3}</span>
                  )}
                </Form.Group>
              </div>
            </div>
          }
          {
            numInstrumentos > 3 &&
            <div className="InputContainer4-2">
              <div className="InputContainer4" style={{ width: "100%" }}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="maestro" style={labelStyle}>Maestro</Form.Label>
                    <Form.Select style={inputStyle}
                      
                      
                      name="maestro4"
                      value={form.values.maestro4}
                      onChange={form.handleChange}
                    >
                      <option value="">Selecciona un Maestro</option>
                      {maestros.map((item) => (
                        <option key={item.id} value={item.user_id}>
                          {item.name}
                        </option>
                      ))}
                    </Form.Select>

                  {form.errors.maestro4 && (
                    <span className="error-text" style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.maestro4}</span>
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="instrumento" style={labelStyle}>Instrumento</Form.Label>
                    <Form.Select style={inputStyle}
                      
                      
                      name="instrumento4"
                      value={form.values.instrumento4}
                      onChange={form.handleChange}
                    >
                      <option value="">Selecciona un Instrumento</option>
                      {instrumentos.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.instrumento}
                        </option>
                      ))}
                    </Form.Select>

                  {form.errors.instrumento4 && (
                    <span className="error-text" style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.instrumento4}</span>
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="dia" style={labelStyle}>Día</Form.Label>
                    <Form.Select style={inputStyle}
                      
                      
                      name="dia4"
                      value={form.values.dia4}
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

                  {form.errors.dia4 && (
                    <span className="error-text" style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.dia4}</span>
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="hora" style={labelStyle}>Horario</Form.Label>
                    <Form.Select style={inputStyle}
                      
                      
                      name="hora4"
                      value={form.values.hora4}
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

                  {form.errors.hora4 && (
                    <span className="error-text" style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.hora4}</span>
                  )}
                </Form.Group>
              </div>
            </div>
          }
          {
            numInstrumentos > 4 &&
            <div className="InputContainer4-2">
              <div className="InputContainer4" style={{ width: "100%" }}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="maestro" style={labelStyle}>Maestro</Form.Label>
                    <Form.Select style={inputStyle}
                      
                      
                      name="maestro5"
                      value={form.values.maestro5}
                      onChange={form.handleChange}
                    >
                      <option value="">Selecciona un Maestro</option>
                      {maestros.map((item) => (
                        <option key={item.id} value={item.user_id}>
                          {item.name}
                        </option>
                      ))}
                    </Form.Select>

                  {form.errors.maestro5 && (
                    <span className="error-text" style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.maestro5}</span>
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="instrumento" style={labelStyle}>Instrumento</Form.Label>
                    <Form.Select style={inputStyle}
                      
                      
                      name="instrumento5"
                      value={form.values.instrumento5}
                      onChange={form.handleChange}
                    >
                      <option value="">Selecciona un Instrumento</option>
                      {instrumentos.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.instrumento}
                        </option>
                      ))}
                    </Form.Select>

                  {form.errors.instrumento5 && (
                    <span className="error-text" style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.instrumento5}</span>
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="dia" style={labelStyle}>Día</Form.Label>
                    <Form.Select style={inputStyle}
                      
                      
                      name="dia5"
                      value={form.values.dia5}
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

                  {form.errors.dia5 && (
                    <span className="error-text" style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.dia5}</span>
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="hora" style={labelStyle}>Horario</Form.Label>
                    <Form.Select style={inputStyle}
                      
                      
                      name="hora5"
                      value={form.values.hora5}
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

                  {form.errors.hora5 && (
                    <span className="error-text" style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.hora5}</span>
                  )}
                </Form.Group>
              </div>
            </div>
          }
          {
            numInstrumentos > 5 &&
            <div className="InputContainer4-2">
              <div className="InputContainer4" style={{ width: "100%" }}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="maestro" style={labelStyle}>Maestro</Form.Label>
                    <Form.Select style={inputStyle}
                      
                      
                      name="maestro6"
                      value={form.values.maestro6}
                      onChange={form.handleChange}
                    >
                      <option value="">Selecciona un Maestro</option>
                      {maestros.map((item) => (
                        <option key={item.id} value={item.user_id}>
                          {item.name}
                        </option>
                      ))}
                    </Form.Select>

                  {form.errors.maestro6 && (
                    <span className="error-text" style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.maestro6}</span>
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="instrumento" style={labelStyle}>Instrumento</Form.Label>
                    <Form.Select style={inputStyle}
                      
                      
                      name="instrumento6"
                      value={form.values.instrumento6}
                      onChange={form.handleChange}
                    >
                      <option value="">Selecciona un Instrumento</option>
                      {instrumentos.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.instrumento}
                        </option>
                      ))}
                    </Form.Select>

                  {form.errors.instrumento6 && (
                    <span className="error-text" style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.instrumento6}</span>
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="dia" style={labelStyle}>Día</Form.Label>
                    <Form.Select style={inputStyle}
                      
                      
                      name="dia6"
                      value={form.values.dia6}
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

                  {form.errors.dia6 && (
                    <span className="error-text" style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.dia6}</span>
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="hora" style={labelStyle}>Horario</Form.Label>
                    <Form.Select style={inputStyle}
                      
                      
                      name="hora6"
                      value={form.values.hora6}
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

                  {form.errors.hora6 && (
                    <span className="error-text" style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.hora6}</span>
                  )}
                </Form.Group>
              </div>
            </div>
          }
          {
            numInstrumentos > 6 &&
            <div className="InputContainer4-2">
              <div className="InputContainer4" style={{ width: "100%" }}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="maestro" style={labelStyle}>Maestro</Form.Label>
                    <Form.Select style={inputStyle}
                      
                      
                      name="maestro7"
                      value={form.values.maestro7}
                      onChange={form.handleChange}
                    >
                      <option value="">Selecciona un Maestro</option>
                      {maestros.map((item) => (
                        <option key={item.id} value={item.user_id}>
                          {item.name}
                        </option>
                      ))}
                    </Form.Select>

                  {form.errors.maestro7 && (
                    <span className="error-text" style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.maestro7}</span>
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="instrumento" style={labelStyle}>Instrumento</Form.Label>
                    <Form.Select style={inputStyle}
                      
                      
                      name="instrumento7"
                      value={form.values.instrumento7}
                      onChange={form.handleChange}
                    >
                      <option value="">Selecciona un Instrumento</option>
                      {instrumentos.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.instrumento}
                        </option>
                      ))}
                    </Form.Select>

                  {form.errors.instrumento7 && (
                    <span className="error-text" style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.instrumento7}</span>
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="dia" style={labelStyle}>Día</Form.Label>
                    <Form.Select style={inputStyle}
                      
                      
                      name="dia7"
                      value={form.values.dia7}
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

                  {form.errors.dia7 && (
                    <span className="error-text" style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.dia7}</span>
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="hora" style={labelStyle}>Horario</Form.Label>
                    <Form.Select style={inputStyle}
                      
                      
                      name="hora7"
                      value={form.values.hora7}
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

                  {form.errors.hora7 && (
                    <span className="error-text" style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.hora7}</span>
                  )}
                </Form.Group>
              </div>
            </div>
          }
          {
            numInstrumentos > 7 &&
            <div className="InputContainer4-2">
              <div className="InputContainer4" style={{ width: "100%" }}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="maestro" style={labelStyle}>Maestro</Form.Label>
                    <Form.Select style={inputStyle}
                      
                      
                      name="maestro8"
                      value={form.values.maestro8}
                      onChange={form.handleChange}
                    >
                      <option value="">Selecciona un Maestro</option>
                      {maestros.map((item) => (
                        <option key={item.id} value={item.user_id}>
                          {item.name}
                        </option>
                      ))}
                    </Form.Select>

                  {form.errors.maestro8 && (
                    <span className="error-text" style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.maestro8}</span>
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="instrumento" style={labelStyle}>Instrumento</Form.Label>
                    <Form.Select style={inputStyle}
                      
                      
                      name="instrumento8"
                      value={form.values.instrumento8}
                      onChange={form.handleChange}
                    >
                      <option value="">Selecciona un Instrumento</option>
                      {instrumentos.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.instrumento}
                        </option>
                      ))}
                    </Form.Select>

                  {form.errors.instrumento8 && (
                    <span className="error-text" style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.instrumento8}</span>
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="dia" style={labelStyle}>Día</Form.Label>
                    <Form.Select style={inputStyle}
                      
                      
                      name="dia8"
                      value={form.values.dia8}
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

                  {form.errors.dia8 && (
                    <span className="error-text" style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.dia8}</span>
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="hora" style={labelStyle}>Horario</Form.Label>
                    <Form.Select style={inputStyle}
                      
                      
                      name="hora8"
                      value={form.values.hora8}
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

                  {form.errors.hora8 && (
                    <span className="error-text" style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.hora8}</span>
                  )}
                </Form.Group>
              </div>
            </div>
          }

          {/* <div className="InputContainer4-2">
                    <div className="InputContainer5">

      
                </div> */}
          {
            menor &&
            <div style={{
              fontSize: "1.25rem",
              fontWeight: "700",
              color: "#1F2937",
              marginBottom: "1.5rem",
              marginTop: "2rem",
              paddingBottom: "0.75rem",
              borderBottom: "2px solid #E5E7EB"
            }}>
              Datos de los Tutores
            </div>
          }
          {
            menor ?
              <div className="InputContainer4">
                <Form.Group className='mb-3'>
                  <Form.Label htmlFor='nombre' style={labelStyle}>Nombre de la madre</Form.Label>
                  <Form.Control name='nombreMadre' placeholder="Brisa Sandoval" value={form.values.nombreMadre} onChange={form.handleChange} style={inputStyle} />
                  {
                    form.errors.nombreMadre && (<span className='error-text' style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.nombreMadre}</span>)
                  }
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label htmlFor='madreTelefono' style={labelStyle}>Contacto de la madre</Form.Label>
                  <Form.Control type='number' min={0} name='madreTelefono' placeholder="7771234567" value={form.values.madreTelefono} onChange={form.handleChange} style={inputStyle} />
                  {
                    form.errors.madreTelefono && (<span className='error-text' style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.madreTelefono}</span>)
                  }
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label htmlFor='nombrePadre' style={labelStyle}>Nombre del padre</Form.Label>
                  <Form.Control name='nombrePadre' placeholder="Pedro Alvarez" value={form.values.nombrePadre} onChange={form.handleChange} style={inputStyle} />
                  {
                    form.errors.nombrePadre && (<span className='error-text' style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.nombrePadre}</span>)
                  }
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label htmlFor='padreTelefono' style={labelStyle}>Contacto del padre</Form.Label>
                  <Form.Control type='number' min={0} name='padreTelefono' placeholder="7777654321" value={form.values.padreTelefono} onChange={form.handleChange} style={inputStyle} />
                  {
                    form.errors.padreTelefono && (<span className='error-text' style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.padreTelefono}</span>)
                  }
                </Form.Group>
              </div> : ""
          }
          <FormGroup className='mb-3'>
            <Row style={{ padding: "1.5rem 0 0 0", borderTop: "2px solid #E5E7EB", marginTop: "2rem" }}>
              <Col className='text-start' xs={12} md={6} style={{ marginBottom: "1rem" }}>
                <button
                  type="button"
                  onClick={() => setMenor(!menor)}
                  style={{
                    backgroundColor: '#F59E0B',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.625rem 1.25rem',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#D97706';
                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#F59E0B';
                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                  }}
                >
                  {menor ? 'Estudiante Mayor de Edad' : 'Estudiante Menor de Edad'}
                </button>
              </Col>
              <Col className='text-end' xs={12} md={6} style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
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
  );
};
