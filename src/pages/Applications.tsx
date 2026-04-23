import { useState } from 'react'
import { APPLICATIONS } from '../data/mockData'
import type { Application, Verdict, AppType } from '../types'
import { Badge, Button, FilterTabs, SearchInput, BarRow, SHAPRow, Card } from '../components/ui'

type FilterVal = 'all' | Verdict | AppType

const FILTER_TABS = [
  { id: 'all',      label: 'All (8)'   },
  { id: 'admit',    label: 'Admit'     },
  { id: 'review',   label: 'Review'    },
  { id: 'reject',   label: 'Reject'    },
  { id: 'freshman', label: 'Freshman'  },
  { id: 'graduate', label: 'Graduate'  },
]

function typeTag(type: AppType) {
  const map: Record<AppType, string> = {
    freshman: 'bg-green-faint text-green-dark border-green-border',
    transfer: 'bg-blue-light text-blue-500 border-blue-border',
    graduate: 'bg-amber-light text-amber border-amber-border',
    visiting: 'bg-g-100 text-g-600 border-g-200',
  }
  const labels: Record<AppType, string> = { freshman: 'Freshman', transfer: 'Transfer', graduate: 'Graduate', visiting: 'Visiting' }
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold border ${map[type]}`}>
      {labels[type]}
    </span>
  )
}

function verdictBadge(v: Verdict) {
  if (v === 'admit')  return <Badge variant="green"><span className="w-1.5 h-1.5 rounded-full bg-green inline-block"/>Admit</Badge>
  if (v === 'review') return <Badge variant="amber">⚠ Review</Badge>
  return <Badge variant="red">✗ Reject</Badge>
}

const scoreColor: Record<Verdict, string> = {
  admit:  'text-green',
  review: 'text-amber',
  reject: 'text-red-700',
}

const borderColor: Record<Verdict, string> = {
  admit:  'border-l-green',
  review: 'border-l-amber',
  reject: 'border-l-red-700',
}

// ── Detail Panel ──────────────────────────────────────────────────

function DetailPanel({ app }: { app: Application | null }) {
  const [justification, setJustification] = useState('')

  if (!app) {
    return (
      <div className="bg-white border border-g-200 rounded-card-lg p-16 text-center text-g-400 sticky top-0">
        <div className="text-5xl mb-3 opacity-30">◧</div>
        <div className="text-sm font-semibold">Select an applicant</div>
        <div className="text-xs mt-1 text-g-300">Click any card to view AI decision</div>
      </div>
    )
  }

  const vc = app.verdict === 'admit' ? '#4ade80' : app.verdict === 'review' ? '#fbbf24' : '#f87171'
  const vl = app.verdict === 'admit' ? '✓ RECOMMEND ADMIT' : app.verdict === 'review' ? '⚠ MANUAL REVIEW' : '✗ RECOMMEND REJECT'

  return (
    <div className="bg-white border border-g-200 rounded-card-lg overflow-hidden sticky top-0 animate-fade-up">
      {/* Hero */}
      <div className="bg-g-900 p-5">
        <div className="flex items-start gap-3.5 mb-3.5">
          <div className="text-5xl font-extrabold leading-none" style={{ color: vc }}>{app.score}</div>
          <div className="flex-1">
            <div className="text-[17px] font-extrabold text-white">{app.name}</div>
            <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,.45)' }}>
              {app.typeLabel} · {app.program} · {app.city} · {app.id}
            </div>
            <div className="flex gap-1.5 mt-2 flex-wrap">
              {typeTag(app.type)}
              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold"
                style={{ background: 'rgba(37,99,235,.15)', color: '#93c5fd', border: '1px solid rgba(37,99,235,.2)' }}>
                Model v2.4
              </span>
            </div>
          </div>
        </div>
        <div className="h-px mb-3" style={{ background: 'rgba(255,255,255,.08)' }}/>
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold" style={{ color: vc }}>{vl}</span>
          <span className="font-mono text-xs" style={{ color: 'rgba(255,255,255,.3)' }}>{app.confidence}% confidence</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 overflow-y-auto max-h-[60vh]">
        {/* Scoring Dimensions */}
        <div className="mb-5">
          <div className="font-mono text-[9px] text-g-400 tracking-[1.5px] uppercase mb-2.5">Scoring Dimensions</div>
          {app.dimensions.map(d => <BarRow key={d.label} label={d.label} value={d.value} color={d.color}/>)}
        </div>

        {/* SHAP */}
        <div className="border-t border-g-100 pt-3.5 mb-5">
          <div className="font-mono text-[9px] text-g-400 tracking-[1.5px] uppercase mb-2.5">SHAP Feature Contributions</div>
          {app.shap.map(s => <SHAPRow key={s.label} label={s.label} value={s.value} positive={s.positive}/>)}
        </div>

        {/* Officer Decision */}
        <div className="border-t border-g-100 pt-3.5">
          <div className="font-mono text-[9px] text-g-400 tracking-[1.5px] uppercase mb-2.5">Officer Decision</div>
          <div className="flex gap-2 mb-3 flex-wrap">
            <Button variant="primary" size="sm">✓ Confirm Admit</Button>
            <Button variant="amber"   size="sm">⚠ Send to Review</Button>
            <Button variant="danger"  size="sm">✗ Reject</Button>
          </div>
          <div className="bg-g-50 border border-g-200 rounded-card p-3.5">
            <div className="font-mono text-[9px] text-g-400 tracking-[1.5px] uppercase mb-1.5">
              Justification (required for any override)
            </div>
            <textarea
              rows={2}
              value={justification}
              onChange={e => setJustification(e.target.value)}
              placeholder="Enter justification for audit trail…"
              className="w-full border border-g-200 rounded-lg px-3 py-2 font-sans text-xs text-g-700
                resize-none outline-none bg-white transition-colors focus:border-green"
            />
            <div className="flex gap-2 mt-2">
              <Button variant="primary" size="sm" className="flex-1">Submit Decision</Button>
              <Button variant="white"   size="sm">Save Draft</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Main Page ─────────────────────────────────────────────────────

export default function Applications() {
  const [filter,   setFilter]   = useState<FilterVal>('all')
  const [search,   setSearch]   = useState('')
  const [selected, setSelected] = useState<string | null>(null)

  const filtered = APPLICATIONS.filter(a => {
    const fOk = filter === 'all' || a.verdict === filter || a.type === filter
    const sOk = !search ||
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.id.toLowerCase().includes(search.toLowerCase()) ||
      a.program.toLowerCase().includes(search.toLowerCase())
    return fOk && sOk
  })

  const selectedApp = APPLICATIONS.find(a => a.id === selected) ?? null

  return (
    <div className="animate-fade-up">
      <div className="mb-6">
        <h1 className="text-[26px] font-extrabold text-g-900">Applications</h1>
        <p className="text-sm text-g-500 mt-1">Review and act on AI-scored candidates. Click any card to open the decision panel.</p>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3 mb-3.5 flex-wrap">
        <FilterTabs tabs={FILTER_TABS} active={filter} onChange={v => setFilter(v as FilterVal)}/>
        <SearchInput value={search} onChange={setSearch} placeholder="Search by name, ID, program…"/>
      </div>

      {/* Grid: list + detail */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-4 items-start">
        {/* List */}
        <div>
          <div className="font-mono text-[9.5px] text-g-400 tracking-[1.5px] uppercase mb-2.5">
            Showing {filtered.length} applicants
          </div>
          <div className="flex flex-col gap-1.5">
            {filtered.map(app => (
              <div
                key={app.id}
                onClick={() => setSelected(app.id)}
                className={`bg-white border border-l-[3px] rounded-card-lg p-3.5 cursor-pointer transition-all
                  hover:shadow-card-md hover:border-g-300
                  ${borderColor[app.verdict]}
                  ${selected === app.id ? 'bg-green-faint border-l-green' : ''}`}
              >
                <div className="flex items-start gap-2.5 mb-2.5">
                  <div className="w-9 h-9 rounded-[9px] flex items-center justify-center text-white font-extrabold text-sm flex-shrink-0"
                    style={{ background: app.color }}>
                    {app.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-g-900">{app.name}</div>
                    <div className="flex items-center gap-1.5 flex-wrap mt-0.5">
                      {typeTag(app.type)}
                      <span className="text-g-300 text-xs">·</span>
                      <span className="text-xs text-g-400">{app.program}</span>
                      <span className="text-g-300 text-xs">·</span>
                      <span className="text-xs text-g-400">{app.city}</span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className={`text-[22px] font-extrabold leading-none ${scoreColor[app.verdict]}`}>{app.score}</div>
                    <div className="font-mono text-[8px] text-g-400 tracking-[1px] uppercase">AI Score</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {verdictBadge(app.verdict)}
                  <Badge variant="gray">{app.confidence}% conf.</Badge>
                  <Badge variant="gray">{app.id}</Badge>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="text-center py-12 text-g-400 text-sm">No applicants match your filters.</div>
            )}
          </div>
        </div>

        {/* Detail */}
        <DetailPanel app={selectedApp}/>
      </div>
    </div>
  )
}
