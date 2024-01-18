import React, { useContext, useState, useEffect } from 'react'
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
import { AuthContext } from '../auth/authContext';



export default function Users() {
    const [selectedObject, setSelectedObject] = useState({});
    const [selectedStudentId, setSelectedStudentId] = useState(0);
    const [totalMensualidad, setTotalMensualidad] = useState(0);
    const [contador, setContador] = useState(0);
    const [inner, setInner] = useState("");
    const [totalStatus, setTotalStatus] = useState({});
    const [showStatusMenu, setShowStatusMenu] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [switchActivo, setSwitchActivo] = useState(true);
    const { user } = useContext(AuthContext);
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
        user.data.role === 'SUPER' &&
        {
            name: 'Campus',
            selector: row => row.campus.charAt(0).toUpperCase() + row.campus.slice(1),
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

                            setSelectedObject(row);
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
    const [filtrados, setFiltrados] = useState([]);
    const [idUser, setIdUser] = useState();

    const handleInputChange = (event) => {
        const valorInput = event.target.value;
        setShowFilter(valorInput.lenght === 0 ? false : true)
        console.log('Valor actual del input:', valorInput);
        setFiltrados(datos.filter(item => {
            return (
                (item.matricula && item.matricula.toLowerCase().includes(valorInput.toLowerCase())) ||
                (item.name && item.name.toLowerCase().includes(valorInput.toLowerCase()))
            );
        }));
    }


    const changeStatus = async (id, estado) => {
        console.log(id, estado);
        try {
            const response = await AxiosClient({
                url: "/personal/alumno/eliminar",
                method: "PUT",
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

    const cargarDatos = async () => {
        try {
            const response = await AxiosClient({
                url: "/personal/",
                method: "GET",
            });
            console.log(response);
            if (!response.error) {
                console.log(response);
                const responseCamp = user.data.role === 'SUPER' ? response : response.filter(item => item.campus === user.data.campus);
                setDatos(responseCamp);
                setTotalMensualidad(responseCamp.reduce((acum, item) => { 
                    var temp = item.estado !== 0 ? acum + (item.mensualidad - (item.mensualidad * (item.descuento / 100))) : 0;
                    return temp;
                }, 0));
                console.log(responseCamp.reduce((acum, item) => { return acum + (item.mensualidad - (item.mensualidad * (item.descuento / 100))) }, 0));
                setTotalStatus(responseCamp.reduce((contador, item) => {
                    const estado = item.estado;
                    if (contador[estado] !== undefined) {
                        contador[estado]++;
                    } else {
                        contador[estado] = 1;
                    }
                    return contador;
                }, {}));
                console.log(responseCamp.reduce((contador, item) => {
                    const estado = item.estado;
                    if (contador[estado] !== undefined) {
                        contador[estado]++;
                    } else {
                        contador[estado] = 1;
                    }
                    return contador;
                }, {}))
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
        const div2 = div1 && div1.nextElementSibling;

        if (div2) {
            // div2.innerHTML = `
            // <div style='width:100%;height:5vh; display:flex; flex-direction:row;'>
            //     <div  style='width:27%;height:100%;'></div>
            //     <div  style='width:20%;height:100%;display:flex;align-items: end;'>Total Mensualidad: ${totalMensualidad}</div>
            //     <div  style='width:40%;height:100%;display:flex; flex-direction:row;justify-content: center;align-items: center;'>
            //         <div
            //         style="margin-top: 0.4rem; margin-left: 0.6rem; background-color: #A0A2A2; padding: 0.6rem; border-radius: 0.5rem; width: 1rem; height: 1rem;"
            //     ></div>
            //     <div style={{paddingTop:"0.35rem",paddingLeft:"0.35rem"}}>${totalStatus[1] ? totalStatus[1] : "0"}</div>
            //     <div
            //         style="margin-top: 0.4rem; margin-left: 0.6rem; background-color: #F0BA14; padding: 0.6rem; border-radius: 0.5rem; width: 1rem; height: 1rem;"
            //     ></div>
            //     <div style={{paddingTop:"0.35rem",paddingLeft:"0.35rem"}}>${totalStatus[2] ? totalStatus[2] : "0"}</div>
            //     <div
            //         style="margin-top: 0.4rem; margin-left: 0.6rem; background-color: #14F0B7; padding: 0.6rem; border-radius: 0.5rem; width: 1rem; height: 1rem;"
            //     ></div>
            //     <div style={{paddingTop:"0.35rem",paddingLeft:"0.35rem"}}>${totalStatus[3] ? totalStatus[3] : "0"}</div>
            //     <div
            //         style="margin-top: 0.4rem; margin-left: 0.6rem; background-color: #40DC51; padding: 0.6rem; border-radius: 0.5rem; width: 1rem; height: 1rem;"
            //     ></div>
            //     <div style={{paddingTop:"0.35rem",paddingLeft:"0.35rem"}}>${totalStatus[4] ? totalStatus[4] : "0"}</div>
            //     <div
            //         style="margin-top: 0.4rem; margin-left: 0.6rem; background-color: #ED2C75; padding: 0.6rem; border-radius: 0.5rem; width: 1rem; height: 1rem;"
            //     ></div>
            //     <div style={{paddingTop:"0.35rem",paddingLeft:"0.35rem"}}>${totalStatus[5] ? totalStatus[5] : "0"}</div>
            //     <div
            //         style="margin-top: 0.4rem; margin-left: 0.6rem; background-color: #1F175A; padding: 0.6rem; border-radius: 0.5rem; width: 1rem; height: 1rem;"
            //     ></div>
            //     <div style={{paddingTop:"0.35rem",paddingLeft:"0.35rem"}}>${totalStatus[6] ? totalStatus[6] : "0"}</div>
            //     <div
            //         style="margin-top: 0.4rem; margin-left: 0.6rem; background-color: #DAE175; padding: 0.6rem; border-radius: 0.5rem; width: 1rem; height: 1rem;"
            //     ></div>
            //     <div style={{paddingTop:"0.35rem",paddingLeft:"0.35rem"}}>${totalStatus[7] ? totalStatus[7] : "0"}</div>
            //     <div
            //         style="margin-top: 0.4rem; margin-left: 0.6rem; background-color: #702390; padding: 0.6rem; border-radius: 0.5rem; width: 1rem; height: 1rem;"
            //     ></div>
            //     <div style={{paddingTop:"0.35rem",paddingLeft:"0.35rem"}}>${totalStatus[8] ? totalStatus[8] : "0"}</div>
            //     <div
            //         style="margin-top: 0.4rem; margin-left: 0.6rem; background-color: rgb(220, 48, 48); padding: 0.6rem; border-radius: 0.5rem; width: 1rem; height: 1rem;"
            //     ></div>
            //     <div style={{paddingTop:"0.35rem",paddingLeft:"0.35rem"}}>${totalStatus[0] ? totalStatus[0] : "0"}</div>

            //     </div>
            // </div>
            // ` + inner;
            div2.style.width = '89.2%';
            div2.style.bottom = '4.5%';
            div2.style.right = '2%';
            div2.style.position = 'absolute';
        }
    };
    useEffect(() => {

        cargarDatos();
    }, []);

    useEffect(() => { aplicarEstilosAlSiguienteDiv(); });

    return (
        < >
            <div style={{ justifyContent: 'ceneter', alignItems: "center", backgroundColor: "transparent", height: "92vh", padding: 20 }}>
                <div>
                    <div className="App">
                        <div style={{ display: "flex", flexDirection: "row", height: "5vh", width: "100%" }}>
                            <div style={{ width: "50%", height: "100%", display: "flex", flexDirection: "row", justifyContent: "start" }}>
                                <div style={{ width: "auto", height: "50%", display: "flex", alignItems: "start", fontSize: "16px", marginRight: "3rem", flexDirection: "column" }}>
                                    <div style={{ fontSize: "11px", height: "70%" }}>Total Mensualidad</div>
                                    <div>${totalMensualidad ? totalMensualidad.toFixed(2) : 0}</div>
                                </div>
                                {/* <div style={{ width: "auto", height: "50%", display: "flex", alignItems: "start", fontSize: "16px", marginRight: "3rem", flexDirection: "column" }}>
                                    <div style={{ fontSize: "11px", height: "70%" }}>Total Mensualidad</div>
                                    <div>${totalMensualidad ? totalMensualidad.toFixed(2) : 0}</div>
                                </div>
                                <div style={{ width: "auto", height: "50%", display: "flex", alignItems: "start", fontSize: "16px", marginRight: "3rem", flexDirection: "column" }}>
                                    <div style={{ fontSize: "11px", height: "70%" }}>Faltantes</div>
                                    <div>${totalMensualidad ? totalMensualidad.toFixed(2) : 0}</div>
                                </div> */}
                            </div>
                            <div style={{ width: "50%", height: "100%", display: "flex", flexDirection: "row", justifyContent: "center" }}>
                                <div style={{ width: "40%", height: "100%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", fontSize: "18px" }}>
                                    <div
                                        style={{ marginTop: "0.4rem", marginLeft: "0.6rem", backgroundColor: "#A0A2A2", padding: "0.6rem", borderRadius: "0.5rem", width: "1rem", height: "1rem" }}
                                    ></div>
                                    <div style={{ paddingTop: "0.35rem", paddingLeft: "0.35rem" }}>{totalStatus[1] ? totalStatus[1] : "0"}</div>
                                    <div
                                        style={{ marginTop: "0.4rem", marginLeft: "0.6rem", backgroundColor: "#F0BA14", padding: "0.6rem", borderRadius: "0.5rem", width: "1rem", height: "1rem" }}
                                    ></div>
                                    <div style={{ paddingTop: "0.35rem", paddingLeft: "0.35rem" }}>{totalStatus[2] ? totalStatus[2] : "0"}</div>
                                    <div
                                        style={{ marginTop: "0.4rem", marginLeft: "0.6rem", backgroundColor: "#14F0B7", padding: "0.6rem", borderRadius: "0.5rem", width: "1rem", height: "1rem" }}
                                    ></div>
                                    <div style={{ paddingTop: "0.35rem", paddingLeft: "0.35rem" }}>{totalStatus[3] ? totalStatus[3] : "0"}</div>
                                    <div
                                        style={{ marginTop: "0.4rem", marginLeft: "0.6rem", backgroundColor: "#40DC51", padding: "0.6rem", borderRadius: "0.5rem", width: "1rem", height: "1rem" }}
                                    ></div>
                                    <div style={{ paddingTop: "0.35rem", paddingLeft: "0.35rem" }}>{totalStatus[4] ? totalStatus[4] : "0"}</div>
                                    <div
                                        style={{ marginTop: "0.4rem", marginLeft: "0.6rem", backgroundColor: "#ED2C75", padding: "0.6rem", borderRadius: "0.5rem", width: "1rem", height: "1rem" }}
                                    ></div>
                                    <div style={{ paddingTop: "0.35rem", paddingLeft: "0.35rem" }}>{totalStatus[5] ? totalStatus[5] : "0"}</div>
                                    <div
                                        style={{ marginTop: "0.4rem", marginLeft: "0.6rem", backgroundColor: "#1F175A", padding: "0.6rem", borderRadius: "0.5rem", width: "1rem", height: "1rem" }}
                                    ></div>
                                    <div style={{ paddingTop: "0.35rem", paddingLeft: "0.35rem" }}>{totalStatus[6] ? totalStatus[6] : "0"}</div>
                                    <div
                                        style={{ marginTop: "0.4rem", marginLeft: "0.6rem", backgroundColor: "#DAE175", padding: "0.6rem", borderRadius: "0.5rem", width: "1rem", height: "1rem" }}
                                    ></div>
                                    <div style={{ paddingTop: "0.35rem", paddingLeft: "0.35rem" }}>{totalStatus[7] ? totalStatus[7] : "0"}</div>
                                    <div
                                        style={{ marginTop: "0.4rem", marginLeft: "0.6rem", backgroundColor: "#702390", padding: "0.6rem", borderRadius: "0.5rem", width: "1rem", height: "1rem" }}
                                    ></div>
                                    <div style={{ paddingTop: "0.35rem", paddingLeft: "0.35rem" }}>{totalStatus[8] ? totalStatus[8] : "0"}</div>
                                    <div
                                        style={{ marginTop: "0.4rem", marginLeft: "0.6rem", backgroundColor: "rgb(220, 48, 48)", padding: "0.6rem", borderRadius: "0.5rem", width: "1rem", height: "1rem" }}
                                    ></div>
                                    <div style={{ paddingTop: "0.35rem", paddingLeft: "0.35rem" }}>{totalStatus[0] ? totalStatus[0] : "0"}</div>

                                </div>
                            </div>
                        </div>
                        <DataTable


                            title={

                                <div style={{ display: "flex", flexDirection: "row" }}>

                                    <div style={{ width: "15%", paddingTop: 3 }}>
                                        Alumnos
                                    </div>

                                    <div style={{ width: "70%", height: "5vh", display: "flex", flexDirection: "row", justifyContent: "end", marginRight:"1rem" }}>
                                        <div className={`switch ${switchActivo ? "switchon" : "switchoff"}`} onClick={() => setSwitchActivo(!switchActivo)}>
                                            <div className={`onoff ${switchActivo ? "switchactivo" : ""} `}>Activo</div>
                                            <div className={`onoff ${switchActivo ? "" : "switchinactivo"}`}>Inactivo</div>
                                        </div>
                                    </div>

                                    <input
                                        className='inputSearch'
                                        type="text"
                                        placeholder="Buscar..."
                                        onChange={(event) => handleInputChange(event)}
                                    />
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
                                        {
                                            !(user.data.role === "RECEPCION" || user.data.role === "ENCARGADO" && new Date().getDate() > 15) || true ?
                                                <div className="StatusMenuOption" style={{ marginTop: "0.4rem", marginLeft: "0.6rem", backgroundColor: "rgb(220, 48, 48)", padding: "0.6rem", borderRadius: "0.5rem", width: "1rem", height: "1rem" }} onClick={() => {
                                                    changeStatus(selectedStudentId, 0);
                                                }}></div> :
                                                ""
                                        }
                                    </div>}

                                </div>
                            }
                            columns={columns}
                            data={showFilter ? 
                                (switchActivo ? filtrados.filter(item => item.estado !== 0) : filtrados.filter(item => item.estado === 0)) : 
                                (switchActivo ? datos.filter(item => item.estado !== 0) : datos.filter(item => item.estado === 0))}
                            pagination
                            highlightOnHover
                            paginationPerPage={6}
                            paginationComponentOptions={{
                                rowsPerPageText: '',
                                noRowsPerPage: true,
                            }}

                        />
                    </div>
                </div>
            </div>








            {isOpen && <AddUserForm isOpen={isOpen} cargarDatos={cargarDatos} onClose={() => setIsOpen(false)} />}
            {isEditing && <EditUserForm isOpen={isEditing} cargarDatos={cargarDatos} onClose={() => setIsEditting(false)} objeto={selectedObject} />}
            {isInfo && <AlumnoInfo isOpen={isInfo} objeto={selectedObject} onClose={() => setIsInfo(false)} />}
        </>

    )
}

