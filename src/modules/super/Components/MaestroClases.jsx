import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Form, Modal, FormGroup } from 'react-bootstrap';
import AxiosClient from '../../../shared/plugins/axios';
import Alert, { confirmMsj, confirmTitle, succesMsj, successTitle, errorMsj, errorTitle } from '../../../shared/plugins/alerts';
import '../../../utils/styles/MaestroClases.css';
import * as XLSX from 'xlsx';
const session = JSON.parse(localStorage.getItem('user') || null);

export const MaestroClases = ({ isOpen, cargarDatos, onClose, option, objeto }) => {
  const [clases, setClases] = useState([]);

  useEffect(() => {
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
        url: session.data.role && session.data.campus && session.data.role === "SUPER" ? `/clase/${objeto.user_id}` : `/clase/maestro/${objeto.user_id}/${session.data.campus}`,
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
        fontSize: '1.5rem',
        fontWeight: '700',
        color: '#1F2937'
      }}>
        Clases del Maestro {objeto.name}
      </Modal.Title>
    </Modal.Header>

    <Modal.Body style={{
      padding: '2rem',
      backgroundColor: '#FFFFFF',
      maxHeight: '75vh',
      overflow: 'auto'
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {
          clases.map((clase, index) => (
            <div key={index} style={{
              borderRadius: '12px',
              backgroundColor: '#FFFFFF',
              border: '2px solid #E5E7EB',
              overflow: 'hidden',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            >
              <div style={{
                padding: '1rem',
                backgroundColor: '#2563EB',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '0.5rem'
              }}>
                <span style={{ fontSize: '0.875rem', fontWeight: '700', color: '#FFFFFF' }}>{clase.dia}</span>
                <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#FFFFFF' }}>{clase.instrumento}</span>
                <span style={{ fontSize: '0.875rem', color: '#FFFFFF', backgroundColor: 'rgba(255,255,255,0.2)', padding: '0.25rem 0.5rem', borderRadius: '6px' }}>{clase.hora}</span>
              </div>
              <div style={{
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                maxHeight: '200px',
                overflowY: 'auto'
              }}>
                <p style={{ fontSize: '0.75rem', fontWeight: '700', color: '#6B7280', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                  Alumnos ({clase.alumnos.length})
                </p>
                {clase.alumnos.map((alumno, idx) => (
                  <div key={idx} style={{
                    padding: '0.5rem 0.75rem',
                    borderRadius: '6px',
                    backgroundColor: '#F9FAFB',
                    border: '1px solid #E5E7EB',
                    fontSize: '0.875rem',
                    color: '#1F2937'
                  }}>
                    {alumno}
                  </div>
                ))}
              </div>
            </div>
          ))
        }
      </div>
    </Modal.Body>
  </Modal>
};
