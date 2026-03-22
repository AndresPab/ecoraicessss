import { useApp } from '../context/AppContext.jsx'

export default function ToastHost() {
  const { toasts } = useApp()
  if (!toasts.length) return null
  return (
    <div
      className="pointer-events-none fixed bottom-24 right-4 z-[200] flex max-w-sm flex-col gap-2 sm:right-8"
      aria-live="polite"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          className="pointer-events-auto rounded-xl border border-eco-pale bg-white px-4 py-3 text-sm font-medium text-eco-dark shadow-lg"
        >
          {t.message}
        </div>
      ))}
    </div>
  )
}
