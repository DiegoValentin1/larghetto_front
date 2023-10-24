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

export const ChartAlumnos = ({ isOpen, cargarDatos, onClose, option, alumnosActivos }) => {
  const data = [
    {
      name: 'Page A',
      uv: 590,
      pv: 800,
      amt: 1400,
    },
    {
      name: 'Page B',
      uv: 868,
      pv: 967,
      amt: 1506,
    },
    {
      name: 'Page C',
      uv: 1397,
      pv: 1098,
      amt: 989,
    },
    {
      name: 'Page D',
      uv: 1480,
      pv: 1200,
      amt: 1228,
    },
    {
      name: 'Page E',
      uv: 1520,
      pv: 1108,
      amt: 1100,
    },
    {
      name: 'Page F',
      uv: 1400,
      pv: 680,
      amt: 1700,
    },
  ];

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
      <Modal.Title>Registro Historico de Alumnos</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div style={{width:"100%", display:"flex", justifyContent:"center", alignItems:"center"}}>
      <Bar data={{ labels: ["Agosto", "Septiembre", "Octubre"], datasets: [{ label: "Alumnos Inscritos", data: [4, 5, alumnosActivos] }] }} />
      </div>
    </Modal.Body>
  </Modal>
};