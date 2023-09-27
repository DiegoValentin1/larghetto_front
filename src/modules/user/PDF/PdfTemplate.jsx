import React from 'react';
import { Document, Page, View, Image, PDFViewer, Text } from '@react-pdf/renderer';

const PdfTemplate = () => {

    return (
        <PDFViewer style={{ height: "91.5vh", width: "100%" }}>
            <Document >
                <Page size="A4">
                    <View style={{ display: "flex", alignItems: "center", border: "solid 1.1px black", width: "100%", height: "100%", backgroundColor: "white", padding: "10px", flexDirection: "column" }}>

                        <View style={{ display: "flex", alignItems: "center", border: "solid 0px black", width: "100%", height: "99%", backgroundColor: "white", flexDirection: "column" }}>

                            <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "90%", height: "15%", marginBottom: "7%", flexDirection: "row" }}>
                                <View style={{ display: "flex", justifyContent: "end", flex: 1, height: "100%", width: "50%", paddingRight: "10%" }}>
                                    <Image style={{ height: "80%", width: "47.5%", marginLeft: "20%", marginTop: "4%" }} src={require('../../../utils/img/mpgiaLogoColorLogo.jpg')} />
                                </View>
                                <View style={{ display: "flex", justifyContent: "center", flex: 1, alignItems: "center", height: "100%", width: "100%", paddingLeft: "0%", marginLeft: "0%" }}>
                                    <Image style={{ height: "80%", width: "50%", marginTop: "4%" }} src={require('../../../utils/img/mpgiaSAdeCV.png')} />
                                </View>
                            </View>


                            <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "50%", flexDirection: "column", fontWeight: "bold", marginBottom: "10%", fontSize: "15px" }}>
                                <Text style={{ display: "flex", justifyContent: "center" }}>
                                    CÁLCULOS DE DISEÑO
                                </Text>
                                <Text style={{ display: "flex", justifyContent: "center", marginBottom: "17%" }}>
                                    Rev. 0
                                </Text>
                                <Text style={{ display: "flex", justifyContent: "center" }}>
                                    ASME B31-8 ED. 2020
                                </Text>
                                <Text style={{ display: "flex", justifyContent: "center" }}>
                                    ASME B16-9 ED. 2018
                                </Text>
                                <Text style={{ display: "flex", justifyContent: "center", marginBottom: "17%" }}>
                                    NRF-030-PEMEX-2009
                                </Text>
                                <Text style={{ display: "flex", justifyContent: "center", marginBottom: "17%" }}>
                                    O.T. 4043
                                </Text>
                                <Text style={{ display: "flex", justifyContent: "center" }}>
                                    TEE DE FLUJO AXIAL
                                </Text>
                                <Text style={{ display: "flex", justifyContent: "center" }}>
                                    DN 750 x 600 (NPS 30 x 24)
                                </Text>
                            </View>

                            <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", width: "80%", height: "7%", marginTop: "10%" }}>

                                <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "33%", height: "100%", backgroundColor: "black", padding: "0.5px", paddingTop: "1px", paddingLeft: "1px" }}>
                                    <View style={{ backgroundColor: "white", width: "100%", height: "100%" }}>

                                    </View>
                                </View>
                                <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "33%", height: "100%", backgroundColor: "black", padding: "0.5px", paddingTop: "1px" }}>
                                    <View style={{ backgroundColor: "white", width: "100%", height: "100%" }}>

                                    </View>
                                </View>
                                <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "33%", height: "100%", backgroundColor: "black", padding: "0.5px", paddingTop: "1px", paddingRight: "1px" }}>
                                    <View style={{ backgroundColor: "white", width: "100%", height: "100%" }}>

                                    </View>
                                </View>

                            </View>

                            <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", width: "80%", height: "7%", fontSize: "8px" }}>

                                <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "33%", height: "100%", backgroundColor: "black", padding: "0.5px", paddingBottom: "1px", paddingLeft: "1px" }}>
                                    <View style={{ backgroundColor: "white", width: "100%", height: "100%", padding: "5%", alignItems: "center", paddingTop: "10%" }}>
                                        <Text style={{ textAlign: "center" }}>PREPARADO POR (PREPARED BY):
                                            ING. KATIA GALLARDO PÉREZ</Text>
                                    </View>
                                </View>

                                <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "33%", height: "100%", backgroundColor: "black", padding: "0.5px", paddingBottom: "1px" }}>
                                    <View style={{ backgroundColor: "white", width: "100%", height: "100%", padding: "5%", alignItems: "center", paddingTop: "10%" }}>
                                        <Text style={{ textAlign: "center" }}>REVISADO POR (REVIEWED BY):
                                            ING. HECTOR M. MORAN PLATA:</Text>
                                    </View>
                                </View>

                                <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "33%", height: "100%", backgroundColor: "black", padding: "0.5px", paddingBottom: "1px", paddingRight: "1px" }}>
                                    <View style={{ backgroundColor: "white", width: "100%", height: "100%", padding: "5%", alignItems: "center", paddingTop: "10%" }}>
                                        <Text style={{ textAlign: "center" }}>APROBACION CLIENTE
                                            (CUSTOMER APPROVED):</Text>
                                    </View>
                                </View>

                            </View>

                        </View>

                        <View style={{ display: "flex", alignContent: "end", justifyItems: "end", border: "solid 0px black", width: "100%", height: "5%", backgroundColor: "white", flexDirection: "column" }}>
                            <View style={{ display: "flex", justifyContent: "end", width: "100%", height: "100%", fontSize: "10px", fontWeight: "bold", flexDirection: "row" }}>
                                <Text style={{ textAlign: "left", display: "flex", justifyContent: "start", height: "100%", width: "50%", paddingLeft: "10%", flex: 1 }}>
                                    SO 4043
                                </Text>
                                <Text style={{ textAlign: "right", display: "flex", flex: 1, justifyContent: "end", height: "100%", width: "50%", paddingRight: "10%" }}>
                                    1
                                </Text>
                            </View>
                        </View>
                    </View>
                </Page>
                <Page size="A4">
                    <View style={{ display: "flex", alignItems: "center", border: "solid 1.1px black", width: "100%", height: "100%", backgroundColor: "white", padding: "10px", flexDirection: "column" }}>

                        <View style={{ display: "flex", alignItems: "center", border: "solid 0px black", width: "100%", height: "100%", backgroundColor: "white", flexDirection: "column" }}>

                            <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "90%", height: "10%", marginBottom: "2%", flexDirection: "row" }}>
                                <View style={{ display: "flex", justifyContent: "end", flex: 1, height: "100%", width: "50%", paddingRight: "10%" }}>
                                    <Image style={{ height: "80%", width: "32%", marginLeft: "20%", marginTop: "4%" }} src={require('../../../utils/img/mpgiaLogoColorLogo.jpg')} />
                                </View>
                                <View style={{ display: "flex", justifyContent: "center", flex: 1, alignItems: "center", height: "100%", width: "50%", paddingLeft: "0%", marginLeft: "10%" }}>
                                    <Image style={{ height: "80%", width: "50%", marginTop: "4%" }} src={require('../../../utils/img/mpgiaSAdeCV.png')} />
                                </View>
                            </View>

                            <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "80%", flexDirection: "column", fontWeight: "bold", marginBottom: "10%", fontSize: "10px" }}>

                                <Text style={{ textAlign: "center", display: "flex", justifyContent: "center", width: "100%", marginLeft: "0%", marginBottom: "4%", fontSize: "12px" }}>
                                    INDICE
                                </Text>
                                <Text style={{ display: "flex", justifyContent: "start", width: "100%", marginLeft: "15%", marginBottom: "3%" }}>
                                    INTRODUCCIÓN
                                </Text>
                                <Text style={{ display: "flex", justifyContent: "start", width: "100%", marginLeft: "10%", marginBottom: "0.5%" }}>
                                    1.   TEE  REDUCCIÓN PRINCIPAL  DN  750  x  600 (NPS 30 x 24)
                                </Text>
                                <Text style={{ display: "flex", justifyContent: "start", width: "100%", marginLeft: "10%", marginBottom: "0.5%" }}>
                                    2.   BRIDA  EXTREMO  DN  750  x  600  (NPS 30 x 24)
                                </Text>
                                <Text style={{ display: "flex", justifyContent: "start", width: "100%", marginLeft: "10%", marginBottom: "0.5%" }}>
                                    3.   CAMISA  INTERIOR  DN  600  (NPS 24)
                                </Text>
                                <Text style={{ display: "flex", justifyContent: "start", width: "100%", marginLeft: "10%", marginBottom: "0.5%" }}>
                                    4.   REFUERZO  INTEGRAL  EN  DERIVACIONES  EXTRUIDAS
                                </Text>
                                <Text style={{ display: "flex", justifyContent: "start", width: "100%", marginLeft: "10%", marginBottom: "0.5%" }}>
                                    5.   ÁREA  TRANSVERSAL  DE  DERIVACIÓN  DN  600  (NPS 24)
                                </Text>
                                <Text style={{ display: "flex", justifyContent: "start", width: "100%", marginLeft: "10%", marginBottom: "0.5%" }}>
                                    6.   PESO  DE  TEE  DE  FLUJO  AXIAL  DN  750  x  600  (NPS 30 x 24)
                                </Text>
                            </View>

                        </View>


                        <View style={{ display: "flex", alignContent: "end", justifyItems: "end", border: "solid 0px black", width: "100%", height: "5%", backgroundColor: "white", flexDirection: "column" }}>
                            <View style={{ display: "flex", justifyContent: "end", width: "100%", height: "100%", fontSize: "10px", fontWeight: "bold", flexDirection: "row" }}>
                                <Text style={{ textAlign: "left", display: "flex", justifyContent: "start", height: "100%", width: "50%", paddingLeft: "10%", flex: 1 }}>
                                    SO 4043
                                </Text>
                                <Text style={{ textAlign: "right", display: "flex", flex: 1, justifyContent: "end", height: "100%", width: "50%", paddingRight: "10%" }}>
                                    2
                                </Text>
                            </View>
                        </View>

                    </View>
                </Page>
                <Page size="A4">
                    <View style={{ display: "flex", alignItems: "center", border: "solid 1.1px black", width: "100%", height: "100%", backgroundColor: "white", padding: "10px", flexDirection: "column" }}>

                        <View style={{ display: "flex", alignItems: "center", border: "solid 0px black", width: "100%", height: "100%", backgroundColor: "white", flexDirection: "column" }}>

                            <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "90%", height: "10%", marginBottom: "2%", flexDirection: "row" }}>
                                <View style={{ display: "flex", justifyContent: "end", flex: 1, height: "100%", width: "50%", paddingRight: "10%" }}>
                                    <Image style={{ height: "80%", width: "32%", marginLeft: "20%", marginTop: "4%" }} src={require('../../../utils/img/mpgiaLogoColorLogo.jpg')} />
                                </View>
                                <View style={{ display: "flex", justifyContent: "center", flex: 1, alignItems: "center", height: "100%", width: "50%", paddingLeft: "0%", marginLeft: "10%" }}>
                                    <Image style={{ height: "80%", width: "50%", marginTop: "4%" }} src={require('../../../utils/img/mpgiaSAdeCV.png')} />
                                </View>
                            </View>

                            <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", flexDirection: "column", fontWeight: "bold", marginBottom: "10%", fontSize: "10px" }}>

                                <Text style={{ display: "flex", justifyContent: "start", width: "90%", marginBottom: "2%" }}>
                                    INTRODUCCIÓN
                                </Text>
                                <Text style={{ display: "flex", justifyContent: "start", width: "90%", marginBottom: "3%" }}>
                                    Los cálculos en este documento han sido realizados bajo las normas de referencia mexicanas, estándares
                                    de fabricación internacionales y dibujos de referencia siguientes:
                                </Text>

                                <View style={{ display: "flex", justifyContent: "start", flexDirection: "column", width: "90%", marginLeft: "10%" }}>

                                    <View style={{ display: "flex", justifyContent: "center", width: "90%", marginBottom: "2%", flexDirection: "row" }}>
                                        <Text style={{ display: "flex", flex: 2, justifyContent: "start", width: "30%" }}>
                                            ASME B31.8 Ed. 2020
                                        </Text>
                                        <Text style={{ flex: 5, width: "100%" }}>
                                            Gas transmission y distribution piping systems. (Sistemas de tubería de
                                            distribución y transmisión de gas).
                                        </Text>
                                    </View>
                                    <View style={{ display: "flex", justifyContent: "center", width: "90%", marginBottom: "2%", flexDirection: "row" }}>
                                        <Text style={{ display: "flex", flex: 2, justifyContent: "start", width: "30%" }}>
                                            ASME B16.9 Ed. 2018
                                        </Text>
                                        <Text style={{ display: "flex", flex: 5, justifyContent: "start", width: "100%" }}>
                                            Factory-Made Wrought Buttwelding Fittings. (Accesorios soldados a tope
                                            de forjados hechos en fábrica).
                                        </Text>
                                    </View>
                                    <View style={{ display: "flex", justifyContent: "center", width: "90%", marginBottom: "2%", flexDirection: "row" }}>
                                        <Text style={{ display: "flex", flex: 2, justifyContent: "start", width: "30%" }}>
                                            NRF-030-PEMEX-2009
                                        </Text>
                                        <Text style={{ display: "flex", flex: 5, justifyContent: "start", width: "100%" }}>
                                            Diseño, construcción, inspección y mantenimiento de ductos terrestres
                                            para transporte y recolección de hidrocarburos.
                                        </Text>
                                    </View>
                                    <View style={{ display: "flex", justifyContent: "center", width: "90%", marginBottom: "2%", flexDirection: "row" }}>
                                        <Text style={{ display: "flex", flex: 2, justifyContent: "start", width: "30%" }}>
                                            NRF-178-PEMEX-2010
                                        </Text>
                                        <Text style={{ display: "flex", flex: 5, justifyContent: "start", width: "100%" }}>
                                            Trampas de diablos en plataformas marinas.
                                        </Text>

                                    </View>
                                </View>

                                <Text style={{ display: "flex", justifyContent: "start", width: "100%", marginLeft: "10%", marginTop: "2%", marginBottom: "2%" }}>
                                    Notas importantes.
                                </Text>
                                <Text style={{ display: "flex", justifyContent: "start", width: "100%", marginLeft: "10%", marginBottom: "2%", paddingRight: "5%" }}>
                                    1. El margen de corrosión para el diseño de la tee de flujo axial para una vida útil de 20 años fue de 3.2
                                    mm (1/8”).
                                </Text>
                                <Text style={{ display: "flex", justifyContent: "start", width: "100%", marginLeft: "10%", marginBottom: "2%" }}>
                                    2. Los cálculos fueron realizados con las siguientes especificaciones de materiales:
                                </Text>

                                <View style={{ width: "70%", height: "12%", flexDirection: "row" }}>
                                    <View style={{ flex: 1, height: "100%", backgroundColor: "black", padding: "0.5px", paddingTop: "1px", paddingLeft: "1px" }}>
                                        <View style={{ width: "100%", height: "100%", backgroundColor: "white", padding: "4%", paddingTop: "12%" }}>
                                            <Text style={{ textAlign: "center" }}>Tipo de material.</Text>
                                        </View>
                                    </View>
                                    <View style={{ flex: 1, height: "100%", backgroundColor: "black", padding: "0.5px", paddingTop: "1px", paddingRight: "1px" }}>
                                        <View style={{ width: "100%", height: "100%", backgroundColor: "white", padding: "4%", paddingTop: "8%" }}>
                                            <Text style={{ textAlign: "center" }}>Material de acuerdo a
                                                especificaciones con valores de
                                                esfuerzo de referencia.</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ width: "70%", height: "4%", flexDirection: "row" }}>
                                    <View style={{ flex: 1, height: "100%", backgroundColor: "black", padding: "0.5px", paddingLeft: "1px" }}>
                                        <View style={{ width: "100%", height: "100%", backgroundColor: "white", paddingTop: "1%" }}>
                                            <Text style={{ textAlign: "center" }}>Tee reducción principal</Text>
                                        </View>
                                    </View>
                                    <View style={{ flex: 1, height: "100%", backgroundColor: "black", padding: "0.5px", paddingRight: "1px" }}>
                                        <View style={{ width: "100%", height: "100%", backgroundColor: "white", paddingTop: "1%" }}>
                                            <Text style={{ textAlign: "center" }}>A-860-WPHY65 o MSS-SP-75-WPHY65</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ width: "70%", height: "4%", flexDirection: "row" }}>
                                    <View style={{ flex: 1, height: "100%", backgroundColor: "black", padding: "0.5px", paddingLeft: "1px" }}>
                                        <View style={{ width: "100%", height: "100%", backgroundColor: "white", paddingTop: "1%" }}>
                                            <Text style={{ textAlign: "center" }}>Bridas extremos</Text>
                                        </View>
                                    </View>
                                    <View style={{ flex: 1, height: "100%", backgroundColor: "black", padding: "0.5px", paddingRight: "1px" }}>
                                        <View style={{ width: "100%", height: "100%", backgroundColor: "white", paddingTop: "1%" }}>
                                            <Text style={{ textAlign: "center" }}>A-694-F65</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ width: "70%", height: "4%", flexDirection: "row" }}>
                                    <View style={{ flex: 1, height: "100%", backgroundColor: "black", padding: "0.5px", paddingBottom: "1px", paddingLeft: "1px" }}>
                                        <View style={{ width: "100%", height: "100%", backgroundColor: "white", paddingTop: "1%" }}>
                                            <Text style={{ textAlign: "center" }}>Camisa interior</Text>
                                        </View>
                                    </View>
                                    <View style={{ flex: 1, height: "100%", backgroundColor: "black", padding: "0.5px", paddingBottom: "1px", paddingRight: "1px" }}>
                                        <View style={{ width: "100%", height: "100%", backgroundColor: "white", paddingTop: "1%" }}>
                                            <Text style={{ textAlign: "center" }}>API L450 X65</Text>
                                        </View>
                                    </View>
                                </View>

                                <Text style={{ display: "flex", justifyContent: "start", width: "90%", marginTop: "2%" }}>
                                    3. Se consideró la presión de diseño para esta tee de flujo axial con un valor de 86.00 Kg/cm2
                                    y una

                                    temperatura de diseño de 100.00°C.
                                </Text>
                            </View>

                        </View>


                        <View style={{ display: "flex", alignContent: "end", justifyItems: "end", border: "solid 0px black", width: "100%", height: "5%", backgroundColor: "white", flexDirection: "column" }}>
                            <View style={{ display: "flex", justifyContent: "end", width: "100%", height: "100%", fontSize: "10px", fontWeight: "bold", flexDirection: "row" }}>
                                <Text style={{ textAlign: "left", display: "flex", justifyContent: "start", height: "100%", width: "50%", paddingLeft: "10%", flex: 1 }}>
                                    SO 4043
                                </Text>
                                <Text style={{ textAlign: "right", display: "flex", flex: 1, justifyContent: "end", height: "100%", width: "50%", paddingRight: "10%" }}>
                                    3
                                </Text>
                            </View>
                        </View>

                    </View>
                </Page>
                <Page size="A4">
                    <View style={{ display: "flex", alignItems: "center", border: "solid 1.1px black", width: "100%", height: "100%", backgroundColor: "white", padding: "10px", flexDirection: "column" }}>

                        <View style={{ display: "flex", alignItems: "center", border: "solid 0px black", width: "100%", height: "99%", backgroundColor: "white", flexDirection: "column" }}>

                            <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "90%", height: "10%", marginBottom: "2%", flexDirection: "row" }}>
                                <View style={{ display: "flex", justifyContent: "end", flex: 1, height: "100%", width: "50%", paddingRight: "10%" }}>
                                    <Image style={{ height: "80%", width: "32%", marginLeft: "20%", marginTop: "4%" }} src={require('../../../utils/img/mpgiaLogoColorLogo.jpg')} />
                                </View>
                                <View style={{ display: "flex", justifyContent: "center", flex: 1, alignItems: "center", height: "100%", width: "50%", paddingLeft: "0%", marginLeft: "10%" }}>
                                    <Image style={{ height: "80%", width: "50%", marginTop: "4%" }} src={require('../../../utils/img/mpgiaSAdeCV.png')} />
                                </View>
                            </View>

                            <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", flexDirection: "column", fontWeight: "bold", marginBottom: "10%", fontSize: "10px" }}>

                                <Text style={{ display: "flex", flex: 1, textAlign: "center", justifyContent: "center", width: "100%", marginBottom: "2%" }}>
                                    CÁLCULOS DE DISEÑO. TEE ESPECIAL DE FLUJO AXIAL

                                </Text>
                                <Text style={{ display: "flex", flex: 1, textAlign: "center", justifyContent: "center", width: "100%", marginBottom: "5%", fontSize: "8px" }}>
                                    (AXIAL FLOW TEE. DESIGN CALCS)

                                </Text>
                                <Text style={{ display: "flex", justifyContent: "start", width: "100%", marginLeft: "10%", marginBottom: "0%" }}>
                                    1. TEE REDUCCIÓN PRINCIPAL DN 750 x 600 (NPS 30 x 24 MAIN REDUCING OUTLET TEE).
                                </Text>
                                <Text style={{ display: "flex", fontSize: "8px", justifyContent: "start", width: "100%", marginLeft: "10%", marginBottom: "1%" }}>
                                    1.1. DATOS DE DISEÑO (DESIGN DATA).
                                </Text>





                                <View style={{ display: "flex", justifyContent: "start", flexDirection: "column", width: "100%", marginLeft: "10%", fontSize: "8px" }}>

                                    <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "90%", backgroundColor: "#81C1FB", flexDirection: "row", padding: "1%" }}>
                                        <Text style={{ display: "flex", flex: 4, justifyContent: "start", width: "65%" }}>
                                            Material de accesorio (FITTING MATERIAL)
                                        </Text>
                                        <View style={{ display: "flex", flex: 2, justifyContent: "start", width: "40%" }}>
                                            <Text>ASTM A-860-WPHY65/MSS SP-75-WPHY65</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", width: "90%", backgroundColor: "#f2f2f2", padding: "1%", alignItems: "center" }}>
                                        <Text style={{ display: "flex", flex: 4, justifyContent: "start", width: "65%" }}>
                                            Diámetro exterior (OUTSIDE DIAMETER)
                                        </Text>
                                        <View style={{ display: "flex", flex: 2, flexDirection: "row", justifyContent: "start", width: "40%" }}>
                                            <Text style={{ flex: 1 }}>D</Text>
                                            <Text style={{ flex: 1 }}>=</Text>
                                            <Text style={{ marginLeft: "1%", flex: 4 }}>762.00mm</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: "flex", justifyContent: "center", width: "90%", backgroundColor: "#81C1FB", alignItems: "center", flexDirection: "row", padding: "1%" }}>
                                        <Text style={{ display: "flex", flex: 4, justifyContent: "start", width: "65%" }}>
                                            Diámetro de salida reducción (REDUCING OUTLET DIAMETER)
                                        </Text>
                                        <View style={{ display: "flex", flex: 2, flexDirection: "row", justifyContent: "start", width: "40%" }}>
                                            <Text style={{ flex: 1 }}>Dred</Text>
                                            <Text style={{ marginLeft: "0%", flex: 1 }}>=</Text>
                                            <Text style={{ marginLeft: "0%", flex: 4 }}>609.60mm</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: "flex", justifyContent: "center", width: "90%", backgroundColor: "#f2f2f2", padding: "1%", alignItems: "center", flexDirection: "row" }}>
                                        <Text style={{ display: "flex", flex: 4, justifyContent: "start", width: "65%" }}>
                                            Presión de diseño (DESIGN PRESSURE)
                                        </Text>
                                        <View style={{ display: "flex", flex: 2, flexDirection: "row", justifyContent: "start", width: "40%" }}>
                                            <Text style={{ flex: 2 }}>P</Text>
                                            <Text style={{ marginLeft: "0%", flex: 2 }}>=</Text>
                                            <Text style={{ marginLeft: "0%", flex: 4 }}>86.00kg/cm2</Text>
                                            <Text style={{ marginLeft: "0%", flex: 1 }}>=</Text>
                                            <Text style={{ marginLeft: "0%", flex: 3 }}>8.43MPa</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: "flex", justifyContent: "center", width: "90%", backgroundColor: "#81C1FB", alignItems: "center", padding: "1%", flexDirection: "row" }}>
                                        <Text style={{ display: "flex", flex: 4, justifyContent: "start", width: "65%" }}>
                                            Temperatura de diseño (DESIGN TEMPERATURE)
                                        </Text>
                                        <View style={{ display: "flex", flex: 2, flexDirection: "row", justifyContent: "start", width: "40%" }}>
                                            <Text style={{ flex: 1 }}>T</Text>
                                            <Text style={{ marginLeft: "0%", flex: 1 }}>=</Text>
                                            <Text style={{ marginLeft: "0%", flex: 4 }}>100.00°C</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: "flex", justifyContent: "center", width: "90%", backgroundColor: "#f2f2f2", padding: "1%", alignItems: "center", flexDirection: "row" }}>
                                        <Text style={{ display: "flex", flex: 4, justifyContent: "start", width: "65%" }}>
                                            Corrosión permisible (CORROSION ALLOWANCE)
                                        </Text>
                                        <View style={{ display: "flex", flexDirection: "row", flex: 2, justifyContent: "start", width: "40%" }}>
                                            <Text style={{ flex: 1 }}>C</Text>
                                            <Text style={{ marginLeft: "0%", flex: 1 }}>=</Text>
                                            <Text style={{ marginLeft: "0%", flex: 4 }}>3.20mm</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: "flex", justifyContent: "center", width: "90%", backgroundColor: "#81C1FB", padding: "1%", alignItems: "center", flexDirection: "row" }}>
                                        <Text style={{ display: "flex", flex: 5, justifyContent: "start", width: "65%", paddingRight: "0%" }}>
                                            Valor de esfuerzo mínimo a la cedencia especificado (SPECIFIED MIN. YIELD STRENGTH) ASTM A-860 Ed. 2018 Tabla (TABLE) 2 Pág. 3
                                        </Text>
                                        <View style={{ flex: 1 }}></View>
                                        <View style={{ display: "flex", flex: 3, flexDirection: "row", justifyContent: "start", width: "40%", marginLeft: "0%" }}>
                                            <Text style={{ flex: 1 }}>S</Text>
                                            <Text style={{ marginLeft: "0%", flex: 1 }}>=</Text>
                                            <Text style={{ marginLeft: "0%", flex: 4 }}>450.00MPa</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: "flex", justifyContent: "center", width: "90%", backgroundColor: "#f2f2f2", padding: "1%", alignItems: "center", flexDirection: "row" }}>
                                        <Text style={{ display: "flex", flex: 5, justifyContent: "start", width: "65%" }}>
                                            Factor de diseño (Clase de ubicación 2) [DESIGN FACTOR (LOCATION CLASS 2)] B31.8 Ed. 2020 Tabla (TABLE) 841.1.6-1 Pág. 41
                                        </Text>
                                        <View style={{ flex: 1 }}></View>
                                        <View style={{ display: "flex", flex: 3, flexDirection: "row", justifyContent: "start", width: "40%" }}>
                                            <Text style={{ flex: 1 }}>F</Text>
                                            <Text style={{ marginLeft: "0%", flex: 1 }}>=</Text>
                                            <Text style={{ marginLeft: "0%", flex: 4 }}>0.60</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: "flex", justifyContent: "center", width: "90%", backgroundColor: "#81C1FB", padding: "1%", alignItems: "center", flexDirection: "row" }}>
                                        <Text style={{ display: "flex", flex: 4, justifyContent: "start", width: "65%" }}>
                                            Factor de junta longitudinal (LONGITUDINAL JOINT FACTOR) B31.8 Ed. 2020 Tabla (TABLE) 841.1.7-1 Pág. 43
                                        </Text>
                                        <View style={{ display: "flex", flex: 2, flexDirection: "row", justifyContent: "start", width: "40%" }}>
                                            <Text style={{ flex: 1 }}>E</Text>
                                            <Text style={{ marginLeft: "0%", flex: 1 }}>=</Text>
                                            <Text style={{ marginLeft: "0%", flex: 4 }}>1.00</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: "flex", justifyContent: "center", width: "90%", backgroundColor: "#f2f2f2", padding: "1%", alignItems: "center", flexDirection: "row" }}>
                                        <Text style={{ display: "flex", flex: 4, justifyContent: "start", width: "65%" }}>
                                            Factor de temperatura derating (TEMPERATURE DERATING FACTOR) B31.8 Ed. 2020 Tabla (TABLE) 841.1.8-1 Pág. 43
                                        </Text>
                                        <View style={{ display: "flex", flex: 2, flexDirection: "row", justifyContent: "start", width: "40%" }}>
                                            <Text style={{ flex: 1 }}>T</Text>
                                            <Text style={{ marginLeft: "0%", flex: 1 }}>=</Text>
                                            <Text style={{ marginLeft: "0%", flex: 4 }}>1.000</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: "flex", justifyContent: "center", width: "90%", backgroundColor: "#81C1FB", padding: "1%", alignItems: "center", flexDirection: "row" }}>
                                        <Text style={{ display: "flex", flex: 4, justifyContent: "start", width: "65%" }}>
                                            Espesor de diseño (DESIGN THICKNESS)
                                        </Text>
                                        <View style={{ display: "flex", flex: 2, flexDirection: "row", justifyContent: "start", width: "40%" }}>
                                            <Text style={{ flex: 1 }}></Text>
                                            <Text style={{ marginLeft: "10%", flex: 1 }}></Text>
                                            <Text style={{ marginLeft: "10%", flex: 1 }}></Text>
                                            <Text style={{ flex: 1 }}></Text>
                                        </View>
                                    </View>
                                    <View style={{ display: "flex", justifyContent: "center", width: "90%", backgroundColor: "#f2f2f2", padding: "1%", alignItems: "center", flexDirection: "row" }}>
                                        <Text style={{ display: "flex", flex: 4, justifyContent: "start", width: "65%" }}>
                                            Espesor mínimo requerido (MINIMUM REQUIRED THICKNESS)
                                        </Text>
                                        <View style={{ display: "flex", flex: 2, flexDirection: "row", justifyContent: "start", width: "40%" }}>
                                            <Text style={{ flex: 1 }}></Text>
                                            <Text style={{ marginLeft: "10%", flex: 1 }}></Text>
                                            <Text style={{ marginLeft: "10%", flex: 1 }}></Text>
                                            <Text style={{ flex: 1 }}></Text>
                                        </View>
                                    </View>
                                    <View style={{ display: "flex", justifyContent: "center", width: "90%", backgroundColor: "#81C1FB", padding: "1%", alignItems: "center", flexDirection: "row" }}>
                                        <Text style={{ display: "flex", flex: 4, justifyContent: "start", width: "65%" }}>
                                            Espesor de pared adicional por corrosión (ADDITIONAL WALL THICKNESS PER CORROSION)
                                        </Text>
                                        <View style={{ display: "flex", flex: 2, flexDirection: "row", justifyContent: "start", width: "40%" }}>
                                            <Text style={{ flex: 1 }}></Text>
                                            <Text style={{ marginLeft: "10%", flex: 1 }}></Text>
                                            <Text style={{ marginLeft: "10%", flex: 1 }}></Text>
                                            <Text style={{ flex: 1 }}></Text>
                                        </View>
                                    </View>


                                </View>




                                <Text style={{ display: "flex", justifyContent: "start", alignItems: "center", width: "100%", marginLeft: "10%", marginTop: "2%", marginBottom: "1%" }}>
                                    1.2. Espesor de tubería bajo presión interna
                                    <Text style={{ fontSize: "7px", alignItems: "center" }}>(PIPELINE THICKNESS UNDER INTERNAL PRESSURE) (B31.8 Par. 841.1.1).</Text>
                                </Text>
                                <Text style={{ display: "flex", justifyContent: "start", width: "100%", marginLeft: "10%", paddingRight: "5%", fontSize: "8px" }}>
                                    El estándar ASME B31.8 en el párrafo 831.3.1 establece que para el cálculo del espesor de accesorios estándar, debe usarse la fórmula de
                                    cálculo de espesor para tubería.
                                </Text>
                                <Text style={{ display: "flex", justifyContent: "start", width: "100%", marginLeft: "10%", marginBottom: "3%", fontSize: "6px", paddingRight: "5%" }}>
                                    (ASME STANDARD B31.8 PAR. 831.3.1 ADDRESS THAT IN ORDER TO CALCULATE STANDARD FITTINGS THICKNESS, FORMULA TO CALCULATE PIPELINE THICKNESS SHALL BE USED).
                                </Text>

                                <View style={{ display: "flex", justifyContent: "start", alignItems: "center", width: "90%", flexDirection: "row", marginBottom: "4%" }}>
                                    <Text style={{ flex: 1, marginTop: "2.5%" }}>t</Text>
                                    <Text style={{ marginLeft: "2%", flex: 1, marginTop: "2.5%" }}>=</Text>
                                    <View style={{ marginRight: "0%", flex: 2, flexDirection: "column", marginTop: "0.5%" }}>
                                        <Text style={{ textAlign: "center", flex: 1 }}>PD</Text>
                                        <View style={{ height: "1px", backgroundColor: "black", flex: 1, width: "100%", padding: "1px", marginTop: "26%", marginBottom: "1%" }}></View>
                                        <Text style={{ flex: 1, textAlign: "center" }}>2SFET</Text>
                                    </View>
                                    <Text style={{ marginLeft: "2%", flex: 1, marginTop: "2.5%" }}>=</Text>
                                    <View style={{ marginRight: "3%", flex: 8, display: "flex", flexDirection: "column" }}>
                                        <Text style={{ textAlign: "center", flex: 1 }}>(8.43)   (762.00)</Text>
                                        <View style={{ height: "1px", backgroundColor: "black", flex: 1, width: "100%", padding: "1px", marginTop: "8%", marginBottom: "1%" }}></View>
                                        <Text style={{ flex: 1, textAlign: "center" }}>2 (450.00)  (0.60)  (1.00)  (1.000)</Text>
                                    </View>
                                    <Text style={{ marginLeft: "0%", flex: 1, marginTop: "2.5%" }}>=</Text>
                                    <Text style={{ textAlign: "center", marginLeft: "0%", flex: 3, backgroundColor: "#C7DFFA", padding: "1%", marginTop: "2.5%" }}>11.90mm</Text>
                                    <View style={{ marginLeft: "5%", flex: 6, textAlign: "center", display: "flex", flexDirection: "column" }}><Text style={{ flex: 2, marginBottom: "10%", fontSize: "8px" }}>Diámetro exterior</Text>< Text style={{ flex: 1, fontSize: "7px" }}>(OUTSIDE DIAMETER)</Text></View>
                                </View>
                                <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "90%", flexDirection: "row", marginBottom: "4%" }}>
                                    <Text style={{ flex: 1, marginTop: "2.5%" }}>t</Text>
                                    <Text style={{ marginLeft: "2%", flex: 1, marginTop: "2.5%" }}>=</Text>
                                    <View style={{ flex: 2, flexDirection: "column", marginTop: "0.5%" }}>
                                        <Text style={{ textAlign: "center", display: "flex", flexDirection: "row", flex: 1 }}>PD <Text style={{ fontSize: "8px", flex: 1, display: "flex", alignItems: "end" }}>red</Text></Text>
                                        <View style={{ height: "1px", backgroundColor: "black", flex: 1, width: "100%", padding: "1px", marginTop: "26%", marginBottom: "1%" }}></View>
                                        <Text style={{ flex: 1, textAlign: "center" }}>2SFET</Text>
                                    </View>
                                    <Text style={{ marginLeft: "2%", flex: 1, marginTop: "2.5%" }}>=</Text>
                                    <View style={{ marginRight: "3%", flex: 8, display: "flex", flexDirection: "column" }}>
                                        <Text style={{ textAlign: "center", flex: 1 }}>(8.43)   (609.60)</Text>
                                        <View style={{ height: "1px", backgroundColor: "black", flex: 1, width: "100%", padding: "1px", marginTop: "8%", marginBottom: "1%" }}></View>
                                        <Text style={{ flex: 1, textAlign: "center" }}>2 (450.00)  (0.60)  (1.00)  (1.000)</Text>
                                    </View>
                                    <Text style={{ flex: 1, marginTop: "2.5%" }}>=</Text>
                                    <Text style={{ textAlign: "center", marginLeft: "0%", flex: 3, backgroundColor: "#C7DFFA", padding: "1%", marginTop: "2.5%" }}>9.52mm</Text>
                                    <View style={{ marginLeft: "5%", flex: 6, textAlign: "center", display: "flex", flexDirection: "column", fontSize: "9px" }}><Text style={{ flex: 2, marginBottom: "10%", fontSize: "8px" }}>Diámetro de salida reducción</Text>< Text style={{ flex: 1, fontSize: "7px" }}>(REDUCING OUTLET DIAMETER)</Text></View>
                                </View>

                                <Text style={{ display: "flex", justifyContent: "start", alignItems: "center", width: "100%", marginLeft: "10%", marginTop: "2%", marginBottom: "2%" }}>
                                    1.3. Espesor mínimo requerido más corrosión (MINIMUM REQUIRED THICKNESS PLUS CORROSION) (NRF-030-PEMEX-2009 Par. 8.1.6.3).
                                </Text>

                                <View style={{ display: "flex", justifyContent: "start", alignItems: "start", width: "80%", flexDirection:"row", marginRight:"10%", marginBottom:"2%" }}>
                                    <Text style={{flex:1, textAlign: "left", display: "flex", flexDirection: "row" }}>t<Text style={{ fontSize: "8px", display: "flex", alignItems: "end" }}>r</Text></Text>
                                    <Text style={{flex:1 }}>=</Text>
                                    <Text style={{flex:1, display: "flex", flexDirection: "row", marginRight:"3%" }}>t + t<Text style={{ fontSize: "8px", display: "flex" }}>c</Text></Text>
                                    <Text style={{flex:1 }}>=</Text>
                                    <Text style={{flex:3 }}>11.90 + 3.20</Text>
                                    <Text style={{flex:1 }}>=</Text>
                                    <Text style={{flex:3 }}>15.10mm</Text>
                                    <View style={{ marginLeft: "5%", flex: 6, textAlign: "center", display: "flex", flexDirection: "column" }}><Text style={{ flex: 2, marginBottom: "8%", fontSize: "8px" }}>Diámetro exterior</Text>< Text style={{ flex: 1, fontSize: "7px" }}>(OUTSIDE DIAMETER)</Text></View>
                                </View>
                                <View style={{ display: "flex", justifyContent: "start", alignItems: "start", width: "80%", flexDirection:"row", marginRight:"10%", marginTop:"2%" }}>
                                    <Text style={{flex:1, textAlign: "left", display: "flex", flexDirection: "row" }}>t<Text style={{ fontSize: "8px", display: "flex", alignItems: "end" }}>r</Text></Text>
                                    <Text style={{flex:1 }}>=</Text>
                                    <Text style={{flex:1, display: "flex", flexDirection: "row", marginRight:"3%" }}>t + t<Text style={{ fontSize: "8px", display: "flex" }}>c</Text></Text>
                                    <Text style={{flex:1 }}>=</Text>
                                    <Text style={{flex:3 }}>9.52 + 3.20</Text>
                                    <Text style={{flex:1 }}>=</Text>
                                    <Text style={{flex:3 }}>12.72mm</Text>
                                    <View style={{ marginLeft: "5%", flex: 6, textAlign: "center", display: "flex", flexDirection: "column", fontSize: "9px" }}><Text style={{ flex: 2, marginBottom: "8%", fontSize: "8px" }}>Diámetro de salida reducción</Text>< Text style={{ flex: 1, fontSize: "7px" }}>(REDUCING OUTLET DIAMETER)</Text></View>
                                </View>
                            </View>

                        </View>


                        <View style={{ display: "flex", alignContent: "end", justifyItems: "end", border: "solid 0px black", width: "100%", height: "5%", backgroundColor: "white", flexDirection: "column" }}>
                            <View style={{ display: "flex", justifyContent: "end", width: "100%", height: "100%", fontSize: "10px", fontWeight: "bold", flexDirection: "row" }}>
                                <Text style={{ textAlign: "left", display: "flex", justifyContent: "start", height: "100%", width: "50%", paddingLeft: "10%", flex: 1 }}>
                                    SO 4043
                                </Text>
                                <Text style={{ textAlign: "right", display: "flex", flex: 1, justifyContent: "end", height: "100%", width: "50%", paddingRight: "10%" }}>
                                    4
                                </Text>
                            </View>
                        </View>

                    </View>
                </Page> 
                <Page size="A4">
                    <View style={{ display: "flex", alignItems: "center", border: "solid 1.1px black", width: "100%", height: "100%", backgroundColor: "white", padding: "10px", flexDirection: "column" }}>

                        <View style={{ display: "flex", alignItems: "center", border: "solid 0px black", width: "100%", height: "100%", backgroundColor: "white", flexDirection: "column", marginBottom: "5%" }}>


                            <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", flexDirection: "column", fontWeight: "bold", fontSize: "10px", height:"15%" }}>

                                <Text style={{ display: "flex", justifyContent: "start", alignItems: "center", width: "90%", marginLeft: "0%", marginBottom: "4%", fontSize: "8px" }}>
                                    El espesor comercial tcom seleccionado para este accesorio es (COMMERCIAL THICKNESS SELECTED FOR THIS FITIING IS):
                                </Text>

                                <View style={{ display: "flex", justifyContent: "start", alignItems: "center", width: "80%", marginRight: "10%", marginTop: "0%", flexDirection:"row", height:"20%"}}>
                                    <Text style={{ textAlign: "center", display: "flex", flexDirection: "row" }}>t<Text style={{ fontSize: "8px", display: "flex", alignItems: "end" }}>com</Text></Text>
                                    <Text style={{ marginLeft: "2%" }}>=</Text>
                                    <Text style={{ alignItems:"center", height: "100%", backgroundColor: "#C698D5", textAlign: "center", flex:2, paddingTop:"1.2%", marginLeft:"3%" }}>17.48mm</Text>
                                    <Text style={{ textAlign: "right", display: "flex", flexDirection: "row", flex:3 }}>Cédula <Text style={{ fontSize: "8px", display: "flex" }}>(SCH)</Text></Text>
                                    <Text style={{ width: "8%", height: "100%", backgroundColor: "#C698D5", textAlign: "center", paddingTop:"1.2%", marginLeft:"3%" }}>N/A</Text>
                                    <View style={{ marginLeft: "5%", flex: 6, textAlign: "center", display: "flex", flexDirection: "column", alignItems:"center" }}><Text style={{ flex: 2, marginBottom: "8%", fontSize: "8px" }}>Diámetro exterior</Text>< Text style={{ flex: 1, fontSize: "7px", marginBottom:"4%" }}>(OUTSIDE DIAMETER)</Text></View>
                                </View>
                                <View style={{ display: "flex", justifyContent: "start", alignItems: "center", width: "80%", marginRight: "10%", marginTop: "4%", flexDirection:"row", height:"20%"}}>
                                    <Text style={{ textAlign: "center", display: "flex", flexDirection: "row" }}>t<Text style={{ fontSize: "8px", display: "flex", alignItems: "end" }}>com</Text></Text>
                                    <Text style={{ marginLeft: "2%" }}>=</Text>
                                    <Text style={{ alignItems:"center", height: "100%", backgroundColor: "#C698D5", textAlign: "center", flex:2, paddingTop:"1.2%", marginLeft:"3%" }}>14.27mm</Text>
                                    <Text style={{ textAlign: "right", display: "flex", flexDirection: "row", flex:3 }}>Cédula <Text style={{ fontSize: "8px", display: "flex" }}>(SCH)</Text></Text>
                                    <Text style={{ width: "8%", height: "100%", backgroundColor: "#C698D5", textAlign: "center", paddingTop:"1.2%", marginLeft:"3%" }}>30</Text>
                                    <View style={{ marginLeft: "5%", flex: 6, textAlign: "center", display: "flex", flexDirection: "column", alignItems:"center" }}><Text style={{ flex: 2, marginBottom: "8%", fontSize: "8px" }}>Diámetro de salida reducción</Text>< Text style={{ flex: 1, fontSize: "7px", marginBottom:"4%" }}>(REDUCING OUTLET DIAMETER)</Text></View>
                                </View>


                            </View>

                            <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", flexDirection: "column", fontWeight: "bold", marginBottom: "1%", fontSize: "10px" }}>

                                <Text style={{ display: "flex", justifyContent: "start", alignItems: "center", width: "90%", marginLeft: "0%", marginTop: "2%", marginBottom: "2%", fontSize: "8px" }}>
                                    De acuerdo a la NRF-030-PEMEX-2009 Párrafo 8.1.6.3.3 Tabla 5, el % de tolerancia de fabricación es del 10.0%.(ACCORDING TO NRF-030-PEMEX-2009 PARAGRAPH 8.1.6.3.3 TABLE 5, % FABRICATION TOLERANCE IS 10.0%).
                                </Text>

                                <View style={{ display: "flex", justifyContent: "start", alignItems: "center", width: "80%", marginRight: "10%", marginTop: "0%", flexDirection:"row" }}>
                                    <Text style={{ textAlign: "center", display: "flex", flexDirection: "row" }}>t<Text style={{ fontSize: "8px", display: "flex", alignItems: "end" }}>fab</Text></Text>
                                    <Text style={{ marginLeft: "2%", textAlign:"right", flex:1 }}>=</Text>
                                    <Text style={{ textAlign: "right", flex:2, display: "flex", flexDirection: "row" }}>t<Text style={{ fontSize: "8px", display: "flex", alignItems: "end" }}>com</Text></Text>
                                    <Text style={{marginLeft:"1%"}}>-10.0%</Text>
                                    <Text style={{ textAlign: "center", display: "flex", flexDirection: "row", marginLeft: "1%", marginRight: "3%" }}>t<Text style={{ fontSize: "8px", display: "flex", alignItems: "end" }}>com</Text></Text>
                                    <Text style={{ marginLeft: "2%" }}>=</Text>
                                    <Text style={{ marginLeft: "2%", flex:3, textAlign:"center" }}>17.48  -  1.75</Text>
                                    <Text style={{ marginLeft: "2%" }}>=</Text>
                                    <Text style={{ marginLeft: "2%" }}>15.73mm</Text>
                                    <View style={{ marginLeft: "5%", flex: 6, textAlign: "center", display: "flex", flexDirection: "column", alignItems:"center" }}><Text style={{ flex: 2, marginBottom: "8%", fontSize: "8px" }}>Diámetro exterior</Text>< Text style={{ flex: 1, fontSize: "7px", marginBottom:"4%" }}>(OUTSIDE DIAMETER)</Text></View>
                                </View>
                                <View style={{ display: "flex", justifyContent: "start", alignItems: "center", width: "80%", marginRight: "10%", marginTop: "3%", flexDirection:"row" }}>
                                    <Text style={{ textAlign: "center", display: "flex", flexDirection: "row" }}>t<Text style={{ fontSize: "8px", display: "flex", alignItems: "end" }}>fab</Text></Text>
                                    <Text style={{ marginLeft: "2%", textAlign:"right", flex:1 }}>=</Text>
                                    <Text style={{ textAlign: "right", flex:2, display: "flex", flexDirection: "row" }}>t<Text style={{ fontSize: "8px", display: "flex", alignItems: "end" }}>com</Text></Text>
                                    <Text style={{marginLeft:"1%"}}>-10.0%</Text>
                                    <Text style={{ textAlign: "center", display: "flex", flexDirection: "row", marginLeft: "1%", marginRight: "3%" }}>t<Text style={{ fontSize: "8px", display: "flex", alignItems: "end" }}>com</Text></Text>
                                    <Text style={{ marginLeft: "2%" }}>=</Text>
                                    <Text style={{ marginLeft: "2%", flex:3, textAlign:"center" }}>14.27  -  1.43</Text>
                                    <Text style={{ marginLeft: "2%" }}>=</Text>
                                    <Text style={{ marginLeft: "2%" }}>12.84mm</Text>
                                    <View style={{ marginLeft: "5%", flex: 6, textAlign: "center", display: "flex", flexDirection: "column", alignItems:"center" }}><Text style={{ flex: 2, marginBottom: "8%", fontSize: "8px" }}>Diámetro de salida reducción</Text>< Text style={{ flex: 1, fontSize: "7px", marginBottom:"4%" }}>(REDUCING OUTLET DIAMETER)</Text></View>
                                </View>


                            </View>

                            <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", flexDirection: "column", fontWeight: "extrabold", marginBottom: "1%", fontSize: "10px" }}>

                                <Text style={{ display: "flex", justifyContent: "start", alignItems: "center", width: "90%", marginLeft: "0%", marginTop: "2%", marginBottom: "2%", fontSize: "8px" }}>
                                    Por lo que debe cumplirse lo siguiente (THE FOLLOWING RULE SHALL COMPLIES):
                                </Text>

                                <View style={{ display: "flex", justifyContent: "start", alignItems: "center", width: "80%", marginRight: "10%", marginTop: "0%", flexDirection:"row" }}>
                                    <Text style={{ textAlign: "center", display: "flex", flexDirection: "row", marginLeft: "0%", marginRight: "1%" }}>t<Text style={{ fontSize: "8px", display: "flex", alignItems: "end" }}>fab</Text></Text>
                                    <Text>&gt;=</Text>
                                    <Text style={{ textAlign: "center", display: "flex", flexDirection: "row", marginLeft: "1%" }}>t<Text style={{ fontSize: "8px", display: "flex", alignItems: "end" }}>r*</Text></Text>
                                    <Text style={{ marginLeft: "2%", flex:2, textAlign:"center" }}>15.73mm   &gt;=   15.10mm</Text>
                                    <Text style={{ marginLeft: "2%", flex:1 }}>CUMPLE</Text>
                                    <View style={{ flex: 2, textAlign: "center", display: "flex", flexDirection: "column", alignItems:"center" }}><Text style={{ flex: 2, marginBottom: "8%", fontSize: "8px" }}>Diámetro exterior</Text>< Text style={{ flex: 1, fontSize: "7px", marginBottom:"4%" }}>(OUTSIDE DIAMETER)</Text></View>
                                </View>
                                <View style={{ display: "flex", justifyContent: "start", alignItems: "center", width: "80%", marginRight: "10%", marginTop: "3%", flexDirection:"row" }}>
                                    <Text style={{ textAlign: "center", display: "flex", flexDirection: "row", marginLeft: "0%", marginRight: "1%" }}>t<Text style={{ fontSize: "8px", display: "flex", alignItems: "end" }}>fab</Text></Text>
                                    <Text>&gt;=</Text>
                                    <Text style={{ textAlign: "center", display: "flex", flexDirection: "row", marginLeft: "1%" }}>t<Text style={{ fontSize: "8px", display: "flex", alignItems: "end" }}>r*</Text></Text>
                                    <Text style={{ marginLeft: "2%", flex:2, textAlign:"center" }}>12.84mm   &gt;=   12.72mm</Text>
                                    <Text style={{ marginLeft: "2%", flex:1 }}>CUMPLE</Text>
                                    <View style={{ flex: 2, textAlign: "center", display: "flex", flexDirection: "column", alignItems:"center" }}><Text style={{ flex: 2, marginBottom: "8%", fontSize: "8px" }}>Diámetro de salida reducción</Text>< Text style={{ flex: 1, fontSize: "7px", marginBottom:"4%" }}>(REDUCING OUTLET DIAMETER)</Text></View>
                                </View>


                            </View>

                            <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", flexDirection: "column", fontWeight: "bold", marginBottom: "1%", fontSize: "10px" }}>

                                <Text style={{ display: "flex", justifyContent: "start", alignItems: "center", width: "90%", marginLeft: "0%", marginTop: "2%", marginBottom: "2%", fontSize: "10px" }}>
                                    1.4. Presión de trabajo considerando el espesor (WORKING PRESSURE CONSIDERING THICKNESS)
                                </Text>

                                <View style={{ display: "flex", justifyContent: "start", alignItems: "center", width: "100%", marginLeft: "10%", marginTop: "0%", flexDirection:"row" }}>
                                    <Text>P</Text>
                                    <Text style={{ marginLeft: "2%" }}>=</Text>
                                    <View style={{ marginLeft: "2%" }}>
                                        <Text style={{ textAlign: "center", display: "flex", flexDirection: "row", marginLeft: "0%", marginRight: "1%" }}>2ST<Text style={{ fontSize: "8px", display: "flex", alignItems: "end" }}>fab</Text></Text>
                                        <View style={{ height: "1px", backgroundColor: "black", width:"83%" }}></View>
                                        <View style={{ display:"flex", alignItems:"center"}}><Text style={{width:"50%"}}>D</Text> </View>
                                    </View>
                                    <Text style={{ marginLeft: "0%" }}>FET</Text>
                                    <Text style={{ marginLeft: "2%" }}>=</Text>
                                    <View style={{ marginLeft: "2%"}}>
                                        <Text style={{ textAlign: "center" }}>2  (450.00)   (15.73)</Text>
                                        <Text style={{ height: "1px", backgroundColor: "black" }}></Text>
                                        <View style={{ display:"flex", alignItems:"center"}}><Text style={{width:"50%"}}>(762.00)</Text> </View>
                                    </View>
                                    <Text style={{ marginLeft: "2%" }}>(0.60)</Text>
                                    <Text style={{ marginLeft: "2%" }}>(1.00)</Text>
                                    <Text style={{ marginLeft: "2%" }}>(1.000)</Text>
                                    <Text style={{ marginLeft: "2%" }}>=</Text>
                                    <Text style={{ marginLeft: "2%" }}>11.15MPa</Text>
                                    <Text style={{ marginLeft: "2%" }}>=</Text>
                                    <Text style={{ marginLeft: "2%" }}>113.68Kg/cm2</Text>

                                </View>
                                <View style={{ display: "flex", justifyContent: "start", alignItems: "center", width: "100%", marginLeft: "10%", marginTop: "3%", flexDirection:"row" }}>
                                    <Text>P</Text>
                                    <Text style={{ marginLeft: "2%" }}>=</Text>
                                    <View style={{ marginLeft: "2%" }}>
                                        <Text style={{ textAlign: "center", display: "flex", flexDirection: "row", marginLeft: "0%", marginRight: "1%" }}>2ST<Text style={{ fontSize: "8px", display: "flex", alignItems: "end" }}>fab</Text></Text>
                                        <View style={{ height: "1px", backgroundColor: "black", width:"83%" }}></View>
                                        <View style={{ display:"flex", alignItems:"center"}}><Text style={{ textAlign: "center", display: "flex", flexDirection: "row", marginLeft: "0%", marginRight: "1%" }}>D<Text style={{ fontSize: "8px", display: "flex", alignItems: "end" }}>red</Text></Text> </View>
                                    </View>
                                    <Text style={{ marginLeft: "0%" }}>FET</Text>
                                    <Text style={{ marginLeft: "2%" }}>=</Text>
                                    <View style={{ marginLeft: "2%"}}>
                                        <Text style={{ textAlign: "center" }}>2  (450.00)   (12.84)</Text>
                                        <Text style={{ height: "1px", backgroundColor: "black" }}></Text>
                                        <View style={{ display:"flex", alignItems:"center"}}><Text style={{width:"50%"}}>(609.60)</Text> </View>
                                    </View>
                                    <Text style={{ marginLeft: "2%" }}>(0.60)</Text>
                                    <Text style={{ marginLeft: "2%" }}>(1.00)</Text>
                                    <Text style={{ marginLeft: "2%" }}>(1.000)</Text>
                                    <Text style={{ marginLeft: "2%" }}>=</Text>
                                    <Text style={{ marginLeft: "2%" }}>11.38MPa</Text>
                                    <Text style={{ marginLeft: "2%" }}>=</Text>
                                    <Text style={{ marginLeft: "2%" }}>116.01Kg/cm2</Text>

                                </View>


                            </View>

                        </View>


                        <View style={{ display: "flex", alignContent: "end", justifyItems: "end", border: "solid 0px black", width: "100%", height: "5%", backgroundColor: "white", flexDirection: "column" }}>
                            <View style={{ display: "flex", justifyContent: "end", width: "100%", height: "100%", fontSize: "10px", fontWeight: "bold", flexDirection: "row" }}>
                                <Text style={{ textAlign: "left", display: "flex", justifyContent: "start", height: "100%", width: "50%", paddingLeft: "10%", flex: 1 }}>
                                    SO 4043
                                </Text>
                                <Text style={{ textAlign: "right", display: "flex", flex: 1, justifyContent: "end", height: "100%", width: "50%", paddingRight: "10%" }}>
                                    5
                                </Text>
                            </View>
                        </View>

                    </View>
                </Page> 
                <Page size="A4">
                    <View style={{ display: "flex", alignItems: "center", border: "solid 1.1px black", width: "100%", height: "100%", backgroundColor: "white", padding: "10px", flexDirection: "column" }}>

                        <View style={{ display: "flex", alignItems: "center", border: "solid 0px black", width: "100%", height: "99%", backgroundColor: "white", flexDirection: "column" }}>

                            <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "90%", height: "10%", marginBottom: "2%", flexDirection: "row" }}>
                                <View style={{ display: "flex", justifyContent: "end", flex: 1, height: "100%", width: "50%", paddingRight: "10%" }}>
                                    <Image style={{ height: "80%", width: "32%", marginLeft: "20%", marginTop: "4%" }} src={require('../../../utils/img/mpgiaLogoColorLogo.jpg')} />
                                </View>
                                <View style={{ display: "flex", justifyContent: "center", flex: 1, alignItems: "center", height: "100%", width: "50%", paddingLeft: "0%", marginLeft: "10%" }}>
                                    <Image style={{ height: "80%", width: "50%", marginTop: "4%" }} src={require('../../../utils/img/mpgiaSAdeCV.png')} />
                                </View>
                            </View>

                            <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", flexDirection: "column", fontWeight: "bold", marginBottom: "10%", fontSize: "10px" }}>

                                <Text style={{ display: "flex", flex: 1, textAlign: "center", justifyContent: "center", width: "100%", marginBottom: "2%" }}>
                                    CÁLCULOS DE DISEÑO. TEE ESPECIAL DE FLUJO AXIAL

                                </Text>
                                <Text style={{ display: "flex", flex: 1, textAlign: "center", justifyContent: "center", width: "100%", marginBottom: "5%", fontSize: "8px" }}>
                                    (AXIAL FLOW TEE. DESIGN CALCS)

                                </Text>
                                <Text style={{ display: "flex", justifyContent: "start", width: "100%", marginLeft: "10%", marginBottom: "0%" }}>
                                    2. BRIDA EXTREMO DN 750 x 600 (NPS 30 x 24 END FLANGE).
                                </Text>
                                <Text style={{ display: "flex", fontSize: "8px", justifyContent: "start", width: "100%", marginLeft: "10%", marginBottom: "1%" }}>
                                    2.1. DATOS DE DISEÑO (DESIGN DATA).
                                </Text>





                                <View style={{ display: "flex", justifyContent: "start", flexDirection: "column", width: "100%", marginLeft: "10%", fontSize: "8px" }}>

                                    <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "90%", backgroundColor: "#81C1FB", flexDirection: "row", padding: "1%" }}>
                                        <Text style={{ display: "flex", flex: 4, justifyContent: "start", width: "65%" }}>
                                            Material de accesorio (FITTING MATERIAL)
                                        </Text>
                                        <View style={{ display: "flex", flex: 2, justifyContent: "start", width: "40%" }}>
                                            <Text>ASTM A-694-F65</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", width: "90%", backgroundColor: "#f2f2f2", padding: "1%", alignItems: "center" }}>
                                        <Text style={{ display: "flex", flex: 4, justifyContent: "start", width: "65%" }}>
                                            Diámetro exterior (OUTSIDE DIAMETER)
                                        </Text>
                                        <View style={{ display: "flex", flex: 2, flexDirection: "row", justifyContent: "start", width: "40%" }}>
                                            <Text style={{ flex: 1 }}>D</Text>
                                            <Text style={{ flex: 1 }}>=</Text>
                                            <Text style={{ marginLeft: "1%", flex: 4 }}>762.00mm</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: "flex", justifyContent: "center", width: "90%", backgroundColor: "#81C1FB", alignItems: "center", flexDirection: "row", padding: "1%" }}>
                                        <Text style={{ display: "flex", flex: 4, justifyContent: "start", width: "65%" }}>
                                            Diámetro de salida reducción (REDUCING OUTLET DIAMETER)
                                        </Text>
                                        <View style={{ display: "flex", flex: 2, flexDirection: "row", justifyContent: "start", width: "40%" }}>
                                            <Text style={{ flex: 1 }}>Dred</Text>
                                            <Text style={{ marginLeft: "0%", flex: 1 }}>=</Text>
                                            <Text style={{ marginLeft: "0%", flex: 4 }}>609.60mm</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: "flex", justifyContent: "center", width: "90%", backgroundColor: "#f2f2f2", padding: "1%", alignItems: "center", flexDirection: "row" }}>
                                        <Text style={{ display: "flex", flex: 4, justifyContent: "start", width: "65%" }}>
                                            Presión de diseño (DESIGN PRESSURE)
                                        </Text>
                                        <View style={{ display: "flex", flex: 2, flexDirection: "row", justifyContent: "start", width: "40%" }}>
                                            <Text style={{ flex: 2 }}>P</Text>
                                            <Text style={{ marginLeft: "0%", flex: 2 }}>=</Text>
                                            <Text style={{ marginLeft: "0%", flex: 4 }}>86.00kg/cm2</Text>
                                            <Text style={{ marginLeft: "0%", flex: 1 }}>=</Text>
                                            <Text style={{ marginLeft: "0%", flex: 3 }}>8.43MPa</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: "flex", justifyContent: "center", width: "90%", backgroundColor: "#81C1FB", alignItems: "center", padding: "1%", flexDirection: "row" }}>
                                        <Text style={{ display: "flex", flex: 4, justifyContent: "start", width: "65%" }}>
                                            Temperatura de diseño (DESIGN TEMPERATURE)
                                        </Text>
                                        <View style={{ display: "flex", flex: 2, flexDirection: "row", justifyContent: "start", width: "40%" }}>
                                            <Text style={{ flex: 1 }}>T</Text>
                                            <Text style={{ marginLeft: "0%", flex: 1 }}>=</Text>
                                            <Text style={{ marginLeft: "0%", flex: 4 }}>100.00°C</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: "flex", justifyContent: "center", width: "90%", backgroundColor: "#f2f2f2", padding: "1%", alignItems: "center", flexDirection: "row" }}>
                                        <Text style={{ display: "flex", flex: 4, justifyContent: "start", width: "65%" }}>
                                            Corrosión permisible (CORROSION ALLOWANCE)
                                        </Text>
                                        <View style={{ display: "flex", flexDirection: "row", flex: 2, justifyContent: "start", width: "40%" }}>
                                            <Text style={{ flex: 1 }}>C</Text>
                                            <Text style={{ marginLeft: "0%", flex: 1 }}>=</Text>
                                            <Text style={{ marginLeft: "0%", flex: 4 }}>3.20mm</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: "flex", justifyContent: "center", width: "90%", backgroundColor: "#81C1FB", padding: "1%", alignItems: "center", flexDirection: "row" }}>
                                        <Text style={{ display: "flex", flex: 5, justifyContent: "start", width: "65%", paddingRight: "0%" }}>
                                            ASTM A-694 Ed. 2016 Tabla (TABLE) 1 Pág. 2
                                        </Text>
                                        <View style={{ flex: 1 }}></View>
                                        <View style={{ display: "flex", flex: 3, flexDirection: "row", justifyContent: "start", width: "40%", marginLeft: "0%" }}>
                                            <Text style={{ flex: 1 }}>S</Text>
                                            <Text style={{ marginLeft: "0%", flex: 1 }}>=</Text>
                                            <Text style={{ marginLeft: "0%", flex: 4 }}>450.00MPa</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: "flex", justifyContent: "center", width: "90%", backgroundColor: "#f2f2f2", padding: "1%", alignItems: "center", flexDirection: "row" }}>
                                        <Text style={{ display: "flex", flex: 5, justifyContent: "start", width: "65%" }}>
                                            Factor de diseño (Clase de ubicación 2) [DESIGN FACTOR (LOCATION CLASS 2)] B31.8 Ed. 2020 Tabla (TABLE) 841.1.6-1 Pág. 41
                                        </Text>
                                        <View style={{ flex: 1 }}></View>
                                        <View style={{ display: "flex", flex: 3, flexDirection: "row", justifyContent: "start", width: "40%" }}>
                                            <Text style={{ flex: 1 }}>F</Text>
                                            <Text style={{ marginLeft: "0%", flex: 1 }}>=</Text>
                                            <Text style={{ marginLeft: "0%", flex: 4 }}>0.60</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: "flex", justifyContent: "center", width: "90%", backgroundColor: "#81C1FB", padding: "1%", alignItems: "center", flexDirection: "row" }}>
                                        <Text style={{ display: "flex", flex: 4, justifyContent: "start", width: "65%" }}>
                                            Factor de junta longitudinal (LONGITUDINAL JOINT FACTOR) B31.8 Ed. 2020 Tabla (TABLE) 841.1.7-1 Pág. 43
                                        </Text>
                                        <View style={{ display: "flex", flex: 2, flexDirection: "row", justifyContent: "start", width: "40%" }}>
                                            <Text style={{ flex: 1 }}>E</Text>
                                            <Text style={{ marginLeft: "0%", flex: 1 }}>=</Text>
                                            <Text style={{ marginLeft: "0%", flex: 4 }}>1.00</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: "flex", justifyContent: "center", width: "90%", backgroundColor: "#f2f2f2", padding: "1%", alignItems: "center", flexDirection: "row" }}>
                                        <Text style={{ display: "flex", flex: 4, justifyContent: "start", width: "65%" }}>
                                            Factor de temperatura derating (TEMPERATURE DERATING FACTOR) B31.8 Ed. 2020 Tabla (TABLE) 841.1.8-1 Pág. 43
                                        </Text>
                                        <View style={{ display: "flex", flex: 2, flexDirection: "row", justifyContent: "start", width: "40%" }}>
                                            <Text style={{ flex: 1 }}>T</Text>
                                            <Text style={{ marginLeft: "0%", flex: 1 }}>=</Text>
                                            <Text style={{ marginLeft: "0%", flex: 4 }}>1.000</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: "flex", justifyContent: "center", width: "90%", backgroundColor: "#81C1FB", padding: "1%", alignItems: "center", flexDirection: "row" }}>
                                        <Text style={{ display: "flex", flex: 4, justifyContent: "start", width: "65%" }}>
                                            Espesor de diseño (DESIGN THICKNESS)
                                        </Text>
                                        <View style={{ display: "flex", flex: 2, flexDirection: "row", justifyContent: "start", width: "40%" }}>
                                            <Text style={{ flex: 1 }}></Text>
                                            <Text style={{ marginLeft: "10%", flex: 1 }}></Text>
                                            <Text style={{ marginLeft: "10%", flex: 1 }}></Text>
                                            <Text style={{ flex: 1 }}></Text>
                                        </View>
                                    </View>
                                    <View style={{ display: "flex", justifyContent: "center", width: "90%", backgroundColor: "#f2f2f2", padding: "1%", alignItems: "center", flexDirection: "row" }}>
                                        <Text style={{ display: "flex", flex: 4, justifyContent: "start", width: "65%" }}>
                                            Espesor mínimo requerido (MINIMUM REQUIRED THICKNESS)
                                        </Text>
                                        <View style={{ display: "flex", flex: 2, flexDirection: "row", justifyContent: "start", width: "40%" }}>
                                            <Text style={{ flex: 1 }}></Text>
                                            <Text style={{ marginLeft: "10%", flex: 1 }}></Text>
                                            <Text style={{ marginLeft: "10%", flex: 1 }}></Text>
                                            <Text style={{ flex: 1 }}></Text>
                                        </View>
                                    </View>
                                    <View style={{ display: "flex", justifyContent: "center", width: "90%", backgroundColor: "#81C1FB", padding: "1%", alignItems: "center", flexDirection: "row" }}>
                                        <Text style={{ display: "flex", flex: 4, justifyContent: "start", width: "65%" }}>
                                            Espesor de pared adicional por corrosión (ADDITIONAL WALL THICKNESS PER CORROSION)
                                        </Text>
                                        <View style={{ display: "flex", flex: 2, flexDirection: "row", justifyContent: "start", width: "40%" }}>
                                            <Text style={{ flex: 1 }}></Text>
                                            <Text style={{ marginLeft: "10%", flex: 1 }}></Text>
                                            <Text style={{ marginLeft: "10%", flex: 1 }}></Text>
                                            <Text style={{ flex: 1 }}></Text>
                                        </View>
                                    </View>


                                </View>




                                <Text style={{ display: "flex", justifyContent: "start", alignItems: "center", width: "100%", marginLeft: "10%", marginTop: "2%", marginBottom: "1%" }}>
                                    2.2. Espesor de tubería bajo presión interna
                                    <Text style={{ fontSize: "7px", alignItems: "center" }}>(PIPELINE THICKNESS UNDER INTERNAL PRESSURE) (B31.8 Par. 841.1.1).</Text>
                                </Text>
                                <Text style={{ display: "flex", justifyContent: "start", width: "100%", marginLeft: "10%", paddingRight: "5%", fontSize: "8px" }}>
                                    El estándar ASME B31.8 en el párrafo 831.3.6(c) establece que deben realizarse cálculos de ingeniería para calcular el espesor de otros
                                    componentes de retención de presión, por lo que la fórmula para cálculo de espesor para tubería puede ser usada.
                                </Text>
                                <Text style={{ display: "flex", justifyContent: "start", width: "100%", marginLeft: "10%", marginBottom: "3%", fontSize: "6px", paddingRight: "5%" }}>
                                    (ASME STANDARD B31.8 PAR. 831.3.6(c) ADDRESS THAT ENGINEERING CALCULATIONS SHALL BE PERFORMED TO CALCULATE THE THICKNESS FOR OTHER PRESSURE CONTAINING COMPONENTS, SO WHICH
                                    THE FORMULA TO CALCULATE PIPELINE THICKNESS SHALL BE USED).
                                </Text>

                                <View style={{ display: "flex", justifyContent: "start", alignItems: "center", width: "90%", flexDirection: "row", marginBottom: "4%" }}>
                                    <Text style={{ flex: 1, marginTop: "2.5%" }}>t</Text>
                                    <Text style={{ marginLeft: "2%", flex: 1, marginTop: "2.5%" }}>=</Text>
                                    <View style={{ marginRight: "0%", flex: 2, flexDirection: "column", marginTop: "0.5%" }}>
                                        <Text style={{ textAlign: "center", flex: 1 }}>PD</Text>
                                        <View style={{ height: "1px", backgroundColor: "black", flex: 1, width: "100%", padding: "1px", marginTop: "30%", marginBottom: "1%" }}></View>
                                        <Text style={{ flex: 1, textAlign: "center" }}>2SFET</Text>
                                    </View>
                                    <Text style={{ marginLeft: "2%", flex: 1, marginTop: "2.5%" }}>=</Text>
                                    <View style={{ marginRight: "3%", flex: 8, display: "flex", flexDirection: "column" }}>
                                        <Text style={{ textAlign: "center", flex: 1 }}>(8.43)   (762.00)</Text>
                                        <View style={{ height: "1px", backgroundColor: "black", flex: 1, width: "100%", padding: "1px", marginTop: "9%", marginBottom: "1%" }}></View>
                                        <Text style={{ flex: 1, textAlign: "center" }}>2 (450.00)  (0.60)  (1.00)  (1.000)</Text>
                                    </View>
                                    <Text style={{ marginLeft: "0%", flex: 1, marginTop: "2.5%" }}>=</Text>
                                    <Text style={{ textAlign: "center", marginLeft: "0%", flex: 3, backgroundColor: "#C7DFFA", padding: "1%", marginTop: "2.5%" }}>11.90mm</Text>
                                    <View style={{ marginLeft: "5%", flex: 8, textAlign: "center", display: "flex", flexDirection: "column" }}><Text style={{ flex: 2, marginBottom: "10%", fontSize: "8px" }}>Diámetro exterior componente</Text>< Text style={{ flex: 1, fontSize: "7px" }}>(COMPONENT OUTSIDE DIAMETER)</Text></View>
                                </View>
                                <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "90%", flexDirection: "row", marginBottom: "4%" }}>
                                    <Text style={{ flex: 1, marginTop: "2.5%" }}>t</Text>
                                    <Text style={{ marginLeft: "2%", flex: 1, marginTop: "2.5%" }}>=</Text>
                                    <View style={{ flex: 2, flexDirection: "column", marginTop: "0.5%" }}>
                                        <Text style={{ textAlign: "center", display: "flex", flexDirection: "row", flex: 1 }}>PD <Text style={{ fontSize: "8px", flex: 1, display: "flex", alignItems: "end" }}>tub</Text></Text>
                                        <View style={{ height: "1px", backgroundColor: "black", flex: 1, width: "100%", padding: "1px", marginTop: "30%", marginBottom: "1%" }}></View>
                                        <Text style={{ flex: 1, textAlign: "center" }}>2SFET</Text>
                                    </View>
                                    <Text style={{ marginLeft: "2%", flex: 1, marginTop: "2.5%" }}>=</Text>
                                    <View style={{ marginRight: "3%", flex: 8, display: "flex", flexDirection: "column" }}>
                                        <Text style={{ textAlign: "center", flex: 1 }}>(8.43)   (609.60)</Text>
                                        <View style={{ height: "1px", backgroundColor: "black", flex: 1, width: "100%", padding: "1px", marginTop: "9%", marginBottom: "1%" }}></View>
                                        <Text style={{ flex: 1, textAlign: "center" }}>2 (450.00)  (0.60)  (1.00)  (1.000)</Text>
                                    </View>
                                    <Text style={{ flex: 1, marginTop: "2.5%" }}>=</Text>
                                    <Text style={{ textAlign: "center", marginLeft: "0%", flex: 3, backgroundColor: "#C7DFFA", padding: "1%", marginTop: "2.5%" }}>9.52mm</Text>
                                    <View style={{ marginLeft: "5%", flex: 8, textAlign: "center", display: "flex", flexDirection: "column", fontSize: "9px" }}><Text style={{ flex: 2, marginBottom: "10%", fontSize: "8px" }}>Diámetro exterior tubería de proceso</Text>< Text style={{ flex: 1, fontSize: "7px" }}>(PROCESS PIPELINE OUTSIDE DIAMETER)</Text></View>
                                </View>

                                <Text style={{ display: "flex", justifyContent: "start", alignItems: "center", width: "90%", marginTop: "2%", marginBottom: "2%" }}>
                                    2.3. Espesor mínimo requerido más corrosión (MINIMUM REQUIRED THICKNESS PLUS CORROSION) (NRF-030-PEMEX-2009 Par. 8.1.6.3).
                                </Text>

                                <View style={{ display: "flex", justifyContent: "start", alignItems: "start", width: "80%", flexDirection: "row", marginRight: "10%", marginBottom: "2%" }}>
                                    <Text style={{ flex: 1, textAlign: "left", display: "flex", flexDirection: "row" }}>t<Text style={{ fontSize: "8px", display: "flex", alignItems: "end" }}>r</Text></Text>
                                    <Text style={{ flex: 1 }}>=</Text>
                                    <Text style={{ flex: 1, display: "flex", flexDirection: "row", marginRight: "3%" }}>t + t<Text style={{ fontSize: "8px", display: "flex" }}>c</Text></Text>
                                    <Text style={{ flex: 1 }}>=</Text>
                                    <Text style={{ flex: 3 }}>11.90 + 3.20</Text>
                                    <Text style={{ flex: 1 }}>=</Text>
                                    <Text style={{ flex: 3 }}>15.10mm</Text>
                                    <View style={{ marginLeft: "5%", flex: 6, textAlign: "center", display: "flex", flexDirection: "column" }}><Text style={{ flex: 2, marginBottom: "8%", fontSize: "8px" }}>Diámetro exterior componente</Text>< Text style={{ flex: 1, fontSize: "7px" }}>(COMPONENT OUTSIDE DIAMETER)</Text></View>
                                </View>
                                <View style={{ display: "flex", justifyContent: "start", alignItems: "start", width: "80%", flexDirection: "row", marginRight: "10%", marginTop: "2%" }}>
                                    <Text style={{ flex: 1, textAlign: "left", display: "flex", flexDirection: "row" }}>t<Text style={{ fontSize: "8px", display: "flex", alignItems: "end" }}>r</Text></Text>
                                    <Text style={{ flex: 1 }}>=</Text>
                                    <Text style={{ flex: 1, display: "flex", flexDirection: "row", marginRight: "3%" }}>t + t<Text style={{ fontSize: "8px", display: "flex" }}>c</Text></Text>
                                    <Text style={{ flex: 1 }}>=</Text>
                                    <Text style={{ flex: 3 }}>9.52 + 3.20</Text>
                                    <Text style={{ flex: 1 }}>=</Text>
                                    <Text style={{ flex: 3 }}>12.72mm</Text>
                                    <View style={{ marginLeft: "5%", flex: 6, textAlign: "center", display: "flex", flexDirection: "column", fontSize: "9px" }}><Text style={{ flex: 2, marginBottom: "8%", fontSize: "8px" }}>Diámetro ext. tubería de proceso</Text>< Text style={{ flex: 1, fontSize: "7px" }}>(PROCESS PIUPELINE OUTSIDE DIAMETER)</Text></View>
                                </View>
                            </View>

                        </View>


                        <View style={{ display: "flex", alignContent: "end", justifyItems: "end", border: "solid 0px black", width: "100%", height: "5%", backgroundColor: "white", flexDirection: "column" }}>
                            <View style={{ display: "flex", justifyContent: "end", width: "100%", height: "100%", fontSize: "10px", fontWeight: "bold", flexDirection: "row" }}>
                                <Text style={{ textAlign: "left", display: "flex", justifyContent: "start", height: "100%", width: "50%", paddingLeft: "10%", flex: 1 }}>
                                    SO 4043
                                </Text>
                                <Text style={{ textAlign: "right", display: "flex", flex: 1, justifyContent: "end", height: "100%", width: "50%", paddingRight: "10%" }}>
                                    6
                                </Text>
                            </View>
                        </View>

                    </View>
                </Page>
                <Page size="A4">
                    <View style={{ display: "flex", alignItems: "center", border: "solid 1.1px black", width: "100%", height: "100%", backgroundColor: "white", padding: "10px", flexDirection: "column" }}>

                        <View style={{ display: "flex", alignItems: "center", border: "solid 0px black", width: "100%", height: "100%", backgroundColor: "white", flexDirection: "column", marginBottom: "5%" }}>


                            <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", flexDirection: "column", fontWeight: "bold", fontSize: "10px", height: "15%" }}>

                                <Text style={{ display: "flex", justifyContent: "start", alignItems: "center", width: "90%", marginLeft: "0%", marginBottom: "4%", fontSize: "8px" }}>
                                    El espesor comercial tcom seleccionado para este accesorio es (COMMERCIAL THICKNESS SELECTED FOR THIS FITIING IS):
                                </Text>

                                <View style={{ display: "flex", justifyContent: "start", alignItems: "center", width: "80%", marginRight: "10%", marginTop: "0%", flexDirection: "row", height: "20%" }}>
                                    <Text style={{ textAlign: "center", display: "flex", flexDirection: "row" }}>t<Text style={{ fontSize: "8px", display: "flex", alignItems: "end" }}>com</Text></Text>
                                    <Text style={{ marginLeft: "2%" }}>=</Text>
                                    <Text style={{ alignItems: "center", height: "100%", backgroundColor: "#C698D5", textAlign: "center", flex: 2, paddingTop: "1.2%", marginLeft: "3%" }}>17.48mm</Text>
                                    <Text style={{ textAlign: "right", display: "flex", flexDirection: "row", flex: 3 }}>Cédula <Text style={{ fontSize: "8px", display: "flex" }}>(SCH)</Text></Text>
                                    <Text style={{ width: "8%", height: "100%", backgroundColor: "#C698D5", textAlign: "center", paddingTop: "1.2%", marginLeft: "3%" }}>N/A</Text>
                                    <View style={{ marginLeft: "5%", flex: 6, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}><Text style={{ flex: 2, marginBottom: "8%", fontSize: "8px" }}>Diámetro exterior componente</Text>< Text style={{ flex: 1, fontSize: "7px", marginBottom: "4%" }}>(COMPONENT OUTSIDE DIAMETER)</Text></View>
                                </View>
                                <View style={{ display: "flex", justifyContent: "start", alignItems: "center", width: "80%", marginRight: "10%", marginTop: "4%", flexDirection: "row", height: "20%" }}>
                                    <Text style={{ textAlign: "center", display: "flex", flexDirection: "row" }}>t<Text style={{ fontSize: "8px", display: "flex", alignItems: "end" }}>com</Text></Text>
                                    <Text style={{ marginLeft: "2%" }}>=</Text>
                                    <Text style={{ alignItems: "center", height: "100%", backgroundColor: "#C698D5", textAlign: "center", flex: 2, paddingTop: "1.2%", marginLeft: "3%" }}>14.27mm</Text>
                                    <Text style={{ textAlign: "right", display: "flex", flexDirection: "row", flex: 3 }}>Cédula <Text style={{ fontSize: "8px", display: "flex" }}>(SCH)</Text></Text>
                                    <Text style={{ width: "8%", height: "100%", backgroundColor: "#C698D5", textAlign: "center", paddingTop: "1.2%", marginLeft: "3%" }}>N/A</Text>
                                    <View style={{ marginLeft: "5%", flex: 6, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}><Text style={{ flex: 2, marginBottom: "8%", fontSize: "8px" }}>Diámetro ext. tubería de proceso</Text>< Text style={{ flex: 1, fontSize: "7px", marginBottom: "4%" }}>(PROCESS PIUPELINE OUTSIDE DIAMETER)</Text></View>
                                </View>


                            </View>

                            <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", flexDirection: "column", fontWeight: "bold", marginBottom: "1%", fontSize: "10px" }}>

                                <Text style={{ display: "flex", justifyContent: "start", alignItems: "center", width: "90%", marginLeft: "0%", marginTop: "2%", marginBottom: "2%", fontSize: "8px" }}>
                                    De acuerdo a la NRF-030-PEMEX-2009 Párrafo 8.1.6.3.3 Tabla 5, el % de tolerancia de fabricación es del 10.0%.(ACCORDING TO NRF-030-PEMEX-2009 PARAGRAPH 8.1.6.3.3 TABLE 5, % FABRICATION TOLERANCE IS 10.0%).
                                </Text>

                                <View style={{ display: "flex", justifyContent: "start", alignItems: "center", width: "80%", marginRight: "10%", marginTop: "0%", flexDirection: "row" }}>
                                    <Text style={{ textAlign: "center", display: "flex", flexDirection: "row" }}>t<Text style={{ fontSize: "8px", display: "flex", alignItems: "end" }}>fab</Text></Text>
                                    <Text style={{ marginLeft: "2%", textAlign: "right", flex: 1 }}>=</Text>
                                    <Text style={{ textAlign: "right", flex: 2, display: "flex", flexDirection: "row" }}>t<Text style={{ fontSize: "8px", display: "flex", alignItems: "end" }}>com</Text></Text>
                                    <Text style={{ marginLeft: "1%" }}>-10.0%</Text>
                                    <Text style={{ textAlign: "center", display: "flex", flexDirection: "row", marginLeft: "1%", marginRight: "3%" }}>t<Text style={{ fontSize: "8px", display: "flex", alignItems: "end" }}>com</Text></Text>
                                    <Text style={{ marginLeft: "2%" }}>=</Text>
                                    <Text style={{ marginLeft: "2%", flex: 3, textAlign: "center" }}>17.48  -  1.75</Text>
                                    <Text style={{ marginLeft: "2%" }}>=</Text>
                                    <Text style={{ marginLeft: "2%" }}>15.73mm</Text>
                                    <View style={{ marginLeft: "5%", flex: 6, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}><Text style={{ flex: 2, marginBottom: "8%", fontSize: "8px" }}>Diámetro exterior componente</Text>< Text style={{ flex: 1, fontSize: "7px", marginBottom: "4%" }}>(COMPONENT OUTSIDE DIAMETER)</Text></View>
                                </View>
                                <View style={{ display: "flex", justifyContent: "start", alignItems: "center", width: "80%", marginRight: "10%", marginTop: "3%", flexDirection: "row" }}>
                                    <Text style={{ textAlign: "center", display: "flex", flexDirection: "row" }}>t<Text style={{ fontSize: "8px", display: "flex", alignItems: "end" }}>fab</Text></Text>
                                    <Text style={{ marginLeft: "2%", textAlign: "right", flex: 1 }}>=</Text>
                                    <Text style={{ textAlign: "right", flex: 2, display: "flex", flexDirection: "row" }}>t<Text style={{ fontSize: "8px", display: "flex", alignItems: "end" }}>com</Text></Text>
                                    <Text style={{ marginLeft: "1%" }}>-10.0%</Text>
                                    <Text style={{ textAlign: "center", display: "flex", flexDirection: "row", marginLeft: "1%", marginRight: "3%" }}>t<Text style={{ fontSize: "8px", display: "flex", alignItems: "end" }}>com</Text></Text>
                                    <Text style={{ marginLeft: "2%" }}>=</Text>
                                    <Text style={{ marginLeft: "2%", flex: 3, textAlign: "center" }}>14.27  -  1.43</Text>
                                    <Text style={{ marginLeft: "2%" }}>=</Text>
                                    <Text style={{ marginLeft: "2%" }}>12.84mm</Text>
                                    <View style={{ marginLeft: "5%", flex: 6, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}><Text style={{ flex: 2, marginBottom: "8%", fontSize: "8px" }}>Diámetro ext. Tubería de proceso</Text>< Text style={{ flex: 1, fontSize: "7px", marginBottom: "4%" }}>(PROCESS PIPELINE OUTSIDE DIAMETER)</Text></View>
                                </View>


                            </View>

                            <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", flexDirection: "column", fontWeight: "extrabold", marginBottom: "1%", fontSize: "10px" }}>

                                <Text style={{ display: "flex", justifyContent: "start", alignItems: "center", width: "90%", marginLeft: "0%", marginTop: "2%", marginBottom: "2%", fontSize: "8px" }}>
                                    Por lo que debe cumplirse lo siguiente (THE FOLLOWING RULE SHALL COMPLIES):
                                </Text>

                                <View style={{ display: "flex", justifyContent: "start", alignItems: "center", width: "80%", marginRight: "10%", marginTop: "0%", flexDirection: "row" }}>
                                    <Text style={{ textAlign: "center", display: "flex", flexDirection: "row", marginLeft: "0%", marginRight: "1%" }}>t<Text style={{ fontSize: "8px", display: "flex", alignItems: "end" }}>fab</Text></Text>
                                    <Text>&gt;=</Text>
                                    <Text style={{ textAlign: "center", display: "flex", flexDirection: "row", marginLeft: "1%" }}>t<Text style={{ fontSize: "8px", display: "flex", alignItems: "end" }}>r*</Text></Text>
                                    <Text style={{ marginLeft: "2%", flex: 2, textAlign: "center" }}>15.73mm   &gt;=   15.10mm</Text>
                                    <Text style={{ marginLeft: "2%", flex: 1 }}>CUMPLE</Text>
                                    <View style={{ flex: 2, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}><Text style={{ flex: 2, marginBottom: "8%", fontSize: "8px" }}>Diámetro exterior componente</Text>< Text style={{ flex: 1, fontSize: "7px", marginBottom: "4%" }}>(COMPONENT OUTSIDE DIAMETER)</Text></View>
                                </View>
                                <View style={{ display: "flex", justifyContent: "start", alignItems: "center", width: "80%", marginRight: "10%", marginTop: "3%", flexDirection: "row" }}>
                                    <Text style={{ textAlign: "center", display: "flex", flexDirection: "row", marginLeft: "0%", marginRight: "1%" }}>t<Text style={{ fontSize: "8px", display: "flex", alignItems: "end" }}>fab</Text></Text>
                                    <Text>&gt;=</Text>
                                    <Text style={{ textAlign: "center", display: "flex", flexDirection: "row", marginLeft: "1%" }}>t<Text style={{ fontSize: "8px", display: "flex", alignItems: "end" }}>r*</Text></Text>
                                    <Text style={{ marginLeft: "2%", flex: 2, textAlign: "center" }}>12.84mm   &gt;=   12.72mm</Text>
                                    <Text style={{ marginLeft: "2%", flex: 1 }}>CUMPLE</Text>
                                    <View style={{ flex: 2, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}><Text style={{ flex: 2, marginBottom: "8%", fontSize: "8px" }}>Diámetro ext. Tubería de proceso</Text>< Text style={{ flex: 1, fontSize: "7px", marginBottom: "4%" }}>(PROCESS PIPELINE OUTSIDE DIAMETER)</Text></View>
                                </View>


                            </View>

                            <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", flexDirection: "column", fontWeight: "bold", marginBottom: "1%", fontSize: "10px" }}>

                                <Text style={{ display: "flex", justifyContent: "start", alignItems: "center", width: "90%", marginLeft: "0%", marginTop: "2%", marginBottom: "2%", fontSize: "10px" }}>
                                    2.4. Presión de trabajo considerando el espesor (WORKING PRESSURE CONSIDERING THICKNESS)
                                </Text>

                                <View style={{ display: "flex", justifyContent: "start", alignItems: "center", width: "100%", marginLeft: "10%", marginTop: "0%", flexDirection: "row" }}>
                                    <Text>P</Text>
                                    <Text style={{ marginLeft: "2%" }}>=</Text>
                                    <View style={{ marginLeft: "2%" }}>
                                        <Text style={{ textAlign: "center", display: "flex", flexDirection: "row", marginLeft: "0%", marginRight: "1%" }}>2ST<Text style={{ fontSize: "8px", display: "flex", alignItems: "end" }}>fab</Text></Text>
                                        <View style={{ height: "1px", backgroundColor: "black", width: "83%" }}></View>
                                        <View style={{ display: "flex", alignItems: "center" }}><Text style={{ width: "50%" }}>D</Text> </View>
                                    </View>
                                    <Text style={{ marginLeft: "0%" }}>FET</Text>
                                    <Text style={{ marginLeft: "2%" }}>=</Text>
                                    <View style={{ marginLeft: "2%" }}>
                                        <Text style={{ textAlign: "center" }}>2  (450.00)   (15.73)</Text>
                                        <Text style={{ height: "1px", backgroundColor: "black" }}></Text>
                                        <View style={{ display: "flex", alignItems: "center" }}><Text style={{ width: "50%" }}>(762.00)</Text> </View>
                                    </View>
                                    <Text style={{ marginLeft: "2%" }}>(0.60)</Text>
                                    <Text style={{ marginLeft: "2%" }}>(1.00)</Text>
                                    <Text style={{ marginLeft: "2%" }}>(1.000)</Text>
                                    <Text style={{ marginLeft: "2%" }}>=</Text>
                                    <Text style={{ marginLeft: "2%" }}>11.15MPa</Text>
                                    <Text style={{ marginLeft: "2%" }}>=</Text>
                                    <Text style={{ marginLeft: "2%" }}>113.68Kg/cm2</Text>

                                </View>
                                <View style={{ display: "flex", justifyContent: "start", alignItems: "center", width: "100%", marginLeft: "10%", marginTop: "3%", flexDirection: "row" }}>
                                    <Text>P</Text>
                                    <Text style={{ marginLeft: "2%" }}>=</Text>
                                    <View style={{ marginLeft: "2%" }}>
                                        <Text style={{ textAlign: "center", display: "flex", flexDirection: "row", marginLeft: "0%", marginRight: "1%" }}>2ST<Text style={{ fontSize: "8px", display: "flex", alignItems: "end" }}>fab</Text></Text>
                                        <View style={{ height: "1px", backgroundColor: "black", width: "83%" }}></View>
                                        <View style={{ display: "flex", alignItems: "center" }}><Text style={{ textAlign: "center", display: "flex", flexDirection: "row", marginLeft: "0%", marginRight: "1%" }}>D<Text style={{ fontSize: "8px", display: "flex", alignItems: "end" }}>tub</Text></Text> </View>
                                    </View>
                                    <Text style={{ marginLeft: "0%" }}>FET</Text>
                                    <Text style={{ marginLeft: "2%" }}>=</Text>
                                    <View style={{ marginLeft: "2%" }}>
                                        <Text style={{ textAlign: "center" }}>2  (450.00)   (12.84)</Text>
                                        <Text style={{ height: "1px", backgroundColor: "black" }}></Text>
                                        <View style={{ display: "flex", alignItems: "center" }}><Text style={{ width: "50%" }}>(609.60)</Text> </View>
                                    </View>
                                    <Text style={{ marginLeft: "2%" }}>(0.60)</Text>
                                    <Text style={{ marginLeft: "2%" }}>(1.00)</Text>
                                    <Text style={{ marginLeft: "2%" }}>(1.000)</Text>
                                    <Text style={{ marginLeft: "2%" }}>=</Text>
                                    <Text style={{ marginLeft: "2%" }}>11.38MPa</Text>
                                    <Text style={{ marginLeft: "2%" }}>=</Text>
                                    <Text style={{ marginLeft: "2%" }}>116.01Kg/cm2</Text>

                                </View>


                            </View>

                        </View>


                        <View style={{ display: "flex", alignContent: "end", justifyItems: "end", border: "solid 0px black", width: "100%", height: "5%", backgroundColor: "white", flexDirection: "column" }}>
                            <View style={{ display: "flex", justifyContent: "end", width: "100%", height: "100%", fontSize: "10px", fontWeight: "bold", flexDirection: "row" }}>
                                <Text style={{ textAlign: "left", display: "flex", justifyContent: "start", height: "100%", width: "50%", paddingLeft: "10%", flex: 1 }}>
                                    SO 4043
                                </Text>
                                <Text style={{ textAlign: "right", display: "flex", flex: 1, justifyContent: "end", height: "100%", width: "50%", paddingRight: "10%" }}>
                                    7
                                </Text>
                            </View>
                        </View>

                    </View>
                </Page>
                <Page size="A4">
                    <View style={{ display: "flex", alignItems: "center", border: "solid 1.1px black", width: "100%", height: "100%", backgroundColor: "white", padding: "10px", flexDirection: "column" }}>

                        <View style={{ display: "flex", alignItems: "center", border: "solid 0px black", width: "100%", height: "99%", backgroundColor: "white", flexDirection: "column" }}>

                            <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "90%", height: "10%", marginBottom: "2%", flexDirection: "row" }}>
                                <View style={{ display: "flex", justifyContent: "end", flex: 1, height: "100%", width: "50%", paddingRight: "10%" }}>
                                    <Image style={{ height: "80%", width: "32%", marginLeft: "20%", marginTop: "4%" }} src={require('../../../utils/img/mpgiaLogoColorLogo.jpg')} />
                                </View>
                                <View style={{ display: "flex", justifyContent: "center", flex: 1, alignItems: "center", height: "100%", width: "50%", paddingLeft: "0%", marginLeft: "10%" }}>
                                    <Image style={{ height: "80%", width: "50%", marginTop: "4%" }} src={require('../../../utils/img/mpgiaSAdeCV.png')} />
                                </View>
                            </View>

                            <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", flexDirection: "column", fontWeight: "bold", marginBottom: "10%", fontSize: "10px" }}>

                                <Text style={{ display: "flex", flex: 1, textAlign: "center", justifyContent: "center", width: "100%", marginBottom: "2%" }}>
                                    CÁLCULOS DE DISEÑO. TEE ESPECIAL DE FLUJO AXIAL

                                </Text>
                                <Text style={{ display: "flex", flex: 1, textAlign: "center", justifyContent: "center", width: "100%", marginBottom: "5%", fontSize: "8px" }}>
                                    (AXIAL FLOW TEE. DESIGN CALCS)

                                </Text>
                                <Text style={{ display: "flex", justifyContent: "start", width: "100%", marginLeft: "10%", marginBottom: "0%" }}>
                                    3. CAMISA INTERIOR DN 600 (NPS 24 INNER SLEEVE).
                                </Text>
                                <Text style={{ display: "flex", fontSize: "8px", justifyContent: "start", width: "100%", marginLeft: "10%", marginBottom: "1%" }}>
                                    3.1. DATOS DE DISEÑO (DESIGN DATA).
                                </Text>





                                <View style={{ display: "flex", justifyContent: "start", flexDirection: "column", width: "100%", marginLeft: "10%", fontSize: "8px" }}>

                                    <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "90%", backgroundColor: "#81C1FB", flexDirection: "row", padding: "1%" }}>
                                        <Text style={{ display: "flex", flex: 4, justifyContent: "start", width: "65%" }}>
                                            Material de accesorio (FITTING MATERIAL)
                                        </Text>
                                        <View style={{ display: "flex", flex: 2, justifyContent: "start", width: "40%" }}>
                                            <Text>ASTM A-694-F65</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", width: "90%", backgroundColor: "#f2f2f2", padding: "1%", alignItems: "center" }}>
                                        <Text style={{ display: "flex", flex: 4, justifyContent: "start", width: "65%" }}>
                                            Diámetro exterior (OUTSIDE DIAMETER)
                                        </Text>
                                        <View style={{ display: "flex", flex: 2, flexDirection: "row", justifyContent: "start", width: "40%" }}>
                                            <Text style={{ flex: 1 }}>D</Text>
                                            <Text style={{ flex: 1 }}>=</Text>
                                            <Text style={{ marginLeft: "1%", flex: 4 }}>609.60mm</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: "flex", justifyContent: "center", width: "90%", backgroundColor: "#81C1FB", padding: "1%", alignItems: "center", flexDirection: "row" }}>
                                        <Text style={{ display: "flex", flex: 4, justifyContent: "start", width: "65%" }}>
                                            Presión de diseño (DESIGN PRESSURE)
                                        </Text>
                                        <View style={{ display: "flex", flex: 2, flexDirection: "row", justifyContent: "start", width: "40%" }}>
                                            <Text style={{ flex: 2 }}>P</Text>
                                            <Text style={{ marginLeft: "0%", flex: 2 }}>=</Text>
                                            <Text style={{ marginLeft: "0%", flex: 4 }}>86.00kg/cm2</Text>
                                            <Text style={{ marginLeft: "0%", flex: 1 }}>=</Text>
                                            <Text style={{ marginLeft: "0%", flex: 3 }}>8.43MPa</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: "flex", justifyContent: "center", width: "90%", backgroundColor: "#f2f2f2", alignItems: "center", padding: "1%", flexDirection: "row" }}>
                                        <Text style={{ display: "flex", flex: 4, justifyContent: "start", width: "65%" }}>
                                            Temperatura de diseño (DESIGN TEMPERATURE)
                                        </Text>
                                        <View style={{ display: "flex", flex: 2, flexDirection: "row", justifyContent: "start", width: "40%" }}>
                                            <Text style={{ flex: 1 }}>T</Text>
                                            <Text style={{ marginLeft: "0%", flex: 1 }}>=</Text>
                                            <Text style={{ marginLeft: "0%", flex: 4 }}>100.00°C</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: "flex", justifyContent: "center", width: "90%", backgroundColor: "#81C1FB", padding: "1%", alignItems: "center", flexDirection: "row" }}>
                                        <Text style={{ display: "flex", flex: 4, justifyContent: "start", width: "65%" }}>
                                            Corrosión permisible (CORROSION ALLOWANCE)
                                        </Text>
                                        <View style={{ display: "flex", flexDirection: "row", flex: 2, justifyContent: "start", width: "40%" }}>
                                            <Text style={{ flex: 1 }}>C</Text>
                                            <Text style={{ marginLeft: "0%", flex: 1 }}>=</Text>
                                            <Text style={{ marginLeft: "0%", flex: 4 }}>3.20mm</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: "flex", justifyContent: "center", width: "90%", backgroundColor: "#f2f2f2", padding: "1%", alignItems: "center", flexDirection: "row" }}>
                                        <Text style={{ display: "flex", flex: 5, justifyContent: "start", width: "65%", paddingRight: "0%" }}>
                                            B31.8 Ed. 2020 Apéndice Mandatorio Tabla (MANDATORY APP. TABLE) D-1 Pág. 141
                                        </Text>
                                        <View style={{ flex: 1 }}></View>
                                        <View style={{ display: "flex", flex: 3, flexDirection: "row", justifyContent: "start", width: "40%", marginLeft: "0%" }}>
                                            <Text style={{ flex: 1 }}>S</Text>
                                            <Text style={{ marginLeft: "0%", flex: 1 }}>=</Text>
                                            <Text style={{ marginLeft: "0%", flex: 4 }}>450.00MPa</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: "flex", justifyContent: "center", width: "90%", backgroundColor: "#81C1FB", padding: "1%", alignItems: "center", flexDirection: "row" }}>
                                        <Text style={{ display: "flex", flex: 5, justifyContent: "start", width: "65%" }}>
                                            Factor de diseño (Clase de ubicación 2) [DESIGN FACTOR (LOCATION CLASS 2)] B31.8 Ed. 2020 Tabla (TABLE) 841.1.6-1 Pág. 41
                                        </Text>
                                        <View style={{ flex: 1 }}></View>
                                        <View style={{ display: "flex", flex: 3, flexDirection: "row", justifyContent: "start", width: "40%" }}>
                                            <Text style={{ flex: 1 }}>F</Text>
                                            <Text style={{ marginLeft: "0%", flex: 1 }}>=</Text>
                                            <Text style={{ marginLeft: "0%", flex: 4 }}>0.60</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: "flex", justifyContent: "center", width: "90%", backgroundColor: "#f2f2f2", padding: "1%", alignItems: "center", flexDirection: "row" }}>
                                        <Text style={{ display: "flex", flex: 4, justifyContent: "start", width: "65%" }}>
                                            Factor de junta longitudinal (LONGITUDINAL JOINT FACTOR) B31.8 Ed. 2020 Tabla (TABLE) 841.1.7-1 Pág. 43
                                        </Text>
                                        <View style={{ display: "flex", flex: 2, flexDirection: "row", justifyContent: "start", width: "40%" }}>
                                            <Text style={{ flex: 1 }}>E</Text>
                                            <Text style={{ marginLeft: "0%", flex: 1 }}>=</Text>
                                            <Text style={{ marginLeft: "0%", flex: 4 }}>1.00</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: "flex", justifyContent: "center", width: "90%", backgroundColor: "#81C1FB", padding: "1%", alignItems: "center", flexDirection: "row" }}>
                                        <Text style={{ display: "flex", flex: 4, justifyContent: "start", width: "65%" }}>
                                            Factor de temperatura derating (TEMPERATURE DERATING FACTOR) B31.8 Ed. 2020 Tabla (TABLE) 841.1.8-1 Pág. 43
                                        </Text>
                                        <View style={{ display: "flex", flex: 2, flexDirection: "row", justifyContent: "start", width: "40%" }}>
                                            <Text style={{ flex: 1 }}>T</Text>
                                            <Text style={{ marginLeft: "0%", flex: 1 }}>=</Text>
                                            <Text style={{ marginLeft: "0%", flex: 4 }}>1.000</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: "flex", justifyContent: "center", width: "90%", backgroundColor: "#f2f2f2", padding: "1%", alignItems: "center", flexDirection: "row" }}>
                                        <Text style={{ display: "flex", flex: 4, justifyContent: "start", width: "65%" }}>
                                            Espesor de diseño (DESIGN THICKNESS)
                                        </Text>
                                        <View style={{ display: "flex", flex: 2, flexDirection: "row", justifyContent: "start", width: "40%" }}>
                                            <Text style={{ flex: 1 }}></Text>
                                            <Text style={{ marginLeft: "10%", flex: 1 }}></Text>
                                            <Text style={{ marginLeft: "10%", flex: 1 }}></Text>
                                            <Text style={{ flex: 1 }}></Text>
                                        </View>
                                    </View>
                                    <View style={{ display: "flex", justifyContent: "center", width: "90%", backgroundColor: "#81C1FB", padding: "1%", alignItems: "center", flexDirection: "row" }}>
                                        <Text style={{ display: "flex", flex: 4, justifyContent: "start", width: "65%" }}>
                                            Espesor mínimo requerido (MINIMUM REQUIRED THICKNESS)
                                        </Text>
                                        <View style={{ display: "flex", flex: 2, flexDirection: "row", justifyContent: "start", width: "40%" }}>
                                            <Text style={{ flex: 1 }}></Text>
                                            <Text style={{ marginLeft: "10%", flex: 1 }}></Text>
                                            <Text style={{ marginLeft: "10%", flex: 1 }}></Text>
                                            <Text style={{ flex: 1 }}></Text>
                                        </View>
                                    </View>
                                    <View style={{ display: "flex", justifyContent: "center", width: "90%", backgroundColor: "#f2f2f2", padding: "1%", alignItems: "center", flexDirection: "row" }}>
                                        <Text style={{ display: "flex", flex: 4, justifyContent: "start", width: "65%" }}>
                                            Espesor de pared adicional por corrosión (ADDITIONAL WALL THICKNESS PER CORROSION)
                                        </Text>
                                        <View style={{ display: "flex", flex: 2, flexDirection: "row", justifyContent: "start", width: "40%" }}>
                                            <Text style={{ flex: 1 }}></Text>
                                            <Text style={{ marginLeft: "10%", flex: 1 }}></Text>
                                            <Text style={{ marginLeft: "10%", flex: 1 }}></Text>
                                            <Text style={{ flex: 1 }}></Text>
                                        </View>
                                    </View>


                                </View>




                                <Text style={{ display: "flex", justifyContent: "start", alignItems: "center", width: "100%", marginLeft: "10%", marginTop: "2%", marginBottom: "1%" }}>
                                    3.2. Espesor de tubería bajo presión interna
                                    <Text style={{ fontSize: "7px", alignItems: "center" }}>(PIPELINE THICKNESS UNDER INTERNAL PRESSURE) (B31.8 Par. 841.1.1).</Text>
                                </Text>
                                <Text style={{ display: "flex", justifyContent: "start", width: "100%", marginLeft: "10%", paddingRight: "5%", fontSize: "8px" }}>
                                    El estándar ASME B31.8 en el párrafo 831.3.6(c) establece que deben realizarse cálculos de ingeniería para calcular el espesor de otros
                                    componentes de retención de presión, por lo que la fórmula para cálculo de espesor para tubería puede ser usada.
                                </Text>
                                <Text style={{ display: "flex", justifyContent: "start", width: "100%", marginLeft: "10%", marginBottom: "1%", fontSize: "6px", paddingRight: "5%" }}>
                                    (ASME STANDARD B31.8 PAR. 831.3.6(c) ADDRESS THAT ENGINEERING CALCULATIONS SHALL BE PERFORMED TO CALCULATE THE THICKNESS FOR OTHER PRESSURE CONTAINING COMPONENTS, SO WHICH
                                    THE FORMULA TO CALCULATE PIPELINE THICKNESS SHALL BE USED).
                                </Text>

                                <View style={{ display: "flex", justifyContent: "start", alignItems: "center", width: "90%", flexDirection: "row", marginBottom: "1%" }}>
                                    <Text style={{ flex: 1, marginTop: "2.5%" }}>t</Text>
                                    <Text style={{ marginLeft: "2%", flex: 1, marginTop: "2.5%" }}>=</Text>
                                    <View style={{ marginRight: "0%", flex: 2, flexDirection: "column", marginTop: "0.5%" }}>
                                        <Text style={{ textAlign: "center", flex: 1 }}>PD</Text>
                                        <View style={{ height: "1px", backgroundColor: "black", flex: 1, width: "100%", padding: "1px", marginTop: "30%", marginBottom: "1%" }}></View>
                                        <Text style={{ flex: 1, textAlign: "center" }}>2SFET</Text>
                                    </View>
                                    <Text style={{ marginLeft: "2%", flex: 1, marginTop: "2.5%" }}>=</Text>
                                    <View style={{ marginRight: "3%", flex: 8, display: "flex", flexDirection: "column" }}>
                                        <Text style={{ textAlign: "center", flex: 1 }}>(8.43)   (609.60)</Text>
                                        <View style={{ height: "1px", backgroundColor: "black", flex: 1, width: "100%", padding: "1px", marginTop: "9%", marginBottom: "1%" }}></View>
                                        <Text style={{ flex: 1, textAlign: "center" }}>2 (450.00)  (0.60)  (1.00)  (1.000)</Text>
                                    </View>
                                    <Text style={{ marginLeft: "0%", flex: 1, marginTop: "2.5%" }}>=</Text>
                                    <Text style={{ textAlign: "center", marginLeft: "0%", flex: 3, backgroundColor: "#C7DFFA", padding: "1%", marginTop: "2.5%" }}>9.52mm</Text>
                                    <View style={{ marginLeft: "5%", flex: 8, textAlign: "center", display: "flex", flexDirection: "column" }}></View>
                                </View>

                                <Text style={{ display: "flex", justifyContent: "start", alignItems: "center", width: "90%", marginTop: "1%", marginBottom: "2%" }}>
                                    3.3. Espesor mínimo requerido más corrosión (MINIMUM REQUIRED THICKNESS PLUS CORROSION) (NRF-030-PEMEX-2009 Par. 8.1.6.3).
                                </Text>

                                <View style={{ display: "flex", justifyContent: "start", alignItems: "start", width: "80%", flexDirection: "row", marginRight: "10%", marginBottom: "2%" }}>
                                    <Text style={{ flex: 1, textAlign: "left", display: "flex", flexDirection: "row" }}>t<Text style={{ fontSize: "8px", display: "flex", alignItems: "end" }}>r</Text></Text>
                                    <Text style={{ flex: 1 }}>=</Text>
                                    <Text style={{ flex: 1, display: "flex", flexDirection: "row", marginRight: "3%" }}>t + t<Text style={{ fontSize: "8px", display: "flex" }}>c</Text></Text>
                                    <Text style={{ flex: 1 }}>=</Text>
                                    <Text style={{ flex: 3 }}>9.52 + 3.20</Text>
                                    <Text style={{ flex: 1 }}>=</Text>
                                    <Text style={{ flex: 3 }}>12.72mm</Text>
                                    <View style={{ marginLeft: "5%", flex: 6, textAlign: "center", display: "flex", flexDirection: "column" }}></View>
                                </View>


                                <Text style={{ display: "flex", justifyContent: "start", alignItems: "center", width: "90%", marginLeft: "0%", marginBottom: "2%", fontSize: "8px" }}>
                                    El espesor comercial tcom seleccionado para este accesorio es (COMMERCIAL THICKNESS SELECTED FOR THIS FITIING IS):
                                </Text>

                                <View style={{ display: "flex", justifyContent: "start", alignItems: "center", width: "80%", marginRight: "10%", marginTop: "0%", flexDirection: "row", height: "4%" }}>
                                    <Text style={{ textAlign: "center", display: "flex", flexDirection: "row" }}>t<Text style={{ fontSize: "8px", display: "flex", alignItems: "end" }}>com</Text></Text>
                                    <Text style={{ marginLeft: "2%" }}>=</Text>
                                    <Text style={{ alignItems: "center", height: "100%", backgroundColor: "#C698D5", textAlign: "center", flex: 2, paddingTop: "1.2%", marginLeft: "3%" }}>14.27mm</Text>
                                    <Text style={{ textAlign: "right", display: "flex", flexDirection: "row", flex: 3 }}>Cédula <Text style={{ fontSize: "8px", display: "flex" }}>(SCH)</Text></Text>
                                    <Text style={{ width: "8%", height: "100%", backgroundColor: "#C698D5", textAlign: "center", paddingTop: "1.2%", marginLeft: "3%" }}>30</Text>
                                    <View style={{ marginLeft: "5%", flex: 6, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}></View>
                                </View>

                                <Text style={{ display: "flex", justifyContent: "start", alignItems: "center", width: "90%", marginLeft: "0%", marginTop: "2%", marginBottom: "2%", fontSize: "8px" }}>
                                    De acuerdo a la NRF-030-PEMEX-2009 Párrafo 8.1.6.3.3 Tabla 5, el % de tolerancia de fabricación es del 10.0%.(ACCORDING TO NRF-030-PEMEX-2009 PARAGRAPH 8.1.6.3.3 TABLE 5, % FABRICATION TOLERANCE IS 10.0%).
                                </Text>

                                <View style={{ display: "flex", justifyContent: "start", alignItems: "center", width: "80%", marginRight: "10%", marginTop: "0%", flexDirection: "row" }}>
                                    <Text style={{ textAlign: "center", display: "flex", flexDirection: "row" }}>t<Text style={{ fontSize: "8px", display: "flex", alignItems: "end" }}>fab</Text></Text>
                                    <Text style={{ marginLeft: "2%", textAlign: "right", flex: 1 }}>=</Text>
                                    <Text style={{ textAlign: "right", flex: 2, display: "flex", flexDirection: "row" }}>t<Text style={{ fontSize: "8px", display: "flex", alignItems: "end" }}>com</Text></Text>
                                    <Text style={{ marginLeft: "1%" }}>-10.0%</Text>
                                    <Text style={{ textAlign: "center", display: "flex", flexDirection: "row", marginLeft: "1%", marginRight: "3%" }}>t<Text style={{ fontSize: "8px", display: "flex", alignItems: "end" }}>com</Text></Text>
                                    <Text style={{ marginLeft: "2%" }}>=</Text>
                                    <Text style={{ marginLeft: "2%", flex: 3, textAlign: "center" }}>14.27  -  1.43</Text>
                                    <Text style={{ marginLeft: "2%" }}>=</Text>
                                    <Text style={{ marginLeft: "2%" }}>12.84mm</Text>
                                    <View style={{ marginLeft: "5%", flex: 6, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}></View>
                                </View>

                                <Text style={{ display: "flex", justifyContent: "start", alignItems: "center", width: "90%", marginLeft: "0%", marginTop: "2%", marginBottom: "2%", fontSize: "8px" }}>
                                    Por lo que debe cumplirse lo siguiente (THE FOLLOWING RULE SHALL COMPLIES):
                                </Text>

                                <View style={{ display: "flex", justifyContent: "start", alignItems: "center", width: "80%", marginRight: "10%", marginTop: "0%", flexDirection: "row" }}>
                                    <Text style={{ textAlign: "center", display: "flex", flexDirection: "row", marginLeft: "0%", marginRight: "1%" }}>t<Text style={{ fontSize: "8px", display: "flex", alignItems: "end" }}>fab</Text></Text>
                                    <Text>&gt;=</Text>
                                    <Text style={{ textAlign: "center", display: "flex", flexDirection: "row", marginLeft: "1%" }}>t<Text style={{ fontSize: "8px", display: "flex", alignItems: "end" }}>r*</Text></Text>
                                    <Text style={{ marginLeft: "2%", flex: 2, textAlign: "center" }}>12.84mm   &gt;=   12.72mm</Text>
                                    <Text style={{ marginLeft: "2%", flex: 1 }}>CUMPLE</Text>
                                    <View style={{ flex: 2, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}></View>
                                </View>

                                <Text style={{ display: "flex", justifyContent: "start", alignItems: "center", width: "90%", marginLeft: "0%", marginTop: "2%", marginBottom: "2%", fontSize: "10px" }}>
                                    3.4. Presión de trabajo considerando el espesor (WORKING PRESSURE CONSIDERING THICKNESS)
                                </Text>

                                <View style={{ display: "flex", justifyContent: "start", alignItems: "center", width: "100%", marginLeft: "10%", marginTop: "0%", flexDirection: "row" }}>
                                    <Text>P</Text>
                                    <Text style={{ marginLeft: "2%" }}>=</Text>
                                    <View style={{ marginLeft: "2%" }}>
                                        <Text style={{ textAlign: "center", display: "flex", flexDirection: "row", marginLeft: "0%", marginRight: "1%" }}>2ST<Text style={{ fontSize: "8px", display: "flex", alignItems: "end" }}>fab</Text></Text>
                                        <View style={{ height: "1px", backgroundColor: "black", width: "83%" }}></View>
                                        <View style={{ display: "flex", alignItems: "center" }}><Text style={{ width: "50%" }}>D</Text> </View>
                                    </View>
                                    <Text style={{ marginLeft: "0%" }}>FET</Text>
                                    <Text style={{ marginLeft: "2%" }}>=</Text>
                                    <View style={{ marginLeft: "2%" }}>
                                        <Text style={{ textAlign: "center" }}>2  (450.00)   (12.84)</Text>
                                        <Text style={{ height: "1px", backgroundColor: "black" }}></Text>
                                        <View style={{ display: "flex", alignItems: "center" }}><Text style={{ width: "50%" }}>(609.60)</Text> </View>
                                    </View>
                                    <Text style={{ marginLeft: "2%" }}>(0.60)</Text>
                                    <Text style={{ marginLeft: "2%" }}>(1.00)</Text>
                                    <Text style={{ marginLeft: "2%" }}>(1.000)</Text>
                                    <Text style={{ marginLeft: "2%" }}>=</Text>
                                    <Text style={{ marginLeft: "2%" }}>11.38MPa</Text>
                                    <Text style={{ marginLeft: "2%" }}>=</Text>
                                    <Text style={{ marginLeft: "2%" }}>116.01Kg/cm2</Text>

                                </View>
                            </View>


                        </View>


                        <View style={{ display: "flex", alignContent: "end", justifyItems: "end", border: "solid 0px black", width: "100%", height: "5%", backgroundColor: "white", flexDirection: "column" }}>
                            <View style={{ display: "flex", justifyContent: "end", width: "100%", height: "100%", fontSize: "10px", fontWeight: "bold", flexDirection: "row" }}>
                                <Text style={{ textAlign: "left", display: "flex", justifyContent: "start", height: "100%", width: "50%", paddingLeft: "10%", flex: 1 }}>
                                    SO 4043
                                </Text>
                                <Text style={{ textAlign: "right", display: "flex", flex: 1, justifyContent: "end", height: "100%", width: "50%", paddingRight: "10%" }}>
                                    8
                                </Text>
                            </View>
                        </View>

                    </View>
                </Page>
                <Page size="A4">
                    <View style={{ display: "flex", alignItems: "center", border: "solid 1.1px black", width: "100%", height: "100%", backgroundColor: "white", padding: "10px", flexDirection: "column" }}>

                        <View style={{ display: "flex", alignItems: "center", border: "solid 0px black", width: "100%", height: "99%", backgroundColor: "white", flexDirection: "column" }}>

                            <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "90%", height: "10%", marginBottom: "2%", flexDirection: "row" }}>
                                <View style={{ display: "flex", justifyContent: "end", flex: 1, height: "100%", width: "50%", paddingRight: "10%" }}>
                                    <Image style={{ height: "80%", width: "32%", marginLeft: "20%", marginTop: "4%" }} src={require('../../../utils/img/mpgiaLogoColorLogo.jpg')} />
                                </View>
                                <View style={{ display: "flex", justifyContent: "center", flex: 1, alignItems: "center", height: "100%", width: "50%", paddingLeft: "0%", marginLeft: "10%" }}>
                                    <Image style={{ height: "80%", width: "50%", marginTop: "4%" }} src={require('../../../utils/img/mpgiaSAdeCV.png')} />
                                </View>
                            </View>

                            <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", flexDirection: "column", fontWeight: "bold", marginBottom: "10%", fontSize: "10px" }}>

                                <Text style={{ display: "flex", flex: 1, textAlign: "center", justifyContent: "center", width: "100%", marginBottom: "2%" }}>
                                    CÁLCULOS DE DISEÑO. TEE ESPECIAL DE FLUJO AXIAL

                                </Text>
                                <Text style={{ display: "flex", flex: 1, textAlign: "center", justifyContent: "center", width: "100%", marginBottom: "5%", fontSize: "8px" }}>
                                    (AXIAL FLOW TEE. DESIGN CALCS)

                                </Text>
                                <Text style={{ display: "flex", justifyContent: "start", width: "100%", marginLeft: "10%", marginBottom: "0%" }}>
                                    4. REFUERZO INTEGRAL EN DERIVACIONES EXTRUIDAS (INTEGRAL REINFORCEMENT IN EXTRUDED OUTLETS)
                                </Text>
                                <Text style={{ display: "flex", fontSize: "8px", justifyContent: "start", width: "100%", marginLeft: "10%", marginBottom: "1%" }}>
                                    4.1. DATOS DE DISEÑO (DESIGN DATA).
                                </Text>





                                <View style={{ display: "flex", justifyContent: "start", flexDirection: "column", width: "100%", marginLeft: "10%", fontSize: "8px" }}>

                                    <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "90%", backgroundColor: "#81C1FB", flexDirection: "row", padding: "1%" }}>
                                        <Text style={{ display: "flex", flex: 4, justifyContent: "start", width: "65%" }}>
                                            Material de accesorio (FITTING MATERIAL)
                                        </Text>
                                        <View style={{ display: "flex", flex: 2, justifyContent: "start", width: "40%" }}>
                                            <Text>ASTM A-860-WPHY65/MSS SP-75-WPHY65</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", width: "90%", backgroundColor: "#f2f2f2", padding: "1%", alignItems: "center" }}>
                                        <Text style={{ display: "flex", flex: 4, justifyContent: "start", width: "65%" }}>
                                            Diámetro exterior (OUTSIDE DIAMETER)
                                        </Text>
                                        <View style={{ display: "flex", flex: 2, flexDirection: "row", justifyContent: "start", width: "40%" }}>
                                            <Text style={{ flex: 1 }}>D</Text>
                                            <Text style={{ flex: 1 }}>=</Text>
                                            <Text style={{ marginLeft: "1%", flex: 4 }}>762.00mm</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: "flex", justifyContent: "center", width: "90%", backgroundColor: "#81C1FB", alignItems: "center", flexDirection: "row", padding: "1%" }}>
                                        <Text style={{ display: "flex", flex: 4, justifyContent: "start", width: "65%" }}>
                                            Diámetro de salida reducción (REDUCING OUTLET DIAMETER)
                                        </Text>
                                        <View style={{ display: "flex", flex: 2, flexDirection: "row", justifyContent: "start", width: "40%" }}>
                                            <Text style={{ flex: 1 }}>d</Text>
                                            <Text style={{ marginLeft: "0%", flex: 1 }}>=</Text>
                                            <Text style={{ marginLeft: "0%", flex: 4 }}>609.60mm</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: "flex", justifyContent: "center", width: "90%", backgroundColor: "#f2f2f2", padding: "1%", alignItems: "center", flexDirection: "row" }}>
                                        <Text style={{ display: "flex", flex: 4, justifyContent: "start", width: "65%" }}>
                                            Corrosión permisible (CORROSION ALLOWANCE)
                                        </Text>
                                        <View style={{ display: "flex", flexDirection: "row", flex: 2, justifyContent: "start", width: "40%" }}>
                                            <Text style={{ flex: 1 }}>C</Text>
                                            <Text style={{ marginLeft: "0%", flex: 1 }}>=</Text>
                                            <Text style={{ marginLeft: "0%", flex: 4 }}>3.20mm</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: "flex", justifyContent: "center", width: "90%", backgroundColor: "#81C1FB", padding: "1%", alignItems: "center", flexDirection: "row" }}>
                                        <Text style={{ display: "flex", flex: 5, justifyContent: "start", width: "65%", paddingRight: "0%" }}>
                                            Relacion entre diámetros del accesorio (FITTING DIAMETERS RATIO)
                                        </Text>
                                        <View style={{ flex: 1 }}></View>
                                        <View style={{ display: "flex", flex: 3, flexDirection: "row", justifyContent: "start", width: "40%", marginLeft: "0%" }}>
                                            <Text style={{ flex: 1 }}>d/D</Text>
                                            <Text style={{ marginLeft: "0%", flex: 1 }}>=</Text>
                                            <Text style={{ marginLeft: "0%", flex: 4 }}>0.80</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: "flex", justifyContent: "center", width: "90%", backgroundColor: "#f2f2f2", padding: "1%", alignItems: "center", flexDirection: "row" }}>
                                        <Text style={{ display: "flex", flex: 5, justifyContent: "start", width: "65%" }}>
                                            Diámetro interno corroído de salida reducción (CORRODED INT DIAM OF REDUCING OUTLET)
                                        </Text>
                                        <View style={{ flex: 1 }}></View>
                                        <View style={{ display: "flex", flex: 3, flexDirection: "row", justifyContent: "start", width: "40%" }}>
                                            <Text style={{ display: "flex", flexDirection: "row", flex: 1 }}>D<Text style={{ fontSize: "7px", flex: 1, display: "flex", alignItems: "end" }}>o</Text></Text>
                                            <Text style={{ marginLeft: "0%", flex: 1 }}>=</Text>
                                            <Text style={{ marginLeft: "0%", flex: 4 }}>574.00</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: "flex", justifyContent: "center", width: "90%", backgroundColor: "#81C1FB", padding: "1%", alignItems: "center", flexDirection: "row" }}>
                                        <Text style={{ display: "flex", flex: 4, justifyContent: "start", width: "65%" }}>
                                            Espesor real de salida reducción (ACTUAL THICKNESS OF REDUCING OUTLET)
                                        </Text>
                                        <View style={{ display: "flex", flex: 2, flexDirection: "row", justifyContent: "start", width: "40%" }}>
                                            <Text style={{ display: "flex", flexDirection: "row", flex: 1 }}>T<Text style={{ fontSize: "7px", flex: 1, display: "flex", alignItems: "end" }}>b</Text></Text>
                                            <Text style={{ marginLeft: "0%", flex: 1 }}>=</Text>
                                            <Text style={{ marginLeft: "0%", flex: 4 }}>17.80mm</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: "flex", justifyContent: "center", width: "90%", backgroundColor: "#f2f2f2", padding: "1%", alignItems: "center", flexDirection: "row" }}>
                                        <Text style={{ display: "flex", flex: 3, justifyContent: "start", width: "65%" }}>
                                            Espesor requerido de salida reducción (REQUIRED THICKNESS OF REDUCING OUTLET)
                                        </Text>
                                        <View style={{ flex: 1 }}></View>
                                        <View style={{ display: "flex", flex: 2, flexDirection: "row", justifyContent: "start", width: "40%" }}>
                                            <Text style={{ display: "flex", flexDirection: "row", flex: 1, fontSize: "10px" }}>t<Text style={{ fontSize: "7px", flex: 1, display: "flex", alignItems: "end" }}>b</Text></Text>
                                            <Text style={{ marginLeft: "0%", flex: 1 }}>=</Text>
                                            <Text style={{ marginLeft: "0%", flex: 4 }}>9.52mm</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: "flex", justifyContent: "center", width: "90%", backgroundColor: "#81C1FB", padding: "1%", alignItems: "center", flexDirection: "row" }}>
                                        <Text style={{ display: "flex", flex: 3, justifyContent: "start", width: "65%" }}>
                                            Espesor final corroído de salida reducción (CORRODED FINISHED THK OF REDUCING OUTLET)
                                        </Text>
                                        <View style={{ flex: 1 }}></View>
                                        <View style={{ display: "flex", flex: 2, flexDirection: "row", justifyContent: "start", width: "40%" }}>
                                            <Text style={{ display: "flex", flexDirection: "row", flex: 1 }}>T<Text style={{ fontSize: "7px", flex: 1, display: "flex", alignItems: "end" }}>o</Text></Text>
                                            <Text style={{ flex: 1 }}>=</Text>
                                            <Text style={{ flex: 4 }}>17.80mm</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: "flex", justifyContent: "center", width: "90%", backgroundColor: "#f2f2f2", padding: "1%", alignItems: "center", flexDirection: "row" }}>
                                        <Text style={{ display: "flex", flex: 4, justifyContent: "start", width: "65%" }}>
                                            Espesor real de diámetro exterior (ACTUAL THICKNESS OF OUTSIDE DIAMETER)
                                        </Text>
                                        <View style={{ display: "flex", flex: 2, flexDirection: "row", justifyContent: "start", width: "40%" }}>
                                            <Text style={{ display: "flex", flexDirection: "row", flex: 1 }}>T<Text style={{ fontSize: "7px", flex: 1, display: "flex", alignItems: "end" }}>r</Text></Text>
                                            <Text style={{ flex: 1 }}>=</Text>
                                            <Text style={{ flex: 4 }}>19.80mm</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: "flex", justifyContent: "center", width: "90%", backgroundColor: "#81C1FB", padding: "1%", alignItems: "center", flexDirection: "row" }}>
                                        <Text style={{ display: "flex", flex: 3, justifyContent: "start", width: "65%" }}>
                                            Espesor requerido de diámetro exterior (REQUIRED THICKNESS OF OUTSIDE DIAMETER)
                                        </Text>
                                        <View style={{ flex: 1 }}></View>
                                        <View style={{ display: "flex", flex: 2, flexDirection: "row", justifyContent: "start", width: "40%" }}>
                                            <Text style={{ display: "flex", flexDirection: "row", flex: 1, fontSize: "10px" }}>t<Text style={{ fontSize: "7px", flex: 1, display: "flex", alignItems: "end" }}>r</Text></Text>
                                            <Text style={{ flex: 1 }}>=</Text>
                                            <Text style={{ flex: 4 }}>11.90mm</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: "flex", justifyContent: "center", width: "90%", backgroundColor: "#f2f2f2", padding: "1%", alignItems: "center", flexDirection: "row" }}>
                                        <Text style={{ display: "flex", flex: 4, justifyContent: "start", width: "65%" }}>
                                            Radio de curvatura de la porción externa contorneada de la salida reducción
                                        </Text>
                                        <View style={{ display: "flex", flex: 2, flexDirection: "row", justifyContent: "start", width: "40%" }}>
                                            <Text style={{ display: "flex", flexDirection: "row", flex: 1, fontSize: "10px" }}>r<Text style={{ fontSize: "7px", flex: 1, display: "flex", alignItems: "end" }}>o</Text></Text>
                                            <Text style={{ flex: 1 }}>=</Text>
                                            <Text style={{ flex: 4 }}>73.66mm</Text>
                                        </View>
                                    </View>


                                </View>




                                <Text style={{ display: "flex", justifyContent: "start", alignItems: "center", width: "100%", marginLeft: "10%", marginTop: "2%", marginBottom: "1%" }}>
                                    4.2. Área requerida
                                    <Text style={{ fontSize: "7px", alignItems: "center" }}> (REQUIRED AREA)</Text> (B31.8 Par. 831.6).
                                </Text>
                                <Text style={{ display: "flex", justifyContent: "start", width: "100%", marginLeft: "10%", paddingRight: "5%", fontSize: "8px" }}>
                                    El estándar ASME B31.8 en el párrafo 831.6(d) establece que para el cálculo del área requerida, deben usarse las figuras F-1 a F-4 para definir las
                                    dimensiones pertinentes y condiciones limitantes. La Figura F-3 abajo muestra las variables a considerar para este cálculo.
                                </Text>
                                <Text style={{ display: "flex", justifyContent: "start", width: "100%", marginLeft: "10%", marginBottom: "3%", fontSize: "6px", paddingRight: "5%" }}>
                                    (ASME STANDARD B31.8 PAR. 831.6(d) ADDRESS THAT IN ORDER TO CALCULATE REQUIRED AREA, FIGURES F-1 THROUGH F-4 SHALL BE USED TO DEFINE THE PERTINENT DIMENSIONS AND LIMITING
                                    CONDITIONS. FIGURE F-3 BELOW SHOWS THE VARIABLES TO BE USED FOR THIS CALC).
                                </Text>

                                <View style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "25%", width: "45%", backgroundColor: "black", padding: "0.1px" }}>
                                    <Image style={{ height: "100%", width: "100%" }} src={require('../../../utils/img/areaCalc.png')} />
                                </View>
                            </View>

                        </View>


                        <View style={{ display: "flex", alignContent: "end", justifyItems: "end", border: "solid 0px black", width: "100%", height: "5%", backgroundColor: "white", flexDirection: "column" }}>
                            <View style={{ display: "flex", justifyContent: "end", width: "100%", height: "100%", fontSize: "10px", fontWeight: "bold", flexDirection: "row" }}>
                                <Text style={{ textAlign: "left", display: "flex", justifyContent: "start", height: "100%", width: "50%", paddingLeft: "10%", flex: 1 }}>
                                    SO 4043
                                </Text>
                                <Text style={{ textAlign: "right", display: "flex", flex: 1, justifyContent: "end", height: "100%", width: "50%", paddingRight: "10%" }}>
                                    9
                                </Text>
                            </View>
                        </View>

                    </View>
                </Page>
                <Page size="A4">
                    <View style={{ display: "flex", alignItems: "center", border: "solid 1.1px black", width: "100%", height: "100%", backgroundColor: "white", padding: "10px", flexDirection: "column" }}>

                        <View style={{ display: "flex", alignItems: "center", border: "solid 0px black", width: "100%", height: "100%", backgroundColor: "white", flexDirection: "column", marginBottom: "5%" }}>


                            <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", flexDirection: "column", fontWeight: "bold", fontSize: "10px", height: "15%" }}>

                                <Text style={{ display: "flex", justifyContent: "start", alignItems: "center", width: "90%", marginLeft: "0%", marginBottom: "2%", fontSize: "9px", marginTop: "4%" }}>
                                    Cálculo de variables a ser usadas en formulas (CALCS FOR VARIABLES TO BE USED IN FORMULAS) [B31.8 Par. 831.6(e) & 831.6(f)].
                                </Text>
                                <Text style={{ display: "flex", justifyContent: "start", alignItems: "center", width: "90%", marginLeft: "0%", fontSize: "8px" }}>
                                    La variable K está definida por las siguientes condiciones (K VARIABLE IS DEFINED BY FOLLOWING CONDITIONS)
                                </Text>

                                <View style={{ display: "flex", justifyContent: "start", alignItems: "center", width: "80%", marginRight: "10%", flexDirection: "row", height: "20%" }}>

                                    <Text style={{}}>
                                        K = 1.00 si
                                        <Text style={{ fontSize: "8px", display: "flex", alignItems: "end" }}> (if) </Text>
                                        d/D &gt; 0.60. O
                                        <Text style={{ fontSize: "8px", display: "flex", alignItems: "end" }}> (or) </Text>
                                        K = 0.60 + 2/3 d/D si
                                        <Text style={{ fontSize: "8px", display: "flex", alignItems: "end" }}> (if) </Text>
                                        0.15 &lt; d/D &lt;= 0.60. O
                                        <Text style={{ fontSize: "8px", display: "flex", alignItems: "end" }}> (or) </Text>
                                        K = 0.70 si
                                        <Text style={{ fontSize: "8px", display: "flex", alignItems: "end" }}> (if) </Text>
                                        d/D &lt;= 0.15.
                                    </Text>

                                </View>
                                <View style={{ display: "flex", justifyContent: "start", alignItems: "center", width: "80%", flexDirection: "row", height: "15%" }}>

                                    <Text style={{ textAlign: "center", display: "flex", flexDirection: "row" }}>d/D = 0.80</Text>

                                    <Text style={{ textAlign: "center", display: "flex", flexDirection: "row", flex: 3 }}>Entonces <Text style={{ fontSize: "8px", display: "flex" }}>(THEN)</Text></Text>
                                    <Text style={{ width: "8%", height: "100%", textAlign: "center", paddingTop: "1.2%", flex: 1 }}>K =  1.00</Text>
                                    <View style={{ marginLeft: "5%", flex: 6, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}></View>

                                </View>


                            </View>

                            <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", flexDirection: "column", fontWeight: "bold", marginBottom: "1%", fontSize: "10px" }}>

                                <Text style={{ display: "flex", justifyContent: "start", alignItems: "center", width: "90%", marginLeft: "0%", marginTop: "2%", marginBottom: "2%", fontSize: "8px" }}>
                                    Altura de la zona de refuerzo (HEIGHT OF THE REINFORCEMENT ZONE).
                                </Text>

                                <View style={{ display: "flex", justifyContent: "start", alignItems: "center", width: "80%", marginTop: "0%", flexDirection: "row" }}>
                                    <Text>
                                        L = 0.7 VdTo   =   0.7 V   (609.60)   (17.80)   =   72.92mm
                                    </Text>

                                    <View style={{ marginLeft: "5%", flex: 6, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}></View>
                                </View>


                            </View>

                            <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", flexDirection: "column", fontWeight: "bold", marginBottom: "1%", fontSize: "10px" }}>

                                <Text style={{ display: "flex", justifyContent: "start", alignItems: "center", width: "90%", marginLeft: "0%", marginTop: "2%", marginBottom: "2%", fontSize: "8px" }}>
                                    Área requerida (REQUIRED AREA).
                                </Text>

                                <View style={{ display: "flex", justifyContent: "start", alignItems: "center", width: "80%", marginTop: "0%", flexDirection: "row" }}>
                                    <Text>
                                        A
                                        <Text style={{ fontSize: "8px", display: "flex", alignItems: "end" }}>req   </Text>
                                        =   Kt
                                        <Text style={{ fontSize: "8px", display: "flex", alignItems: "end" }}>r</Text>
                                        D
                                        <Text style={{ fontSize: "8px", display: "flex", alignItems: "end" }}>o   </Text>
                                        =   (1.00)   (11.90)   (574.00)   =   6831.12mm
                                    </Text>

                                    <View style={{ marginLeft: "5%", flex: 6, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}></View>
                                </View>


                            </View>

                            <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", flexDirection: "column", fontWeight: "bold", marginBottom: "1%", fontSize: "10px" }}>

                                <Text style={{ display: "flex", justifyContent: "start", alignItems: "center", width: "90%", marginLeft: "0%", marginTop: "2%", marginBottom: "2%", fontSize: "8px" }}>
                                    Área disponible (AVAILABLE AREA) A1.
                                </Text>

                                <View style={{ display: "flex", justifyContent: "start", alignItems: "center", width: "80%", marginTop: "0%", flexDirection: "row" }}>
                                    <Text>
                                        A
                                        <Text style={{ fontSize: "8px", display: "flex", alignItems: "end" }}>1   </Text>
                                        =   D
                                        <Text style={{ fontSize: "8px", display: "flex", alignItems: "end" }}>O</Text>
                                        (T
                                        <Text style={{ fontSize: "8px", display: "flex", alignItems: "end" }}>r</Text>
                                        -t
                                        <Text style={{ fontSize: "8px", display: "flex", alignItems: "end" }}>r</Text>
                                        )   =   (574.00)   (   19.80  -  11.90   )   =   4534.08mm²
                                    </Text>

                                    <View style={{ marginLeft: "5%", flex: 6, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}></View>
                                </View>


                            </View>

                            <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", flexDirection: "column", fontWeight: "bold", marginBottom: "1%", fontSize: "10px" }}>

                                <Text style={{ display: "flex", justifyContent: "start", alignItems: "center", width: "90%", marginLeft: "0%", marginTop: "2%", marginBottom: "2%", fontSize: "8px" }}>
                                    Área disponible (AVAILABLE AREA) A2.
                                </Text>

                                <View style={{ display: "flex", justifyContent: "start", alignItems: "center", width: "80%", marginTop: "0%", flexDirection: "row" }}>
                                    <Text>
                                        A
                                        <Text style={{ fontSize: "8px", display: "flex", alignItems: "end" }}>2   </Text>
                                        =   2L(T
                                        <Text style={{ fontSize: "8px", display: "flex", alignItems: "end" }}>b</Text>
                                        -t
                                        <Text style={{ fontSize: "8px", display: "flex", alignItems: "end" }}>b</Text>
                                        )   =   (2)   (72.92)   (   17.80  -  9.52   )   =   1207.40mm²
                                    </Text>

                                    <View style={{ marginLeft: "5%", flex: 6, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}></View>
                                </View>


                            </View>

                            <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", flexDirection: "column", fontWeight: "bold", marginBottom: "1%", fontSize: "10px" }}>

                                <Text style={{ display: "flex", justifyContent: "start", alignItems: "center", width: "90%", marginLeft: "0%", marginTop: "2%", marginBottom: "2%", fontSize: "8px" }}>
                                    Área disponible (AVAILABLE AREA) A3.
                                </Text>

                                <View style={{ display: "flex", justifyContent: "start", alignItems: "center", width: "80%", marginTop: "0%", flexDirection: "row" }}>
                                    <Text>
                                        A
                                        <Text style={{ fontSize: "8px", display: "flex", alignItems: "end" }}>3   </Text>
                                        =   2r
                                        <Text style={{ fontSize: "8px", display: "flex", alignItems: "end" }}>O</Text>
                                        (T
                                        <Text style={{ fontSize: "8px", display: "flex", alignItems: "end" }}>O</Text>
                                        -t
                                        <Text style={{ fontSize: "8px", display: "flex", alignItems: "end" }}>b</Text>
                                        )   =   (2)   (73.66)   (   17.80  -  9.52   )   =   1219.70mm²
                                    </Text>

                                    <View style={{ marginLeft: "5%", flex: 6, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}></View>
                                </View>

                                <View style={{ display: "flex", justifyContent: "start", alignItems: "center", width: "90%", marginTop: "2%", flexDirection: "row" }}>
                                    <Text style={{ flex: 3, fontSize: "9px" }}>
                                        If  A
                                        <Text style={{ fontSize: "8px", display: "flex", alignItems: "end" }}>1 </Text>
                                        + A
                                        <Text style={{ fontSize: "8px", display: "flex", alignItems: "end" }}>2 </Text>
                                        + A
                                        <Text style={{ fontSize: "8px", display: "flex", alignItems: "end" }}>3  </Text>
                                        &gt;=  A
                                        <Text style={{ fontSize: "8px", display: "flex", alignItems: "end" }}>req  </Text>
                                        cumple
                                    </Text>
                                    <Text style={{ flex: 7, fontSize: "9px" }}>
                                        4,534.08   +   1,207.40   +   1219.70   &gt;=   6831.12   Luego   6961.18   &gt;   6831.12   CUMPLE.
                                    </Text>
                                </View>

                                <Text style={{ display: "flex", justifyContent: "start", alignItems: "center", width: "100%", marginLeft: "10%", marginTop: "2%", marginBottom: "1%" }}>
                                    Notas
                                    <Text style={{ fontSize: "7px", alignItems: "center" }}> (NOTES)</Text>
                                </Text>
                                <Text style={{ display: "flex", justifyContent: "start", width: "90%", paddingRight: "5%", fontSize: "9px" }}>
                                    Con los espesores teóricos indicados en la sección 1.3, el cálculo del refuerzo integral en derivación de la tee no cumple con dichos espesores
                                    mínimos, de acuerdo al cálculo. Los espesores mínimos requeridos para cumplir con el área de refuerzo de la derivación deben ser de 21 mm en
                                    Ø de salida reducción y 23 mm en Ø exterior.
                                </Text>
                                <Text style={{ display: "flex", justifyContent: "start", width: "90%", marginBottom: "2%", fontSize: "6.5px", paddingRight: "5%", marginTop: "1%" }}>
                                    (WITH THE THEORETICAL THICKNESSES INDICATED IN SECTION 1.3, THE CALCULATION OF THE INTEGRAL REINFORCEMENT IN THE EXTRUDED OUTLETS DOES NOT COMPLY WITH SUCH MINIMUM
                                    THICKNESSES. THE MINIMUM REQUIRED THICKNESSES IN ORDER TO COMPLY WITH TRHE REINFORCEMENT AREA IN THE EXTRUDED OUTLET SHOULD BE 0.82" IN THE REDUCTION OUTLET Ø AND 0.90" IN
                                    THE OUTSIDE Ø.)
                                </Text>
                                <Text style={{ display: "flex", justifyContent: "start", width: "90%", paddingRight: "5%", fontSize: "9px" }}>
                                    La tabla siguiente se muestran los espesores físicos reales obtenidos del área de derivación, que están por arriba de los valores solicitados
                                    cumpliendo con cálculo.
                                </Text>
                                <Text style={{ display: "flex", justifyContent: "start", width: "90%", marginBottom: "1%", fontSize: "6.5px", paddingRight: "5%", marginTop: "1%" }}>
                                    (FOLLOWING CHART SHOWS CURRENT THICKNESSES OBTAINED FROM THE EXTRUDED OUTLET, WHICH ARE UP FROM THE REQUIRED VALUES COMPLYING WITH THE CALCULATIONS).
                                </Text>
                                <Text style={{ display: "flex", justifyContent: "start", alignItems: "center", width: "100%", marginLeft: "10%", marginTop: "2%", marginBottom: "1%" }}>
                                    Tabla de espesores reales
                                    <Text style={{ fontSize: "7px", alignItems: "center" }}> (ACTUAL THICKNESS CHART)</Text>
                                </Text>

                                <View style={{ height: "6.5%", width: "90%", backgroundColor: "black", padding: "1px", display: "flex", flexDirection: "row", fontSize: "9px" }}>
                                    <View style={{ flex: 4, backgroundColor: "black", height: "100%", paddingLeft: "0.5px", paddingRight: "0.5px", display: "flex", flexDirection: "column" }}>
                                        <Text style={{ textAlign: "center", height: "100%", width: "100%", backgroundColor: "#81C1FB" }}>
                                            Grados(°)
                                        </Text>
                                        <Text style={{ textAlign: "center", height: "100%", width: "100%", backgroundColor: "#81C1FB", fontSize: "8px" }}>
                                            [DEGREES ( ° )]
                                        </Text>
                                    </View>
                                    <View style={{ flex: 2, backgroundColor: "black", height: "100%", paddingLeft: "0.5px", paddingRight: "0.5px" }}>
                                        <Text style={{ textAlign: "center", height: "100%", width: "100%", backgroundColor: "#81C1FB", paddingTop: "8%" }}>
                                            0° - 45°
                                        </Text>
                                    </View>
                                    <View style={{ flex: 2, backgroundColor: "black", height: "100%", paddingLeft: "0.5px", paddingRight: "0.5px" }}>
                                        <Text style={{ textAlign: "center", height: "100%", width: "100%", backgroundColor: "#81C1FB", paddingTop: "8%" }}>
                                            45° - 90°
                                        </Text>
                                    </View>
                                    <View style={{ flex: 2, backgroundColor: "black", height: "100%", paddingLeft: "0.5px", paddingRight: "0.5px" }}>
                                        <Text style={{ textAlign: "center", height: "100%", width: "100%", backgroundColor: "#81C1FB", paddingTop: "8%" }}>
                                            90° - 135°
                                        </Text>
                                    </View>
                                    <View style={{ flex: 2, backgroundColor: "black", height: "100%", paddingLeft: "0.5px", paddingRight: "0.5px" }}>
                                        <Text style={{ textAlign: "center", height: "100%", width: "100%", backgroundColor: "#81C1FB", paddingTop: "8%" }}>
                                            135° - 180°
                                        </Text>
                                    </View>
                                    <View style={{ flex: 2, backgroundColor: "black", height: "100%", paddingLeft: "0.5px", paddingRight: "0.5px" }}>
                                        <Text style={{ textAlign: "center", height: "100%", width: "100%", backgroundColor: "#81C1FB", paddingTop: "8%" }}>
                                            180° - 225°
                                        </Text>
                                    </View>
                                    <View style={{ flex: 2, backgroundColor: "black", height: "100%", paddingLeft: "0.5px", paddingRight: "0.5px" }}>
                                        <Text style={{ textAlign: "center", height: "100%", width: "100%", backgroundColor: "#81C1FB", paddingTop: "8%" }}>
                                            225° - 270°
                                        </Text>
                                    </View>
                                    <View style={{ flex: 2, backgroundColor: "black", height: "100%", paddingLeft: "0.5px", paddingRight: "0.5px" }}>
                                        <Text style={{ textAlign: "center", height: "100%", width: "100%", backgroundColor: "#81C1FB", paddingTop: "8%" }}>
                                            270° - 315°
                                        </Text>
                                    </View>
                                    <View style={{ flex: 2, backgroundColor: "black", height: "100%", paddingLeft: "0.5px", paddingRight: "0.5px" }}>
                                        <Text style={{ textAlign: "center", height: "100%", width: "100%", backgroundColor: "#81C1FB", paddingTop: "8%" }}>
                                            315° - 360°
                                        </Text>
                                    </View>
                                </View>
                                <View style={{ height: "6.5%", width: "90%", backgroundColor: "black", padding: "1px", display: "flex", flexDirection: "row", fontSize: "9px" }}>
                                    <View style={{ flex: 4, backgroundColor: "black", height: "100%", paddingLeft: "0.5px", paddingRight: "0.5px", display: "flex", flexDirection: "column" }}>
                                        <Text style={{ textAlign: "center", height: "100%", width: "100%", backgroundColor: "#81C1FB" }}>
                                            Ø de salida reducción
                                        </Text>
                                        <Text style={{ textAlign: "center", height: "100%", width: "100%", backgroundColor: "#81C1FB", fontSize: "8px" }}>
                                            (REDUCING OUTLET Ø)
                                        </Text>
                                    </View>
                                    <View style={{ flex: 2, backgroundColor: "black", height: "100%", paddingLeft: "0.5px", paddingRight: "0.5px" }}>
                                        <Text style={{ textAlign: "center", height: "100%", width: "100%", backgroundColor: "white", paddingTop: "8%" }}>
                                        40.52
                                        </Text>
                                    </View>
                                    <View style={{ flex: 2, backgroundColor: "black", height: "100%", paddingLeft: "0.5px", paddingRight: "0.5px" }}>
                                        <Text style={{ textAlign: "center", height: "100%", width: "100%", backgroundColor: "white", paddingTop: "8%" }}>
                                        40.91
                                        </Text>
                                    </View>
                                    <View style={{ flex: 2, backgroundColor: "black", height: "100%", paddingLeft: "0.5px", paddingRight: "0.5px" }}>
                                        <Text style={{ textAlign: "center", height: "100%", width: "100%", backgroundColor: "white", paddingTop: "8%" }}>
                                        37.57
                                        </Text>
                                    </View>
                                    <View style={{ flex: 2, backgroundColor: "black", height: "100%", paddingLeft: "0.5px", paddingRight: "0.5px" }}>
                                        <Text style={{ textAlign: "center", height: "100%", width: "100%", backgroundColor: "white", paddingTop: "8%" }}>
                                        40.99
                                        </Text>
                                    </View>
                                    <View style={{ flex: 2, backgroundColor: "black", height: "100%", paddingLeft: "0.5px", paddingRight: "0.5px" }}>
                                        <Text style={{ textAlign: "center", height: "100%", width: "100%", backgroundColor: "white", paddingTop: "8%" }}>
                                        37.6
                                        </Text>
                                    </View>
                                    <View style={{ flex: 2, backgroundColor: "black", height: "100%", paddingLeft: "0.5px", paddingRight: "0.5px" }}>
                                        <Text style={{ textAlign: "center", height: "100%", width: "100%", backgroundColor: "white", paddingTop: "8%" }}>
                                        37.97
                                        </Text>
                                    </View>
                                    <View style={{ flex: 2, backgroundColor: "black", height: "100%", paddingLeft: "0.5px", paddingRight: "0.5px" }}>
                                        <Text style={{ textAlign: "center", height: "100%", width: "100%", backgroundColor: "white", paddingTop: "8%" }}>
                                        37.29
                                        </Text>
                                    </View>
                                    <View style={{ flex: 2, backgroundColor: "black", height: "100%", paddingLeft: "0.5px", paddingRight: "0.5px" }}>
                                        <Text style={{ textAlign: "center", height: "100%", width: "100%", backgroundColor: "white", paddingTop: "8%" }}>
                                        37.75
                                        </Text>
                                    </View>
                                </View>
                                <View style={{ height: "6.5%", width: "90%", backgroundColor: "black", padding: "1px", display: "flex", flexDirection: "row", fontSize: "9px" }}>
                                    <View style={{ flex: 4, backgroundColor: "black", height: "100%", paddingLeft: "0.5px", paddingRight: "0.5px", display: "flex", flexDirection: "column" }}>
                                        <Text style={{ textAlign: "center", height: "100%", width: "100%", backgroundColor: "#81C1FB" }}>
                                            Ø Exterior
                                        </Text>
                                        <Text style={{ textAlign: "center", height: "100%", width: "100%", backgroundColor: "#81C1FB", fontSize: "8px" }}>
                                            (OUTSIDE Ø)
                                        </Text>
                                    </View>
                                    <View style={{ flex: 2, backgroundColor: "black", height: "100%", paddingLeft: "0.5px", paddingRight: "0.5px" }}>
                                        <Text style={{ textAlign: "center", height: "100%", width: "100%", backgroundColor: "white", paddingTop: "8%" }}>
                                            36.4
                                        </Text>
                                    </View>
                                    <View style={{ flex: 2, backgroundColor: "black", height: "100%", paddingLeft: "0.5px", paddingRight: "0.5px" }}>
                                        <Text style={{ textAlign: "center", height: "100%", width: "100%", backgroundColor: "white", paddingTop: "8%" }}>
                                            35.33
                                        </Text>
                                    </View>
                                    <View style={{ flex: 2, backgroundColor: "black", height: "100%", paddingLeft: "0.5px", paddingRight: "0.5px" }}>
                                        <Text style={{ textAlign: "center", height: "100%", width: "100%", backgroundColor: "white", paddingTop: "8%" }}>
                                            33.8
                                        </Text>
                                    </View>
                                    <View style={{ flex: 2, backgroundColor: "black", height: "100%", paddingLeft: "0.5px", paddingRight: "0.5px" }}>
                                        <Text style={{ textAlign: "center", height: "100%", width: "100%", backgroundColor: "white", paddingTop: "8%" }}>
                                            35.97
                                        </Text>
                                    </View>
                                    <View style={{ flex: 2, backgroundColor: "black", height: "100%", paddingLeft: "0.5px", paddingRight: "0.5px" }}>
                                        <Text style={{ textAlign: "center", height: "100%", width: "100%", backgroundColor: "white", paddingTop: "8%" }}>
                                            35.37
                                        </Text>
                                    </View>
                                    <View style={{ flex: 2, backgroundColor: "black", height: "100%", paddingLeft: "0.5px", paddingRight: "0.5px" }}>
                                        <Text style={{ textAlign: "center", height: "100%", width: "100%", backgroundColor: "white", paddingTop: "8%" }}>
                                            32.41
                                        </Text>
                                    </View>
                                    <View style={{ flex: 2, backgroundColor: "black", height: "100%", paddingLeft: "0.5px", paddingRight: "0.5px" }}>
                                        <Text style={{ textAlign: "center", height: "100%", width: "100%", backgroundColor: "white", paddingTop: "8%" }}>
                                            30.35
                                        </Text>
                                    </View>
                                    <View style={{ flex: 2, backgroundColor: "black", height: "100%", paddingLeft: "0.5px", paddingRight: "0.5px" }}>
                                        <Text style={{ textAlign: "center", height: "100%", width: "100%", backgroundColor: "white", paddingTop: "8%" }}>
                                            36.18
                                        </Text>
                                    </View>
                                </View>


                            </View>


                        </View>


                        <View style={{ display: "flex", alignContent: "end", justifyItems: "end", border: "solid 0px black", width: "100%", height: "5%", backgroundColor: "white", flexDirection: "column" }}>
                            <View style={{ display: "flex", justifyContent: "end", width: "100%", height: "100%", fontSize: "10px", fontWeight: "bold", flexDirection: "row" }}>
                                <Text style={{ textAlign: "left", display: "flex", justifyContent: "start", height: "100%", width: "50%", paddingLeft: "10%", flex: 1 }}>
                                    SO 4043
                                </Text>
                                <Text style={{ textAlign: "right", display: "flex", flex: 1, justifyContent: "end", height: "100%", width: "50%", paddingRight: "10%" }}>
                                    10
                                </Text>
                            </View>
                        </View>

                    </View>
                </Page>
                <Page size="A4">
                    <View style={{ display: "flex", alignItems: "center", border: "solid 1.1px black", width: "100%", height: "100%", backgroundColor: "white", padding: "10px", flexDirection: "column" }}>

                        <View style={{ display: "flex", alignItems: "center", border: "solid 0px black", width: "100%", height: "99%", backgroundColor: "white", flexDirection: "column" }}>

                            <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "90%", height: "10%", marginBottom: "2%", flexDirection: "row" }}>
                                <View style={{ display: "flex", justifyContent: "end", flex: 1, height: "100%", width: "50%", paddingRight: "10%" }}>
                                    <Image style={{ height: "80%", width: "32%", marginLeft: "20%", marginTop: "4%" }} src={require('../../../utils/img/mpgiaLogoColorLogo.jpg')} />
                                </View>
                                <View style={{ display: "flex", justifyContent: "center", flex: 1, alignItems: "center", height: "100%", width: "50%", paddingLeft: "0%", marginLeft: "10%" }}>
                                    <Image style={{ height: "80%", width: "50%", marginTop: "4%" }} src={require('../../../utils/img/mpgiaSAdeCV.png')} />
                                </View>
                            </View>

                            <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", flexDirection: "column", fontWeight: "bold", marginBottom: "10%", fontSize: "10px" }}>

                                <Text style={{ display: "flex", flex: 1, textAlign: "center", justifyContent: "center", width: "100%", marginBottom: "2%" }}>
                                    CÁLCULOS DE DISEÑO. TEE ESPECIAL DE FLUJO AXIAL

                                </Text>
                                <Text style={{ display: "flex", flex: 1, textAlign: "center", justifyContent: "center", width: "100%", marginBottom: "5%", fontSize: "8px" }}>
                                    (AXIAL FLOW TEE. DESIGN CALCS)

                                </Text>
                                <Text style={{ display: "flex", justifyContent: "start", width: "100%", marginLeft: "10%", marginBottom: "0%" }}>
                                    5. ÁREA TRANSVERSAL DE DERIVACIÓN DN 600 (NPS 24 TRANSVERSE DERIVATION AREA).
                                </Text>
                                <Text style={{ display: "flex", fontSize: "8px", justifyContent: "start", width: "100%", marginLeft: "10%", marginBottom: "1%" }}>
                                    5.1. DATOS DE DISEÑO (DESIGN DATA).
                                </Text>

                                <View style={{ display: "flex", justifyContent: "start", flexDirection: "column", width: "100%", marginLeft: "10%", fontSize: "8px" }}>

                                    <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "90%", backgroundColor: "#81C1FB", flexDirection: "row", padding: "1%" }}>
                                        <Text style={{ display: "flex", flex: 4, justifyContent: "start", width: "65%" }}>
                                            Material de accesorio (FITTING MATERIAL)
                                        </Text>
                                        <View style={{ display: "flex", flex: 2, justifyContent: "start", width: "40%" }}>
                                            <Text>ASTM A-860-WPHY65/MSS SP-75-WPHY65</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", width: "90%", backgroundColor: "#f2f2f2", padding: "1%", alignItems: "center" }}>
                                        <Text style={{ display: "flex", flex: 4, justifyContent: "start", width: "65%" }}>
                                            Diámetro exterior (OUTSIDE DIAMETER)
                                        </Text>
                                        <View style={{ display: "flex", flex: 2, flexDirection: "row", justifyContent: "start", width: "40%" }}>
                                            <Text style={{ flex: 1 }}>D</Text>
                                            <Text style={{ flex: 1 }}>=</Text>
                                            <Text style={{ marginLeft: "1%", flex: 4 }}>609.60mm</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: "flex", justifyContent: "center", width: "90%", backgroundColor: "#81C1FB", alignItems: "center", flexDirection: "row", padding: "1%" }}>
                                        <Text style={{ display: "flex", flex: 4, justifyContent: "start", width: "65%" }}>
                                            Radio interior (INNER RADIUS)
                                        </Text>
                                        <View style={{ display: "flex", flex: 2, flexDirection: "row", justifyContent: "start", width: "40%" }}>
                                            <Text style={{ display: "flex", flexDirection: "row", flex: 1 }}>R<Text style={{ fontSize: "7px", flex: 1, display: "flex", alignItems: "end" }}>int</Text></Text>
                                            <Text style={{ marginLeft: "0%", flex: 1 }}>=</Text>
                                            <Text style={{ marginLeft: "0%", flex: 4 }}>290.53mm</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: "flex", justifyContent: "center", width: "90%", backgroundColor: "#f2f2f2", padding: "1%", alignItems: "center", flexDirection: "row" }}>
                                        <Text style={{ display: "flex", flex: 4, justifyContent: "start", width: "65%" }}>
                                            Espesor comercial seleccionado (COMMERCIAL THICKNESS SELECTED)
                                        </Text>
                                        <View style={{ display: "flex", flexDirection: "row", flex: 2, justifyContent: "start", width: "40%" }}>
                                            <Text style={{ display: "flex", flexDirection: "row", flex: 1 }}>t<Text style={{ fontSize: "7px", flex: 1, display: "flex", alignItems: "end" }}>com</Text></Text>
                                            <Text style={{ marginLeft: "0%", flex: 1 }}>=</Text>
                                            <Text style={{ marginLeft: "0%", flex: 4 }}>14.27mm</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: "flex", justifyContent: "center", width: "90%", backgroundColor: "#81C1FB", padding: "1%", alignItems: "center", flexDirection: "row" }}>
                                        <Text style={{ display: "flex", flex: 5, justifyContent: "start", width: "65%", paddingRight: "0%" }}>
                                            Constante (CONSTANT)
                                        </Text>
                                        <View style={{ flex: 1 }}></View>
                                        <View style={{ display: "flex", flex: 3, flexDirection: "row", justifyContent: "start", width: "40%", marginLeft: "0%" }}>
                                            <Text style={{ flex: 1 }}>pi</Text>
                                            <Text style={{ marginLeft: "0%", flex: 1 }}>=</Text>
                                            <Text style={{ marginLeft: "0%", flex: 4 }}>3.14</Text>
                                        </View>
                                    </View>


                                </View>




                                <Text style={{ display: "flex", justifyContent: "start", alignItems: "center", width: "100%", marginLeft: "10%", marginTop: "2%", marginBottom: "1%" }}>
                                    5.2. Área transversal disponible
                                    <Text style={{ fontSize: "7px", alignItems: "center" }}> (TRANSVERSE AVAILABLE AREA).</Text>
                                </Text>
                                <Text style={{ display: "flex", justifyContent: "start", width: "100%", marginLeft: "10%", paddingRight: "5%", fontSize: "8px" }}>
                                    De acuerdo a la NRF-178-PEMEX-2010 Párrafo 8.2.4.5, el área transversal debe ser igual al área de la derivación por lo que,
                                </Text>
                                <Text style={{ display: "flex", justifyContent: "start", width: "100%", marginLeft: "10%", marginBottom: "3%", fontSize: "6px", paddingRight: "5%" }}>
                                    (ACCORDING TO NRF-178-PEMEX-2010 PARAGRAPH 8.2.4.5, TRANSVERSE AREA SHOULD BE EQUAL TO DERIVATION AREA, THEN),
                                </Text>

                                <Text style={{ display: "flex", justifyContent: "start", width: "90%", marginLeft: "10%", marginBottom: "3%", paddingRight: "5%" }}>
                                    A
                                    <Text style={{ fontSize: "8px", display: "flex", alignItems: "end" }}>req   </Text>
                                    =   piR
                                    <Text style={{ fontSize: "8px", display: "flex", alignItems: "end" }}>int</Text>
                                    ²   =   (3.14)   290.53²   =   265.040.12mm²   =   411in²
                                </Text>

                                <Text style={{ display: "flex", justifyContent: "start", width: "100%", marginLeft: "10%", paddingRight: "5%", fontSize: "8px" }}>
                                    Las ranuras propuestas tienen las siguientes medidas, y se proponen 4 entre cada uno de los ejes paralelas al plano horizontal,
                                </Text>
                                <Text style={{ display: "flex", justifyContent: "start", width: "100%", marginLeft: "10%", marginBottom: "3%", fontSize: "6px", paddingRight: "5%" }}>
                                    (PROPOSED SLOTS HAVE THE FOLLOWING MEASURES, AND 4 ARE PROPOSED BETWEEN EACH AXIS PARALLELS TO HORIZONTAL PLANE),
                                </Text>

                                <View style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "20%", width: "45%" }}>
                                    <Image style={{ height: "100%", width: "100%" }} src={require('../../../utils/img/areaCil.png')} />
                                </View>

                                <Text style={{ display: "flex", justifyContent: "start", width: "100%", marginLeft: "10%", paddingRight: "5%", fontSize: "8px" }}>
                                    El área total de cada ranura esta compuesta por el área rectangular más el área de cada medio círculo.
                                </Text>
                                <Text style={{ display: "flex", justifyContent: "start", width: "100%", marginLeft: "10%", marginBottom: "3%", fontSize: "6px", paddingRight: "5%" }}>
                                    (SLOT TOTAL AREA IS COMPOSED BY THE RECTANGLE AREA PLUS AREA FROM EACH HALF CIRCLE).
                                </Text>

                                <Text style={{ display: "flex", justifyContent: "start", width: "90%", marginLeft: "10%", marginBottom: "3%", paddingRight: "5%" }}>
                                    A
                                    <Text style={{ fontSize: "8px", display: "flex", alignItems: "end" }}>cir   </Text>
                                    =   piR²   =   (3.14)   38.1²   =   4558.06mm²   =   7.06in²
                                </Text>

                                <Text style={{ display: "flex", justifyContent: "start", width: "90%", marginLeft: "10%", marginBottom: "3%", paddingRight: "5%" }}>
                                    A
                                    <Text style={{ fontSize: "8px", display: "flex", alignItems: "end" }}>req   </Text>
                                    =   AL   =   (76.20)   (177.80)   =   13548.36mm²   =   21.00in²
                                </Text>

                                <Text style={{ display: "flex", justifyContent: "start", width: "90%", marginLeft: "10%", marginBottom: "3%", paddingRight: "5%" }}>
                                    A
                                    <Text style={{ fontSize: "8px", display: "flex", alignItems: "end" }}>ran   </Text>
                                    =   A
                                    <Text style={{ fontSize: "8px", display: "flex", alignItems: "end" }}>cir   </Text>
                                    +   A
                                    <Text style={{ fontSize: "8px", display: "flex", alignItems: "end" }}>rec   </Text>
                                    =   4558.06   +   13548.36   =   18106.42mm²   =   28.06in²
                                </Text>

                                <Text style={{ display: "flex", justifyContent: "start", width: "100%", marginLeft: "10%", paddingRight: "5%", fontSize: "8px" }}>
                                Área total de 16 ranuras<Text style={{ fontSize: "6px", display: "flex", alignItems: "end" }}> (16 SLOTS TOTAL AREA).</Text>
                                </Text>

                                <Text style={{ display: "flex", justifyContent: "start", width: "90%", marginLeft: "10%", marginBottom: "2%", paddingRight: "5%", marginTop:"2%" }}>
                                    A
                                    <Text style={{ fontSize: "8px", display: "flex", alignItems: "end" }}>tot   </Text>
                                    =   16A
                                    <Text style={{ fontSize: "8px", display: "flex", alignItems: "end" }}>ran   </Text>
                                    =   (16)   (18106.42)   =   289702.65mm²   =   449.04in²
                                </Text>

                                <Text style={{ display: "flex", justifyContent: "start", width: "90%", marginBottom: "3%", paddingRight: "5%" }}>
                                    A
                                    <Text style={{ fontSize: "8px", display: "flex", alignItems: "end" }}>tot  </Text>
                                    &gt;=  A
                                    <Text style={{ fontSize: "8px", display: "flex", alignItems: "end" }}>req*      </Text>
                                    289702.65mm²   &gt;=   265040.12mm²   CUMPLE
                                </Text>
                            </View>

                        </View>


                        <View style={{ display: "flex", alignContent: "end", justifyItems: "end", border: "solid 0px black", width: "100%", height: "5%", backgroundColor: "white", flexDirection: "column" }}>
                            <View style={{ display: "flex", justifyContent: "end", width: "100%", height: "100%", fontSize: "10px", fontWeight: "bold", flexDirection: "row" }}>
                                <Text style={{ textAlign: "left", display: "flex", justifyContent: "start", height: "100%", width: "50%", paddingLeft: "10%", flex: 1 }}>
                                    SO 4043
                                </Text>
                                <Text style={{ textAlign: "right", display: "flex", flex: 1, justifyContent: "end", height: "100%", width: "50%", paddingRight: "10%" }}>
                                    11
                                </Text>
                            </View>
                        </View>

                    </View>
                </Page>
                <Page size="A4">
                    <View style={{ display: "flex", alignItems: "center", border: "solid 1.1px black", width: "100%", height: "100%", backgroundColor: "white", padding: "10px", flexDirection: "column" }}>

                        <View style={{ display: "flex", alignItems: "center", border: "solid 0px black", width: "100%", height: "100%", backgroundColor: "white", flexDirection: "column", marginBottom: "5%" }}>

                            <Text style={{ display: "flex", justifyContent: "start", alignItems: "center", width: "90%", marginLeft: "10%", marginTop: "2%", marginBottom: "3%", fontSize: "10px" }}>
                                6.   PESO DE TEE DE FLUJO AXIAL DN 750 x 600
                                <Text style={{ fontSize: "8px", alignItems: "center" }}> (NPS 30 x 24 AXIAL FLOW TEE WEIGHT).</Text>
                            </Text>

                            <View style={{ height: "3%", width: "90%", backgroundColor: "white", padding: "0px", display: "flex", flexDirection: "row", fontSize: "8px", paddingTop: "0px", paddingLeft: "0px" }}>
                                <View style={{ flex: 10 }}></View>
                                <View style={{ flex: 3, backgroundColor: "black", height: "100%", padding: "1px", display: "flex", flexDirection: "column" }}>
                                    <Text style={{ textAlign: "center", height: "100%", width: "100%", backgroundColor: "#81C1FB" }}>
                                        Cantidad
                                    </Text>
                                    <Text style={{ textAlign: "center", height: "100%", width: "100%", backgroundColor: "#81C1FB", fontSize: "7px" }}>
                                        (QUANTITY)
                                    </Text>
                                </View>
                                <View style={{ flex: 3, backgroundColor: "black", height: "100%", padding: "1px", display: "flex", flexDirection: "column", paddingLeft: "0px" }}>
                                    <Text style={{ textAlign: "center", height: "100%", width: "100%", backgroundColor: "#81C1FB" }}>
                                        Peso Unit.
                                    </Text>
                                    <Text style={{ textAlign: "center", height: "100%", width: "100%", backgroundColor: "#81C1FB", fontSize: "7px" }}>
                                        (UNIT WEIGHT)
                                    </Text>
                                </View>
                                <View style={{ flex: 3, backgroundColor: "black", height: "100%", padding: "1px", display: "flex", flexDirection: "column", paddingLeft: "0px" }}>
                                    <Text style={{ textAlign: "center", height: "100%", width: "100%", backgroundColor: "#81C1FB" }}>
                                        Peso Total
                                    </Text>
                                    <Text style={{ textAlign: "center", height: "100%", width: "100%", backgroundColor: "#81C1FB", fontSize: "7px" }}>
                                        (TOTAL WEIGHT)
                                    </Text>
                                </View>
                                <View style={{ flex: 3, backgroundColor: "black", height: "100%", padding: "1px", display: "flex", flexDirection: "column", paddingLeft: "0px" }}>
                                    <Text style={{ textAlign: "center", height: "100%", width: "100%", backgroundColor: "#81C1FB" }}>
                                        Unidad
                                    </Text>
                                    <Text style={{ textAlign: "center", height: "100%", width: "100%", backgroundColor: "#81C1FB", fontSize: "7px" }}>
                                        (UNIT)
                                    </Text>
                                </View>

                            </View>
                            <View style={{ height: "3%", width: "90%", backgroundColor: "white", padding: "0px", display: "flex", flexDirection: "row", fontSize: "8px", paddingTop: "0px", paddingLeft: "0px" }}>
                                <View style={{ flex: 10, backgroundColor: "black", height: "100%", padding: "1px", display: "flex", flexDirection: "column", paddingRight: "0px", fontSize: "9px", paddingLeft:"2px", paddingTop:"2px" }}>
                                    <Text style={{ backgroundColor: "white", height: "100%", width: "100%", padding: "3px" }}>Tee reducción principal <Text style={{ fontSize: "7px" }}>(MAIN REDUCING OUTLET TEE)</Text> </Text>
                                </View>

                                <View style={{ flex: 3, backgroundColor: "black", height: "100%", padding: "1px", display: "flex", flexDirection: "column", paddingLeft: "1px" }}>
                                    <Text style={{ textAlign: "center", height: "100%", width: "100%", backgroundColor: "white", fontSize: "9px", paddingTop: "10%" }}>
                                        1.00
                                    </Text>
                                </View>
                                <View style={{ flex: 3, backgroundColor: "black", height: "100%", padding: "1px", display: "flex", flexDirection: "column", paddingLeft: "0px" }}>
                                    <Text style={{ textAlign: "center", height: "100%", width: "100%", backgroundColor: "white", fontSize: "9px", paddingTop: "10%" }}>
                                        541.00
                                    </Text>
                                </View>
                                <View style={{ flex: 3, backgroundColor: "black", height: "100%", padding: "1px", display: "flex", flexDirection: "column", paddingLeft: "1px" }}>
                                    <Text style={{ textAlign: "center", height: "100%", width: "100%", backgroundColor: "white", fontSize: "9px", paddingTop: "10%" }}>
                                        541.00
                                    </Text>
                                </View>
                                <View style={{ flex: 3, backgroundColor: "black", height: "100%", padding: "1px", display: "flex", flexDirection: "column", paddingLeft: "0px" }}>
                                    <Text style={{ textAlign: "center", height: "100%", width: "100%", backgroundColor: "white", fontSize: "9px", paddingTop: "10%" }}>
                                        Kgs
                                    </Text>
                                </View>

                            </View>
                            <View style={{ height: "3%", width: "90%", backgroundColor: "white", padding: "0px", display: "flex", flexDirection: "row", fontSize: "8px", paddingTop: "0px", paddingLeft: "0px" }}>
                                <View style={{ flex: 10, backgroundColor: "black", height: "100%", padding: "1px", display: "flex", flexDirection: "column", paddingRight: "0px", fontSize: "9px", paddingLeft:"2px" }}>
                                    <Text style={{ backgroundColor: "white", height: "100%", width: "100%", padding: "3px" }}>Brida extremo <Text style={{ fontSize: "7px" }}>(END FLANGE)</Text> </Text>
                                </View>

                                <View style={{ flex: 3, backgroundColor: "black", height: "100%", padding: "1px", display: "flex", flexDirection: "column", paddingLeft: "1px" }}>
                                    <Text style={{ textAlign: "center", height: "100%", width: "100%", backgroundColor: "white", fontSize: "9px", paddingTop: "10%" }}>
                                        2.00
                                    </Text>
                                </View>
                                <View style={{ flex: 3, backgroundColor: "black", height: "100%", padding: "1px", display: "flex", flexDirection: "column", paddingLeft: "0px" }}>
                                    <Text style={{ textAlign: "center", height: "100%", width: "100%", backgroundColor: "white", fontSize: "9px", paddingTop: "10%" }}>
                                        130.55
                                    </Text>
                                </View>
                                <View style={{ flex: 3, backgroundColor: "black", height: "100%", padding: "1px", display: "flex", flexDirection: "column", paddingLeft: "1px" }}>
                                    <Text style={{ textAlign: "center", height: "100%", width: "100%", backgroundColor: "white", fontSize: "9px", paddingTop: "10%" }}>
                                        261.10
                                    </Text>
                                </View>
                                <View style={{ flex: 3, backgroundColor: "black", height: "100%", padding: "1px", display: "flex", flexDirection: "column", paddingLeft: "0px" }}>
                                    <Text style={{ textAlign: "center", height: "100%", width: "100%", backgroundColor: "white", fontSize: "9px", paddingTop: "10%" }}>
                                        Kgs
                                    </Text>
                                </View>

                            </View>
                            <View style={{ height: "3%", width: "90%", backgroundColor: "white", padding: "0px", display: "flex", flexDirection: "row", fontSize: "8px", paddingTop: "0px", paddingLeft: "0px" }}>
                                <View style={{ flex: 10, backgroundColor: "black", height: "100%", padding: "1px", display: "flex", flexDirection: "column", paddingRight: "0px", fontSize: "9px", paddingLeft:"2px" }}>
                                    <Text style={{ backgroundColor: "white", height: "100%", width: "100%", padding: "3px" }}>Camisa interior <Text style={{ fontSize: "7px" }}>(INNER SLEEVE)</Text> </Text>
                                </View>

                                <View style={{ flex: 3, backgroundColor: "black", height: "100%", padding: "1px", display: "flex", flexDirection: "column", paddingLeft: "1px" }}>
                                    <Text style={{ textAlign: "center", height: "100%", width: "100%", backgroundColor: "white", fontSize: "9px", paddingTop: "10%" }}>
                                        1.00
                                    </Text>
                                </View>
                                <View style={{ flex: 3, backgroundColor: "black", height: "100%", padding: "1px", display: "flex", flexDirection: "column", paddingLeft: "0px" }}>
                                    <Text style={{ textAlign: "center", height: "100%", width: "100%", backgroundColor: "white", fontSize: "9px", paddingTop: "10%" }}>
                                        263.12
                                    </Text>
                                </View>
                                <View style={{ flex: 3, backgroundColor: "black", height: "100%", padding: "1px", display: "flex", flexDirection: "column", paddingLeft: "1px" }}>
                                    <Text style={{ textAlign: "center", height: "100%", width: "100%", backgroundColor: "white", fontSize: "9px", paddingTop: "10%" }}>
                                        263.12
                                    </Text>
                                </View>
                                <View style={{ flex: 3, backgroundColor: "black", height: "100%", padding: "1px", display: "flex", flexDirection: "column", paddingLeft: "0px" }}>
                                    <Text style={{ textAlign: "center", height: "100%", width: "100%", backgroundColor: "white", fontSize: "9px", paddingTop: "10%" }}>
                                        Kgs
                                    </Text>
                                </View>

                            </View>
                            <View style={{ height: "3%", width: "90%", backgroundColor: "white", padding: "0px", display: "flex", flexDirection: "row", fontSize: "8px", paddingTop: "0px", paddingLeft: "0px" }}>
                                <View style={{ flex: 16, backgroundColor: "black", height: "100%", padding: "1px", display: "flex", flexDirection: "column", paddingRight: "0px", fontSize: "9px", paddingBottom:"2px", paddingLeft:"2px" }}>
                                    <Text style={{ backgroundColor: "white", height: "100%", width: "100%", padding: "3px" }}>Peso total aproximado <Text style={{ fontSize: "7px" }}>(APPROX. TOTAL WEIGHT)</Text> </Text>
                                </View>
                                <View style={{ flex: 3, backgroundColor: "black", height: "100%", padding: "1px", display: "flex", flexDirection: "column", paddingLeft: "1px", paddingBottom:"2px" }}>
                                    <Text style={{ textAlign: "center", height: "100%", width: "100%", backgroundColor: "white", fontSize: "9px", paddingTop: "10%" }}>
                                        1065.22
                                    </Text>
                                </View>
                                <View style={{ flex: 3, backgroundColor: "black", height: "100%", padding: "1px", display: "flex", flexDirection: "column", paddingLeft: "0px", paddingBottom:"2px" }}>
                                    <Text style={{ textAlign: "center", height: "100%", width: "100%", backgroundColor: "white", fontSize: "9px", paddingTop: "10%" }}>
                                        Kgs
                                    </Text>
                                </View>

                            </View>

                        </View>


                        <View style={{ display: "flex", alignContent: "end", justifyItems: "end", border: "solid 0px black", width: "100%", height: "5%", backgroundColor: "white", flexDirection: "column" }}>
                            <View style={{ display: "flex", justifyContent: "end", width: "100%", height: "100%", fontSize: "10px", fontWeight: "bold", flexDirection: "row" }}>
                                <Text style={{ textAlign: "left", display: "flex", justifyContent: "start", height: "100%", width: "50%", paddingLeft: "10%", flex: 1 }}>
                                    SO 4043
                                </Text>
                                <Text style={{ textAlign: "right", display: "flex", flex: 1, justifyContent: "end", height: "100%", width: "50%", paddingRight: "10%" }}>
                                    12
                                </Text>
                            </View>
                        </View>

                    </View>
                </Page>
            </Document>
        </PDFViewer>

    );
}



export default PdfTemplate;
