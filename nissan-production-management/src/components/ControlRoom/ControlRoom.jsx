import React, { useState } from 'react';
import './ControlRoom.css';

const ControlRoom = () => {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({
    id: '',
    fecha: '',
    linea: '',
    cantidadPlaneada: '',
    cantidadProducida: '',
    estado: 'Pendiente',
    responsable: ''
  });

  const productionLines = [
    { linea: 'Ensamble', oee: 87, qyk: '475/455', real: 51240, socap: 0, status: 'green' },
    { linea: 'Pintura', oee: 86, qyk: '118/1208', real: 5980, socap: 0, status: 'amber' },
    { linea: 'Estampado', oee: 91, qyk: '11.85/125', real: 5560, socap: 0, status: 'green' },
    { linea: 'Maquinado', oee: 86, qyk: '615/605', real: 5720, socap: 0, status: 'red' },
    { linea: 'Logística', oee: 89, qyk: 'OK', real: 5220, socap: 0, status: 'green' }
  ];

  const handleAddOrder = () => {
    if (newOrder.id && newOrder.linea) {
      setOrders([...orders, { 
        ...newOrder, 
        id: newOrder.id || Date.now().toString() 
      }]);
      setNewOrder({
        id: '',
        fecha: '',
        linea: '',
        cantidadPlaneada: '',
        cantidadProducida: '',
        estado: 'Pendiente',
        responsable: ''
      });
    }
  };

  return (
    <div className="control-room">
      <div className="control-room-header">
        <h1>Sala de Control — Producción</h1>
        <div className="status-summary">
          <span className="status-item">
            <span className="status-indicator status-red"></span>
            Paros Críticos: 3
          </span>
          <span className="status-item">
            <span className="status-indicator status-amber"></span>
            Alertas: 5
          </span>
          <span className="status-item">
            <span className="status-indicator status-green"></span>
            Normal: 18
          </span>
        </div>
      </div>

      {/* Tabla de líneas de producción */}
      <div className="dashboard-card">
        <h2>Estado de Líneas</h2>
        <table className="nissan-table">
          <thead>
            <tr>
              <th>Línea</th>
              <th>OEE</th>
              <th>Q&K vs Real</th>
              <th>Socap $/h</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {productionLines.map((line, index) => (
              <tr key={index}>
                <td>{line.linea}</td>
                <td>{line.oee}%</td>
                <td>{line.qyk}</td>
                <td>${line.real.toLocaleString()}</td>
                <td>
                  <span className={`status-indicator status-${line.status}`}></span>
                  {line.status === 'green' ? 'Normal' : 
                   line.status === 'amber' ? 'Alerta' : 'Crítico'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Gestión de órdenes */}
      <div className="orders-section">
        <div className="dashboard-card">
          <h2>Nueva Orden</h2>
          <div className="order-form">
            <div className="form-row">
              <div className="form-group">
                <label>ID</label>
                <input
                  type="text"
                  value={newOrder.id}
                  onChange={(e) => setNewOrder({...newOrder, id: e.target.value})}
                  placeholder="Orden ID"
                />
              </div>
              <div className="form-group">
                <label>Fecha</label>
                <input
                  type="date"
                  value={newOrder.fecha}
                  onChange={(e) => setNewOrder({...newOrder, fecha: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Línea</label>
                <select
                  value={newOrder.linea}
                  onChange={(e) => setNewOrder({...newOrder, linea: e.target.value})}
                >
                  <option value="">Seleccionar</option>
                  <option value="Ensamble">Ensamble</option>
                  <option value="Pintura">Pintura</option>
                  <option value="Estampado">Estampado</option>
                  <option value="Maquinado">Maquinado</option>
                </select>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Cantidad Planeada</label>
                <input
                  type="number"
                  value={newOrder.cantidadPlaneada}
                  onChange={(e) => setNewOrder({...newOrder, cantidadPlaneada: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Cantidad Producida</label>
                <input
                  type="number"
                  value={newOrder.cantidadProducida}
                  onChange={(e) => setNewOrder({...newOrder, cantidadProducida: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Responsable</label>
                <input
                  type="text"
                  value={newOrder.responsable}
                  onChange={(e) => setNewOrder({...newOrder, responsable: e.target.value})}
                  placeholder="Nombre del responsable"
                />
              </div>
            </div>
            
            <button onClick={handleAddOrder} className="btn-nissan">
              Agregar Orden
            </button>
          </div>
        </div>

        {/* Lista de órdenes */}
        <div className="dashboard-card">
          <h2>Órdenes de Producción</h2>
          {orders.length === 0 ? (
            <p className="empty-state">No hay órdenes todavía.</p>
          ) : (
            <table className="nissan-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Fecha</th>
                  <th>Línea</th>
                  <th>Planeada</th>
                  <th>Producida</th>
                  <th>Estado</th>
                  <th>Responsable</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={index}>
                    <td>{order.id}</td>
                    <td>{order.fecha}</td>
                    <td>{order.linea}</td>
                    <td>{order.cantidadPlaneada}</td>
                    <td>{order.cantidadProducida}</td>
                    <td>
                      <span className={`status-badge status-${order.estado.toLowerCase()}`}>
                        {order.estado}
                      </span>
                    </td>
                    <td>{order.responsable}</td>
                    <td>
                      <button className="btn-action">Editar</button>
                      <button className="btn-action delete">Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ControlRoom;