import { useState } from 'react'

export default function TablaLotes({ lotes, activoId, onIniciar, onEliminar, onReiniciar }) {
  const [filtro, setFiltro] = useState('Todos')
  const visibles = filtro === 'Todos' ? lotes : lotes.filter(l => l.estado === filtro)

  return (
    <section className="tarjeta">
      <div className="titulo-fila">
        <h2>Productos procesados</h2>
        <div className="acciones">
          <select value={filtro} onChange={e => setFiltro(e.target.value)}>
            <option>Todos</option>
            <option>Pendiente</option>
            <option>En proceso</option>
            <option>Finalizado</option>
          </select>
          <button className="btn secundario" onClick={onReiniciar} disabled={lotes.length === 0}>
            Limpiar todo
          </button>
        </div>
      </div>

      {visibles.length === 0 ? (
        <p className="vacio">No hay lotes para mostrar.</p>
      ) : (
        <div className="tabla-contenedor">
          <table>
            <thead>
              <tr>
                <th>Código</th>
                <th>Producto</th>
                <th>Operador</th>
                <th>Cantidad</th>
                <th>Terminadas</th>
                <th>Defectuosas</th>
                <th>Eficiencia</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {visibles.map(l => {
                const efi = l.estado === 'Finalizado' ? `${((l.terminadas / l.cantidad) * 100).toFixed(1)}%` : '-'
                return (
                  <tr key={l.id}>
                    <td>{l.codigo}</td>
                    <td>
                      <span className="punto" style={{ background: l.color }} />
                      {l.producto}
                    </td>
                    <td>{l.operador}</td>
                    <td>{l.cantidad}</td>
                    <td className="ok-texto">{l.estado === 'Finalizado' ? l.terminadas : '-'}</td>
                    <td className="mal-texto">{l.estado === 'Finalizado' ? l.defectuosas : '-'}</td>
                    <td>{efi}</td>
                    <td>
                      <span className={`estado ${l.estado.replace(' ', '-').toLowerCase()}`}>{l.estado}</span>
                    </td>
                    <td className="acciones">
                      {l.estado === 'Pendiente' && (
                        <button className="btn mini" onClick={() => onIniciar(l.id)} disabled={activoId !== null}>
                          Iniciar
                        </button>
                      )}
                      <button className="btn mini peligro" onClick={() => onEliminar(l.id)} disabled={l.id === activoId}>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
