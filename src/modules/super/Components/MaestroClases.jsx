import React, { useEffect, useState, useCallback } from 'react'
import { Modal } from 'react-bootstrap';
import { MdCalendarToday, MdChevronLeft, MdChevronRight } from 'react-icons/md';
import AxiosClient from '../../../shared/plugins/axios';
import Alert from '../../../shared/plugins/alerts';
import '../../../utils/styles/MaestroClases.css';

const DIAS_ORDEN = { Lunes: 1, Martes: 2, Miercoles: 3, Jueves: 4, Viernes: 5, Sabado: 6, Domingo: 7 };
const DIA_CORTO  = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const MES_CORTO  = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];

// Valores exactos como están en la DB (sin acentos en Miercoles y Sabado)
const DIAS_DB = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];

const toDateStr = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

const hoy = () => toDateStr(new Date());

/** Convierte una fecha YYYY-MM-DD al nombre del día de la semana en formato DB */
const getDiaNombre = (fechaStr) => {
  const [y, m, d] = fechaStr.split('-').map(Number);
  return DIAS_DB[new Date(y, m - 1, d).getDay()];
};

/** Retorna el lunes (Date) de la semana que contiene fechaStr */
const getLunesDe = (fechaStr) => {
  const [y, m, d] = fechaStr.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  date.setHours(12, 0, 0, 0);
  const dow = date.getDay();
  date.setDate(date.getDate() - (dow === 0 ? 6 : dow - 1));
  return date;
};

/** Genera los 7 días (Lun→Dom) de la semana que contiene refFecha */
const buildStrip = (refFecha) => {
  const lunes = getLunesDe(refFecha);
  const todayFecha = hoy();
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(lunes);
    d.setDate(lunes.getDate() + i);
    const fecha = toDateStr(d);
    return { fecha, diaNombre: DIA_CORTO[d.getDay()], diaNum: d.getDate(), mes: MES_CORTO[d.getMonth()], esHoy: fecha === todayFecha };
  });
};

const claseKey = (c) => `${c.dia}__${c.hora}__${c.instrumento}`;

const DIAS_LARGO = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
const formatFechaCorta = (fechaStr) => {
  const [y, m, d] = fechaStr.split('-').map(Number);
  const dow = new Date(y, m - 1, d).getDay();
  return `${DIAS_LARGO[dow]} ${d}`;
};

