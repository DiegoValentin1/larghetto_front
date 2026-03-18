import React, { useState, useCallback } from 'react';
import AxiosClient from '../../../shared/plugins/axios';
import AuditLogFilters from './AuditLogFilters';
import AuditLogTable from './AuditLogTable';

const AuditLogPage = () => {
  const session = JSON.parse(localStorage.getItem('user') || '{}');
  const isSuperRole = session?.data?.role === 'SUPER';

  const [data, setData]           = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading]     = useState(false);
  const [activeFilters, setActiveFilters] = useState({});

  const fetchLogs = useCallback(async (filters = {}, page = 1) => {
    setLoading(true);
    const params = new URLSearchParams();
    params.set('page', page);
    params.set('limit', 50);
    if (filters.dateFrom)   params.set('dateFrom',   filters.dateFrom);
    if (filters.dateTo)     params.set('dateTo',     filters.dateTo);
    if (filters.entityType) params.set('entityType', filters.entityType);
    if (filters.actionType) params.set('actionType', filters.actionType);
    if (filters.campus)     params.set('campus',     filters.campus);

    try {
      const res = await AxiosClient({ url: `/audit-log?${params.toString()}`, method: 'GET' });
      setData(res.data || []);
      setTotalRows(res.total || 0);
    } catch (err) {
      console.error('[AuditLogPage] Error cargando logs:', err);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleFilter = useCallback((filters) => {
    setActiveFilters(filters);
    setCurrentPage(1);
    fetchLogs(filters, 1);
  }, [fetchLogs]);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    fetchLogs(activeFilters, page);
  }, [fetchLogs, activeFilters]);

  return (
    <div style={{ padding: '1.5rem', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111827', margin: 0 }}>
          Historial de Cambios
        </h1>
        <p style={{ fontSize: '0.875rem', color: '#6B7280', margin: '0.25rem 0 0' }}>
          Auditoría de todas las acciones realizadas por el equipo
          {isSuperRole ? ' en todos los campus' : ` en campus ${session?.data?.campus || ''}`}
        </p>
      </div>

      {/* Contador */}
      {totalRows > 0 && (
        <div style={{ marginBottom: '0.75rem', fontSize: '0.8rem', color: '#6B7280' }}>
          {totalRows.toLocaleString()} registro{totalRows !== 1 ? 's' : ''} encontrado{totalRows !== 1 ? 's' : ''}
        </div>
      )}

      {/* Filtros */}
      <AuditLogFilters onFilter={handleFilter} isSuperRole={isSuperRole} />

      {/* Tabla */}
      <AuditLogTable
        data={data}
        totalRows={totalRows}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        loading={loading}
      />
    </div>
  );
};

export default AuditLogPage;
