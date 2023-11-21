import React, { useContext, useEffect } from 'react';
import '../../utils/styles/UserNavbar.css'
import { AuthContext } from "../../modules/auth/authContext";
import Alert, { confirmMsj, confirmTitle, succesMsj, successTitle, errorMsj, errorTitle } from '../plugins/alerts';



const UserNavbar = () => {
    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8080');
        ws.onopen = () => {
          console.log('Conexión WebSocket establecida');
        };
        ws.onmessage = (event) => {
            const fechaPago = JSON.parse(event.data).resultados[0].proximo_pago.slice(0,10);
            const nombre = JSON.parse(event.data).resultados[0].name;
            Alert.fire({
                title: "EXITO",
                text: `El alumno ${nombre} acaba de ingresar.\n Próxima fecha de pago: ${fechaPago}`,
                icon: "success",
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
