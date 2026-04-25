import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import DiffViewer from './DiffViewer';
import EntityTimeline from './EntityTimeline';

const ACTION_STYLES = {
  CREATE:          { label: 'Creación',       color: '#16A34A', bg: '#DCFCE7' },
  UPDATE:          { label: 'Actualización',  color: '#1D4ED8', bg: '#DBEAFE' },
  DELETE:          { label: 'Eliminación',    color: '#DC2626', bg: '#FEE2E2' },
  STATUS_CHANGE:   { label: 'Estado',         color: '#D97706', bg: '#FEF3C7' },
  BAJA_SOLICITADA: { label: 'Baja solicit.',  color: '#7C3AED', bg: '#EDE9FE' },
  BAJA_APROBADA:   { label: 'Baja aprobada', color: '#DC2626', bg: '#FEE2E2' },
  BAJA_RECHAZADA:  { label: 'Baja rechazada',color: '#059669', bg: '#D1FAE5' },
  ASISTENCIA:      { label: 'Asistencia',    color: '#0891B2', bg: '#CFFAFE' },
  ARCHIVE:         { label: 'Archivado',     color: '#64748B', bg: '#F1F5F9' },
  PAGO:            { label: 'Pago',          color: '#0F766E', bg: '#CCFBF1' },
  PAGO_ADD:        { label: 'Pago',          color: '#16A34A', bg: '#DCFCE7' },
  PAGO_REMOVE:     { label: 'Pago',          color: '#DC2626', bg: '#FEE2E2' },
};

const ROLE_STYLES = {
  SUPER:      { color: '#7C3AED', bg: '#EDE9FE' },
  ENCARGADO:  { color: '#1D4ED8', bg: '#DBEAFE' },
  RECEPCION:  { color: '#059669', bg: '#D1FAE5' },
};

const ENTITY_TYPE_STYLES = {
  ALUMNO:         { label: 'Alumno',  color: '#92400E', bg: '#FEF3C7' },
  MAESTRO:        { label: 'Maestro', color: '#1E40AF', bg: '#DBEAFE' },
  PERSONAL:       { label: 'Personal',color: '#5B21B6', bg: '#EDE9FE' },
  SOLICITUD_BAJA: { label: 'Baja',    color: '#9D174D', bg: '#FCE7F3' },
  ASISTENCIA:     { label: 'Alumno',  color: '#92400E', bg: '#FEF3C7' },
  REPOSICION:     { label: 'Alumno',  color: '#92400E', bg: '#FEF3C7' },
};

const ENTITY_LABELS = {
  ALUMNO: 'Alumno', MAESTRO: 'Maestro', PERSONAL: 'Personal',
  SOLICITUD_BAJA: 'Baja', ASISTENCIA: 'Alumno', REPOSICION: 'Alumno'
};

