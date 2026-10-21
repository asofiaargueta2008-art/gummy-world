export default function Estadisticas({ lotes }) {
  const finalizados = lotes.filter(l => l.estado === 'Finalizado')
  const procesadas = finalizados.reduce((s, l) => s + l.cantidad, 0)
  const terminadas = finalizados.reduce((s, l) => s + l.terminadas, 0)
  const defectuosas = finalizados.reduce((s, l) => s + l.defectuosas, 0)
  const eficiencia = procesadas > 0 ? (terminadas / procesadas) * 100 : 0

  let nivel = 'Sin datos'
  if (procesadas > 0) nivel = eficiencia >= 95 ? 'Excelente' : eficiencia >= 85 ? 'Aceptable' : 'Baja'

  const tarjetas = [
    { titulo: 'Lotes registrados', valor: lotes.length, clase: '' },
    { titulo: 'Unidades procesadas', valor: procesadas, clase: '' },
    { titulo: 'Unidades terminadas', valor: terminadas, clase: 'ok' },
    { titulo: 'Unidades defectuosas', valor: defectuosas, clase: 'mal' },
    { titulo: `Eficiencia (${nivel})`, valor: `${eficiencia.toFixed(1)}%`, clase: 'efi' }
  ]

  return (
    <section className="estadisticas">
      {tarjetas.map(t => (
        <div key={t.titulo} className={`stat ${t.clase}`}>
          <span>{t.titulo}</span>
          <strong>{t.valor}</strong>
        </div>
      ))}
    </section>
  )
}
