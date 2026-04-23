import React from 'react'
import { Card, CardHeader, Badge, FunnelRow, StatCard } from '../components/ui'

// ── Fairness helpers ──────────────────────────────────────────────

function ParityBar({ label, pct, color }: { label: string; pct: number; color: string }) {
  return (
    <div className="flex items-center gap-3 mb-2">
      <div className="w-24 text-xs text-g-600 flex-shrink-0">{label}</div>
      <div className="flex-1 h-1.5 bg-g-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }}/>
      </div>
      <div className="font-mono text-xs text-g-500 w-8 text-right">{pct}%</div>
    </div>
  )
}

function ParityCard({ title, score, scoreColor, children, status, statusType }: {
  title: string; score: string; scoreColor: string
  children: React.ReactNode; status: string; statusType: 'green' | 'amber'
}) {
  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-bold text-g-900">{title}</span>
        <span className="text-sm font-extrabold" style={{ color: scoreColor }}>{score}</span>
      </div>
      <div className="mb-4">{children}</div>
      <div className={`rounded-xl px-3 py-2 text-xs font-medium
        ${statusType === 'green'
          ? 'bg-green-faint border border-green-border text-green-dark'
          : 'bg-amber-light border border-amber-border text-amber-700'}`}>
        {status}
      </div>
    </Card>
  )
}

function MetricCard({ title, badge, badgeColor, bigValue, bigColor, subtitle, status, statusType }: {
  title: string; badge: string; badgeColor: string
  bigValue: string; bigColor: string; subtitle: string
  status: string; statusType: 'green' | 'amber'
}) {
  return (
    <Card>
      <div className="flex items-center justify-between mb-5">
        <span className="text-sm font-bold text-g-900">{title}</span>
        <span className="text-sm font-extrabold" style={{ color: badgeColor }}>{badge}</span>
      </div>
      <div className="text-center mb-5">
        <div className="text-[52px] font-extrabold leading-none" style={{ color: bigColor }}>{bigValue}</div>
        <div className="text-xs text-g-400 mt-2">{subtitle}</div>
      </div>
      <div className={`rounded-xl px-3 py-2 text-xs font-medium text-center
        ${statusType === 'green'
          ? 'bg-green-faint border border-green-border text-green-dark'
          : 'bg-amber-light border border-amber-border text-amber'}`}>
        {status}
      </div>
    </Card>
  )
}

const auditEvents = [
  { color: '#16a34a', title: 'AI Decision — Admit · Score 87 · Confidence 97%',       meta: 'Sofia Benchaabane · Freshman · SBA · Model v2.4',                                      time: '2025-03-08 14:23:01' },
  { color: '#7c3aed', title: 'Human Override — Escalation to Review Committee',        meta: 'Karim Al-Mansouri · Transfer · SSE · Officer: A.Benali · "Strong rec letter warrants second look"', time: '2025-03-08 14:18:44' },
  { color: '#dc2626', title: 'AI Decision — Reject · Score 38 · TOEFL below threshold',meta: 'Omar El-Idrissi · Freshman · SBA · TOEFL: 52 iBT (req: 71)',                         time: '2025-03-08 14:15:20' },
  { color: '#d97706', title: 'AI Decision — Review · Score 61 · Borderline case',      meta: 'Yasmine Tahiri · Transfer · SSAH · GPA 2.6, incomplete transcripts',                  time: '2025-03-08 14:10:07' },
  { color: '#2563eb', title: 'Model Recalibration — Fairness metrics updated',         meta: 'AI Team · Gender bias coefficient adjusted · New DI ratio threshold: 0.04',          time: '2025-03-07 09:00:00' },
]

// ── Fairness ──────────────────────────────────────────────────────

export function Fairness() {
  return (
    <div className="animate-fade-up">
      <div className="mb-6">
        <h1 className="text-[26px] font-extrabold text-g-900">Fairness & Audit</h1>
        <p className="text-sm text-g-500 mt-1">Bias auditing, demographic parity metrics and GDPR-compliant decision trail.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <ParityCard title="Gender Parity" score="90%" scoreColor="#16a34a" status="✓ Within acceptable parity range" statusType="green">
          <ParityBar label="Male"   pct={43} color="#2563eb"/>
          <ParityBar label="Female" pct={57} color="#db2777"/>
        </ParityCard>
        <ParityCard title="Region Parity" score="85%" scoreColor="#d97706" status="⚠ Monitor Casablanca over-representation" statusType="amber">
          <ParityBar label="Casablanca"  pct={32} color="#16a34a"/>
          <ParityBar label="Rabat"       pct={24} color="#2563eb"/>
          <ParityBar label="Fès"         pct={18} color="#d97706"/>
          <ParityBar label="Other"       pct={26} color="#9ca3af"/>
        </ParityCard>
        <ParityCard title="Bac Type Parity" score="95%" scoreColor="#16a34a" status="✓ Good distribution across bac types" statusType="green">
          <ParityBar label="Moroccan Bac"  pct={68} color="#16a34a"/>
          <ParityBar label="French Bac"    pct={22} color="#d97706"/>
          <ParityBar label="International" pct={10} color="#2563eb"/>
        </ParityCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
        <MetricCard title="Model Bias Score" badge="96%" badgeColor="#16a34a" bigValue="0.04" bigColor="#16a34a" subtitle="Disparate Impact Ratio"    status="✓ Well below 0.1 threshold"          statusType="green"/>
        <MetricCard title="Override Rate"    badge="12%" badgeColor="#d97706" bigValue="12%"  bigColor="#d97706" subtitle="Officer overrides this cycle" status="⚠ Elevated — review officer patterns" statusType="amber"/>
        <MetricCard title="Model Accuracy"   badge="94.2%" badgeColor="#16a34a" bigValue="94.2%" bigColor="#16a34a" subtitle="Validated on holdout set" status="Model v2.4 · Last calibrated Mar 7"  statusType="green"/>
      </div>

     
    </div>
  )
}

