import React, { useState, useMemo } from 'react'
import { Card } from '../components/ui'

// ── Types ─────────────────────────────────────────────────────────

type Year     = '2024-25' | '2023-24' | '2022-23'
type Semester = 'Full Year' | 'Fall' | 'Spring'
type Division = 'All' | 'UG' | 'GR'
type School   = 'All' | 'SBA' | 'SSE' | 'SSAH'

// ── Raw data per year ─────────────────────────────────────────────

const DATA: Record<Year, Record<Semester, {
  total: number; ug: number; gr: number; accuracy: number
  male: number; female: number
  regions: { label: string; value: number; pct: number; color: string }[]
  departments: { label: string; value: number; pct: number; color: string }[]
  sba: number; sse: number; ssah: number
}>> = {
  '2024-25': {
    'Full Year': {
      total: 136132, ug: 116630, gr: 19479, accuracy: 94.2,
      male: 43, female: 57,
      regions: [
        { label: 'Casablanca', value: 43560, pct: 100, color: 'linear-gradient(90deg,#2563eb,#60a5fa)' },
        { label: 'Rabat',      value: 32680, pct: 75,  color: 'linear-gradient(90deg,#16a34a,#4ade80)' },
        { label: 'Marrakech',  value: 24500, pct: 56,  color: 'linear-gradient(90deg,#d97706,#fbbf24)' },
        { label: 'Fès',        value: 19800, pct: 45,  color: 'linear-gradient(90deg,#7c3aed,#a78bfa)' },
        { label: 'Other',      value: 15592, pct: 36,  color: 'linear-gradient(90deg,#9ca3af,#d1d5db)' },
      ],
      departments: [
        { label: 'BSGE',  value: 12455, pct: 100, color: 'linear-gradient(90deg,#3b82f6,#60a5fa)' },
        { label: 'BAIS',  value: 8890,  pct: 71,  color: 'linear-gradient(90deg,#06b6d4,#22d3ee)' },
        { label: 'BSBDA', value: 7200,  pct: 58,  color: 'linear-gradient(90deg,#7c3aed,#a78bfa)' },
        { label: 'PMBA',  value: 3900,  pct: 31,  color: 'linear-gradient(90deg,#16a34a,#4ade80)' },
        { label: 'MSCYB', value: 2850,  pct: 23,  color: 'linear-gradient(90deg,#d97706,#fbbf24)' },
      ],
      sba: 220, sse: 156, ssah: 111,
    },
    'Fall': {
      total: 72400, ug: 62100, gr: 10300, accuracy: 93.8,
      male: 44, female: 56,
      regions: [
        { label: 'Casablanca', value: 23100, pct: 100, color: 'linear-gradient(90deg,#2563eb,#60a5fa)' },
        { label: 'Rabat',      value: 17300, pct: 75,  color: 'linear-gradient(90deg,#16a34a,#4ade80)' },
        { label: 'Marrakech',  value: 13000, pct: 56,  color: 'linear-gradient(90deg,#d97706,#fbbf24)' },
        { label: 'Fès',        value: 10500, pct: 45,  color: 'linear-gradient(90deg,#7c3aed,#a78bfa)' },
        { label: 'Other',      value: 8500,  pct: 37,  color: 'linear-gradient(90deg,#9ca3af,#d1d5db)' },
      ],
      departments: [
        { label: 'BSGE',  value: 6800, pct: 100, color: 'linear-gradient(90deg,#3b82f6,#60a5fa)' },
        { label: 'BAIS',  value: 4900, pct: 72,  color: 'linear-gradient(90deg,#06b6d4,#22d3ee)' },
        { label: 'BSBDA', value: 3900, pct: 57,  color: 'linear-gradient(90deg,#7c3aed,#a78bfa)' },
        { label: 'PMBA',  value: 2100, pct: 31,  color: 'linear-gradient(90deg,#16a34a,#4ade80)' },
        { label: 'MSCYB', value: 1500, pct: 22,  color: 'linear-gradient(90deg,#d97706,#fbbf24)' },
      ],
      sba: 120, sse: 85, ssah: 60,
    },
    'Spring': {
      total: 63732, ug: 54530, gr: 9179, accuracy: 94.7,
      male: 42, female: 58,
      regions: [
        { label: 'Casablanca', value: 20460, pct: 100, color: 'linear-gradient(90deg,#2563eb,#60a5fa)' },
        { label: 'Rabat',      value: 15380, pct: 75,  color: 'linear-gradient(90deg,#16a34a,#4ade80)' },
        { label: 'Marrakech',  value: 11500, pct: 56,  color: 'linear-gradient(90deg,#d97706,#fbbf24)' },
        { label: 'Fès',        value: 9300,  pct: 45,  color: 'linear-gradient(90deg,#7c3aed,#a78bfa)' },
        { label: 'Other',      value: 7092,  pct: 35,  color: 'linear-gradient(90deg,#9ca3af,#d1d5db)' },
      ],
      departments: [
        { label: 'BSGE',  value: 5655, pct: 100, color: 'linear-gradient(90deg,#3b82f6,#60a5fa)' },
        { label: 'BAIS',  value: 3990, pct: 71,  color: 'linear-gradient(90deg,#06b6d4,#22d3ee)' },
        { label: 'BSBDA', value: 3300, pct: 58,  color: 'linear-gradient(90deg,#7c3aed,#a78bfa)' },
        { label: 'PMBA',  value: 1800, pct: 32,  color: 'linear-gradient(90deg,#16a34a,#4ade80)' },
        { label: 'MSCYB', value: 1350, pct: 24,  color: 'linear-gradient(90deg,#d97706,#fbbf24)' },
      ],
      sba: 100, sse: 71, ssah: 51,
    },
  },
  '2023-24': {
    'Full Year': {
      total: 125700, ug: 107500, gr: 18200, accuracy: 92.1,
      male: 45, female: 55,
      regions: [
        { label: 'Casablanca', value: 40200, pct: 100, color: 'linear-gradient(90deg,#2563eb,#60a5fa)' },
        { label: 'Rabat',      value: 30100, pct: 75,  color: 'linear-gradient(90deg,#16a34a,#4ade80)' },
        { label: 'Marrakech',  value: 22600, pct: 56,  color: 'linear-gradient(90deg,#d97706,#fbbf24)' },
        { label: 'Fès',        value: 18300, pct: 46,  color: 'linear-gradient(90deg,#7c3aed,#a78bfa)' },
        { label: 'Other',      value: 14500, pct: 36,  color: 'linear-gradient(90deg,#9ca3af,#d1d5db)' },
      ],
      departments: [
        { label: 'BSGE',  value: 11200, pct: 100, color: 'linear-gradient(90deg,#3b82f6,#60a5fa)' },
        { label: 'BAIS',  value: 8100,  pct: 72,  color: 'linear-gradient(90deg,#06b6d4,#22d3ee)' },
        { label: 'BSBDA', value: 6600,  pct: 59,  color: 'linear-gradient(90deg,#7c3aed,#a78bfa)' },
        { label: 'PMBA',  value: 3500,  pct: 31,  color: 'linear-gradient(90deg,#16a34a,#4ade80)' },
        { label: 'MSCYB', value: 2500,  pct: 22,  color: 'linear-gradient(90deg,#d97706,#fbbf24)' },
      ],
      sba: 198, sse: 141, ssah: 103,
    },
    'Fall': {
      total: 66800, ug: 57200, gr: 9600, accuracy: 91.8,
      male: 46, female: 54,
      regions: [
        { label: 'Casablanca', value: 21300, pct: 100, color: 'linear-gradient(90deg,#2563eb,#60a5fa)' },
        { label: 'Rabat',      value: 15900, pct: 75,  color: 'linear-gradient(90deg,#16a34a,#4ade80)' },
        { label: 'Marrakech',  value: 12000, pct: 56,  color: 'linear-gradient(90deg,#d97706,#fbbf24)' },
        { label: 'Fès',        value: 9700,  pct: 46,  color: 'linear-gradient(90deg,#7c3aed,#a78bfa)' },
        { label: 'Other',      value: 7900,  pct: 37,  color: 'linear-gradient(90deg,#9ca3af,#d1d5db)' },
      ],
      departments: [
        { label: 'BSGE',  value: 6000, pct: 100, color: 'linear-gradient(90deg,#3b82f6,#60a5fa)' },
        { label: 'BAIS',  value: 4300, pct: 72,  color: 'linear-gradient(90deg,#06b6d4,#22d3ee)' },
        { label: 'BSBDA', value: 3500, pct: 58,  color: 'linear-gradient(90deg,#7c3aed,#a78bfa)' },
        { label: 'PMBA',  value: 1900, pct: 32,  color: 'linear-gradient(90deg,#16a34a,#4ade80)' },
        { label: 'MSCYB', value: 1300, pct: 22,  color: 'linear-gradient(90deg,#d97706,#fbbf24)' },
      ],
      sba: 105, sse: 75, ssah: 55,
    },
    'Spring': {
      total: 58900, ug: 50300, gr: 8600, accuracy: 92.4,
      male: 44, female: 56,
      regions: [
        { label: 'Casablanca', value: 18900, pct: 100, color: 'linear-gradient(90deg,#2563eb,#60a5fa)' },
        { label: 'Rabat',      value: 14200, pct: 75,  color: 'linear-gradient(90deg,#16a34a,#4ade80)' },
        { label: 'Marrakech',  value: 10600, pct: 56,  color: 'linear-gradient(90deg,#d97706,#fbbf24)' },
        { label: 'Fès',        value: 8600,  pct: 45,  color: 'linear-gradient(90deg,#7c3aed,#a78bfa)' },
        { label: 'Other',      value: 6600,  pct: 35,  color: 'linear-gradient(90deg,#9ca3af,#d1d5db)' },
      ],
      departments: [
        { label: 'BSGE',  value: 5200, pct: 100, color: 'linear-gradient(90deg,#3b82f6,#60a5fa)' },
        { label: 'BAIS',  value: 3800, pct: 73,  color: 'linear-gradient(90deg,#06b6d4,#22d3ee)' },
        { label: 'BSBDA', value: 3100, pct: 60,  color: 'linear-gradient(90deg,#7c3aed,#a78bfa)' },
        { label: 'PMBA',  value: 1600, pct: 31,  color: 'linear-gradient(90deg,#16a34a,#4ade80)' },
        { label: 'MSCYB', value: 1200, pct: 23,  color: 'linear-gradient(90deg,#d97706,#fbbf24)' },
      ],
      sba: 93, sse: 66, ssah: 48,
    },
  },
  '2022-23': {
    'Full Year': {
      total: 115900, ug: 99100, gr: 16800, accuracy: 90.3,
      male: 47, female: 53,
      regions: [
        { label: 'Casablanca', value: 37100, pct: 100, color: 'linear-gradient(90deg,#2563eb,#60a5fa)' },
        { label: 'Rabat',      value: 27800, pct: 75,  color: 'linear-gradient(90deg,#16a34a,#4ade80)' },
        { label: 'Marrakech',  value: 20800, pct: 56,  color: 'linear-gradient(90deg,#d97706,#fbbf24)' },
        { label: 'Fès',        value: 16900, pct: 46,  color: 'linear-gradient(90deg,#7c3aed,#a78bfa)' },
        { label: 'Other',      value: 13300, pct: 36,  color: 'linear-gradient(90deg,#9ca3af,#d1d5db)' },
      ],
      departments: [
        { label: 'BSGE',  value: 10300, pct: 100, color: 'linear-gradient(90deg,#3b82f6,#60a5fa)' },
        { label: 'BAIS',  value: 7400,  pct: 72,  color: 'linear-gradient(90deg,#06b6d4,#22d3ee)' },
        { label: 'BSBDA', value: 6100,  pct: 59,  color: 'linear-gradient(90deg,#7c3aed,#a78bfa)' },
        { label: 'PMBA',  value: 3200,  pct: 31,  color: 'linear-gradient(90deg,#16a34a,#4ade80)' },
        { label: 'MSCYB', value: 2300,  pct: 22,  color: 'linear-gradient(90deg,#d97706,#fbbf24)' },
      ],
      sba: 180, sse: 130, ssah: 95,
    },
    'Fall': {
      total: 61400, ug: 52500, gr: 8900, accuracy: 90.0,
      male: 48, female: 52,
      regions: [
        { label: 'Casablanca', value: 19700, pct: 100, color: 'linear-gradient(90deg,#2563eb,#60a5fa)' },
        { label: 'Rabat',      value: 14700, pct: 75,  color: 'linear-gradient(90deg,#16a34a,#4ade80)' },
        { label: 'Marrakech',  value: 11000, pct: 56,  color: 'linear-gradient(90deg,#d97706,#fbbf24)' },
        { label: 'Fès',        value: 9000,  pct: 46,  color: 'linear-gradient(90deg,#7c3aed,#a78bfa)' },
        { label: 'Other',      value: 7000,  pct: 36,  color: 'linear-gradient(90deg,#9ca3af,#d1d5db)' },
      ],
      departments: [
        { label: 'BSGE',  value: 5500, pct: 100, color: 'linear-gradient(90deg,#3b82f6,#60a5fa)' },
        { label: 'BAIS',  value: 4000, pct: 73,  color: 'linear-gradient(90deg,#06b6d4,#22d3ee)' },
        { label: 'BSBDA', value: 3200, pct: 58,  color: 'linear-gradient(90deg,#7c3aed,#a78bfa)' },
        { label: 'PMBA',  value: 1700, pct: 31,  color: 'linear-gradient(90deg,#16a34a,#4ade80)' },
        { label: 'MSCYB', value: 1200, pct: 22,  color: 'linear-gradient(90deg,#d97706,#fbbf24)' },
      ],
      sba: 96, sse: 69, ssah: 50,
    },
    'Spring': {
      total: 54500, ug: 46600, gr: 7900, accuracy: 90.6,
      male: 46, female: 54,
      regions: [
        { label: 'Casablanca', value: 17400, pct: 100, color: 'linear-gradient(90deg,#2563eb,#60a5fa)' },
        { label: 'Rabat',      value: 13100, pct: 75,  color: 'linear-gradient(90deg,#16a34a,#4ade80)' },
        { label: 'Marrakech',  value: 9800,  pct: 56,  color: 'linear-gradient(90deg,#d97706,#fbbf24)' },
        { label: 'Fès',        value: 7900,  pct: 45,  color: 'linear-gradient(90deg,#7c3aed,#a78bfa)' },
        { label: 'Other',      value: 6300,  pct: 36,  color: 'linear-gradient(90deg,#9ca3af,#d1d5db)' },
      ],
      departments: [
        { label: 'BSGE',  value: 4800, pct: 100, color: 'linear-gradient(90deg,#3b82f6,#60a5fa)' },
        { label: 'BAIS',  value: 3400, pct: 71,  color: 'linear-gradient(90deg,#06b6d4,#22d3ee)' },
        { label: 'BSBDA', value: 2900, pct: 60,  color: 'linear-gradient(90deg,#7c3aed,#a78bfa)' },
        { label: 'PMBA',  value: 1500, pct: 31,  color: 'linear-gradient(90deg,#16a34a,#4ade80)' },
        { label: 'MSCYB', value: 1100, pct: 23,  color: 'linear-gradient(90deg,#d97706,#fbbf24)' },
      ],
      sba: 84, sse: 61, ssah: 45,
    },
  },
}

