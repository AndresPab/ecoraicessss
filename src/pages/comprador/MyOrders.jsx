import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useApp } from '../../context/AppContext.jsx'
import OrderCard from '../../components/OrderCard.jsx'
import StatusBadge, { orderProgressSteps } from '../../components/StatusBadge.jsx'
import StarRating from '../../components/StarRating.jsx'
import Modal from '../../components/Modal.jsx'

export default function MyOrders() {
  const { orderId } = useParams()
  const { buyerOrders, rateOrderAsBuyer } = useApp()
  const [selected, setSelected] = useState(null)
  const [rateModal, setRateModal] = useState(null)
  const [stars, setStars] = useState(5)
  const [comment, setComment] = useState('')

  const openDetail = (o) => {
    setSelected(o)
  }

  const closeDetail = () => {
    setSelected(null)
  }

  if (orderId) {
    const o = buyerOrders.find((x) => x.id === orderId)
    if (!o) {
      return (
        <p>
          Pedido no encontrado.{' '}
          <Link to="/comprador/pedidos" className="text-eco-primary underline">
            Volver
          </Link>
        </p>
      )
    }
    return (
      <>
        <OrderDetailView
          order={o}
          onRate={() => setRateModal(o)}
          onBack={
            <Link to="/comprador/pedidos" className="text-eco-primary hover:underline">
              ← Volver a mis pedidos
            </Link>
          }
        />
        <RateOrderModal
          rateModal={rateModal}
          onClose={() => setRateModal(null)}
          stars={stars}
          setStars={setStars}
          comment={comment}
          setComment={setComment}
          rateOrderAsBuyer={rateOrderAsBuyer}
        />
      </>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-eco-dark">Mis pedidos</h1>
      <ul className="mt-6 space-y-4">
        {buyerOrders.length === 0 && (
          <li className="rounded-2xl border border-dashed border-eco-pale bg-white p-8 text-center text-eco-gray">
            Aún no tienes pedidos.
          </li>
        )}
        {buyerOrders.map((o) => (
          <li key={o.id}>
            <OrderCard
              order={o}
              onClick={() => openDetail(o)}
            />
            <div className="mt-2 text-right">
              <Link
                to={`/comprador/pedidos/${o.id}`}
                className="text-sm font-medium text-eco-primary hover:underline"
              >
                Ver detalle
              </Link>
            </div>
          </li>
        ))}
      </ul>

      <Modal
        open={!!selected && !orderId}
        onClose={closeDetail}
        title={selected ? `Pedido ${selected.id}` : ''}
        size="lg"
      >
        {selected && (
          <OrderDetailBody
            order={selected}
            onRate={() => {
              setRateModal(selected)
              closeDetail()
            }}
          />
        )}
      </Modal>

      <RateOrderModal
        rateModal={rateModal}
        onClose={() => setRateModal(null)}
        stars={stars}
        setStars={setStars}
        comment={comment}
        setComment={setComment}
        rateOrderAsBuyer={rateOrderAsBuyer}
      />
    </div>
  )
}

function RateOrderModal({
  rateModal,
  onClose,
  stars,
  setStars,
  comment,
  setComment,
  rateOrderAsBuyer,
}) {
  return (
    <Modal open={!!rateModal} onClose={onClose} title="Calificar pedido">
      {rateModal && (
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault()
            rateOrderAsBuyer(rateModal.id, stars, comment)
            onClose()
            setComment('')
          }}
        >
          <StarRating value={stars} onChange={setStars} label="Tu calificación" />
          <div>
            <label className="text-sm font-medium">Comentario</label>
            <textarea
              className="mt-1 w-full rounded-xl border border-eco-pale px-3 py-2 text-sm"
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="¿Cómo fue tu experiencia?"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-xl bg-eco-primary py-2 font-semibold text-white"
          >
            Enviar calificación
          </button>
        </form>
      )}
    </Modal>
  )
}

function OrderDetailView({ order, onRate, onBack }) {
  return (
    <div>
      <div className="mb-4">{onBack}</div>
      <OrderDetailBody order={order} onRate={onRate} />
    </div>
  )
}

function OrderDetailBody({ order, onRate }) {
  const steps = orderProgressSteps(order.estado)
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-mono text-xl font-bold text-eco-primary">{order.id}</h2>
        <StatusBadge estado={order.estado} />
      </div>

      <div>
        <p className="text-sm font-medium text-eco-gray">Progreso</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {steps.map((s) => (
            <div
              key={s.key}
              className={`flex flex-1 min-w-[100px] flex-col items-center rounded-lg px-2 py-2 text-center text-xs ${
                s.done
                  ? 'bg-eco-pale text-eco-dark'
                  : 'bg-eco-cream text-eco-gray'
              }`}
            >
              <span className="font-medium">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm text-eco-gray">Productos</p>
        <ul className="mt-1 list-inside list-disc text-sm">
          {order.productos.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      </div>
      <div className="flex flex-wrap gap-6 text-sm">
        <div>
          <p className="text-eco-gray">Total</p>
          <p className="font-semibold">${order.total.toLocaleString('es-CO')} COP</p>
        </div>
        <div>
          <p className="text-eco-gray">Fecha</p>
          <p>{order.fecha}</p>
        </div>
        <div>
          <p className="text-eco-gray">Dirección</p>
          <p>{order.direccion}</p>
        </div>
      </div>

      {order.estado === 'entregado' && (
        <div className="rounded-xl border border-eco-pale bg-eco-cream/50 p-4">
          {order.compradorRating ? (
            <div>
              <p className="text-sm font-medium">Tu calificación</p>
              <StarRating value={order.compradorRating.stars} readOnly />
              <p className="mt-2 text-sm text-eco-gray">
                {order.compradorRating.comment}
              </p>
            </div>
          ) : (
            <button
              type="button"
              onClick={onRate}
              className="rounded-xl bg-eco-primary px-4 py-2 text-sm font-semibold text-white"
            >
              Calificar pedido
            </button>
          )}
        </div>
      )}
    </div>
  )
}