const ALUMNO_ESTADOS = {
  0: { label: 'Baja',                             color: 'rgb(220, 48, 48)' },
  1: { label: 'Activo',                           color: '#A0A2A2' },
  2: { label: 'Nuevo',                            color: '#F0BA14' },
  3: { label: 'Curso doble',                      color: '#14F0B7' },
  4: { label: 'Curso triple',                     color: '#40DC51' },
  5: { label: 'Certificación',                    color: '#ED2C75' },
  6: { label: 'Reingreso',                        color: '#1F175A' },
  7: { label: 'Situación',                        color: '#DAE175' },
  8: { label: 'Inglés',                           color: '#702390' },
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

// Divide el texto en segmentos marcando cuáles van en negrita
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

const SummaryCell = ({ row }) => {
  const baseText = row.summary || '';
  const nv = parseNewValue(row.new_value);

  // Para STATUS_CHANGE: inyectar badge de estado al final
  if (row.action_type === 'STATUS_CHANGE') {
    const estado = nv?.estado ?? null;
    const estadoInfo = estado !== null ? ALUMNO_ESTADOS[estado] : null;
    const parts = baseText.split(/a:\s*/);
    const segments = boldify(parts[0], row.user_name, row.entity_name);
    return (
      <span style={{ fontSize: '0.82rem', color: '#374151', display: 'flex', alignItems: 'center', gap: '0.35rem', flexWrap: 'wrap' }}>
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
      </span>
    );
  }

  if (row.entity_type === 'REPOSICION') {
    const val = parseNewValue(row.new_value) || parseNewValue(row.old_value);
    const fechaRepoFmt  = formatFechaFront(val?.fecha);
    const fechaOrigFmt  = formatFechaFront(val?.fecha_original);
    if (fechaRepoFmt) {
      const arrowIdx = baseText.indexOf(' → ');
      const prefix = arrowIdx >= 0 ? baseText.slice(0, arrowIdx) : baseText;
      const segments = boldify(prefix, row.user_name, row.entity_name, fechaOrigFmt);
      return (
        <span style={{ fontSize: '0.82rem', color: '#374151' }}>
          {segments.map((s, i) => s.bold ? <strong key={i}>{s.text}</strong> : s.text)}
          {' → repone el '}<strong style={{ color: '#EA580C' }}>{fechaRepoFmt}</strong>
        </span>
      );
    }
  }

  if (row.action_type === 'PAGO_ADD' || row.action_type === 'PAGO_REMOVE') {
    const isPagoAdd = row.action_type === 'PAGO_ADD';
    const montoColor = isPagoAdd ? '#16A34A' : '#DC2626';
    const val = parseNewValue(isPagoAdd ? row.new_value : row.old_value);
    const monto = val?.monto ? `$${val.monto}` : null;
    // Quitar el monto del texto del summary para renderizarlo aparte
    const textSinMonto = monto ? baseText.replace(monto, '').trimEnd() : baseText;
    const segments = boldify(textSinMonto, row.user_name, row.entity_name);
    return (
      <span style={{ fontSize: '0.82rem', color: '#374151' }}>
        {segments.map((s, i) => s.bold ? <strong key={i}>{s.text}</strong> : s.text)}
        {monto && <strong style={{ color: montoColor }}> {monto}</strong>}
      </span>
    );
  }

  const segments = boldify(baseText, row.user_name, row.entity_name);
  return (
    <span style={{ fontSize: '0.82rem', color: '#374151' }}>
      {segments.map((s, i) => s.bold ? <strong key={i}>{s.text}</strong> : s.text)}
    </span>
  );
};

const Badge = ({ text, color, bg }) => (
  <span style={{
    display: 'inline-block', padding: '0.2rem 0.55rem', borderRadius: '999px',
    fontSize: '0.72rem', fontWeight: '700', letterSpacing: '0.03em', color, background: bg
  }}>
    {text}
  </span>
);

const formatDate = (d) => new Intl.DateTimeFormat('es-MX', {
  day: '2-digit', month: 'short', year: 'numeric',
  hour: '2-digit', minute: '2-digit', timeZone: 'America/Mexico_City'
}).format(new Date(d));

const customStyles = {
  headRow: { style: { background: '#F3F4F6', borderBottom: '2px solid #E5E7EB', minHeight: '48px' } },
  headCells: { style: { color: '#6B7280', fontSize: '0.72rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' } },
  rows: {
    style: {
      minHeight: '52px', fontSize: '0.875rem', color: '#1F2937', borderBottom: '1px solid #F3F4F6',
      cursor: 'pointer',
      '&:hover': { background: '#F9FAFB' }
    }
  },
  cells: { style: { padding: '0.5rem 0.75rem' } },
};

const AuditLogTable = ({ data, totalRows, currentPage, onPageChange, loading }) => {
  const [diffRecord, setDiffRecord] = useState(null);
  const [timelineEntry, setTimelineEntry] = useState(null);

  const columns = [
    {
      name: 'Fecha',
      selector: row => row.created_at,
      cell: row => <span style={{ fontSize: '0.8rem', color: '#374151' }}>{formatDate(row.created_at)}</span>,
      width: '165px',
      sortable: true,
    },
    {
      name: 'Usuario',
      cell: row => {
        const rs = ROLE_STYLES[row.user_role] || ROLE_STYLES.RECEPCION;
        return (
          <div>
            <div style={{ fontWeight: '500', fontSize: '0.85rem' }}>{row.user_name}</div>
            <Badge text={row.user_role} color={rs.color} bg={rs.bg} />
          </div>
        );
      },
      width: '160px',
    },
    {
      name: 'Campus',
      selector: row => row.campus || '—',
      cell: row => <span style={{ fontSize: '0.8rem', color: '#374151' }}>{row.campus || '—'}</span>,
      width: '110px',
    },
    {
      name: 'Entidad',
      cell: row => {
        const es = ENTITY_TYPE_STYLES[row.entity_type];
        return (
          <button
            onClick={e => { e.stopPropagation(); setTimelineEntry(row); }}
            title="Ver timeline de esta entidad"
            style={{
              background: '#F3F4F6', border: 'none', borderRadius: '6px',
              padding: '0.3rem 0.6rem', cursor: 'pointer', fontSize: '0.8rem', color: '#374151',
              transition: 'background 0.15s', display: 'flex', flexDirection: 'column',
              alignItems: 'flex-start', gap: '0.2rem', textAlign: 'left'
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#E5E7EB'}
            onMouseLeave={e => e.currentTarget.style.background = '#F3F4F6'}
          >
            {es && (
              <span style={{
                display: 'inline-block', padding: '0.1rem 0.45rem', borderRadius: '999px',
                fontSize: '0.68rem', fontWeight: 700, color: es.color, background: es.bg,
                lineHeight: 1.4, flexShrink: 0
              }}>
                {es.label}
              </span>
            )}
            <span style={{ lineHeight: 1.3 }}>{row.entity_name || `#${row.entity_id}`}</span>
          </button>
        );
      },
      width: '140px',
    },
    {
      name: 'Acción',
      cell: row => {
        let s;
        if (row.entity_type === 'ASISTENCIA') {
          s = row.action_type === 'DELETE'
            ? { label: 'Asistencia', color: '#DC2626', bg: '#FEE2E2' }
            : { label: 'Asistencia', color: '#16A34A', bg: '#DCFCE7' };
        } else if (row.entity_type === 'REPOSICION') {
          s = row.action_type === 'DELETE'
            ? { label: 'Reposición', color: '#DC2626', bg: '#FEE2E2' }
            : { label: 'Reposición', color: '#16A34A', bg: '#DCFCE7' };
        } else {
          s = ACTION_STYLES[row.action_type] || { label: row.action_type, color: '#374151', bg: '#F3F4F6' };
        }
        return <Badge text={s.label} color={s.color} bg={s.bg} />;
      },
      width: '130px',
    },
    {
      name: 'Resumen',
      selector: row => row.summary,
      cell: row => <SummaryCell row={row} />,
      grow: 1,
    },
    {
      name: '',
      cell: row => (
        (row.old_value || row.new_value) ? (
          <button
            onClick={e => { e.stopPropagation(); setDiffRecord(row); }}
            title="Ver cambios detallados"
            style={{
              background: 'none', border: '1px solid #D1D5DB', borderRadius: '6px',
              padding: '0.25rem 0.5rem', cursor: 'pointer', color: '#6B7280', fontSize: '0.75rem',
              transition: 'all 0.15s'
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#F3F4F6'; e.currentTarget.style.color = '#374151'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#6B7280'; }}
          >
            Ver diff
          </button>
        ) : null
      ),
      width: '90px',
      right: true,
    },
  ];

  return (
    <>
      <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', overflow: 'hidden' }}>
        <DataTable
          columns={columns}
          data={data}
          customStyles={customStyles}
          progressPending={loading}
          progressComponent={
            <div style={{ padding: '2.5rem', color: '#6B7280', fontSize: '0.875rem' }}>Cargando registros...</div>
          }
          noDataComponent={
            <div style={{ padding: '2.5rem', color: '#9CA3AF', fontSize: '0.875rem', textAlign: 'center' }}>
              No se encontraron registros con los filtros aplicados
            </div>
          }
          highlightOnHover
          onRowClicked={row => row.old_value || row.new_value ? setDiffRecord(row) : null}
          pagination
          paginationServer
          paginationTotalRows={totalRows}
          paginationDefaultPage={currentPage}
          onChangePage={onPageChange}
          paginationPerPage={50}
          paginationRowsPerPageOptions={[50]}
          paginationComponentOptions={{ rowsPerPageText: 'Por página:', rangeSeparatorText: 'de', noRowsPerPage: true }}
        />
      </div>

      <DiffViewer
        isOpen={!!diffRecord}
        onClose={() => setDiffRecord(null)}
        record={diffRecord}
      />

      <EntityTimeline
        isOpen={!!timelineEntry}
        onClose={() => setTimelineEntry(null)}
        entityType={timelineEntry?.entity_type}
        entityId={timelineEntry?.entity_id}
        entityName={`${ENTITY_LABELS[timelineEntry?.entity_type] || ''}: ${timelineEntry?.entity_name || `#${timelineEntry?.entity_id}`}`}
      />
    </>
  );
};

export default AuditLogTable;
