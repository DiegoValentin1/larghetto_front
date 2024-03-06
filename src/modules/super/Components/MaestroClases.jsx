import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Form, Modal, FormGroup } from 'react-bootstrap';
import AxiosClient from '../../../shared/plugins/axios';
import Alert, { confirmMsj, confirmTitle, succesMsj, successTitle, errorMsj, errorTitle } from '../../../shared/plugins/alerts';
import '../../../utils/styles/MaestroClases.css';
import * as XLSX from 'xlsx';

export const MaestroClases = ({ isOpen, cargarDatos, onClose, option, objeto }) => {
  const [clases, setClases] = useState([]);
  useEffect(() => {
    const fetchMaterial = async () => {
      const response = await AxiosClient({
        method: "GET",
        url: "/clase/" + objeto.user_id,
      });
      if (!response.error) {
        const temp = response.map((obj)=>{
          return {...obj, alumnos:obj.alumnos.split(',')}
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
          clases.map((clase)=><div className="HorarioCardMain">
          <div className="HorarioTop">
            <p>{clase.dia}</p>
            <p>{clase.instrumento}</p>
            <p>{clase.hora}</p>

          </div>
          <div className="HorarioBottom">
          {clase.alumnos.map((alumno)=> <p>{alumno}</p>)}
          </div>
        </div>)
        }
      </div>
    </Modal.Body>
  </Modal>
};
