import { useLocation } from 'react-router-dom'
import { Button } from '../ui'

const TITLES: Record<string, { title: string; sub: string }> = {
  overview:     { title: 'Dashboard',         sub: '2025–2026 Cycle · Live'           },
  applications: { title: 'Applications',      sub: '2025–2026 Cycle · 312 pending'    },
  graduates:    { title: 'Admitted Students', sub: '487 admitted · 341 enrolled'      },
  analytics:    { title: 'Analytics',         sub: 'Cycle-over-cycle insights'        },
  fairness:     { title: 'Fairness & Audit',  sub: '3 flags · Last audit: today'      },
  completeness: { title: 'Data Completeness', sub: '98.2% average completeness'       },
  requirements: { title: 'Requirements',      sub: 'AUI admission criteria'           },
  flow:         { title: 'Process Flow',      sub: 'AI + human decision workflow'     },
  students:     { title: 'Student Search',    sub: 'Advanced record lookup'           },
  courses:      { title: 'Course Seats',      sub: '23 courses · 1 critical'         },
  grades:       { title: 'Grades',            sub: 'University-wide distribution'     },
  features:     { title: 'Feature Backlog',   sub: '12 features · Phases 1–3'        },
}

interface TopbarProps {
  onMenuClick?: () => void
}

export default function Topbar({ onMenuClick }: TopbarProps) {
  const { pathname } = useLocation()
  const key = pathname.replace('/', '') || 'overview'
  const meta = TITLES[key] ?? { title: 'AUI Students', sub: '' }

  return (
    <header className="h-14 bg-white border-b border-g-200 flex items-center px-6 gap-3 flex-shrink-0 sticky top-0 z-20">
      {/* Mobile hamburger */}
      <button
        onClick={onMenuClick}
        className="md:hidden w-8 h-8 flex items-center justify-center bg-g-100 rounded-lg border-none cursor-pointer"
        aria-label="Open menu"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="3" y1="6"  x2="21" y2="6"/>
          <line x1="3" y1="12" x2="21" y2="12"/>
          <line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
      </button>

      <span className="text-base font-extrabold text-g-900">{meta.title}</span>
      <div className="w-px h-5 bg-g-200"/>
      <span className="font-mono text-[10px] text-g-400">{meta.sub}</span>

      <div className="ml-auto flex items-center gap-2">
        <Button variant="white" size="sm">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
          Refresh
        </Button>
        <Button variant="primary" size="sm">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
          </svg>
          Export CSV
        </Button>
        {/* Notification bell */}
        <button aria-label="Notifications" className="relative w-[34px] h-[34px] flex items-center justify-center bg-g-100 rounded-lg border-none cursor-pointer text-g-500 hover:bg-g-200 transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
          </svg>
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red rounded-full border-2 border-white"/>
        </button>
      </div>
    </header>
  )
}
