import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Form, Modal, FormGroup } from 'react-bootstrap';
import '../../../../utils/styles/SuperDashboard.css';
import DataTable from 'react-data-table-component';
import '../../../../utils/styles/DataTable.css';

export const LogTable = ({ isOpen, onClose, loglist }) => {
  const devolverFecha = (fecha) => {
    const opciones = {
      weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric',
      second: 'numeric', hour12: false, timeZone: 'America/Mexico_City'
    };
    const tempfecha = new Date(fecha);
    const fechaFormateada = new Intl.DateTimeFormat('es-ES', opciones).format(tempfecha);
    return fechaFormateada;
  }
  const columns = [
    {
      name: 'Fecha',
      selector: (row)=> devolverFecha(row.fecha),
      sortable: true,
    },
    {
      name: 'Usuario',
      selector: row=> row.autor ? row.autor : 'N/A' ,
      sortable: true,
    },
    {
      name: 'Acción',
      selector: row=><div style={{width:"50vw"}}>{row.accion}</div>,
      sortable: true,
    }
  ];

  const handleClose = () => {
    onClose();
  }
  return <Modal
    backdrop='static'
    keyboard={false}
    show={isOpen}
    onHide={handleClose}

    dialogClassName="modalLog"
    id="modalLog"
  >
    <Modal.Header closeButton >
      <Modal.Title>Cambios Recientes</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div style={{ width: "100%", height:"100%", overflowX:"auto"}} id='tablalog'>
        {/* <DataTable
          title={'Cambios Recientes'}
          columns={columns}
          data={loglist}
          highlightOnHover
          responsive
        /> */}
        {loglist && loglist.map((item)=><div className='tablaLogMain'>
          <div>{devolverFecha(item.fecha)}</div>
          <div>{item.autor}</div>
          <div>{item.accion}</div>
        </div>)}
      </div>
    </Modal.Body>
  </Modal>
};