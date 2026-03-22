import { useMemo } from 'react'
import { Bike, MapPin, Star, Truck } from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'

export default function DriverPanel() {
  const { user, orders, takeDelivery, markDelivered } = useApp()

  const disponibles = useMemo(
    () => orders.filter((o) => o.estado === 'listo_para_envio'),
    [orders],
  )

  const activas = useMemo(
    () =>
      orders.filter(
        (o) =>
          o.estado === 'en_camino' &&
          o.repartidorId === user?.id,
      ),
    [orders, user?.id],
  )

  const hoy = new Date().toISOString().slice(0, 10)
  const entregasHoy = orders.filter(
    (o) =>
      o.estado === 'entregado' &&
      o.repartidorId === user?.id &&
      o.fecha === hoy,
  ).length

  if (!user || user.role !== 'repartidor') return null

  return (
    <div>
      <header className="rounded-2xl border border-eco-pale bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-5xl" aria-hidden>
            {user.avatar}
          </span>
          <div>
            <h1 className="text-2xl font-bold text-eco-dark">{user.name}</h1>
            <p className="mt-1 flex items-center gap-2 text-sm text-eco-gray">
              <Bike className="h-4 w-4" />
              {user.vehiculo} · {user.zona}
            </p>
          </div>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-eco-cream/80 p-4">
            <p className="text-xs font-medium uppercase text-eco-gray">
              Entregas hoy
            </p>
            <p className="text-2xl font-bold text-eco-dark">{entregasHoy}</p>
          </div>
          <div className="rounded-xl bg-eco-cream/80 p-4">
            <p className="text-xs font-medium uppercase text-eco-gray">
              Calificación
            </p>
            <p className="flex items-center gap-1 text-2xl font-bold text-eco-dark">
              <Star className="h-6 w-6 fill-eco-gold text-eco-gold" />
              {user.calificacion}
            </p>
          </div>
          <div className="rounded-xl bg-eco-cream/80 p-4">
            <p className="text-xs font-medium uppercase text-eco-gray">
              Entregas totales
            </p>
            <p className="text-2xl font-bold text-eco-dark">
              {user.entregas_completadas}
            </p>
          </div>
        </div>
      </header>

      <section className="mt-10">
        <h2 className="flex items-center gap-2 text-lg font-bold text-eco-dark">
          <Truck className="h-5 w-5" />
          Pedidos disponibles para recoger
        </h2>
        <ul className="mt-4 space-y-4">
          {disponibles.length === 0 && (
            <li className="rounded-2xl border border-dashed border-eco-pale bg-white p-8 text-center text-eco-gray">
              No hay pedidos listos para envío en este momento.
            </li>
          )}
          {disponibles.map((o) => (
            <li
              key={o.id}
              className="rounded-2xl border border-eco-pale bg-white p-5 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <p className="font-mono font-bold text-eco-primary">{o.id}</p>
                <span className="text-sm font-semibold">
                  ${o.total.toLocaleString('es-CO')} COP
                </span>
              </div>
              <p className="mt-2 font-medium">{o.comprador}</p>
              <p className="mt-1 flex items-start gap-2 text-sm text-eco-gray">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                {o.direccion}
              </p>
              <button
                type="button"
                onClick={() => takeDelivery(o.id)}
                className="mt-4 rounded-xl bg-eco-primary px-4 py-2 text-sm font-semibold text-white hover:bg-eco-mid"
              >
                Tomar pedido
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-bold text-eco-dark">Mis entregas activas</h2>
        <ul className="mt-4 space-y-4">
          {activas.length === 0 && (
            <li className="text-sm text-eco-gray">No tienes entregas en curso.</li>
          )}
          {activas.map((o) => (
            <li
              key={o.id}
              className="rounded-2xl border border-eco-mid/40 bg-eco-pale/30 p-5"
            >
              <p className="font-mono font-bold text-eco-primary">{o.id}</p>
              <p className="text-sm">{o.comprador}</p>
              <p className="mt-1 text-sm text-eco-gray">{o.direccion}</p>
              <button
                type="button"
                onClick={() => markDelivered(o.id)}
                className="mt-4 rounded-xl bg-eco-mid px-4 py-2 text-sm font-semibold text-white"
              >
                Marcar como entregado
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
