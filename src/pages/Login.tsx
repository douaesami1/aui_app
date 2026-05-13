import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

// ── Types ────────────────────────────────────────────────────────

type UserRole = 'officer' | 'committee' | 'admin' | 'student'

interface RoleOption {
  id: UserRole
  icon: string
  label: string
}

// ── Data ─────────────────────────────────────────────────────────

const ROLES: RoleOption[] = [
  { id: 'officer',   icon: '👔', label: 'Admissions Officer' },
  { id: 'committee', icon: '🏛️', label: 'Committee Member'   },
  { id: 'admin',     icon: '👑', label: 'Admin'              },
  { id: 'student',   icon: '🎓', label: 'Student'            },
]

// ── Sub-components ───────────────────────────────────────────────

function RoleCard({
  option,
  selected,
  onSelect,
}: {
  option: RoleOption
  selected: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`
        p-2.5 border-[1.5px] rounded-card bg-white cursor-pointer
        transition-all text-center w-full
        ${selected
          ? 'border-green bg-green-faint'
          : 'border-g-200 hover:border-green hover:bg-green-faint'}
      `}
    >
      <div className="text-[18px] mb-1">{option.icon}</div>
      <div className={`text-[11.5px] font-bold ${selected ? 'text-green-dark' : 'text-g-700'}`}>
        {option.label}
      </div>
    </button>
  )
}

// ── Page ─────────────────────────────────────────────────────────

export function Login() {
  const navigate = useNavigate()

  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [role,     setRole]     = useState<UserRole>('officer')
  const [showPass, setShowPass] = useState(false)
  const [error,    setError]    = useState<string | null>(null)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)

    if (!email || !password) {
      setError('Please fill in all fields.')
      return
    }

    // ✅ Navigate directly to dashboard — replace with real auth later
    navigate('/overview', { replace: true })
  }

  return (
    <div className="min-h-screen bg-g-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-[440px]">

        {/* Logo */}
        <div className="flex items-center justify-center gap-2.5 mb-8">
          <div className="w-10 h-10 bg-green rounded-[11px] flex items-center justify-center text-white font-extrabold text-sm tracking-tight flex-shrink-0">
            IQ
          </div>
          <div>
            <div className="text-xl font-extrabold text-g-900 leading-none">AdmitIQ</div>
            <div className="font-mono text-[9px] text-g-400 tracking-[2px] uppercase mt-0.5">
              Al Akhawayn University
            </div>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white border border-g-200 rounded-[18px] px-9 py-8 shadow-lg">

          <div className="mb-7">
            <h1 className="text-[22px] font-extrabold text-g-900 mb-1.5">Welcome back</h1>
            <p className="text-[13.5px] text-g-500 leading-relaxed">
              Sign in to your admissions dashboard.
            </p>
          </div>

          {/* Error banner */}
          {error && (
            <div className="flex items-center gap-2 bg-red-light border border-red-border rounded-card px-3.5 py-2.5 text-[12.5px] font-semibold text-red mb-5">
              <span>⚠</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>

            {/* Email */}
            <div className="mb-[18px]">
              <label className="block text-xs font-bold text-g-700 mb-1.5">
                Email address
              </label>
              <input
                type="email"
                placeholder="you@aui.ma"
                value={email}
                onChange={e => { setEmail(e.target.value); setError(null) }}
                className="
                  w-full h-[42px] border-[1.5px] border-g-200 rounded-card
                  px-3.5 text-[13.5px] text-g-800 bg-white outline-none
                  transition-all placeholder:text-g-300
                  focus:border-green focus:shadow-[0_0_0_3px_rgba(22,163,74,0.10)]
                "
              />
            </div>

            {/* Password */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-g-700">Password</label>
                <a href="#" className="text-[11.5px] font-semibold text-green hover:text-green-dark">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(null) }}
                  className="
                    w-full h-[42px] border-[1.5px] border-g-200 rounded-card
                    px-3.5 pr-10 text-[13.5px] text-g-800 bg-white outline-none
                    transition-all placeholder:text-g-300
                    focus:border-green focus:shadow-[0_0_0_3px_rgba(22,163,74,0.10)]
                  "
                />
                <button
                  type="button"
                  onClick={() => setShowPass(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-g-400 hover:text-g-600 text-[15px] border-none bg-transparent cursor-pointer"
                >
                  {showPass ? '🙈' : '👁'}
                </button>
              </div>
            </div>

            {/* Role selector */}
            <div className="mb-5">
              <div className="font-mono text-[9.5px] text-g-400 tracking-[1.2px] uppercase mb-2">
                Sign in as
              </div>
              <div className="grid grid-cols-2 gap-2">
                {ROLES.map(r => (
                  <RoleCard
                    key={r.id}
                    option={r}
                    selected={role === r.id}
                    onSelect={() => { setRole(r.id); setError(null) }}
                  />
                ))}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="
                w-full h-11 bg-green hover:bg-green-dark
                text-white font-bold text-[14px] rounded-card
                flex items-center justify-center gap-2
                transition-all cursor-pointer border-none mt-1
              "
            >
              Sign in <span className="text-base">→</span>
            </button>

          </form>

        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-g-400">
          Protected by AUI IT Security · v2.4
        </div>

      </div>
    </div>
  )
}