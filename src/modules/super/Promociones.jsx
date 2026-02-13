import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component';
import { FaPlus, FaTrashAlt, FaEdit } from 'react-icons/fa'
import { MdDeleteForever } from 'react-icons/md'
import "bootstrap/dist/css/bootstrap.min.css";
import AxiosClient from "../../shared/plugins/axios";
import Alert from "../../shared/plugins/alerts";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import '../../utils/styles/DataTable.css'
import { AddBridaForm } from './SuperForms/AddInstrumentoForm';
import { EditBridaForm } from './SuperForms/EditInstrumentoForm';
import { AddPromocionForm } from './SuperForms/AddPromocionForm';
import { EditPromocionForm } from './SuperForms/EditPromocionForm';




export default function Promociones() {
    useEffect(()=>{
        console.log("Activoooo");
    }, []);
    const [selectedObject, setSelectedObject] = useState({});
    const columns = [
        {
            name: 'Promoción',
            selector: 'promocion',
            sortable: true
        },
        {
            name: 'Porcentaje de Descuento',
            selector: (row) => `${row.descuento}%`,
            sortable: true
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
            name: 'Vigencia',
            selector: row => row.vigente,
            sortable: true,
            cell: (row) => {
                // CONFIAR EN EL BACKEND - Priorizar el campo vigente
                let badge = { text: 'Sin límite', color: '#6c757d' };

                if (row.vigente === 1 || row.vigente === true) {
                    badge = { text: 'Vigente', color: '#198754' };
                } else if (row.vigente === 0 || row.vigente === false) {
                    // Solo si NO es vigente, determinamos por qué
                    const hoy = new Date();
                    const inicio = row.fecha_inicio ? new Date(row.fecha_inicio + 'T00:00:00') : null;
                    const fin = row.fecha_fin ? new Date(row.fecha_fin + 'T23:59:59') : null;

                    if (inicio && hoy < inicio) {
                        badge = { text: 'Futura', color: '#0dcaf0' };
                    } else if (fin && hoy > fin) {
                        badge = { text: 'Caducada', color: '#dc3545' };
                    }
                }

                return (
                    <span style={{
                        backgroundColor: badge.color,
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px'
                    }}>
                        {badge.text}
                    </span>
                );
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
                                changeStatus(row.id);
                            }} style={{ height: 20, width: 25, marginBottom: 0 }} />
                        </div>) : (
                            <div style={{ paddingLeft: 10 }}>
                                <FaPlus className='DataIcon' onClick={() => {
                                    changeStatus(row.id);
                                }} style={{ height: 20, width: 25, marginBottom: 0 }} />
                            </div>
                        )
                    }
                    <div style={{ paddingLeft: 10 }}>
                        <MdDeleteForever className='DataIcon' onClick={() => {
                            eliminarPermanente(row.id, row.promocion);
                        }} style={{ height: 24, width: 25, marginBottom: 0, color: '#dc3545' }} title="Eliminar permanentemente" />
                    </div>

                </div>
            ),
        },
    ];


    const [isEditing, setIsEditting] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [datos, setDatos] = useState([]);

    const eliminarPermanente = async (id, nombre) => {
        Alert.fire({
            title: '¿Eliminar Promoción Permanentemente?',
            html: `
                <p><strong>Promoción:</strong> ${nombre}</p>
                <p class="text-danger"><strong>⚠️ ADVERTENCIA:</strong> Esta acción es irreversible.</p>
                <p>Si hay alumnos usando esta promoción, solo se inactivará.</p>
            `,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await AxiosClient({
                        url: `/promocion/permanente/${id}`,
                        method: "DELETE",
                    });

                    if (response.deleted) {
                        Alert.fire({
                            title: "Eliminada",
                            text: "La promoción ha sido eliminada permanentemente",
                            icon: "success",
                        });
                    } else if (response.inactivated) {
                        Alert.fire({
                            title: "Promoción Inactivada",
                            html: `<p>${response.message}</p><p><strong>Alumnos afectados:</strong> ${response.alumnos_afectados}</p>`,
                            icon: "info",
                        });
                    }

                    cargarDatos();
                } catch (err) {
                    Alert.fire({
                        title: "ERROR",
                        text: err.response?.data?.message || "Error al eliminar la promoción",
                        icon: "error",
                    });
                }
            }
        });
    };

    const changeStatus = async (id) => {
        try {
            const response = await AxiosClient({
                url: "/promocion/" + id,
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
                url: "/promocion",
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
                                        Promociones
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


            {isOpen && <AddPromocionForm isOpen={isOpen} cargarDatos={cargarDatos} onClose={() => setIsOpen(false)} />}
            {isEditing && <EditPromocionForm isOpen={isEditing} cargarDatos={cargarDatos} onClose={() => setIsEditting(false)} objeto={selectedObject} />}
        </>

    )
}

