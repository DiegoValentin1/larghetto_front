import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'

export const ChartAlumnos = ({ isOpen, onClose, alumnosActivos, titulo }) => {
  const [diasAnio, setDiasAnio] = useState(['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']);

  const handleClose = () => {
    onClose();
  }

  return (
    <Modal
      show={isOpen}
      onHide={handleClose}
      size="xl"
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
          {titulo}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{
        padding: '2rem',
        backgroundColor: '#FFFFFF'
      }}>
        <div style={{
          width: "100%",
          height: "500px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <Bar
            data={{
              labels: diasAnio,
              datasets: [{
                label: "Alumnos Inscritos",
                data: alumnosActivos && alumnosActivos,
                backgroundColor: '#2563EB',
                borderColor: '#1D4ED8',
                borderWidth: 1
              }]
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: true,
                  position: 'top'
                }
              }
            }}
          />
        </div>
      </Modal.Body>
    </Modal>
  );
};