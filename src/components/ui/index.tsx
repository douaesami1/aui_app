import React from 'react'

// ── Badge ─────────────────────────────────────────────────────────

type BadgeVariant = 'green' | 'amber' | 'red' | 'blue' | 'purple' | 'gray'

const badgeClasses: Record<BadgeVariant, string> = {
  green:  'bg-green-faint text-green-dark border border-green-border',
  amber:  'bg-amber-light text-amber border border-amber-border',
  red:    'bg-red-100 text-red-700 border border-red-border',
  blue:   'bg-blue-light text-blue border border-blue-border',
  purple: 'bg-purple-light text-purple border border-purple-200',
  gray:   'bg-g-100 text-g-600 border border-g-200',
}

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}

export function Badge({ variant = 'gray', children, className = '' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold font-mono ${badgeClasses[variant]} ${className}`}>
      {children}
    </span>
  )
}

// ── Button ────────────────────────────────────────────────────────

type BtnVariant = 'primary' | 'white' | 'ghost' | 'danger' | 'amber'
type BtnSize    = 'sm' | 'md' | 'xs'

const btnVariants: Record<BtnVariant, string> = {
  primary: 'bg-green text-white hover:bg-green-dark',
  white:   'bg-white text-g-700 border border-g-200 hover:bg-g-50',
  ghost:   'bg-g-100 text-g-700 hover:bg-g-200',
  danger:  'bg-red-100 text-red-700 border border-red-border hover:bg-red-border',
  amber:   'bg-amber-light text-amber hover:bg-amber-border',
}
const btnSizes: Record<BtnSize, string> = {
  xs: 'px-2.5 py-1 text-xs',
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-3.5 py-2 text-sm',
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: BtnVariant
  size?: BtnSize
  children: React.ReactNode
}

export function Button({ variant = 'white', size = 'md', children, className = '', ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center gap-1.5 rounded-card font-semibold font-sans transition-all cursor-pointer
        ${btnVariants[variant]} ${btnSizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

// ── Card ──────────────────────────────────────────────────────────

interface CardProps {
  children: React.ReactNode
  className?: string
  padding?: 'normal' | 'sm'
}

export function Card({ children, className = '', padding = 'normal' }: CardProps) {
  const p = padding === 'sm' ? 'p-4' : 'p-5'
  return (
    <div className={`bg-white border border-g-200 rounded-card-lg shadow-card ${p} ${className}`}>
      {children}
    </div>
  )
}

// ── CardHeader ────────────────────────────────────────────────────

interface CardHeaderProps {
  title: string
  icon?: string
  subtitle?: string
  action?: React.ReactNode
}

export function CardHeader({ title, icon, subtitle, action }: CardHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-4 gap-3">
      <div>
        <div className="flex items-center gap-2 text-sm font-bold text-g-900">
          {icon && <span className="text-base">{icon}</span>}
          {title}
        </div>
        {subtitle && <div className="text-xs text-g-400 mt-0.5">{subtitle}</div>}
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}

// ── StatCard ──────────────────────────────────────────────────────

interface StatCardProps {
  label: string
  value: string | number
  valueColor?: string
  subtitle?: string
  trend?: { text: string; type: 'up' | 'down' | 'warn' }
  progress?: number
  progressTarget?: string
  liveIndicator?: boolean
}

const trendColors = { up: 'text-green', down: 'text-red', warn: 'text-amber' }

export function StatCard({ label, value, valueColor, subtitle, trend, progress, progressTarget, liveIndicator }: StatCardProps) {
  return (
    <div className="bg-white border border-g-200 rounded-card-lg p-4 shadow-card hover:shadow-card-md transition-shadow">
      <div className="font-mono text-[9.5px] text-g-400 tracking-widest uppercase mb-2.5">{label}</div>
      <div className={`text-[28px] font-extrabold leading-none mb-1 ${valueColor ?? 'text-g-900'}`}>{value}</div>
      {subtitle && <div className="text-xs text-g-400">{subtitle}</div>}
      {trend && (
        <div className={`text-xs font-semibold mt-1.5 flex items-center gap-1.5 ${trendColors[trend.type]}`}>
          {liveIndicator && <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse-dot inline-block"/>}
          {trend.text}
        </div>
      )}
      {progress !== undefined && (
        <div className="mt-2">
          <div className="flex justify-between text-[10.5px] text-g-400 mb-1">
            <span>Progress</span>
            <span className="font-mono font-bold text-green">{progress}%</span>
          </div>
          <div className="h-1.5 bg-g-100 rounded-full overflow-hidden">
            <div className="h-full bg-green rounded-full" style={{ width: `${progress}%` }} />
          </div>
          {progressTarget && <div className="text-xs text-g-400 mt-0.5">Target: {progressTarget}</div>}
        </div>
      )}
    </div>
  )
}

// ── BarRow (scoring dimensions) ───────────────────────────────────

interface BarRowProps {
  label: string
  value: number
  color?: string
}

export function BarRow({ label, value, color = '#16a34a' }: BarRowProps) {
  return (
    <div className="flex items-center gap-2.5 mb-2">
      <div className="text-xs text-g-600 w-28 flex-shrink-0">{label}</div>
      <div className="flex-1 h-1.5 bg-g-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width: `${value}%`, background: color }} />
      </div>
      <div className="text-xs font-bold text-g-800 w-6 text-right">{value}</div>
    </div>
  )
}

// ── SHAPRow ───────────────────────────────────────────────────────

interface SHAPRowProps {
  label: string
  value: number
  positive: boolean
}

export function SHAPRow({ label, value, positive }: SHAPRowProps) {
  const width = Math.min(Math.abs(value) * 5, 100)
  return (
    <div className="flex items-center gap-2.5 mb-1.5">
      <div className="text-xs text-g-600 w-28 flex-shrink-0">{label}</div>
      <div className="flex-1 h-1 bg-g-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${positive ? 'bg-green' : 'bg-red'}`}
          style={{ width: `${width}%` }}
        />
      </div>
      <div className={`font-mono text-[10px] font-bold w-8 text-right ${positive ? 'text-green' : 'text-red'}`}>
        {positive ? '+' : '−'}{Math.abs(value).toFixed(1)}
      </div>
    </div>
  )
}

