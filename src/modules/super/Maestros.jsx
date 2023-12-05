import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component';
import { FaPlus, FaTrashAlt, FaEdit } from 'react-icons/fa'
import "bootstrap/dist/css/bootstrap.min.css";
import AxiosClient from "../../shared/plugins/axios";
import Alert from "../../shared/plugins/alerts";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import '../../utils/styles/DataTable.css'
import { AddTeeForm } from './SuperForms/AddTeeForm';
import { EditTeeForm } from './SuperForms/EditTeeForm';
import { AddMaestroForm } from './SuperForms/AddMaestroForm';
import { EditMaestroForm } from './SuperForms/EditMaestroForm';
import { AiOutlineBarChart } from 'react-icons/ai'
import { MdOutlineAttachMoney } from "react-icons/md";
import { MaestroChart } from './SuperForms/MaestroChart';
import { MaestroPayment } from './Components/MaestroPayment';




export default function SuperMaterialesTee() {
    useEffect(()=>{
        console.log("Activoooo");
    }, []);
    const [selectedObject, setSelectedObject] = useState({});
    const columns = [
        {
            name: 'Nombre',
            selector: 'name',
            sortable: true
        },
        {
            name: 'Email',
            selector: 'email',
            sortable: true,
        },
        {
            name: 'Telefono',
            selector: 'telefono',
            sortable: true,
        },
        {
            name: 'Fecha de Inicio',
            selector: (row) => row.fecha_inicio ? row.fecha_inicio.substring(0, 10) : "",
            sortable: true,
        },
        // {
        //     name: 'C. de Domicilio',
        //     selector: 'comprobante',
        //     sortable: true,
        //     cell: (row) => {
        //         if (row.comprobante) {
        //             return <div style={{ marginLeft: "0.8rem", backgroundColor: "#40DC51", padding: "0.2rem", borderRadius: "0.5rem", width: "1rem", height: "1rem" }}></div>;
        //         } else {
        //             return <div style={{ marginLeft: "0.8rem", backgroundColor: "#DC3030", padding: "0.2rem", borderRadius: "0.5rem", width: "1rem", height: "1rem" }}></div>;
        //         }
        //     }
        // },
        {
            name: 'Status',
            selector: 'status',
            sortable: true,
            cell: (row) => {
                if (row.status) {
                    return <div style={{ marginLeft: "0.8rem", backgroundColor: "#40DC51", padding: "0.2rem", borderRadius: "0.5rem", width: "1rem", height: "1rem" }}></div>;
                } else {
                    return <div style={{ marginLeft: "0.8rem", backgroundColor: "#DC3030", padding: "0.2rem", borderRadius: "0.5rem", width: "1rem", height: "1rem" }}></div>;
                }
            }
        },
        {
            name: '',
            cell: (row) => (
                <div style={{ width: "100%", display: "flex", justifyContent: "end" }}>
                    <div style={{ paddingRight: 10 }}>
                        <AiOutlineBarChart className='DataIcon' onClick={() => {
                            setSelectedObject(row);
                            setIsChart(true);
                        }} style={{ height: 25, width: 25, marginBottom: 0 }} />
                    </div>
                    <div style={{ paddingRight: 10 }}>
                        <MdOutlineAttachMoney className='DataIcon' onClick={() => {
                            setSelectedObject(row);
                            setIsPayment(true);
                        }} style={{ height: 25, width: 25, marginBottom: 0 }} />
                    </div>
                    <div style={{ paddingRight: 10 }}>
                        <FaEdit className='DataIcon' onClick={() => {

                            setSelectedObject(row);
                            filtrarInstrumentos(instrumentosMaestros.filter(objeto => objeto.maestro_id === row.user_id))

                            setIsEditting(true);
                        }} style={{ height: 20, width: 25, marginBottom: 0 }} />
                    </div>
                    {
                        row.status ? (<div style={{ paddingLeft: 10 }}>
                            <FaTrashAlt className='DataIcon' onClick={() => {
                                changeStatus(row.user_id);
                            }} style={{ height: 20, width: 25, marginBottom: 0 }} />
                        </div>) : (
                            <div style={{ paddingLeft: 10 }}>
                                <FaPlus className='DataIcon' onClick={() => {
                                    changeStatus(row.user_id);
                                }} style={{ height: 20, width: 25, marginBottom: 0 }} />
                            </div>
                        )
                    }

                </div>
            ),
        },
    ];

    const filtrarInstrumentos = (lista) => {
        setMaestroInstrumentos(lista);
    }


    const [isEditing, setIsEditting] = useState(false);
    const [isChart, setIsChart] = useState(false);
    const [isPayment, setIsPayment] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [datos, setDatos] = useState([]);
    const [instrumentosMaestros, setInstrumentosMaestros] = useState([]);
    const [maestroInstrumentos, setMaestroInstrumentos] = useState([]);

    const changeStatus = async (id) => {
        try {
            const response = await AxiosClient({
                url: "/personal/" + id,
                method: "DELETE",
            });
            if (!response.error) {
                Alert.fire({
                    title: "EXITO",
                    text: "Cambio de Status Exitoso",
                    icon: "success",
                });
                cargarDatos();
            }
        } catch (err) {
            Alert.fire({
                title: "VERIFICAR DATOS",
                text: "",
                icon: "error",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Aceptar",
            });
            console.log(err);
        }
    }

    const cargarDatos = async () => {
        try {
            const response = await AxiosClient({
                url: "/personal/teacher",
                method: "GET",
            });
            console.log(response);
            if (!response.error) {
                setDatos(response);
            }
        } catch (err) {
            Alert.fire({
                title: "VERIFICAR DATOS",
                text: "USUARIO Y/O CONTRASEÑA INCORRECTOS",
                icon: "error",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Aceptar",
            });
            console.log(err);
        }
    }

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
    }, [isEditing, isOpen]);


    const aplicarEstilosAlSiguienteDiv = () => {
        const div1 = document.querySelector('.ktEZNl');
        const div2 = div1 && div1.nextElementSibling;

        if (div2) {
            div2.style.width = '89.2%';
            div2.style.bottom = '4.5%';
            div2.style.right = '2%';
            div2.style.position = 'absolute';
        }
    };
    useEffect(() => {
        cargarDatos();
    }, []);

    useEffect(() => aplicarEstilosAlSiguienteDiv());



    return (
        < >
            <div style={{ justifyContent: 'ceneter', alignItems: "center", backgroundColor: "transparent", height: "92vh", padding: 20 }}>
                <div>
                    <div className="App">
                        <DataTable


                            title={

                                <div style={{ display: "flex", flexDirection: "row" }}>

                                    <div style={{ width: "95%", paddingTop: 3 }}>
                                        Maestros
                                    </div>

                                    <div >
                                        <FeatherIcon className='DataIcon' icon={'plus'} onClick={() => setIsOpen(true)} style={{ height: 40, width: 40 }} />
                                    </div>
                                </div>
                            }
                            columns={columns}
                            data={datos}
                            pagination
                            highlightOnHover
                            paginationPerPage={7}
                            paginationComponentOptions={{
                                rowsPerPageText: '',
                                noRowsPerPage: true,
                            }}
                        />
                    </div>
                </div>
            </div>


            {isOpen && <AddMaestroForm isOpen={isOpen} cargarDatos={cargarDatos} onClose={() => setIsOpen(false)} />}
            {isEditing && <EditMaestroForm isOpen={isEditing} cargarDatos={cargarDatos} onClose={() => setIsEditting(false)} objeto={selectedObject} maIn={maestroInstrumentos} />}
            {isChart && <MaestroChart isOpen={isChart} cargarDatos={cargarDatos} onClose={() => setIsChart(false)} objeto={selectedObject} />}
            {isPayment && <MaestroPayment isOpen={isPayment} cargarDatos={cargarDatos} onClose={() => setIsPayment(false)} objeto={selectedObject} />}
        </>

    )
}