// ── Filter Pill ───────────────────────────────────────────────────

function FilterPill<T extends string>({
  label, options, value, onChange,
}: {
  label: string
  options: T[]
  value: T
  onChange: (v: T) => void
}) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="font-mono text-[10px] text-g-400 tracking-widest uppercase flex-shrink-0">{label}</span>
      <div className="flex gap-1 bg-g-100 rounded-lg p-0.5">
        {options.map(opt => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer border-none
              ${value === opt
                ? 'bg-white text-g-900 shadow-sm'
                : 'bg-transparent text-g-500 hover:text-g-800'}`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}

// ── Stat Box ──────────────────────────────────────────────────────

function StatBox({ label, value, color, sub }: { label: string; value: string; color: string; sub: string }) {
  return (
    <div className="bg-white border border-g-200 rounded-card-lg p-4 shadow-card">
      <div className="font-mono text-[9px] text-g-400 tracking-widest uppercase mb-2">{label}</div>
      <div className="text-[28px] font-extrabold leading-none mb-1" style={{ color }}>{value}</div>
      <div className="text-xs text-g-400">{sub}</div>
    </div>
  )
}

// ── YoY delta badge ───────────────────────────────────────────────

function Delta({ current, previous, unit = '' }: { current: number; previous: number; unit?: string }) {
  const diff = current - previous
  const pct  = previous > 0 ? ((diff / previous) * 100).toFixed(1) : '0'
  const up   = diff >= 0
  return (
    <span className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded-full
      ${up ? 'bg-green-faint text-green-dark' : 'bg-red-light text-red'}`}>
      {up ? '↑' : '↓'} {Math.abs(Number(pct))}%{unit}
    </span>
  )
}

