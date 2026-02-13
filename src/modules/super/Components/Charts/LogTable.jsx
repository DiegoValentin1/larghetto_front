import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import DataTable from 'react-data-table-component';

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

  const customTableStyles = {
    headRow: {
      style: {
        backgroundColor: '#F3F4F6',
        borderBottom: '2px solid #E5E7EB',
        minHeight: '52px',
      },
    },
    headCells: {
      style: {
        color: '#1F2937',
        fontSize: '0.875rem',
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        paddingLeft: '1rem',
        paddingRight: '1rem',
      },
    },
    rows: {
      style: {
        minHeight: '60px',
        fontSize: '0.875rem',
        color: '#1F2937',
        borderBottom: '1px solid #E5E7EB',
        transition: 'background-color 0.2s ease',
        '&:nth-of-type(odd)': {
          backgroundColor: '#FFFFFF',
        },
        '&:nth-of-type(even)': {
          backgroundColor: '#F9FAFB',
        },
      },
      highlightOnHoverStyle: {
        backgroundColor: '#F3F4F6',
        borderBottomColor: '#D1D5DB',
        outline: '1px solid #E5E7EB',
      },
    },
    cells: {
      style: {
        paddingLeft: '1rem',
        paddingRight: '1rem',
      },
    },
    pagination: {
      style: {
        borderTop: '1px solid #E5E7EB',
        backgroundColor: '#FFFFFF',
        minHeight: '56px',
      },
    },
  };

  const columns = [
    {
      name: 'Fecha',
      selector: (row) => devolverFecha(row.fecha),
      sortable: true,
      width: '250px',
    },
    {
      name: 'Usuario',
      selector: row => row.autor ? row.autor : 'N/A',
      sortable: true,
      width: '200px',
    },
    {
      name: 'Acción',
      selector: row => row.accion,
      sortable: true,
      cell: row => (
        <div style={{ whiteSpace: 'normal', padding: '8px 0' }}>
          {row.accion}
        </div>
      ),
    }
  ];

  const handleClose = () => {
    onClose();
  }

  return (
    <Modal
      show={isOpen}
      onHide={handleClose}
      size="lg"
      centered
      style={{
        backdropFilter: 'blur(4px)'
      }}
    >
      <Modal.Header
        closeButton
        style={{
          backgroundColor: '#F9FAFB',
          borderBottom: '2px solid #E5E7EB',
          padding: '1.25rem 1.5rem'
        }}
      >
        <Modal.Title style={{
          fontSize: '1.25rem',
          fontWeight: '700',
          color: '#1F2937'
        }}>
          Cambios Recientes
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{
        padding: '0',
        backgroundColor: '#FFFFFF',
        maxHeight: '70vh',
        overflow: 'auto'
      }}>
        <DataTable
          columns={columns}
          data={loglist}
          highlightOnHover
          customStyles={customTableStyles}
          pagination
          paginationPerPage={10}
          paginationRowsPerPageOptions={[10, 20, 30]}
          noDataComponent="No hay cambios recientes"
        />
      </Modal.Body>
    </Modal>
  );
};