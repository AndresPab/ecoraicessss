import { Star } from 'lucide-react'

export default function StarRating({
  value = 0,
  onChange,
  size = 'md',
  readOnly = false,
  label,
}) {
  const max = 5
  const s = size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-8 w-8' : 'h-5 w-5'
  const interactive = !readOnly && typeof onChange === 'function'

  return (
    <div
      className="flex items-center gap-1"
      role={interactive ? 'radiogroup' : undefined}
      aria-label={label || 'Calificación'}
    >
      {Array.from({ length: max }, (_, i) => {
        const filled = i < Math.round(value)
        return (
          <button
            key={i}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && onChange(i + 1)}
            className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
          >
            <Star
              className={`${s} ${filled ? 'fill-eco-gold text-eco-gold' : 'text-eco-pale'}`}
              strokeWidth={1.5}
            />
          </button>
        )
      })}
      {!interactive && (
        <span className="ml-1 text-sm text-eco-gray">{value.toFixed(1)}</span>
      )}
    </div>
  )
}
