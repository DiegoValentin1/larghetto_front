import React, { useState, useEffect, useContext } from "react";
import { Button, Col, Row, Form, FormGroup } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import FeatherIcon from "feather-icons-react";
import AxiosClient from "../../../shared/plugins/axios";
import { AuthContext } from "../../auth/authContext";

const UserRefuerzoDerivacion = ({setCumplen, cumplen, formikValues ,setFormikValues, estilo, unidades }) => {
    const { user, dispatch } = useContext(AuthContext);
    const [espDiseño, setEspDiseño] = useState(0);
    const [espDiseño2, setEspDiseño2] = useState(0);
    const [espMin, setEspMin] = useState(0);
    const [espMin2, setEspMin2] = useState(0);
    const [valorEsfuerzoMinimoB, setValorEsfuerzoMinimoB] = useState(0);
    const [cumpleRefuerzo, setCumpleRefuerzo] = useState(false);
    const [k, setK] = useState(0);
    
    const form = useFormik({
        initialValues: {
            name: "",
            status: true,
        },
        validationSchema: yup.object().shape({
            name: yup
                .string()
                .required("Campo obligatorio")
                .min(3, "Minimo 3 caracteres"),
        }),
    });

    const calcularAlturaZonaRefuerzo = ()=>{
        return 0.7 * ((formikValues.diametroDeSalidaReduccion * (21-formikValues.corrosionPermisible))**0.5)
    }

    const calcularAreaRequerida = ()=>{
        return k * formikValues.espDiseño * (formikValues.diametroDeSalidaReduccion - (21-formikValues.corrosionPermisible)*2)
    }

    const calcularAreaDisponibleA1 = ()=>{
        
        return  (formikValues.diametroDeSalidaReduccion - 2 * (23-formikValues.corrosionPermisible)) * (23-formikValues.corrosionPermisible - formikValues.espDiseño)
    }

    const calcularAreaA2 = ()=>{
        return 2 * calcularAlturaZonaRefuerzo() * (21-formikValues.corrosionPermisible - formikValues.espDiseño2) 
    }

    const calcularAreaA3 = ()=>{
        
        return 2 * ((0.1*formikValues.diametroDeSalidaReduccion)+12.7) * (21-formikValues.corrosionPermisible - formikValues.espDiseño2) 
    }
    useEffect(() => {
        if (formikValues.diametroDeSalidaReduccion / formikValues.diametroExterior > 0.60) {
            setK(1.00);
        } else {
            
        }

        // console.log("Altura: " + (0.7 * ((formikValues.diametroDeSalidaReduccion * (21-formikValues.corrosionPermisible))**0.5)))

        // console.log("ARequerida: " + (k * formikValues.espDiseño * (formikValues.diametroDeSalidaReduccion - (21-formikValues.corrosionPermisible)*2)))

        // console.log("A1: " + (formikValues.diametroDeSalidaReduccion - 2 * (23-formikValues.corrosionPermisible)) * (23-formikValues.corrosionPermisible - formikValues.espDiseño)
        // )
        // console.log("A2: " + (2 * calcularAlturaZonaRefuerzo() * (21-formikValues.corrosionPermisible - formikValues.espDiseño2)))

        // console.log("A3: " + (2 * ((0.1*formikValues.diametroDeSalidaReduccion)+12.7) * (21-formikValues.corrosionPermisible - formikValues.espDiseño2)) 
        // )
        // console.log("Entra If: " + (calcularAreaDisponibleA1() + calcularAreaA2() + calcularAreaA3() >= calcularAreaRequerida()))
        
        // console.log("cumple Refuerzo: " + cumpleRefuerzo)
        // console.log(cumplen)
    }, [formikValues]);
    return (
        <div className="UserTeeRed" style={estilo}>
            <Form onSubmit={form.handleSubmit}>
            <div className="TeeRedContainer3Nuevo">
                    <Form.Group as={Row} className="mb-3 TeeRedGroup">
                        <Form.Label htmlFor="espesorDeDiseño">Diametro Exterior</Form.Label>
                        <div className="inputGroup">
                            <Form.Control
                                disabled={true}
                                className="TeeRedInput"
                                placeholder=""
                                name="espesorDeDiseñoB"
                                value={formikValues.diametroExterior}
                                onChange={form.handleChange}
                            />
                            <div className="UTRUnidad">{unidades.milimetros}</div>
                        </div>

                        {form.errors.espesorDeDiseñoB && (
                            <span className="error-text">{form.errors.espesorDeDiseñoB}</span>
                        )}
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3 TeeRedGroup">
                        <Form.Label htmlFor="espesorMinimoRequerido">D. Salida Reducción</Form.Label>
                        <div className="inputGroup">
                            <Form.Control
                                disabled={true}
                                className="TeeRedInput"
                                placeholder=""
                                name="espesorMinimoRequeridoB"
                                value={formikValues.diametroDeSalidaReduccion}
                                onChange={form.handleChange}
                            />
                            <div className="UTRUnidad">{unidades.milimetros}</div>
                        </div>

                        {form.errors.espesorMinimoRequeridoB && (
                            <span className="error-text">{form.errors.espesorMinimoRequeridoB}</span>
                        )}
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3 TeeRedGroup">
                        <Form.Label htmlFor="espesorDeParedAdicionalPorCorrosion">Corrosión Permisible</Form.Label>
                        <div className="inputGroup">
                        <Form.Control
                            disabled={true}
                            className="TeeRedInput"
                            placeholder=""
                            name="espesorDeParedAdicionalPorCorrosionB"
                            value={formikValues.corrosionPermisible}
                            onChange={form.handleChange}
                        />
                            <div className="UTRUnidad">{unidades.milimetros}</div>
                        </div>
                        
                        {form.errors.espesorDeParedAdicionalPorCorrosionB && (
                            <span className="error-text">{form.errors.espesorDeParedAdicionalPorCorrosionB}</span>
                        )}
                    </Form.Group>
                </div>
                <div className="TeeRedContainer3Nuevo">
                    <Form.Group as={Row} className="mb-3 TeeRedGroup">
                        <Form.Label htmlFor="espesorDeDiseño">Relación Diámetros</Form.Label>
                        <div className="inputGroup">
                            <Form.Control
                                disabled={true}
                                className="TeeRedInput"
                                placeholder=""
                                name="espesorDeDiseñoB"
                                value={formikValues.diametroDeSalidaReduccion && formikValues.diametroExterior ? (formikValues.diametroDeSalidaReduccion / formikValues.diametroExterior).toFixed(2) : ""}
                                onChange={form.handleChange}
                            />
                            <div className="UTRUnidad">{unidades.milimetros}</div>
                        </div>

                        {form.errors.espesorDeDiseñoB && (
                            <span className="error-text">{form.errors.espesorDeDiseñoB}</span>
                        )}
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3 TeeRedGroup">
                        <Form.Label htmlFor="espesorMinimoRequerido">Diámetro Interno Corroido</Form.Label>
                        <div className="inputGroup">
                            <Form.Control
                                disabled={true}
                                className="TeeRedInput"
                                placeholder=""
                                name="espesorMinimoRequeridoB"
                                value={formikValues.diametroDeSalidaReduccion && formikValues.corrosionPermisible ? (formikValues.diametroDeSalidaReduccion-((21-formikValues.corrosionPermisible)*2)) : ""}
                                onChange={form.handleChange}
                            />
                            <div className="UTRUnidad">{unidades.milimetros}</div>
                        </div>

                        {form.errors.espesorMinimoRequeridoB && (
                            <span className="error-text">{form.errors.espesorMinimoRequeridoB}</span>
                        )}
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3 TeeRedGroup">
                        <Form.Label htmlFor="espesorDeParedAdicionalPorCorrosion">Espesor Real de Salida</Form.Label>
                        <div className="inputGroup">
                        <Form.Control
                            disabled={true}
                            className="TeeRedInput"
                            placeholder=""
                            name="espesorDeParedAdicionalPorCorrosionB"
                            value={formikValues.corrosionPermisible ? (21-formikValues.corrosionPermisible) : ""}
                            onChange={form.handleChange}
                        />
                            <div className="UTRUnidad">{unidades.milimetros}</div>
                        </div>
                        
                        {form.errors.espesorDeParedAdicionalPorCorrosionB && (
                            <span className="error-text">{form.errors.espesorDeParedAdicionalPorCorrosionB}</span>
                        )}
                    </Form.Group>
                </div>
                <div className="TeeRedContainer3Nuevo">
                    <Form.Group as={Row} className="mb-3 TeeRedGroup">
                        <Form.Label htmlFor="espesorDeDiseño">Espesor Requerido de Salida</Form.Label>
                        <div className="inputGroup">
                            <Form.Control
                                disabled={true}
                                className="TeeRedInput"
                                placeholder=""
                                name="espesorDeDiseñoB"
                                value={formikValues.espDiseño2 ? (formikValues.espDiseño2.toFixed(2)) : ("")}
                                onChange={form.handleChange}
                            />
                            <div className="UTRUnidad">{unidades.milimetros}</div>
                        </div>

                        {form.errors.espesorDeDiseñoB && (
                            <span className="error-text">{form.errors.espesorDeDiseñoB}</span>
                        )}
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3 TeeRedGroup">
                        <Form.Label htmlFor="espesorMinimoRequerido">Espesor Final Corroído</Form.Label>
                        <div className="inputGroup">
                            <Form.Control
                                disabled={true}
                                className="TeeRedInput"
                                placeholder=""
                                name="espesorMinimoRequeridoB"
                                value={formikValues.corrosionPermisible ? (21-formikValues.corrosionPermisible) : ""}
                                onChange={form.handleChange}
                            />
                            <div className="UTRUnidad">{unidades.milimetros}</div>
                        </div>

                        {form.errors.espesorMinimoRequeridoB && (
                            <span className="error-text">{form.errors.espesorMinimoRequeridoB}</span>
                        )}
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3 TeeRedGroup">
                        <Form.Label htmlFor="espesorDeParedAdicionalPorCorrosion">Espesor Real Diametro E.</Form.Label>
                        <div className="inputGroup">
                        <Form.Control
                            disabled={true}
                            className="TeeRedInput"
                            placeholder=""
                            name="espesorDeParedAdicionalPorCorrosionB"
                            value={formikValues.corrosionPermisible ? (23-formikValues.corrosionPermisible) : ""}
                            onChange={form.handleChange}
                        />
                            <div className="UTRUnidad">{unidades.milimetros}</div>
                        </div>
                        
                        {form.errors.espesorDeParedAdicionalPorCorrosionB && (
                            <span className="error-text">{form.errors.espesorDeParedAdicionalPorCorrosionB}</span>
                        )}
                    </Form.Group>
                </div>
                <div className="TeeRedContainer3">
                    <Form.Group as={Row} className="mb-3 TeeRedGroup">
                        <Form.Label htmlFor="espesorDeDiseño">Espesor Requerido D.E</Form.Label>
                        <div className="inputGroup">
                            <Form.Control
                                disabled={true}
                                className="TeeRedInput"
                                placeholder=""
                                name="espesorDeDiseñoB"
                                value={formikValues.espDiseño ? (formikValues.espDiseño.toFixed(2)) : ("")}
                                onChange={form.handleChange}
                            />
                            <div className="UTRUnidad">{unidades.milimetros}</div>
                        </div>

                        {form.errors.espesorDeDiseñoB && (
                            <span className="error-text">{form.errors.espesorDeDiseñoB}</span>
                        )}
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3 TeeRedGroup">
                        <Form.Label htmlFor="espesorMinimoRequerido">Radio de curvatura</Form.Label>
                        <div className="inputGroup">
                            <Form.Control
                                disabled={true}
                                className="TeeRedInput"
                                placeholder=""
                                name="espesorMinimoRequeridoB"
                                value={formikValues.diametroDeSalidaReduccion ? ((0.1*formikValues.diametroDeSalidaReduccion)+12.7).toFixed(2) : ""}
                                onChange={form.handleChange}
                            />
                            <div className="UTRUnidad">{unidades.milimetros}</div>
                        </div>

                        {form.errors.espesorMinimoRequeridoB && (
                            <span className="error-text">{form.errors.espesorMinimoRequeridoB}</span>
                        )}
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3 TeeRedGroup">
                        <Form.Label htmlFor="espesorDeParedAdicionalPorCorrosion">Área Requerida</Form.Label>
                        <div className="inputGroup">
                        <Form.Control
                            disabled={true}
                            className="TeeRedInput"
                            placeholder=""
                            name="espesorDeParedAdicionalPorCorrosionB"
                            value={calcularAreaRequerida() ? calcularAreaRequerida().toFixed(2) : ""}
                            onChange={form.handleChange}
                        />
                            <div className="UTRUnidad">{unidades.milimetros}</div>
                        </div>
                        
                        {form.errors.espesorDeParedAdicionalPorCorrosionB && (
                            <span className="error-text">{form.errors.espesorDeParedAdicionalPorCorrosionB}</span>
                        )}
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3 TeeRedGroup">
                        <Form.Label htmlFor="espesorDeParedAdicionalPorCorrosion">A1 + A2 + A3</Form.Label>
                        <div className="inputGroup">
                        <Form.Control
                            disabled={true}
                            className="TeeRedInput"
                            placeholder=""
                            name="espesorDeParedAdicionalPorCorrosionB"
                            value={calcularAreaDisponibleA1() && calcularAreaA2() && calcularAreaA3() ? (calcularAreaDisponibleA1() + calcularAreaA2() + calcularAreaA3()).toFixed(2) : ""}
                            onChange={form.handleChange}
                        />
                            <div className="UTRUnidad">{unidades.milimetros}</div>
                        </div>
                        
                        {form.errors.espesorDeParedAdicionalPorCorrosionB && (
                            <span className="error-text">{form.errors.espesorDeParedAdicionalPorCorrosionB}</span>
                        )}
                    </Form.Group>
                </div>
            </Form>
        </div>
    );
}

export default UserRefuerzoDerivacion;
