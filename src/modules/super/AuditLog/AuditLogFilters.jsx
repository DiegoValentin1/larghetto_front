import React, { useState, useEffect } from 'react';

const today = new Date().toISOString().split('T')[0];
const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

const ENTITY_OPTIONS = [
  { value: '', label: 'Todas las entidades' },
  { value: 'ALUMNO', label: 'Alumnos' },
  { value: 'MAESTRO', label: 'Maestros' },
  { value: 'PERSONAL', label: 'Personal' },
  { value: 'SOLICITUD_BAJA', label: 'Solicitudes de baja' },
  { value: 'ASISTENCIA', label: 'Asistencias' },
  { value: 'REPOSICION', label: 'Reposiciones' },
];

const ACTION_OPTIONS = [
  { value: '', label: 'Todas las acciones' },
  { value: 'CREATE', label: 'Creación' },
  { value: 'UPDATE', label: 'Actualización' },
  { value: 'DELETE', label: 'Eliminación' },
  { value: 'STATUS_CHANGE', label: 'Cambio de estado' },
  { value: 'BAJA_SOLICITADA', label: 'Baja solicitada' },
  { value: 'BAJA_APROBADA', label: 'Baja aprobada' },
  { value: 'BAJA_RECHAZADA', label: 'Baja rechazada' },
  { value: 'ASISTENCIA', label: 'Asistencia' },
  { value: 'ARCHIVE', label: 'Archivado' },
  { value: 'PAGO', label: 'Pago' },
];

const CAMPUS_OPTIONS = [
  { value: '', label: 'Todos los campus' },
  { value: 'bugambilias', label: 'Bugambilias' },
  { value: 'centro', label: 'Centro' },
  { value: 'cuautla', label: 'Cuautla' },
  { value: 'CDMX', label: 'CDMX' },
];

const inputStyle = {
  border: '1.5px solid #E5E7EB', borderRadius: '8px', padding: '0.45rem 0.7rem',
  fontSize: '0.875rem', color: '#374151', background: '#FFFFFF', width: '100%',
  outline: 'none', transition: 'border-color 0.15s ease'
};

const labelStyle = {
  fontSize: '0.72rem', fontWeight: '600', color: '#6B7280',
  textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.3rem', display: 'block'
};

const AuditLogFilters = ({ onFilter, isSuperRole }) => {
  const [dateFrom, setDateFrom] = useState(sevenDaysAgo);
  const [dateTo, setDateTo]     = useState(today);
  const [entityType, setEntityType] = useState('');
  const [actionType, setActionType] = useState('');
  const [campus, setCampus]         = useState('');

  const handleSearch = () => {
    onFilter({ dateFrom, dateTo, entityType, actionType, campus });
  };

  const handleClear = () => {
    setDateFrom(sevenDaysAgo);
    setDateTo(today);
    setEntityType('');
    setActionType('');
    setCampus('');
    onFilter({ dateFrom: sevenDaysAgo, dateTo: today, entityType: '', actionType: '', campus: '' });
  };

  // Aplicar filtro inicial al montar
  useEffect(() => {
    onFilter({ dateFrom, dateTo, entityType: '', actionType: '', campus: '' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{
      background: '#FFFFFF', borderRadius: '12px', padding: '1rem 1.25rem',
      border: '1px solid #E5E7EB', marginBottom: '1rem',
      boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
    }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'flex-end' }}>
        {/* Desde */}
        <div style={{ flex: '1 1 130px' }}>
          <label style={labelStyle}>Desde</label>
          <input type="date" value={dateFrom} max={dateTo} onChange={e => setDateFrom(e.target.value)} style={inputStyle} />
        </div>
        {/* Hasta */}
        <div style={{ flex: '1 1 130px' }}>
          <label style={labelStyle}>Hasta</label>
          <input type="date" value={dateTo} min={dateFrom} onChange={e => setDateTo(e.target.value)} style={inputStyle} />
        </div>
        {/* Entidad */}
        <div style={{ flex: '1 1 160px' }}>
          <label style={labelStyle}>Entidad</label>
          <select value={entityType} onChange={e => setEntityType(e.target.value)} style={inputStyle}>
            {ENTITY_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
        {/* Acción */}
        <div style={{ flex: '1 1 160px' }}>
          <label style={labelStyle}>Acción</label>
          <select value={actionType} onChange={e => setActionType(e.target.value)} style={inputStyle}>
            {ACTION_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
        {/* Campus (solo SUPER) */}
        {isSuperRole && (
          <div style={{ flex: '1 1 140px' }}>
            <label style={labelStyle}>Campus</label>
            <select value={campus} onChange={e => setCampus(e.target.value)} style={inputStyle}>
              {CAMPUS_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        )}
        {/* Botones */}
        <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
          <button
            onClick={handleSearch}
            style={{
              background: '#1D4ED8', color: '#FFFFFF', border: 'none', borderRadius: '8px',
              padding: '0.45rem 1rem', fontSize: '0.875rem', fontWeight: '600', cursor: 'pointer',
              transition: 'background 0.15s ease'
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#1E40AF'}
            onMouseLeave={e => e.currentTarget.style.background = '#1D4ED8'}
          >
            Buscar
          </button>
          <button
            onClick={handleClear}
            style={{
              background: '#F3F4F6', color: '#374151', border: '1.5px solid #E5E7EB',
              borderRadius: '8px', padding: '0.45rem 0.75rem', fontSize: '0.875rem',
              fontWeight: '500', cursor: 'pointer', transition: 'background 0.15s ease'
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#E5E7EB'}
            onMouseLeave={e => e.currentTarget.style.background = '#F3F4F6'}
          >
            Limpiar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuditLogFilters;
