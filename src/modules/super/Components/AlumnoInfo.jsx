import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Form, Modal, FormGroup } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import FeatherIcon from 'feather-icons-react'
import AxiosClient from '../../../shared/plugins/axios';
import Alert, { confirmMsj, confirmTitle, succesMsj, successTitle, errorMsj, errorTitle } from '../../../shared/plugins/alerts';
import '../../../utils/styles/UserNuevoTrabajo.css';
import { FaUserGraduate } from 'react-icons/fa'

export const AlumnoInfo = ({ isOpen, cargarDatos, onClose, objeto }) => {
    const [menor, setMenor] = useState(false);
    const [maestros, setMaestros] = useState([]);
    const [instrumentos, setInstrumentos] = useState([]);
    const [horarios, setHorarios] = useState([]);
    const [promociones, setPromociones] = useState([]);

    console.log(objeto);

    const form = useFormik({
        initialValues: {
            email: "",
            password: "",
            rol: "",
            nombre: ""
        },
        validationSchema:
            yup.object().shape({
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
                            name: values.nombre
                        }));
                        const response = await AxiosClient({
                            method: "POST",
                            url: "/personal/alumno",
                            data: JSON.stringify({
                                email: values.email,
                                password: values.password,
                                role: "ALUMNO",
                                name: values.nombre,
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
        style={{ width: "90vw", display: "flex", alignContent: "center", justifyItems: "center", marginLeft: "5vw", padding: "0" }}
        dialogClassName="mi-modal-personalizado"
        id="modalAlumnoR"
    >
        <Modal.Header closeButton >
            <Modal.Title>Información Del Alumno</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className='AlumnoInfoMain'>
                <div className="AlumnoInfoLeft"  >
                    <div className="AlumnoInfoMain" style={{ padding: 0 }}>
                        <div className="AlumnoInfoRight" style={{ flexDirection: "column" }}>
                            <div className="AlumnoInfoProfilePicture">
                                <FaUserGraduate className='DataIcon' style={{ height: "70%", width: "70%" }} />
                            </div>
                            <div className="AlumnoInfoBottomInfo">
                                <div className="AlumnoInfoTitleInfo">
                                    <p>Fecha de Nacimiento</p>
                                    <p>{objeto.fechaNacimiento && objeto.fechaNacimiento.substring(0, 10)}</p>
                                </div>
                                <div className="AlumnoInfoTitleInfo">
                                    <p>Domicilio</p>
                                    <p>{objeto.domicilio}</p>
                                </div>
                                <div className="AlumnoInfoTitleInfo">
                                    <p>Municipio</p>
                                    <p>{objeto.municipio}</p>
                                </div>
                                <div className="AlumnoInfoTitleInfo">
                                    <p>Telefono</p>
                                    <p>{objeto.telefono}</p>
                                </div>
                                <div className="AlumnoInfoTitleInfo">
                                    <p>Contacto de Emergencia</p>
                                    <p>{objeto.contactoEmergencia}</p>
                                </div>
                            </div>
                        </div>
                        <div className="AlumnoInfoLeft" style={{ paddingLeft: "3.5rem", flexDirection: "column", paddingTop: "0.5rem" }}>
                            <div className="AlumnoInfoTitleInfo" style={{ height: "7%", marginBottom: "8.8rem" }}>
                                <p style={{ fontSize: "24px", height: "100%" }}>{objeto.name}</p>
                            </div>
                            <div className="AlumnoInfoInfoCentro">
                                <div className="AlumnoInfoTitleInfo" style={{ height: "100%", width: "50%" }}>
                                    <p style={{}}>Instrumento</p>
                                    <p style={{}}>{objeto.instrumento}</p>
                                </div>
                                <div className="AlumnoInfoTitleInfo" style={{ height: "100%", width: "50%" }}>
                                    <p style={{}}>Maestro</p>
                                    <p style={{}}>{objeto.maestro}</p>
                                </div>
                            </div>
                            <div className="AlumnoInfoInfoCentro">
                                <div className="AlumnoInfoTitleInfo" style={{ height: "100%", width: "50%" }}>
                                    <p style={{}}>Mensualidad</p>
                                    <p style={{}}>{objeto.mensualidad}</p>
                                </div>
                                <div className="AlumnoInfoTitleInfo" style={{ height: "100%", width: "50%" }}>
                                    <p style={{}}>Promoción</p>
                                    <p style={{}}>{objeto.promocion}</p>
                                </div>
                            </div>
                            <div className="AlumnoInfoInfoCentro">
                                <div className="AlumnoInfoTitleInfo" style={{ height: "100%", width: "50%" }}>
                                    <p style={{}}>Fecha de Inicio</p>
                                    <p style={{}}>{objeto.fecha_inicio && objeto.fecha_inicio.substring(0, 10)}</p>
                                </div>
                                <div className="AlumnoInfoTitleInfo" style={{ height: "100%", width: "50%" }}>
                                    <p style={{}}>Proximo Pago</p>
                                    <p style={{}}>{objeto.proximo_pago && objeto.proximo_pago.substring(0, 10)}</p>
                                </div>
                            </div>
                            {true ? <><div className="AlumnoInfoInfoCentro">
                                <div className="AlumnoInfoTitleInfo" style={{ height: "100%", width: "50%" }}>
                                    <p style={{}}>Nombre de la Madre</p>
                                    <p style={{}}>{objeto.nombreMadre}</p>
                                </div>
                                <div className="AlumnoInfoTitleInfo" style={{ height: "100%", width: "50%" }}>
                                    <p style={{}}>Contacto de la Madre</p>
                                    <p style={{}}>{objeto.madreTelefono}</p>
                                </div>
                            </div>
                                <div className="AlumnoInfoInfoCentro">
                                    <div className="AlumnoInfoTitleInfo" style={{ height: "100%", width: "50%" }}>
                                        <p style={{}}>Nombre del Padre</p>
                                        <p style={{}}>{objeto.nombrePadre}</p>
                                    </div>
                                    <div className="AlumnoInfoTitleInfo" style={{ height: "100%", width: "50%" }}>
                                        <p style={{}}>Contacto del Padre</p>
                                        <p style={{}}>{objeto.telefonoPadre}</p>
                                    </div>
                                </div></> : ""}
                        </div>
                    </div>
                </div>
                <div className="AlumnoInfoRight" style={{ borderLeft: "solid 2px #333", flexDirection: "column", justifyContent: "start", paddingTop: "0.5rem", paddingLeft: "1.5rem", paddingBottom: "1.5rem" }}>
                    <div className="AlumnoInfoTitleInfo" style={{ height: "7%", textAlign: "center", marginBottom: "3rem" }}>
                        <p style={{ fontSize: "24px", height: "100%" }}>Control de Asistencias</p>
                    </div>
                    <div className='CalendarioMain'>
                        <div className="CalendarioTitulo">
                            <div className="CalendarioTituloMes">Octubre</div>
                            <div className="CalendarioTituloDias">
                                <div className="CalendarioTituloDia">L</div>
                                <div className="CalendarioTituloDia">M</div>
                                <div className="CalendarioTituloDia">M</div>
                                <div className="CalendarioTituloDia">J</div>
                                <div className="CalendarioTituloDia">V</div>
                                <div className="CalendarioTituloDia">S</div>
                                <div className="CalendarioTituloDia">D</div>
                            </div>
                        </div>
                        <div className="CalendarioDiasMain">
                            <div className="CalendarioDias">
                                <div className="CalendarioDia">1</div>
                                <div className="CalendarioDia">2</div>
                                <div className="CalendarioDia">3</div>
                                <div className="CalendarioDia">4</div>
                                <div className="CalendarioDia">5</div>
                                <div className="CalendarioDia">6</div>
                                <div className="CalendarioDia">7</div>
                            </div>
                            <div className="CalendarioDias">
                                <div className="CalendarioDia">8</div>
                                <div className="CalendarioDia">9</div>
                                <div className="CalendarioDia">10</div>
                                <div className="CalendarioDia">11</div>
                                <div className="CalendarioDia">12</div>
                                <div className="CalendarioDia">13</div>
                                <div className="CalendarioDia">14</div>
                            </div>
                            <div className="CalendarioDias">
                                <div className="CalendarioDia">15</div>
                                <div className="CalendarioDia">16</div>
                                <div className="CalendarioDia">17</div>
                                <div className="CalendarioDia">18</div>
                                <div className="CalendarioDia">19</div>
                                <div className="CalendarioDia">20</div>
                                <div className="CalendarioDia">21</div>
                            </div>
                            <div className="CalendarioDias">
                                <div className="CalendarioDia">22</div>
                                <div className="CalendarioDia">23</div>
                                <div className="CalendarioDia">24</div>
                                <div className="CalendarioDia">25</div>
                                <div className="CalendarioDia">26</div>
                                <div className="CalendarioDia">27</div>
                                <div className="CalendarioDia">28</div>
                            </div>
                            <div className="CalendarioDias" style={{justifyContent:"start"}}>
                                <div className="CalendarioDia">29</div>
                                <div className="CalendarioDia">30</div>
                                <div className="CalendarioDia">31</div>
                                {/* <div className="CalendarioDia">4</div>
                                <div className="CalendarioDia">5</div>
                                <div className="CalendarioDia">6</div>
                                <div className="CalendarioDia">7</div> */}
                            </div>
                            <div className="CalendarioDias">
                                {/* <div className="CalendarioDia">1</div>
                                <div className="CalendarioDia">2</div>
                                <div className="CalendarioDia">3</div>
                                <div className="CalendarioDia">4</div>
                                <div className="CalendarioDia">5</div>
                                <div className="CalendarioDia">6</div>
                                <div className="CalendarioDia">7</div> */}
                            </div>
                            <div className="CalendarioDias" style={{borderBottom:"0px"}}>
                                Asistencia <div className='CalendarioCirculo' style={{ backgroundColor: "green" }}></div> Ausencia <div className='CalendarioCirculo' style={{ backgroundColor: "red" }}></div> Neutral <div className='CalendarioCirculo'></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal.Body>
    </Modal>
};