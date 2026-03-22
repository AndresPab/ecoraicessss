import { Routes, Route, Navigate } from 'react-router-dom'
import './index.css'

import LoginSelector from './pages/LoginSelector.jsx'
import RoleLayout from './components/RoleLayout.jsx'
import ToastHost from './components/ToastHost.jsx'

import Home from './pages/comprador/Home.jsx'
import ProductDetail from './pages/comprador/ProductDetail.jsx'
import Cart from './pages/comprador/Cart.jsx'
import MyOrders from './pages/comprador/MyOrders.jsx'
import BuyerProfile from './pages/comprador/BuyerProfile.jsx'

import Dashboard from './pages/productor/Dashboard.jsx'
import MyProducts from './pages/productor/MyProducts.jsx'
import OrderManagement from './pages/productor/OrderManagement.jsx'
import ProducerProfile from './pages/productor/ProducerProfile.jsx'

import DriverPanel from './pages/repartidor/DriverPanel.jsx'
import DeliveryHistory from './pages/repartidor/DeliveryHistory.jsx'
import DriverProfile from './pages/repartidor/DriverProfile.jsx'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginSelector />} />
      <Route path="/comprador" element={<RoleLayout role="comprador" />}>
        <Route index element={<Home />} />
        <Route path="producto/:id" element={<ProductDetail />} />
        <Route path="carrito" element={<Cart />} />
        <Route path="pedidos" element={<MyOrders />} />
        <Route path="pedidos/:orderId" element={<MyOrders />} />
        <Route path="cuenta" element={<BuyerProfile />} />
      </Route>
      <Route path="/productor" element={<RoleLayout role="productor" />}>
        <Route index element={<Dashboard />} />
        <Route path="productos" element={<MyProducts />} />
        <Route path="pedidos" element={<OrderManagement />} />
        <Route path="cuenta" element={<ProducerProfile />} />
      </Route>
      <Route path="/repartidor" element={<RoleLayout role="repartidor" />}>
        <Route index element={<DriverPanel />} />
        <Route path="historial" element={<DeliveryHistory />} />
        <Route path="cuenta" element={<DriverProfile />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

function App() {
  return (
    <>
      <AppRoutes />
      <ToastHost />
    </>
  )
}

export default App
