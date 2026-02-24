import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component';
import { Container, Card } from 'react-bootstrap';
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
                    {row.id !== 1 && (
                        <div style={{ paddingLeft: 10 }}>
                            <MdDeleteForever className='DataIcon' onClick={() => {
                                eliminarPermanente(row.id, row.promocion);
                            }} style={{ height: 24, width: 25, marginBottom: 0, color: '#dc3545' }} title="Eliminar permanentemente" />
                        </div>
                    )}

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
                <p class="text-danger"><strong>⚠️ Esta acción es irreversible.</strong></p>
                <p>Los alumnos que tengan esta promoción serán reasignados a <strong>"Sin Promoción"</strong> automáticamente.</p>
            `,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar definitivamente',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await AxiosClient({
                        url: `/promocion/permanente/${id}`,
                        method: "DELETE",
                    });

                    if (response.eliminada) {
                        const msg = response.alumnosReasignados > 0
                            ? `Promoción eliminada. ${response.alumnosReasignados} alumno(s) reasignado(s) a "Sin Promoción".`
                            : 'La promoción ha sido eliminada permanentemente.';
                        Alert.fire({
                            title: "Eliminada",
                            text: msg,
                            icon: "success",
                        });
                    }

                    cargarDatos();
                } catch (err) {
                    Alert.fire({
                        title: "Error",
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
    useEffect(() => {
        cargarDatos();
    }, []);

    const customTableStyles = {
        headRow: {
            style: {
                backgroundColor: '#F3F4F6',
                borderBottom: '2px solid #E5E7EB',
                minHeight: '52px',
            },
        },
        headCells: {
            style: {
                color: '#1F2937',
                fontSize: '0.875rem',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                paddingLeft: '1rem',
                paddingRight: '1rem',
            },
        },
        rows: {
            style: {
                minHeight: '60px',
                fontSize: '0.875rem',
                color: '#1F2937',
                borderBottom: '1px solid #E5E7EB',
                transition: 'background-color 0.2s ease',
                '&:nth-of-type(odd)': {
                    backgroundColor: '#FFFFFF',
                },
                '&:nth-of-type(even)': {
                    backgroundColor: '#F9FAFB',
                },
            },
            highlightOnHoverStyle: {
                backgroundColor: '#F3F4F6',
                borderBottomColor: '#D1D5DB',
                outline: '1px solid #E5E7EB',
            },
        },
        cells: {
            style: {
                paddingLeft: '1rem',
                paddingRight: '1rem',
            },
        },
        pagination: {
            style: {
                borderTop: '1px solid #E5E7EB',
                backgroundColor: '#FFFFFF',
                minHeight: '56px',
            },
            pageButtonsStyle: {
                borderRadius: '8px',
                height: '36px',
                width: '36px',
                padding: '8px',
                margin: '0 4px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                backgroundColor: 'transparent',
                color: '#6B7280',
                fill: '#6B7280',
                '&:disabled': {
                    cursor: 'not-allowed',
                    color: '#D1D5DB',
                    fill: '#D1D5DB',
                },
                '&:hover:not(:disabled)': {
                    backgroundColor: '#F3F4F6',
                    color: '#1F2937',
                },
                '&:focus': {
                    outline: 'none',
                },
            },
        },
    };

    return (
        <>
            <Container fluid className="p-4" style={{ minHeight: '92vh' }}>
                <Card style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)', border: 'none' }}>
                    <Card.Body className="p-0">
                        <DataTable
                            title={
                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    padding: "1rem",
                                }}>
                                    <span style={{
                                        fontSize: "1.5rem",
                                        fontWeight: "700",
                                        color: "#1F2937"
                                    }}>
                                        Promociones
                                    </span>
                                    <button
                                        onClick={() => setIsOpen(true)}
                                        style={{
                                            backgroundColor: '#0D6EFD',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '8px',
                                            width: '42px',
                                            height: '42px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = '#0B5ED7';
                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = '#0D6EFD';
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                                        }}
                                    >
                                        <FaPlus size={18} />
                                    </button>
                                </div>
                            }
                            columns={columns}
                            data={datos}
                            highlightOnHover
                            customStyles={customTableStyles}
                            pagination
                            paginationPerPage={10}
                            paginationRowsPerPageOptions={[10, 20, 30, 50]}
                        />
                    </Card.Body>
                </Card>
            </Container>

            {isOpen && <AddPromocionForm isOpen={isOpen} cargarDatos={cargarDatos} onClose={() => setIsOpen(false)} />}
            {isEditing && <EditPromocionForm isOpen={isEditing} cargarDatos={cargarDatos} onClose={() => setIsEditting(false)} objeto={selectedObject} />}
        </>

    )
}

