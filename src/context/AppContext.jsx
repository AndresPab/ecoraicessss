import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  mockOrders,
  mockProducts,
  mockUsers,
  PLATFORM_COMMISSION_RATE,
} from '../data/mockData.js'

const LS_KEYS = {
  userId: 'ecoraices_userId',
  orders: 'ecoraices_orders',
  products: 'ecoraices_products',
  cart: 'ecoraices_cart',
  producer: 'ecoraices_producer_profile',
}

const AppContext = createContext(null)

function loadJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

function saveJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

function nextOrderId(orders) {
  const nums = orders
    .map((o) => {
      const m = /^ECO-(\d+)$/.exec(o.id)
      return m ? parseInt(m[1], 10) : 0
    })
    .filter(Boolean)
  const max = nums.length ? Math.max(...nums) : 0
  return `ECO-${String(max + 1).padStart(3, '0')}`
}

export function AppProvider({ children }) {
  const [userId, setUserId] = useState(() =>
    loadJson(LS_KEYS.userId, null),
  )
  const [orders, setOrders] = useState(() =>
    loadJson(LS_KEYS.orders, mockOrders),
  )
  const [products, setProducts] = useState(() =>
    loadJson(LS_KEYS.products, mockProducts),
  )
  const [cart, setCart] = useState(() => loadJson(LS_KEYS.cart, []))
  const [producerOverride, setProducerOverride] = useState(() =>
    loadJson(LS_KEYS.producer, null),
  )
  const [toasts, setToasts] = useState([])

  useEffect(() => {
    saveJson(LS_KEYS.orders, orders)
  }, [orders])
  useEffect(() => {
    saveJson(LS_KEYS.products, products)
  }, [products])
  useEffect(() => {
    saveJson(LS_KEYS.cart, cart)
  }, [cart])
  useEffect(() => {
    if (userId === null) localStorage.removeItem(LS_KEYS.userId)
    else saveJson(LS_KEYS.userId, userId)
  }, [userId])
  useEffect(() => {
    if (producerOverride) saveJson(LS_KEYS.producer, producerOverride)
    else localStorage.removeItem(LS_KEYS.producer)
  }, [producerOverride])

  const user = useMemo(() => {
    if (userId == null) return null
    const base = mockUsers.find((u) => u.id === userId)
    if (!base) return null
    if (base.role === 'productor' && producerOverride) {
      return { ...base, ...producerOverride }
    }
    return base
  }, [userId, producerOverride])

  const toast = useCallback((message) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
    setToasts((t) => [...t, { id, message }])
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id))
    }, 3800)
  }, [])

  const login = useCallback(
    (role) => {
      const u = mockUsers.find((x) => x.role === role)
      if (u) {
        setUserId(u.id)
        toast(`Bienvenido/a como ${u.name}`)
      }
    },
    [toast],
  )

  const logout = useCallback(() => {
    setUserId(null)
    toast('Sesión cerrada')
  }, [toast])

  const addToCart = useCallback(
    (productId, qty = 1) => {
      setCart((c) => {
        const i = c.findIndex((x) => x.productId === productId)
        if (i >= 0) {
          const next = [...c]
          next[i] = {
            ...next[i],
            quantity: next[i].quantity + qty,
          }
          return next
        }
        return [...c, { productId, quantity: qty }]
      })
      toast('📦 Producto agregado al carrito')
    },
    [toast],
  )

  const updateCartQty = useCallback((productId, quantity) => {
    setCart((c) => {
      if (quantity <= 0) return c.filter((x) => x.productId !== productId)
      return c.map((x) =>
        x.productId === productId ? { ...x, quantity } : x,
      )
    })
  }, [])

  const removeFromCart = useCallback((productId) => {
    setCart((c) => c.filter((x) => x.productId !== productId))
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  const getProductById = useCallback(
    (id) => products.find((p) => p.id === id),
    [products],
  )

  const confirmOrder = useCallback(
    ({ direccion, metodoPago }) => {
      if (!user || user.role !== 'comprador') return null
      const lines = []
      let subtotal = 0
      for (const item of cart) {
        const p = products.find((x) => x.id === item.productId)
        if (!p) continue
        const lineTotal = p.precio * item.quantity
        subtotal += lineTotal
        lines.push(`${p.nombre} x${item.quantity}`)
      }
      const discount =
        user.suscripcion === true ? Math.round(subtotal * 0.1) : 0
      const total = subtotal - discount
      const id = nextOrderId(orders)
      const newOrder = {
        id,
        compradorId: user.id,
        comprador: user.name,
        productos: lines,
        total,
        estado: 'pendiente',
        fecha: new Date().toISOString().slice(0, 10),
        direccion,
        metodoPago,
        repartidorId: null,
        compradorRating: null,
      }
      setOrders((o) => [...o, newOrder])
      clearCart()
      toast(`✅ Pedido confirmado — ${id}`)
      return newOrder
    },
    [user, cart, products, orders, clearCart, toast],
  )

  const updateOrderStatus = useCallback(
    (orderId, nuevoEstado) => {
      setOrders((list) =>
        list.map((o) =>
          o.id === orderId ? { ...o, estado: nuevoEstado } : o,
        ),
      )
    },
    [],
  )

  const acceptOrderProducer = useCallback(
    (orderId) => {
      updateOrderStatus(orderId, 'en_preparacion')
      toast('Pedido aceptado — en preparación')
    },
    [updateOrderStatus, toast],
  )

  const markReadyForShipping = useCallback(
    (orderId) => {
      updateOrderStatus(orderId, 'listo_para_envio')
      toast('📦 Pedido listo para envío — notificado al repartidor')
    },
    [updateOrderStatus, toast],
  )

  const takeDelivery = useCallback(
    (orderId) => {
      if (!user || user.role !== 'repartidor') return
      setOrders((list) =>
        list.map((o) =>
          o.id === orderId
            ? { ...o, estado: 'en_camino', repartidorId: user.id }
            : o,
        ),
      )
      toast('🚴 Pedido tomado — en camino')
    },
    [user, toast],
  )

  const markDelivered = useCallback(
    (orderId) => {
      updateOrderStatus(orderId, 'entregado')
      toast('✅ Entrega completada')
    },
    [updateOrderStatus, toast],
  )

  const rateOrderAsBuyer = useCallback(
    (orderId, stars, comment) => {
      setOrders((list) =>
        list.map((o) =>
          o.id === orderId
            ? {
                ...o,
                compradorRating: { stars, comment, fecha: new Date().toISOString().slice(0, 10) },
              }
            : o,
        ),
      )
      toast('⭐ Gracias por tu calificación')
    },
    [toast],
  )

  const updateProduct = useCallback((id, patch) => {
    setProducts((list) =>
      list.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    )
    toast('Producto actualizado')
  }, [toast])

  const toggleProductActive = useCallback(
    (id) => {
      setProducts((list) =>
        list.map((p) =>
          p.id === id ? { ...p, activo: !p.activo } : p,
        ),
      )
      toast('Estado del producto actualizado')
    },
    [toast],
  )

  const addProduct = useCallback(
    (data) => {
      const maxId = Math.max(0, ...products.map((p) => p.id))
      const nuevo = {
        id: maxId + 1,
        productor_id: 2,
        activo: true,
        calificacion: 5,
        reseñas: 0,
        finca: 'Finca El Paraíso',
        origen: 'Fusagasugá',
        ...data,
      }
      setProducts((list) => [...list, nuevo])
      toast('✅ Producto publicado')
    },
    [products, toast],
  )

  const updateProducerProfile = useCallback((patch) => {
    setProducerOverride((prev) => ({ ...(prev || {}), ...patch }))
    toast('Perfil actualizado')
  }, [toast])

  const buyerOrders = useMemo(() => {
    if (!user || user.role !== 'comprador') return []
    return orders.filter((o) => o.compradorId === user.id)
  }, [user, orders])

  const producerMetrics = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10)
    const pedidosHoy = orders.filter((o) => o.fecha === today).length
    const ventasMes = orders
      .filter((o) => o.fecha?.startsWith('2026-03'))
      .reduce((s, o) => s + o.total, 0)
    const comisionMes = Math.round(ventasMes * PLATFORM_COMMISSION_RATE)
    const ingresosNetos = ventasMes - comisionMes
    const activos = products.filter((p) => p.activo !== false).length
    return {
      pedidosHoy,
      ventasMes,
      comisionMes,
      ingresosNetos,
      calificacion: mockUsers.find((u) => u.id === 2)?.calificacion ?? 4.8,
      productosActivos: activos,
    }
  }, [orders, products])

  const value = {
    user,
    userId,
    login,
    logout,
    orders,
    products,
    cart,
    addToCart,
    updateCartQty,
    removeFromCart,
    clearCart,
    confirmOrder,
    getProductById,
    buyerOrders,
    updateOrderStatus,
    acceptOrderProducer,
    markReadyForShipping,
    takeDelivery,
    markDelivered,
    rateOrderAsBuyer,
    updateProduct,
    toggleProductActive,
    addProduct,
    updateProducerProfile,
    producerMetrics,
    PLATFORM_COMMISSION_RATE,
    toasts,
    toast,
  }

  return (
    <AppContext.Provider value={value}>{children}</AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp debe usarse dentro de AppProvider')
  return ctx
}
