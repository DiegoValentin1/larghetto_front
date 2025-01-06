import React, { useState, useEffect } from 'react'
import Alert, { confirmMsj, confirmTitle, succesMsj, successTitle, errorMsj, errorTitle } from '../plugins/alerts';
import '../../utils/styles/noti.css'
import AxiosClient from '../plugins/axios';

export default function CoyoacanNoti() {

    const session = JSON.parse(localStorage.getItem('user') || null);
    const [switchActivo, setSwitchActivo] = useState(true);
    const [alumnos, setAlumnos] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const fetchMaterial = async () => {
        const response = await AxiosClient({
            method: "GET",
            url: "/stats/last/CDMX"
        });
        if (!response.error) {
            console.log(response);
            setAlumnos([{ fecha: response[0].proximo_pago.slice(0, 10), nombre: response[0].name, color: devolverColor(response[0].proximo_pago.slice(0, 10)) },
            { fecha: response[1]?.proximo_pago.slice(0, 10), nombre: response[1]?.name, color: devolverColor(response[1]?.proximo_pago.slice(0, 10)) },
            { fecha: response[2]?.proximo_pago.slice(0, 10), nombre: response[2]?.name, color: devolverColor(response[2]?.proximo_pago.slice(0, 10)) }]);
        }
    };

    const playSound = () => {
        const audio = new Audio(require('../../utils/doorbell.mp3'));
        audio.play().catch(error => console.error("Error al reproducir el audio:", error));
      };

    useEffect(() => {
        fetchMaterial();
    }, []);

    const devolverColor = (fechaDeseada) => {
        const fechaComparar = new Date(fechaDeseada); // Convertir la fecha deseada a tipo Date

        const fechaActual = new Date(); // Obtener la fecha actual

        // Obtener la diferencia en milisegundos entre las fechas
        const diferenciaTiempo = fechaComparar - fechaActual;
        const diferenciaDias = diferenciaTiempo / (1000 * 3600 * 24);

        // Verificar las condiciones usando un if ternario
        const resultado = diferenciaTiempo <= 0
            ? ['red', 'white']
            : diferenciaDias <= 7 && diferenciaDias >= 1
                ? ['yellow', 'grey']
                : ['green', 'white'];
        return resultado;
    }
    useEffect(() => {
        const ws = new WebSocket('ws://104.237.128.187:8080');
        // const ws = new WebSocket('ws://192.168.100.16:8080');
        ws.onopen = () => {
            console.log('Conexión WebSocket establecida');
        };
        ws.onmessage = (event) => {
            const campus = JSON.parse(event.data).resultados[0].campus;
            if (campus === 'CDMX') {
                fetchMaterial();
                playSound();
            }
            console.log(event);
        };    
        ws.onclose = () => {
            console.log('Conexión WebSocket cerrada');
        };
        return () => {
            ws.close();
        };
    }, []);
    return (
        <div className='mainNoti'>
            <div className='centerTextNoti' style={{ backgroundColor: alumnos && alumnos[0].color[0], color: alumnos && alumnos[0].color[1] }}>
                <div className='centerTextNoti'>{alumnos ? alumnos[0].nombre : ""}</div>
                <div className='centerTextNoti'>{alumnos ? alumnos[0].fecha : ""}</div>

            </div>
            <div className='centerTextNoti' style={{ backgroundColor: alumnos && alumnos[1].color[0], color: alumnos && alumnos[1].color[1] }}>
            <div className='centerTextNoti'>{alumnos ? alumnos[1].nombre : ""}</div>
                <div className='centerTextNoti'>{alumnos ? alumnos[1].fecha : ""}</div>
            </div>
            <div className='centerTextNoti' style={{ backgroundColor: alumnos && alumnos[2].color[0], color: alumnos && alumnos[2].color[1] }}>
            <div className='centerTextNoti'>{alumnos ? alumnos[2].nombre : ""}</div>
                <div className='centerTextNoti'>{alumnos ? alumnos[2].fecha : ""}</div>
            </div>
        </div>
    )
}

