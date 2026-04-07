import React, { useEffect, useState, useCallback, useRef } from 'react'
import { Modal } from 'react-bootstrap';
import { MdCalendarToday } from 'react-icons/md';
import AxiosClient from '../../../shared/plugins/axios';
import Alert from '../../../shared/plugins/alerts';
import '../../../utils/styles/MaestroClases.css';

const DIAS_ORDEN = { Lunes: 1, Martes: 2, Miercoles: 3, Jueves: 4, Viernes: 5, Sabado: 6, Domingo: 7 };
const DIA_CORTO  = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const MES_CORTO  = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];

const hoy = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const DIAS_ES   = ['domingo','lunes','martes','miércoles','jueves','viernes','sábado'];
const MESES_ES  = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];

const formatFechaLarga = (fechaStr) => {
  const [y, m, d] = fechaStr.split('-').map(Number);
  const fecha = new Date(y, m - 1, d);
  const dia   = DIAS_ES[fecha.getDay()];
  const mes   = MESES_ES[fecha.getMonth()];
  return `${dia.charAt(0).toUpperCase() + dia.slice(1)} ${d} de ${mes} de ${y}`;
};

/** Últimos N días hasta hoy (incluyendo hoy), más reciente al final */
const buildStrip = (diasAtras = 6) => {
  const result = [];
  const base = new Date();
  base.setHours(12, 0, 0, 0);
  for (let i = -diasAtras; i <= 0; i++) {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    const fecha = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    result.push({
      fecha,
      diaNombre: DIA_CORTO[d.getDay()],
      diaNum: d.getDate(),
      mes: MES_CORTO[d.getMonth()],
      esHoy: fecha === hoy(),
    });
  }
  return result;
};

const claseKey = (c) => `${c.dia}__${c.hora}__${c.instrumento}`;

