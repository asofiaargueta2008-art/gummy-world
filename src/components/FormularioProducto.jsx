import { useState } from 'react'
import { PRODUCTOS } from '../data.js'

const inicial = { producto: PRODUCTOS[0].id, cantidad: 100, operador: '', tasaDefecto: 5 }

export default function FormularioProducto({ onRegistrar }) {
  const [form, setForm] = useState(inicial)
  const [error, setError] = useState('')

  const cambiar = e => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const enviar = e => {
    e.preventDefault()
    const cantidad = Number(form.cantidad)
    if (!form.operador.trim()) return setError('Ingresa el nombre del operador')
    if (!Number.isInteger(cantidad) || cantidad <= 0) return setError('La cantidad debe ser un número entero mayor a 0')
    const tasa = Number(form.tasaDefecto)
    if (form.tasaDefecto === '' || tasa < 0 || tasa > 100) return setError('Los defectos deben estar entre 0 y 100')
    const producto = PRODUCTOS.find(p => p.id === form.producto)
    onRegistrar({
      producto: producto.nombre,
      color: producto.color,
      cantidad,
      operador: form.operador.trim(),
      tasaDefecto: tasa
    })
    setError('')
    setForm({ ...inicial, producto: form.producto, operador: form.operador })
  }

  return (
    <section className="tarjeta">
      <h2>Registrar lote</h2>
      <form onSubmit={enviar} className="formulario">
        <label>
          Producto
          <select name="producto" value={form.producto} onChange={cambiar}>
            {PRODUCTOS.map(p => (
              <option key={p.id} value={p.id}>{p.nombre}</option>
            ))}
          </select>
        </label>
        <label>
          Cantidad de unidades
          <input type="number" name="cantidad" min="1" value={form.cantidad} onChange={cambiar} />
        </label>
        <label>
          Operador
          <input type="text" name="operador" placeholder="Nombre del operador" value={form.operador} onChange={cambiar} />
        </label>
        <label>
          Defectos (%)
          <input type="number" name="tasaDefecto" min="0" max="100" value={form.tasaDefecto} onChange={cambiar} />
        </label>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="btn principal">Registrar lote</button>
      </form>
    </section>
  )
}
