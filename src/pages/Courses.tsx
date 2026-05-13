import { COURSES } from '../data/mockData'
import { Badge } from '../components/ui'

export default function Courses() {
  return (
    <div className="animate-fade-up">
      <div className="mb-6">
        <h1 className="text-[26px] font-extrabold text-g-900">Course Seats</h1>
        <p className="text-sm text-g-500 mt-1">Monitor enrollment, seat availability and capacity planning.</p>
      </div>

      {/* Stat cards — gradient style */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-5">
        {[
          { val: '23',    label: 'Total Courses',      gradient: 'from-purple-700 to-[#a78bfa]'   },
          { val: '351',   label: 'Students Needed',    gradient: 'from-[#be185d] to-[#ec4899]'},
          { val: '2,766', label: 'Available Seats',    gradient: 'from-[#0284c7] to-[#38bdf8]'},
          { val: '2,312', label: 'Currently Enrolled', gradient: 'from-amber to-[#fbbf24]'    },
        ].map(c => (
          <div key={c.label}
            className={`rounded-card-lg p-4 bg-gradient-to-br ${c.gradient} text-white`}>
            <div className="text-[28px] font-extrabold leading-none">{c.val}</div>
            <div className="text-xs mt-1 opacity-75">{c.label}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white border border-g-200 rounded-card-lg overflow-hidden">
        <div className="px-5 py-4 border-b border-g-100 flex items-center justify-between flex-wrap gap-3">
          <div>
            <div className="text-sm font-bold text-g-900">Course Enrollment Overview</div>
            <div className="text-xs text-g-400 mt-0.5">Capacity and enrollment breakdown</div>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 text-xs font-semibold bg-white border border-g-200 rounded-card text-g-700 hover:bg-g-50 cursor-pointer transition-colors">
              ↓ Export CSV
            </button>
            <button className="px-3 py-1.5 text-xs font-semibold bg-green text-white rounded-card hover:bg-green-dark cursor-pointer transition-colors">
              ↻ Refresh
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-g-50">
                {['Course Code', 'Students Needed', 'Seats Available', 'Enrolled', 'Sections', 'Fill Rate', 'Status'].map(h => (
                  <th key={h} className="text-left px-3.5 py-2.5 font-mono text-[9.5px] text-g-500 tracking-widest uppercase border-b border-g-200">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COURSES.map(c => (
                <tr key={c.code}
                  className={`transition-colors hover:bg-g-50 ${c.status === 'critical' ? 'bg-[#fff5f5]' : ''}`}>
                  <td className="px-3.5 py-2.5 border-b border-g-100">
                    <div className="flex items-center gap-2">
                      <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-[10px] font-bold
                        ${c.status === 'critical'
                          ? 'bg-red-light text-red'
                          : 'bg-purple-light text-purple'}`}>
                        {c.prefix}
                      </span>
                      <strong className="text-sm text-g-900">{c.code}</strong>
                    </div>
                  </td>
                  <td className="px-3.5 py-2.5 border-b border-g-100 text-sm text-g-700">{c.studentsNeeded}</td>
                  <td className={`px-3.5 py-2.5 border-b border-g-100 text-sm font-bold
                    ${c.seatsAvailable === 0 ? 'text-red-700' : 'text-g-700'}`}>
                    {c.seatsAvailable === 0 ? '0' : c.seatsAvailable}
                  </td>
                  <td className="px-3.5 py-2.5 border-b border-g-100 text-sm text-g-700">{c.enrolled}</td>
                  <td className="px-3.5 py-2.5 border-b border-g-100 text-sm text-g-700">{c.sections || '—'}</td>
                  <td className="px-3.5 py-2.5 border-b border-g-100">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1 bg-g-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${c.fillRate < 30 ? 'bg-red' : 'bg-green'}`}
                          style={{ width: `${c.fillRate}%` }}
                        />
                      </div>
                      <span className="font-mono text-xs text-g-500">{c.enrolled}/{c.seatsAvailable}</span>
                    </div>
                  </td>
                  <td className="px-3.5 py-2.5 border-b border-g-100">
                    {c.status === 'good'     && <Badge variant="green">✓ Good</Badge>}
                    {c.status === 'critical' && <Badge variant="red">⚠ Critical</Badge>}
                    {c.status === 'warning'  && <Badge variant="amber">⚠ Warning</Badge>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
