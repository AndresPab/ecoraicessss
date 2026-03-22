import { useState } from 'react'
import { LogOut, MapPin } from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'
import Modal from '../../components/Modal.jsx'
import StarRating from '../../components/StarRating.jsx'

export default function ProducerProfile() {
  const { user, logout, updateProducerProfile } = useApp()
  const [open, setOpen] = useState(false)

  if (!user || user.role !== 'productor') return null

  return (
    <div className="mx-auto max-w-xl">
      <div className="rounded-3xl border border-eco-pale bg-white p-8 shadow-sm">
        <div className="text-center">
          <span className="text-7xl" aria-hidden>
            {user.avatar}
          </span>
          <h1 className="mt-4 text-2xl font-bold text-eco-dark">{user.name}</h1>
          <p className="text-eco-mid">{user.finca}</p>
          <p className="mt-2 flex items-center justify-center gap-2 text-sm text-eco-gray">
            <MapPin className="h-4 w-4" />
            {user.ubicacion}
          </p>
        </div>

        <p className="mt-6 text-center text-sm text-eco-gray">{user.descripcion}</p>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {user.certificaciones?.map((c) => (
            <span
              key={c}
              className="rounded-full bg-eco-pale px-3 py-1 text-xs font-semibold text-eco-dark"
            >
              {c}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center gap-2">
          <p className="text-sm text-eco-gray">Calificación promedio</p>
          <StarRating value={user.calificacion} readOnly size="lg" />
          <div className="mt-2 h-2 w-full max-w-xs overflow-hidden rounded-full bg-eco-pale">
            <div
              className="h-full rounded-full bg-eco-primary"
              style={{ width: `${(user.calificacion / 5) * 100}%` }}
            />
          </div>
          <p className="mt-4 text-sm text-eco-gray">
            Ventas totales:{' '}
            <strong className="text-eco-dark">{user.ventas_totales}</strong>
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="rounded-xl bg-eco-primary px-5 py-2 font-semibold text-white"
          >
            Editar perfil
          </button>
          <button
            type="button"
            onClick={() => logout()}
            className="inline-flex items-center gap-2 rounded-xl border border-eco-pale px-5 py-2 font-semibold text-eco-dark hover:bg-red-50"
          >
            <LogOut className="h-4 w-4" />
            Cerrar sesión
          </button>
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Editar perfil" size="lg">
        <EditForm
          user={user}
          onSave={(patch) => {
            updateProducerProfile(patch)
            setOpen(false)
          }}
        />
      </Modal>
    </div>
  )
}

function EditForm({ user, onSave }) {
  const [finca, setFinca] = useState(user.finca)
  const [desc, setDesc] = useState(user.descripcion)
  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault()
        onSave({ finca, descripcion: desc })
      }}
    >
      <div>
        <label className="text-sm font-medium">Nombre de la finca</label>
        <input
          className="mt-1 w-full rounded-xl border border-eco-pale px-3 py-2 text-sm"
          value={finca}
          onChange={(e) => setFinca(e.target.value)}
        />
      </div>
      <div>
        <label className="text-sm font-medium">Descripción</label>
        <textarea
          className="mt-1 w-full rounded-xl border border-eco-pale px-3 py-2 text-sm"
          rows={4}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-xl bg-eco-primary py-2 font-semibold text-white"
      >
        Guardar cambios
      </button>
    </form>
  )
}
