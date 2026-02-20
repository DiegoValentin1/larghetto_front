import React, { useEffect, useState, useCallback } from 'react'
import { Modal, Form, Row, Col, Button } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import AxiosClient from '../../../../shared/plugins/axios';

export const LogTable = ({ isOpen, onClose }) => {
  const [data, setData]           = useState([]);
  const [total, setTotal]         = useState(0);
  const [page, setPage]           = useState(1);
  const [loading, setLoading]     = useState(false);
  const [fechaMin, setFechaMin]   = useState('');
  const [fechaMax, setFechaMax]   = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin]       = useState('');
  const LIMIT = 100;

  // Obtener rango disponible al abrir
  useEffect(() => {
    if (!isOpen) return;
    AxiosClient({ url: '/instrumento/logs/rango', method: 'GET' })
      .then(rango => {
        if (rango?.fecha_min) {
          setFechaMin(rango.fecha_min);
          setFechaMax(rango.fecha_max);
          setFechaInicio(rango.fecha_min);
          setFechaFin(rango.fecha_max);
        }
      })
      .catch(err => console.log(err));
  }, [isOpen]);

  // Cargar logs cuando cambian fechas o página
  const cargarLogs = useCallback(() => {
    if (!fechaInicio || !fechaFin) return;
    setLoading(true);
    AxiosClient({
      url: `/instrumento/logs/paginados?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}&page=${page}&limit=${LIMIT}`,
      method: 'GET'
    })
      .then(res => {
        setData(res.data || []);
        setTotal(res.total || 0);
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }, [fechaInicio, fechaFin, page]);

  useEffect(() => {
    if (isOpen) cargarLogs();
  }, [isOpen, cargarLogs]);

  // Reset página al cambiar fechas
  const handleFechaInicio = (e) => { setPage(1); setFechaInicio(e.target.value); };
  const handleFechaFin    = (e) => { setPage(1); setFechaFin(e.target.value); };

  const devolverFecha = (fecha) => {
    return new Intl.DateTimeFormat('es-ES', {
      weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
      hour: 'numeric', minute: 'numeric', second: 'numeric',
      hour12: false, timeZone: 'America/Mexico_City'
    }).format(new Date(fecha));
  };

  const customTableStyles = {
    headRow: {
      style: { backgroundColor: '#F3F4F6', borderBottom: '2px solid #E5E7EB', minHeight: '52px' },
    },
    headCells: {
      style: { color: '#1F2937', fontSize: '0.875rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', paddingLeft: '1rem', paddingRight: '1rem' },
    },
    rows: {
      style: {
        minHeight: '52px', fontSize: '0.875rem', color: '#1F2937', borderBottom: '1px solid #E5E7EB',
        '&:nth-of-type(odd)':  { backgroundColor: '#FFFFFF' },
        '&:nth-of-type(even)': { backgroundColor: '#F9FAFB' },
      },
      highlightOnHoverStyle: { backgroundColor: '#F3F4F6', borderBottomColor: '#D1D5DB', outline: '1px solid #E5E7EB' },
    },
    cells: { style: { paddingLeft: '1rem', paddingRight: '1rem' } },
  };

  const columns = [
    {
      name: 'Fecha',
      selector: row => devolverFecha(row.fecha),
      sortable: true,
      width: '240px',
    },
    {
      name: 'Usuario',
      selector: row => row.autor || 'N/A',
      sortable: true,
      width: '180px',
    },
    {
      name: 'Acción',
      selector: row => row.accion,
      cell: row => <div style={{ whiteSpace: 'normal', padding: '6px 0' }}>{row.accion}</div>,
    }
  ];

  const totalPaginas = Math.ceil(total / LIMIT);

  return (
    <Modal show={isOpen} onHide={onClose} size="lg" centered style={{ backdropFilter: 'blur(4px)' }}>
      <Modal.Header closeButton style={{ backgroundColor: '#F9FAFB', borderBottom: '2px solid #E5E7EB', padding: '1.25rem 1.5rem' }}>
        <Modal.Title style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1F2937' }}>
          Cambios Recientes
        </Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ padding: '1rem 1.5rem 0', backgroundColor: '#FFFFFF' }}>
        {/* Filtro de fechas */}
        <Row className="g-2 mb-3 align-items-end">
          <Col xs={5}>
            <Form.Label style={{ fontSize: '0.8rem', fontWeight: '600', color: '#6B7280', marginBottom: '0.25rem' }}>
              Desde
            </Form.Label>
            <Form.Control
              type="date"
              value={fechaInicio}
              min={fechaMin}
              max={fechaFin || fechaMax}
              onChange={handleFechaInicio}
              style={{ fontSize: '0.875rem', borderRadius: '8px', border: '2px solid #E5E7EB' }}
            />
          </Col>
          <Col xs={5}>
            <Form.Label style={{ fontSize: '0.8rem', fontWeight: '600', color: '#6B7280', marginBottom: '0.25rem' }}>
              Hasta
            </Form.Label>
            <Form.Control
              type="date"
              value={fechaFin}
              min={fechaInicio || fechaMin}
              max={fechaMax}
              onChange={handleFechaFin}
              style={{ fontSize: '0.875rem', borderRadius: '8px', border: '2px solid #E5E7EB' }}
            />
          </Col>
          <Col xs={2}>
            <div style={{ fontSize: '0.75rem', color: '#9CA3AF', textAlign: 'center', lineHeight: '1.2' }}>
              {total.toLocaleString()} registros
            </div>
          </Col>
        </Row>

        {/* Tabla */}
        <div style={{ maxHeight: '55vh', overflow: 'auto' }}>
          <DataTable
            columns={columns}
            data={data}
            highlightOnHover
            customStyles={customTableStyles}
            progressPending={loading}
            progressComponent={
              <div style={{ padding: '2rem', color: '#6B7280', fontSize: '0.875rem' }}>Cargando...</div>
            }
            noDataComponent="No hay registros en este rango de fechas"
          />
        </div>
      </Modal.Body>

      {/* Paginación manual */}
      <Modal.Footer style={{ borderTop: '1px solid #E5E7EB', padding: '0.75rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.8rem', color: '#6B7280' }}>
          Mostrando {data.length > 0 ? (page - 1) * LIMIT + 1 : 0}–{Math.min(page * LIMIT, total)} de {total.toLocaleString()}
        </span>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <Button
            variant="outline-secondary"
            size="sm"
            disabled={page <= 1 || loading}
            onClick={() => setPage(p => p - 1)}
            style={{ borderRadius: '8px' }}
          >
            ← Anterior
          </Button>
          <span style={{ fontSize: '0.875rem', color: '#1F2937', minWidth: '80px', textAlign: 'center' }}>
            {page} / {totalPaginas || 1}
          </span>
          <Button
            variant="outline-secondary"
            size="sm"
            disabled={page >= totalPaginas || loading}
            onClick={() => setPage(p => p + 1)}
            style={{ borderRadius: '8px' }}
          >
            Siguiente →
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
