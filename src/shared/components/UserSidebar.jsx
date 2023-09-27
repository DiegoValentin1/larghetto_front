import React from 'react';
import '../../utils/styles/AdminSidebar.css';
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../modules/auth/authContext";

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
                <Link to={'/'} className="home icon" data-label="Pagina Principal"><FeatherIcon icon={'home'} /></Link>
                {/* <div className="user icon" data-label="Perfil"><FeatherIcon icon={'user'} /></div> */}
                <Link to={'trabajos'} className="folder icon" data-label="Trabajos"><FeatherIcon icon={'folder'} /></Link>
            </div>
            <div className="bottom">
                {/* <div className="config icon" data-label="Configuración"><FeatherIcon icon={'settings'} /></div> */}
                <div className="logout icon" onClick={handleLogout} data-label="Cerrar Sesión"><FeatherIcon icon={'log-out'} /></div>
            </div>
        </div>
    );
}

export default UserSidebar;
