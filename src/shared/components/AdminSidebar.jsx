import React, { useState } from 'react';
import '../../utils/styles/AdminSidebar.css';
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../modules/auth/authContext";
import { useSidebar } from "../contexts/SidebarContext";
import { IoMenu, IoWoman } from 'react-icons/io5'
import { GiGuitarBassHead } from 'react-icons/gi'
import { FaChalkboardTeacher } from 'react-icons/fa'

const AdminSidebar = () => {
    const { dispatch } = useContext(AuthContext);
    const navigation = useNavigate();
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);
    const { isExpanded, setIsExpanded } = useSidebar();

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
        navigation("/auth", { replace: true });
        localStorage.removeItem("user");
    };

    const menuItems = [
        { path: '/', icon: <FeatherIcon icon={'users'} size={24} />, label: 'Alumnos' },
        { path: '/maestros', icon: <FaChalkboardTeacher size={24} />, label: 'Maestros' },
        { path: '/instrumentos', icon: <GiGuitarBassHead size={24} />, label: 'Instrumentos' },
        { path: '/recepcionistas', icon: <IoWoman size={24} />, label: 'Recepcionistas' },
        { path: '/audit-log', icon: <FeatherIcon icon="activity" size={24} />, label: 'Historial' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <>
            {/* Botón hamburguesa para móvil */}
            <button
                className="d-md-none"
                onClick={() => setMobileOpen(!mobileOpen)}
                style={{
                    position: 'fixed',
                    top: '1rem',
                    left: '1rem',
                    zIndex: 1001,
                    background: '#111827',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.5rem',
                    color: '#FFFFFF',
                    cursor: 'pointer'
                }}
            >
                <IoMenu size={24} />
            </button>

            {/* Sidebar Desktop */}
            <div
                className={`sidebar-modern ${mobileOpen ? 'mobile-open' : ''} d-none d-md-flex`}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    height: '100vh',
                    width: isExpanded ? '240px' : '80px',
                    background: '#111827',
                    display: 'flex',
                    flexDirection: 'column',
                    zIndex: 1000,
                    borderRight: '1px solid rgba(255, 255, 255, 0.1)',
                    padding: '1.5rem 1rem',
                    transition: 'width 0.3s ease'
                }}
            >
                {/* Botón Toggle */}
                <div style={{
                    textAlign: 'right',
                    marginBottom: '1rem'
                }}>
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: '#9CA3AF',
                            cursor: 'pointer',
                            padding: '0.5rem',
                            borderRadius: '8px',
                            transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.background = '#374151';
                            e.target.style.color = '#FFFFFF';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = 'transparent';
                            e.target.style.color = '#9CA3AF';
                        }}
                    >
                        <FeatherIcon icon={isExpanded ? 'chevrons-left' : 'chevrons-right'} size={20} />
                    </button>
                </div>

                {/* Header */}
                <div style={{
                    textAlign: 'center',
                    marginBottom: '2rem',
                    padding: '0 0.5rem',
                    opacity: isExpanded ? 1 : 0,
                    transition: 'opacity 0.3s ease',
                    height: isExpanded ? 'auto' : '0',
                    overflow: 'hidden'
                }}>
                    <img
                        src={require('../../utils/img/Logo_Larghetto.png')}
                        alt="Larghetto"
                        style={{
                            width: '100%',
                            maxWidth: '140px',
                            height: 'auto',
                            filter: 'brightness(0) invert(1)'
                        }}
                    />
                </div>

                {/* Menu Items */}
                <div style={{ flex: 1, overflowY: 'auto' }}>
                    {menuItems.map((item, index) => (
                        <Link
                            key={index}
                            to={item.path}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: isExpanded ? 'flex-start' : 'center',
                                gap: isExpanded ? '1rem' : '0',
                                padding: '0.75rem',
                                margin: '0.25rem 0',
                                borderRadius: '10px',
                                textDecoration: 'none',
                                color: isActive(item.path) ? '#60A5FA' : '#9CA3AF',
                                background: isActive(item.path) ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                                borderLeft: isActive(item.path) ? '3px solid #60A5FA' : '3px solid transparent',
                                fontWeight: isActive(item.path) ? '600' : '400',
                                fontSize: '0.95rem',
                                transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                                if (!isActive(item.path)) {
                                    e.currentTarget.style.background = '#374151';
                                    e.currentTarget.style.color = '#FFFFFF';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!isActive(item.path)) {
                                    e.currentTarget.style.background = 'transparent';
                                    e.currentTarget.style.color = '#9CA3AF';
                                }
                            }}
                        >
                            <div style={{ minWidth: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {item.icon}
                            </div>
                            {isExpanded && <span>{item.label}</span>}
                        </Link>
                    ))}
                </div>

                {/* Footer */}
                <div style={{
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    paddingTop: '1rem',
                    marginTop: '1rem'
                }}>
                    <div
                        onClick={handleLogout}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: isExpanded ? 'flex-start' : 'center',
                            gap: '1rem',
                            padding: '0.75rem',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            color: '#EF4444',
                            background: 'transparent',
                            transition: 'all 0.2s ease',
                            fontSize: '0.95rem'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                        }}
                    >
                        <div style={{ minWidth: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <FeatherIcon icon={'log-out'} size={24} />
                        </div>
                        {isExpanded && <span>Cerrar Sesión</span>}
                    </div>
                </div>
            </div>

            {/* Sidebar Mobile */}
            <div
                className="d-md-none"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    height: '100vh',
                    width: '80vw',
                    maxWidth: '280px',
                    background: '#111827',
                    display: 'flex',
                    flexDirection: 'column',
                    zIndex: 1000,
                    transition: 'transform 0.3s ease',
                    transform: mobileOpen ? 'translateX(0)' : 'translateX(-100%)',
                    borderRight: '1px solid rgba(255, 255, 255, 0.1)',
                    padding: '1.5rem 1rem'
                }}
            >
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '2rem', padding: '0 0.5rem' }}>
                    <img
                        src={require('../../utils/img/Logo_Larghetto.png')}
                        alt="Larghetto"
                        style={{
                            width: '100%',
                            maxWidth: '140px',
                            height: 'auto',
                            filter: 'brightness(0) invert(1)'
                        }}
                    />
                </div>

                {/* Menu Items */}
                <div style={{ flex: 1, overflowY: 'auto' }}>
                    {menuItems.map((item, index) => (
                        <Link
                            key={index}
                            to={item.path}
                            onClick={() => setMobileOpen(false)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                padding: '0.75rem 1rem',
                                margin: '0.25rem 0',
                                borderRadius: '10px',
                                textDecoration: 'none',
                                color: isActive(item.path) ? '#60A5FA' : '#9CA3AF',
                                background: isActive(item.path) ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                                borderLeft: isActive(item.path) ? '3px solid #60A5FA' : '3px solid transparent',
                                fontWeight: isActive(item.path) ? '600' : '400',
                                fontSize: '0.95rem',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <div style={{ minWidth: '24px' }}>
                                {item.icon}
                            </div>
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </div>

                {/* Footer */}
                <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '1rem' }}>
                    <div
                        onClick={() => { handleLogout(); setMobileOpen(false); }}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            padding: '0.75rem 1rem',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            color: '#EF4444',
                            fontSize: '0.95rem'
                        }}
                    >
                        <FeatherIcon icon={'log-out'} size={24} />
                        <span>Cerrar Sesión</span>
                    </div>
                </div>
            </div>

            {/* Overlay para cerrar en mobile */}
            {mobileOpen && (
                <div
                    onClick={() => setMobileOpen(false)}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 999
                    }}
                    className="d-md-none"
                />
            )}
        </>
    );
}

export default AdminSidebar;
