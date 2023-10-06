import React from 'react';
import '../../utils/styles/AdminSidebar.css';
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../modules/auth/authContext";
import { FaChalkboardTeacher } from 'react-icons/fa'

const UserSidebar = () => {
    const { dispatch } = useContext(AuthContext);
    const navigation = useNavigate();
    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
        navigation("/auth", { replace: true });
        localStorage.removeItem("user");
    };
    return (
        <div className='sidebar'>
            <div className="top">
                <div className="profilePictureContainer">
                    <img className='profilePicture' src={require('../../utils/img/profilePicture.jpg')} alt="" />
                </div>
                <Link to='/' className="user icon" data-label="Alumnos"><FeatherIcon icon={'users'} /></Link>
                <Link to='maestros' className="sliders icon" data-label="Maestros" ><FaChalkboardTeacher style={{ height: 28, width: 28 }}/> </Link>
            </div>
            <div className="bottom">
                {/* <div className="config icon" data-label="Configuración"><FeatherIcon icon={'settings'} /></div> */}
                <div className="logout icon" onClick={handleLogout} data-label="Cerrar Sesión"><FeatherIcon icon={'log-out'} /></div>
            </div>
        </div>
    );
}

export default UserSidebar;