// ── Data Completeness ─────────────────────────────────────────────

export function Completeness() {
  const sections = [
    { label: 'Personal Info',    pct: 98.4, color: 'bg-green'  },
    { label: 'Academic Records', pct: 96.1, color: 'bg-blue'   },
    { label: 'Documents',        pct: 91.7, color: 'bg-amber'  },
    { label: 'Contact Details',  pct: 99.2, color: 'bg-purple' },
    { label: 'Payment Info',     pct: 87.3, color: 'bg-red'    },
  ]
  return (
    <div className="animate-fade-up">
      <div className="mb-6">
        <h1 className="text-[26px] font-extrabold text-g-900">Data Completeness</h1>
        <p className="text-sm text-g-500 mt-1">Application data quality across all fields and sections.</p>
      </div>
      
    </div>
  )
}

// ── Requirements ──────────────────────────────────────────────────

export function Requirements() {
  return (
    <div className="animate-fade-up">
      <div className="mb-6">
        <h1 className="text-[26px] font-extrabold text-g-900">Requirements</h1>
        <p className="text-sm text-g-500 mt-1">AUI admission criteria and decision logic by applicant type.</p>
      </div>
      
     
    </div>
  )
}

// ── Process Flow ──────────────────────────────────────────────────

export function Flow() {
  const steps = [
    { icon: '📥', title: 'Application Submitted',  desc: 'Applicant fills form, uploads documents',   type: 'human' },
    { icon: '🔍', title: 'Auto Pre-screening',      desc: 'Missing fields flagged, hard rules checked', type: 'ai'    },
    { icon: '🤖', title: 'AI Scoring (v2.4)',       desc: 'XGBoost model scores all dimensions',        type: 'ai'    },
    { icon: '📊', title: 'SHAP Explainability',     desc: 'Feature contributions generated per app',    type: 'ai'    },
    { icon: '👔', title: 'Officer Review',           desc: 'Human reviews borderline / flagged cases',   type: 'human' },
    { icon: '🏛', title: 'Committee Sign-off',      desc: 'School committee final approval',             type: 'human' },
    { icon: '✉️', title: 'Offer Sent',              desc: 'Admission letter dispatched to applicant',   type: 'human' },
  ]
  return (
    <div className="animate-fade-up">
      <div className="mb-6">
        <h1 className="text-[26px] font-extrabold text-g-900">Process Flow</h1>
        <p className="text-sm text-g-500 mt-1">End-to-end AI + human decision workflow.</p>
      </div>
      
    </div>
  )
}

// ── Grades ────────────────────────────────────────────────────────

export function Grades() {
  const grades = [
    { label: 'A+', pct: 8,  color: '#15803d' },
    { label: 'A',  pct: 16, color: '#16a34a' },
    { label: 'B+', pct: 22, color: '#2563eb' },
    { label: 'B',  pct: 20, color: '#60a5fa' },
    { label: 'C+', pct: 14, color: '#d97706' },
    { label: 'C',  pct: 8,  color: '#f59e0b' },
    { label: 'D',  pct: 6,  color: '#dc2626' },
    { label: 'F',  pct: 6,  color: '#9b1c1c' },
  ]
  return (
    <div className="animate-fade-up">
      <div className="mb-6">
        <h1 className="text-[26px] font-extrabold text-g-900">Grades Distribution</h1>
        <p className="text-sm text-g-500 mt-1">University-wide grade analysis across 23 departments.</p>
      </div>
      
    </div>
  )
}

// ── Features ──────────────────────────────────────────────────────

