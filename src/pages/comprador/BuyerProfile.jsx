import { Link } from 'react-router-dom'
import { LogOut, MapPin, Mail } from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'
import StatusBadge from '../../components/StatusBadge.jsx'

export default function BuyerProfile() {
  const { user, logout, buyerOrders } = useApp()
  const recientes = [...buyerOrders]
    .sort((a, b) => (b.fecha > a.fecha ? 1 : -1))
    .slice(0, 5)

  if (!user) return null

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-3xl border border-eco-pale bg-white p-8 shadow-sm">
        <div className="flex items-start gap-4">
          <span className="text-6xl" aria-hidden>
            {user.avatar}
          </span>
          <div>
            <h1 className="text-2xl font-bold text-eco-dark">{user.name}</h1>
            <p className="mt-1 flex items-center gap-2 text-sm text-eco-gray">
              <Mail className="h-4 w-4" />
              {user.email}
            </p>
            <p className="mt-1 flex items-center gap-2 text-sm text-eco-gray">
              <MapPin className="h-4 w-4" />
              {user.location}
            </p>
            {user.suscripcion && (
              <span className="mt-3 inline-block rounded-full bg-eco-pale px-3 py-1 text-xs font-bold text-eco-primary">
                Suscriptor 🌿 — 10% de descuento
              </span>
            )}
          </div>
        </div>

        <div className="mt-8 border-t border-eco-pale pt-6">
          <h2 className="font-semibold text-eco-dark">Pedidos recientes</h2>
          {recientes.length === 0 ? (
            <p className="mt-2 text-sm text-eco-gray">Sin pedidos aún.</p>
          ) : (
            <ul className="mt-3 space-y-2">
              {recientes.map((o) => (
                <li
                  key={o.id}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-eco-cream/80 px-3 py-2 text-sm"
                >
                  <Link
                    to={`/comprador/pedidos/${o.id}`}
                    className="font-mono font-medium text-eco-primary hover:underline"
                  >
                    {o.id}
                  </Link>
                  <StatusBadge estado={o.estado} showEmoji={false} />
                  <span className="text-eco-gray">${o.total.toLocaleString('es-CO')}</span>
                </li>
              ))}
            </ul>
          )}
          <Link
            to="/comprador/pedidos"
            className="mt-4 inline-block text-sm font-semibold text-eco-primary hover:underline"
          >
            Ver todos los pedidos
          </Link>
        </div>

        <button
          type="button"
          onClick={() => logout()}
          className="mt-8 inline-flex items-center gap-2 rounded-xl border border-eco-pale px-4 py-2 text-sm font-semibold text-eco-dark hover:bg-red-50 hover:text-red-700"
        >
          <LogOut className="h-4 w-4" />
          Cerrar sesión
        </button>
      </div>
    </div>
  )
}