export const MaestroClases = ({ isOpen, cargarDatos, onClose, option, objeto }) => {
  const session = JSON.parse(localStorage.getItem('user') || null);
  const role   = session?.data?.role;
  const campus = session?.data?.campus;

  const [clases, setClases]         = useState([]);
  const [selectedFecha, setSelectedFecha] = useState(hoy);
  const [alumnosMap, setAlumnosMap]  = useState({});
  const [loadingSet, setLoadingSet]  = useState(new Set());
  const [savingSet, setSavingSet]    = useState(new Set());
  const [repoModal, setRepoModal]    = useState({ open: false, clase: null, alumno: null, fechaRepo: '', slotSel: null });

  const strip = buildStrip(selectedFecha);


  const prevSemana = () => {
    const [y, m, d] = selectedFecha.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    date.setDate(date.getDate() - 7);
    setSelectedFecha(toDateStr(date));
  };

  const nextSemana = () => {
    const [y, m, d] = selectedFecha.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    date.setDate(date.getDate() + 7);
    setSelectedFecha(toDateStr(date));
  };

  // ── Cargar clases del maestro ──────────────────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;
    setAlumnosMap({});
    setSelectedFecha(hoy);  // reset a hoy al abrir
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
      const diaSel = getDiaNombre(selectedFecha);
      const clasesFiltradas = clases.filter(c => c.dia === diaSel);
      setAlumnosMap({});
      fetchAlumnosParaFecha(clasesFiltradas, selectedFecha);
    }
  }, [clases, selectedFecha]);

  // ── Edición: SUPER puede editar cualquier fecha; otros solo hoy ──────────
  const esEditable = (fecha) => role === 'SUPER' || fecha >= hoy();

  // ── Re-fetch de una clase específica ─────────────────────────────────────
  const refetchClase = useCallback(async (clase, fecha) => {
    const key = claseKey(clase);
    setLoadingSet(prev => new Set([...prev, key]));
    try {
      const params = new URLSearchParams({ dia: clase.dia, hora: clase.hora, instrumento: clase.instrumento, fecha });
      const res = await AxiosClient({ method: 'GET', url: `/clase/alumnos/${objeto.user_id}?${params}` });
      setAlumnosMap(prev => ({ ...prev, [key]: Array.isArray(res) ? res : [] }));
    } catch {
      // mantener data anterior si falla el refetch
    } finally {
      setLoadingSet(prev => { const s = new Set(prev); s.delete(key); return s; });
    }
  }, [objeto.user_id]);

  // ── Ciclo 3 estados: inasistencia → asistencia → reposición → inasistencia ─
  const handleToggle = async (clase, alumno) => {
    if (!esEditable(selectedFecha)) return;
    const saveKey = `${alumno.id_alumno}-${alumno.id_clase}`;
    if (savingSet.has(saveKey)) return;

    const tieneAsistencia = !!alumno.asistio;
    const tieneRepo       = !!alumno.id_repo;

    setSavingSet(prev => new Set([...prev, saveKey]));
    try {
      if (!tieneAsistencia && !tieneRepo) {
        // 0 → asistencia
        await AxiosClient({
          method: 'POST',
          url: '/personal/alumno/asistencias',
          data: { id_alumno: alumno.id_alumno, fecha: selectedFecha, id_clase: alumno.id_clase },
        });
      } else if (tieneAsistencia) {
        // asistencia → reposición: abrir modal para elegir fecha de reposición
        setSavingSet(prev => { const s = new Set(prev); s.delete(saveKey); return s; });
        setRepoModal({ open: true, clase, alumno, fechaRepo: '', slotSel: null });
        return;
      } else {
        // reposición → 0
        await AxiosClient({ method: 'DELETE', url: `/personal/repo/${alumno.id_repo}` });
        // Refrescar todos los slots del día actual
        const diaSel = getDiaNombre(selectedFecha);
        await fetchAlumnosParaFecha(clases.filter(c => c.dia === diaSel), selectedFecha);
        // Si el repo tenía fecha_original, refrescar ese día también (quitar el tachado)
        const fechaOrig = alumno.repo_fecha_original;
        if (fechaOrig && fechaOrig !== selectedFecha) {
          const diaOrig = getDiaNombre(fechaOrig);
          await fetchAlumnosParaFecha(clases.filter(c => c.dia === diaOrig), fechaOrig);
        }
        return;
      }
      // Re-fetch real desde DB para tener el estado correcto
      await refetchClase(clase, selectedFecha);
    } catch {
      Alert.fire({ title: 'Error', text: 'No se pudo guardar', icon: 'error', timer: 2000, showConfirmButton: false });
    } finally {
      setSavingSet(prev => { const s = new Set(prev); s.delete(saveKey); return s; });
    }
  };

  // ── Confirmar reposición con fecha elegida ────────────────────────────────
  const confirmarRepo = async () => {
    const { clase, alumno, fechaRepo, slotSel } = repoModal;
    setRepoModal({ open: false, clase: null, alumno: null, fechaRepo: '', slotSel: null });
    const saveKey = `${alumno.id_alumno}-${alumno.id_clase}`;
    setSavingSet(prev => new Set([...prev, saveKey]));
    try {
      await AxiosClient({
        method: 'DELETE',
        url: `/personal/alumno/asistencias/${alumno.id_alumno}/${selectedFecha}/${alumno.id_clase}`,
      });
      await AxiosClient({
        method: 'POST',
        url: '/instrumento/repo',
        data: {
          fecha: fechaRepo,
          alumno_id: alumno.id_alumno,
          maestro_id: objeto.user_id,
          hora: slotSel?.hora || null,
          instrumento: slotSel?.instrumento || null,
          fecha_original: selectedFecha,
        },
      });
      // Refrescar todas las clases del día original (para mostrar tachado)
      const diaOrig = getDiaNombre(selectedFecha);
      await fetchAlumnosParaFecha(clases.filter(c => c.dia === diaOrig), selectedFecha);
      // Si el repo es para otro día, refrescar ese día también (para mostrar el repo)
      if (fechaRepo && fechaRepo !== selectedFecha) {
        const diaRepo = getDiaNombre(fechaRepo);
        await fetchAlumnosParaFecha(clases.filter(c => c.dia === diaRepo), fechaRepo);
      }
    } catch {
      Alert.fire({ title: 'Error', text: 'No se pudo guardar', icon: 'error', timer: 2000, showConfirmButton: false });
    } finally {
      setSavingSet(prev => { const s = new Set(prev); s.delete(saveKey); return s; });
    }
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

          {/* Carrusel de semana: ← [Lun…Dom] → + picker */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>

            {/* Flecha anterior */}
            <button
              onClick={prevSemana}
              title="Semana anterior"
              style={{ flexShrink: 0, width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px', border: '1.5px solid #D1D5DB', backgroundColor: '#fff', cursor: 'pointer', color: '#6B7280', padding: 0 }}
            >
              <MdChevronLeft size={18} />
            </button>

            {/* 7 días de la semana */}
            <div style={{ display: 'flex', flex: 1, gap: '0.25rem' }}>
              {strip.map(({ fecha, diaNombre, diaNum, mes, esHoy }) => {
                const selected = fecha === selectedFecha;
                const esFuturo = fecha > hoy();
                return (
                  <button
                    key={fecha}
                    onClick={() => setSelectedFecha(fecha)}
                    title={fecha}
                    style={{
                      flex: 1,
                      display: 'flex', flexDirection: 'column', alignItems: 'center',
                      padding: '0.3rem 0.1rem',
                      borderRadius: '7px',
                      border: selected ? '1.5px solid #2563EB' : esHoy ? '1.5px solid #93C5FD' : '1.5px solid transparent',
                      cursor: 'pointer',
                      backgroundColor: selected ? '#2563EB' : esHoy ? '#DBEAFE' : 'transparent',
                      color: selected ? '#fff' : esFuturo ? '#9CA3AF' : esHoy ? '#1D4ED8' : '#6B7280',
                      fontWeight: esHoy ? '700' : '400',
                      transition: 'all 0.12s',
                      minWidth: 0,
                    }}
                  >
                    <span style={{ fontSize: '0.58rem', fontWeight: '600', textTransform: 'uppercase', lineHeight: 1.3 }}>{diaNombre}</span>
                    <span style={{ fontSize: '0.9rem', fontWeight: '700', lineHeight: 1.2 }}>{diaNum}</span>
                    <span style={{ fontSize: '0.55rem', opacity: 0.75, lineHeight: 1.2 }}>{mes}</span>
                  </button>
                );
              })}
            </div>

            {/* Flecha siguiente */}
            <button
              onClick={nextSemana}
              title="Semana siguiente"
              style={{ flexShrink: 0, width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px', border: '1.5px solid #D1D5DB', backgroundColor: '#fff', cursor: 'pointer', color: '#6B7280', padding: 0 }}
            >
              <MdChevronRight size={18} />
            </button>

            {/* Picker para saltar a fecha específica */}
            <div
              onClick={() => document.getElementById('mc-date-picker')?.showPicker?.()}
              title="Ir a fecha específica"
              style={{ position: 'relative', flexShrink: 0, width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px', border: '1.5px solid #D1D5DB', backgroundColor: '#fff', cursor: 'pointer', color: '#6B7280' }}
            >
              <MdCalendarToday size={14} />
              <input
                id="mc-date-picker"
                type="date"
                value={selectedFecha}
                onChange={e => { if (e.target.value) setSelectedFecha(e.target.value); }}
                style={{ position: 'absolute', inset: 0, opacity: 0, width: '100%', height: '100%', cursor: 'pointer' }}
              />
            </div>
          </div>
        </div>
      </Modal.Header>

      <Modal.Body style={{ padding: '1.25rem', backgroundColor: '#FFFFFF', maxHeight: '70vh', overflowY: 'auto' }}>
        {(() => {
          const diaSel = getDiaNombre(selectedFecha);
          const clasesFiltradas = clases.filter(c => c.dia === diaSel);
          if (clases.length === 0) return (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#6B7280', fontSize: '0.9rem' }}>
              Sin clases registradas
            </div>
          );
          if (clasesFiltradas.length === 0) return (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#6B7280', fontSize: '0.9rem' }}>
              Sin clases para el {diaSel}
            </div>
          );
          return (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
            {clasesFiltradas.map((clase, idx) => {
              const key      = claseKey(clase);
              const alumnos  = alumnosMap[key] || [];
              const cargando = loadingSet.has(key);
              const numAsistencias = alumnos.filter(a => !!a.asistio).length;
              const numRepos       = alumnos.filter(a => !!a.id_repo).length;
              const presentes      = numAsistencias + numRepos;

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
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <span style={{ fontSize: '0.68rem', fontWeight: '700', backgroundColor: numAsistencias > 0 ? '#D1FAE5' : 'rgba(255,255,255,0.15)', color: numAsistencias > 0 ? '#065F46' : 'rgba(255,255,255,0.7)', borderRadius: '999px', padding: '0.1rem 0.45rem' }}>
                          ✓ {numAsistencias}
                        </span>
                        <span style={{ fontSize: '0.68rem', fontWeight: '700', backgroundColor: numRepos > 0 ? '#FEF3C7' : 'rgba(255,255,255,0.15)', color: numRepos > 0 ? '#92400E' : 'rgba(255,255,255,0.7)', borderRadius: '999px', padding: '0.1rem 0.45rem' }}>
                          R {numRepos}
                        </span>
                        <span style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.6)', fontWeight: '600' }}>
                          /{alumnos.length}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Alumnos */}
                  <div style={{ padding: '0.625rem', display: 'flex', flexDirection: 'column', gap: '0.3rem', maxHeight: '200px', overflowY: 'auto' }}>
                    {cargando ? (
                      <div style={{ textAlign: 'center', padding: '1.25rem 0', color: '#9CA3AF', fontSize: '0.8rem' }}>Cargando…</div>
                    ) : alumnos.length === 0 ? (
                      <div style={{ textAlign: 'center', padding: '1.25rem 0', color: '#9CA3AF', fontSize: '0.8rem' }}>Sin alumnos</div>
                    ) : alumnos.map((alumno, aidx) => {
                      const saveKey      = `${alumno.id_alumno}-${alumno.id_clase}`;
                      const guardando    = savingSet.has(saveKey);
                      const asistio      = !!alumno.asistio;
                      const tieneRepo    = !!alumno.id_repo;
                      const editable     = esEditable(selectedFecha);
                      const otraFecha      = alumno.asistencia_otra_fecha || null;
                      const repoOtraFecha  = alumno.repo_otra_fecha || null;
                      const slotCubierto   = !asistio && !tieneRepo && (!!otraFecha || !!repoOtraFecha);
                      const labelOtraFecha = otraFecha || repoOtraFecha;
                      const esRepo         = !otraFecha && !!repoOtraFecha;

                      const estiloFila = slotCubierto
                        ? { border: '1.5px solid #D1D5DB', backgroundColor: '#F3F4F6' }
                        : asistio
                          ? { border: '1.5px solid #10B981', backgroundColor: '#ECFDF5' }
                          : tieneRepo
                            ? { border: '1.5px solid #F59E0B', backgroundColor: '#FFFBEB' }
                            : { border: '1.5px solid #E5E7EB', backgroundColor: '#F9FAFB' };

                      const estiloCheck = asistio
                        ? { border: '2px solid #10B981', backgroundColor: '#10B981' }
                        : tieneRepo
                          ? { border: '2px solid #F59E0B', backgroundColor: '#F59E0B' }
                          : { border: '2px solid #D1D5DB', backgroundColor: '#fff' };

                      return (
                        <div key={aidx} style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                          <div
                            onClick={() => !slotCubierto && !guardando && editable && handleToggle(clase, alumno)}
                            title={slotCubierto ? undefined : !editable ? 'Día cerrado — solo lectura' : undefined}
                            style={{
                              display: 'flex', alignItems: 'center', gap: '0.5rem',
                              padding: '0.4rem 0.5rem', borderRadius: '6px',
                              ...estiloFila,
                              cursor: slotCubierto ? 'default' : guardando ? 'wait' : editable ? 'pointer' : 'not-allowed',
                              transition: 'all 0.12s',
                              opacity: guardando ? 0.65 : (!editable && !slotCubierto) ? 0.6 : 1,
                              userSelect: 'none',
                            }}
                          >
                            {/* Indicador visual de estado */}
                            <div style={{
                              width: '15px', height: '15px', borderRadius: '4px', flexShrink: 0,
                              ...estiloCheck,
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              transition: 'all 0.12s',
                            }}>
                              {guardando ? (
                                <div style={{ width: '7px', height: '7px', borderRadius: '50%', border: '1.5px solid #9CA3AF', borderTopColor: 'transparent', animation: 'spin 0.6s linear infinite' }} />
                              ) : asistio ? (
                                <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                                  <path d="M1 3.5L3 5.5L8 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              ) : tieneRepo ? (
                                <span style={{ fontSize: '0.55rem', fontWeight: '800', color: '#fff', lineHeight: 1 }}>R</span>
                              ) : null}
                            </div>

                            <span style={{
                              fontSize: '0.8rem', color: slotCubierto ? '#9CA3AF' : '#1F2937',
                              flex: 1, lineHeight: 1.3,
                              textDecoration: slotCubierto ? 'line-through' : 'none',
                            }}>
                              {alumno.name}
                              {alumno.matricula && (
                                <span style={{ color: '#9CA3AF', marginLeft: '0.3rem', fontSize: '0.72rem' }}>{alumno.matricula}</span>
                              )}
                            </span>

                            {tieneRepo && (
                              <span style={{ fontSize: '0.65rem', fontWeight: '700', color: '#B45309', backgroundColor: '#FEF3C7', borderRadius: '4px', padding: '0.1rem 0.35rem' }}>
                                Repos.
                              </span>
                            )}
                          </div>

                          {/* Leyenda "Reponiendo clase del X" — solo cuando el alumno aparece vía UNION repo */}
                          {tieneRepo && alumno.repo_fecha_original && (
                            <div
                              onClick={() => setSelectedFecha(alumno.repo_fecha_original)}
                              style={{
                                fontSize: '0.65rem', color: '#92400E',
                                paddingLeft: '1.75rem',
                                cursor: 'pointer',
                                userSelect: 'none',
                              }}
                            >
                              ↳ Reponiendo clase del{' '}
                              <span style={{ fontWeight: '700', textDecoration: 'underline' }}>
                                {formatFechaCorta(alumno.repo_fecha_original)}
                              </span>
                            </div>
                          )}

                          {/* Leyenda de slot cubierto — click para ir a esa fecha */}
                          {slotCubierto && labelOtraFecha && (
                            <div
                              onClick={() => setSelectedFecha(labelOtraFecha)}
                              style={{
                                fontSize: '0.65rem', color: '#6B7280',
                                paddingLeft: '1.75rem',
                                cursor: 'pointer',
                                userSelect: 'none',
                              }}
                            >
                              ↳ {esRepo ? 'Reposición el' : 'Asistencia contada el'}{' '}
                              <span style={{ fontWeight: '700', color: esRepo ? '#B45309' : '#4B5563', textDecoration: 'underline' }}>
                                {formatFechaCorta(labelOtraFecha)}
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          );
        })()}
      </Modal.Body>

      {/* Mini modal: elegir fecha y slot de reposición */}
      {repoModal.open && (() => {
        const slotsDelDia = repoModal.fechaRepo
          ? clases.filter(c => c.dia === getDiaNombre(repoModal.fechaRepo))
          : [];
        const puedeConfirmar = repoModal.fechaRepo && repoModal.slotSel;
        return (
          <div style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.45)',
          }}>
            <div style={{
              backgroundColor: '#fff', borderRadius: '12px', padding: '1.5rem',
              width: '340px', boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
            }}>
              <div style={{ fontWeight: '700', color: '#1F2937', fontSize: '0.95rem', marginBottom: '0.25rem' }}>
                Registrar reposición
              </div>
              <div style={{ fontSize: '0.78rem', color: '#6B7280', marginBottom: '1rem' }}>
                {repoModal.alumno?.name} — ¿Cuándo se repone la clase?
              </div>

              {/* Fecha */}
              <div style={{ fontSize: '0.72rem', fontWeight: '600', color: '#374151', marginBottom: '0.3rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Fecha</div>
              <input
                type="date"
                value={repoModal.fechaRepo}
                min={hoy()}
                placeholder="Selecciona una fecha"
                onChange={e => setRepoModal(prev => ({ ...prev, fechaRepo: e.target.value, slotSel: null }))}
                style={{
                  width: '100%', padding: '0.5rem 0.75rem', borderRadius: '8px',
                  border: '1.5px solid #D1D5DB', fontSize: '0.85rem', marginBottom: repoModal.fechaRepo ? '1rem' : '1.25rem',
                  outline: 'none', color: repoModal.fechaRepo ? '#1F2937' : '#9CA3AF',
                }}
              />
              {!repoModal.fechaRepo && (
                <div style={{ fontSize: '0.75rem', color: '#9CA3AF', textAlign: 'center', marginBottom: '1rem' }}>
                  Selecciona una fecha para ver los horarios disponibles
                </div>
              )}

              {/* Slots del día */}
              {repoModal.fechaRepo && (
                <>
                  <div style={{ fontSize: '0.72rem', fontWeight: '600', color: '#374151', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Horario ({getDiaNombre(repoModal.fechaRepo)})
                  </div>
                  {slotsDelDia.length === 0 ? (
                    <div style={{ fontSize: '0.78rem', color: '#9CA3AF', marginBottom: '1rem' }}>Sin clases ese día</div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', marginBottom: '1rem' }}>
                      {slotsDelDia.map((slot, i) => {
                        const sel = repoModal.slotSel?.hora === slot.hora && repoModal.slotSel?.instrumento === slot.instrumento;
                        return (
                          <div
                            key={i}
                            onClick={() => setRepoModal(prev => ({ ...prev, slotSel: { hora: slot.hora, instrumento: slot.instrumento } }))}
                            style={{
                              padding: '0.45rem 0.75rem', borderRadius: '7px', cursor: 'pointer',
                              border: sel ? '2px solid #F59E0B' : '1.5px solid #E5E7EB',
                              backgroundColor: sel ? '#FFFBEB' : '#F9FAFB',
                              display: 'flex', gap: '0.5rem', alignItems: 'center',
                              fontSize: '0.82rem', fontWeight: sel ? '700' : '500', color: sel ? '#92400E' : '#374151',
                              transition: 'all 0.1s',
                            }}
                          >
                            <span>{slot.hora}</span>
                            <span style={{ color: '#9CA3AF' }}>·</span>
                            <span>{slot.instrumento}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </>
              )}

              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => setRepoModal({ open: false, clase: null, alumno: null, fechaRepo: '', slotSel: null })}
                  style={{ padding: '0.4rem 0.9rem', borderRadius: '7px', border: '1.5px solid #D1D5DB', backgroundColor: '#fff', color: '#374151', fontSize: '0.82rem', cursor: 'pointer', fontWeight: '600' }}
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmarRepo}
                  disabled={!puedeConfirmar}
                  style={{ padding: '0.4rem 0.9rem', borderRadius: '7px', border: 'none', backgroundColor: puedeConfirmar ? '#F59E0B' : '#E5E7EB', color: puedeConfirmar ? '#fff' : '#9CA3AF', fontSize: '0.82rem', cursor: puedeConfirmar ? 'pointer' : 'not-allowed', fontWeight: '700' }}
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </Modal>
  );
};
