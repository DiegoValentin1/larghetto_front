import React from 'react';

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

const HIDDEN_FIELDS = new Set([
  'user_id', 'id', 'alumno_id', 'personal_id', 'created_at', 'updated_at',
  'statusToggled', 'id_clase', 'id_alumno'
]);

const FIELD_LABELS = {
  name: 'Nombre', nombre: 'Nombre', email: 'Email', campus: 'Campus', role: 'Rol',
  mensualidad: 'Mensualidad', nivel: 'Nivel', estado: 'Estado',
  telefono: 'Teléfono', domicilio: 'Domicilio', municipio: 'Municipio',
  contactoEmergencia: 'Contacto emergencia', fechaNacimiento: 'Fecha nacimiento',
  inscripcion: 'Inscripción', promocion_id: 'Promoción', observaciones: 'Observaciones',
  nombreMadre: 'Nombre madre', nombrePadre: 'Nombre padre',
  madreTelefono: 'Tel. madre', padreTelefono: 'Tel. padre',
  status: 'Status', matricula: 'Matrícula',
  banco: 'Banco', cuenta: 'Cuenta', clabe: 'CLABE',
  fecha_inicio: 'Fecha inicio', motivo: 'Motivo', respuesta: 'Respuesta',
  archived: 'Archivado', clases: 'Clases', pagos: 'Pagos',
  alumno: 'Alumno', clase: 'Clase', fecha: 'Fecha'
};

const ACTION_LABELS = {
  CREATE: { label: 'Creación', color: '#16A34A', bg: '#DCFCE7' },
  UPDATE: { label: 'Actualización', color: '#1D4ED8', bg: '#DBEAFE' },
  DELETE: { label: 'Eliminación', color: '#DC2626', bg: '#FEE2E2' },
  STATUS_CHANGE: { label: 'Cambio de estado', color: '#D97706', bg: '#FEF3C7' },
  BAJA_SOLICITADA: { label: 'Baja solicitada', color: '#7C3AED', bg: '#EDE9FE' },
  BAJA_APROBADA: { label: 'Baja aprobada', color: '#DC2626', bg: '#FEE2E2' },
  BAJA_RECHAZADA: { label: 'Baja rechazada', color: '#059669', bg: '#D1FAE5' },
  ASISTENCIA: { label: 'Asistencia', color: '#0891B2', bg: '#CFFAFE' },
  ARCHIVE: { label: 'Archivado', color: '#64748B', bg: '#F1F5F9' },
  PAGO: { label: 'Pago', color: '#0F766E', bg: '#CCFBF1' },
};

const formatValue = (val) => {
  if (val === null || val === undefined) return <span style={{ color: '#9CA3AF', fontStyle: 'italic' }}>—</span>;
  if (typeof val === 'boolean') return val ? 'Sí' : 'No';
  if (Array.isArray(val)) {
    if (val.length === 0) return <span style={{ color: '#9CA3AF' }}>Sin registros</span>;
    return (
      <ul style={{ margin: 0, paddingLeft: '1rem', fontSize: '0.8rem' }}>
        {val.map((item, i) => (
          <li key={i}>{typeof item === 'object' ? JSON.stringify(item) : String(item)}</li>
        ))}
      </ul>
    );
  }
  if (typeof val === 'object') return JSON.stringify(val);
  return String(val);
};

