import React from 'react'

// ── Flow Step Card ────────────────────────────────────────────────

interface Step {
  icon: string
  title: string
  desc: string
  badge?: { text: string; color: string; bg: string }
  style: 'default' | 'ai' | 'human' | 'ethics'
}

const styleMap = {
  default: 'bg-white border border-g-200',
  ai:      'bg-green-faint border border-green-border',
  human:   'bg-white border border-g-200',
  ethics:  'bg-green-faint border border-green-border',
}

function StepCard({ step }: { step: Step }) {
  return (
    <div className={`flex items-center gap-4 px-5 py-4 rounded-card-xl ${styleMap[step.style]}`}>
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0
        ${step.style === 'ai' || step.style === 'ethics' ? 'bg-green-mid' : 'bg-g-100'}`}>
        {step.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-bold text-g-900">{step.title}</div>
        <div className="text-xs text-g-500 mt-0.5">{step.desc}</div>
      </div>
      {step.badge && (
        <span
          className="font-mono text-[10px] font-extrabold px-2.5 py-1 rounded-md flex-shrink-0 tracking-wider"
          style={{ background: step.badge.bg, color: step.badge.color }}
        >
          {step.badge.text}
        </span>
      )}
    </div>
  )
}

function Arrow() {
  return (
    <div className="flex justify-center py-1 text-g-300">
      <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
        <path d="M8 0v16M2 10l6 8 6-8" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  )
}

// ── Decision Logic Row ────────────────────────────────────────────

function DecisionRow({ range, title, desc, badge }: {
  range: string; title: string; desc: string
  badge: { text: string; color: string; bg: string; border: string }
}) {
  return (
    <div className="flex items-center gap-4 py-4 border-b border-g-100 last:border-0">
      <div className="font-mono text-xs font-bold text-g-500 w-14 flex-shrink-0">{range}</div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-bold text-g-900">{title}</div>
        <div className="text-xs text-g-400 mt-0.5">{desc}</div>
      </div>
      <span
        className="font-mono text-[10px] font-extrabold px-2.5 py-1 rounded-md flex-shrink-0 border"
        style={{ background: badge.bg, color: badge.color, borderColor: badge.border }}
      >
        {badge.text}
      </span>
    </div>
  )
}

// ── School Badge ──────────────────────────────────────────────────

function SchoolBadge({ code, color, bg, desc }: {
  code: string; color: string; bg: string; desc: string
}) {
  return (
    <div className="flex items-start gap-3 py-2">
      <span
        className="font-mono text-[10px] font-extrabold px-2 py-1 rounded-md flex-shrink-0"
        style={{ background: bg, color }}
      >
        {code}
      </span>
      <span className="text-xs text-g-600 leading-relaxed pt-0.5">{desc}</span>
    </div>
  )
}

// ── Main Page ─────────────────────────────────────────────────────

const FLOW_STEPS: Step[] = [
  {
    icon: '📥', style: 'default',
    title: 'Application Submission',
    desc:  'Candidate submits form + documents (TOEFL, GPA, essay, ID)',
  },
  {
    icon: '🔍', style: 'ai',
    title: 'AI: Document Completeness Check',
    desc:  'Verify all required docs per type',
    badge: { text: 'AUTO', color: '#16a34a', bg: '#dcfce7' },
  },
  {
    icon: '🤖', style: 'ai',
    title: 'AI: Predictive Scoring',
    desc:  'Multi-factor score: GPA, TOEFL gate, essay NLP, interview, XAI layer',
    badge: { text: 'CORE AI', color: '#15803d', bg: '#bbf7d0' },
  },
  {
    icon: '⚖️', style: 'ai',
    title: 'AI: Rules & Threshold Gates',
    desc:  'Hard rules: TOEFL minimums, GPA floors, discipline history',
    badge: { text: 'RULES', color: '#d97706', bg: '#fef3c7' },
  },
  {
    icon: '👔', style: 'human',
    title: 'Human: Admissions Officer Review',
    desc:  'Review AI recommendation with full explainability, override possible',
    badge: { text: 'OVERSIGHT', color: '#d97706', bg: '#fef3c7' },
  },
  {
    icon: '🏛️', style: 'human',
    title: 'Committee Decision',
    desc:  'School committee (SBA/SSAH/SSE) finalizes top candidates',
  },
  {
    icon: '📊', style: 'ethics',
    title: 'AI: Fairness Audit',
    desc:  'Post-cycle bias analysis: gender, nationality, SES parity check',
    badge: { text: 'ETHICS', color: '#16a34a', bg: '#dcfce7' },
  },
]

export function Flow() {
  return (
    <div className="animate-fade-up">
      {/* Page header */}
      <div className="mb-7">
        <h1 className="text-[28px] font-extrabold text-g-900 mb-1">Process Flow</h1>
        <p className="text-sm text-g-400">End-to-end pipeline and decision logic.</p>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

        {/* Column A — AI-Augmented Flow */}
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-7 h-7 rounded-full bg-green flex items-center justify-center
              text-white font-extrabold text-xs flex-shrink-0">
              A
            </div>
            <h2 className="text-base font-bold text-g-900">AI-Augmented Flow</h2>
          </div>

          <div className="flex flex-col">
            {FLOW_STEPS.map((step, i) => (
              <div key={step.title}>
                <StepCard step={step}/>
                {i < FLOW_STEPS.length - 1 && <Arrow/>}
              </div>
            ))}
          </div>
        </div>

        {/* Column B — Decision Logic + Routing */}
        <div className="flex flex-col gap-5">
          {/* Decision Logic header */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
               <div className="w-7 h-7 rounded-full bg-green flex items-center justify-center
              text-white font-extrabold text-xs flex-shrink-0">
              B
            </div>
              <h2 className="text-base font-bold text-g-900">Decision Logic</h2>
            </div>

            <div className="bg-white border border-g-200 rounded-card-xl px-5 py-2 shadow-card">
              <DecisionRow
                range="85–100"
                title="AI Recommends: ACCEPT"
                desc="Fast-track to final committee review"
                badge={{ text: '85–100', color: '#15803d', bg: '#dcfce7', border: '#bbf7d0' }}
              />
              <DecisionRow
                range="65–84"
                title="AI Recommends: REVIEW"
                desc="Require human review before decision"
                badge={{ text: '65–84', color: '#d97706', bg: '#fef3c7', border: '#fde68a' }}
              />
              <DecisionRow
                range="< 65"
                title="AI Recommends: REJECT"
                desc="Below minimum threshold, auto-flag"
                badge={{ text: '< 65', color: '#dc2626', bg: '#fee2e2', border: '#fecaca' }}
              />
              <DecisionRow
                range="ANY"
                title="Hard Rule Fail → REJECT"
                desc="TOEFL below minimum, GPA floor, etc."
                badge={{ text: 'RULE', color: '#4b5563', bg: '#f3f4f6', border: '#e5e7eb' }}
              />
            </div>
          </div>

        

          {/* School Routing Logic */}
          <div className="bg-white border border-g-200 rounded-card-xl p-5 shadow-card">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-base">🏫</span>
              <h3 className="text-sm font-bold text-g-900">School Routing Logic</h3>
            </div>
            <SchoolBadge
              code="SBA"  color="#7c3aed" bg="#f5f3ff"
              desc="Finance, Management, Marketing, Logistics, AI for Business"
            />
            <SchoolBadge
              code="SSE"  color="#2563eb" bg="#eff6ff"
              desc="CS, Engineering & Management, General Eng, Renewable Energy"
            />
            <SchoolBadge
              code="SSAH" color="#16a34a" bg="#f0fdf4"
              desc="Int'l Studies, Communication, Psychology, HR Dev, Env. Studies"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
