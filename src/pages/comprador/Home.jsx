import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Star } from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'
import ProductCard from '../../components/ProductCard.jsx'

const CATS = [
  { id: 'todos', label: 'Todos' },
  { id: 'canasta', label: 'Canastas' },
  { id: 'frutas', label: 'Frutas' },
  { id: 'verduras', label: 'Verduras' },
  { id: 'tuberculos', label: 'Tubérculos' },
  { id: 'aromaticas', label: 'Aromáticas' },
]

export default function Home() {
  const { products, addToCart, user } = useApp()
  const [cat, setCat] = useState('todos')

  const list = useMemo(() => {
    const active = products.filter((p) => p.activo !== false)
    if (cat === 'todos') return active
    return active.filter((p) => p.categoria === cat)
  }, [products, cat])

  return (
    <div>
      <div className="rounded-2xl bg-gradient-to-r from-eco-primary to-eco-mid px-6 py-8 text-white shadow-lg">
        <p className="text-sm font-medium text-eco-pale/90">
          Del campo a tu mesa, con propósito y frescura
        </p>
        <p className="mt-1 text-lg font-semibold">
          Fusagasugá, Cundinamarca — Sumapaz
        </p>
        {user?.suscripcion && (
          <span className="mt-4 inline-block rounded-full bg-eco-gold px-3 py-1 text-xs font-bold text-eco-dark">
            Suscriptor 🌿 — 10% de descuento en tu carrito
          </span>
        )}
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {CATS.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setCat(c.id)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              cat === c.id
                ? 'bg-eco-primary text-white'
                : 'bg-white text-eco-dark ring-1 ring-eco-pale hover:bg-eco-pale/50'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <ProductCard key={p.id} product={p} onAdd={addToCart} />
        ))}
      </div>

      <section id="productores" className="mt-14 scroll-mt-24">
        <h2 className="text-xl font-bold text-eco-dark">Productores destacados</h2>
        <div className="mt-4 rounded-2xl border border-eco-pale bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <span className="text-6xl" aria-hidden>
              👨‍🌾
            </span>
            <div className="flex-1">
              <p className="font-semibold text-eco-dark">Don Carlos Herrera</p>
              <p className="text-sm text-eco-gray">Finca El Paraíso</p>
              <p className="mt-1 flex items-center gap-1 text-sm text-eco-gray">
                <MapPin className="h-4 w-4" />
                Vereda La Aguadita, Fusagasugá
              </p>
              <div className="mt-2 flex items-center gap-2">
                <Star className="h-4 w-4 fill-eco-gold text-eco-gold" />
                <span className="text-sm font-medium">4.8</span>
                <span className="text-sm text-eco-gray">127 ventas</span>
              </div>
            </div>
            <Link
              to="/comprador/producto/1"
              className="rounded-xl bg-eco-pale px-4 py-2 text-center text-sm font-semibold text-eco-dark hover:bg-eco-light/40"
            >
              Ver productos de la finca
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
