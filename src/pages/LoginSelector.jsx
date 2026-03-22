import { ShoppingCart, Sprout, Truck } from 'lucide-react'
import Footer from '../components/Footer.jsx'
import { useNavigate, Link } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
const cards = [
  {
    role: 'comprador',
    title: 'Comprador',
    emoji: '🛒',
    desc: 'Quiero comprar productos del campo',
    icon: ShoppingCart,
    href: '/comprador',
    border: 'border-eco-light hover:border-eco-primary',
  },
  {
    role: 'productor',
    title: 'Productor',
    emoji: '👨‍🌾',
    desc: 'Quiero vender mis productos',
    icon: Sprout,
    href: '/productor',
    border: 'border-eco-mid hover:border-eco-primary',
  },
  {
    role: 'repartidor',
    title: 'Repartidor',
    emoji: '🚴',
    desc: 'Quiero hacer entregas',
    icon: Truck,
    href: '/repartidor',
    border: 'border-eco-gold hover:border-eco-primary',
  },
]

const PANEL_BY_ROLE = {
  comprador: '/comprador',
  productor: '/productor',
  repartidor: '/repartidor',
}

const ROLE_LABEL = {
  comprador: 'Comprador',
  productor: 'Productor',
  repartidor: 'Repartidor',
}

export default function LoginSelector() {
  const { login, user } = useApp()
  const navigate = useNavigate()

  const handle = (card) => {
    login(card.role)
    navigate(card.href)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-eco-cream to-eco-pale/40 px-4 py-16">
        {user && (
          <div className="mx-auto mb-8 max-w-2xl rounded-2xl border border-eco-mid/40 bg-white/90 px-4 py-3 text-center shadow-sm">
            <p className="text-sm text-eco-dark">
              Sesión activa:{' '}
              <strong>{ROLE_LABEL[user.role]}</strong>
              {' — '}
              <Link
                to={PANEL_BY_ROLE[user.role]}
                className="font-semibold text-eco-primary underline decoration-eco-light underline-offset-2 hover:text-eco-mid"
              >
                Ir a mi panel
              </Link>
            </p>
            <p className="mt-1 text-xs text-eco-gray">
              Puedes elegir otro perfil abajo para cambiar (comprador, vendedor o
              repartidor).
            </p>
          </div>
        )}
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-2 flex items-center justify-center gap-3">
            <span className="text-5xl" aria-hidden>
              🌿
            </span>
            <h1 className="text-3xl font-bold text-eco-dark md:text-4xl">
              EcoRaíces
            </h1>
          </div>
          <p className="mx-auto max-w-xl text-lg italic text-eco-mid">
            Del campo a tu mesa, con propósito y frescura
          </p>
          <p className="mt-4 text-eco-gray">
            Marketplace campesino — Fusagasugá y región del Sumapaz
          </p>
          <p className="mt-8 text-sm font-medium text-eco-dark">
            {user
              ? 'Cambiar de perfil o volver a entrar'
              : 'Elige cómo quieres entrar al prototipo'}
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-3">
          {cards.map((c) => {
            const Icon = c.icon
            return (
              <button
                key={c.role}
                type="button"
                onClick={() => handle(c)}
                className={`group flex flex-col items-center rounded-3xl border-2 bg-white p-8 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${c.border}`}
              >
                <span className="text-5xl" aria-hidden>
                  {c.emoji}
                </span>
                <Icon className="mt-4 h-8 w-8 text-eco-primary" />
                <h2 className="mt-3 text-xl font-bold text-eco-dark">
                  {c.title}
                </h2>
                <p className="mt-2 text-center text-sm text-eco-gray">
                  {c.desc}
                </p>
                <span className="mt-6 text-sm font-semibold text-eco-primary group-hover:underline">
                  Entrar →
                </span>
              </button>
            )
          })}
        </div>

        <p className="mx-auto mt-12 max-w-2xl text-center text-xs text-eco-gray">
          Prototipo simulado: sin backend ni pagos reales. Los datos se guardan
          en tu navegador (localStorage).
        </p>
      <Footer />
    </div>
  )
}
