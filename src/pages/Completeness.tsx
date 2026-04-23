import React, { useState, useMemo } from 'react'

// ── Types ─────────────────────────────────────────────────────────

type AcadYear = '2627' | '2526' | '2425'
type DivOption = 'UG' | 'GR' | 'LC' | 'AR'
type TermOption = 'FA' | 'SP' | 'SU'

interface FieldStat {
  icon: string
  label: string
  completePct: number
  missing: number
  status: 'Critical' | 'Poor' | 'Good' | 'Excellent'
  message: string
  messageType: 'red' | 'amber' | 'green'
}

// ── Mock data per filter combo ────────────────────────────────────

function computeStats(year: AcadYear, divs: DivOption[], term: TermOption): {
  total: number
  unique: number
  fields: FieldStat[]
} {
  const base = year === '2627' ? 3194 : year === '2526' ? 2890 : 2650
  const divMult = divs.length === 0 ? 1 : divs.length === 1 ? 0.6 : divs.length === 2 ? 0.85 : 1
  const termMult = term === 'FA' ? 1 : term === 'SP' ? 0.88 : 0.45
  const total = Math.round(base * divMult * termMult)
  const unique = Math.round(total * 0.9994)

  return {
    total,
    unique,
    fields: [
      {
        icon: '🎓', label: 'Admission Type',
        completePct: 0, missing: total,
        status: 'Critical', message: '⚠ Needs Immediate Attention', messageType: 'amber',
      },
      {
        icon: '📊', label: 'GPA',
        completePct: 75, missing: Math.round(total * 0.25),
        status: 'Poor', message: '⚠ Needs Attention', messageType: 'amber',
      },
      {
        icon: '🧑', label: 'Gender',
        completePct: 76, missing: Math.round(total * 0.24),
        status: 'Critical', message: '⚠ Critical for fairness model!', messageType: 'red',
      },
      {
        icon: '🛂', label: 'Visa Type',
        completePct: 72, missing: Math.round(total * 0.28),
        status: 'Poor', message: '⚠ Needs Attention', messageType: 'amber',
      },
      {
        icon: '📧', label: 'Email',
        completePct: 99, missing: Math.round(total * 0.01),
        status: 'Excellent', message: '✓ Nearly complete', messageType: 'green',
      },
      {
        icon: '🏙️', label: 'City',
        completePct: 98, missing: Math.round(total * 0.02),
        status: 'Excellent', message: '✓ Minor attention needed', messageType: 'green',
      },
      {
        icon: '📱', label: 'Mobile',
        completePct: 88, missing: Math.round(total * 0.12),
        status: 'Good', message: '✓ Acceptable level', messageType: 'green',
      },
      {
        icon: '🌍', label: 'Nationality',
        completePct: 94, missing: Math.round(total * 0.06),
        status: 'Good', message: '✓ Acceptable level', messageType: 'green',
      },
      {
        icon: '📅', label: 'Birth Date',
        completePct: 82, missing: Math.round(total * 0.18),
        status: 'Poor', message: '⚠ Needs Attention', messageType: 'amber',
      },
    ],
  }
}

// ── Ring Chart ────────────────────────────────────────────────────

