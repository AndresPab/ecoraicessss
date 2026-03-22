import { X } from 'lucide-react'

export default function Modal({ open, onClose, title, children, size = 'md' }) {
  if (!open) return null
  const w =
    size === 'lg'
      ? 'max-w-lg'
      : size === 'xl'
        ? 'max-w-xl'
        : 'max-w-md'
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-eco-dark/50 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Cerrar"
      />
      <div
        className={`relative z-10 w-full ${w} max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-xl`}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2 id="modal-title" className="text-lg font-semibold text-eco-dark">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-eco-gray hover:bg-eco-pale"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
