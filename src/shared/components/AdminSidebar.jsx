import React, {useState, useEffect} from 'react';
import '../../utils/styles/AdminSidebar.css';
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../modules/auth/authContext";
import { GiGuitarBassHead } from 'react-icons/gi'
import { FaChalkboardTeacher } from 'react-icons/fa'
import { TbDiscount2Off } from 'react-icons/tb'
import { IoWoman } from 'react-icons/io5'

const AdminSidebar = () => {
    const { dispatch } = useContext(AuthContext);
    const navigation = useNavigate();
    const [gapSize, setGapSize] = useState("0.5rem");
    const [display, setDisplay] = useState("transparent");
    const [height, setHeight] = useState("0");
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
                {/* <div className="profilePictureContainer">
                    <img className='profilePicture' src={require('../../utils/img/profilePicture.jpg')} alt="" />
                </div> */}
                {/* <Link to='/' className="home icon" data-label="Pagina Principal"><FeatherIcon icon={'home'} /></Link> */}
                <Link to='/' className="user icon" data-label="Alumnos"><FeatherIcon icon={'users'} /></Link>
                <Link to='maestros' className="sliders icon" data-label="Maestros" ><FaChalkboardTeacher style={{ height: 28, width: 28 }}/> </Link>
                <Link to='instrumentos' className="sliders icon" data-label="Instrumentos" style={{ fontSize:"1.5rem"}}><GiGuitarBassHead style={{ height: 28, width: 28 }}/> </Link>
                {/* <Link to='promociones' className="sliders icon" data-label="Promociones" ><TbDiscount2Off style={{ height: 28, width: 28 }}/> </Link> */}
                <Link to='recepcionistas' className="sliders icon" data-label="Recepcionistas" ><IoWoman style={{ height: 28, width: 28 }}/> </Link>
                
            </div>
            <div className="bottom">
                {/* <div className="config icon" data-label="Configuración"><FeatherIcon icon={'settings'} /></div> */}
                <div className="logout icon" onClick={handleLogout} data-label="Cerrar Sesión"><FeatherIcon icon={'log-out'} /></div>
            </div>
        </div>
    );
}

export default AdminSidebar;
