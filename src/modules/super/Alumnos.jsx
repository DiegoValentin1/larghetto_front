import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component';
import { FaPlus, FaTrashAlt, FaEdit } from 'react-icons/fa'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import "bootstrap/dist/css/bootstrap.min.css";
import AxiosClient from "../../shared/plugins/axios";
import Alert from "../../shared/plugins/alerts";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import '../../utils/styles/DataTable.css'
import { AddUserForm } from './SuperForms/AddAlumnoForm';
import { Edit } from 'feather-icons-react/build/IconComponents';
import { EditUserForm } from './SuperForms/EditUserForm';
import { AlumnoInfo } from './Components/AlumnoInfo';




export default function Users() {
    const [selectedObject, setSelectedObject] = useState({});
    const columns = [
        {
            name: 'Nombre',
            selector: 'name',
            sortable: true,
        },
        {
            name: 'Email',
            selector: 'email',
            sortable: true,
        },
        {
            name: 'Mensualidad',
            selector: 'mensualidad',
            sortable: true,
        },
        {
            name: 'Proximo Pago',
            selector: (row) => { return row.proximo_pago.substring(0, 10) },
            sortable: true,
        },
        {
            name: 'Instrumento',
            selector: 'instrumento',
            sortable: true,
        },
        {
            name: 'Maestro',
            selector: 'maestro',
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
                    <div style={{ paddingRight: "10px" }}>
                        <AiOutlineInfoCircle className='DataIcon' onClick={() => {

                            setSelectedObject(row);
                            console.log(row);
                            console.log(selectedObject);
                            setIsInfo(true);
                        }} style={{ height: 24, width: 25, marginBottom: 0 }} />
                    </div>
                    <div style={{ paddingRight: "0px" }}>
                        <FaEdit className='DataIcon' onClick={() => {

                            setSelectedObject(row);
                            console.log(row);
                            console.log(selectedObject);
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


    const [isEditing, setIsEditting] = useState(false);
    const [isInfo, setIsInfo] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [datos, setDatos] = useState([]);

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
                text: "asdasdas",
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
                url: "/personal/",
                method: "GET",
            });
            console.log(response);
            if (!response.error) {
                console.log(response);
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
    const aplicarEstilosAlSiguienteDiv = () => {
        const div1 = document.querySelector('.ktEZNl');
        const div2 = div1.nextElementSibling;

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
                                        Alumnos
                                    </div>

                                    <div >
                                        <FeatherIcon className='DataIcon' icon={'user-plus'} onClick={() => setIsOpen(true)} style={{ height: 40, width: 40 }} />
                                    </div>
                                </div>
                            }
                            columns={columns}
                            data={datos}
                            pagination
                            highlightOnHover
                            paginationPerPage={8}
                            paginationComponentOptions={{
                                rowsPerPageText: '',
                                noRowsPerPage: true,
                            }}
                        />
                    </div>
                </div>
            </div>


            <AddUserForm isOpen={isOpen} cargarDatos={cargarDatos} onClose={() => setIsOpen(false)} />
            <EditUserForm isOpen={isEditing} cargarDatos={cargarDatos} onClose={() => setIsEditting(false)} objeto={selectedObject} />
            <AlumnoInfo isOpen={isInfo} objeto={selectedObject} onClose={() => setIsInfo(false)} />
        </>

    )
}
