import { Bike, LogOut, MapPin, Star } from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'

export default function DriverProfile() {
  const { user, logout } = useApp()

  if (!user || user.role !== 'repartidor') return null

  return (
    <div className="mx-auto max-w-lg">
      <div className="rounded-3xl border border-eco-pale bg-white p-8 text-center shadow-sm">
        <span className="text-7xl" aria-hidden>
          {user.avatar}
        </span>
        <h1 className="mt-4 text-2xl font-bold text-eco-dark">{user.name}</h1>
        <p className="mt-2 flex items-center justify-center gap-2 text-sm text-eco-gray">
          <Bike className="h-4 w-4" />
          {user.vehiculo}
        </p>
        <p className="mt-1 flex items-center justify-center gap-2 text-sm text-eco-gray">
          <MapPin className="h-4 w-4" />
          {user.zona}
        </p>

        <div className="mt-8 flex justify-center gap-1">
          <Star className="h-8 w-8 fill-eco-gold text-eco-gold" />
          <p className="text-3xl font-bold text-eco-dark">{user.calificacion}</p>
        </div>
        <p className="mt-2 text-sm text-eco-gray">Calificación promedio</p>

        <p className="mt-6 text-lg font-semibold text-eco-mid">
          {user.entregas_completadas} entregas completadas
        </p>

        <button
          type="button"
          onClick={() => logout()}
          className="mt-8 inline-flex items-center gap-2 rounded-xl border border-eco-pale px-6 py-2 font-semibold text-eco-dark hover:bg-red-50"
        >
          <LogOut className="h-4 w-4" />
          Cerrar sesión
        </button>
      </div>
    </div>
  )
}
