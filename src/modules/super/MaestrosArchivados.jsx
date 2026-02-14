import React, { useState, useEffect, useContext } from 'react'
import DataTable from 'react-data-table-component';
import { Container, Card, Button } from 'react-bootstrap';
import { FaUndo } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import AxiosClient from "../../shared/plugins/axios";
import Alert from "../../shared/plugins/alerts";
import '../../utils/styles/DataTable.css'
import { AuthContext } from '../auth/authContext';

export default function MaestrosArchivados() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [datos, setDatos] = useState([]);
    const [datosFiltrados, setDatosFiltrados] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

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
        user.data.role === 'SUPER' &&
        {
            name: 'Campus',
            selector: row => row.campus.charAt(0).toUpperCase() + row.campus.slice(1),
            sortable: true,
        },
        {
            name: '',
            cell: (row) => (
                <div style={{ width: "100%", display: "flex", justifyContent: "end" }}>
                    <div style={{ paddingRight: 10 }}>
                        <FaUndo
                            className='DataIcon'
                            onClick={() => desarchivarMaestro(row.user_id, row.name)}
                            style={{ height: 25, width: 25, marginBottom: 0, color: '#28a745' }}
                            title="Desarchivar maestro"
                        />
                    </div>
                </div>
            ),
        },
    ];

    const desarchivarMaestro = async (id, nombre) => {
        Alert.fire({
            title: '¿Desarchivar Maestro?',
            html: `
                <p><strong>Maestro:</strong> ${nombre}</p>
                <p>El maestro volverá a aparecer en la lista principal de maestros activos.</p>
            `,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#28a745',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Sí, desarchivar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await AxiosClient({
                        url: `/personal/${id}`,
                        method: "DELETE",  // Toggle status (0 → 1)
                    });

                    if (!response.error) {
                        Alert.fire({
                            title: "Desarchivado",
                            text: "El maestro ha sido reactivado exitosamente",
                            icon: "success",
                        });
                        cargarDatos();
                    }
                } catch (err) {
                    Alert.fire({
                        title: "ERROR",
                        text: err.response?.data?.message || "Error al desarchivar el maestro",
                        icon: "error",
                    });
                }
            }
        });
    };

    const cargarDatos = async () => {
        try {
            // Determinar campus según rol
            const campusParam = user.data.role === 'SUPER'
                ? ''  // SUPER ve todos los campus
                : `?campus=${user.data.campus}`;  // ENCARGADO solo ve su campus

            const response = await AxiosClient({
                url: `/personal/teacher/archived${campusParam}`,
                method: "GET",
            });

            console.log('Maestros archivados:', response);
            if (!response.error) {
                setDatos(response);
            }
        } catch (err) {
            Alert.fire({
                title: "VERIFICAR DATOS",
                text: "Error al cargar maestros archivados",
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

    // Filtrar datos cuando cambia el searchQuery
    useEffect(() => {
        if (!searchQuery || searchQuery.trim() === '') {
            setDatosFiltrados(datos);
        } else {
            const filtered = datos.filter(maestro =>
                maestro.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                maestro.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                maestro.matricula?.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setDatosFiltrados(filtered);
        }
    }, [searchQuery, datos]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

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
                                    padding: "1rem",
                                }}>
                                    {/* Primera fila: Título y contador */}
                                    <div style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        marginBottom: "1rem"
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <span style={{
                                                fontSize: "1.5rem",
                                                fontWeight: "700",
                                                color: "#1F2937"
                                            }}>
                                                📦 Maestros Archivados
                                            </span>
                                            <span style={{
                                                fontSize: "0.875rem",
                                                color: "#6B7280",
                                                backgroundColor: "#FEE2E2",
                                                padding: "0.25rem 0.75rem",
                                                borderRadius: "12px"
                                            }}>
                                                {datosFiltrados.length} de {datos.length}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Segunda fila: Buscador y botón volver */}
                                    <div style={{
                                        display: "flex",
                                        gap: "0.75rem",
                                        alignItems: "center",
                                        justifyContent: "space-between"
                                    }}>
                                        <input
                                            type="text"
                                            placeholder="Buscar por nombre o email..."
                                            value={searchQuery}
                                            onChange={handleSearchChange}
                                            style={{
                                                flex: 1,
                                                maxWidth: "400px",
                                                height: "42px",
                                                borderRadius: "10px",
                                                border: "2px solid #E5E7EB",
                                                backgroundColor: "#F9FAFB",
                                                padding: "0 1rem",
                                                fontSize: "0.875rem",
                                                transition: "all 0.2s ease",
                                                outline: "none"
                                            }}
                                            onFocus={(e) => {
                                                e.target.style.borderColor = '#2563EB';
                                                e.target.style.backgroundColor = '#FFFFFF';
                                                e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
                                            }}
                                            onBlur={(e) => {
                                                e.target.style.borderColor = '#E5E7EB';
                                                e.target.style.backgroundColor = '#F9FAFB';
                                                e.target.style.boxShadow = 'none';
                                            }}
                                        />
                                        <Button
                                            variant="outline-secondary"
                                            onClick={() => navigate('/maestros')}
                                            style={{
                                                borderRadius: '8px',
                                                padding: '0.5rem 1rem',
                                            }}
                                        >
                                            ← Volver a Maestros
                                        </Button>
                                    </div>
                                </div>
                            }
                            columns={columns}
                            data={datosFiltrados}
                            highlightOnHover
                            customStyles={customTableStyles}
                            noDataComponent={
                                <div style={{ padding: '2rem', textAlign: 'center', color: '#6B7280' }}>
                                    <p style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                                        No hay maestros archivados
                                    </p>
                                    <p style={{ fontSize: '0.875rem' }}>
                                        Los maestros archivados aparecerán aquí
                                    </p>
                                </div>
                            }
                        />
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}
