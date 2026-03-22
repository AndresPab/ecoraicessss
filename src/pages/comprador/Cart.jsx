import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Trash2 } from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'
import Modal from '../../components/Modal.jsx'

const PAY = [
  { id: 'nequi', label: 'Nequi' },
  { id: 'daviplata', label: 'Daviplata' },
  { id: 'pse', label: 'PSE' },
  { id: 'efectivo', label: 'Efectivo contra entrega' },
]

export default function Cart() {
  const {
    cart,
    products,
    user,
    updateCartQty,
    removeFromCart,
    confirmOrder,
  } = useApp()
  const [direccion, setDireccion] = useState(
    user?.location ? `Calle principal, ${user.location}` : '',
  )
  const [pago, setPago] = useState('nequi')
  const [modal, setModal] = useState(null)

  const lines = cart
    .map((item) => {
      const p = products.find((x) => x.id === item.productId)
      if (!p) return null
      return { ...item, product: p, sub: p.precio * item.quantity }
    })
    .filter(Boolean)

  const subtotal = lines.reduce((s, l) => s + l.sub, 0)
  const descuento =
    user?.suscripcion === true ? Math.round(subtotal * 0.1) : 0
  const total = subtotal - descuento

  const handleConfirm = () => {
    if (!direccion.trim()) {
      alert('Ingresa una dirección de entrega.')
      return
    }
    const order = confirmOrder({ direccion: direccion.trim(), metodoPago: pago })
    if (order) setModal(order)
  }

  if (!lines.length) {
    return (
      <div className="rounded-2xl border border-dashed border-eco-pale bg-white p-12 text-center">
        <p className="text-eco-gray">Tu carrito está vacío.</p>
        <Link
          to="/comprador"
          className="mt-4 inline-block font-semibold text-eco-primary hover:underline"
        >
          Ir al catálogo
        </Link>
      </div>
    )
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <h1 className="text-2xl font-bold text-eco-dark">Carrito</h1>
        <ul className="mt-6 space-y-4">
          {lines.map((l) => (
            <li
              key={l.productId}
              className="flex flex-wrap items-center gap-4 rounded-2xl border border-eco-pale bg-white p-4 shadow-sm"
            >
              <span className="text-4xl">{l.product.imagen}</span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-eco-dark">{l.product.nombre}</p>
                <p className="text-sm text-eco-gray">
                  ${l.product.precio.toLocaleString('es-CO')} / {l.product.unidad}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <label className="sr-only" htmlFor={`q-${l.productId}`}>
                  Cantidad
                </label>
                <input
                  id={`q-${l.productId}`}
                  type="number"
                  min={1}
                  className="w-16 rounded-lg border border-eco-pale px-2 py-1 text-center"
                  value={l.quantity}
                  onChange={(e) =>
                    updateCartQty(
                      l.productId,
                      Math.max(1, parseInt(e.target.value, 10) || 1),
                    )
                  }
                />
              </div>
              <p className="font-semibold">
                ${l.sub.toLocaleString('es-CO')}
              </p>
              <button
                type="button"
                onClick={() => removeFromCart(l.productId)}
                className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                aria-label="Quitar del carrito"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="h-fit rounded-2xl border border-eco-pale bg-white p-6 shadow-sm">
        <h2 className="font-bold text-eco-dark">Resumen</h2>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <dt>Subtotal</dt>
            <dd>${subtotal.toLocaleString('es-CO')}</dd>
          </div>
          {descuento > 0 && (
            <div className="flex justify-between text-eco-mid">
              <dt>Descuento suscripción (10%)</dt>
              <dd>- ${descuento.toLocaleString('es-CO')}</dd>
            </div>
          )}
          <div className="flex justify-between text-eco-gray">
            <dt>Comisión plataforma</dt>
            <dd>0% — incluida en el precio</dd>
          </div>
          <div className="flex justify-between border-t border-eco-pale pt-2 text-lg font-bold">
            <dt>Total</dt>
            <dd>${total.toLocaleString('es-CO')} COP</dd>
          </div>
        </dl>

        <div className="mt-6">
          <label className="text-sm font-medium text-eco-dark">
            Dirección de entrega
          </label>
          <textarea
            className="mt-1 w-full rounded-xl border border-eco-pale px-3 py-2 text-sm"
            rows={3}
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            placeholder="Barrio, calle, referencias..."
          />
        </div>

        <div className="mt-4">
          <p className="text-sm font-medium text-eco-dark">Método de pago</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {PAY.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setPago(m.id)}
                className={`rounded-xl border px-3 py-2 text-sm font-medium ${
                  pago === m.id
                    ? 'border-eco-primary bg-eco-pale'
                    : 'border-eco-pale hover:bg-eco-cream'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={handleConfirm}
          className="mt-6 w-full rounded-xl bg-eco-primary py-3 font-semibold text-white hover:bg-eco-mid"
        >
          Confirmar pedido
        </button>
      </div>

      <Modal
        open={!!modal}
        onClose={() => setModal(null)}
        title="Pedido confirmado"
      >
        {modal && (
          <div className="space-y-3 text-sm">
            <p>
              Tu pedido <strong className="font-mono">{modal.id}</strong> fue
              registrado en estado <strong>pendiente</strong>.
            </p>
            <p className="text-eco-gray">
              Pago simulado ({PAY.find((x) => x.id === modal.metodoPago)?.label}
              ). El productor verá tu solicitud en su panel.
            </p>
            <Link
              to="/comprador/pedidos"
              onClick={() => setModal(null)}
              className="mt-4 inline-block font-semibold text-eco-primary hover:underline"
            >
              Ver mis pedidos
            </Link>
          </div>
        )}
      </Modal>
    </div>
  )
}
