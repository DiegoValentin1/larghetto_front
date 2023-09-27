import React, { useState, useEffect } from 'react';
import '../../utils/styles/UserHome.css';
import { BsClipboardPlus } from 'react-icons/bs';
import RecientesCard from './components/RecientesCard';
import AxiosClient from "../../shared/plugins/axios";
import Alert from "../../shared/plugins/alerts";
import { Link } from "react-router-dom";

const UserHome = () => {
    const [recientes, setRecientes] = useState([]);
    const multiplicarString = (texto, cantidad) => {
        return texto.repeat(cantidad);
    };

    useEffect(() => {
        cargarDatos();
    }, []);

    const cargarDatos = async () => {
        try {
            const response = await AxiosClient({
                url: "/proyecto/",
                method: "GET",
            });
            
            console.log(response);
            if (!response.error) {
                setRecientes(response.length >= 3 ? response.slice(0, 3) : response);
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
    return (
        <div className='UserHome'>
            <div className={`TrabajosRecientes marBot ${recientes.length == 0 ? ('RecientesVacio') : ('RecientesLleno')}`}>
                {
                    recientes.length == 0 ? (
                        <div className='RecientesVacioContainer'>
                            <p className='RVCTextUp'>No hay trabajos recientes</p>
                            <BsClipboardPlus style={{ width: "80%", height: "60%", marginTop: "1rem", marginBottom: "1rem" }} />
                            <p className='RVCTextDown'>Da click para iniciar un nuevo trabajo</p>
                        </div>
                    ) : (
                        <div className='RecientesLlenoContainer' style={{ gridTemplateColumns: multiplicarString("1fr ", 3) }}>
                            {recientes.map((elemento, index) => (
                                <RecientesCard estilo={{height:"auto"}} objeto={elemento}  key={index}/>
                            ))}
                            <Link to={'/nuevo/crear'} className="addTrabajo">
                                <BsClipboardPlus style={{ width: "30%", height: "50%" }} />
                            </Link>
                        </div>
                    )
                }
            </div>
            <div className='TrabajosRecientes'>

            </div>
        </div>
    );
}

export default UserHome;
