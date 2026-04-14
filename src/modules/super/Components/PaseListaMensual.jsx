import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import AxiosClient from '../../../shared/plugins/axios';

const MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const DIA_CORTO = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];
const DIAS_DB   = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];

const formatHeader = (fechaStr) => {
  const [y, m, d] = fechaStr.split('-').map(Number);
  const dow = new Date(y, m - 1, d).getDay();
  return { dia: DIA_CORTO[dow], num: d };
};

const getDiaNombreDB = (fechaStr) => {
  const [y, m, d] = fechaStr.split('-').map(Number);
  return DIAS_DB[new Date(y, m - 1, d).getDay()];
};

export const PaseListaMensual = ({ isOpen, onClose, objeto }) => {
  const hoy = new Date();
  const [currentDate, setCurrentDate] = useState({ year: hoy.getFullYear(), month: hoy.getMonth() + 1 });
  const [data, setData]     = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen || !objeto?.user_id) return;
    const fetchData = async () => {
      setLoading(true);
      setData(null);
      try {
        const res = await AxiosClient({
          method: 'GET',
          url: `/clase/pase-lista/${objeto.user_id}?year=${currentDate.year}&month=${currentDate.month}`,
        });
        setData(res);
      } catch {
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [isOpen, objeto?.user_id, currentDate]);

  const prevMes = () => {
    setCurrentDate(prev => prev.month === 1
      ? { year: prev.year - 1, month: 12 }
      : { year: prev.year, month: prev.month - 1 }
    );
  };

  const nextMes = () => {
    const esUltimo = currentDate.year === hoy.getFullYear() && currentDate.month === hoy.getMonth() + 1;
    if (esUltimo) return;
    setCurrentDate(prev => prev.month === 12
      ? { year: prev.year + 1, month: 1 }
      : { year: prev.year, month: prev.month + 1 }
    );
  };

  const esUltimoMes = currentDate.year === hoy.getFullYear() && currentDate.month === hoy.getMonth() + 1;

  const { fechas = [], alumnos = [], matriz = {}, diasPorAlumno = {}, resumen = {} } = data || {};

  return (
    <Modal
      backdrop="static"
      keyboard={false}
      show={isOpen}
      onHide={onClose}
      size="xl"
      centered
      style={{ backdropFilter: 'blur(4px)' }}
    >
      <Modal.Header
        closeButton
        style={{ backgroundColor: '#F9FAFB', borderBottom: '2px solid #E5E7EB', padding: '0.875rem 1.5rem' }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* Navegación de mes */}
            <button onClick={prevMes} style={btnNavStyle}>
              <MdChevronLeft size={18} />
            </button>
            <Modal.Title style={{ fontSize: '1.05rem', fontWeight: '700', color: '#1F2937', margin: 0 }}>
              {MESES[currentDate.month - 1]} {currentDate.year} — {objeto?.name}
            </Modal.Title>
            <button onClick={nextMes} disabled={esUltimoMes} style={{ ...btnNavStyle, color: esUltimoMes ? '#D1D5DB' : '#6B7280', cursor: esUltimoMes ? 'not-allowed' : 'pointer' }}>
              <MdChevronRight size={18} />
            </button>
          </div>
        </div>
      </Modal.Header>

      <Modal.Body style={{ padding: '1.25rem', backgroundColor: '#FFFFFF', maxHeight: '80vh', overflowY: 'auto' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#6B7280' }}>Cargando...</div>
        ) : !data || fechas.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#6B7280', fontSize: '0.9rem' }}>
            Sin actividad registrada este mes
          </div>
        ) : (
          <>
            {/* KPI cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <KpiCard label="Días con actividad" value={resumen.total_fechas} color="#2563EB" />
              <KpiCard label="Alumnos" value={resumen.total_alumnos} color="#6B7280" />
              <KpiCard label="Asistencias" value={resumen.total_asistencias} color="#10B981" />
              <KpiCard label="Reposiciones" value={resumen.total_repos} color="#F59E0B" />
            </div>

            {/* Tabla matriz */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: '0.78rem' }}>
                <thead>
                  <tr>
                    {/* Columna nombre — sticky */}
                    <th style={{
                      position: 'sticky', left: 0, zIndex: 2,
                      backgroundColor: '#F9FAFB',
                      borderBottom: '2px solid #E5E7EB',
                      borderRight: '2px solid #E5E7EB',
                      padding: '0.5rem 0.75rem',
                      fontWeight: '700', color: '#374151',
                      minWidth: '160px',
                      paddingTop: '3.5rem', // espacio para los headers diagonales
                    }}>
                      Alumno
                    </th>
                    {fechas.map(fecha => {
                      const { dia, num } = formatHeader(fecha);
                      return (
                        <th key={fecha} style={{
                          height: '80px',
                          verticalAlign: 'bottom',
                          borderBottom: '2px solid #E5E7EB',
                          padding: '0',
                          minWidth: '36px',
                          maxWidth: '36px',
                          width: '36px',
                          position: 'relative',
                        }}>
                          <div style={{
                            transform: 'rotate(-45deg)',
                            transformOrigin: 'bottom left',
                            whiteSpace: 'nowrap',
                            position: 'absolute',
                            bottom: '8px',
                            left: '50%',
                            fontSize: '0.65rem',
                            fontWeight: '600',
                            color: '#6B7280',
                            lineHeight: 1.2,
                          }}>
                            <div>{dia}</div>
                            <div style={{ fontWeight: '700', color: '#1F2937' }}>{num}</div>
                          </div>
                        </th>
                      );
                    })}
                    <th style={{ borderBottom: '2px solid #E5E7EB', padding: '0.5rem 0.5rem', fontWeight: '700', color: '#374151', textAlign: 'center', minWidth: '50px', paddingTop: '3.5rem' }}>
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {alumnos.map((alumno, idx) => {
                    const fila = matriz[alumno.id] || {};
                    const diasAlumno = diasPorAlumno[alumno.id] || [];
                    // Fechas que le corresponden a este alumno
                    const fechasAlumno = fechas.filter(f => diasAlumno.includes(getDiaNombreDB(f)));
                    const asistidas = fechasAlumno.filter(f => fila[f] === 'A' || fila[f] === 'R').length;
                    const rowBg = idx % 2 === 0 ? '#FFFFFF' : '#F9FAFB';
                    return (
                      <tr key={alumno.id} style={{ backgroundColor: rowBg }}>
                        <td style={{
                          position: 'sticky', left: 0, zIndex: 1,
                          backgroundColor: rowBg,
                          borderRight: '2px solid #E5E7EB',
                          borderBottom: '1px solid #F3F4F6',
                          padding: '0.4rem 0.75rem',
                          fontWeight: '500', color: '#1F2937',
                          whiteSpace: 'nowrap',
                        }}>
                          {alumno.nombre}
                        </td>
                        {fechas.map(fecha => {
                          const aplica = diasAlumno.includes(getDiaNombreDB(fecha));
                          const estado = fila[fecha];
                          if (!aplica) {
                            return (
                              <td key={fecha} style={{
                                borderBottom: '1px solid #E5E7EB',
                                borderLeft: '1px solid #E5E7EB',
                                backgroundColor: '#D1D5DB',
                              }} />
                            );
                          }
                          return (
                            <td key={fecha} style={{
                              textAlign: 'center',
                              borderBottom: '1px solid #E5E7EB',
                              borderLeft: '1px solid #E5E7EB',
                              padding: '0.25rem',
                              backgroundColor: estado === 'A' ? '#ECFDF5' : estado === 'R' ? '#FFFBEB' : rowBg,
                            }}>
                              {estado === 'A' && <span style={{ color: '#10B981', fontWeight: '700', fontSize: '0.75rem' }}>✓</span>}
                              {estado === 'R' && <span style={{ color: '#D97706', fontWeight: '700', fontSize: '0.7rem' }}>R</span>}
                            </td>
                          );
                        })}
                        <td style={{
                          textAlign: 'center',
                          borderBottom: '1px solid #F3F4F6',
                          borderLeft: '2px solid #E5E7EB',
                          padding: '0.25rem 0.5rem',
                          fontWeight: '700',
                          color: asistidas > 0 ? '#1F2937' : '#D1D5DB',
                          fontSize: '0.75rem',
                        }}>
                          {asistidas}/{fechasAlumno.length}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

const KpiCard = ({ label, value, color }) => (
  <div style={{ borderLeft: `4px solid ${color}`, borderRadius: '8px', border: '1px solid #E5E7EB', padding: '0.75rem 1rem', backgroundColor: '#fff' }}>
    <div style={{ fontSize: '0.68rem', color: '#6B7280', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>{label}</div>
    <div style={{ fontSize: '1.5rem', fontWeight: '700', color }}>{value ?? 0}</div>
  </div>
);

const btnNavStyle = {
  width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center',
  borderRadius: '6px', border: '1.5px solid #D1D5DB', backgroundColor: '#fff',
  cursor: 'pointer', color: '#6B7280', padding: 0, flexShrink: 0,
};
