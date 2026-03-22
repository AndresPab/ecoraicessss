const config = {
  pendiente: {
    label: 'Pendiente',
    className: 'bg-amber-100 text-amber-900 border-amber-200',
    emoji: '🟡',
  },
  en_preparacion: {
    label: 'En preparación',
    className: 'bg-sky-100 text-sky-900 border-sky-200',
    emoji: '🔵',
  },
  listo_para_envio: {
    label: 'Listo para envío',
    className: 'bg-orange-100 text-orange-900 border-orange-200',
    emoji: '🟠',
  },
  en_camino: {
    label: 'En camino',
    className: 'bg-emerald-100 text-emerald-900 border-emerald-200',
    emoji: '🟢',
  },
  entregado: {
    label: 'Entregado',
    className: 'bg-eco-pale text-eco-dark border-eco-light',
    emoji: '✅',
  },
}

export default function StatusBadge({ estado, showEmoji = true }) {
  const c = config[estado] || config.pendiente
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium ${c.className}`}
    >
      {showEmoji && <span aria-hidden>{c.emoji}</span>}
      {c.label}
    </span>
  )
}

export function orderProgressSteps(estado) {
  const order = [
    'pendiente',
    'en_preparacion',
    'listo_para_envio',
    'en_camino',
    'entregado',
  ]
  const idx = order.indexOf(estado)
  return order.map((key, i) => ({
    key,
    done: i <= idx,
    current: i === idx,
    label: config[key]?.label || key,
  }))
}
