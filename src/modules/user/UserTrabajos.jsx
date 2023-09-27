import React, { useContext, useEffect, useState } from 'react';
import '../../utils/styles/UserTrabajos.css';
import RecientesCard from './components/RecientesCard';
import { Link } from "react-router-dom";
import { BsClipboardPlus } from 'react-icons/bs'
import AxiosClient from "../../shared/plugins/axios";
import Alert from "../../shared/plugins/alerts";
import { AuthContext } from '../auth/authContext';

const UserTrabajos = () => {
    const {user, dispatch} = useContext(AuthContext);
    const [recientes, setRecientes] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [curDate, setCurDate] = useState();


    useEffect(() => {
        cargarDatos();
        setCurDate(currentDate);
    }, []);

    const cargarDatos = async () => {
        try {
            const response = await AxiosClient({
                url: "/proyecto/",
                method: "GET",
            });
            
            console.log(response);
            if (!response.error) {
                setFilteredList(response);
                setRecientes(response);
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

    const handleDateChange = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        const filteredItems = recientes.filter((item) =>
            item.fechaCreacion.toLowerCase().includes(searchTerm)
        );
        setFilteredList(filteredItems);
    };

    const handleTituloChange = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        const filteredItems = recientes.filter((item) =>
            item.name.toLowerCase().includes(searchTerm)
        );
        setFilteredList(filteredItems);
    };

    const currentDate = new Date().toISOString().split('T')[0];
    return (
        <div className='UserTrabajos'>
            <div className="UserBuscador">
                <input type="text" className='TrabajosBuscador' placeholder='Busca Por Titulo' onChange={handleTituloChange} />
                <input max={curDate} type="date" className='TrabajosDate' onChange={handleDateChange} />
                <Link to={'/nuevo/crear'} className="ButtonNuevoTrabajo"><BsClipboardPlus/></Link>
            </div>
            <div className='TrabajosContainer'>
                {filteredList.map((elemento, index) => (
                    <RecientesCard estilo={{ height: "13rem" }} objeto={elemento} key={index} />
                ))}
            </div>
        </div>
    );
}

export default UserTrabajos;
