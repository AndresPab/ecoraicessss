import StatusBadge from './StatusBadge.jsx'

export default function OrderCard({
  order,
  onClick,
  compact = false,
}) {
  const content = (
    <>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="font-mono font-semibold text-eco-primary">{order.id}</p>
          <p className="text-sm text-eco-gray">{order.comprador}</p>
        </div>
        <StatusBadge estado={order.estado} />
      </div>
      {!compact && (
        <ul className="mt-2 text-sm text-eco-dark">
          {order.productos.map((p, i) => (
            <li key={i}>• {p}</li>
          ))}
        </ul>
      )}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm">
        <span className="text-eco-gray">{order.fecha}</span>
        <span className="font-semibold">
          ${order.total.toLocaleString('es-CO')} COP
        </span>
      </div>
    </>
  )

  if (onClick) {
    return (
      <button
        type="button"
        onClick={() => onClick(order)}
        className="w-full rounded-2xl border border-eco-pale bg-white p-4 text-left shadow-sm transition hover:border-eco-light hover:shadow-md"
      >
        {content}
      </button>
    )
  }

  return (
    <div className="rounded-2xl border border-eco-pale bg-white p-4 shadow-sm">
      {content}
    </div>
  )
}
