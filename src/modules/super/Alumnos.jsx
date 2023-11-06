import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component';
import { FaPlus, FaTrashAlt, FaEdit } from 'react-icons/fa'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { IoMdRepeat } from 'react-icons/io'
import "bootstrap/dist/css/bootstrap.min.css";
import AxiosClient from "../../shared/plugins/axios";
import Alert from "../../shared/plugins/alerts";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import '../../utils/styles/DataTable.css'
import { AddUserForm } from './SuperForms/AddAlumnoForm';
import { Edit } from 'feather-icons-react/build/IconComponents';
import { EditUserForm } from './SuperForms/EditAlumnoForm';
import { AlumnoInfo } from './Components/AlumnoInfo';




export default function Users() {
    const [selectedObject, setSelectedObject] = useState({});
    const [selectedStudentId, setSelectedStudentId] = useState(0);
    const [showStatusMenu, setShowStatusMenu] = useState(false);
    const session = JSON.parse(localStorage.getItem('user') || null);
    const columns = [
        {
            name: 'Matricula',
            selector: 'matricula',
            sortable: true,
        },
        {
            name: 'Nombre',
            selector: 'name',
            sortable: true,
        },
        {
            name: 'Mensualidad',
            selector: (row) => row.mensualidad && (row.mensualidad - (row.mensualidad * (row.descuento / 100))).toFixed(2),
            sortable: true,
        },
        {
            name: 'Próximo Pago',
            selector: (row) => { return row.proximo_pago.substring(0, 10) },
            sortable: true,
        },
        {
            name: 'Status',
            selector: 'estado',
            sortable: true,
            cell: (row) => {
                if (row.estado == 1) {
                    return <div style={{ marginLeft: "0.8rem", backgroundColor: "#A0A2A2", padding: "0.2rem", borderRadius: "0.5rem", width: "1rem", height: "1rem" }}></div>;
                }
                else if (row.estado == 2) {
                    return <div style={{ marginLeft: "0.8rem", backgroundColor: "#F0BA14", padding: "0.2rem", borderRadius: "0.5rem", width: "1rem", height: "1rem" }}></div>;
                } else if (row.estado == 3) {
                    return <div style={{ marginLeft: "0.8rem", backgroundColor: "#14F0B7", padding: "0.2rem", borderRadius: "0.5rem", width: "1rem", height: "1rem" }}></div>;
                } else if (row.estado == 4) {
                    return <div style={{ marginLeft: "0.8rem", backgroundColor: "#40DC51", padding: "0.2rem", borderRadius: "0.5rem", width: "1rem", height: "1rem" }}></div>;
                } else if (row.estado == 5) {
                    return <div style={{ marginLeft: "0.8rem", backgroundColor: "#ED2C75", padding: "0.2rem", borderRadius: "0.5rem", width: "1rem", height: "1rem" }}></div>;
                } else if (row.estado == 6) {
                    return <div style={{ marginLeft: "0.8rem", backgroundColor: "#1F175A", padding: "0.2rem", borderRadius: "0.5rem", width: "1rem", height: "1rem" }}></div>;
                } else if (row.estado == 7) {
                    return <div style={{ marginLeft: "0.8rem", backgroundColor: "#DAE175", padding: "0.2rem", borderRadius: "0.5rem", width: "1rem", height: "1rem" }}></div>;
                } else if (row.estado == 8) {
                    return <div style={{ marginLeft: "0.8rem", backgroundColor: "#702390", padding: "0.2rem", borderRadius: "0.5rem", width: "1rem", height: "1rem" }}></div>;
                } else if (row.estado == 0) {
                    return <div style={{ marginLeft: "0.8rem", backgroundColor: "rgb(220, 48, 48)", padding: "0.2rem", borderRadius: "0.5rem", width: "1rem", height: "1rem" }}></div>;
                }
            }
        },
        {
            name: '',
            cell: (row) => (
                <div style={{ width: "100%", display: "flex", justifyContent: "end" }}>
                    <div style={{ paddingRight: "10px" }}>
                        <AiOutlineInfoCircle className='DataIcon' onClick={async () => {
                            await cargarAsistenciaAlumnos(row.user_id);
                            setSelectedObject(row);
                            setListaMes(cambiarColores(row.dia));
                            setIdUser(row.user_id);
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
                    <div style={{ paddingLeft: 10 }}>
                        <IoMdRepeat className='DataIcon' onClick={() => {
                            setSelectedStudentId(row.alu_id)
                            setShowStatusMenu(!showStatusMenu);
                        }} style={{ height: 20, width: 25, marginBottom: 0 }} />
                    </div>
                </div>
            ),
        },
    ];


    const [isEditing, setIsEditting] = useState(false);
    const [isInfo, setIsInfo] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [datos, setDatos] = useState([]);
    const [asistencias, setAsistencias] = useState([]);
    const [idUser, setIdUser] = useState();


    function generarListaMes(diaActivo) {
        const lista = [];
        var contador = 0;

        for (let dia = 1; dia <= 31; dia++) {
            var display = "flex";

            const esDiaValido = dia <= obtenerDiasEnMes(new Date().getFullYear(), new Date().getMonth() + 1);

            if (!esDiaValido) {
                display = "none";
            }

            var activo = diaActivo === obtenerNombreDia(dia) ? "diaActivo" : "diaInactivo";
            const status = diaActivo === obtenerNombreDia(dia) ? 1 : 0;



            lista.push({ dia: dia.toString(), display, activo, status });
        }
        console.log(lista);

        return lista;
    }

    function obtenerDiasEnMes(año, mes) {
        return new Date(año, mes, 0).getDate();
    }

    function obtenerNombreDia(dia) {
        const diasSemana = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
        const fecha = new Date(new Date().getFullYear(), new Date().getMonth(), dia);
        return diasSemana[fecha.getDay()];
    }

    const ObtenerDia = () => {
        const fechaActual = new Date();
        const primerDiaDelMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1);
        const diaSemana = primerDiaDelMes.getDay();
        const nombresDiasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        const listaDiasSemana = [];
        for (let i = diaSemana; i < 7; i++) {
            listaDiasSemana.push(nombresDiasSemana[i]);
        }
        if (diaSemana > 0) {
            for (let i = 0; i < diaSemana; i++) {
                listaDiasSemana.push(nombresDiasSemana[i]);
            }
        }
        return listaDiasSemana;
    }

    const changeStatus2 = async (id) => {
        try {
            const response = await AxiosClient({
                url: "/personal/",
                method: "DELETE",
                data: JSON.stringify({ id: id, autor: session ? session.data.name : "", accion: "CAMBIAR STATUS ALUMNO" })
            });
        } catch (err) {
        }
    }


    const changeStatus = async (id, estado) => {
        try {
            const response = await AxiosClient({
                url: "/personal/alumno/",
                method: "DELETE",
                data: JSON.stringify({ id: id, estado: estado })
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

    const [listaMes, setListaMes] = useState(generarListaMes("Lunes"));

    const cambiarAsistencias = async (id, uno, dos, tres, cuatro, cinco) => {
        try {
            const response = await AxiosClient({
                url: "/personal/alumno/asistencias",
                method: "PUT",
                data: JSON.stringify({
                    id_alumno: id,
                    dia1: uno,
                    dia2: dos,
                    dia3: tres,
                    dia4: cuatro,
                    dia5: cinco
                })
            });
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

    const cargarAsistenciaAlumnos = async (id) => {
        try {
            const response = await AxiosClient({
                url: "/personal/alumno/asistencias",
                method: "POST",
                data: JSON.stringify({ id_alumno: id })
            });
            console.log(response);
            if (!response.error) {
                console.log(response);
                setAsistencias(response);
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

    const cambiarColor = async (dia) => {
        const nuevaLista = [...listaMes];
        const tempStatus = nuevaLista[dia - 1].status;
        if (tempStatus == 1) {
            nuevaLista[dia - 1].status = 2;
            nuevaLista[dia - 1].activo = "diaCumplido"
        } else if (tempStatus == 2) {
            nuevaLista[dia - 1].status = 3;
            nuevaLista[dia - 1].activo = "diaFalta"
        } else if (tempStatus == 3) {
            nuevaLista[dia - 1].status = 1;
            nuevaLista[dia - 1].activo = "diaActivo"
        }

        let status1 = 0;
        let status2 = 0;
        let status3 = 0;
        let status4 = 0;
        let status5 = 0;

        let count = 0;



        nuevaLista.forEach((element) => {
            const status = element.status;
            if (status !== 0) {
                count++;
                switch (count) {
                    case 1:
                        status1 = status;
                        break;
                    case 2:
                        status2 = status;
                        break;
                    case 3:
                        status3 = status;
                        break;
                    case 4:
                        status4 = status;
                        break;
                    case 5:
                        status5 = status;
                        break;
                    default:
                        break;
                }
            }
        });

        await cambiarAsistencias(idUser, status1, status2, status3, status4, status5);



        setListaMes(nuevaLista);
    }

    const cambiarColores = (dia) => {
        const nuevaLista = generarListaMes(dia);

        let count = 0;
        nuevaLista.forEach((element, index) => {
            const status = element.status;
            if (status !== 0) {
                console.log()
                count++;
                if (asistencias[`dia${count}`] == 1) {
                    nuevaLista[index].status = 1;
                    nuevaLista[index].activo = "diaActivo";
                } else if (asistencias[`dia${count}`] == 2) {
                    nuevaLista[index].status = 2;
                    nuevaLista[index].activo = "diaCumplido";
                } else if (asistencias[`dia${count}`] == 3) {
                    nuevaLista[index].status = 3;
                    nuevaLista[index].activo = "diaFalta";
                }
            }
        });
        console.log("nuevaaaaaaa")
        console.log(nuevaLista);
        return nuevaLista;
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

                                    {showStatusMenu && <div className='StatusMenu' style={{ position: "absolute", width: "20rem", height: "2rem", backgroundColor: "#f0f0f0", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)", borderRadius: "0.8rem", right: 100 }} onClick={() => setShowStatusMenu(false)}>
                                        <div className="StatusMenuOption" style={{ marginTop: "0.4rem", marginLeft: "0.6rem", backgroundColor: "#A0A2A2", padding: "0.6rem", borderRadius: "0.5rem", width: "1rem", height: "1rem" }} onClick={() => {
                                            changeStatus(selectedStudentId, 1);
                                        }}></div>
                                        <div className="StatusMenuOption" style={{ marginTop: "0.4rem", marginLeft: "0.6rem", backgroundColor: "#F0BA14", padding: "0.6rem", borderRadius: "0.5rem", width: "1rem", height: "1rem" }} onClick={() => {
                                            changeStatus(selectedStudentId, 2);
                                        }}></div>
                                        <div className="StatusMenuOption" style={{ marginTop: "0.4rem", marginLeft: "0.6rem", backgroundColor: "#14F0B7", padding: "0.6rem", borderRadius: "0.5rem", width: "1rem", height: "1rem" }} onClick={() => {
                                            changeStatus(selectedStudentId, 3);
                                        }}></div>
                                        <div className="StatusMenuOption" style={{ marginTop: "0.4rem", marginLeft: "0.6rem", backgroundColor: "#40DC51", padding: "0.6rem", borderRadius: "0.5rem", width: "1rem", height: "1rem" }} onClick={() => {
                                            changeStatus(selectedStudentId, 4);
                                        }}></div>
                                        <div className="StatusMenuOption" style={{ marginTop: "0.4rem", marginLeft: "0.6rem", backgroundColor: "#ED2C75", padding: "0.6rem", borderRadius: "0.5rem", width: "1rem", height: "1rem" }} onClick={() => {
                                            changeStatus(selectedStudentId, 5);
                                        }}></div>
                                        <div className="StatusMenuOption" style={{ marginTop: "0.4rem", marginLeft: "0.6rem", backgroundColor: "#1F175A", padding: "0.6rem", borderRadius: "0.5rem", width: "1rem", height: "1rem" }} onClick={() => {
                                            changeStatus(selectedStudentId, 6);
                                        }}></div>
                                        <div className="StatusMenuOption" style={{ marginTop: "0.4rem", marginLeft: "0.6rem", backgroundColor: "#DAE175", padding: "0.6rem", borderRadius: "0.5rem", width: "1rem", height: "1rem" }} onClick={() => {
                                            changeStatus(selectedStudentId, 7);
                                        }}></div>
                                        <div className="StatusMenuOption" style={{ marginTop: "0.4rem", marginLeft: "0.6rem", backgroundColor: "#702390", padding: "0.6rem", borderRadius: "0.5rem", width: "1rem", height: "1rem" }} onClick={() => {
                                            changeStatus(selectedStudentId, 8);
                                        }}></div>
                                        <div className="StatusMenuOption" style={{ marginTop: "0.4rem", marginLeft: "0.6rem", backgroundColor: "rgb(220, 48, 48)", padding: "0.6rem", borderRadius: "0.5rem", width: "1rem", height: "1rem" }} onClick={() => {
                                            changeStatus(selectedStudentId, 0);
                                        }}></div>
                                    </div>}

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
            <AlumnoInfo asistencias={asistencias} setDiasMes={setListaMes} cambiarColor={cambiarColor} diasMes={listaMes} diasSemana={ObtenerDia()} isOpen={isInfo} objeto={selectedObject} onClose={() => setIsInfo(false)} />
        </>

    )
}

