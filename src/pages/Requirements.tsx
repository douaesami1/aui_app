import React from 'react'

// ── Req Item ─────────────────────────────────────────────────────

function ReqItem({ text }: { text: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 px-4 py-3 border border-g-100 rounded-card bg-white hover:bg-g-50 transition-colors">
      <div className="w-5 h-5 min-w-[20px] rounded-full bg-green-faint border border-green-border
        flex items-center justify-center mt-0.5 flex-shrink-0">
        <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="#16a34a" strokeWidth="2.5">
          <path d="M2 6l3 3 5-5"/>
        </svg>
      </div>
      <span className="text-sm text-g-700 leading-relaxed">{text}</span>
    </div>
  )
}

// ── Module Card ───────────────────────────────────────────────────

function ModuleCard({ icon, title, items }: {
  icon: React.ReactNode
  title: string
  items: React.ReactNode[]
}) {
  return (
    <div className="bg-white border border-g-200 rounded-card-xl p-6 shadow-card">
      <div className="flex items-center gap-2.5 mb-4">
        <span className="text-xl">{icon}</span>
        <h2 className="text-base font-bold text-g-900">{title}</h2>
      </div>
      <div className="flex flex-col gap-2">
        {items.map((item, i) => <ReqItem key={i} text={item}/>)}
      </div>
    </div>
  )
}

// ── Main Page ─────────────────────────────────────────────────────

export function Requirements() {
  return (
    <div className="animate-fade-up">
      {/* Page header */}
      <div className="mb-7">
        <h1 className="text-[28px] font-extrabold text-g-900 mb-1">Functional Requirements</h1>
        <p className="text-sm text-g-400">
          Mapped from AUI Academic Catalog 2024–2025 and admissions policies.
        </p>
      </div>

      {/* Grid 2 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Freshman Admission Module */}
        <ModuleCard
          icon="🎓"
          title="Freshman Admission Module"
          items={[
            'Automated review of high school records (Pre-Bac & Post-Bac rules)',
            <><strong className="text-g-900">TOEFL gate: 71 iBT minimum</strong> (36 iBT for Language Center track)</>,
            'NLP-based Personal Essay scoring',
            'Online interview scheduling & outcome recording',
            'Certified document checklist validation (ID, diploma, photos, pledge)',
          ]}
        />

        {/* Transfer Admission Module */}
        <ModuleCard
          icon="🔄"
          title="Transfer Admission Module"
          items={[
            <>Minimum <strong className="text-g-900">30 semester credits</strong> verification</>,
            <><strong className="text-g-900">GPA threshold gate: ≥ 2.5</strong> on 4.0 scale</>,
            'Transcript authenticity and institution accreditation check',
            'Credit transferability analysis per AUI program requirements',
            'Good standing verification with home institution',
          ]}
        />

        {/* Graduate Admission Module */}
        <ModuleCard
          icon="🎓"
          title="Graduate Admission Module"
          items={[
            "Bachelor's degree (or Licence) equivalency validation",
            <><strong className="text-g-900">TOEFL gate: ≥ 79 iBT</strong> (550 paper-based), writing sub-score ≥ 20</>,
            <>Recommendation letters: <strong className="text-g-900">2 required</strong> (≥1 from university instructor)</>,
            'GRE/GMAT optional weighting for SSE/SSAH/SBA routing',
            'Adequate preparation scoring for proposed graduate program',
          ]}
        />

        {/* AI & Explainability Core */}
        <ModuleCard
          icon="🤖"
          title="AI & Explainability Core"
          items={[
            'Predictive score (0–100) per candidate with confidence interval',
            'SHAP-based feature impact breakdown for every decision',
            'Hard rule engine (TOEFL floors, GPA minimums, discipline history)',
            'Model confidence score displayed alongside AI recommendation',
            'Human override always available with mandatory justification log',
          ]}
        />

       

      </div>
    </div>
  )
}