const PagosDiffView = ({ oldObj }) => {
  const added   = oldObj?.added   || [];
  const removed = oldObj?.removed || [];
  if (added.length === 0 && removed.length === 0) return <p style={{ color: '#6B7280', fontSize: '0.875rem' }}>Sin cambios registrados.</p>;

  const rowStyle = (type) => ({
    display: 'grid', gridTemplateColumns: '130px 1fr 110px',
    gap: '0.5rem', padding: '0.45rem 0.75rem', borderRadius: '6px', marginBottom: '0.3rem',
    fontSize: '0.85rem', fontWeight: '500',
    background: type === 'added' ? '#DCFCE7' : '#FEE2E2',
    color:      type === 'added' ? '#166534' : '#991B1B',
  });
  const headerStyle = {
    display: 'grid', gridTemplateColumns: '130px 1fr 110px',
    gap: '0.5rem', padding: '0.25rem 0.75rem',
    fontSize: '0.72rem', fontWeight: '700', color: '#6B7280',
    textTransform: 'uppercase', letterSpacing: '0.05em'
  };

  return (
    <div>
      {added.length > 0 && (
        <div style={{ marginBottom: removed.length > 0 ? '1.25rem' : 0 }}>
          <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#166534', marginBottom: '0.4rem' }}>
            ✓ {added.length} pago{added.length > 1 ? 's' : ''} agregado{added.length > 1 ? 's' : ''}
          </div>
          <div style={headerStyle}><span>Fecha</span><span>Tipo</span><span>Monto</span></div>
          {added.map((p, i) => (
            <div key={i} style={rowStyle('added')}>
              <span>{p.fecha}</span><span>{p.tipo_label}</span>
              <span>${Number(p.monto).toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
            </div>
          ))}
        </div>
      )}
      {removed.length > 0 && (
        <div>
          <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#991B1B', marginBottom: '0.4rem' }}>
            ✕ {removed.length} pago{removed.length > 1 ? 's' : ''} eliminado{removed.length > 1 ? 's' : ''}
          </div>
          <div style={headerStyle}><span>Fecha</span><span>Tipo</span><span>Monto</span></div>
          {removed.map((p, i) => (
            <div key={i} style={rowStyle('removed')}>
              <span>{p.fecha}</span><span>{p.tipo_label}</span>
              <span>${Number(p.monto).toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const DiffViewer = ({ isOpen, onClose, record }) => {
  if (!isOpen || !record) return null;

  const oldValue = record.old_value ? (typeof record.old_value === 'string' ? JSON.parse(record.old_value) : record.old_value) : null;
  const newValue = record.new_value ? (typeof record.new_value === 'string' ? JSON.parse(record.new_value) : record.new_value) : null;

  const isCreate = !oldValue && newValue;
  const isDelete = oldValue && !newValue;
  const isUpdate = oldValue && newValue;

  // Detectar PAGO con nuevo formato (tiene added/removed, no pagos)
  const isPagoNewFormat = record?.action_type === 'PAGO' && oldValue && ('added' in oldValue || 'removed' in oldValue);

  const allKeys = new Set([
    ...(oldValue ? Object.keys(oldValue) : []),
    ...(newValue ? Object.keys(newValue) : [])
  ].filter(k => !HIDDEN_FIELDS.has(k)));

  const actionInfo = ACTION_LABELS[record.action_type] || { label: record.action_type, color: '#374151', bg: '#F3F4F6' };

  const formatDate = (d) => new Intl.DateTimeFormat('es-MX', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit', timeZone: 'America/Mexico_City'
  }).format(new Date(d));

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)',
        zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem'
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#FFFFFF', borderRadius: '16px', width: '100%', maxWidth: '760px',
          maxHeight: '85vh', overflow: 'hidden', display: 'flex', flexDirection: 'column',
          boxShadow: '0 25px 50px rgba(0,0,0,0.25)'
        }}
      >
        {/* Header */}
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <span style={{
                display: 'inline-block', padding: '0.2rem 0.6rem', borderRadius: '999px',
                fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.05em',
                color: actionInfo.color, background: actionInfo.bg
              }}>
                {actionInfo.label}
              </span>
              <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                {record.entity_name || `${record.entity_type} #${record.entity_id}`}
              </span>
            </div>
            <p style={{ margin: 0, fontSize: '0.875rem', color: '#374151', fontWeight: '500' }}>{record.summary}</p>
            <p style={{ margin: '0.25rem 0 0', fontSize: '0.75rem', color: '#9CA3AF' }}>
              {record.user_name} · {record.user_role} · {record.campus || '—'} · {formatDate(record.created_at)}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', fontSize: '1.5rem', lineHeight: 1, padding: '0.25rem' }}
          >×</button>
        </div>

        {/* Body */}
        <div style={{ overflowY: 'auto', padding: '1.25rem 1.5rem', flex: 1 }}>
          {isPagoNewFormat ? (
            <PagosDiffView oldObj={oldValue} />
          ) : (
            <>
              {(isCreate || isDelete) && (
                <div style={{
                  padding: '0.75rem 1rem', borderRadius: '8px', marginBottom: '1rem',
                  background: isCreate ? '#F0FDF4' : '#FEF2F2',
                  border: `1px solid ${isCreate ? '#BBF7D0' : '#FECACA'}`,
                  fontSize: '0.8rem', color: isCreate ? '#15803D' : '#B91C1C', fontWeight: '500'
                }}>
                  {isCreate ? '✓ Registro nuevo — se muestran los datos iniciales' : '✕ Registro eliminado — se muestran los datos que existían'}
                </div>
              )}

              {/* Tabla diff */}
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                <thead>
                  <tr style={{ background: '#F9FAFB' }}>
                    <th style={{ padding: '0.6rem 0.75rem', textAlign: 'left', fontWeight: '600', color: '#6B7280', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '2px solid #E5E7EB', width: '30%' }}>
                      Campo
                    </th>
                    {!isCreate && (
                      <th style={{ padding: '0.6rem 0.75rem', textAlign: 'left', fontWeight: '600', color: '#DC2626', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '2px solid #E5E7EB', width: isDelete ? '70%' : '35%' }}>
                        Antes
                      </th>
                    )}
                    {!isDelete && (
                      <th style={{ padding: '0.6rem 0.75rem', textAlign: 'left', fontWeight: '600', color: '#16A34A', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '2px solid #E5E7EB', width: isCreate ? '70%' : '35%' }}>
                        Después
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {[...allKeys].filter(key => !HIDDEN_FIELDS.has(key)).map((key) => {
                    const oldVal = oldValue ? oldValue[key] : undefined;
                    const newVal = newValue ? newValue[key] : undefined;
                    const changed = isUpdate && String(oldVal) !== String(newVal);
                    const renderCell = (val) => {
                      if (key === 'estado' && val !== null && val !== undefined) {
                        const info = ALUMNO_ESTADOS[Number(val)];
                        if (info) return (
                          <span style={{
                            display: 'inline-block', padding: '0.15rem 0.55rem', borderRadius: '999px',
                            fontSize: '0.72rem', fontWeight: '700', color: '#fff',
                            background: info.color, boxShadow: '0 1px 3px rgba(0,0,0,0.15)'
                          }}>{info.label}</span>
                        );
                      }
                      if (key === 'status' && val !== null && val !== undefined) {
                        const isActive = Number(val) === 1 || val === true;
                        return (
                          <span style={{
                            display: 'inline-block', padding: '0.15rem 0.55rem', borderRadius: '999px',
                            fontSize: '0.72rem', fontWeight: '700', color: '#fff',
                            background: isActive ? '#16A34A' : '#6B7280'
                          }}>{isActive ? 'Activo' : 'Inactivo'}</span>
                        );
                      }
                      return formatValue(val);
                    };
                    return (
                      <tr
                        key={key}
                        style={{
                          background: changed ? '#FFFBEB' : 'transparent',
                          borderBottom: '1px solid #F3F4F6'
                        }}
                      >
                        <td style={{ padding: '0.6rem 0.75rem', color: '#374151', fontWeight: changed ? '600' : '400' }}>
                          {FIELD_LABELS[key] || key}
                        </td>
                        {!isCreate && (
                          <td style={{ padding: '0.6rem 0.75rem', color: changed ? '#DC2626' : '#374151', background: changed ? 'rgba(254,226,226,0.3)' : 'transparent' }}>
                            {renderCell(oldVal)}
                          </td>
                        )}
                        {!isDelete && (
                          <td style={{ padding: '0.6rem 0.75rem', color: changed ? '#16A34A' : '#374151', background: changed ? 'rgba(220,252,231,0.3)' : 'transparent' }}>
                            {renderCell(newVal)}
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {allKeys.size === 0 && (
                <div style={{ textAlign: 'center', padding: '2rem', color: '#9CA3AF', fontSize: '0.875rem' }}>
                  Sin detalles de cambios disponibles
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiffViewer;
