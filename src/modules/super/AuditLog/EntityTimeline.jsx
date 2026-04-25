import React, { useState, useEffect } from 'react';
import AxiosClient from '../../../shared/plugins/axios';
import DiffViewer from './DiffViewer';

const ALUMNO_ESTADOS = {
  0: { label: 'Baja',          color: 'rgb(220, 48, 48)' },
  1: { label: 'Activo',        color: '#A0A2A2' },
  2: { label: 'Nuevo',         color: '#F0BA14' },
  3: { label: 'Curso doble',   color: '#14F0B7' },
  4: { label: 'Curso triple',  color: '#40DC51' },
  5: { label: 'Certificación', color: '#ED2C75' },
  6: { label: 'Reingreso',     color: '#1F175A' },
  7: { label: 'Situación',     color: '#DAE175' },
  8: { label: 'Inglés',        color: '#702390' },
};

const parseNewValue = (raw) => {
  if (!raw) return null;
  try { return typeof raw === 'string' ? JSON.parse(raw) : raw; }
  catch { return null; }
};

const formatFechaFront = (fechaStr) => {
  if (!fechaStr) return null;
  try {
    const parts = String(fechaStr).split('-').map(Number);
    if (parts.length < 3 || parts.some(isNaN)) return null;
    const date = new Date(parts[0], parts[1] - 1, parts[2]);
    if (isNaN(date.getTime())) return null;
    return new Intl.DateTimeFormat('es-MX', { weekday: 'long', day: 'numeric', month: 'long' }).format(date);
  } catch { return null; }
};

