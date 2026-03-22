import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import WhatsAppFab from './WhatsAppFab.jsx'

export default function RoleLayout({ role }) {
  const { user } = useApp()
  const location = useLocation()

  if (!user) {
    return <Navigate to="/" replace state={{ from: location }} />
  }
  if (user.role !== role) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  )
}
