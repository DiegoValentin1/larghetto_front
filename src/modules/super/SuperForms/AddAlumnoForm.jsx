import React, { useEffect, useState, useContext } from 'react'
import { Button, Col, Row, Form, Modal, FormGroup } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import FeatherIcon from 'feather-icons-react'
import Select from 'react-select';
import AxiosClient from '../../../shared/plugins/axios';
import Alert, { confirmMsj, confirmTitle, succesMsj, successTitle, errorMsj, errorTitle } from '../../../shared/plugins/alerts';
import '../../../utils/styles/UserNuevoTrabajo.css';
import { AuthContext } from '../../auth/authContext';


const generateRandomLetter = () => {
    const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ'; // Exclude I, O, Q
    return letters.charAt(Math.floor(Math.random() * letters.length));
};

export const AddUserForm = ({ isOpen, cargarDatos, onClose, option }) => {
    const [menor, setMenor] = useState(false);
    const [maestros, setMaestros] = useState([]);
    const [instrumentos, setInstrumentos] = useState([]);
    const [horarios, setHorarios] = useState([]);
    const [promociones, setPromociones] = useState([]);
    const [numInstrumentos, setNumInstrumentos] = useState(1);
    const session = JSON.parse(localStorage.getItem('user') || null);
    const { user } = useContext(AuthContext);
    let schema;

    // Estilos modernos para inputs y selects
    const inputStyle = {
        height: '42px',
        borderRadius: '10px',
        border: '2px solid #E5E7EB',
        backgroundColor: '#F9FAFB',
        fontSize: '0.875rem',
        transition: 'all 0.2s ease',
    };

    const labelStyle = {
        fontSize: '0.875rem',
        fontWeight: '600',
        color: '#6B7280',
        marginBottom: '0.5rem'
    };

    // Estilos personalizados para react-select
    const customSelectStyles = {
        control: (base, state) => ({
            ...base,
            height: '42px',
            minHeight: '42px',
            borderRadius: '10px',
            border: `2px solid ${state.isFocused ? '#2563EB' : '#E5E7EB'}`,
            backgroundColor: '#F9FAFB',
            fontSize: '0.875rem',
            boxShadow: state.isFocused ? '0 0 0 3px rgba(37, 99, 235, 0.1)' : 'none',
            '&:hover': {
                border: `2px solid ${state.isFocused ? '#2563EB' : '#D1D5DB'}`
            }
        }),
        menu: (base) => ({
            ...base,
            borderRadius: '10px',
            border: '2px solid #E5E7EB',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden'
        }),
        menuList: (base) => ({
            ...base,
            padding: '0.25rem',
            maxHeight: '200px'
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused ? '#EFF6FF' : state.isSelected ? '#2563EB' : 'white',
            color: state.isSelected ? 'white' : '#1F2937',
            fontSize: '0.875rem',
            padding: '0.5rem 0.75rem',
            cursor: 'pointer',
            borderRadius: '6px',
            margin: '0.125rem 0',
            '&:active': {
                backgroundColor: '#2563EB'
            }
        }),
        placeholder: (base) => ({
            ...base,
            color: '#9CA3AF',
            fontSize: '0.875rem'
        }),
        singleValue: (base) => ({
            ...base,
            color: '#1F2937',
            fontSize: '0.875rem'
        }),
        input: (base) => ({
            ...base,
            color: '#1F2937',
            fontSize: '0.875rem'
        })
    };

    const handleInstrumentosNumber = () => {
        if (numInstrumentos < 8) {
            setNumInstrumentos(numInstrumentos + 1)
        } else {
            Alert.fire({
                title: "Limite de Instrumentos",
                text: "El limite de instrumentos permitido es de 8",
                icon: "warning",
                confirmButtonColor: "#009574",
                confirmButtonText: "Aceptar",
                cancelButtonColor: '#DD6B55',
                cancelButtonText: 'Cancelar',
                reverseButtons: true,
                backdrop: true,
                showCancelButton: true,
                showLoaderOnConfirm: true,
                allowOutsideClick: () => !Alert.isLoading,
            });
        }
    }

    useEffect(() => {
        if (menor) {
            schema = yup.object().shape({
                nombre: yup.string().required("Campo obligatorio").min(1, "Minimo 1 caracteres"),
                email: yup.string().required("Campo obligatorio").min(1, "Minimo 1 caracteres").email('Correo electrónico inválido'),
                password: yup.string().required("Campo obligatorio").min(8, "Minimo 8 caracteres"),
                fechaNacimiento: yup.string().required("Campo obligatorio"),
                nivel: yup.string().required("Obligatorio").min(1, "Minimo 1 caracteres"),
                domicilio: yup.string().required("Campo obligatorio").min(1, "Minimo 1 caracteres").max(250, "Maximo 250 caracteres"),
                municipio: yup.string().required("Campo obligatorio").min(1, "Minimo 1 caracteres"),
                telefono: yup.string().required("Campo obligatorio").min(10, 'Minimo 10 Dígitos').max(10, 'Maximo 10 Dígitos'),
                contactoEmergencia: yup.string().required("Campo obligatorio").min(10, 'Minimo 10 Dígitos').max(10, 'Maximo 10 Dígitos'),
                mensualidad: yup.string().required("Obligatorio").min(1, "Minimo 1 caracteres"),
                maestro: yup.string().required("Campo obligatorio"),
                instrumento: yup.string().required("Campo obligatorio"),
                promocion: yup.string().required("Campo obligatorio"),
                dia: yup.string().required("Campo obligatorio"),
                hora: yup.string().required("Campo obligatorio"),
                nombreMadre: yup.string().required("Campo obligatorio").min(1, "Minimo 1 caracteres"),
                madreTelefono: yup.string().required("Campo obligatorio").min(10, 'Minimo 10 Dígitos').max(10, 'Maximo 10 Dígitos'),
                nombrePadre: yup.string().required("Campo obligatorio").min(1, "Minimo 1 caracteres"),
                padreTelefono: yup.string().required("Campo obligatorio").min(10, 'Minimo 10 Dígitos').max(10, 'Maximo 10 Dígitos'),
            });
        } else {
            schema = yup.object().shape({
                nombre: yup.string().required("Campo obligatorio").min(1, "Minimo 1 caracteres"),
                email: yup.string().required("Campo obligatorio").min(1, "Minimo 1 caracteres").email('Correo electrónico inválido'),
                password: yup.string().required("Campo obligatorio").min(8, "Minimo 8 caracteres"),
                fechaNacimiento: yup.string().required("Campo obligatorio"),
                nivel: yup.string().required("Obligatorio").min(1, "Minimo 1 caracteres"),
                domicilio: yup.string().required("Campo obligatorio").min(1, "Minimo 1 caracteres").max(250, "Maximo 250 caracteres"),
                municipio: yup.string().required("Campo obligatorio").min(1, "Minimo 1 caracteres"),
                telefono: yup.string().required("Campo obligatorio").min(10, 'Minimo 10 Dígitos').max(10, 'Maximo 10 Dígitos'),
                contactoEmergencia: yup.string().required("Campo obligatorio").min(10, 'Minimo 10 Dígitos').max(10, 'Maximo 10 Dígitos'),
                mensualidad: yup.string().required("Obligatorio").min(1, "Minimo 1 caracteres"),
                maestro: yup.string().required("Campo obligatorio"),
                instrumento: yup.string().required("Campo obligatorio"),
                promocion: yup.string().required("Campo obligatorio"),
                dia: yup.string().required("Campo obligatorio"),
                hora: yup.string().required("Campo obligatorio")
            });
        }
    }, [menor]);

    const form = useFormik({
        initialValues: {
            email: "",
            role: "ALUMNO",
            nombre: "",
            fechaNacimiento: "",

        },
        validationSchema: menor ?
            yup.object().shape({
                name: yup.string().required("Campo obligatorio").matches(/^([^ ]* [^ ]*){2,}$/, "Minimo 2 espacios"),
                email: yup.string().required("Campo obligatorio").min(1, "Minimo 1 caracteres").email('Correo electrónico inválido'),
                fechaNacimiento: yup.string().required("Campo obligatorio"),
                nivel: yup.string().required("Obligatorio").min(1, "Minimo 1 caracteres"),
                domicilio: yup.string().required("Campo obligatorio").min(1, "Minimo 1 caracteres").max(250, "Maximo 250 caracteres"),
                municipio: yup.string().required("Campo obligatorio").min(1, "Minimo 1 caracteres"),
                telefono: yup.string().required("Campo obligatorio").min(10, 'Minimo 10 Dígitos').max(10, 'Maximo 10 Dígitos'),
                contactoEmergencia: yup.string().required("Campo obligatorio").min(10, 'Minimo 10 Dígitos').max(10, 'Maximo 10 Dígitos'),
                mensualidad: yup.string().required("Obligatorio").min(1, "Minimo 1 caracteres"),
                promocion: yup.string().required("Campo obligatorio"),
                nombreMadre: yup.string().required("Campo obligatorio").min(1, "Minimo 1 caracteres"),
                madreTelefono: yup.string().required("Campo obligatorio").min(10, 'Minimo 10 Dígitos').max(10, 'Maximo 10 Dígitos'),
                nombrePadre: yup.string().required("Campo obligatorio").min(1, "Minimo 1 caracteres"),
                padreTelefono: yup.string().required("Campo obligatorio").min(10, 'Minimo 10 Dígitos').max(10, 'Maximo 10 Dígitos'),
            })
            :
            yup.object().shape({
                name: yup.string().required("Campo obligatorio").matches(/^([^ ]* [^ ]*){2,}$/, "Minimo 2 espacios"),
                email: yup.string().required("Campo obligatorio").min(1, "Minimo 1 caracteres").email('Correo electrónico inválido'),
                fechaNacimiento: yup.string().required("Campo obligatorio"),
                nivel: yup.string().required("Obligatorio").min(1, "Minimo 1 caracteres"),
                domicilio: yup.string().required("Campo obligatorio").min(1, "Minimo 1 caracteres").max(250, "Maximo 250 caracteres"),
                municipio: yup.string().required("Campo obligatorio").min(1, "Minimo 1 caracteres"),
                telefono: yup.string().required("Campo obligatorio").min(10, 'Minimo 10 Dígitos').max(10, 'Maximo 10 Dígitos'),
                contactoEmergencia: yup.string().required("Campo obligatorio").min(10, 'Minimo 10 Dígitos').max(10, 'Maximo 10 Dígitos'),
                mensualidad: yup.string().required("Obligatorio").min(1, "Minimo 1 caracteres"),
                promocion: yup.string().required("Campo obligatorio"),
            }),
        onSubmit: async (values) => {
            let conteo;
            const nombres = values.name.toUpperCase().split(" ");
            var matricula;
            const cleanNames = nombres.filter(name => name.trim() !== "");

            let initials;
            if (cleanNames.length >= 2) {
                const lastNameIndex = cleanNames.length - 1;
                const secondLastNameIndex = cleanNames.length - 2;
                initials = cleanNames[secondLastNameIndex].substring(0, 1) + cleanNames[lastNameIndex].substring(0, 1);
            } else if (cleanNames.length === 1) {
                initials = cleanNames[0].substring(0, 2);
            } else {
                throw new Error("Insufficient names to generate matricula");
            }

            const year = values.fechaNacimiento.substring(2, 4);
            const month = values.fechaNacimiento.substring(5, 7);
            const randomLetter = generateRandomLetter();
            matricula = `L${initials}${year}${month}${randomLetter}`;

            const checkMatricula = async () => {
                const response = await AxiosClient({
                    method: "GET",
                    url: "/personal/matricula/check/" + matricula,
                });
                if (!response.error) {
                    return response.conteo;
                }
                return 0;
            };
            try {



            } catch (error) {
                console.log(error);
            }
            return Alert.fire({
                title: confirmTitle,
                text: confirmMsj,
                icon: "warning",
                confirmButtonColor: "#009574",
                confirmButtonText: "Aceptar",
                cancelButtonColor: '#DD6B55',
                cancelButtonText: 'Cancelar',
                reverseButtons: true,
                backdrop: true,
                html: await checkMatricula() === 0 ? "<div></div>" : `<div style="color:red">Alumno con matricula ${matricula} ya existe</div>`,
                showCancelButton: true,
                showLoaderOnConfirm: true,
                allowOutsideClick: () => !Alert.isLoading,
                preConfirm: async () => {

                    try {
                        const clases = [];

                        for (let i = 1; i <= numInstrumentos; i++) {
                            clases.push({
                                maestro: values[`maestro${i}`],
                                instrumento: values[`instrumento${i}`],
                                dia: values[`dia${i}`],
                                hora: values[`hora${i}`]
                            });
                        }
                        console.log(JSON.stringify({ ...values, role: "ALUMNO", clases, campus: session.data.campus }));
                        const response = await AxiosClient({
                            method: "POST",
                            url: "/personal/alumno",
                            data: JSON.stringify({ ...values, role: "ALUMNO", clases, campus: session.data.campus }),
                        });
                        console.log(response);
                        if (!response.error) {
                            cargarDatos();
                            Alert.fire({
                                title: successTitle,
                                text: succesMsj,
                                icon: "success",
                                confirmButtonColor: "#3085d6",
                                confirmButtonText: "Aceptar"
                            }).then((result) => {
                                if (result.isConfirmed) handleClose();
                            });
                        }
                        return response;
                    } catch (error) {
                        console.log(error);
                        Alert.fire({
                            title: errorTitle,
                            text: errorMsj,
                            icon: "error",
                            confirmButtonColor: "#3085d6",
                            confirmButtonText: "Aceptar"
                        }).then((result) => {
                            if (result.isConfirmed) handleClose();
                        });
                    }
                }
            });
        }
    });

    useEffect(() => {
        const fetchMaterial = async () => {
            const response = await AxiosClient({
                method: "GET",
                url: "/personal/teacher/active",
            });
            if (!response.error) {
                console.log(response);
                const responseCamp = user.data.role === 'SUPER' ? response : response.filter(item => item.campus === user.data.campus);
                setMaestros(responseCamp);
                return response;
            }
        };
        fetchMaterial();
    }, []);
    useEffect(() => {
        const fetchMaterial = async () => {
            const response = await AxiosClient({
                method: "GET",
                url: "/instrumento",
            });
            if (!response.error) {
                setInstrumentos(response);
                return response;
            }
        };
        fetchMaterial();
    }, []);
    useEffect(() => {
        const fetchMaterial = async () => {
            const response = await AxiosClient({
                method: "GET",
                url: "/promocion",
            });
            if (!response.error) {
                setPromociones(response);
                return response;
            }
        };
        fetchMaterial();
    }, []);

    const handleClose = () => {
        form.resetForm();
        onClose();
    }
    return <Modal
        backdrop='static'
        keyboard={false}
        show={isOpen}
        onHide={handleClose}
        size="xl"
        centered
        style={{
            backdropFilter: 'blur(4px)'
        }}
    >

        <Modal.Header
            closeButton
            style={{
                backgroundColor: '#F9FAFB',
                borderBottom: '2px solid #E5E7EB',
                padding: '1.25rem 1.5rem'
            }}
        >
            <Modal.Title style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#1F2937'
            }}>
                Agregar Alumno
            </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{
            padding: '2rem',
            backgroundColor: '#FFFFFF',
            maxHeight: '75vh',
            overflow: 'auto'
        }}>
            <Form onSubmit={form.handleSubmit}>
                <div style={{
                    fontSize: "1.25rem",
                    fontWeight: "700",
                    color: "#1F2937",
                    marginBottom: "1.5rem",
                    paddingBottom: "0.75rem",
                    borderBottom: "2px solid #E5E7EB"
                }}>
                    Datos del Alumno
                </div>
                <div className="InputContainer4-2">
                    <div className="InputContainer4" style={{ width: "100%" }}>
                        <Form.Group className='mb-3'>
                            <Form.Label htmlFor='name' style={labelStyle}>Nombre</Form.Label>
                            <Form.Control name='name' placeholder="Pablo" value={form.values.name} onChange={form.handleChange} style={inputStyle} />
                            {
                                form.errors.name && (<span className='error-text' style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.name}</span>)
                            }
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label htmlFor='fechaNacimiento' style={labelStyle}>Fecha de Nacimiento</Form.Label>
                            <Form.Control type='date' name='fechaNacimiento' placeholder="" value={form.values.fechaNacimiento} onChange={form.handleChange} style={inputStyle} />
                            {
                                form.errors.fechaNacimiento && (<span className='error-text' style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.fechaNacimiento}</span>)
                            }
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label htmlFor='email' style={labelStyle}>Email</Form.Label>
                            <Form.Control type='email' name='email' placeholder="correo@dominio.com" value={form.values.email} onChange={form.handleChange} style={inputStyle} />
                            {
                                form.errors.email && (<span className='error-text' style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.email}</span>)
                            }
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="promocion" style={labelStyle}>Promocion</Form.Label>
                            <Form.Select
                                name="promocion"
                                value={form.values.promocion}
                                onChange={form.handleChange}
                                style={inputStyle}
                            >
                                <option value="">Selecciona una Promocion</option>
                                {promociones.map((item) => item.status ? (
                                    <option key={item.id} value={item.id}>
                                        {item.promocion}
                                    </option>
                                ) : null)}
                            </Form.Select>
                            {form.errors.promocion && (
                                <span className="error-text" style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.promocion}</span>
                            )}
                        </Form.Group>
                    </div>
                </div>
                <div className="InputContainer4-2">
                    <div className="InputContainer4" style={{ width: "100%" }}>
                        <Form.Group className='mb-3'>
                            <Form.Label htmlFor='nivel' style={labelStyle}>Nivel</Form.Label>
                            <Form.Control name='nivel' placeholder="1" value={form.values.nivel} onChange={form.handleChange} style={inputStyle} />
                            {
                                form.errors.nivel && (<span className='error-text' style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.nivel}</span>)
                            }
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label htmlFor='mensualidad' style={labelStyle}>Mensualidad</Form.Label>
                            <Form.Control name='mensualidad' placeholder="0" value={form.values.mensualidad} onChange={form.handleChange} style={inputStyle} />
                            {
                                form.errors.mensualidad && (<span className='error-text' style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.mensualidad}</span>)
                            }
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label htmlFor='inscripcion' style={labelStyle}>Inscripción</Form.Label>
                            <Form.Control name='inscripcion' placeholder="0" value={form.values.inscripcion} onChange={form.handleChange} style={inputStyle} />
                            {
                                form.errors.inscripcion && (<span className='error-text' style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.inscripcion}</span>)
                            }
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label htmlFor='fechaInicio' style={labelStyle}>Fecha de Inicio</Form.Label>
                            <Form.Control type='date' name='fechaInicio' placeholder="" value={form.values.fechaInicio} onChange={form.handleChange} style={inputStyle} />
                            {
                                form.errors.fechaInicio && (<span className='error-text' style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.fechaInicio}</span>)
                            }
                        </Form.Group>
                    </div>

                </div>
                <div className="InputContainer4" style={{ height: "50%" }}>
                    <Form.Group className='mb-3'>
                        <Form.Label htmlFor='domicilio' style={labelStyle}>Domicilio</Form.Label>
                        <Form.Control name='domicilio' placeholder="Calle #34" value={form.values.domicilio} onChange={form.handleChange} style={inputStyle} />
                        {
                            form.errors.domicilio && (<span className='error-text' style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.domicilio}</span>)
                        }
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label htmlFor='municipio' style={labelStyle}>Municipio</Form.Label>
                        <Form.Control name='municipio' placeholder="Temixco" value={form.values.municipio} onChange={form.handleChange} style={inputStyle} />
                        {
                            form.errors.municipio && (<span className='error-text' style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.municipio}</span>)
                        }
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label htmlFor='telefono' style={labelStyle}>Telefono</Form.Label>
                        <Form.Control type='number' min={0} onWheel={(e) => e.target.blur()} name='telefono' placeholder="7771234567" value={form.values.telefono} onChange={form.handleChange} style={inputStyle} />
                        {
                            form.errors.telefono && (<span className='error-text' style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.telefono}</span>)
                        }
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label htmlFor='contactoEmergencia' style={labelStyle}>Contacto de Emergencia</Form.Label>
                        <Form.Control type='number' min={0} onWheel={(e) => e.target.blur()} name='contactoEmergencia' placeholder="7777654321" value={form.values.contactoEmergencia} onChange={form.handleChange} style={inputStyle} />
                        {
                            form.errors.contactoEmergencia && (<span className='error-text' style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.contactoEmergencia}</span>)
                        }
                    </Form.Group>
                </div>
                <div className="InputTextArea" style={{ width: "100%" }}>

                    <Form.Group className='mb-3 AlumnoGroupTextArea'>
                        <Form.Label htmlFor='observaciones' style={labelStyle}>Observaciones</Form.Label>
                        <Form.Control
                            as='textarea'
                            name='observaciones'
                            placeholder="Escriba las observaciones"
                            value={form.values.observaciones}
                            onChange={form.handleChange}
                            style={{
                                minHeight: '100px',
                                borderRadius: '10px',
                                border: '2px solid #E5E7EB',
                                backgroundColor: '#F9FAFB',
                                fontSize: '0.875rem',
                                transition: 'all 0.2s ease',
                                padding: '0.75rem'
                            }}
                        />
                        {
                            form.errors.observaciones && (<span className='error-text' style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.observaciones}</span>)
                        }
                    </Form.Group>
                </div>
                <div style={{
                    fontSize: "1.25rem",
                    fontWeight: "700",
                    color: "#1F2937",
                    marginBottom: "1.5rem",
                    marginTop: "2rem",
                    paddingBottom: "0.75rem",
                    borderBottom: "2px solid #E5E7EB",
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem"
                }}>
                    <div style={{ flex: "1" }}>Instrumentos</div>
                    <button
                        type="button"
                        onClick={() => numInstrumentos > 1 && setNumInstrumentos(numInstrumentos - 1)}
                        disabled={numInstrumentos === 1}
                        style={{
                            backgroundColor: numInstrumentos === 1 ? '#D1D5DB' : '#EF4444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '0.5rem 1rem',
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            cursor: numInstrumentos === 1 ? 'not-allowed' : 'pointer',
                            transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                            if (numInstrumentos > 1) {
                                e.currentTarget.style.backgroundColor = '#DC2626';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (numInstrumentos > 1) {
                                e.currentTarget.style.backgroundColor = '#EF4444';
                            }
                        }}
                    >
                        Disminuir Instrumentos
                    </button>
                    <button
                        type="button"
                        onClick={() => handleInstrumentosNumber()}
                        style={{
                            backgroundColor: '#10B981',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '0.5rem 1rem',
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#059669';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#10B981';
                        }}
                    >
                        Añadir Instrumentos
                    </button>
                </div>
                <div className="InputContainer4" style={{ height: "100%" }}>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="maestro" style={labelStyle}>Maestro</Form.Label>
                        <Select
                            name="maestro1"
                            value={maestros.find(m => m.user_id === form.values.maestro1) ? {
                                value: maestros.find(m => m.user_id === form.values.maestro1).user_id,
                                label: maestros.find(m => m.user_id === form.values.maestro1).name
                            } : null}
                            onChange={(selectedOption) => {
                                form.setFieldValue('maestro1', selectedOption ? selectedOption.value : '');
                            }}
                            options={maestros.map(item => ({
                                value: item.user_id,
                                label: item.name
                            }))}
                            styles={customSelectStyles}
                            placeholder="Buscar maestro..."
                            isClearable
                            noOptionsMessage={() => "No se encontraron maestros"}
                        />
                        {form.errors.maestro1 && (
                            <span className="error-text" style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.maestro1}</span>
                        )}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="instrumento" style={labelStyle}>Instrumento</Form.Label>
                        <Form.Select
                            name="instrumento1"
                            value={form.values.instrumento1}
                            onChange={form.handleChange}
                            style={inputStyle}
                        >
                            <option value="">Selecciona un Instrumento</option>
                            {instrumentos.map((item) => item.status ? (
                                <option key={item.id} value={item.id}>
                                    {item.instrumento}
                                </option>
                            ) : null)}
                        </Form.Select>
                        {form.errors.instrumento1 && (
                            <span className="error-text" style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.instrumento1}</span>
                        )}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="dia" style={labelStyle}>Día</Form.Label>
                        <Form.Select
                            name="dia1"
                            value={form.values.dia1}
                            onChange={form.handleChange}
                            style={inputStyle}
                        >
                            <option value="">Selecciona un Día</option>
                            <option value="Lunes">Lunes</option>
                            <option value="Martes">Martes</option>
                            <option value="Miercoles">Miercoles</option>
                            <option value="Jueves">Jueves</option>
                            <option value="Viernes">Viernes</option>
                            <option value="Sabado">Sabado</option>
                            <option value="Domingo">Domingo</option>
                        </Form.Select>
                        {form.errors.dia1 && (
                            <span className="error-text" style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.dia1}</span>
                        )}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="hora" style={labelStyle}>Horario</Form.Label>
                        <Form.Select
                            name="hora1"
                            value={form.values.hora1}
                            onChange={form.handleChange}
                            style={inputStyle}
                        >
                            <option value="">Selecciona un Horario</option>
                            <option value="08:00">08:00</option>
                            <option value="09:00">09:00</option>
                            <option value="10:00">10:00</option>
                            <option value="11:00">11:00</option>
                            <option value="12:00">12:00</option>
                            <option value="13:00">13:00</option>
                            <option value="14:00">14:00</option>
                            <option value="15:00">15:00</option>
                            <option value="16:00">16:00</option>
                            <option value="17:00">17:00</option>
                            <option value="18:00">18:00</option>
                        </Form.Select>
                        {form.errors.hora1 && (
                            <span className="error-text" style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.hora1}</span>
                        )}
                    </Form.Group>
                </div>
                {
                    numInstrumentos > 1 &&
                    <div className="InputContainer4-2">
                        <div className="InputContainer4" style={{ width: "100%" }}>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="maestro" style={labelStyle}>Maestro</Form.Label>
                                <Select
                                    name="maestro2"
                                    value={maestros.find(m => m.user_id === form.values.maestro2) ? {
                                        value: maestros.find(m => m.user_id === form.values.maestro2).user_id,
                                        label: maestros.find(m => m.user_id === form.values.maestro2).name
                                    } : null}
                                    onChange={(selectedOption) => {
                                        form.setFieldValue('maestro2', selectedOption ? selectedOption.value : '');
                                    }}
                                    options={maestros.map(item => ({ value: item.user_id, label: item.name }))}
                                    styles={customSelectStyles}
                                    placeholder="Buscar maestro..."
                                    isClearable
                                    noOptionsMessage={() => "No se encontraron maestros"}
                                />
                                {form.errors.maestro2 && (<span className="error-text" style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.maestro2}</span>)}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="instrumento" style={labelStyle}>Instrumento</Form.Label>
                                <Form.Select name="instrumento2" value={form.values.instrumento2} onChange={form.handleChange} style={inputStyle}>
                                    <option value="">Selecciona un Instrumento</option>
                                    {instrumentos.map((item) => (
                                        <option key={item.id} value={item.id}>{item.instrumento}</option>
                                    ))}
                                </Form.Select>
                                {form.errors.instrumento2 && (<span className="error-text" style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.instrumento2}</span>)}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="dia" style={labelStyle}>Día</Form.Label>
                                <Form.Select name="dia2" value={form.values.dia2} onChange={form.handleChange} style={inputStyle}>
                                    <option value="">Selecciona un Día</option>
                                    <option value="Lunes">Lunes</option>
                                    <option value="Martes">Martes</option>
                                    <option value="Miercoles">Miercoles</option>
                                    <option value="Jueves">Jueves</option>
                                    <option value="Viernes">Viernes</option>
                                    <option value="Sabado">Sabado</option>
                                    <option value="Domingo">Domingo</option>
                                </Form.Select>
                                {form.errors.dia2 && (<span className="error-text" style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.dia2}</span>)}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="hora" style={labelStyle}>Horario</Form.Label>
                                <Form.Select name="hora2" value={form.values.hora2} onChange={form.handleChange} style={inputStyle}>
                                    <option value="">Selecciona un Horario</option>
                                    <option value="08:00">08:00</option>
                                    <option value="09:00">09:00</option>
                                    <option value="10:00">10:00</option>
                                    <option value="11:00">11:00</option>
                                    <option value="12:00">12:00</option>
                                    <option value="13:00">13:00</option>
                                    <option value="14:00">14:00</option>
                                    <option value="15:00">15:00</option>
                                    <option value="16:00">16:00</option>
                                    <option value="17:00">17:00</option>
                                    <option value="18:00">18:00</option>
                                </Form.Select>
                                {form.errors.hora2 && (<span className="error-text" style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.hora2}</span>)}
                            </Form.Group>
                        </div>
                    </div>
                }
                {
                    numInstrumentos > 2 &&
                    <div className="InputContainer4-2">
                        <div className="InputContainer4" style={{ width: "100%" }}>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="maestro" style={labelStyle}>Maestro</Form.Label>
                                <Select
                                    name="maestro3"
                                    value={maestros.find(m => m.user_id === form.values.maestro3) ? {
                                        value: maestros.find(m => m.user_id === form.values.maestro3).user_id,
                                        label: maestros.find(m => m.user_id === form.values.maestro3).name
                                    } : null}
                                    onChange={(selectedOption) => {
                                        form.setFieldValue('maestro3', selectedOption ? selectedOption.value : '');
                                    }}
                                    options={maestros.map(item => ({ value: item.user_id, label: item.name }))}
                                    styles={customSelectStyles}
                                    placeholder="Buscar maestro..."
                                    isClearable
                                    noOptionsMessage={() => "No se encontraron maestros"}
                                />
                                {form.errors.maestro3 && (<span className="error-text" style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.maestro3}</span>)}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="instrumento" style={labelStyle}>Instrumento</Form.Label>
                                <Form.Select
                                    style={inputStyle}
                                    name="instrumento3"
                                        value={form.values.instrumento3}
                                        onChange={form.handleChange}
                                    >
                                        <option value="">Selecciona un Instrumento</option>
                                        {instrumentos.map((item) => (
                                            <option key={item.id} value={item.id}>
                                                {item.instrumento}
                                            </option>
                                        ))}
                                    </Form.Select>
                                {form.errors.instrumento3 && (<span className="error-text" style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.instrumento3}</span>)}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="dia" style={labelStyle}>Día</Form.Label>
                                <Form.Select
                                    style={inputStyle}
                                    name="dia3"
                                        value={form.values.dia3}
                                        onChange={form.handleChange}
                                    >
                                        <option value="">Selecciona un Día</option>
                                        <option value="Lunes">Lunes</option>
                                        <option value="Martes">Martes</option>
                                        <option value="Miercoles">Miercoles</option>
                                        <option value="Jueves">Jueves</option>
                                        <option value="Viernes">Viernes</option>
                                        <option value="Sabado">Sabado</option>
                                        <option value="Domingo">Domingo</option>
                                    </Form.Select>
                                {form.errors.dia3 && (
                                    <span className="error-text">{form.errors.dia3}</span>
                                )}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="hora" style={labelStyle}>Horario</Form.Label>
                                <Form.Select
                                    style={inputStyle}
                                    name="hora3"
                                        value={form.values.hora3}
                                        onChange={form.handleChange}
                                    >
                                        <option value="">Selecciona un Horario</option>
                                        <option value="08:00">08:00</option>
                                        <option value="09:00">09:00</option>
                                        <option value="10:00">10:00</option>
                                        <option value="11:00">11:00</option>
                                        <option value="12:00">12:00</option>
                                        <option value="13:00">13:00</option>
                                        <option value="14:00">14:00</option>
                                        <option value="15:00">15:00</option>
                                        <option value="16:00">16:00</option>
                                        <option value="17:00">17:00</option>
                                        <option value="18:00">18:00</option>
                                    </Form.Select>
                                {form.errors.hora3 && (
                                    <span className="error-text">{form.errors.hora3}</span>
                                )}
                            </Form.Group>
                        </div>
                    </div>
                }
                {
                    numInstrumentos > 3 &&
                    <div className="InputContainer4-2">
                        <div className="InputContainer4" style={{ width: "100%" }}>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="maestro" style={labelStyle}>Maestro</Form.Label>
                                <Select
                                    name="maestro4"
                                    value={maestros.find(m => m.user_id === form.values.maestro4) ? {
                                        value: maestros.find(m => m.user_id === form.values.maestro4).user_id,
                                        label: maestros.find(m => m.user_id === form.values.maestro4).name
                                    } : null}
                                    onChange={(selectedOption) => {
                                        form.setFieldValue('maestro4', selectedOption ? selectedOption.value : '');
                                    }}
                                    options={maestros.map(item => ({ value: item.user_id, label: item.name }))}
                                    styles={customSelectStyles}
                                    placeholder="Buscar maestro..."
                                    isClearable
                                    noOptionsMessage={() => "No se encontraron maestros"}
                                />
                                {form.errors.maestro4 && (<span className="error-text" style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.maestro4}</span>)}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="instrumento" style={labelStyle}>Instrumento</Form.Label>
                                <Form.Select
                                    style={inputStyle}
                                    name="instrumento4"
                                        value={form.values.instrumento4}
                                        onChange={form.handleChange}
                                    >
                                        <option value="">Selecciona un Instrumento</option>
                                        {instrumentos.map((item) => (
                                            <option key={item.id} value={item.id}>
                                                {item.instrumento}
                                            </option>
                                        ))}
                                    </Form.Select>
                                {form.errors.instrumento4 && (
                                    <span className="error-text">{form.errors.instrumento4}</span>
                                )}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="dia" style={labelStyle}>Día</Form.Label>
                                <Form.Select
                                    style={inputStyle}
                                    name="dia4"
                                        value={form.values.dia4}
                                        onChange={form.handleChange}
                                    >
                                        <option value="">Selecciona un Día</option>
                                        <option value="Lunes">Lunes</option>
                                        <option value="Martes">Martes</option>
                                        <option value="Miercoles">Miercoles</option>
                                        <option value="Jueves">Jueves</option>
                                        <option value="Viernes">Viernes</option>
                                        <option value="Sabado">Sabado</option>
                                        <option value="Domingo">Domingo</option>
                                    </Form.Select>
                                {form.errors.dia4 && (
                                    <span className="error-text">{form.errors.dia4}</span>
                                )}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="hora" style={labelStyle}>Horario</Form.Label>
                                <Form.Select
                                    style={inputStyle}
                                    name="hora4"
                                        value={form.values.hora4}
                                        onChange={form.handleChange}
                                    >
                                        <option value="">Selecciona un Horario</option>
                                        <option value="08:00">08:00</option>
                                        <option value="09:00">09:00</option>
                                        <option value="10:00">10:00</option>
                                        <option value="11:00">11:00</option>
                                        <option value="12:00">12:00</option>
                                        <option value="13:00">13:00</option>
                                        <option value="14:00">14:00</option>
                                        <option value="15:00">15:00</option>
                                        <option value="16:00">16:00</option>
                                        <option value="17:00">17:00</option>
                                        <option value="18:00">18:00</option>
                                    </Form.Select>
                                {form.errors.hora4 && (
                                    <span className="error-text">{form.errors.hora4}</span>
                                )}
                            </Form.Group>
                        </div>
                    </div>
                }
                {
                    numInstrumentos > 4 &&
                    <div className="InputContainer4-2">
                        <div className="InputContainer4" style={{ width: "100%" }}>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="maestro" style={labelStyle}>Maestro</Form.Label>
                                <Select
                                    name="maestro5"
                                    value={maestros.find(m => m.user_id === form.values.maestro5) ? {
                                        value: maestros.find(m => m.user_id === form.values.maestro5).user_id,
                                        label: maestros.find(m => m.user_id === form.values.maestro5).name
                                    } : null}
                                    onChange={(selectedOption) => {
                                        form.setFieldValue('maestro5', selectedOption ? selectedOption.value : '');
                                    }}
                                    options={maestros.map(item => ({ value: item.user_id, label: item.name }))}
                                    styles={customSelectStyles}
                                    placeholder="Buscar maestro..."
                                    isClearable
                                    noOptionsMessage={() => "No se encontraron maestros"}
                                />
                                {form.errors.maestro5 && (<span className="error-text" style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.maestro5}</span>)}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="instrumento" style={labelStyle}>Instrumento</Form.Label>
                                <Form.Select
                                    style={inputStyle}
                                    name="instrumento5"
                                        value={form.values.instrumento5}
                                        onChange={form.handleChange}
                                    >
                                        <option value="">Selecciona un Instrumento</option>
                                        {instrumentos.map((item) => (
                                            <option key={item.id} value={item.id}>
                                                {item.instrumento}
                                            </option>
                                        ))}
                                    </Form.Select>
                                {form.errors.instrumento5 && (
                                    <span className="error-text">{form.errors.instrumento5}</span>
                                )}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="dia" style={labelStyle}>Día</Form.Label>
                                <Form.Select
                                    style={inputStyle}
                                    name="dia5"
                                        value={form.values.dia5}
                                        onChange={form.handleChange}
                                    >
                                        <option value="">Selecciona un Día</option>
                                        <option value="Lunes">Lunes</option>
                                        <option value="Martes">Martes</option>
                                        <option value="Miercoles">Miercoles</option>
                                        <option value="Jueves">Jueves</option>
                                        <option value="Viernes">Viernes</option>
                                        <option value="Sabado">Sabado</option>
                                        <option value="Domingo">Domingo</option>
                                    </Form.Select>
                                {form.errors.dia5 && (
                                    <span className="error-text">{form.errors.dia5}</span>
                                )}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="hora" style={labelStyle}>Horario</Form.Label>
                                <Form.Select
                                    style={inputStyle}
                                    name="hora5"
                                        value={form.values.hora5}
                                        onChange={form.handleChange}
                                    >
                                        <option value="">Selecciona un Horario</option>
                                        <option value="08:00">08:00</option>
                                        <option value="09:00">09:00</option>
                                        <option value="10:00">10:00</option>
                                        <option value="11:00">11:00</option>
                                        <option value="12:00">12:00</option>
                                        <option value="13:00">13:00</option>
                                        <option value="14:00">14:00</option>
                                        <option value="15:00">15:00</option>
                                        <option value="16:00">16:00</option>
                                        <option value="17:00">17:00</option>
                                        <option value="18:00">18:00</option>
                                    </Form.Select>
                                {form.errors.hora5 && (
                                    <span className="error-text">{form.errors.hora5}</span>
                                )}
                            </Form.Group>
                        </div>
                    </div>
                }
                {
                    numInstrumentos > 5 &&
                    <div className="InputContainer4-2">
                        <div className="InputContainer4" style={{ width: "100%" }}>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="maestro" style={labelStyle}>Maestro</Form.Label>
                                <Select
                                    name="maestro6"
                                    value={maestros.find(m => m.user_id === form.values.maestro6) ? {
                                        value: maestros.find(m => m.user_id === form.values.maestro6).user_id,
                                        label: maestros.find(m => m.user_id === form.values.maestro6).name
                                    } : null}
                                    onChange={(selectedOption) => {
                                        form.setFieldValue('maestro6', selectedOption ? selectedOption.value : '');
                                    }}
                                    options={maestros.map(item => ({ value: item.user_id, label: item.name }))}
                                    styles={customSelectStyles}
                                    placeholder="Buscar maestro..."
                                    isClearable
                                    noOptionsMessage={() => "No se encontraron maestros"}
                                />
                                {form.errors.maestro6 && (<span className="error-text" style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.maestro6}</span>)}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="instrumento" style={labelStyle}>Instrumento</Form.Label>
                                <Form.Select
                                    style={inputStyle}
                                    name="instrumento6"
                                        value={form.values.instrumento6}
                                        onChange={form.handleChange}
                                    >
                                        <option value="">Selecciona un Instrumento</option>
                                        {instrumentos.map((item) => (
                                            <option key={item.id} value={item.id}>
                                                {item.instrumento}
                                            </option>
                                        ))}
                                    </Form.Select>
                                {form.errors.instrumento6 && (
                                    <span className="error-text">{form.errors.instrumento6}</span>
                                )}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="dia" style={labelStyle}>Día</Form.Label>
                                <Form.Select
                                    style={inputStyle}
                                    name="dia6"
                                        value={form.values.dia6}
                                        onChange={form.handleChange}
                                    >
                                        <option value="">Selecciona un Día</option>
                                        <option value="Lunes">Lunes</option>
                                        <option value="Martes">Martes</option>
                                        <option value="Miercoles">Miercoles</option>
                                        <option value="Jueves">Jueves</option>
                                        <option value="Viernes">Viernes</option>
                                        <option value="Sabado">Sabado</option>
                                        <option value="Domingo">Domingo</option>
                                    </Form.Select>
                                {form.errors.dia6 && (
                                    <span className="error-text">{form.errors.dia6}</span>
                                )}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="hora" style={labelStyle}>Horario</Form.Label>
                                <Form.Select
                                    style={inputStyle}
                                    name="hora6"
                                        value={form.values.hora6}
                                        onChange={form.handleChange}
                                    >
                                        <option value="">Selecciona un Horario</option>
                                        <option value="08:00">08:00</option>
                                        <option value="09:00">09:00</option>
                                        <option value="10:00">10:00</option>
                                        <option value="11:00">11:00</option>
                                        <option value="12:00">12:00</option>
                                        <option value="13:00">13:00</option>
                                        <option value="14:00">14:00</option>
                                        <option value="15:00">15:00</option>
                                        <option value="16:00">16:00</option>
                                        <option value="17:00">17:00</option>
                                        <option value="18:00">18:00</option>
                                    </Form.Select>
                                {form.errors.hora6 && (
                                    <span className="error-text">{form.errors.hora6}</span>
                                )}
                            </Form.Group>
                        </div>
                    </div>
                }
                {
                    numInstrumentos > 6 &&
                    <div className="InputContainer4-2">
                        <div className="InputContainer4" style={{ width: "100%" }}>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="maestro" style={labelStyle}>Maestro</Form.Label>
                                <Select
                                    name="maestro7"
                                    value={maestros.find(m => m.user_id === form.values.maestro7) ? {
                                        value: maestros.find(m => m.user_id === form.values.maestro7).user_id,
                                        label: maestros.find(m => m.user_id === form.values.maestro7).name
                                    } : null}
                                    onChange={(selectedOption) => {
                                        form.setFieldValue('maestro7', selectedOption ? selectedOption.value : '');
                                    }}
                                    options={maestros.map(item => ({ value: item.user_id, label: item.name }))}
                                    styles={customSelectStyles}
                                    placeholder="Buscar maestro..."
                                    isClearable
                                    noOptionsMessage={() => "No se encontraron maestros"}
                                />
                                {form.errors.maestro7 && (<span className="error-text" style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.maestro7}</span>)}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="instrumento" style={labelStyle}>Instrumento</Form.Label>
                                <Form.Select
                                    style={inputStyle}
                                    name="instrumento7"
                                        value={form.values.instrumento7}
                                        onChange={form.handleChange}
                                    >
                                        <option value="">Selecciona un Instrumento</option>
                                        {instrumentos.map((item) => (
                                            <option key={item.id} value={item.id}>
                                                {item.instrumento}
                                            </option>
                                        ))}
                                    </Form.Select>
                                {form.errors.instrumento7 && (
                                    <span className="error-text">{form.errors.instrumento7}</span>
                                )}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="dia" style={labelStyle}>Día</Form.Label>
                                <Form.Select
                                    style={inputStyle}
                                    name="dia7"
                                        value={form.values.dia7}
                                        onChange={form.handleChange}
                                    >
                                        <option value="">Selecciona un Día</option>
                                        <option value="Lunes">Lunes</option>
                                        <option value="Martes">Martes</option>
                                        <option value="Miercoles">Miercoles</option>
                                        <option value="Jueves">Jueves</option>
                                        <option value="Viernes">Viernes</option>
                                        <option value="Sabado">Sabado</option>
                                        <option value="Domingo">Domingo</option>
                                    </Form.Select>
                                {form.errors.dia7 && (
                                    <span className="error-text">{form.errors.dia7}</span>
                                )}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="hora" style={labelStyle}>Horario</Form.Label>
                                <Form.Select
                                    style={inputStyle}
                                    name="hora7"
                                        value={form.values.hora7}
                                        onChange={form.handleChange}
                                    >
                                        <option value="">Selecciona un Horario</option>
                                        <option value="08:00">08:00</option>
                                        <option value="09:00">09:00</option>
                                        <option value="10:00">10:00</option>
                                        <option value="11:00">11:00</option>
                                        <option value="12:00">12:00</option>
                                        <option value="13:00">13:00</option>
                                        <option value="14:00">14:00</option>
                                        <option value="15:00">15:00</option>
                                        <option value="16:00">16:00</option>
                                        <option value="17:00">17:00</option>
                                        <option value="18:00">18:00</option>
                                    </Form.Select>
                                {form.errors.hora7 && (
                                    <span className="error-text">{form.errors.hora7}</span>
                                )}
                            </Form.Group>
                        </div>
                    </div>
                }
                {
                    numInstrumentos > 7 &&
                    <div className="InputContainer4-2">
                        <div className="InputContainer4" style={{ width: "100%" }}>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="maestro" style={labelStyle}>Maestro</Form.Label>
                                <Select
                                    name="maestro8"
                                    value={maestros.find(m => m.user_id === form.values.maestro8) ? {
                                        value: maestros.find(m => m.user_id === form.values.maestro8).user_id,
                                        label: maestros.find(m => m.user_id === form.values.maestro8).name
                                    } : null}
                                    onChange={(selectedOption) => {
                                        form.setFieldValue('maestro8', selectedOption ? selectedOption.value : '');
                                    }}
                                    options={maestros.map(item => ({ value: item.user_id, label: item.name }))}
                                    styles={customSelectStyles}
                                    placeholder="Buscar maestro..."
                                    isClearable
                                    noOptionsMessage={() => "No se encontraron maestros"}
                                />
                                {form.errors.maestro8 && (<span className="error-text" style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.maestro8}</span>)}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="instrumento" style={labelStyle}>Instrumento</Form.Label>
                                <Form.Select
                                    style={inputStyle}
                                    name="instrumento8"
                                        value={form.values.instrumento8}
                                        onChange={form.handleChange}
                                    >
                                        <option value="">Selecciona un Instrumento</option>
                                        {instrumentos.map((item) => (
                                            <option key={item.id} value={item.id}>
                                                {item.instrumento}
                                            </option>
                                        ))}
                                    </Form.Select>
                                {form.errors.instrumento8 && (
                                    <span className="error-text">{form.errors.instrumento8}</span>
                                )}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="dia" style={labelStyle}>Día</Form.Label>
                                <Form.Select
                                    style={inputStyle}
                                    name="dia8"
                                        value={form.values.dia8}
                                        onChange={form.handleChange}
                                    >
                                        <option value="">Selecciona un Día</option>
                                        <option value="Lunes">Lunes</option>
                                        <option value="Martes">Martes</option>
                                        <option value="Miercoles">Miercoles</option>
                                        <option value="Jueves">Jueves</option>
                                        <option value="Viernes">Viernes</option>
                                        <option value="Sabado">Sabado</option>
                                        <option value="Domingo">Domingo</option>
                                    </Form.Select>
                                {form.errors.dia8 && (
                                    <span className="error-text">{form.errors.dia8}</span>
                                )}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="hora" style={labelStyle}>Horario</Form.Label>
                                <Form.Select
                                    style={inputStyle}
                                    name="hora8"
                                        value={form.values.hora8}
                                        onChange={form.handleChange}
                                    >
                                        <option value="">Selecciona un Horario</option>
                                        <option value="08:00">08:00</option>
                                        <option value="09:00">09:00</option>
                                        <option value="10:00">10:00</option>
                                        <option value="11:00">11:00</option>
                                        <option value="12:00">12:00</option>
                                        <option value="13:00">13:00</option>
                                        <option value="14:00">14:00</option>
                                        <option value="15:00">15:00</option>
                                        <option value="16:00">16:00</option>
                                        <option value="17:00">17:00</option>
                                        <option value="18:00">18:00</option>
                                    </Form.Select>
                                {form.errors.hora8 && (
                                    <span className="error-text">{form.errors.hora8}</span>
                                )}
                            </Form.Group>
                        </div>
                    </div>
                }



                {/* <div className="InputContainer4-2">
                  <div className="InputContainer5">

                  </div>
              </div> */}
                {
                    menor &&
                    <div style={{
                        fontSize: "1.25rem",
                        fontWeight: "700",
                        color: "#1F2937",
                        marginBottom: "1.5rem",
                        marginTop: "2rem",
                        paddingBottom: "0.75rem",
                        borderBottom: "2px solid #E5E7EB"
                    }}>
                        Datos de los Tutores
                    </div>
                }
                {
                    menor ?
                        <div className="InputContainer4">
                            <Form.Group className='mb-3'>
                                <Form.Label htmlFor='nombre' style={labelStyle}>Nombre de la madre</Form.Label>
                                <Form.Control name='nombreMadre' placeholder="Brisa Sandoval" value={form.values.nombreMadre} onChange={form.handleChange} style={inputStyle} />
                                {
                                    form.errors.nombreMadre && (<span className='error-text' style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.nombreMadre}</span>)
                                }
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label htmlFor='madreTelefono' style={labelStyle}>Contacto de la madre</Form.Label>
                                <Form.Control type='number' min={0} onWheel={(e) => e.target.blur()} name='madreTelefono' placeholder="7771234567" value={form.values.madreTelefono} onChange={form.handleChange} style={inputStyle} />
                                {
                                    form.errors.madreTelefono && (<span className='error-text' style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.madreTelefono}</span>)
                                }
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label htmlFor='nombrePadre' style={labelStyle}>Nombre del padre</Form.Label>
                                <Form.Control name='nombrePadre' placeholder="Pedro Alvarez" value={form.values.nombrePadre} onChange={form.handleChange} style={inputStyle} />
                                {
                                    form.errors.nombrePadre && (<span className='error-text' style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.nombrePadre}</span>)
                                }
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label htmlFor='padreTelefono' style={labelStyle}>Contacto del padre</Form.Label>
                                <Form.Control type='number' min={0} onWheel={(e) => e.target.blur()} name='padreTelefono' placeholder="7777654321" value={form.values.padreTelefono} onChange={form.handleChange} style={inputStyle} />
                                {
                                    form.errors.padreTelefono && (<span className='error-text' style={{ color: '#EF4444', fontSize: '0.75rem' }}>{form.errors.padreTelefono}</span>)
                                }
                            </Form.Group>
                        </div> : ""
                }
                <FormGroup className='mb-3'>
                    <Row style={{ padding: "1.5rem 0 0 0", borderTop: "2px solid #E5E7EB", marginTop: "2rem" }}>
                        <Col className='text-start' xs={12} md={6} style={{ marginBottom: "1rem" }}>
                            <button
                                type="button"
                                onClick={() => setMenor(!menor)}
                                style={{
                                    backgroundColor: '#F59E0B',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    padding: '0.625rem 1.25rem',
                                    fontSize: '0.875rem',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#D97706';
                                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = '#F59E0B';
                                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                                }}
                            >
                                {menor ? 'Estudiante Mayor de Edad' : 'Estudiante Menor de Edad'}
                            </button>
                        </Col>
                        <Col className='text-end' xs={12} md={6} style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                            <button
                                type="button"
                                onClick={handleClose}
                                style={{
                                    backgroundColor: '#EF4444',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    padding: '0.625rem 1.25rem',
                                    fontSize: '0.875rem',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#DC2626';
                                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = '#EF4444';
                                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                                }}
                            >
                                <FeatherIcon icon='x' size={18} />
                                Cancelar
                            </button>
                            <button
                                type='submit'
                                style={{
                                    backgroundColor: '#10B981',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    padding: '0.625rem 1.25rem',
                                    fontSize: '0.875rem',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#059669';
                                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = '#10B981';
                                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                                }}
                            >
                                <FeatherIcon icon='check' size={18} />
                                Guardar
                            </button>
                        </Col>
                    </Row>
                </FormGroup>
            </Form>
        </Modal.Body>
    </Modal>
};