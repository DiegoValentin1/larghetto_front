import React, { useState, useEffect, useContext } from "react";
import { Button, Col, Row, Form, FormGroup } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import FeatherIcon from "feather-icons-react";
import AxiosClient from "../../../shared/plugins/axios";
import { AuthContext } from "../../auth/authContext";

const UserAreaPeso = ({ setCumplen, cumplen, estilo, unidades }) => {
    const { user, dispatch } = useContext(AuthContext);
    const [cumpleArea, setCumpleArea] = useState(false);

    const validateDecimal = (value) => {
        if (value) {
            // Verificar si el valor es un número con al menos 2 decimales
            const decimalPattern = /^\d+(\.\d{2,})$/;
            return decimalPattern.test(value);
        } // Permitir valores vacíos
    }

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
            radioRanura: yup.string().required('Campo obligatorio')
                .test('es-numero', 'Debe ser un número con al menos 2 decimales', (value) => validateDecimal(value)),
            largoRanura: yup.string().required('Campo obligatorio')
                .test('es-numero', 'Debe ser un número con al menos 2 decimales', (value) => validateDecimal(value))
        }),

    });
    const calcularAreaTransversal = () => {
        return 3.14 * ((user.proyecto.proyecto.diametroDeSalidaReduccion - (user.proyecto.proyecto.espesorComercial2 * 2)) / 2) ** 2
    }
    const calcularAreaRanura = () => {
        const radio = form.values.radioRanura;
        const largo = form.values.largoRanura;
        const circulo = 3.14 * radio ** 2;
        const rectangulo = radio * 2 * largo;
        return circulo + rectangulo;
    }

    const checkCumple = () => {
        if (calcularAreaRanura() * form.values.numeroRanuras >= calcularAreaTransversal()) {
            setCumpleArea(true);
        } else {
            setCumpleArea(false);
        }
        dispatch({ type: "SET_CUMPLE_AREA", payload: cumpleArea });
    }

    useEffect(() => {
        if (calcularAreaRanura() * form.values.numeroRanuras >= calcularAreaTransversal()) {
            setCumpleArea(true);
        } else {
            setCumpleArea(false);
        }
        dispatch({ type: "SET_CUMPLE_AREA", payload: cumpleArea });
        console.log(form.values);
        console.log(user.proyecto.proyecto)
    }, [form.values]);

    useEffect(() => {
        dispatch({ type: "SET_VARIABLE", payload: { largoRanura: form.values.largoRanura } });
        dispatch({ type: "SET_VARIABLE", payload: { numeroRanuras: form.values.numeroRanuras } });
        dispatch({ type: "SET_VARIABLE", payload: { radioRanura: form.values.radioRanura } });
    }, [form.values]);


    React.useMemo(() => {
        const url = window.location.href.split('/');
        const ultimoValor = url[url.length - 1];
        if (ultimoValor == "modificar") {
            const { name, teeM, bridaM, camisaM, diametroExterior, diametroDeSalidaReduccion, presionDeDiseño, temperaturaDeDiseño, corrosionPermisible, valorEsfuerzoMinimo, factorDeDiseño, factorDeJuntaLongitudinal, factorDeTemperaturaDerating, numeroRanuras, radioRanura, largoRanura, ultimaMod } = user.proyecto.proyecto;
            form.values.name = name;
            form.values.diametroExterior = diametroExterior;
            form.values.diametroDeSalidaReduccion = diametroDeSalidaReduccion;
            form.values.presionDeDiseño = presionDeDiseño;
            form.values.temperaturaDeDiseño = temperaturaDeDiseño;
            form.values.corrosionPermisible = corrosionPermisible;
            form.values.valorEsfuerzoMinimo = valorEsfuerzoMinimo;
            form.values.factorDeDiseño = factorDeDiseño;
            form.values.factorDeJuntaLongitudinal = factorDeJuntaLongitudinal;
            form.values.factorDeTemperaturaDerating = factorDeTemperaturaDerating;
            form.values.numeroRanuras = numeroRanuras;
            form.values.radioRanura = radioRanura;
            form.values.largoRanura = largoRanura;
            form.values.ultimaMod = ultimaMod;
            const action = { type: "SET_AREA", payload: { areaPeso: form.values } };
            dispatch(action);
            checkCumple();
        }
    }, []);


    return (
        <div className="UserTeeRed" style={estilo}>
            <Form onSubmit={form.handleSubmit}>
                <div className="TeeRedContainer2">
                    <Form.Group as={Row} className="mb-3 TeeRedGroup">
                        <Form.Label htmlFor="diametroDeSalidaReduccion">Constante</Form.Label>
                        <div className="inputGroup">
                            <Form.Control
                                disabled={true}
                                className="TeeRedInput"
                                placeholder=""
                                name="diametroExteriorTuberia"
                                value={"π"}
                                onChange={form.handleChange}
                            />
                            <div className="UTRUnidad"></div>
                        </div>

                        {form.errors.diametroExteriorTuberia && (
                            <span className="error-text">{form.errors.diametroExteriorTuberia}</span>
                        )}
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3 TeeRedGroup">
                        <Form.Label htmlFor="numeroRanuras">Numero de Ranuras</Form.Label>
                        <div className="inputGroup">
                            <Form.Control
                                className="TeeRedInput"
                                placeholder=""
                                name="numeroRanuras"
                                value={form.values.numeroRanuras}
                                onChange={form.handleChange}
                            />
                            <div className="UTRUnidad">U</div>
                        </div>

                        {form.errors.numeroRanuras && (
                            <span className="error-text">{form.errors.numeroRanuras}</span>
                        )}
                    </Form.Group>
                </div>
                <div className="TeeRedContainer2">
                    <Form.Group as={Row} className="mb-3 TeeRedGroup">
                        <Form.Label htmlFor="radioRanura">Radio De La Ranura</Form.Label>
                        <div className="inputGroup">
                            <Form.Control
                                className="TeeRedInput"
                                placeholder=""
                                name="radioRanura"
                                value={form.values.radioRanura}
                                onChange={form.handleChange}
                            />
                            <div className="UTRUnidad">{unidades.milimetros}</div>
                        </div>
                        {form.errors.radioRanura && (
                            <span className="error-text">{form.errors.radioRanura}</span>
                        )}
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3 TeeRedGroup">
                        <Form.Label htmlFor="largoRanura">Largo De La Ranura</Form.Label>
                        <div className="inputGroup">
                            <Form.Control
                                className="TeeRedInput"
                                placeholder=""
                                name="largoRanura"
                                value={form.values.largoRanura}
                                onChange={form.handleChange}
                            />
                            <div className="UTRUnidad">{unidades.milimetros}</div>
                        </div>

                        {form.errors.largoRanura && (
                            <span className="error-text">{form.errors.largoRanura}</span>
                        )}
                    </Form.Group>
                </div>
                <div className="TeeRedContainer3Nuevo">
                    <Form.Group as={Row} className="mb-3 TeeRedGroup">
                        <Form.Label htmlFor="diametroDeSalidaReduccion">D. Exterior</Form.Label>
                        <div className="inputGroup">
                            <Form.Control
                                disabled={true}
                                className="TeeRedInput"
                                placeholder=""
                                name="diametroExteriorTuberia"
                                value={user.proyecto.proyecto.diametroDeSalidaReduccion}
                                onChange={form.handleChange}
                            />
                            <div className="UTRUnidad">{unidades.milimetros}</div>
                        </div>

                        {form.errors.diametroExteriorTuberia && (
                            <span className="error-text">{form.errors.diametroExteriorTuberia}</span>
                        )}
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3 TeeRedGroup">
                        <Form.Label htmlFor="presionDeDiseño">Radio Interior</Form.Label>
                        <div className="inputGroup">
                            <Form.Control
                                disabled={true}
                                className="TeeRedInput"
                                placeholder=""
                                name="presionDeDiseñoB"
                                value={user.proyecto.proyecto.diametroDeSalidaReduccion ? ((user.proyecto.proyecto.diametroDeSalidaReduccion - (user.proyecto.proyecto.espesorComercial2 * 2)) / 2).toFixed(2) : ""}
                                onChange={form.handleChange}
                            />
                            <div className="UTRUnidad">{unidades.megaPascales}</div>
                        </div>

                        {form.errors.presionDeDiseñoB && (
                            <span className="error-text">{form.errors.presionDeDiseñoB}</span>
                        )}
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3 TeeRedGroup">
                        <Form.Label htmlFor="temperaturaDeDiseño">Espesor Comercial</Form.Label>
                        <div className="inputGroup">
                            <Form.Control
                                disabled={true}
                                className="TeeRedInput"
                                placeholder=""
                                name="temperaturaDeDiseñoB"
                                value={user.proyecto.proyecto.espesorComercial2}
                                onChange={form.handleChange}
                            />
                            <div className="UTRUnidad">{unidades.celsius}</div>
                        </div>

                        {form.errors.temperaturaDeDiseñoB && (
                            <span className="error-text">{form.errors.temperaturaDeDiseñoB}</span>
                        )}
                    </Form.Group>
                </div>

                <div className="TeeRedContainer3Nuevo">
                    <Form.Group as={Row} className="mb-3 TeeRedGroup">
                        <Form.Label htmlFor="diametroDeSalidaReduccion">Área Ranura</Form.Label>
                        <div className="inputGroup">
                            <Form.Control
                                disabled={true}
                                className="TeeRedInput"
                                placeholder=""
                                name="diametroExteriorTuberia"
                                value={calcularAreaRanura() ? (calcularAreaRanura()).toFixed(2) : ""}
                                onChange={form.handleChange}
                            />
                            <div className="UTRUnidad">{unidades.milimetros}</div>
                        </div>

                        {form.errors.diametroExteriorTuberia && (
                            <span className="error-text">{form.errors.diametroExteriorTuberia}</span>
                        )}
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3 TeeRedGroup">
                        <Form.Label htmlFor="presionDeDiseño">Área Total Ranuras</Form.Label>
                        <div className="inputGroup">
                            <Form.Control
                                disabled={true}
                                className="TeeRedInput"
                                placeholder=""
                                name="presionDeDiseñoB"
                                value={calcularAreaRanura() && form.values.numeroRanuras ? (calcularAreaRanura() * form.values.numeroRanuras).toFixed(2) : ""}
                                onChange={form.handleChange}
                            />
                            <div className="UTRUnidad">{unidades.milimetros}</div>
                        </div>

                        {form.errors.presionDeDiseñoB && (
                            <span className="error-text">{form.errors.presionDeDiseñoB}</span>
                        )}
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3 TeeRedGroup">
                        <Form.Label htmlFor="temperaturaDeDiseño">Área Transversal Disponible</Form.Label>
                        <div className="inputGroup">
                            <Form.Control
                                disabled={true}
                                className="TeeRedInput"
                                placeholder=""
                                name="temperaturaDeDiseñoB"
                                value={calcularAreaTransversal() ? calcularAreaTransversal().toFixed(2) : ""}
                                onChange={form.handleChange}
                            />
                            <div className="UTRUnidad">{unidades.milimetros}</div>
                        </div>

                        {form.errors.temperaturaDeDiseñoB && (
                            <span className="error-text">{form.errors.temperaturaDeDiseñoB}</span>
                        )}
                    </Form.Group>
                </div>
            </Form>
        </div>
    );
}

export default UserAreaPeso;