// ── FunnelRow ─────────────────────────────────────────────────────

interface FunnelRowProps {
  label: string
  value: string | number
  width: number
  gradient: string
}

export function FunnelRow({ label, value, width, gradient }: FunnelRowProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-xs font-semibold text-g-600 text-right flex-shrink-0 w-24">{label}</div>
      <div className="flex-1 h-8 bg-g-100 rounded-lg overflow-hidden">
        <div
          className="h-full rounded-lg flex items-center pl-3 text-xs font-bold text-white whitespace-nowrap"
          style={{ width: `${width}%`, minWidth: 60, background: gradient }}
        >
          {value}
        </div>
      </div>
    </div>
  )
}

// ── FilterTabs ────────────────────────────────────────────────────

interface FilterTabsProps {
  tabs: { id: string; label: string }[]
  active: string
  onChange: (id: string) => void
}

export function FilterTabs({ tabs, active, onChange }: FilterTabsProps) {
  return (
    <div className="flex gap-1 bg-g-100 rounded-xl p-1 w-fit">
      {tabs.map(t => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all cursor-pointer
            ${active === t.id ? 'bg-white text-g-900 shadow-sm' : 'text-g-600 hover:text-g-900'}`}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}

// ── SearchInput ───────────────────────────────────────────────────

interface SearchInputProps {
  value: string
  onChange: (v: string) => void
  placeholder?: string
}

export function SearchInput({ value, onChange, placeholder = 'Search…' }: SearchInputProps) {
  return (
    <div className="relative flex-1 max-w-xs">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-g-400 text-sm pointer-events-none">🔍</span>
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-8 pr-3 py-2 border border-g-200 rounded-full text-sm font-sans outline-none
          bg-white text-g-800 transition-colors focus:border-green"
      />
    </div>
  )
}

// ── InfoBox variants ──────────────────────────────────────────────

interface InfoBoxProps { children: React.ReactNode; className?: string }

export function InfoBox({ children, className = '' }: InfoBoxProps) {
  return <div className={`bg-blue-light border border-blue-border rounded-xl p-3.5 text-sm text-blue leading-relaxed ${className}`}>{children}</div>
}
export function WarnBox({ children, className = '' }: InfoBoxProps) {
  return <div className={`bg-amber-light border border-amber-border rounded-xl p-3.5 text-sm text-amber-700 leading-relaxed ${className}`}>{children}</div>
}
export function SuccessBox({ children, className = '' }: InfoBoxProps) {
  return <div className={`bg-green-faint border border-green-border rounded-xl p-3.5 text-sm text-green-dark leading-relaxed ${className}`}>{children}</div>
}
