import { Link } from 'react-router-dom'
import {
  Package,
  Star,
  Sprout,
  Wallet,
  BadgeCheck,
} from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'
import StatusBadge from '../../components/StatusBadge.jsx'

export default function Dashboard() {
  const { user, orders, producerMetrics, PLATFORM_COMMISSION_RATE } = useApp()
  const recientes = [...orders]
    .sort((a, b) => (b.fecha > a.fecha ? 1 : -1))
    .slice(0, 3)

  if (!user || user.role !== 'productor') return null

  return (
    <div>
      <header className="rounded-2xl border border-eco-pale bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm text-eco-gray">{user.finca}</p>
            <h1 className="text-2xl font-bold text-eco-dark">
              Hola, {user.name}
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
              <span className="inline-flex items-center gap-1 text-eco-mid">
                <Star className="h-4 w-4 fill-eco-gold text-eco-gold" />
                {user.calificacion} / 5
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-eco-pale px-2 py-0.5 text-xs font-semibold text-eco-dark">
                <BadgeCheck className="h-3.5 w-3.5" />
                Productor verificado
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          icon={Package}
          label="Pedidos hoy"
          value={String(producerMetrics.pedidosHoy)}
        />
        <MetricCard
          icon={Wallet}
          label="Ingresos del mes (neto)"
          value={`$${producerMetrics.ingresosNetos.toLocaleString('es-CO')}`}
          hint={`Comisión EcoRaíces descontada: $${producerMetrics.comisionMes.toLocaleString('es-CO')} (${Math.round(PLATFORM_COMMISSION_RATE * 100)}%)`}
        />
        <MetricCard
          icon={Star}
          label="Calificación promedio"
          value={producerMetrics.calificacion.toFixed(1)}
        />
        <MetricCard
          icon={Sprout}
          label="Productos activos"
          value={String(producerMetrics.productosActivos)}
        />
      </div>

      <section className="mt-10">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg font-bold text-eco-dark">Pedidos recientes</h2>
          <Link
            to="/productor/pedidos"
            className="text-sm font-semibold text-eco-primary hover:underline"
          >
            Ver todos
          </Link>
        </div>
        <ul className="mt-4 space-y-3">
          {recientes.map((o) => (
            <li
              key={o.id}
              className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-eco-pale bg-white px-4 py-3"
            >
              <span className="font-mono font-medium">{o.id}</span>
              <StatusBadge estado={o.estado} showEmoji={false} />
              <span className="text-sm text-eco-gray">{o.comprador}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          to="/productor/productos"
          className="rounded-xl bg-eco-primary px-5 py-2.5 font-semibold text-white hover:bg-eco-mid"
        >
          Ver mis productos
        </Link>
        <Link
          to="/productor/pedidos"
          className="rounded-xl border border-eco-primary px-5 py-2.5 font-semibold text-eco-primary hover:bg-eco-pale/50"
        >
          Gestionar pedidos
        </Link>
      </div>
    </div>
  )
}

function MetricCard({ icon: Icon, label, value, hint }) {
  return (
    <div className="rounded-2xl border border-eco-pale bg-white p-5 shadow-sm">
      <Icon className="h-6 w-6 text-eco-primary" />
      <p className="mt-2 text-xs font-medium uppercase tracking-wide text-eco-gray">
        {label}
      </p>
      <p className="mt-1 text-xl font-bold text-eco-dark">{value}</p>
      {hint && <p className="mt-2 text-xs text-eco-mid">{hint}</p>}
    </div>
  )
}
