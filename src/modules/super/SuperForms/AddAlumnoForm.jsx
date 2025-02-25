import React, { useEffect, useState, useContext } from 'react'
import { Button, Col, Row, Form, Modal, FormGroup } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import FeatherIcon from 'feather-icons-react'
import AxiosClient from '../../../shared/plugins/axios';
import Alert, { confirmMsj, confirmTitle, succesMsj, successTitle, errorMsj, errorTitle } from '../../../shared/plugins/alerts';
import '../../../utils/styles/UserNuevoTrabajo.css';
import { AuthContext } from '../../auth/authContext';


const generateRandomLetter = () => {
    const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ'; // Exclude I, O, Q
    return letters.charAt(Math.floor(Math.random() * letters.length));
};

export const AddUserForm = ({ isOpen, cargarDatos, onClose, option }) => {
    const [menor, setMenor] = useState(false);
    const [maestros, setMaestros] = useState([]);
    const [instrumentos, setInstrumentos] = useState([]);
    const [horarios, setHorarios] = useState([]);
    const [promociones, setPromociones] = useState([]);
    const [numInstrumentos, setNumInstrumentos] = useState(1);
    const session = JSON.parse(localStorage.getItem('user') || null);
    const { user } = useContext(AuthContext);
    let schema;

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

    useEffect(() => {
        if (menor) {
            schema = yup.object().shape({
                nombre: yup.string().required("Campo obligatorio").min(1, "Minimo 1 caracteres"),
                email: yup.string().required("Campo obligatorio").min(1, "Minimo 1 caracteres").email('Correo electrónico inválido'),
                password: yup.string().required("Campo obligatorio").min(8, "Minimo 8 caracteres"),
                fechaNacimiento: yup.string().required("Campo obligatorio"),
                nivel: yup.string().required("Obligatorio").min(1, "Minimo 1 caracteres"),
                domicilio: yup.string().required("Campo obligatorio").min(1, "Minimo 1 caracteres").max(250, "Maximo 250 caracteres"),
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
                domicilio: yup.string().required("Campo obligatorio").min(1, "Minimo 1 caracteres").max(250, "Maximo 250 caracteres"),
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
                nombreMadre: yup.string().required("Campo obligatorio").min(1, "Minimo 1 caracteres"),
                madreTelefono: yup.string().required("Campo obligatorio").min(10, 'Minimo 10 Dígitos').max(10, 'Maximo 10 Dígitos'),
                nombrePadre: yup.string().required("Campo obligatorio").min(1, "Minimo 1 caracteres"),
                padreTelefono: yup.string().required("Campo obligatorio").min(10, 'Minimo 10 Dígitos').max(10, 'Maximo 10 Dígitos'),
            })
            :
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
            }),
        onSubmit: async (values) => {
            let conteo;
            const nombres = values.name.toUpperCase().split(" ");
            var matricula;
            const cleanNames = nombres.filter(name => name.trim() !== "");

            let initials;
            if (cleanNames.length >= 2) {
                const lastNameIndex = cleanNames.length - 1;
                const secondLastNameIndex = cleanNames.length - 2;
                initials = cleanNames[secondLastNameIndex].substring(0, 1) + cleanNames[lastNameIndex].substring(0, 1);
            } else if (cleanNames.length === 1) {
                initials = cleanNames[0].substring(0, 2);
            } else {
                throw new Error("Insufficient names to generate matricula");
            }

            const year = values.fechaNacimiento.substring(2, 4);
            const month = values.fechaNacimiento.substring(5, 7);
            const randomLetter = generateRandomLetter();
            matricula = `L${initials}${year}${month}${randomLetter}`;

            const checkMatricula = async () => {
                const response = await AxiosClient({
                    method: "GET",
                    url: "/personal/matricula/check/" + matricula,
                });
                if (!response.error) {
                    return response.conteo;
                }
                return 0;
            };
            try {



            } catch (error) {
                console.log(error);
            }
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
                html: await checkMatricula() === 0 ? "<div></div>" : `<div style="color:red">Alumno con matricula ${matricula} ya existe</div>`,
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
                        console.log(JSON.stringify({ ...values, role: "ALUMNO", clases, campus: session.data.campus }));
                        const response = await AxiosClient({
                            method: "POST",
                            url: "/personal/alumno",
                            data: JSON.stringify({ ...values, role: "ALUMNO", clases, campus: session.data.campus }),
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
    }, []);
    useEffect(() => {
        const fetchMaterial = async () => {
            const response = await AxiosClient({
                method: "GET",
                url: "/instrumento",
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

    const handleClose = () => {
        form.resetForm();
        onClose();
    }
    return <Modal
        backdrop='static'
        keyboard={false}
        show={isOpen}
        onHide={handleClose}
        style={{ width: "90vw", display: "flex", alignContent: "start", justifyItems: "start", marginLeft: "5vw", padding: "0", height: "auto", backgroundColor: "white", borderRadius: "1rem", marginTop: "1rem" }}
        dialogClassName="modalAlumnoActualizar"
        id="modalAlumnoR"
    >

        <Modal.Header closeButton >
            <Modal.Title>Agregar Alumno</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={form.handleSubmit}>
                <div style={{ fontSize: "20px", fontWeight: "bolder", borderBottom: "solid 1px black" }}>Datos del Alumno</div>
                <div className="InputContainer4-2">
                    <div className="InputContainer4" style={{ width: "100%" }}>
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
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="promocion">Promocion</Form.Label>
                            <div className="InputSelect">
                                <Form.Select
                                    className="TeeRedInputCompleto"
                                    placeholder=""
                                    name="promocion"
                                    value={form.values.promocion}
                                    onChange={form.handleChange}
                                >
                                    <option value="">Selecciona una Promocion</option>
                                    {promociones.map((item) => item.status ? (
                                        <option key={item.id} value={item.id}>
                                            {item.promocion}
                                        </option>
                                    ) : null)}
                                </Form.Select>
                            </div>

                            {form.errors.promocion && (
                                <span className="error-text">{form.errors.promocion}</span>
                            )}
                        </Form.Group>
                        {/* <Form.Group className='mb-3'>
                            <Form.Label htmlFor='abbreviation'>Contraseña</Form.Label>
                            <Form.Control type='password' name='password' placeholder="*****" value={form.values.password} onChange={form.handleChange} />
                            {
                                form.errors.password && (<span className='error-text'>{form.errors.password}</span>)
                            }
                        </Form.Group> */}
                    </div>
                </div>
                <div className="InputContainer4-2">
                    <div className="InputContainer4" style={{ width: "100%" }}>
                        <Form.Group className='mb-3'>
                            <Form.Label htmlFor='nivel'>Nivel</Form.Label>
                            <Form.Control name='nivel' placeholder="1" value={form.values.nivel} onChange={form.handleChange} />
                            {
                                form.errors.nivel && (<span className='error-text'>{form.errors.nivel}</span>)
                            }
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label htmlFor='mensualidad'>Mensualidad</Form.Label>
                            <Form.Control name='mensualidad' placeholder="0" value={form.values.mensualidad} onChange={form.handleChange} />
                            {
                                form.errors.mensualidad && (<span className='error-text'>{form.errors.mensualidad}</span>)
                            }
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label htmlFor='inscripcion'>Inscripción</Form.Label>
                            <Form.Control name='inscripcion' placeholder="0" value={form.values.inscripcion} onChange={form.handleChange} />
                            {
                                form.errors.inscripcion && (<span className='error-text'>{form.errors.inscripcion}</span>)
                            }
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label htmlFor='fechaInicio'>Fecha de Inicio</Form.Label>
                            <Form.Control type='date' name='fechaInicio' placeholder="" value={form.values.fechaInicio} onChange={form.handleChange} />
                            {
                                form.errors.fechaInicio && (<span className='error-text'>{form.errors.fechaInicio}</span>)
                            }
                        </Form.Group>
                    </div>

                </div>
                <div className="InputContainer4" style={{ height: "50%" }}>
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
                </div>
                <div className="InputTextArea" style={{ width: "100%" }}>

                    <Form.Group className='mb-3 AlumnoGroupTextArea'>
                        <Form.Label htmlFor='observaciones'>Observaciones</Form.Label>
                        <Form.Control className='AlumnoTextArea' as='textarea' name='observaciones' placeholder="Escriba las observaciones" value={form.values.observaciones} onChange={form.handleChange} />
                        {
                            form.errors.observaciones && (<span className='error-text'>{form.errors.observaciones}</span>)
                        }
                    </Form.Group>
                </div>
                <div style={{ fontSize: "20px", fontWeight: "bolder", borderBottom: "solid 1px black", display: "flex", paddingBottom: "5px" }}>
                    <div style={{ width: "58%" }}>Instrumentos</div>
                    <div className="InstrumentosSub" onClick={() => numInstrumentos > 1 && setNumInstrumentos(numInstrumentos - 1)}>
                        {/* <BiMinus className='DataIcon' style={{ height: 20, width: 25 }} /> */}
                        Disminuir Instrumentos
                    </div>
                    <div className="InstrumentosAdd" onClick={() => handleInstrumentosNumber()}>
                        Añadir Instrumentos
                        {/* <FaPlus className='DataIcon' onClick={() => {
            }} style={{ height: 20, width: 25,color: "green" }} /> */}
                    </div>
                </div>
                <div className="InputContainer4" style={{ height: "100%" }}>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="maestro">Maestro</Form.Label>
                        <div className="InputSelect">
                            <Form.Select
                                className="TeeRedInputCompleto"
                                placeholder=""
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
                        </div>

                        {form.errors.maestro1 && (
                            <span className="error-text">{form.errors.maestro1}</span>
                        )}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="instrumento">Instrumento</Form.Label>
                        <div className="InputSelect">
                            <Form.Select
                                className="TeeRedInputCompleto"
                                placeholder=""
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
                        </div>

                        {form.errors.instrumento1 && (
                            <span className="error-text">{form.errors.instrumento1}</span>
                        )}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="dia">Día</Form.Label>
                        <div className="InputSelect">
                            <Form.Select
                                className="TeeRedInputCompleto"
                                placeholder=""
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
                        </div>

                        {form.errors.dia1 && (
                            <span className="error-text">{form.errors.dia1}</span>
                        )}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="hora">Horario</Form.Label>
                        <div className="InputSelect">
                            <Form.Select
                                className="TeeRedInputCompleto"
                                placeholder=""
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
                        </div>

                        {form.errors.hora1 && (
                            <span className="error-text">{form.errors.hora1}</span>
                        )}
                    </Form.Group>
                </div>
                {
                    numInstrumentos > 1 &&
                    <div className="InputContainer4-2">
                        <div className="InputContainer4" style={{ width: "100%" }}>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="maestro">Maestro</Form.Label>
                                <div className="InputSelect">
                                    <Form.Select
                                        className="TeeRedInputCompleto"
                                        placeholder=""
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
                                </div>

                                {form.errors.maestro2 && (
                                    <span className="error-text">{form.errors.maestro2}</span>
                                )}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="instrumento">Instrumento</Form.Label>
                                <div className="InputSelect">
                                    <Form.Select
                                        className="TeeRedInputCompleto"
                                        placeholder=""
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
                                </div>

                                {form.errors.instrumento2 && (
                                    <span className="error-text">{form.errors.instrumento2}</span>
                                )}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="dia">Día</Form.Label>
                                <div className="InputSelect">
                                    <Form.Select
                                        className="TeeRedInputCompleto"
                                        placeholder=""
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
                                </div>

                                {form.errors.dia2 && (
                                    <span className="error-text">{form.errors.dia2}</span>
                                )}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="hora">Horario</Form.Label>
                                <div className="InputSelect">
                                    <Form.Select
                                        className="TeeRedInputCompleto"
                                        placeholder=""
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
                                </div>

                                {form.errors.hora2 && (
                                    <span className="error-text">{form.errors.hora2}</span>
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
                                <Form.Label htmlFor="maestro">Maestro</Form.Label>
                                <div className="InputSelect">
                                    <Form.Select
                                        className="TeeRedInputCompleto"
                                        placeholder=""
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
                                </div>

                                {form.errors.maestro3 && (
                                    <span className="error-text">{form.errors.maestro3}</span>
                                )}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="instrumento">Instrumento</Form.Label>
                                <div className="InputSelect">
                                    <Form.Select
                                        className="TeeRedInputCompleto"
                                        placeholder=""
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
                                </div>

                                {form.errors.instrumento3 && (
                                    <span className="error-text">{form.errors.instrumento3}</span>
                                )}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="dia">Día</Form.Label>
                                <div className="InputSelect">
                                    <Form.Select
                                        className="TeeRedInputCompleto"
                                        placeholder=""
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
                                </div>

                                {form.errors.dia3 && (
                                    <span className="error-text">{form.errors.dia3}</span>
                                )}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="hora">Horario</Form.Label>
                                <div className="InputSelect">
                                    <Form.Select
                                        className="TeeRedInputCompleto"
                                        placeholder=""
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
                                </div>

                                {form.errors.hora3 && (
                                    <span className="error-text">{form.errors.hora3}</span>
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
                                <Form.Label htmlFor="maestro">Maestro</Form.Label>
                                <div className="InputSelect">
                                    <Form.Select
                                        className="TeeRedInputCompleto"
                                        placeholder=""
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
                                </div>

                                {form.errors.maestro4 && (
                                    <span className="error-text">{form.errors.maestro4}</span>
                                )}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="instrumento">Instrumento</Form.Label>
                                <div className="InputSelect">
                                    <Form.Select
                                        className="TeeRedInputCompleto"
                                        placeholder=""
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
                                </div>

                                {form.errors.instrumento4 && (
                                    <span className="error-text">{form.errors.instrumento4}</span>
                                )}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="dia">Día</Form.Label>
                                <div className="InputSelect">
                                    <Form.Select
                                        className="TeeRedInputCompleto"
                                        placeholder=""
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
                                </div>

                                {form.errors.dia4 && (
                                    <span className="error-text">{form.errors.dia4}</span>
                                )}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="hora">Horario</Form.Label>
                                <div className="InputSelect">
                                    <Form.Select
                                        className="TeeRedInputCompleto"
                                        placeholder=""
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
                                </div>

                                {form.errors.hora4 && (
                                    <span className="error-text">{form.errors.hora4}</span>
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
                                <Form.Label htmlFor="maestro">Maestro</Form.Label>
                                <div className="InputSelect">
                                    <Form.Select
                                        className="TeeRedInputCompleto"
                                        placeholder=""
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
                                </div>

                                {form.errors.maestro5 && (
                                    <span className="error-text">{form.errors.maestro5}</span>
                                )}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="instrumento">Instrumento</Form.Label>
                                <div className="InputSelect">
                                    <Form.Select
                                        className="TeeRedInputCompleto"
                                        placeholder=""
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
                                </div>

                                {form.errors.instrumento5 && (
                                    <span className="error-text">{form.errors.instrumento5}</span>
                                )}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="dia">Día</Form.Label>
                                <div className="InputSelect">
                                    <Form.Select
                                        className="TeeRedInputCompleto"
                                        placeholder=""
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
                                </div>

                                {form.errors.dia5 && (
                                    <span className="error-text">{form.errors.dia5}</span>
                                )}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="hora">Horario</Form.Label>
                                <div className="InputSelect">
                                    <Form.Select
                                        className="TeeRedInputCompleto"
                                        placeholder=""
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
                                </div>

                                {form.errors.hora5 && (
                                    <span className="error-text">{form.errors.hora5}</span>
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
                                <Form.Label htmlFor="maestro">Maestro</Form.Label>
                                <div className="InputSelect">
                                    <Form.Select
                                        className="TeeRedInputCompleto"
                                        placeholder=""
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
                                </div>

                                {form.errors.maestro6 && (
                                    <span className="error-text">{form.errors.maestro6}</span>
                                )}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="instrumento">Instrumento</Form.Label>
                                <div className="InputSelect">
                                    <Form.Select
                                        className="TeeRedInputCompleto"
                                        placeholder=""
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
                                </div>

                                {form.errors.instrumento6 && (
                                    <span className="error-text">{form.errors.instrumento6}</span>
                                )}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="dia">Día</Form.Label>
                                <div className="InputSelect">
                                    <Form.Select
                                        className="TeeRedInputCompleto"
                                        placeholder=""
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
                                </div>

                                {form.errors.dia6 && (
                                    <span className="error-text">{form.errors.dia6}</span>
                                )}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="hora">Horario</Form.Label>
                                <div className="InputSelect">
                                    <Form.Select
                                        className="TeeRedInputCompleto"
                                        placeholder=""
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
                                </div>

                                {form.errors.hora6 && (
                                    <span className="error-text">{form.errors.hora6}</span>
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
                                <Form.Label htmlFor="maestro">Maestro</Form.Label>
                                <div className="InputSelect">
                                    <Form.Select
                                        className="TeeRedInputCompleto"
                                        placeholder=""
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
                                </div>

                                {form.errors.maestro7 && (
                                    <span className="error-text">{form.errors.maestro7}</span>
                                )}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="instrumento">Instrumento</Form.Label>
                                <div className="InputSelect">
                                    <Form.Select
                                        className="TeeRedInputCompleto"
                                        placeholder=""
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
                                </div>

                                {form.errors.instrumento7 && (
                                    <span className="error-text">{form.errors.instrumento7}</span>
                                )}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="dia">Día</Form.Label>
                                <div className="InputSelect">
                                    <Form.Select
                                        className="TeeRedInputCompleto"
                                        placeholder=""
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
                                </div>

                                {form.errors.dia7 && (
                                    <span className="error-text">{form.errors.dia7}</span>
                                )}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="hora">Horario</Form.Label>
                                <div className="InputSelect">
                                    <Form.Select
                                        className="TeeRedInputCompleto"
                                        placeholder=""
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
                                </div>

                                {form.errors.hora7 && (
                                    <span className="error-text">{form.errors.hora7}</span>
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
                                <Form.Label htmlFor="maestro">Maestro</Form.Label>
                                <div className="InputSelect">
                                    <Form.Select
                                        className="TeeRedInputCompleto"
                                        placeholder=""
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
                                </div>

                                {form.errors.maestro8 && (
                                    <span className="error-text">{form.errors.maestro8}</span>
                                )}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="instrumento">Instrumento</Form.Label>
                                <div className="InputSelect">
                                    <Form.Select
                                        className="TeeRedInputCompleto"
                                        placeholder=""
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
                                </div>

                                {form.errors.instrumento8 && (
                                    <span className="error-text">{form.errors.instrumento8}</span>
                                )}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="dia">Día</Form.Label>
                                <div className="InputSelect">
                                    <Form.Select
                                        className="TeeRedInputCompleto"
                                        placeholder=""
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
                                </div>

                                {form.errors.dia8 && (
                                    <span className="error-text">{form.errors.dia8}</span>
                                )}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="hora">Horario</Form.Label>
                                <div className="InputSelect">
                                    <Form.Select
                                        className="TeeRedInputCompleto"
                                        placeholder=""
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
                                </div>

                                {form.errors.hora8 && (
                                    <span className="error-text">{form.errors.hora8}</span>
                                )}
                            </Form.Group>
                        </div>
                    </div>
                }



                {/* <div className="InputContainer4-2">
                  <div className="InputContainer5">

                  </div>
              </div> */}
                {
                    menor &&
                    <div style={{ fontSize: "20px", fontWeight: "bolder", borderBottom: "solid 1px black" }}>Datos de los Tutores</div>
                }
                {
                    menor ?
                        <div className="InputContainer4">
                            <Form.Group className='mb-3'>
                                <Form.Label htmlFor='nombre'>Nombre de la madre</Form.Label>
                                <Form.Control name='nombreMadre' placeholder="Brisa Sandoval" value={form.values.nombreMadre} onChange={form.handleChange} />
                                {
                                    form.errors.nombreMadre && (<span className='error-text'>{form.errors.nombreMadre}</span>)
                                }
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label htmlFor='madreTelefono'>Contacto de la madre</Form.Label>
                                <Form.Control type='number' min={0} name='madreTelefono' placeholder="7771234567" value={form.values.madreTelefono} onChange={form.handleChange} />
                                {
                                    form.errors.madreTelefono && (<span className='error-text'>{form.errors.madreTelefono}</span>)
                                }
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label htmlFor='nombrePadre'>Nombre del padre</Form.Label>
                                <Form.Control name='nombrePadre' placeholder="Pedro Alvarez" value={form.values.nombrePadre} onChange={form.handleChange} />
                                {
                                    form.errors.nombrePadre && (<span className='error-text'>{form.errors.nombrePadre}</span>)
                                }
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label htmlFor='padreTelefono'>Contacto del padre</Form.Label>
                                <Form.Control type='number' min={0} name='padreTelefono' placeholder="7777654321" value={form.values.padreTelefono} onChange={form.handleChange} />
                                {
                                    form.errors.padreTelefono && (<span className='error-text'>{form.errors.padreTelefono}</span>)
                                }
                            </Form.Group>
                        </div> : ""
                }
                <FormGroup className='mb-3'>
                    <Row style={{ padding: "10px" }}>
                        <Col className='text-start' xs={6} >
                            {
                                menor ? <div className='menorButton' onClick={() => setMenor(false)}>Estudiante Mayor de Edad</div> : <div className='menorButton' onClick={() => setMenor(true)}>Estudiante Menor de Edad</div>
                            }
                        </Col>
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