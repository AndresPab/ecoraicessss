export default function WhatsAppFab() {
  return (
    <a
      href="#"
      onClick={(e) => e.preventDefault()}
      className="fixed bottom-6 right-4 z-[90] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-2xl text-white shadow-lg transition hover:scale-105 hover:shadow-xl sm:right-8"
      title="Soporte por WhatsApp (simulado)"
      aria-label="WhatsApp soporte"
    >
      <span aria-hidden>💬</span>
    </a>
  )
}
