import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Form, Modal, FormGroup } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import FeatherIcon from 'feather-icons-react'
import AxiosClient from '../../../shared/plugins/axios';
import Alert, { confirmMsj, confirmTitle, succesMsj, successTitle, errorMsj, errorTitle } from '../../../shared/plugins/alerts';
import '../../../utils/styles/UserNuevoTrabajo.css';
import { FaUserGraduate } from 'react-icons/fa'

export const AlumnoInfo = ({ isOpen, diasMes, diasSemana, onClose, objeto, cambiarColor, asistencias, setDiasMes }) => {
    console.log(objeto);
    
    useEffect(() => {
    }, [objeto]);

    const handleClose = () => {
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
                            <div className="AlumnoInfoTitleInfo" style={{ height: "40%" }}>
                                <p style={{ fontSize: "24px", height: "25%" }}>{objeto.name}</p>
                                <div className="AlumnoInfoObservaciones">
                                    {objeto.observaciones}
                                </div>
                            </div>
                            {/* <div className="AlumnoInfoInfoCentro">
                                <div className="AlumnoInfoTitleInfo" style={{ height: "100%", width: "50%" }}>
                                    <p style={{}}>Instrumento</p>
                                    <p style={{}}>{objeto.instrumento}</p>
                                </div>
                                <div className="AlumnoInfoTitleInfo" style={{ height: "100%", width: "50%" }}>
                                    <p style={{}}>Maestro</p>
                                    <p style={{}}>{objeto.maestro}</p>
                                </div>
                            </div> */}
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
                                <div className="CalendarioTituloDia">{diasSemana ? diasSemana[0][0] : ""}</div>
                                <div className="CalendarioTituloDia">{diasSemana ? diasSemana[1][0] : ""}</div>
                                <div className="CalendarioTituloDia">{diasSemana ? diasSemana[2][0] : ""}</div>
                                <div className="CalendarioTituloDia">{diasSemana ? diasSemana[3][0] : ""}</div>
                                <div className="CalendarioTituloDia">{diasSemana ? diasSemana[4][0] : ""}</div>
                                <div className="CalendarioTituloDia">{diasSemana ? diasSemana[5][0] : ""}</div>
                                <div className="CalendarioTituloDia">{diasSemana ? diasSemana[6][0] : ""}</div>
                            </div>
                        </div>
                        <div className="CalendarioDiasMain">
                            <div className="CalendarioDias">
                                <div className={`CalendarioDia ${diasMes[0].activo ? diasMes[0].activo : ""}`} onClick={diasMes[0].status != 0 ? () => cambiarColor(diasMes[0].dia) : () => 1}>{diasMes ? diasMes[0].dia : ""}</div>
                                <div className={`CalendarioDia ${diasMes[0].activo ? diasMes[1].activo : ""}`} onClick={diasMes[1].status != 0 ? () => cambiarColor(diasMes[1].dia) : () => 1}>{diasMes ? diasMes[1].dia : ""}</div>
                                <div className={`CalendarioDia ${diasMes[0].activo ? diasMes[2].activo : ""}`} onClick={diasMes[2].status != 0 ? () => cambiarColor(diasMes[2].dia) : () => 1}>{diasMes ? diasMes[2].dia : ""}</div>
                                <div className={`CalendarioDia ${diasMes[0].activo ? diasMes[3].activo : ""}`} onClick={diasMes[3].status != 0 ? () => cambiarColor(diasMes[3].dia) : () => 1}>{diasMes ? diasMes[3].dia : ""}</div>
                                <div className={`CalendarioDia ${diasMes[0].activo ? diasMes[4].activo : ""}`} onClick={diasMes[4].status != 0 ? () => cambiarColor(diasMes[4].dia) : () => 1}>{diasMes ? diasMes[4].dia : ""}</div>
                                <div className={`CalendarioDia ${diasMes[0].activo ? diasMes[5].activo : ""}`} onClick={diasMes[5].status != 0 ? () => cambiarColor(diasMes[5].dia) : () => 1}>{diasMes ? diasMes[5].dia : ""}</div>
                                <div className={`CalendarioDia ${diasMes[0].activo ? diasMes[6].activo : ""}`} onClick={diasMes[6].status != 0 ? () => cambiarColor(diasMes[6].dia) : () => 1}>{diasMes ? diasMes[6].dia : ""}</div>
                            </div>
                            <div className="CalendarioDias">
                                <div className={`CalendarioDia ${diasMes[0].activo ? diasMes[7].activo : ""}`} onClick={diasMes[7].status != 0 ? () => cambiarColor(diasMes[7].dia) : () => 1}>{diasMes ? diasMes[7].dia : ""}</div>
                                <div className={`CalendarioDia ${diasMes[0].activo ? diasMes[8].activo : ""}`} onClick={diasMes[8].status != 0 ? () => cambiarColor(diasMes[8].dia) : () => 1}>{diasMes ? diasMes[8].dia : ""}</div>
                                <div className={`CalendarioDia ${diasMes[0].activo ? diasMes[9].activo : ""}`} onClick={diasMes[9].status != 0 ? () => cambiarColor(diasMes[9].dia) : () => 1}>{diasMes ? diasMes[9].dia : ""}</div>
                                <div className={`CalendarioDia ${diasMes[0].activo ? diasMes[10].activo : ""}`} onClick={diasMes[10].status != 0 ? () => cambiarColor(diasMes[10].dia) : () => 1}>{diasMes ? diasMes[10].dia : ""}</div>
                                <div className={`CalendarioDia ${diasMes[0].activo ? diasMes[11].activo : ""}`} onClick={diasMes[11].status != 0 ? () => cambiarColor(diasMes[11].dia) : () => 1}>{diasMes ? diasMes[11].dia : ""}</div>
                                <div className={`CalendarioDia ${diasMes[0].activo ? diasMes[12].activo : ""}`} onClick={diasMes[12].status != 0 ? () => cambiarColor(diasMes[12].dia) : () => 1}>{diasMes ? diasMes[12].dia : ""}</div>
                                <div className={`CalendarioDia ${diasMes[0].activo ? diasMes[13].activo : ""}`} onClick={diasMes[13].status != 0 ? () => cambiarColor(diasMes[13].dia) : () => 1}>{diasMes ? diasMes[13].dia : ""}</div>
                            </div>
                            <div className="CalendarioDias">
                                <div className={`CalendarioDia ${diasMes[0].activo ? diasMes[14].activo : ""}`} onClick={diasMes[14].status != 0 ? () => cambiarColor(diasMes[14].dia) : () => 1}>{diasMes ? diasMes[14].dia : ""}</div>
                                <div className={`CalendarioDia ${diasMes[0].activo ? diasMes[15].activo : ""}`} onClick={diasMes[15].status != 0 ? () => cambiarColor(diasMes[15].dia) : () => 1}>{diasMes ? diasMes[15].dia : ""}</div>
                                <div className={`CalendarioDia ${diasMes[0].activo ? diasMes[16].activo : ""}`} onClick={diasMes[16].status != 0 ? () => cambiarColor(diasMes[16].dia) : () => 1}>{diasMes ? diasMes[16].dia : ""}</div>
                                <div className={`CalendarioDia ${diasMes[0].activo ? diasMes[17].activo : ""}`} onClick={diasMes[17].status != 0 ? () => cambiarColor(diasMes[17].dia) : () => 1}>{diasMes ? diasMes[17].dia : ""}</div>
                                <div className={`CalendarioDia ${diasMes[0].activo ? diasMes[18].activo : ""}`} onClick={diasMes[18].status != 0 ? () => cambiarColor(diasMes[18].dia) : () => 1}>{diasMes ? diasMes[18].dia : ""}</div>
                                <div className={`CalendarioDia ${diasMes[0].activo ? diasMes[19].activo : ""}`} onClick={diasMes[19].status != 0 ? () => cambiarColor(diasMes[19].dia) : () => 1}>{diasMes ? diasMes[19].dia : ""}</div>
                                <div className={`CalendarioDia ${diasMes[0].activo ? diasMes[20].activo : ""}`} onClick={diasMes[20].status != 0 ? () => cambiarColor(diasMes[20].dia) : () => 1}>{diasMes ? diasMes[20].dia : ""}</div>
                            </div>
                            <div className="CalendarioDias">
                                <div className={`CalendarioDia ${diasMes[0].activo ? diasMes[21].activo : ""}`} onClick={diasMes[21].status != 0 ? () => cambiarColor(diasMes[21].dia) : () => 1}>{diasMes ? diasMes[21].dia : ""}</div>
                                <div className={`CalendarioDia ${diasMes[0].activo ? diasMes[22].activo : ""}`} onClick={diasMes[22].status != 0 ? () => cambiarColor(diasMes[22].dia) : () => 1}>{diasMes ? diasMes[22].dia : ""}</div>
                                <div className={`CalendarioDia ${diasMes[0].activo ? diasMes[23].activo : ""}`} onClick={diasMes[23].status != 0 ? () => cambiarColor(diasMes[23].dia) : () => 1}>{diasMes ? diasMes[23].dia : ""}</div>
                                <div className={`CalendarioDia ${diasMes[0].activo ? diasMes[24].activo : ""}`} onClick={diasMes[24].status != 0 ? () => cambiarColor(diasMes[24].dia) : () => 1}>{diasMes ? diasMes[24].dia : ""}</div>
                                <div className={`CalendarioDia ${diasMes[0].activo ? diasMes[25].activo : ""}`} onClick={diasMes[25].status != 0 ? () => cambiarColor(diasMes[25].dia) : () => 1}>{diasMes ? diasMes[25].dia : ""}</div>
                                <div className={`CalendarioDia ${diasMes[0].activo ? diasMes[26].activo : ""}`} onClick={diasMes[26].status != 0 ? () => cambiarColor(diasMes[26].dia) : () => 1}>{diasMes ? diasMes[26].dia : ""}</div>
                                <div className={`CalendarioDia ${diasMes[0].activo ? diasMes[27].activo : ""}`} onClick={diasMes[27].status != 0 ? () => cambiarColor(diasMes[27].dia) : () => 1}>{diasMes ? diasMes[27].dia : ""}</div>
                            </div>
                            <div className="CalendarioDias" style={{ justifyContent: "start" }}>
                                <div className={`CalendarioDia ${diasMes[0].activo ? diasMes[28].activo : ""}`} onClick={diasMes[28].status != 0 ? () => cambiarColor(diasMes[28].dia) : () => 1}>{diasMes ? diasMes[28].dia : ""}</div>
                                <div className={`CalendarioDia ${diasMes[0].activo ? diasMes[29].activo : ""}`} onClick={diasMes[29].status != 0 ? () => cambiarColor(diasMes[29].dia) : () => 1}>{diasMes ? diasMes[29].dia : ""}</div>
                                <div className={`CalendarioDia ${diasMes[0].activo ? diasMes[30].activo : ""}`} onClick={diasMes[30].status != 0 ? () => cambiarColor(diasMes[30].dia) : () => 1}>{diasMes ? diasMes[30].dia : ""}</div>
                            </div>
                            <div className="CalendarioDias">
                            </div>
                            <div className="CalendarioDias" style={{ borderBottom: "0px" }}>
                                Asistencia <div className='CalendarioCirculo' style={{ backgroundColor: "green" }}></div> Ausencia <div className='CalendarioCirculo' style={{ backgroundColor: "red" }}></div> Neutral <div className='CalendarioCirculo'></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal.Body>
    </Modal>
};