import { useMemo, useState } from 'react'
import { useApp } from '../../context/AppContext.jsx'
import StatusBadge from '../../components/StatusBadge.jsx'

const FILTERS = [
  { id: 'todos', label: 'Todos' },
  { id: 'pendiente', label: 'Pendiente' },
  { id: 'en_preparacion', label: 'En preparación' },
  { id: 'listo_para_envio', label: 'Listo para envío' },
  { id: 'en_camino', label: 'En camino' },
  { id: 'entregado', label: 'Entregado' },
]

export default function OrderManagement() {
  const { orders, acceptOrderProducer, markReadyForShipping } = useApp()
  const [filtro, setFiltro] = useState('todos')

  const list = useMemo(() => {
    if (filtro === 'todos') return orders
    return orders.filter((o) => o.estado === filtro)
  }, [orders, filtro])

  const completados = orders.filter((o) => o.estado === 'entregado')

  return (
    <div>
      <h1 className="text-2xl font-bold text-eco-dark">Gestión de pedidos</h1>

      <div className="mt-6 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFiltro(f.id)}
            className={`rounded-full px-4 py-2 text-sm font-medium ${
              filtro === f.id
                ? 'bg-eco-primary text-white'
                : 'bg-white text-eco-dark ring-1 ring-eco-pale'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <ul className="mt-8 space-y-6">
        {list.map((o) => (
          <li
            key={o.id}
            className="rounded-2xl border border-eco-pale bg-white p-5 shadow-sm"
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="font-mono text-lg font-bold text-eco-primary">
                  {o.id}
                </p>
                <p className="text-sm text-eco-gray">{o.comprador}</p>
              </div>
              <StatusBadge estado={o.estado} />
            </div>
            <ul className="mt-3 text-sm">
              {o.productos.map((p, i) => (
                <li key={i}>• {p}</li>
              ))}
            </ul>
            <div className="mt-3 flex flex-wrap gap-6 text-sm">
              <span>
                <strong>Total:</strong> ${o.total.toLocaleString('es-CO')} COP
              </span>
              <span>
                <strong>Fecha:</strong> {o.fecha}
              </span>
            </div>
            <p className="mt-2 text-sm">
              <strong>Entrega:</strong> {o.direccion}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {o.estado === 'pendiente' && (
                <button
                  type="button"
                  onClick={() => acceptOrderProducer(o.id)}
                  className="rounded-xl bg-eco-primary px-4 py-2 text-sm font-semibold text-white"
                >
                  Aceptar pedido
                </button>
              )}
              {o.estado === 'en_preparacion' && (
                <button
                  type="button"
                  onClick={() => markReadyForShipping(o.id)}
                  className="rounded-xl bg-eco-mid px-4 py-2 text-sm font-semibold text-white"
                >
                  Listo para envío
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>

      <section className="mt-12 border-t border-eco-pale pt-8">
        <h2 className="text-lg font-bold text-eco-dark">
          Historial completados ({completados.length})
        </h2>
        <ul className="mt-4 space-y-2 text-sm text-eco-gray">
          {completados.map((o) => (
            <li key={o.id}>
              {o.id} — {o.comprador} — ${o.total.toLocaleString('es-CO')} —{' '}
              {o.fecha}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
