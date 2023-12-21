import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Form, Modal, FormGroup } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import FeatherIcon from 'feather-icons-react'
import AxiosClient from '../../../../shared/plugins/axios';
import Alert, { confirmMsj, confirmTitle, succesMsj, successTitle, errorMsj, errorTitle } from '../../../../shared/plugins/alerts';
import '../../../../utils/styles/SuperDashboard.css';
import { TbHomeSearch } from 'react-icons/tb';
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'

export const ChartAlumnos = ({ isOpen, onClose, alumnosActivos, titulo }) => {
  const [diasAnio, setDiasAnio] = useState(['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']);

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
      <Modal.Title>{titulo}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div style={{width:"100%", display:"flex", justifyContent:"center", alignItems:"center"}}>
      <Bar data={{ labels: diasAnio, datasets: [{ label: "Alumnos Inscritos", data: alumnosActivos && alumnosActivos }] }} />
      </div>
    </Modal.Body>
  </Modal>
};