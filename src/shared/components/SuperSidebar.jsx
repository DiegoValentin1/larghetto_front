import React, { useState, useEffect } from 'react';
import '../../utils/styles/AdminSidebar.css';
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../modules/auth/authContext";
import { TbShirt } from 'react-icons/tb'
import { GiGuitarBassHead } from 'react-icons/gi'
import { FaChalkboardTeacher } from 'react-icons/fa'
import { TbDiscount2Off } from 'react-icons/tb'


const SuperSidebar = () => {
    const { dispatch } = useContext(AuthContext);
    const [gapSize, setGapSize] = useState("0.5rem");
    const [display, setDisplay] = useState("transparent");
    const [height, setHeight] = useState("0");
    const navigation = useNavigate();
    const [showAtributos, setShowAtributos] = useState(false);
    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
        navigation("/auth", { replace: true });
        localStorage.removeItem("user");
    };

    useEffect(() => {
        if (showAtributos) {
            setGapSize("0.8rem");
            setDisplay('#3a3a3a');
            setHeight('auto');
        } else {
            setGapSize("0.5rem");
            setDisplay('transparent');
            setHeight('0');
        }
    }, [showAtributos]);
    return (
        <div className='sidebar'>
            <div className="top">
                <div className="profilePictureContainer">
                    <img className='profilePicture' src={require('../../utils/img/profilePicture.jpg')} alt="" />
                </div>
                {/* <Link to='/' className="home icon" data-label="Home"><FeatherIcon icon={'home'} /></Link> */}
                <Link to='/' className="user icon" data-label="Alumnos"><FeatherIcon icon={'users'} /></Link>
                <Link to='maestros' className="sliders icon" data-label="Maestros" ><FaChalkboardTeacher style={{ height: 28, width: 28 }}/> </Link>
                <Link to='instrumentos' className="sliders icon" data-label="Instrumentos" style={{ fontSize:"1.5rem"}}><GiGuitarBassHead style={{ height: 28, width: 28 }}/> </Link>
                <Link to='promociones' className="sliders icon" data-label="Camisa Interior" ><TbDiscount2Off style={{ height: 28, width: 28 }}/> </Link>
{/* 
                <div className='atributosContainer' style={{ gap: gapSize, height:height, width:height, backgroundColor:display}}>
                    <Link to='users' className=" icon" data-label="Valor de esfuerzo mínimo a la cedencia especificado">WH</Link>
                    <Link to='users' className=" icon" data-label="Factor de diseño"><GiPencilBrush style={{ width: "100%", height:"90%" }}/></Link>
                    <Link to='users' className=" icon" data-label="Factor de junta longitudinal"><FaRuler style={{ width: "100%" }}/></Link>
                    <Link to='/' className="icon" data-label="Factor de temperatura derating"><FeatherIcon style={{ width: "100%" }} icon={'thermometer'} /></Link>
                    </div> */}

            </div>
            <div className="bottom">
                {/* <div className="config icon" data-label="Configuración"><FeatherIcon icon={'settings'} /></div> */}
                <div className="logout icon" onClick={handleLogout} data-label="Cerrar Sesión"><FeatherIcon icon={'log-out'} /></div>
            </div>
        </div>
    );
}

export default SuperSidebar;
