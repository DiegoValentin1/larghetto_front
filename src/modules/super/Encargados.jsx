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
import { AddEncargadoForm } from './SuperForms/AddEncargadoForm';
import { EditEncargadoForm } from './SuperForms/EditEncargadoForm';




export default function Encargados() {
    const [selectedObject, setSelectedObject] = useState({});
    const session = JSON.parse(localStorage.getItem('user') || null);
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
            name: 'Domicilio',
            selector: 'domicilio',
            sortable: true,
        },
        session.data.role === 'SUPER' && 
        {
            name: 'Campus',
            selector: row => row.campus.charAt(0).toUpperCase() + row.campus.slice(1),
            sortable: true,
        },
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
                        <FaEdit className='DataIcon' onClick={() => {

                            setSelectedObject(row);
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
                                <FaTrashAlt className='DataIcon' onClick={() => {
                                    changeStatus(row.user_id);
                                }} style={{ height: 20, width: 25, marginBottom: 0 }} />
                            </div>
                        )
                    }

                </div>
            ),
        },
    ];


    const [isEditing, setIsEditting] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [datos, setDatos] = useState([]);

    const changeStatus = async (id) => {
        try {
            const response = await AxiosClient({
                url: "/personal/empleado/" + id,
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
                url: "/personal/encargado",
                method: "GET",
            });
            console.log(response);
            if (!response.error) {
                const responseCamp = session.data.role === 'SUPER' ? response : response.filter(item => item.campus === session.data.campus);
                setDatos(responseCamp);
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
    const aplicarEstilosAlSiguienteDiv = () => {
        const div1 = document.querySelector('.sc-kgTSHT');
        const div2 = div1 && div1.nextElementSibling;
        if (div1) {
            console.log(div1)
            div1.style.overflowY = 'scroll';
            div1.style.height = "80%";
        }
    };
    useEffect(() => {
        cargarDatos();
    }, []);

    useEffect(()=>aplicarEstilosAlSiguienteDiv());



    return (
        < >
            <div style={{ justifyContent: 'ceneter', alignItems: "center", backgroundColor: "transparent", height: "92vh", padding: 20 }}>
                <div>
                    <div className="App">
                        <DataTable


                            title={

                                <div style={{ display: "flex", flexDirection: "row" }}>

                                    <div style={{ width: "95%", paddingTop: 3 }}>
                                        Encargados
                                    </div>

                                    <div >
                                        <FeatherIcon className='DataIcon' icon={'plus'} onClick={() => setIsOpen(true)} style={{ height: 40, width: 40 }} />
                                    </div>
                                </div>
                            }
                            columns={columns}
                            data={datos}
                            highlightOnHover
                        />
                    </div>
                </div>
            </div>


            {isOpen && <AddEncargadoForm isOpen={isOpen} cargarDatos={cargarDatos} onClose={() => setIsOpen(false)} />}
            {isEditing && <EditEncargadoForm isOpen={isEditing} cargarDatos={cargarDatos} onClose={() => setIsEditting(false)} objeto={selectedObject}/>}
        </>

    )
}
