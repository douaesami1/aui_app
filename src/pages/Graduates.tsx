import { GRADUATES } from '../data/mockData'
import { StatCard, Badge, Card } from '../components/ui'

function chk(v: boolean) {
  return v
    ? <span className="text-green font-bold text-sm">✓</span>
    : <span className="text-g-200 text-sm">—</span>
}

function stageBadge(g: typeof GRADUATES[0]) {
  if (g.coursesRegistered) return <Badge variant="green">Courses Reg.</Badge>
  if (g.roomAssigned)      return <Badge variant="blue">Room Assigned</Badge>
  if (g.feesPaid)          return <Badge variant="purple">Fees Paid</Badge>
  if (g.enrolled)          return <Badge variant="amber">Enrolled</Badge>
  return <Badge variant="gray">Offer Sent</Badge>
}

const journeyRows = [
  { icon: '🎓', label: 'Admitted',             value: 487, pct: 100, color: '#16a34a' },
  { icon: '📨', label: 'Offer Letter Sent',    value: 487, pct: 100, color: '#22c55e' },
  { icon: '✅', label: 'Enrollment Confirmed', value: 341, pct: 70,  color: '#2563eb' },
  { icon: '💳', label: 'Fees Paid',            value: 289, pct: 59,  color: '#7c3aed' },
  { icon: '🏠', label: 'Room Assigned',        value: 204, pct: 42,  color: '#d97706' },
  { icon: '📚', label: 'Courses Registered',   value: 176, pct: 36,  color: '#9ca3af' },
]

const programRows = [
  { label: 'SBA',      value: 220, pct: 75,  color: '#8b5cf6' },
  { label: 'SSE',      value: 156, pct: 53,  color: '#3b82f6' },
  { label: 'SSAH',     value: 111, pct: 38,  color: '#22c55e' },
  { label: 'Freshman', value: 292, pct: 100, color: '#06b6d4' },
  { label: 'Graduate', value: 127, pct: 43,  color: '#f59e0b' },
]

export default function Graduates() {
  return (
    <div className="animate-fade-up">
      <div className="mb-6">
        <h1 className="text-[26px] font-extrabold text-g-900">Admitted Students</h1>
        <p className="text-sm text-g-500 mt-1">
          Track where every admitted student is in their post-admission onboarding journey.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-5">
        <StatCard label="Total Admitted"       value="487" valueColor="text-green"  subtitle="Target: 1,000" progress={48.7} />
        <StatCard label="Enrollment Confirmed" value="341" valueColor="text-blue-500"   subtitle="70% of admitted"/>
        <StatCard label="Fees Paid"            value="289" valueColor="text-purple-500" subtitle="59% of admitted"/>
        <StatCard label="Room Assigned"        value="204" valueColor="text-amber"  subtitle="42% of admitted"/>
      </div>

      {/* Post-Admission Journey + Admitted by Program */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">

        {/* Post-Admission Journey */}
        <Card>
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-base">🧭</span>
              <span className="text-sm font-bold text-g-900">Post-Admission Journey</span>
            </div>
            <div className="text-xs text-g-400">Where are admitted students right now?</div>
          </div>

          <div className="flex flex-col gap-3 mb-4">
            {journeyRows.map(row => (
              <div key={row.label} className="flex items-center gap-2.5">
                <span className="text-sm w-5 flex-shrink-0">{row.icon}</span>
                <div className="w-36 text-xs font-medium text-g-700 flex-shrink-0">{row.label}</div>
                <div className="flex-1 h-3 bg-g-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${row.pct}%`, background: row.color }}
                  />
                </div>
                <div className="font-mono text-xs text-g-500 w-20 text-right flex-shrink-0">
                  {row.value} ({row.pct}%)
                </div>
              </div>
            ))}
          </div>

          {/* Warning */}
          <div className="bg-amber-light border border-amber-border rounded-xl px-4 py-3 text-sm text-g-700 leading-relaxed">
            ⚠️ <strong className="text-g-900">146 students</strong> confirmed enrollment but haven't paid fees yet. Consider sending a reminder.
          </div>
        </Card>

        {/* Admitted by Program */}
        <Card>
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-base">📊</span>
              <span className="text-sm font-bold text-g-900">Admitted by Program</span>
            </div>
            <div className="text-xs text-g-400">Distribution across AUI schools</div>
          </div>

          <div className="flex flex-col gap-3">
            {programRows.map(row => (
              <div key={row.label} className="flex items-center gap-3">
                <div className="w-16 text-xs font-semibold text-g-600 text-right flex-shrink-0">{row.label}</div>
                <div className="flex-1 h-9 bg-g-100 rounded-lg overflow-hidden">
                  <div
                    className="h-full rounded-lg flex items-center pl-3 text-sm font-bold text-white"
                    style={{ width: `${row.pct}%`, background: row.color, minWidth: 56 }}
                  >
                    {row.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Table */}
      <div className="bg-white border border-g-200 rounded-card-lg overflow-hidden">
        <div className="px-5 py-4 border-b border-g-100 flex items-center justify-between flex-wrap gap-3">
          <div>
            <div className="text-sm font-bold text-g-900">Admitted Students List</div>
            <div className="text-xs text-g-400 mt-0.5">Onboarding checkpoint tracker</div>
          </div>
          <button className="px-3 py-1.5 text-xs font-semibold bg-white border border-g-200 rounded-card text-g-700 hover:bg-g-50 cursor-pointer transition-colors">
            ↓ Export CSV
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-g-50">
                {['Student', 'Type · Program', 'AI Score', 'Offer', 'Enrolled', 'Fees', 'Room', 'Stage'].map(h => (
                  <th key={h} className="text-left px-3.5 py-2.5 font-mono text-[9.5px] text-g-500 tracking-widest uppercase border-b border-g-200">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {GRADUATES.map(g => (
                <tr key={g.id} className="hover:bg-g-50 transition-colors">
                  <td className="px-3.5 py-2.5 border-b border-g-100">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
                        style={{ background: g.color }}>
                        {g.initials}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-g-900">{g.name}</div>
                        <div className="font-mono text-[10px] text-g-400">{g.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3.5 py-2.5 border-b border-g-100 text-xs text-g-600">{g.type} · {g.program}</td>
                  <td className="px-3.5 py-2.5 border-b border-g-100">
                    <span className="text-base font-extrabold text-green">{g.score}</span>
                  </td>
                  <td className="px-3.5 py-2.5 border-b border-g-100 text-center">{chk(g.offerSent)}</td>
                  <td className="px-3.5 py-2.5 border-b border-g-100 text-center">{chk(g.enrolled)}</td>
                  <td className="px-3.5 py-2.5 border-b border-g-100 text-center">{chk(g.feesPaid)}</td>
                  <td className="px-3.5 py-2.5 border-b border-g-100 text-center">{chk(g.roomAssigned)}</td>
                  <td className="px-3.5 py-2.5 border-b border-g-100">{stageBadge(g)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
