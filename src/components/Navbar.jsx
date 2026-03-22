import { Link, NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  ShoppingCart,
  Sprout,
  Truck,
  User,
  ClipboardList,
  History,
} from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'

const linkBase =
  'rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-white/10'
const active = 'bg-white/15'

export default function Navbar() {
  const { user, cart } = useApp()
  const navigate = useNavigate()
  const count = cart.reduce((s, x) => s + x.quantity, 0)

  if (!user) return null

  const logo = (
    <Link to="/" className="flex items-center gap-2 font-bold text-white">
      <span className="text-2xl" aria-hidden>
        🌿
      </span>
      <span>EcoRaíces</span>
    </Link>
  )

  if (user.role === 'comprador') {
    return (
      <header className="sticky top-0 z-50 border-b border-eco-dark/20 bg-eco-dark shadow-md">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          {logo}
          <div className="order-3 w-full min-w-[200px] flex-1 md:order-none md:max-w-md">
            <label className="sr-only" htmlFor="nav-search">
              Buscar productos
            </label>
            <input
              id="nav-search"
              type="search"
              placeholder="Buscar en el catálogo..."
              className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm text-white placeholder:text-white/50 focus:border-eco-light focus:outline-none focus:ring-2 focus:ring-eco-light/40"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  navigate('/comprador')
                }
              }}
            />
          </div>
          <nav className="flex flex-wrap items-center gap-1">
            <NavLink
              to="/comprador"
              end
              className={({ isActive }) =>
                `${linkBase} ${isActive ? active : ''}`
              }
            >
              Catálogo
            </NavLink>
            <NavLink
              to="/comprador/carrito"
              className={({ isActive }) =>
                `relative inline-flex items-center gap-1 ${linkBase} ${isActive ? active : ''}`
              }
            >
              <ShoppingCart className="h-4 w-4" />
              Carrito
              {count > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-eco-gold px-1 text-xs font-bold text-eco-dark">
                  {count}
                </span>
              )}
            </NavLink>
            <NavLink
              to="/comprador/pedidos"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? active : ''}`
              }
            >
              Mis pedidos
            </NavLink>
            <NavLink
              to="/comprador/cuenta"
              className={({ isActive }) =>
                `inline-flex items-center gap-1 ${linkBase} ${isActive ? active : ''}`
              }
            >
              <User className="h-4 w-4" />
              Mi cuenta
            </NavLink>
            <Link
              to="/"
              className={`${linkBase} border border-white/25 text-eco-pale hover:bg-white/10`}
            >
              Cambiar de perfil
            </Link>
          </nav>
        </div>
      </header>
    )
  }

  if (user.role === 'productor') {
    return (
      <header className="sticky top-0 z-50 border-b border-eco-dark/20 bg-eco-dark shadow-md">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          {logo}
          <nav className="flex flex-wrap items-center gap-1">
            <NavLink
              to="/productor"
              end
              className={({ isActive }) =>
                `inline-flex items-center gap-1 ${linkBase} ${isActive ? active : ''}`
              }
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </NavLink>
            <NavLink
              to="/productor/productos"
              className={({ isActive }) =>
                `inline-flex items-center gap-1 ${linkBase} ${isActive ? active : ''}`
              }
            >
              <Sprout className="h-4 w-4" />
              Mis productos
            </NavLink>
            <NavLink
              to="/productor/pedidos"
              className={({ isActive }) =>
                `inline-flex items-center gap-1 ${linkBase} ${isActive ? active : ''}`
              }
            >
              <ClipboardList className="h-4 w-4" />
              Pedidos
            </NavLink>
            <NavLink
              to="/productor/cuenta"
              className={({ isActive }) =>
                `inline-flex items-center gap-1 ${linkBase} ${isActive ? active : ''}`
              }
            >
              <User className="h-4 w-4" />
              Perfil
            </NavLink>
            <Link
              to="/"
              className={`${linkBase} border border-white/25 text-eco-pale hover:bg-white/10`}
            >
              Cambiar de perfil
            </Link>
          </nav>
        </div>
      </header>
    )
  }

  if (user.role === 'repartidor') {
    return (
      <header className="sticky top-0 z-50 border-b border-eco-dark/20 bg-eco-dark shadow-md">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          {logo}
          <nav className="flex flex-wrap items-center gap-1">
            <NavLink
              to="/repartidor"
              end
              className={({ isActive }) =>
                `inline-flex items-center gap-1 ${linkBase} ${isActive ? active : ''}`
              }
            >
              <Truck className="h-4 w-4" />
              Panel
            </NavLink>
            <NavLink
              to="/repartidor/historial"
              className={({ isActive }) =>
                `inline-flex items-center gap-1 ${linkBase} ${isActive ? active : ''}`
              }
            >
              <History className="h-4 w-4" />
              Historial
            </NavLink>
            <NavLink
              to="/repartidor/cuenta"
              className={({ isActive }) =>
                `inline-flex items-center gap-1 ${linkBase} ${isActive ? active : ''}`
              }
            >
              <User className="h-4 w-4" />
              Perfil
            </NavLink>
            <Link
              to="/"
              className={`${linkBase} border border-white/25 text-eco-pale hover:bg-white/10`}
            >
              Cambiar de perfil
            </Link>
          </nav>
        </div>
      </header>
    )
  }

  return null
}
