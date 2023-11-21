import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Form, Modal, FormGroup } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import FeatherIcon from 'feather-icons-react'
import AxiosClient from '../../../shared/plugins/axios';
import Alert, { confirmMsj, confirmTitle, succesMsj, successTitle, errorMsj, errorTitle } from '../../../shared/plugins/alerts';
import '../../../utils/styles/UserNuevoTrabajo.css';
import { TbHomeSearch} from 'react-icons/tb'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'

export const MaestroChart = ({ isOpen, cargarDatos, onClose, option, objeto }) => {
    const {maestros, setMaestros} = useState([]);
    useEffect(() => {
        const fetchMaterial = async () => {
            const response = await AxiosClient({
                method: "GET",
                url: "/personal/teacher",
            });
            if (!response.error) {
                setMaestros(response);
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
    
    dialogClassName="modalChart"
    id="modalChartAlumno"
  >
    <Modal.Header closeButton >
      <Modal.Title>Registro Historico de Alumnos de {objeto.name && objeto.name}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div style={{width:"100%", display:"flex", justifyContent:"center", alignItems:"center"}}>
      <Bar data={{ labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"], datasets: [{ label: "Alumnos Inscritos", data: [4, 5, 6,4, 5, 6,4, 5, 6,4, 5, 6,4, 5, 6] }] }} />
      </div>
    </Modal.Body>
  </Modal>
};