export const MaestroClases = ({ isOpen, cargarDatos, onClose, option, objeto }) => {
  const session = JSON.parse(localStorage.getItem('user') || null);
  const role   = session?.data?.role;
  const campus = session?.data?.campus;

  const [clases, setClases]         = useState([]);
  const [selectedFecha, setSelectedFecha] = useState(hoy);
  const [alumnosMap, setAlumnosMap]  = useState({});
  const [loadingSet, setLoadingSet]  = useState(new Set());
  const [savingSet, setSavingSet]    = useState(new Set());

  const strip = buildStrip(6);

  // ── Cargar clases del maestro ──────────────────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;
    setAlumnosMap({});
    setSelectedFecha(hoy());
    const fetchClases = async () => {
      const url = role === 'SUPER'
        ? `/clase/${objeto.user_id}`
        : `/clase/maestro/${objeto.user_id}/${campus}`;
      const res = await AxiosClient({ method: 'GET', url });
      if (!Array.isArray(res)) return;
      const sorted = res
        .map(c => ({ ...c, alumnos: c.alumnos ? c.alumnos.split(',') : [] }))
        .sort((a, b) => (DIAS_ORDEN[a.dia] || 9) - (DIAS_ORDEN[b.dia] || 9));
      setClases(sorted);
    };
    fetchClases();
  }, [isOpen]);

  // ── Cargar asistencias para la fecha seleccionada ─────────────────────────
  const fetchAlumnosParaFecha = useCallback(async (clasesList, fecha) => {
    if (!clasesList.length) return;
    setLoadingSet(new Set(clasesList.map(claseKey)));
    const newMap = {};
    await Promise.all(clasesList.map(async (clase) => {
      const key = claseKey(clase);
      try {
        const params = new URLSearchParams({ dia: clase.dia, hora: clase.hora, instrumento: clase.instrumento, fecha });
        const res = await AxiosClient({ method: 'GET', url: `/clase/alumnos/${objeto.user_id}?${params}` });
        newMap[key] = Array.isArray(res) ? res : [];
      } catch {
        newMap[key] = [];
      }
    }));
    setAlumnosMap(newMap);
    setLoadingSet(new Set());
  }, [objeto.user_id]);

  useEffect(() => {
    if (clases.length > 0) {
      fetchAlumnosParaFecha(clases, selectedFecha);
    }
  }, [clases, selectedFecha]);

  // ── Toggle asistencia (auto-save optimista) ────────────────────────────────
  const handleToggle = async (clase, alumno) => {
    const key     = claseKey(clase);
    const saveKey = `${alumno.id_alumno}-${alumno.id_clase}`;
    if (savingSet.has(saveKey)) return;

    const marcado = !!alumno.asistio;

    setAlumnosMap(prev => ({
      ...prev,
      [key]: prev[key].map(a =>
        a.id_alumno === alumno.id_alumno && a.id_clase === alumno.id_clase
          ? { ...a, asistio: !marcado }
          : a
      ),
    }));
    setSavingSet(prev => new Set([...prev, saveKey]));

    try {
      if (!marcado) {
        await AxiosClient({
          method: 'POST',
          url: '/personal/alumno/asistencias',
          data: { id_alumno: alumno.id_alumno, fecha: selectedFecha, id_clase: alumno.id_clase },
        });
      } else {
        await AxiosClient({
          method: 'DELETE',
          url: `/personal/alumno/asistencias/${alumno.id_alumno}/${selectedFecha}/${alumno.id_clase}`,
        });
      }
    } catch {
      setAlumnosMap(prev => ({
        ...prev,
        [key]: prev[key].map(a =>
          a.id_alumno === alumno.id_alumno && a.id_clase === alumno.id_clase
            ? { ...a, asistio: marcado }
            : a
        ),
      }));
      Alert.fire({ title: 'Error', text: 'No se pudo guardar', icon: 'error', timer: 2000, showConfirmButton: false });
    } finally {
      setSavingSet(prev => { const s = new Set(prev); s.delete(saveKey); return s; });
    }
  };

  const handleFechaExterna = (e) => {
    const val = e.target.value;
    if (val && val <= hoy()) setSelectedFecha(val);
  };

  // ── Render ─────────────────────────────────────────────────────────────────
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
      {/* Header custom para controlar el layout sin romper el botón X */}
      <Modal.Header
        closeButton
        style={{ backgroundColor: '#F9FAFB', borderBottom: '2px solid #E5E7EB', padding: '0.875rem 1.5rem', gap: '1rem', alignItems: 'flex-start' }}
      >
        {/* Wrapper que ocupa todo el espacio a la izquierda del X */}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
          <Modal.Title style={{ fontSize: '1.1rem', fontWeight: '700', color: '#1F2937', lineHeight: 1.3 }}>
            Clases — {objeto?.name}
          </Modal.Title>

          {/* Strip de fechas + picker */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {/* Días del strip, distribuidos uniformemente */}
            <div style={{ display: 'flex', flex: 1, gap: '0.3rem' }}>
              {strip.map(({ fecha, diaNombre, diaNum, mes, esHoy }) => {
                const selected = fecha === selectedFecha;
                return (
                  <button
                    key={fecha}
                    onClick={() => setSelectedFecha(fecha)}
                    title={fecha}
                    style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      padding: '0.3rem 0.2rem',
                      borderRadius: '7px',
                      border: selected ? '1.5px solid #2563EB' : esHoy ? '1.5px solid #2563EB' : '1.5px solid transparent',
                      cursor: 'pointer',
                      backgroundColor: selected ? '#2563EB' : esHoy ? '#DBEAFE' : 'transparent',
                      color: selected ? '#fff' : esHoy ? '#1D4ED8' : '#6B7280',
                      fontWeight: esHoy ? '700' : '400',
                      transition: 'all 0.12s',
                      minWidth: 0,
                    }}
                    onMouseEnter={e => { if (!selected) e.currentTarget.style.backgroundColor = esHoy ? '#BFDBFE' : '#F3F4F6'; }}
                    onMouseLeave={e => { if (!selected) e.currentTarget.style.backgroundColor = esHoy ? '#DBEAFE' : 'transparent'; }}
                  >
                    <span style={{ fontSize: '0.6rem', fontWeight: '600', textTransform: 'uppercase', lineHeight: 1.3 }}>{diaNombre}</span>
                    <span style={{ fontSize: '0.95rem', fontWeight: '700', lineHeight: 1.2 }}>{diaNum}</span>
                    <span style={{ fontSize: '0.58rem', opacity: 0.75, lineHeight: 1.2 }}>{mes}</span>
                  </button>
                );
              })}
            </div>

            {/* Separador */}
            <div style={{ width: '1px', height: '36px', backgroundColor: '#D1D5DB', flexShrink: 0 }} />

            {/* Date picker para fechas anteriores */}
            {(() => {
              const fueraDelStrip = !strip.find(d => d.fecha === selectedFecha);
              return (
                <div
                  onClick={() => document.getElementById('mc-date-picker')?.showPicker?.()}
                  style={{
                    position: 'relative', flexShrink: 0, cursor: 'pointer',
                    border: fueraDelStrip ? '1.5px solid #2563EB' : '1.5px solid #D1D5DB',
                    borderRadius: '7px',
                    backgroundColor: fueraDelStrip ? '#DBEAFE' : '#fff',
                    padding: '0.35rem 0.75rem 0.35rem 0.5rem',
                    display: 'flex', alignItems: 'center', gap: '0.3rem',
                    fontSize: '0.75rem', color: fueraDelStrip ? '#1D4ED8' : '#6B7280',
                    fontWeight: fueraDelStrip ? '700' : '400',
                    userSelect: 'none',
                    minWidth: '80px',
                  }}
                >
                  <MdCalendarToday size={13} />
                  <span>{fueraDelStrip ? selectedFecha : 'Otra fecha'}</span>
                  <input
                    id="mc-date-picker"
                    type="date"
                    max={hoy()}
                    value={fueraDelStrip ? selectedFecha : ''}
                    onChange={handleFechaExterna}
                    style={{ position: 'absolute', inset: 0, opacity: 0, width: '100%', height: '100%', cursor: 'pointer' }}
                  />
                </div>
              );
            })()}
          </div>

          {/* Indicador de fecha seleccionada si es del picker */}
          {!strip.find(d => d.fecha === selectedFecha) && selectedFecha && (
            <div style={{ fontSize: '0.72rem', color: '#1D4ED8', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <MdCalendarToday size={12} />
              {formatFechaLarga(selectedFecha)}
            </div>
          )}
        </div>
      </Modal.Header>

      <Modal.Body style={{ padding: '1.25rem', backgroundColor: '#FFFFFF', maxHeight: '70vh', overflowY: 'auto' }}>
        {clases.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#6B7280', fontSize: '0.9rem' }}>
            Sin clases registradas
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
            {clases.map((clase, idx) => {
              const key      = claseKey(clase);
              const alumnos  = alumnosMap[key] || [];
              const cargando = loadingSet.has(key);
              const presentes = alumnos.filter(a => !!a.asistio).length;

              return (
                <div key={idx} style={{ borderRadius: '10px', border: '2px solid #E5E7EB', overflow: 'hidden', backgroundColor: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
                  {/* Header tarjeta */}
                  <div style={{ padding: '0.5rem 0.875rem', backgroundColor: '#2563EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: '700', color: '#fff', fontSize: '0.82rem' }}>{clase.dia}</span>
                    <span style={{ fontWeight: '600', color: '#fff', fontSize: '0.82rem' }}>{clase.instrumento}</span>
                    <span style={{ color: '#fff', fontSize: '0.75rem', backgroundColor: 'rgba(255,255,255,0.2)', padding: '0.15rem 0.45rem', borderRadius: '5px' }}>
                      {clase.hora}
                    </span>
                    {!cargando && alumnos.length > 0 && (
                      <span style={{ fontSize: '0.68rem', fontWeight: '700', backgroundColor: presentes > 0 ? '#D1FAE5' : 'rgba(255,255,255,0.15)', color: presentes > 0 ? '#065F46' : 'rgba(255,255,255,0.8)', borderRadius: '999px', padding: '0.1rem 0.45rem' }}>
                        {presentes}/{alumnos.length}
                      </span>
                    )}
                  </div>

                  {/* Alumnos */}
                  <div style={{ padding: '0.625rem', display: 'flex', flexDirection: 'column', gap: '0.3rem', maxHeight: '200px', overflowY: 'auto' }}>
                    {cargando ? (
                      <div style={{ textAlign: 'center', padding: '1.25rem 0', color: '#9CA3AF', fontSize: '0.8rem' }}>Cargando…</div>
                    ) : alumnos.length === 0 ? (
                      <div style={{ textAlign: 'center', padding: '1.25rem 0', color: '#9CA3AF', fontSize: '0.8rem' }}>Sin alumnos</div>
                    ) : alumnos.map((alumno, aidx) => {
                      const saveKey  = `${alumno.id_alumno}-${alumno.id_clase}`;
                      const guardando = savingSet.has(saveKey);
                      const asistio   = !!alumno.asistio;

                      return (
                        <div
                          key={aidx}
                          onClick={() => !guardando && handleToggle(clase, alumno)}
                          style={{
                            display: 'flex', alignItems: 'center', gap: '0.5rem',
                            padding: '0.4rem 0.5rem', borderRadius: '6px',
                            border: asistio ? '1.5px solid #10B981' : '1.5px solid #E5E7EB',
                            backgroundColor: asistio ? '#ECFDF5' : '#F9FAFB',
                            cursor: guardando ? 'wait' : 'pointer',
                            transition: 'all 0.12s', opacity: guardando ? 0.65 : 1,
                            userSelect: 'none',
                          }}
                        >
                          {/* Checkbox visual */}
                          <div style={{
                            width: '15px', height: '15px', borderRadius: '4px', flexShrink: 0,
                            border: asistio ? '2px solid #10B981' : '2px solid #D1D5DB',
                            backgroundColor: asistio ? '#10B981' : '#fff',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            transition: 'all 0.12s',
                          }}>
                            {asistio && !guardando && (
                              <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                                <path d="M1 3.5L3 5.5L8 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )}
                            {guardando && (
                              <div style={{ width: '7px', height: '7px', borderRadius: '50%', border: '1.5px solid #9CA3AF', borderTopColor: 'transparent', animation: 'spin 0.6s linear infinite' }} />
                            )}
                          </div>

                          <span style={{ fontSize: '0.8rem', color: '#1F2937', flex: 1, lineHeight: 1.3 }}>
                            {alumno.name}
                            {alumno.matricula && (
                              <span style={{ color: '#9CA3AF', marginLeft: '0.3rem', fontSize: '0.72rem' }}>{alumno.matricula}</span>
                            )}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};
