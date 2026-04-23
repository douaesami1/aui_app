import { useLocation, useNavigate } from 'react-router-dom'
import type { Screen } from '../../types'

interface SidebarProps {
  slim: boolean
  onToggle: () => void
}

const NAV_SECTIONS = [
  {
    label: 'Overview',
    items: [
      { id: 'overview'     as Screen, label: 'Dashboard',       icon: '⊞' },
      { id: 'applications' as Screen, label: 'Applications',    icon: '◧', pill: { count: 312, color: 'amber' as const } },
      { id: 'graduates'    as Screen, label: 'Admitted Students',icon: '✦', pill: { count: 487, color: 'green' as const } },
    ],
  },
  {
    label: 'Analysis',
    items: [
      { id: 'analytics'    as Screen, label: 'Analytics',       icon: '◈' },
      { id: 'fairness'     as Screen, label: 'Fairness & Audit',icon: '◉', pill: { count: 3, color: 'amber' as const } },
      { id: 'completeness' as Screen, label: 'Data Completeness',icon: '◎' },
    ],
  },
  {
    label: 'University',
    items: [
   
      { id: 'students'     as Screen, label: 'Student Search',  icon: '○' },
      { id: 'courses'      as Screen, label: 'Course Seats',    icon: '▤', pill: { count: 1, color: 'red' as const } },
      { id: 'grades'       as Screen, label: 'Grades',          icon: '◑' },
      
    ],
  },
  {
    label: 'Documentation',
    items: [
      { id: 'requirements' as Screen, label: 'Requirements',    icon: '◫' },
      { id: 'flow'         as Screen, label: 'Process Flow',    icon: '⇢' },
      
    ],
  },
]

const pillColors = {
  green: 'bg-green-faint text-green-dark',
  amber: 'bg-amber-light text-amber',
  red:   'bg-red-light text-red',
}

export default function Sidebar({ slim, onToggle }: SidebarProps) {
  const navigate  = useNavigate()
  const { pathname } = useLocation()
  const current = pathname.replace('/', '') || 'overview'

  return (
    <aside
      className={`bg-white border-r border-g-200 flex flex-col transition-all duration-200 overflow-hidden flex-shrink-0
        ${slim ? 'w-[60px] min-w-[60px]' : 'w-[248px] min-w-[248px]'}`}
    >
      {/* Header */}
      <div className={`border-b border-g-100 flex items-center gap-2.5 p-4 ${slim ? 'justify-center' : ''}`}>
        <div className="w-[34px] h-[34px] min-w-[34px] bg-green rounded-[9px] flex items-center justify-center
          text-white font-extrabold text-xs tracking-tight">
          AUI
        </div>
        {!slim && (
          <div className="min-w-0 flex-1">
            <div className="text-base font-extrabold text-g-900 truncate">AUI Students</div>
            <div className="font-mono text-[9px] text-g-400 tracking-[1.5px] uppercase mt-0.5 truncate">2025 - 2026</div>
          </div>
        )}
        <button
          onClick={onToggle}
          className={`w-[26px] h-[26px] min-w-[26px] bg-g-100 border-none rounded-lg cursor-pointer
            flex items-center justify-center text-g-500 hover:bg-g-200 transition-colors
            ${slim ? '' : 'ml-auto'}`}
          title={slim ? "Expand sidebar" : "Collapse sidebar"}
          aria-label={slim ? "Expand sidebar" : "Collapse sidebar"}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            {slim
              ? <path d="M13 5l7 7-7 7M6 5l7 7-7 7"/>
              : <path d="M11 19l-7-7 7-7M18 19l-7-7 7-7"/>
            }
          </svg>
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-2.5 pt-2.5">
        {NAV_SECTIONS.map(section => (
          <div key={section.label}>
            {!slim && (
              <div className="font-mono text-[9px] text-g-400 tracking-[1.5px] uppercase px-2 py-1.5 mt-1 truncate">
                {section.label}
              </div>
            )}
            {section.items.map(item => {
              const active = current === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => navigate(`/${item.id}`)}
                  className={`flex items-center gap-2 w-full rounded-card border-none cursor-pointer
                    text-sm font-semibold transition-all mb-0.5 overflow-hidden
                    ${slim ? 'justify-center p-2.5' : 'px-2.5 py-2'}
                    ${active
                      ? 'bg-green-faint text-green-dark'
                      : 'bg-transparent text-g-600 hover:bg-g-100 hover:text-g-900'
                    }`}
                >
                  <span className="text-[15px] w-[18px] text-center flex-shrink-0">{item.icon}</span>
                  {!slim && (
                    <>
                      <span className="flex-1 text-left truncate">{item.label}</span>
                      {item.pill && (
                        <span className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0
                          ${pillColors[item.pill.color]}`}>
                          {item.pill.count}
                        </span>
                      )}
                    </>
                  )}
                </button>
              )
            })}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-g-100">
        <div className={`flex items-center gap-2 p-2 rounded-card cursor-pointer hover:bg-g-100 transition-colors
          ${slim ? 'justify-center' : ''}`}>
          <div className="w-[30px] h-[30px] min-w-[30px] rounded-lg bg-gradient-to-br from-green to-[#059669]
            flex items-center justify-center text-white font-bold text-xs">
            AB
          </div>
          {!slim && (
            <>
              <div className="min-w-0">
                <div className="text-xs font-bold text-g-900 truncate">A. Benali</div>
                <div className="text-xs text-g-400 truncate">Admissions Officer</div>
              </div>
              <div className="w-1.5 h-1.5 bg-green rounded-full ml-auto flex-shrink-0"/>
            </>
          )}
        </div>
      </div>
    </aside>
  )
}