function RingChart({ pct, color }: { pct: number; color: string }) {
  const r = 28
  const circ = 2 * Math.PI * r
  const dash = (pct / 100) * circ

  return (
    <div className="relative w-16 h-16 flex-shrink-0">
      <svg width="64" height="64" viewBox="0 0 64 64" style={{ transform: 'rotate(-90deg)' }}>
        {/* Track */}
        <circle cx="32" cy="32" r={r} fill="none" stroke="#e5e7eb" strokeWidth="5"/>
        {/* Fill */}
        <circle
          cx="32" cy="32" r={r} fill="none"
          stroke={color}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circ}`}
          style={{ transition: 'stroke-dasharray 0.6s ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-mono text-[11px] font-bold text-g-700">{pct}%</span>
      </div>
    </div>
  )
}

// ── Status badge ──────────────────────────────────────────────────

const statusStyles: Record<FieldStat['status'], string> = {
  Critical:  'bg-red-light   text-red    border border-red-border',
  Poor:      'bg-amber-light text-amber  border border-amber-border',
  Good:      'bg-green-faint text-green-dark border border-green-border',
  Excellent: 'bg-green-faint text-green-dark border border-green-border',
}

const ringColor: Record<FieldStat['status'], string> = {
  Critical:  '#dc2626',
  Poor:      '#d97706',
  Good:      '#16a34a',
  Excellent: '#16a34a',
}

const msgStyles: Record<FieldStat['messageType'], string> = {
  red:   'bg-red-light   border border-red-border   text-red',
  amber: 'bg-amber-light border border-amber-border text-amber-800',
  green: 'bg-green-faint border border-green-border text-green-dark',
}

// ── Multi-select dropdown ─────────────────────────────────────────

function MultiSelect<T extends string>({
  label, options, selected, onChange,
}: {
  label: string
  options: T[]
  selected: T[]
  onChange: (v: T[]) => void
}) {
  const [open, setOpen] = useState(false)

  const toggle = (opt: T) => {
    onChange(selected.includes(opt)
      ? selected.filter(x => x !== opt)
      : [...selected, opt])
  }

  const displayVal = selected.length === 0
    ? 'All'
    : selected.join(' × ') + ' ×'

  return (
    <div className="flex flex-col gap-1 min-w-[140px] relative">
      <label className="font-mono text-[10px] text-g-400 tracking-widest uppercase">{label}</label>
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center justify-between gap-2 px-3 py-2 bg-white border border-g-200
          rounded-card text-sm text-g-800 cursor-pointer hover:border-g-300 transition-colors text-left"
      >
        <span className="truncate max-w-[120px]">{displayVal}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
          className={`flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}>
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-g-200 rounded-card-lg shadow-card-md z-50 min-w-[140px] py-1">
          {options.map(opt => (
            <button
              key={opt}
              onClick={() => toggle(opt)}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-g-700
                hover:bg-g-50 cursor-pointer border-none bg-transparent text-left transition-colors"
            >
              <div className={`w-4 h-4 rounded flex items-center justify-center border flex-shrink-0
                ${selected.includes(opt) ? 'bg-green border-green' : 'border-g-300'}`}>
                {selected.includes(opt) && (
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2.5">
                    <path d="M2 6l3 3 5-5"/>
                  </svg>
                )}
              </div>
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function SingleSelect<T extends string>({
  label, options, value, onChange,
}: {
  label: string; options: T[]; value: T; onChange: (v: T) => void
}) {
  const [open, setOpen] = useState(false)
  return (
    <div className="flex flex-col gap-1 min-w-[100px] relative">
      <label className="font-mono text-[10px] text-g-400 tracking-widest uppercase">{label}</label>
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center justify-between gap-2 px-3 py-2 bg-white border border-g-200
          rounded-card text-sm text-g-800 cursor-pointer hover:border-g-300 transition-colors"
      >
        <span>{value} ×</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
          className={`flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}>
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-g-200 rounded-card-lg shadow-card-md z-50 min-w-[100px] py-1">
          {options.map(opt => (
            <button key={opt} onClick={() => { onChange(opt); setOpen(false) }}
              className={`flex items-center gap-2 w-full px-3 py-2 text-sm cursor-pointer border-none text-left transition-colors
                ${value === opt ? 'bg-green-faint text-green-dark font-semibold' : 'bg-transparent text-g-700 hover:bg-g-50'}`}>
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Field Card ────────────────────────────────────────────────────

function FieldCard({ f }: { f: FieldStat }) {
  const color = ringColor[f.status]
  return (
    <div className="bg-white border border-g-200 rounded-card-lg p-5 shadow-card flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-base">{f.icon}</span>
          <span className="text-sm font-bold text-g-900">{f.label}</span>
        </div>
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${statusStyles[f.status]}`}>
          {f.status}
        </span>
      </div>

      {/* Ring + numbers */}
      <div className="flex items-center gap-4">
        <RingChart pct={f.completePct} color={color}/>
        <div>
          <div className="font-mono text-[9px] text-g-400 tracking-widest uppercase mb-0.5">Missing</div>
          <div className="text-[28px] font-extrabold leading-none" style={{ color }}>
            {f.missing.toLocaleString()}
          </div>
          <div className="text-xs text-g-400 mt-0.5">students</div>
        </div>
      </div>

      {/* Message */}
      <div className={`rounded-xl px-3 py-2 text-xs font-medium ${msgStyles[f.messageType]}`}>
        {f.message}
      </div>
    </div>
  )
}

// ── Main Page ─────────────────────────────────────────────────────

export function Completeness() {
  const [year,      setYear]      = useState<AcadYear>('2627')
  const [divisions, setDivisions] = useState<DivOption[]>(['UG', 'GR'])
  const [term,      setTerm]      = useState<TermOption>('FA')
  const [applied,   setApplied]   = useState({ year: '2627' as AcadYear, divs: ['UG', 'GR'] as DivOption[], term: 'FA' as TermOption })

  const stats = useMemo(
    () => computeStats(applied.year, applied.divs, applied.term),
    [applied]
  )

  const applyFilters = () => setApplied({ year, divs: divisions, term })

  const clearAll = () => {
    setYear('2627'); setDivisions([]); setTerm('FA')
    setApplied({ year: '2627', divs: [], term: 'FA' })
  }

  const activeDivLabel = applied.divs.length > 0
    ? `Divisions: ${applied.divs.join(', ')}`
    : null

  return (
    <div className="animate-fade-up">
      {/* Page header */}
      <div className="mb-5">
        <h1 className="text-[26px] font-extrabold text-g-900">Data Completeness</h1>
        <p className="text-sm text-g-500 mt-1">
          Track missing information across {stats.total.toLocaleString()} student records.
        </p>
      </div>

      {/* Filter Card */}
      <div className="bg-white border border-g-200 rounded-card-lg p-4 mb-5 shadow-card">
        <div className="flex flex-wrap items-end gap-4">
          {/* Academic Year */}
          <SingleSelect<AcadYear>
            label="Academic Year"
            options={['2627', '2526', '2425']}
            value={year}
            onChange={setYear}
          />

          {/* Division multi-select */}
          <MultiSelect<DivOption>
            label="Division"
            options={['UG', 'GR', 'LC', 'AR']}
            selected={divisions}
            onChange={setDivisions}
          />

          {/* Term */}
          <SingleSelect<TermOption>
            label="Term"
            options={['FA', 'SP', 'SU']}
            value={term}
            onChange={setTerm}
          />

          {/* Buttons */}
          <div className="flex gap-2 items-end pb-0.5">
            <button
              onClick={applyFilters}
              className="px-5 py-2 bg-green text-white text-sm font-bold rounded-full
                hover:bg-green-dark cursor-pointer border-none transition-colors"
            >
              Apply Filters
            </button>
            <button
              onClick={clearAll}
              className="px-4 py-2 bg-white text-g-700 text-sm font-semibold rounded-full
                border border-g-200 hover:bg-g-50 cursor-pointer transition-colors"
            >
              Clear All
            </button>
          </div>

          {/* Export */}
          <button className="ml-auto px-3 py-2 bg-white text-g-700 text-xs font-semibold
            border border-g-200 rounded-card hover:bg-g-50 cursor-pointer transition-colors self-end">
            ↓ Export Data
          </button>
        </div>

        {/* Active filters */}
        {activeDivLabel && (
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-g-100">
            <span className="text-xs text-g-500 font-medium">Active Filters:</span>
            <span className="bg-green-faint text-green-dark border border-green-border
              font-mono text-[10px] font-bold px-2.5 py-1 rounded-full">
              {activeDivLabel}
            </span>
          </div>
        )}
      </div>

      {/* Search Results hero */}
      <div className="bg-white border border-g-200 rounded-card-lg p-8 mb-5 text-center shadow-card">
        <div className="text-xs text-g-400 mb-2">Search Results</div>
        <div className="text-[52px] font-extrabold text-green leading-none mb-2">
          {stats.total.toLocaleString()}
        </div>
        <div className="text-sm text-g-500">
          Total student records found · {stats.unique.toLocaleString()} unique students with missing data
        </div>
      </div>

      {/* Field cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.fields.map(f => (
          <FieldCard key={f.label} f={f}/>
        ))}
      </div>
    </div>
  )
}
