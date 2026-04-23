import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Topbar  from './Topbar'

export default function AppShell() {
  const [slim,        setSlim]        = useState(false)
  const [mobileOpen,  setMobileOpen]  = useState(false)

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar — hidden on mobile unless drawer open */}
      <div className={`
        fixed inset-y-0 left-0 z-40 md:relative md:z-auto md:flex
        transition-transform duration-200
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <Sidebar
          slim={slim}
          onToggle={() => { setSlim(s => !s); setMobileOpen(false) }}
        />
      </div>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar onMenuClick={() => setMobileOpen(o => !o)} />
        <main className="flex-1 overflow-y-auto p-5 md:p-7">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
