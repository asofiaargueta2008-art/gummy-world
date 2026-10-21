import { ETAPAS } from '../data.js'

export default function LineaProduccion({ lote, velocidad, onVelocidad }) {
  const progreso = lote ? Math.min(((lote.etapa + 1) / ETAPAS.length) * 100, 100) : 0

  return (
    <section className="tarjeta">
      <div className="titulo-fila">
        <h2>Línea de producción</h2>
        <select value={velocidad} onChange={e => onVelocidad(Number(e.target.value))}>
          <option value={1500}>Lenta</option>
          <option value={1000}>Normal</option>
          <option value={400}>Rápida</option>
        </select>
      </div>

      <p className="texto-suave">
        {lote ? `Procesando ${lote.codigo} · ${lote.producto} · ${lote.cantidad} unidades` : 'Línea detenida. Inicia un lote desde la tabla.'}
      </p>

      <div className="barra">
        <div className="barra-relleno" style={{ width: `${progreso}%` }} />
      </div>

      <ol className="etapas">
        {ETAPAS.map((etapa, i) => {
          let clase = 'etapa'
          if (lote && i < lote.etapa) clase += ' hecha'
          if (lote && i === lote.etapa) clase += ' actual'
          return (
            <li key={etapa.id} className={clase}>
              <span className="numero">{etapa.id}</span>
              {etapa.nombre}
            </li>
          )
        })}
      </ol>
    </section>
  )
}
