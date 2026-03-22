import { useMemo } from 'react'
import { Star } from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'

export default function DeliveryHistory() {
  const { user, orders } = useApp()

  const historial = useMemo(
    () =>
      orders.filter(
        (o) => o.estado === 'entregado' && o.repartidorId === user?.id,
      ),
    [orders, user?.id],
  )

  return (
    <div>
      <h1 className="text-2xl font-bold text-eco-dark">Historial de entregas</h1>
      <ul className="mt-8 space-y-3">
        {historial.length === 0 && (
          <li className="rounded-2xl border border-dashed border-eco-pale bg-white p-8 text-center text-eco-gray">
            Aún no completas entregas en esta sesión (o no hay datos simulados).
          </li>
        )}
        {historial.map((o) => (
          <li
            key={o.id}
            className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-eco-pale bg-white px-4 py-3 text-sm shadow-sm"
          >
            <span className="font-mono font-semibold text-eco-primary">
              {o.id}
            </span>
            <span>{o.comprador}</span>
            <span className="text-eco-gray">{o.fecha}</span>
            <span>${o.total.toLocaleString('es-CO')}</span>
            <span className="inline-flex items-center gap-1 text-eco-mid">
              <Star className="h-4 w-4 fill-eco-gold text-eco-gold" />
              {o.compradorRating?.stars ?? '—'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
