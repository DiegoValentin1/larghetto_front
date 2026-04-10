import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Form, Modal, FormGroup } from 'react-bootstrap';
import AxiosClient from '../../../shared/plugins/axios';
import '../../../utils/styles/UserNuevoTrabajo.css';
import '../../../utils/styles/PanelPagos.css';

export const SuperPagos = ({ isOpen, onClose, objeto }) => {
    console.log(objeto);

    const [pagosMes, setPagosMes] = useState({
        larghetto:0, centro:0, bugambilias:0, cuautla:0, cdmx:0
    });
    const [totalMensualidad, setTotalMensualidad] = useState({
        larghetto:0, centro:0, bugambilias:0, cuautla:0, cdmx:0
    });
    const [totalFaltantes, setTotalFaltantes] = useState({
        larghetto:0, centro:0, bugambilias:0, cuautla:0, cdmx:0
    });
    const [totalRecargos, setTotalRecargos] = useState({
        larghetto:0, centro:0, bugambilias:0, cuautla:0, cdmx:0
    });
    const [recargosEsperados, setRecargosEsperados] = useState({
        larghetto:{ cantidad:0, estimado:0 },
        centro:{ cantidad:0, estimado:0 },
        bugambilias:{ cantidad:0, estimado:0 },
        cuautla:{ cantidad:0, estimado:0 },
        cdmx:{ cantidad:0, estimado:0 }
    });

    const esDespuesDia7 = new Date().getDate() > 7;

    const redondear = (cantidad)=>{
       return cantidad ? cantidad.toLocaleString('en', { maximumFractionDigits: 4 }) : 0
    }

    useEffect(() => {
        const fetchMaterial = async () => {
            const response = await AxiosClient({
                method: "GET",
                url: "/stats/pagos/suma/total" ,
            });
            const response2 = await AxiosClient({
                method: "GET",
                url: "/stats/pagos/suma/centro" ,
            });
            const response3 = await AxiosClient({
                method: "GET",
                url: "/stats/pagos/suma/bugambilias" ,
            });
            const response4 = await AxiosClient({
                method: "GET",
                url: "/stats/pagos/suma/cuautla" ,
            });
            const response5 = await AxiosClient({
                method: "GET",
                url: "/stats/pagos/suma/CDMX" ,
            });
            if (!response.error && !response2.error && !response3.error && !response4.error) {
                setPagosMes({larghetto:response[0]['total_pagado'], centro:response2[0]['total_pagado'], bugambilias:response3[0]['total_pagado'], cuautla:response4[0]['total_pagado'], cdmx:response5[0]['total_pagado']});
            }
        };
        fetchMaterial();
    }, []);

    useEffect(() => {
        const fetchMaterial = async () => {
            const response = await AxiosClient({
                method: "GET",
                url: "/stats/pagos/total/mensualidades",
            });
            const response2 = await AxiosClient({
                method: "GET",
                url: "/stats/pagos/total/mensualidades/centro" ,
            });
            const response3 = await AxiosClient({
                method: "GET",
                url: "/stats/pagos/total/mensualidades/bugambilias" ,
            });
            const response4 = await AxiosClient({
                method: "GET",
                url: "/stats/pagos/total/mensualidades/cuautla" ,
            });
            const response5 = await AxiosClient({
                method: "GET",
                url: "/stats/pagos/total/mensualidades/CDMX" ,
            });
            if (!response.error && !response2.error && !response3.error && !response4.error) {
                console.log(response);
                console.log(response[0]['total_mensualidad']);
                setTotalMensualidad({larghetto:response[0]['total_mensualidad'], centro:response2[0]['total_mensualidad'], bugambilias:response3[0]['total_mensualidad'], cuautla:response4[0]['total_mensualidad'], cdmx:response5[0]['total_mensualidad']});
            }
        };
        fetchMaterial();
    }, []);

    useEffect(() => {
        const fetchMaterial = async () => {
            const response = await AxiosClient({
                method: "GET",
                url: "/stats/pagos/falta/total/",
            });
            const response2 = await AxiosClient({
                method: "GET",
                url: "/stats/pagos/falta/centro" ,
            });
            const response3 = await AxiosClient({
                method: "GET",
                url: "/stats/pagos/falta/bugambilias" ,
            });
            const response4 = await AxiosClient({
                method: "GET",
                url: "/stats/pagos/falta/cuautla" ,
            });
            const response5 = await AxiosClient({
                method: "GET",
                url: "/stats/pagos/falta/CDMX" ,
            });
            if (!response.error && !response2.error && !response3.error && !response4.error) {
                console.log(response);
                console.log(response[0]['lol']);
                setTotalFaltantes({larghetto:response[0]['lol'], centro:response2[0]['lol'], bugambilias:response3[0]['lol'], cuautla:response4[0]['lol'], cdmx:response5[0]['lol']});
            }
        };
        fetchMaterial();
    }, []);


    useEffect(() => {
        const fetchRecargos = async () => {
            try {
                const [r1, r2, r3, r4, r5] = await Promise.all([
                    AxiosClient({ method: "GET", url: "/stats/pagos/recargos/total" }),
                    AxiosClient({ method: "GET", url: "/stats/pagos/recargos/centro" }),
                    AxiosClient({ method: "GET", url: "/stats/pagos/recargos/bugambilias" }),
                    AxiosClient({ method: "GET", url: "/stats/pagos/recargos/cuautla" }),
                    AxiosClient({ method: "GET", url: "/stats/pagos/recargos/CDMX" }),
                ]);
                setTotalRecargos({
                    larghetto: r1?.data?.total_recargos ?? 0,
                    centro: r2?.data?.total_recargos ?? 0,
                    bugambilias: r3?.data?.total_recargos ?? 0,
                    cuautla: r4?.data?.total_recargos ?? 0,
                    cdmx: r5?.data?.total_recargos ?? 0,
                });
            } catch (err) {
                console.log("Error cargando recargos:", err);
            }
        };
        fetchRecargos();
    }, []);

    useEffect(() => {
        const fetchRecargosEsperados = async () => {
            try {
                const [r1, r2, r3, r4, r5] = await Promise.all([
                    AxiosClient({ method: "GET", url: "/stats/pagos/recargos-esperados/total" }),
                    AxiosClient({ method: "GET", url: "/stats/pagos/recargos-esperados/centro" }),
                    AxiosClient({ method: "GET", url: "/stats/pagos/recargos-esperados/bugambilias" }),
                    AxiosClient({ method: "GET", url: "/stats/pagos/recargos-esperados/cuautla" }),
                    AxiosClient({ method: "GET", url: "/stats/pagos/recargos-esperados/CDMX" }),
                ]);
                setRecargosEsperados({
                    larghetto: { cantidad: r1?.data?.cantidad ?? 0, estimado: r1?.data?.estimado ?? 0 },
                    centro:    { cantidad: r2?.data?.cantidad ?? 0, estimado: r2?.data?.estimado ?? 0 },
                    bugambilias: { cantidad: r3?.data?.cantidad ?? 0, estimado: r3?.data?.estimado ?? 0 },
                    cuautla:   { cantidad: r4?.data?.cantidad ?? 0, estimado: r4?.data?.estimado ?? 0 },
                    cdmx:      { cantidad: r5?.data?.cantidad ?? 0, estimado: r5?.data?.estimado ?? 0 },
                });
            } catch (err) {
                console.log("Error cargando recargos esperados:", err);
            }
        };
        fetchRecargosEsperados();
    }, []);

    const handleClose = () => {
        onClose();
    }

    return <Modal
        backdrop='static'
        keyboard={false}
        show={isOpen}
        onHide={handleClose}
        style={{ width: "90vw", display: "flex", alignContent: "start", justifyItems: "start", marginLeft: "5vw", padding: "0", height: "auto", backgroundColor: "white", borderRadius: "1rem", marginTop: "1rem", overflow: "hidden" }}
        dialogClassName="modalAlumnoActualizar"
        id="modalAlumnoR"
    >
        <Modal.Header closeButton >
            <Modal.Title>Panel de Pagos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div>
                <div style={{ fontSize: "20px", fontWeight: "bolder", borderBottom: "solid 1px black", display: "flex", paddingBottom: "5px", marginTop:"10px", marginBottom:"10px" }}>
                    <div style={{ width: "58%" }}>Morelos</div>
                </div>
                <div className="ContainerCharts DashboardContainer">
                    <div className="DashboardTitleP">
                        <div>Larghetto</div>
                        <div>Centro</div>
                        <div>Bugambilias</div>
                        <div>Cuautla</div>
                    </div>
                    <div className="ChartBoxP">
                        <div className="ChartContainer chartContainerP">
                            <div className="totalEsperado totalPagos">
                                <div>Total Mensualidad</div>
                                <div>{redondear(totalMensualidad.larghetto)}</div>
                            </div>
                            <div className="totalRecibido totalPagos">
                                <div>Pagos Obtenidos</div>
                                <div>{redondear(pagosMes.larghetto)}</div>
                                <div style={{ fontSize: '0.75rem', color: '#9CA3AF', marginTop: '2px' }}>
                                    incl. recargos: ${redondear(totalRecargos.larghetto)}
                                </div>
                            </div>
                            <div className="totalFaltante totalPagos">
                                <div>Pagos Faltantes</div>
                                <div>{redondear(totalFaltantes.larghetto)}</div>
                                {esDespuesDia7 && (
                                    <div style={{ fontSize: '0.75rem', color: '#9B1C1C', marginTop: '2px' }}>
                                        est. recargos: ${redondear(recargosEsperados.larghetto.estimado)}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="ChartContainer chartContainerP">
                            <div className="totalEsperado totalPagos">
                                <div>Total Mensualidad</div>
                                <div>{redondear(totalMensualidad.centro)}</div>
                            </div>
                            <div className="totalRecibido totalPagos">
                                <div>Pagos Obtenidos</div>
                                <div>{redondear(pagosMes.centro)}</div>
                                <div style={{ fontSize: '0.75rem', color: '#9CA3AF', marginTop: '2px' }}>
                                    incl. recargos: ${redondear(totalRecargos.centro)}
                                </div>
                            </div>
                            <div className="totalFaltante totalPagos">
                                <div>Pagos Faltantes</div>
                                <div>{redondear(totalFaltantes.centro)}</div>
                                {esDespuesDia7 && (
                                    <div style={{ fontSize: '0.75rem', color: '#9B1C1C', marginTop: '2px' }}>
                                        est. recargos: ${redondear(recargosEsperados.centro.estimado)}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="ChartContainer chartContainerP">
                            <div className="totalEsperado totalPagos">
                                <div>Total Mensualidad</div>
                                <div>{redondear(totalMensualidad.bugambilias)}</div>
                            </div>
                            <div className="totalRecibido totalPagos">
                                <div>Pagos Obtenidos</div>
                                <div>{redondear(pagosMes.bugambilias)}</div>
                                <div style={{ fontSize: '0.75rem', color: '#9CA3AF', marginTop: '2px' }}>
                                    incl. recargos: ${redondear(totalRecargos.bugambilias)}
                                </div>
                            </div>
                            <div className="totalFaltante totalPagos">
                                <div>Pagos Faltantes</div>
                                <div>{redondear(totalFaltantes.bugambilias)}</div>
                                {esDespuesDia7 && (
                                    <div style={{ fontSize: '0.75rem', color: '#9B1C1C', marginTop: '2px' }}>
                                        est. recargos: ${redondear(recargosEsperados.bugambilias.estimado)}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="ChartContainer chartContainerP">
                            <div className="totalEsperado totalPagos">
                                <div>Total Mensualidad</div>
                                <div>{redondear(totalMensualidad.cuautla)}</div>
                            </div>
                            <div className="totalRecibido totalPagos">
                                <div>Pagos Obtenidos</div>
                                <div>{redondear(pagosMes.cuautla)}</div>
                                <div style={{ fontSize: '0.75rem', color: '#9CA3AF', marginTop: '2px' }}>
                                    incl. recargos: ${redondear(totalRecargos.cuautla)}
                                </div>
                            </div>
                            <div className="totalFaltante totalPagos">
                                <div>Pagos Faltantes</div>
                                <div>{redondear(totalFaltantes.cuautla)}</div>
                                {esDespuesDia7 && (
                                    <div style={{ fontSize: '0.75rem', color: '#9B1C1C', marginTop: '2px' }}>
                                        est. recargos: ${redondear(recargosEsperados.cuautla.estimado)}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ fontSize: "20px", fontWeight: "bolder", borderBottom: "solid 1px black", display: "flex", paddingBottom: "5px", marginTop:"10px", marginBottom:"10px"}}>
                    <div style={{ width: "58%" }}>CDMX</div>
                </div>
                <div className="ContainerCharts DashboardContainer">
                    <div className="DashboardTitleP">
                        <div>CDMX</div>
                        <div>Coyoacán</div>
                        <div></div>
                        <div></div>
                    </div>
                    <div className="ChartBoxP">
                        <div className="ChartContainer chartContainerP">
                            <div className="totalEsperado totalPagos">
                                <div>Total Mensualidad</div>
                                <div>{redondear(totalMensualidad.cdmx)}</div>
                            </div>
                            <div className="totalRecibido totalPagos">
                                <div>Pagos Obtenidos</div>
                                <div>{redondear(pagosMes.cdmx)}</div>
                                <div style={{ fontSize: '0.75rem', color: '#9CA3AF', marginTop: '2px' }}>
                                    incl. recargos: ${redondear(totalRecargos.cdmx)}
                                </div>
                            </div>
                            <div className="totalFaltante totalPagos">
                                <div>Pagos Faltantes</div>
                                <div>{redondear(totalFaltantes.cdmx)}</div>
                                {esDespuesDia7 && (
                                    <div style={{ fontSize: '0.75rem', color: '#9B1C1C', marginTop: '2px' }}>
                                        est. recargos: ${redondear(recargosEsperados.cdmx.estimado)}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="ChartContainer chartContainerP">
                            <div className="totalEsperado totalPagos">
                                <div>Total Mensualidad</div>
                                <div>{redondear(totalMensualidad.cdmx)}</div>
                            </div>
                            <div className="totalRecibido totalPagos">
                                <div>Pagos Obtenidos</div>
                                <div>{redondear(pagosMes.cdmx)}</div>
                                <div style={{ fontSize: '0.75rem', color: '#9CA3AF', marginTop: '2px' }}>
                                    incl. recargos: ${redondear(totalRecargos.cdmx)}
                                </div>
                            </div>
                            <div className="totalFaltante totalPagos">
                                <div>Pagos Faltantes</div>
                                <div>{redondear(totalFaltantes.cdmx)}</div>
                                {esDespuesDia7 && (
                                    <div style={{ fontSize: '0.75rem', color: '#9B1C1C', marginTop: '2px' }}>
                                        est. recargos: ${redondear(recargosEsperados.cdmx.estimado)}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="ChartContainer chartContainerP">

                        </div>
                        <div className="ChartContainer chartContainerP">

                        </div>
                    </div>
                </div>
            </div>
        </Modal.Body>
    </Modal>
};