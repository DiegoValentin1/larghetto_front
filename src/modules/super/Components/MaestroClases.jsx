import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Form, Modal, FormGroup } from 'react-bootstrap';
import AxiosClient from '../../../shared/plugins/axios';
import Alert, { confirmMsj, confirmTitle, succesMsj, successTitle, errorMsj, errorTitle } from '../../../shared/plugins/alerts';
import '../../../utils/styles/MaestroClases.css';
import * as XLSX from 'xlsx';
const {campus, role} = JSON.parse(localStorage.getItem('user') || null)?.data;

export const MaestroClases = ({ isOpen, cargarDatos, onClose, option, objeto }) => {
  const [clases, setClases] = useState([]);

  useEffect(() => {
    console.log(campus, role);
    const diasOrdenados = {
      "Lunes": 1,
      "Martes": 2,
      "Miercoles": 3,
      "Jueves": 4,
      "Viernes": 5,
      "Sabado": 6,
      "Domingo": 7
    };
    const fetchMaterial = async () => {
      const response = await AxiosClient({
        method: "GET",
        url: role === "SUPER" ? `/clase/${objeto.user_id}` : `/clase/maestro/${objeto.user_id}/${campus}`,
      });
      if (!response.error) {
        const temp = response.map((obj) => {
          return { ...obj, alumnos: obj.alumnos.split(',') }
        });

        temp.sort((a, b) => {
          return diasOrdenados[a.dia] - diasOrdenados[b.dia];
        });
        console.log(temp);
        setClases(temp);
        return response;
      }
    };
    fetchMaterial();
  }, []);

  const handleClose = () => {
    onClose();
  }
  return <Modal
    backdrop='static'
    keyboard={false}
    show={isOpen}
    onHide={handleClose}
    style={{ width: "90vw", display: "flex", alignContent: "start", justifyItems: "start", marginLeft: "5vw", padding: "0", height: "auto", backgroundColor: "white", borderRadius: "1rem", marginTop: "1rem" }}
    dialogClassName="modalAlumnoActualizar"
    id="modalAlumnoR"
  >
    <Modal.Header closeButton >
      <Modal.Title>
        Clases del Maestro {objeto.name}
      </Modal.Title>
    </Modal.Header>

    <Modal.Body>
      <div className='ClasesMain'>
        {
          clases.map((clase) => <div className="HorarioCardMain">
            <div className="HorarioTop">
              <p>{clase.dia}</p>
              <p>{clase.instrumento}</p>
              <p>{clase.hora}</p>

            </div>
            <div className="HorarioBottom">
              {clase.alumnos.map((alumno) => <p>{alumno}</p>)}
            </div>
          </div>)
        }
      </div>
    </Modal.Body>
  </Modal>
};