const FEATURES = [
  { id: 'F01', name: 'AI Score Engine',            desc: 'Predictive scoring per application type',            module: 'Core AI',    priority: 'HIGH' },
  { id: 'F02', name: 'SHAP Explainability',         desc: 'Per-decision feature impact with SHAP values',       module: 'Core AI',    priority: 'HIGH' },
  { id: 'F03', name: 'Document Completeness Check', desc: 'Auto-verify required docs per applicant type',       module: 'Intake',     priority: 'HIGH' },
  { id: 'F04', name: 'Admissions Funnel Dashboard', desc: 'Real-time 100K→12K→1K pipeline',                   module: 'Dashboard',  priority: 'HIGH' },
  { id: 'F05', name: 'Candidate Review Interface',  desc: 'Searchable/filterable list with AI score & status',  module: 'Review',     priority: 'HIGH' },
  { id: 'F06', name: 'One-Click Decision Panel',    desc: 'Accept / Hold / Reject with mandatory reason log',   module: 'Review',     priority: 'HIGH' },
  { id: 'F07', name: 'Fairness & Bias Audit',       desc: 'Gender, nationality, SES parity scores per cycle',   module: 'Ethics',     priority: 'MED'  },
  { id: 'F08', name: 'Interview Scheduling',        desc: 'Flag candidates for online interview + calendar',    module: 'Workflow',   priority: 'MED'  },
  { id: 'F09', name: 'Multi-School Routing',        desc: 'Route applications to SBA / SSAH / SSE committees',  module: 'Workflow',   priority: 'MED'  },
  { id: 'F10', name: 'Application Type Profiles',   desc: 'Distinct scoring models per type',                   module: 'Core AI',    priority: 'HIGH' },
  { id: 'F11', name: 'TOEFL Threshold Gates',       desc: 'Hard gates: UG 71 iBT, Grad 79 iBT',                module: 'Rules',      priority: 'HIGH' },
  { id: 'F12', name: 'Audit Log',                   desc: 'Full traceability of every AI decision and override', module: 'Compliance', priority: 'MED'  },
]

export function Features() {
  return (
    <div className="animate-fade-up">
      <div className="mb-6">
        <h1 className="text-[26px] font-extrabold text-g-900">Feature Backlog</h1>
        <p className="text-sm text-g-500 mt-1">12 features derived from requirements analysis — prioritized and phased.</p>
      </div>
      <div className="bg-white border border-g-200 rounded-card-lg overflow-hidden mb-5">
        <div className="px-5 py-4 border-b border-g-100 flex items-center justify-between flex-wrap gap-3">
          <div className="text-sm font-bold text-g-900">Feature Backlog & Prioritization</div>
          <div className="flex gap-1.5"><Badge variant="red">HIGH</Badge><Badge variant="amber">MED</Badge><Badge variant="green">LOW</Badge></div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-g-50">
                {['ID', 'Feature', 'Description', 'Module', 'Priority'].map(h => (
                  <th key={h} className="text-left px-3.5 py-2.5 font-mono text-[9.5px] text-g-500 tracking-widest uppercase border-b border-g-200">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {FEATURES.map(f => (
                <tr key={f.id} className="hover:bg-green-faint transition-colors">
                  <td className="px-3.5 py-3 border-b border-g-100 font-mono text-xs text-g-400">{f.id}</td>
                  <td className="px-3.5 py-3 border-b border-g-100 text-sm font-bold text-g-900">{f.name}</td>
                  <td className="px-3.5 py-3 border-b border-g-100 text-xs text-g-600">{f.desc}</td>
                  <td className="px-3.5 py-3 border-b border-g-100"><Badge variant="gray">{f.module}</Badge></td>
                  <td className="px-3.5 py-3 border-b border-g-100">
                    <span className={`font-mono text-xs font-bold ${f.priority === 'HIGH' ? 'text-red' : f.priority === 'MED' ? 'text-amber' : 'text-green'}`}>{f.priority}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { weeks: 'Weeks 1–4',  phase: 'Phase 1 — Core AI',      color: 'border-t-red',   items: ['AI scoring engine (F01)', 'SHAP explainability (F02)', 'TOEFL & GPA hard gates (F11)', 'Document completeness check (F03)'] },
          { weeks: 'Weeks 5–8',  phase: 'Phase 2 — Review UI',    color: 'border-t-amber', items: ['Admissions funnel dashboard (F04)', 'Candidate list + filters (F05)', 'Decision panel with override (F06)', 'Application type profiles (F10)'] },
          { weeks: 'Weeks 9–12', phase: 'Phase 3 — Intelligence', color: 'border-t-green', items: ['Fairness & bias audit (F07)', 'Interview scheduling (F08)', 'Multi-school routing (F09)', 'Audit log & compliance (F12)'] },
        ].map(p => (
          <Card key={p.phase} className={`border-t-2 ${p.color}`}>
            <div className="font-mono text-[9.5px] text-g-400 tracking-widest mb-1">{p.weeks}</div>
            <div className="text-sm font-extrabold text-g-900 mb-3">{p.phase}</div>
            <div className="flex flex-col gap-1.5">
              {p.items.map(item => (
                <div key={item} className="flex items-start gap-2 p-2 bg-g-50 border border-g-100 rounded-card">
                  <span className="text-green mt-0.5 flex-shrink-0">→</span>
                  <span className="text-xs text-g-700">{item}</span>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