// ── Main Analytics Page ───────────────────────────────────────────

export function Analytics() {
  const [year,     setYear]     = useState<Year>('2024-25')
  const [semester, setSemester] = useState<Semester>('Full Year')
  const [division, setDivision] = useState<Division>('All')
  const [school,   setSchool]   = useState<School>('All')

  const d = useMemo(() => DATA[year][semester], [year, semester])

  // Previous year for YoY comparison
  const prevYear  = year === '2024-25' ? '2023-24' : year === '2023-24' ? '2022-23' : null
  const prevData  = prevYear ? DATA[prevYear][semester] : null

  // Division filter on total
  const filteredTotal = division === 'UG' ? d.ug
                      : division === 'GR' ? d.gr
                      : d.total

  // School admitted filter
  const admittedBySchool = school === 'SBA'  ? d.sba
                         : school === 'SSE'  ? d.sse
                         : school === 'SSAH' ? d.ssah
                         : d.sba + d.sse + d.ssah

  const activeFiltersCount = [
    year !== '2024-25',
    semester !== 'Full Year',
    division !== 'All',
    school !== 'All',
  ].filter(Boolean).length

  const resetFilters = () => {
    setYear('2024-25'); setSemester('Full Year')
    setDivision('All'); setSchool('All')
  }

  return (
    <div className="animate-fade-up">
      {/* Page header */}
      <div className="mb-5">
        <h1 className="text-[26px] font-extrabold text-g-900">Analytics Dashboard</h1>
        <p className="text-sm text-g-500 mt-1">
          Comprehensive data analysis across {d.total.toLocaleString()} candidate records.
        </p>
      </div>

      {/* ── Filter Bar ── */}
      <div className="bg-white border border-g-200 rounded-card-lg px-4 py-3 mb-5 flex flex-wrap items-center gap-4 shadow-card">
        <FilterPill<Year>
          label="Year"
          options={['2024-25', '2023-24', '2022-23']}
          value={year}
          onChange={setYear}
        />
        <div className="w-px h-5 bg-g-200 hidden sm:block"/>
        <FilterPill<Semester>
          label="Semester"
          options={['Full Year', 'Fall', 'Spring']}
          value={semester}
          onChange={setSemester}
        />
        <div className="w-px h-5 bg-g-200 hidden sm:block"/>
        <FilterPill<Division>
          label="Division"
          options={['All', 'UG', 'GR']}
          value={division}
          onChange={setDivision}
        />
        <div className="w-px h-5 bg-g-200 hidden sm:block"/>
        <FilterPill<School>
          label="School"
          options={['All', 'SBA', 'SSE', 'SSAH']}
          value={school}
          onChange={setSchool}
        />
        {activeFiltersCount > 0 && (
          <button
            onClick={resetFilters}
            className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold
              bg-g-100 text-g-600 hover:bg-g-200 border-none cursor-pointer transition-colors"
          >
            ✕ Reset ({activeFiltersCount})
          </button>
        )}
      </div>

      {/* Active filter summary */}
      {(year !== '2024-25' || semester !== 'Full Year' || division !== 'All' || school !== 'All') && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {year !== '2024-25' && (
            <span className="bg-blue-light text-blue border border-blue-border font-mono text-[10px] font-bold px-2 py-0.5 rounded-full">
              {year}
            </span>
          )}
          {semester !== 'Full Year' && (
            <span className="bg-purple-light text-purple border border-purple-200 font-mono text-[10px] font-bold px-2 py-0.5 rounded-full">
              {semester}
            </span>
          )}
          {division !== 'All' && (
            <span className="bg-green-faint text-green-dark border border-green-border font-mono text-[10px] font-bold px-2 py-0.5 rounded-full">
              {division} Division
            </span>
          )}
          {school !== 'All' && (
            <span className="bg-amber-light text-amber border border-amber-border font-mono text-[10px] font-bold px-2 py-0.5 rounded-full">
              {school}
            </span>
          )}
        </div>
      )}

      {/* Top stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-5">
        <div className="bg-white border border-g-200 rounded-card-lg p-4 shadow-card">
          <div className="font-mono text-[9px] text-g-400 tracking-widest uppercase mb-2">
            {division === 'All' ? 'Total Candidates' : division === 'UG' ? 'UG Candidates' : 'GR Candidates'}
          </div>
          <div className="text-[28px] font-extrabold text-blue-500 leading-none mb-1">
            {filteredTotal.toLocaleString()}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-g-400">{year} · {semester}</span>
            {prevData && division === 'All' && (
              <Delta current={d.total} previous={prevData.total}/>
            )}
          </div>
        </div>

        <div className="bg-white border border-g-200 rounded-card-lg p-4 shadow-card">
          <div className="font-mono text-[9px] text-g-400 tracking-widest uppercase mb-2">Undergraduate</div>
          <div className="text-[28px] font-extrabold leading-none mb-1" style={{ color: '#7c3aed' }}>
            {d.ug.toLocaleString()}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-g-400">{Math.round(d.ug / d.total * 100)}% of total</span>
            {prevData && <Delta current={d.ug} previous={prevData.ug}/>}
          </div>
        </div>

        <div className="bg-white border border-g-200 rounded-card-lg p-4 shadow-card">
          <div className="font-mono text-[9px] text-g-400 tracking-widest uppercase mb-2">Graduate</div>
          <div className="text-[28px] font-extrabold text-green leading-none mb-1">
            {d.gr.toLocaleString()}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-g-400">{Math.round(d.gr / d.total * 100)}% of total</span>
            {prevData && <Delta current={d.gr} previous={prevData.gr}/>}
          </div>
        </div>

        <div className="bg-white border border-g-200 rounded-card-lg p-4 shadow-card">
          <div className="font-mono text-[9px] text-g-400 tracking-widest uppercase mb-2">Model Accuracy</div>
          <div className="text-[28px] font-extrabold text-amber leading-none mb-1">
            {d.accuracy}%
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-g-400">Validated holdout set</span>
            {prevData && <Delta current={d.accuracy} previous={prevData.accuracy} unit="%"/>}
          </div>
        </div>
      </div>

      {/* Gender + Division */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        {/* Gender Distribution */}
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-base">👥</span>
            <span className="text-sm font-bold text-g-900">Gender Distribution</span>
            {prevData && d.male !== prevData.male && (
              <span className="ml-auto font-mono text-[10px] text-g-400">
                vs {prevYear}: ♂ {prevData.male}% / ♀ {prevData.female}%
              </span>
            )}
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="rounded-xl p-4 text-center" style={{ background: '#eff6ff' }}>
              <div className="text-sm font-semibold mb-1" style={{ color: '#2563eb' }}>Male</div>
              <div className="text-[32px] font-extrabold leading-none" style={{ color: '#2563eb' }}>{d.male}%</div>
              <div className="text-xs text-g-400 mt-1">{Math.round(filteredTotal * d.male / 100).toLocaleString()}</div>
            </div>
            <div className="rounded-xl p-4 text-center" style={{ background: '#fdf2f8' }}>
              <div className="text-sm font-semibold mb-1" style={{ color: '#db2777' }}>Female</div>
              <div className="text-[32px] font-extrabold leading-none" style={{ color: '#db2777' }}>{d.female}%</div>
              <div className="text-xs text-g-400 mt-1">{Math.round(filteredTotal * d.female / 100).toLocaleString()}</div>
            </div>
          </div>
          <div className="h-3 rounded-full overflow-hidden flex">
            <div className="h-full transition-all duration-500" style={{ width: `${d.male}%`, background: '#2563eb' }}/>
            <div className="h-full transition-all duration-500" style={{ width: `${d.female}%`, background: '#db2777' }}/>
          </div>
        </Card>

        {/* Division Breakdown */}
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-base">📐</span>
            <span className="text-sm font-bold text-g-900">Division Breakdown</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl p-4 text-center" style={{ background: '#f5f3ff' }}>
              <div className="font-mono text-xs font-bold mb-1" style={{ color: '#7c3aed' }}>UG</div>
              <div className="text-[28px] font-extrabold leading-none" style={{ color: '#7c3aed' }}>
                {Math.round(d.ug / d.total * 100)}%
              </div>
              <div className="text-xs text-g-400 mt-1">{d.ug.toLocaleString()}</div>
            </div>
            <div className="rounded-xl p-4 text-center" style={{ background: '#eff6ff' }}>
              <div className="font-mono text-xs font-bold mb-1" style={{ color: '#2563eb' }}>GR</div>
              <div className="text-[28px] font-extrabold leading-none" style={{ color: '#2563eb' }}>
                {Math.round(d.gr / d.total * 100)}%
              </div>
              <div className="text-xs text-g-400 mt-1">{d.gr.toLocaleString()}</div>
            </div>
            <div className="rounded-xl p-4 text-center" style={{ background: '#f0fdf4' }}>
              <div className="font-mono text-xs font-bold mb-1" style={{ color: '#16a34a' }}>LC</div>
              <div className="text-[28px] font-extrabold leading-none" style={{ color: '#16a34a' }}>0%</div>
              <div className="text-xs text-g-400 mt-1">22</div>
            </div>
            <div className="rounded-xl p-4 text-center bg-g-50">
              <div className="font-mono text-xs font-bold mb-1 text-g-500">AR</div>
              <div className="text-[28px] font-extrabold leading-none text-g-500">0%</div>
              <div className="text-xs text-g-400 mt-1">1</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Admitted by School */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
        {[
          { label: 'SBA', value: d.sba, color: '#7c3aed', bg: '#f5f3ff', desc: 'Business & Admin' },
          { label: 'SSE', value: d.sse, color: '#2563eb', bg: '#eff6ff', desc: 'Science & Eng.' },
          { label: 'SSAH', value: d.ssah, color: '#16a34a', bg: '#f0fdf4', desc: 'Arts & Humanities' },
        ].map(s => {
          const isActive = school === 'All' || school === s.label
          return (
            <button
              key={s.label}
              onClick={() => setSchool(school === s.label ? 'All' : s.label as School)}
              className={`rounded-card-lg p-4 text-left border-2 cursor-pointer transition-all
                ${school === s.label ? 'border-current shadow-card-md' : 'border-transparent hover:border-g-200'}`}
              style={{ background: s.bg, borderColor: school === s.label ? s.color : undefined, opacity: isActive ? 1 : 0.5 }}
            >
              <div className="font-mono text-xs font-bold mb-1" style={{ color: s.color }}>{s.label}</div>
              <div className="text-[28px] font-extrabold leading-none mb-1" style={{ color: s.color }}>
                {s.value}
              </div>
              <div className="text-xs text-g-500">{s.desc} · admitted</div>
              {prevData && (
                <div className="mt-2">
                  <Delta
                    current={s.label === 'SBA' ? d.sba : s.label === 'SSE' ? d.sse : d.ssah}
                    previous={s.label === 'SBA' ? prevData.sba : s.label === 'SSE' ? prevData.sse : prevData.ssah}
                  />
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Region + Department side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Top Regions */}
        <Card>
          <div className="flex items-center gap-2 mb-5">
            <span className="text-base">🌍</span>
            <span className="text-sm font-bold text-g-900">Top Source Regions</span>
            <span className="ml-auto font-mono text-[10px] text-g-400">{year} · {semester}</span>
          </div>
          <div className="flex flex-col gap-3">
            {d.regions.map(row => (
              <div key={row.label} className="flex items-center gap-3">
                <div className="w-24 text-xs font-semibold text-g-600 text-right flex-shrink-0">{row.label}</div>
                <div className="flex-1 h-8 bg-g-100 rounded-lg overflow-hidden">
                  <div
                    className="h-full rounded-lg flex items-center pl-3 text-xs font-bold text-white transition-all duration-500"
                    style={{ width: `${row.pct}%`, background: row.color, minWidth: 60 }}
                  >
                    {row.value.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Course Enrollment by Department */}
        <Card>
          <div className="flex items-center gap-2 mb-5">
            <span className="text-base">📊</span>
            <span className="text-sm font-bold text-g-900">Course Enrollment by Dept.</span>
            <span className="ml-auto font-mono text-[10px] text-g-400">{year} · {semester}</span>
          </div>
          <div className="flex flex-col gap-3">
            {d.departments.map(row => (
              <div key={row.label} className="flex items-center gap-3">
                <div className="w-16 text-xs font-semibold text-g-600 text-right flex-shrink-0">{row.label}</div>
                <div className="flex-1 h-10 bg-g-100 rounded-xl overflow-hidden">
                  <div
                    className="h-full rounded-xl flex items-center pl-3 text-sm font-bold text-white transition-all duration-500"
                    style={{ width: `${row.pct}%`, background: row.color, minWidth: 70 }}
                  >
                    {row.value.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
