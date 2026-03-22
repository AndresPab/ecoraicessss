import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { MapPin, Sprout } from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'
import StarRating from '../../components/StarRating.jsx'

const MOCK_REVIEWS = [
  { user: 'Ana R.', stars: 5, text: 'Llegó fresquísimo, el sabor del campo se nota.' },
  { user: 'Pedro M.', stars: 5, text: 'Excelente trazabilidad y buen precio.' },
  { user: 'Lucía F.', stars: 4, text: 'Muy buena calidad; repetiré seguro.' },
  { user: 'Andrés V.', stars: 5, text: 'Apoyo directo al campesino, me encanta.' },
]

export default function ProductDetail() {
  const { id } = useParams()
  const { getProductById, addToCart } = useApp()
  const product = getProductById(Number(id))
  const [qty, setQty] = useState(1)

  if (!product || product.activo === false) {
    return (
      <p className="text-center text-eco-gray">
        Producto no encontrado.{' '}
        <Link to="/comprador" className="text-eco-primary underline">
          Volver al catálogo
        </Link>
      </p>
    )
  }

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <div className="flex aspect-square items-center justify-center rounded-3xl bg-gradient-to-br from-eco-pale to-eco-cream text-[8rem] shadow-inner">
        {product.imagen}
      </div>
      <div>
        <h1 className="text-2xl font-bold text-eco-dark md:text-3xl">
          {product.nombre}
        </h1>
        <p className="mt-4 text-eco-gray">{product.descripcion}</p>

        <div className="mt-6 rounded-2xl border border-eco-pale bg-white p-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-eco-mid">
            Trazabilidad
          </h2>
          <ul className="mt-2 space-y-2 text-sm">
            <li className="flex gap-2">
              <Sprout className="h-4 w-4 shrink-0 text-eco-primary" />
              <span>
                <strong>Finca:</strong> {product.finca}
              </span>
            </li>
            <li className="flex gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-eco-primary" />
              <span>
                <strong>Origen:</strong> {product.origen}
              </span>
            </li>
            <li>
              <strong>Productor:</strong> Don Carlos Herrera
            </li>
          </ul>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <p className="text-3xl font-bold text-eco-primary">
            ${product.precio.toLocaleString('es-CO')}{' '}
            <span className="text-base font-normal text-eco-gray">
              COP / {product.unidad}
            </span>
          </p>
          <div className="flex items-center gap-2">
            <label htmlFor="qty" className="text-sm text-eco-gray">
              Cantidad
            </label>
            <input
              id="qty"
              type="number"
              min={1}
              max={99}
              value={qty}
              onChange={(e) =>
                setQty(Math.max(1, parseInt(e.target.value, 10) || 1))
              }
              className="w-20 rounded-lg border border-eco-pale px-2 py-1 text-center"
            />
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <StarRating value={product.calificacion} readOnly />
          <span className="text-sm text-eco-gray">
            {product.reseñas} reseñas
          </span>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => addToCart(product.id, qty)}
            className="rounded-xl bg-eco-primary px-6 py-3 font-semibold text-white hover:bg-eco-mid"
          >
            Agregar al carrito
          </button>
          <Link
            to="/comprador#productores"
            className="rounded-xl border border-eco-primary px-6 py-3 font-semibold text-eco-primary hover:bg-eco-pale/50"
          >
            Ver perfil del productor
          </Link>
        </div>

        <section className="mt-12 border-t border-eco-pale pt-8">
          <h2 className="text-lg font-bold text-eco-dark">Reseñas</h2>
          <ul className="mt-4 space-y-4">
            {MOCK_REVIEWS.map((r, i) => (
              <li
                key={i}
                className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-eco-pale/80"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium">{r.user}</span>
                  <StarRating value={r.stars} readOnly size="sm" />
                </div>
                <p className="mt-2 text-sm text-eco-gray">{r.text}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
