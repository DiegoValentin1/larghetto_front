import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Form, Modal, FormGroup } from 'react-bootstrap';
import { useFormik } from 'formik';
import { FaEdit } from 'react-icons/fa'
import * as yup from 'yup';
import FeatherIcon from 'feather-icons-react'
import AxiosClient from '../../../shared/plugins/axios';
import Alert, { confirmMsj, confirmTitle, succesMsj, successTitle, errorMsj, errorTitle } from '../../../shared/plugins/alerts';
import '../../../utils/styles/UserNuevoTrabajo.css';
import { FaUserGraduate } from 'react-icons/fa';
import { IoMdRepeat } from 'react-icons/io';
import { EditBridaForm } from '../SuperForms/EditInstrumentoForm';
import { AddRepoForm } from './AddRepo';
import { AddPictureModal } from './AddPictureModal';

export const AlumnoInfo = ({ isOpen, onClose, objeto }) => {
    console.log(objeto);

    const [clases, setClases] = useState([]);
    const [asistencias, setAsistencias] = useState([]);
    const [aluRepo, setAluRepo] = useState([]);
    const [isRepo, setIsRepo] = useState(false);
    const [isPicture, setIsPicture] = useState(false);
    const [dia, setDia] = useState(new Date().getDate());
    const [aluImg, setAluImg] = useState(null);

    const cargarClases = async () => {
        try {
            const response = await AxiosClient({
                url: "/personal/clases/" + objeto.user_id,
                method: "GET",
            });
            console.log(response);
            if (!response.error) {
                setClases(response);
            }
        } catch (err) {

            console.log(err);
        }
    }

    useEffect(() => {
        const cargarImagen = async () => {
            try {
                const response = await AxiosClient({
                    url: "/uploads/image/" + objeto.user_id,
                    method: "GET",
                    responseType: 'arraybuffer'
                });
                console.log(response);
                if (!response.error) {
                    const imageBlob = new Blob([response]);
                    const imageUrl = URL.createObjectURL(imageBlob);
                    setAluImg(imageUrl);
                }
            } catch (err) {

                console.log(err);
            }
        }

        cargarImagen();
    }, [isPicture]);

    const cargarAsistencias = async () => {
        try {
            const response = await AxiosClient({
                url: "/personal/alumno/asistencias/" + objeto.user_id,
                method: "GET",
            });
            console.log(response);
            if (!response.error) {
                setAsistencias(response.map(json => ({ fecha: json.fecha.substring(0, 10), id_clase: json.id_clase })));
            }
        } catch (err) {

            console.log(err);
        }
    }

    const cargarAluRepo = async () => {
        try {
            const response = await AxiosClient({
                url: "/personal/alumno/repo/" + objeto.user_id,
                method: "GET",
            });
            console.log(response);
            if (!response.error) {
                setAluRepo(response);
            }
        } catch (err) {

            console.log(err);
        }
    }

    const deleteAluRepo = async (repo_id) => {
        try {
            const response = await AxiosClient({
                url: "/personal/repo/" + repo_id,
                method: "DELETE",
            });
            console.log(response);
            if (!response.error) {
                Alert.fire({
                    title: "Reposición Eliminada",
                    text: "La Reposición se Elimino Correctamente",
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "Aceptar"
                })
                cargarAluRepo();
            }
        } catch (err) {

            console.log(err);
        }
    }

    const saveAsistencia = async (id_alumno, fecha, id_clase) => {
        try {
            const response = await AxiosClient({
                method: "POST",
                url: "/personal/alumno/asistencias",
                data: JSON.stringify({ id_alumno, fecha, id_clase }),
            });
            console.log(response);
            if (!response.error) {
                Alert.fire({
                    title: "Asistencia Guardada",
                    text: "La asistencia se registro correctamente",
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "Aceptar"
                })
                cargarAsistencias();
            }
        } catch (err) {

            console.log(err);
        }
    }
    const removeAsistencia = async (id_alumno, fecha, id_clase) => {
        try {
            const response = await AxiosClient({
                url: "/personal/alumno/asistencias/" + id_alumno + "/" + fecha + "/" + id_clase,
                method: "DELETE",
            });
            console.log(response);
            if (!response.error) {
                Alert.fire({
                    title: "Asistencia removida",
                    text: "La asistencia se removio correctamente",
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "Aceptar"
                })
                cargarAsistencias();
            }
        } catch (err) {

            console.log(err);
        }
    }


    useEffect(() => {
        cargarClases();
        cargarAsistencias();
        cargarAluRepo();
    }, [isOpen, isRepo]);

    function fechasEnDiaDeLaSemana(dia) {
        const fechaActual = new Date();

        const año = fechaActual.getFullYear();
        const mes = fechaActual.getMonth() + 1;

        const primerDiaDelMes = new Date(año, mes - 1, 1);

        let diaDeLaSemana = primerDiaDelMes.getDay();

        const diasSemana = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];

        const indiceDia = diasSemana.indexOf(dia.toLowerCase());

        let diferenciaDias = indiceDia - diaDeLaSemana;
        if (diferenciaDias < 0) {
            diferenciaDias += 7;
        }

        const fechaPrimerDiaProporcionado = new Date(año, mes - 1, 1 + diferenciaDias);

        const fechasEnDia = [];

        while (fechaPrimerDiaProporcionado.getMonth() === mes - 1) {
            const fechaFormateada = fechaPrimerDiaProporcionado.toISOString().split('T')[0];
            fechasEnDia.push(fechaFormateada);
            fechaPrimerDiaProporcionado.setDate(fechaPrimerDiaProporcionado.getDate() + 7);
        }

        return fechasEnDia;
    }

    const handleClose = () => {
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
                Información Del Alumno
            </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{
            padding: '0',
            backgroundColor: '#FFFFFF',
            maxHeight: '80vh',
            overflow: 'auto'
        }}>
            <div className='AlumnoInfoMain' style={{ paddingRight: "0px", padding: "1.5rem", display: "flex", gap: "1.5rem" }}>
                <div className="AlumnoInfoLeft" style={{ flex: "1", minWidth: "50%" }}>
                    <div className="AlumnoInfoMain" style={{ padding: 0, display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                        <div className="AlumnoInfoRight" style={{ flexDirection: "column", display: "flex", gap: "1rem" }}>
                            <div className="AlumnoInfoProfilePicture" style={{
                                width: "200px",
                                height: "200px",
                                borderRadius: "12px",
                                overflow: "hidden",
                                border: "2px solid #E5E7EB",
                                position: "relative",
                                backgroundColor: "#F9FAFB",
                                margin: "0 auto"
                            }}>
                                {aluImg ? <div className='imgContainer' style={{ height: "100%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                                    <div style={{
                                        position: "absolute",
                                        top: "0.5rem",
                                        right: "0.5rem",
                                        backgroundColor: "#2563EB",
                                        borderRadius: "8px",
                                        padding: "0.5rem",
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        transition: "all 0.2s ease",
                                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                                        zIndex: 10
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#1D4ED8"}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#2563EB"}
                                    onClick={() => setIsPicture(true)}>
                                        <FaEdit style={{ color: "white", height: 16, width: 16 }} />
                                    </div>
                                    <img src={aluImg} alt="" style={{ height: "100%", width: "100%", objectFit: "cover" }} />
                                </div> :
                                    <div style={{ height: "100%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                                        <div style={{
                                            position: "absolute",
                                            top: "0.5rem",
                                            right: "0.5rem",
                                            backgroundColor: "#2563EB",
                                            borderRadius: "8px",
                                            padding: "0.5rem",
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            transition: "all 0.2s ease",
                                            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                                            zIndex: 10
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#1D4ED8"}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#2563EB"}
                                        onClick={() => setIsPicture(true)}>
                                            <FaEdit style={{ color: "white", height: 16, width: 16 }} />
                                        </div>
                                        <FaUserGraduate style={{ height: "70%", width: "70%", color: "#9CA3AF" }} />
                                    </div>}
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                                <div style={{
                                    padding: "0.75rem",
                                    borderRadius: "8px",
                                    backgroundColor: "#F9FAFB",
                                    border: "1px solid #E5E7EB"
                                }}>
                                    <p style={{ fontSize: "0.75rem", fontWeight: "600", color: "#6B7280", marginBottom: "0.25rem" }}>Fecha de Nacimiento</p>
                                    <p style={{ fontSize: "0.875rem", color: "#1F2937", margin: 0 }}>{objeto.fechaNacimiento && objeto.fechaNacimiento.substring(0, 10)}</p>
                                </div>
                                <div style={{
                                    padding: "0.75rem",
                                    borderRadius: "8px",
                                    backgroundColor: "#F9FAFB",
                                    border: "1px solid #E5E7EB"
                                }}>
                                    <p style={{ fontSize: "0.75rem", fontWeight: "600", color: "#6B7280", marginBottom: "0.25rem" }}>Domicilio</p>
                                    <p style={{ fontSize: "0.875rem", color: "#1F2937", margin: 0 }}>{objeto.domicilio}</p>
                                </div>
                                <div style={{
                                    padding: "0.75rem",
                                    borderRadius: "8px",
                                    backgroundColor: "#F9FAFB",
                                    border: "1px solid #E5E7EB"
                                }}>
                                    <p style={{ fontSize: "0.75rem", fontWeight: "600", color: "#6B7280", marginBottom: "0.25rem" }}>Municipio</p>
                                    <p style={{ fontSize: "0.875rem", color: "#1F2937", margin: 0 }}>{objeto.municipio}</p>
                                </div>
                                <div style={{
                                    padding: "0.75rem",
                                    borderRadius: "8px",
                                    backgroundColor: "#F9FAFB",
                                    border: "1px solid #E5E7EB"
                                }}>
                                    <p style={{ fontSize: "0.75rem", fontWeight: "600", color: "#6B7280", marginBottom: "0.25rem" }}>Telefono</p>
                                    <p style={{ fontSize: "0.875rem", color: "#1F2937", margin: 0 }}>{objeto.telefono}</p>
                                </div>
                                <div style={{
                                    padding: "0.75rem",
                                    borderRadius: "8px",
                                    backgroundColor: "#F9FAFB",
                                    border: "1px solid #E5E7EB"
                                }}>
                                    <p style={{ fontSize: "0.75rem", fontWeight: "600", color: "#6B7280", marginBottom: "0.25rem" }}>Contacto de Emergencia</p>
                                    <p style={{ fontSize: "0.875rem", color: "#1F2937", margin: 0 }}>{objeto.contactoEmergencia}</p>
                                </div>
                            </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                            <div style={{
                                padding: "1rem",
                                borderRadius: "12px",
                                backgroundColor: "#FFFFFF",
                                border: "2px solid #E5E7EB"
                            }}>
                                <p style={{ fontSize: "1.5rem", fontWeight: "700", color: "#1F2937", marginBottom: "0.75rem" }}>{objeto.name}</p>
                                <div style={{
                                    padding: "0.75rem",
                                    borderRadius: "8px",
                                    backgroundColor: "#F9FAFB",
                                    fontSize: "0.875rem",
                                    color: "#4B5563",
                                    minHeight: "60px",
                                    lineHeight: "1.5"
                                }}>
                                    {objeto.observaciones || "Sin observaciones"}
                                </div>
                            </div>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.75rem" }}>
                                <div style={{
                                    padding: "0.75rem",
                                    borderRadius: "8px",
                                    backgroundColor: "#F9FAFB",
                                    border: "1px solid #E5E7EB"
                                }}>
                                    <p style={{ fontSize: "0.75rem", fontWeight: "600", color: "#6B7280", marginBottom: "0.25rem" }}>Mensualidad</p>
                                    <p style={{ fontSize: "0.875rem", color: "#1F2937", margin: 0 }}>${objeto.mensualidad}</p>
                                </div>
                                <div style={{
                                    padding: "0.75rem",
                                    borderRadius: "8px",
                                    backgroundColor: "#F9FAFB",
                                    border: "1px solid #E5E7EB"
                                }}>
                                    <p style={{ fontSize: "0.75rem", fontWeight: "600", color: "#6B7280", marginBottom: "0.25rem" }}>Inscripción</p>
                                    <p style={{ fontSize: "0.875rem", color: "#1F2937", margin: 0 }}>${objeto.inscripcion}</p>
                                </div>
                                <div style={{
                                    padding: "0.75rem",
                                    borderRadius: "8px",
                                    backgroundColor: "#F9FAFB",
                                    border: "1px solid #E5E7EB"
                                }}>
                                    <p style={{ fontSize: "0.75rem", fontWeight: "600", color: "#6B7280", marginBottom: "0.25rem" }}>Promoción</p>
                                    <p style={{ fontSize: "0.875rem", color: "#1F2937", margin: 0 }}>{objeto.promocion}</p>
                                </div>
                                <div style={{
                                    padding: "0.75rem",
                                    borderRadius: "8px",
                                    backgroundColor: "#F9FAFB",
                                    border: "1px solid #E5E7EB"
                                }}>
                                    <p style={{ fontSize: "0.75rem", fontWeight: "600", color: "#6B7280", marginBottom: "0.25rem" }}>Fecha de Inicio</p>
                                    <p style={{ fontSize: "0.875rem", color: "#1F2937", margin: 0 }}>{objeto.fecha_inicio && objeto.fecha_inicio.substring(0, 10)}</p>
                                </div>
                                <div style={{
                                    padding: "0.75rem",
                                    borderRadius: "8px",
                                    backgroundColor: "#F9FAFB",
                                    border: "1px solid #E5E7EB",
                                    gridColumn: "span 2"
                                }}>
                                    <p style={{ fontSize: "0.75rem", fontWeight: "600", color: "#6B7280", marginBottom: "0.25rem" }}>Próximo Pago</p>
                                    <p style={{ fontSize: "0.875rem", color: "#1F2937", margin: 0 }}>{objeto.proximo_pago && objeto.proximo_pago.substring(0, 10)}</p>
                                </div>
                            </div>
                            {objeto.nombreMadre && objeto.nombreMadre !== 'N/A' && (
                                <>
                                    <div style={{
                                        fontSize: "1rem",
                                        fontWeight: "700",
                                        color: "#1F2937",
                                        marginTop: "1rem",
                                        marginBottom: "0.75rem",
                                        paddingBottom: "0.5rem",
                                        borderBottom: "2px solid #E5E7EB"
                                    }}>
                                        Información de Tutores
                                    </div>
                                    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.75rem" }}>
                                        <div style={{
                                            padding: "0.75rem",
                                            borderRadius: "8px",
                                            backgroundColor: "#F9FAFB",
                                            border: "1px solid #E5E7EB"
                                        }}>
                                            <p style={{ fontSize: "0.75rem", fontWeight: "600", color: "#6B7280", marginBottom: "0.25rem" }}>Nombre de la Madre</p>
                                            <p style={{ fontSize: "0.875rem", color: "#1F2937", margin: 0 }}>{objeto.nombreMadre}</p>
                                        </div>
                                        <div style={{
                                            padding: "0.75rem",
                                            borderRadius: "8px",
                                            backgroundColor: "#F9FAFB",
                                            border: "1px solid #E5E7EB"
                                        }}>
                                            <p style={{ fontSize: "0.75rem", fontWeight: "600", color: "#6B7280", marginBottom: "0.25rem" }}>Contacto de la Madre</p>
                                            <p style={{ fontSize: "0.875rem", color: "#1F2937", margin: 0 }}>{objeto.madreTelefono}</p>
                                        </div>
                                        <div style={{
                                            padding: "0.75rem",
                                            borderRadius: "8px",
                                            backgroundColor: "#F9FAFB",
                                            border: "1px solid #E5E7EB"
                                        }}>
                                            <p style={{ fontSize: "0.75rem", fontWeight: "600", color: "#6B7280", marginBottom: "0.25rem" }}>Nombre del Padre</p>
                                            <p style={{ fontSize: "0.875rem", color: "#1F2937", margin: 0 }}>{objeto.nombrePadre}</p>
                                        </div>
                                        <div style={{
                                            padding: "0.75rem",
                                            borderRadius: "8px",
                                            backgroundColor: "#F9FAFB",
                                            border: "1px solid #E5E7EB"
                                        }}>
                                            <p style={{ fontSize: "0.75rem", fontWeight: "600", color: "#6B7280", marginBottom: "0.25rem" }}>Contacto del Padre</p>
                                            <p style={{ fontSize: "0.875rem", color: "#1F2937", margin: 0 }}>{objeto.telefonoPadre}</p>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div style={{
                    flex: "1",
                    borderLeft: "2px solid #E5E7EB",
                    display: "flex",
                    flexDirection: "column",
                    padding: "1.5rem",
                    backgroundColor: "#FAFAFA"
                }}>
                    <div style={{
                        fontSize: "1.25rem",
                        fontWeight: "700",
                        color: "#1F2937",
                        marginBottom: "1.5rem",
                        paddingBottom: "0.75rem",
                        borderBottom: "2px solid #E5E7EB",
                        textAlign: "center"
                    }}>
                        Control de Asistencias
                    </div>

                    <div className="PanelAsistencias" style={{ display: "flex", flexDirection: "column", gap: "1rem", overflow: "auto" }}>
                        {clases.map((item, index) => (
                            <div key={item.id} style={{
                                padding: "1rem",
                                borderRadius: "12px",
                                backgroundColor: "#FFFFFF",
                                border: "2px solid #E5E7EB",
                                boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                            }}>
                                <div style={{
                                    padding: "0.75rem",
                                    borderRadius: "8px",
                                    backgroundColor: "#2563EB",
                                    marginBottom: "0.75rem",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                }}>
                                    <div style={{ fontSize: "0.875rem", fontWeight: "700", color: "#FFFFFF" }}>{item.instrumento}</div>
                                    <div style={{ fontSize: "0.875rem", color: "#FFFFFF" }}>{item.name}</div>
                                </div>
                                {fechasEnDiaDeLaSemana(item.dia).map((item2, index2) => (
                                    <div key={item.id * 27 + index2} style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        padding: "0.5rem",
                                        borderRadius: "6px",
                                        backgroundColor: "#F9FAFB",
                                        marginBottom: "0.5rem",
                                        border: "1px solid #E5E7EB"
                                    }}>
                                        <div style={{ fontSize: "0.75rem", color: "#6B7280", fontWeight: "600" }}>
                                            {item.dia} | {item2 ? item2.substring(8, 10) : ""} | {item.hora}
                                        </div>
                                        {asistencias.some(item3 => item3.fecha === item2 && item3.id_clase === item.id) ?
                                            <div onClick={() => removeAsistencia(objeto.user_id, item2, item.id)} style={{
                                                padding: "0.375rem 0.75rem",
                                                borderRadius: "6px",
                                                backgroundColor: "#10B981",
                                                color: "white",
                                                fontSize: "0.75rem",
                                                fontWeight: "700",
                                                cursor: "pointer",
                                                transition: "all 0.2s ease",
                                                userSelect: "none"
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#059669"}
                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#10B981"}>
                                                ASISTE
                                            </div> :
                                            <div onClick={() => saveAsistencia(objeto.user_id, item2, item.id)} style={{
                                                padding: "0.375rem 0.75rem",
                                                borderRadius: "6px",
                                                backgroundColor: "#EF4444",
                                                color: "white",
                                                fontSize: "0.75rem",
                                                fontWeight: "700",
                                                cursor: "pointer",
                                                transition: "all 0.2s ease",
                                                userSelect: "none"
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#DC2626"}
                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#EF4444"}>
                                                FALTA
                                            </div>}
                                    </div>
                                ))}
                            </div>
                        ))}
                        <div style={{
                            padding: "1rem",
                            borderRadius: "12px",
                            backgroundColor: "#FFFFFF",
                            border: "2px solid #E5E7EB",
                            boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                        }}>
                            <div style={{
                                padding: "0.75rem",
                                borderRadius: "8px",
                                backgroundColor: "#F59E0B",
                                marginBottom: "0.75rem",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center"
                            }}>
                                <div style={{ fontSize: "0.875rem", fontWeight: "700", color: "#FFFFFF", flex: 1, textAlign: "center" }}>Reposiciones</div>
                                <button
                                    onClick={() => setIsRepo(true)}
                                    style={{
                                        backgroundColor: "#FFFFFF",
                                        color: "#F59E0B",
                                        border: "none",
                                        borderRadius: "6px",
                                        width: "28px",
                                        height: "28px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        cursor: "pointer",
                                        fontSize: "1.25rem",
                                        fontWeight: "700",
                                        transition: "all 0.2s ease"
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = "#FEF3C7";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = "#FFFFFF";
                                    }}
                                >
                                    +
                                </button>
                            </div>
                            {aluRepo.map((item, index) => (
                                <div key={index * 27} style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    padding: "0.5rem",
                                    borderRadius: "6px",
                                    backgroundColor: "#F9FAFB",
                                    marginBottom: "0.5rem",
                                    border: "1px solid #E5E7EB",
                                    position: "relative"
                                }}>
                                    <button
                                        onClick={() => deleteAluRepo(item.id_repo)}
                                        style={{
                                            position: "absolute",
                                            left: "-8px",
                                            top: "50%",
                                            transform: "translateY(-50%)",
                                            backgroundColor: "#EF4444",
                                            color: "white",
                                            border: "none",
                                            borderRadius: "50%",
                                            width: "20px",
                                            height: "20px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            cursor: "pointer",
                                            fontSize: "0.75rem",
                                            fontWeight: "700",
                                            transition: "all 0.2s ease"
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#DC2626"}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#EF4444"}
                                    >
                                        ×
                                    </button>
                                    <div style={{ fontSize: "0.75rem", color: "#6B7280", fontWeight: "600", width: "35%", paddingLeft: "1rem" }}>
                                        {item.fecha && item.fecha.slice(0, 10)}
                                    </div>
                                    <div style={{ fontSize: "0.875rem", color: "#1F2937", width: "65%" }}>{item.name}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <AddRepoForm isOpen={isRepo} onClose={() => setIsRepo(false)} objeto={objeto} />
            <AddPictureModal isOpen={isPicture} onClose={() => setIsPicture(false)} objeto={objeto} />
        </Modal.Body>
    </Modal>
};