const boldify = (text, ...terms) => {
  if (!text) return [{ text: '', bold: false }];
  let segments = [{ text, bold: false }];
  for (const term of terms) {
    if (!term) continue;
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escaped})`);
    const next = [];
    for (const seg of segments) {
      if (seg.bold) { next.push(seg); continue; }
      const parts = seg.text.split(regex);
      for (const part of parts) next.push({ text: part, bold: part === term });
    }
    segments = next;
  }
  return segments;
};

const ACTION_COLORS = {
  CREATE: '#16A34A', UPDATE: '#1D4ED8', DELETE: '#DC2626',
  STATUS_CHANGE: '#D97706', BAJA_SOLICITADA: '#7C3AED',
  BAJA_APROBADA: '#DC2626', BAJA_RECHAZADA: '#059669',
  ASISTENCIA: '#0891B2', ARCHIVE: '#64748B',
  PAGO: '#0F766E', PAGO_ADD: '#16A34A', PAGO_REMOVE: '#DC2626',
};

const ACTION_LABELS = {
  CREATE: 'Creación', UPDATE: 'Actualización', DELETE: 'Eliminación',
  STATUS_CHANGE: 'Cambio estado', BAJA_SOLICITADA: 'Baja solicitada',
  BAJA_APROBADA: 'Baja aprobada', BAJA_RECHAZADA: 'Baja rechazada',
  ASISTENCIA: 'Asistencia', ARCHIVE: 'Archivado',
  PAGO: 'Pago', PAGO_ADD: 'Pago registrado', PAGO_REMOVE: 'Pago eliminado',
};

const formatDate = (d) => new Intl.DateTimeFormat('es-MX', {
  day: '2-digit', month: 'short', year: 'numeric',
  hour: '2-digit', minute: '2-digit', timeZone: 'America/Mexico_City'
}).format(new Date(d));

const EntityTimeline = ({ isOpen, onClose, entityType, entityId, entityName }) => {
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    if (!isOpen || !entityType || !entityId) return;
    setLoading(true);
    AxiosClient({ url: `/audit-log/entity/${entityType}/${entityId}`, method: 'GET' })
      .then(data => setTimeline(Array.isArray(data) ? data : []))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [isOpen, entityType, entityId]);

  if (!isOpen) return null;

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)',
          zIndex: 9998, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'
        }}
      >
        <div
          onClick={e => e.stopPropagation()}
          style={{
            background: '#FFFFFF', borderRadius: '16px', width: '100%', maxWidth: '620px',
            maxHeight: '85vh', overflow: 'hidden', display: 'flex', flexDirection: 'column',
            boxShadow: '0 25px 50px rgba(0,0,0,0.25)'
          }}
        >
          {/* Header */}
          <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '700', color: '#111827' }}>
                Historial: {entityName}
              </h3>
              <p style={{ margin: '0.25rem 0 0', fontSize: '0.8rem', color: '#6B7280' }}>
                {timeline.length} cambio{timeline.length !== 1 ? 's' : ''} registrado{timeline.length !== 1 ? 's' : ''}
              </p>
            </div>
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', fontSize: '1.5rem', lineHeight: 1 }}>×</button>
          </div>

          {/* Timeline */}
          <div style={{ overflowY: 'auto', padding: '1.5rem', flex: 1 }}>
            {loading && (
              <div style={{ textAlign: 'center', color: '#6B7280', fontSize: '0.875rem', padding: '2rem' }}>
                Cargando historial...
              </div>
            )}
            {!loading && timeline.length === 0 && (
              <div style={{ textAlign: 'center', color: '#9CA3AF', fontSize: '0.875rem', padding: '2rem' }}>
                No hay cambios registrados para esta entidad
              </div>
            )}
            {!loading && timeline.map((entry, idx) => {
              let color, label;
              if (entry.entity_type === 'ASISTENCIA') {
                color = entry.action_type === 'DELETE' ? '#DC2626' : '#16A34A';
                label = 'Asistencia';
              } else if (entry.entity_type === 'REPOSICION') {
                color = entry.action_type === 'DELETE' ? '#DC2626' : '#16A34A';
                label = 'Reposición';
              } else {
                color = ACTION_COLORS[entry.action_type] || '#374151';
                label = ACTION_LABELS[entry.action_type] || entry.action_type;
              }
              const isLast = idx === timeline.length - 1;
              return (
                <div key={entry.id} style={{ display: 'flex', gap: '1rem', position: 'relative' }}>
                  {/* Línea vertical */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                    <div style={{
                      width: '12px', height: '12px', borderRadius: '50%',
                      background: color, border: '2px solid #FFFFFF',
                      boxShadow: `0 0 0 2px ${color}`, marginTop: '4px', flexShrink: 0
                    }} />
                    {!isLast && <div style={{ width: '2px', flex: 1, background: '#E5E7EB', marginTop: '4px' }} />}
                  </div>
                  {/* Contenido */}
                  <div style={{ paddingBottom: isLast ? 0 : '1.5rem', flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <span style={{
                        display: 'inline-block', padding: '0.15rem 0.5rem', borderRadius: '999px',
                        fontSize: '0.7rem', fontWeight: '700', color, background: `${color}1A`
                      }}>
                        {label}
                      </span>
                      <span style={{ fontSize: '0.72rem', color: '#9CA3AF', whiteSpace: 'nowrap' }}>
                        {formatDate(entry.created_at)}
                      </span>
                    </div>
                    {entry.action_type === 'STATUS_CHANGE' ? (() => {
                      const nv = parseNewValue(entry.new_value);
                      const estadoInfo = nv !== null && nv.estado !== undefined ? ALUMNO_ESTADOS[nv.estado] : null;
                      const parts = (entry.summary || '').split(/a:\s*/);
                      const segments = boldify(parts[0], entry.user_name, entry.entity_name);
                      return (
                        <p style={{ margin: '0.35rem 0 0.25rem', fontSize: '0.875rem', color: '#374151', display: 'flex', alignItems: 'center', gap: '0.35rem', flexWrap: 'wrap' }}>
                          {segments.map((s, i) => s.bold ? <strong key={i}>{s.text}</strong> : s.text)}
                          {parts.length > 1 && 'a: '}
                          {estadoInfo ? (
                            <span style={{
                              display: 'inline-block', padding: '0.15rem 0.55rem', borderRadius: '999px',
                              fontSize: '0.72rem', fontWeight: '700', color: '#fff',
                              background: estadoInfo.color, boxShadow: '0 1px 3px rgba(0,0,0,0.15)'
                            }}>
                              {estadoInfo.label}
                            </span>
                          ) : (parts[1] || '')}
                        </p>
                      );
                    })() : entry.entity_type === 'REPOSICION' ? (() => {
                      const val = parseNewValue(entry.new_value) || parseNewValue(entry.old_value);
                      const fechaRepoFmt = formatFechaFront(val?.fecha);
                      const fechaOrigFmt = formatFechaFront(val?.fecha_original);
                      const text = entry.summary || '';
                      if (fechaRepoFmt) {
                        const arrowIdx = text.indexOf(' → ');
                        const prefix = arrowIdx >= 0 ? text.slice(0, arrowIdx) : text;
                        const segments = boldify(prefix, entry.user_name, entry.entity_name, fechaOrigFmt);
                        return (
                          <p style={{ margin: '0.35rem 0 0.25rem', fontSize: '0.875rem', color: '#374151' }}>
                            {segments.map((s, i) => s.bold ? <strong key={i}>{s.text}</strong> : s.text)}
                            {' → repone el '}<strong style={{ color: '#EA580C' }}>{fechaRepoFmt}</strong>
                          </p>
                        );
                      }
                      return (
                        <p style={{ margin: '0.35rem 0 0.25rem', fontSize: '0.875rem', color: '#374151' }}>
                          {boldify(text, entry.user_name, entry.entity_name).map((s, i) =>
                            s.bold ? <strong key={i}>{s.text}</strong> : s.text
                          )}
                        </p>
                      );
                    })() : (
                      <p style={{ margin: '0.35rem 0 0.25rem', fontSize: '0.875rem', color: '#374151' }}>
                        {boldify(entry.summary, entry.user_name, entry.entity_name).map((s, i) =>
                          s.bold ? <strong key={i}>{s.text}</strong> : s.text
                        )}
                      </p>
                    )}
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>
                        {entry.user_name} · {entry.user_role} {entry.campus ? `· ${entry.campus}` : ''}
                      </span>
                      {(entry.old_value || entry.new_value) && (
                        <button
                          onClick={() => setSelectedRecord(entry)}
                          style={{
                            background: 'none', border: '1px solid #E5E7EB', borderRadius: '6px',
                            padding: '0.15rem 0.5rem', fontSize: '0.72rem', color: '#374151',
                            cursor: 'pointer', transition: 'all 0.15s ease'
                          }}
                          onMouseEnter={e => { e.currentTarget.style.background = '#F3F4F6'; }}
                          onMouseLeave={e => { e.currentTarget.style.background = 'none'; }}
                        >
                          Ver cambios
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <DiffViewer
        isOpen={!!selectedRecord}
        onClose={() => setSelectedRecord(null)}
        record={selectedRecord}
      />
    </>
  );
};

export default EntityTimeline;
