import { useState } from 'react'
import { STUDENT_RECORD } from '../data/mockData'
import { Badge, Button, Card } from '../components/ui'

export default function Students() {
  const [query,   setQuery]   = useState('157406')
  const [result,  setResult]  = useState(true)
  const [section, setSection] = useState<'all' | 'student' | 'info' | 'candidacy'>('all')

  const s = STUDENT_RECORD

  const doSearch = () => {
    setResult(query.trim() === '157406' || query.trim().toLowerCase() === 'hafsa')
  }

  return (
    <div className="animate-fade-up">
      <div className="mb-6">
        <h1 className="text-[26px] font-extrabold text-g-900">Student Search</h1>
        <p className="text-sm text-g-500 mt-1">Advanced student record management — search by ID to view all data cards.</p>
      </div>

      {/* Search bar */}
      <Card className="mb-5">
        <div className="flex gap-2.5 items-center flex-wrap">
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && doSearch()}
            placeholder="Student ID…"
            className="flex-1 min-w-[180px] px-3.5 py-2.5 border-[1.5px] border-g-200 rounded-card text-sm
              font-sans outline-none bg-g-50 transition-colors focus:border-green text-g-800"
          />
          <Button variant="primary" onClick={doSearch}>Search</Button>
          <Button variant="white">↓ Download</Button>
          <div className="flex gap-1.5 ml-auto">
            {(['all', 'student', 'info', 'candidacy'] as const).map(v => (
              <Button
                key={v}
                size="xs"
                variant={section === v ? 'primary' : 'white'}
                onClick={() => setSection(v)}
              >
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {!result && (
        <div className="text-center py-16 text-g-400">
          <div className="text-4xl mb-3 opacity-30">○</div>
          <div className="text-sm font-semibold">No student found for "{query}"</div>
          <div className="text-xs mt-1">Try ID 157406 or name "Hafsa"</div>
        </div>
      )}

      {result && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Student Record Card */}
          {(section === 'all' || section === 'student') && (
            <StudentCard
              barColor="bg-green"
              initials="HE"
              avatarGradient="from-green to-[#059669]"
              name="Hafsa EL HASSENE"
              subtitle="ID: 157406 · 100% Complete"
              sectionLabel="Student Record"
              fields={[
                { key: 'ID Number',      val: s.id },
                { key: 'Entrance Year',  val: s.entranceYear },
                { key: 'Current Class',  val: s.currentClass },
                { key: 'Career GPA',     val: <Badge variant="amber">{s.careerGpa}</Badge> },
                { key: 'Hours Enrolled', val: String(s.hoursEnrolled) },
                { key: 'Assigned Room',  val: s.assignedRoom },
              ]}
            />
          )}

          {/* Personal Info Card */}
          {(section === 'all' || section === 'info') && (
            <StudentCard
              barColor="bg-amber"
              initials="HE"
              avatarGradient="from-amber to-[#f59e0b]"
              name="Hafsa EL HASSENE"
              subtitle="Personal Info · 100% Complete"
              sectionLabel="Personal Information"
              fields={[
                { key: 'Last Name',  val: s.lastName  },
                { key: 'First Name', val: s.firstName },
                { key: 'Mobile',     val: s.mobile    },
                { key: 'Email',      val: s.email     },
                { key: 'App ID',     val: s.appId     },
                { key: 'CIN',        val: s.cin       },
              ]}
            />
          )}

          {/* Candidacy Card */}
          {(section === 'all' || section === 'candidacy') && (
            <div className="bg-white border border-g-200 rounded-card-lg overflow-hidden shadow-card">
              <div className="h-0.5 bg-green" style={{ width: '84%' }}/>
              <div className="px-4 py-3.5 border-b border-g-100 flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-[10px] bg-gradient-to-br from-green to-[#059669]
                  flex items-center justify-center text-white font-extrabold text-sm">HE</div>
                <div>
                  <div className="text-sm font-extrabold text-g-900">Hafsa EL HASSENE</div>
                  <div className="font-mono text-xs text-g-400 mt-0.5">
                    Candidacy · <span className="text-green font-bold">84%</span> Complete
                  </div>
                </div>
              </div>
              <div className="px-4 py-3.5">
                <div className="font-mono text-[9px] text-g-400 tracking-[1.5px] uppercase mb-2.5">Candidacy Information</div>
                {[
                  { key: 'Division', val: s.division },
                  { key: 'Stage',    val: <Badge variant="green">{s.stage}</Badge> },
                  { key: 'Program',  val: s.program  },
                  { key: 'Bac Type', val: s.bacType  },
                  { key: 'Visa Type',val: s.visaType },
                ].map(f => (
                  <div key={f.key} className="flex justify-between items-center py-2 border-b border-g-100">
                    <span className="font-mono text-[10.5px] text-g-400">{f.key}</span>
                    <span className="text-sm font-semibold text-g-800">{f.val}</span>
                  </div>
                ))}
                {/* Missing fields */}
                <div className="mt-3">
                  <div className="font-mono text-[9px] text-red-700 tracking-[1px] uppercase mb-2">
                    ⚠ Missing Fields ({s.missingFields.length})
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {s.missingFields.map(f => (
                      <Badge key={f} variant="red">⚠ {f}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ── Reusable student card ─────────────────────────────────────────

interface Field {
  key: string
  val: React.ReactNode
}

function StudentCard({
  barColor, initials, avatarGradient, name, subtitle, sectionLabel, fields,
}: {
  barColor: string
  initials: string
  avatarGradient: string
  name: string
  subtitle: string
  sectionLabel: string
  fields: Field[]
}) {
  return (
    <div className="bg-white border border-g-200 rounded-card-lg overflow-hidden shadow-card">
      <div className={`h-0.5 w-full ${barColor}`}/>
      <div className="px-4 py-3.5 border-b border-g-100 flex items-center gap-2.5">
        <div className={`w-10 h-10 rounded-[10px] bg-gradient-to-br ${avatarGradient}
          flex items-center justify-center text-white font-extrabold text-sm`}>{initials}</div>
        <div>
          <div className="text-sm font-extrabold text-g-900">{name}</div>
          <div className="font-mono text-xs text-g-400 mt-0.5">{subtitle}</div>
        </div>
      </div>
      <div className="px-4 py-3.5">
        <div className="font-mono text-[9px] text-g-400 tracking-[1.5px] uppercase mb-2.5">{sectionLabel}</div>
        {fields.map(f => (
          <div key={f.key} className="flex justify-between items-center py-2 border-b border-g-100 last:border-0">
            <span className="font-mono text-[10.5px] text-g-400">{f.key}</span>
            <span className="text-sm font-semibold text-g-800">{f.val}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
