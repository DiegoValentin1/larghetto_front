import React, { useContext, useEffect } from 'react';
import '../../utils/styles/UserNavbar.css'
import { AuthContext } from "../../modules/auth/authContext";
import Alert, { confirmMsj, confirmTitle, succesMsj, successTitle, errorMsj, errorTitle } from '../plugins/alerts';



const UserNavbar = () => {

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
    ws.onopen = () => {
      console.log('Conexión WebSocket establecida');
    };
    ws.onmessage = (event) => {
      const fechaPago = JSON.parse(event.data).resultados[0].proximo_pago.slice(0, 10);
      const nombre = JSON.parse(event.data).resultados[0].name;
      const color = devolverColor(fechaPago);
      const fechaPago2 = JSON.parse(event.data).resultados[1].proximo_pago.slice(0, 10);
      const nombre2 = JSON.parse(event.data).resultados[1].name;
      const color2 = devolverColor(fechaPago2);
      const fechaPago3 = JSON.parse(event.data).resultados[2].proximo_pago.slice(0, 10);
      const nombre3 = JSON.parse(event.data).resultados[2].name;
      const color3 = devolverColor(fechaPago3);
      Alert.fire({
        html: `<div style='height: 80vh;width: auto;display: flex;flex-direction: column; margin:10px;'>
              <div style='height: 50%;width: 100%;font-size: 30px; font-weight: bold;display: flex;justify-content: center;align-items: center; border: solid black 1px; background-color:${color[0]}; color:${color[1]};flex-direction:column;'>
              <div style='font-size:23px;margin-right:5px; margin-left:5px;'>${nombre}</div> 
              <div>Próxima fecha de pago: ${fechaPago}</div>
              </div>
              <div style='height: 25%;width: 100%;font-size: 25px; font-weight: bold;display: flex;justify-content: center;align-items: center; border: solid black 1px;background-color:${color2[0]};color:${color2[1]};flex-direction:column;'>
              <div style='font-size:19px;margin-right:5px; margin-left:5px;'>${nombre2}</div>
              <div>Próxima fecha de pago: ${fechaPago2}</div>
              </div>
              <div style='height: 25%;width: 100%;font-size: 25px; font-weight: bold;display: flex;justify-content: center;align-items: center; border: solid black 1px;background-color:${color3[0]};color:${color3[1]};flex-direction:column;'>
              <div style='font-size:19px;margin-right:5px; margin-left:5px;'>${nombre3}</div>
              <div>Próxima fecha de pago: ${fechaPago3}</div>
              </div>
              </div>`,
        showConfirmButton: false,
        customClass: {
          popup: 'ancho-personalizado'
        }
      });
      console.log('Mensaje recibido:', event.data);
    };
    ws.onclose = () => {
      console.log('Conexión WebSocket cerrada');
    };
    return () => {
      ws.close();
    };
  }, []);

  const { user } = useContext(AuthContext);
  console.log(user);

  return (
    <div className='UserNav'>
      <div className='UserData'>
        <div>Larghetto | {user.data.name}</div>
      </div>
    </div>
  );
}

export default UserNavbar;
