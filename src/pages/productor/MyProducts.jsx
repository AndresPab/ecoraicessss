import { useState } from 'react'
import { Pencil } from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'
import Modal from '../../components/Modal.jsx'

const CATS = [
  { id: 'canasta', label: 'Canastas' },
  { id: 'frutas', label: 'Frutas' },
  { id: 'verduras', label: 'Verduras' },
  { id: 'tuberculos', label: 'Tubérculos' },
  { id: 'aromaticas', label: 'Aromáticas' },
]

const emptyForm = {
  nombre: '',
  categoria: 'frutas',
  descripcion: '',
  precio: '',
  unidad: 'kg',
  stock: '',
}

export default function MyProducts() {
  const { products, updateProduct, toggleProductActive, addProduct } = useApp()
  const [edit, setEdit] = useState(null)
  const [createOpen, setCreateOpen] = useState(false)
  const [form, setForm] = useState(emptyForm)

  const mine = products.filter((p) => p.productor_id === 2)

  const startEdit = (p) => {
    setEdit(p)
  }

  const saveEdit = (e) => {
    e.preventDefault()
    const fd = new FormData(e.target)
    updateProduct(edit.id, {
      nombre: fd.get('nombre'),
      precio: Number(fd.get('precio')),
      descripcion: fd.get('descripcion'),
      stock: Number(fd.get('stock')),
    })
    setEdit(null)
  }

  const saveNew = (e) => {
    e.preventDefault()
    addProduct({
      nombre: form.nombre,
      categoria: form.categoria,
      descripcion: form.descripcion,
      precio: Number(form.precio),
      unidad: form.unidad,
      stock: Number(form.stock),
      imagen: '🌾',
    })
    setCreateOpen(false)
    setForm(emptyForm)
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-eco-dark">Mis productos</h1>
        <button
          type="button"
          onClick={() => setCreateOpen(true)}
          className="rounded-xl bg-eco-primary px-4 py-2 text-sm font-semibold text-white hover:bg-eco-mid"
        >
          + Nuevo producto
        </button>
      </div>

      <ul className="mt-8 space-y-4">
        {mine.map((p) => (
          <li
            key={p.id}
            className="flex flex-wrap items-center gap-4 rounded-2xl border border-eco-pale bg-white p-4 shadow-sm"
          >
            <span className="text-5xl">{p.imagen}</span>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-eco-dark">{p.nombre}</p>
              <p className="text-sm text-eco-gray">
                ${p.precio.toLocaleString('es-CO')} · Stock: {p.stock}
              </p>
              <span
                className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                  p.activo !== false
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {p.activo !== false ? 'Activo' : 'Inactivo'}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => startEdit(p)}
                className="inline-flex items-center gap-1 rounded-xl border border-eco-pale px-3 py-2 text-sm font-medium hover:bg-eco-cream"
              >
                <Pencil className="h-4 w-4" />
                Editar
              </button>
              <button
                type="button"
                onClick={() => toggleProductActive(p.id)}
                className="rounded-xl border border-eco-pale px-3 py-2 text-sm font-medium hover:bg-eco-cream"
              >
                {p.activo !== false ? 'Desactivar' : 'Activar'}
              </button>
            </div>
          </li>
        ))}
      </ul>

      <Modal
        open={!!edit}
        onClose={() => setEdit(null)}
        title="Editar producto"
        size="lg"
      >
        {edit && (
          <form className="space-y-3" onSubmit={saveEdit}>
            <Field name="nombre" label="Nombre" defaultValue={edit.nombre} />
            <Field
              name="precio"
              label="Precio (COP)"
              type="number"
              defaultValue={edit.precio}
            />
            <div>
              <label className="text-sm font-medium">Descripción</label>
              <textarea
                name="descripcion"
                className="mt-1 w-full rounded-xl border border-eco-pale px-3 py-2 text-sm"
                rows={3}
                defaultValue={edit.descripcion}
              />
            </div>
            <Field
              name="stock"
              label="Stock"
              type="number"
              defaultValue={edit.stock}
            />
            <button
              type="submit"
              className="w-full rounded-xl bg-eco-primary py-2 font-semibold text-white"
            >
              Guardar
            </button>
          </form>
        )}
      </Modal>

      <Modal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Nuevo producto"
        size="lg"
      >
        <form className="space-y-3" onSubmit={saveNew}>
          <div>
            <label className="text-sm font-medium">Nombre</label>
            <input
              required
              className="mt-1 w-full rounded-xl border border-eco-pale px-3 py-2 text-sm"
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Categoría</label>
            <select
              className="mt-1 w-full rounded-xl border border-eco-pale px-3 py-2 text-sm"
              value={form.categoria}
              onChange={(e) => setForm({ ...form, categoria: e.target.value })}
            >
              {CATS.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">Descripción</label>
            <textarea
              required
              className="mt-1 w-full rounded-xl border border-eco-pale px-3 py-2 text-sm"
              rows={3}
              value={form.descripcion}
              onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium">Precio</label>
              <input
                required
                type="number"
                className="mt-1 w-full rounded-xl border border-eco-pale px-3 py-2 text-sm"
                value={form.precio}
                onChange={(e) => setForm({ ...form, precio: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Unidad</label>
              <input
                className="mt-1 w-full rounded-xl border border-eco-pale px-3 py-2 text-sm"
                value={form.unidad}
                onChange={(e) => setForm({ ...form, unidad: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Stock</label>
            <input
              required
              type="number"
              className="mt-1 w-full rounded-xl border border-eco-pale px-3 py-2 text-sm"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-xl bg-eco-primary py-2 font-semibold text-white"
          >
            Publicar
          </button>
        </form>
      </Modal>
    </div>
  )
}

function Field({ name, label, type = 'text', defaultValue }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input
        name={name}
        type={type}
        required
        defaultValue={defaultValue}
        className="mt-1 w-full rounded-xl border border-eco-pale px-3 py-2 text-sm"
      />
    </div>
  )
}
