import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component';
import { Container, Card } from 'react-bootstrap';
import { FaPlus, FaTrashAlt, FaEdit } from 'react-icons/fa'
import "bootstrap/dist/css/bootstrap.min.css";
import AxiosClient from "../../shared/plugins/axios";
import Alert from "../../shared/plugins/alerts";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import '../../utils/styles/DataTable.css'
import { AddBridaForm } from './SuperForms/AddInstrumentoForm';
import { EditBridaForm } from './SuperForms/EditInstrumentoForm';




export default function SuperMaterialesBrida() {
    useEffect(()=>{
        console.log("Activoooo");
    }, []);
    const [selectedObject, setSelectedObject] = useState({});
    const columns = [
        {
            name: 'Instrumento',
            selector: 'instrumento',
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
                url: "/instrumento/" + id,
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
                url: "/instrumento",
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

    // Estilos personalizados para DataTable
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
                <Card style={{
                    borderRadius: '16px',
                    border: 'none',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    overflow: 'hidden'
                }}>
                    <Card.Body className="p-0">
                        <DataTable
                            customStyles={customTableStyles}
                            title={
                                <div style={{ padding: '1.5rem' }}>
                                    {/* Primera fila: Título y Botón agregar */}
                                    <div style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between"
                                    }}>
                                        <div style={{
                                            fontSize: "1.5rem",
                                            fontWeight: "700",
                                            color: "#1F2937"
                                        }}>
                                            Instrumentos
                                        </div>

                                        <div
                                            onClick={() => setIsOpen(true)}
                                            style={{
                                                height: 42,
                                                width: 42,
                                                borderRadius: '10px',
                                                backgroundColor: '#2563EB',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s ease',
                                                boxShadow: '0 2px 4px rgba(37, 99, 235, 0.3)',
                                                flexShrink: 0
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.backgroundColor = '#1D4ED8';
                                                e.currentTarget.style.transform = 'translateY(-2px)';
                                                e.currentTarget.style.boxShadow = '0 4px 6px rgba(37, 99, 235, 0.4)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.backgroundColor = '#2563EB';
                                                e.currentTarget.style.transform = 'translateY(0)';
                                                e.currentTarget.style.boxShadow = '0 2px 4px rgba(37, 99, 235, 0.3)';
                                            }}
                                        >
                                            <FeatherIcon
                                                icon={'plus'}
                                                style={{
                                                    height: 20,
                                                    width: 20,
                                                    color: '#FFFFFF'
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            }
                            columns={columns}
                            data={datos}
                            highlightOnHover
                            pagination
                            paginationPerPage={10}
                            paginationRowsPerPageOptions={[10, 20, 30, 50]}
                        />
                    </Card.Body>
                </Card>
            </Container>

            {/* Modales */}
            {isOpen && <AddBridaForm isOpen={isOpen} cargarDatos={cargarDatos} onClose={() => setIsOpen(false)} />}
            {isEditing && <EditBridaForm isOpen={isEditing} cargarDatos={cargarDatos} onClose={() => setIsEditting(false)} objeto={selectedObject} />}
        </>
    )
}

