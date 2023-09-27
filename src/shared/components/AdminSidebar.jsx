import React, {useState, useEffect} from 'react';
import '../../utils/styles/AdminSidebar.css';
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../modules/auth/authContext";
import { FaDumbbell, FaRuler } from 'react-icons/fa'
import { TbShirt } from 'react-icons/tb'
import { GiTeePipe } from 'react-icons/gi'

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
                <Link to='/' className="user icon" data-label="Perfil"><FeatherIcon icon={'user'} /></Link>
                <Link to='materiales-tee-reduccion' className="sliders icon" data-label="Tee Reducción" ><GiTeePipe style={{ height: 28, width: 28 }}/> </Link>
                <Link to='materiales-brida-extremo' className="sliders icon" data-label="Brida Exterior" style={{ fontSize:"1.5rem"}}>BE </Link>
                <Link to='materiales-camisa-interior' className="sliders icon" data-label="Camisa Interior" ><TbShirt style={{ height: 28, width: 28 }}/> </Link>
            </div>
            <div className="bottom">
                {/* <div className="config icon" data-label="Configuración"><FeatherIcon icon={'settings'} /></div> */}
                <div className="logout icon" onClick={handleLogout} data-label="Cerrar Sesión"><FeatherIcon icon={'log-out'} /></div>
            </div>
        </div>
    );
}

export default AdminSidebar;
