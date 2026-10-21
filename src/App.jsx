import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import FormularioProducto from './components/FormularioProducto.jsx'
import LineaProduccion from './components/LineaProduccion.jsx'
import Estadisticas from './components/Estadisticas.jsx'
import TablaLotes from './components/TablaLotes.jsx'
import { ETAPAS } from './data.js'

function cargarLotes() {
  try {
    const guardado = localStorage.getItem('gummy-lotes')
    return guardado ? JSON.parse(guardado) : []
  } catch {
    return []
  }
}

export default function App() {
  const [lotes, setLotes] = useState(cargarLotes)
  const [activoId, setActivoId] = useState(null)
  const [velocidad, setVelocidad] = useState(1000)

  useEffect(() => {
    try {
      localStorage.setItem('gummy-lotes', JSON.stringify(lotes))
    } catch {
      return
    }
  }, [lotes])

  useEffect(() => {
    if (activoId === null) return
    const intervalo = setInterval(() => {
      setLotes(prev =>
        prev.map(lote => {
          if (lote.id !== activoId) return lote
          const siguiente = lote.etapa + 1
          if (siguiente < ETAPAS.length) {
            return { ...lote, etapa: siguiente }
          }
          const defectuosas = Math.round(lote.cantidad * (lote.tasaDefecto / 100) * (0.5 + Math.random()))
          const def = Math.min(defectuosas, lote.cantidad)
          return {
            ...lote,
            etapa: ETAPAS.length,
            estado: 'Finalizado',
            defectuosas: def,
            terminadas: lote.cantidad - def
          }
        })
      )
    }, velocidad)
    return () => clearInterval(intervalo)
  }, [activoId, velocidad])

  useEffect(() => {
    const activo = lotes.find(l => l.id === activoId)
    if (activo && activo.estado === 'Finalizado') setActivoId(null)
  }, [lotes, activoId])

  const registrarLote = datos => {
    const nuevo = {
      id: Date.now(),
      codigo: `GW-${String(lotes.length + 1).padStart(3, '0')}`,
      ...datos,
      etapa: -1,
      estado: 'Pendiente',
      terminadas: 0,
      defectuosas: 0,
      fecha: new Date().toLocaleString('es-SV')
    }
    setLotes(prev => [nuevo, ...prev])
  }

  const iniciarLote = id => {
    if (activoId !== null) return
    setLotes(prev => prev.map(l => (l.id === id ? { ...l, estado: 'En proceso', etapa: 0 } : l)))
    setActivoId(id)
  }

  const eliminarLote = id => {
    if (id === activoId) return
    setLotes(prev => prev.filter(l => l.id !== id))
  }

  const reiniciar = () => {
    setActivoId(null)
    setLotes([])
  }

  const loteActivo = lotes.find(l => l.id === activoId) || null

  return (
    <div className="app">
      <Header />
      <main className="contenido">
        <Estadisticas lotes={lotes} />
        <div className="grid">
          <FormularioProducto onRegistrar={registrarLote} />
          <LineaProduccion
            lote={loteActivo}
            velocidad={velocidad}
            onVelocidad={setVelocidad}
          />
        </div>
        <TablaLotes
          lotes={lotes}
          activoId={activoId}
          onIniciar={iniciarLote}
          onEliminar={eliminarLote}
          onReiniciar={reiniciar}
        />
      </main>
      <footer className="pie">Gummy World © 2026</footer>
    </div>
  )
}
