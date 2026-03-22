import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import StarRating from './StarRating.jsx'

export default function ProductCard({ product, onAdd }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-eco-pale/80 bg-white shadow-sm transition hover:shadow-md">
      <div className="flex aspect-square items-center justify-center bg-gradient-to-br from-eco-pale/60 to-eco-cream text-7xl">
        {product.imagen}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-semibold text-eco-dark line-clamp-2">{product.nombre}</h3>
        <p className="mt-1 text-xs text-eco-gray">{product.finca}</p>
        <div className="mt-2 flex items-center gap-2">
          <StarRating value={product.calificacion} readOnly size="sm" />
          <span className="text-xs text-eco-gray">({product.reseñas})</span>
        </div>
        <div className="mt-auto flex items-center justify-between pt-4">
          <p className="text-lg font-bold text-eco-primary">
            ${product.precio.toLocaleString('es-CO')} COP
            <span className="ml-1 text-xs font-normal text-eco-gray">
              / {product.unidad}
            </span>
          </p>
        </div>
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={() => onAdd(product.id)}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-eco-primary px-3 py-2 text-sm font-medium text-white hover:bg-eco-mid"
          >
            <ShoppingCart className="h-4 w-4" />
            Agregar
          </button>
          <Link
            to={`/comprador/producto/${product.id}`}
            className="rounded-xl border border-eco-primary px-3 py-2 text-sm font-medium text-eco-primary hover:bg-eco-pale/50"
          >
            Ver
          </Link>
        </div>
      </div>
    </article>
  )
}
