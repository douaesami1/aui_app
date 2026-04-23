import { StatCard, Card, CardHeader, FunnelRow } from '../components/ui'



const pipelineSteps = [

  { label: 'Submitted', done: true  },

  { label: 'Pre-Screen', done: true  },

  { label: 'AI Scoring', done: false, active: true },

  { label: 'Review',    done: false },

  { label: 'Committee Decision', done: false },

  { label: 'Admitted',  done: false },

]



export default function Dashboard() {

  return (

    <div className="animate-fade-up">

      {/* Page Header */}

      <div className="mb-6">

        <div className="font-mono text-[10px] text-g-400 tracking-[1.5px] uppercase mb-1.5">

          Al Akhawayn University · Ifrane

        </div>

        <h1 className="text-[26px] font-extrabold text-g-900 leading-tight">

          AI-Powered Admissions<br />

          <span className="text-green">Decision Platform</span>

        </h1>

        <p className="text-sm text-g-500 mt-1.5 leading-relaxed">

          Predictive scoring engine — from 100,000+ applications down to 1,000 admitted students,

          with full XAI explainability and fairness auditing.

        </p>

      </div>



      {/* Quick Actions */}

      <div className="flex gap-2 flex-wrap mb-7">

        <button className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold

          bg-green text-white border-none cursor-pointer hover:bg-green-dark transition-colors">

          <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse-dot"/>

          Live Pipeline

        </button>

        {['📋 Review Queue (312)', '📊 Cycle Report', '⚖️ Fairness Audit', '↓ Export Admitted'].map(label => (

          <button key={label} className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold

            bg-white border-[1.5px] border-g-200 text-g-700 cursor-pointer hover:border-green hover:text-green transition-colors">

            {label}

          </button>

        ))}

      </div>



      {/* Stat Cards */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-5">

        <StatCard

          label="Annual Applications"

          value="100,247"

          valueColor="text-blue-500"

          subtitle="2025–2026 cycle"

          trend={{ text: '↑ +8.3% vs last year', type: 'up' }}

        />

        <StatCard

          label="AI Scored Today"

          value="3,842"

          valueColor="text-green"

          subtitle="In pipeline · live"

          trend={{ text: 'Running', type: 'up' }}

          liveIndicator

        />

        <StatCard

          label="Pending Human Review"

          value="312"

          valueColor="text-amber"

          subtitle="Awaiting officers"

          trend={{ text: '⚠ 48 overdue', type: 'warn' }}

        />

        <StatCard

          label="Admitted This Cycle"

          value="487"

          valueColor="text-green-dark"

          subtitle="Target: 1,000"

          progress={48.7}


        />

      </div>



      {/* Pipeline + Funnel */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">

        {/* Pipeline */}

        <Card>

          <CardHeader title="Admissions Pipeline" icon="⚡" subtitle="Real-time flow · 2025–2026"/>

          <div className="flex items-center overflow-x-auto pb-1 mb-4">

            {pipelineSteps.map((step, i) => (

              <div key={step.label} className="flex-1 text-center relative min-w-[70px]">

                {i < pipelineSteps.length - 1 && (

                  <div className={`absolute right-[-50%] top-3.5 w-full h-0.5 ${step.done ? 'bg-green' : 'bg-g-200'}`}/>

                )}

                <div className={`w-7 h-7 rounded-full mx-auto mb-1.5 flex items-center justify-center text-xs font-bold relative z-10

                  ${step.done   ? 'bg-green text-white'

                  : step.active ? 'bg-white border-2 border-green text-green'

                  :               'bg-g-100 border-2 border-g-200 text-g-400'}`}>

                  {step.done ? '✓' : i + 1}

                </div>

                <div className={`text-[10px] font-semibold

                  ${step.active ? 'text-green-dark' : 'text-g-500'}`}>

                  {step.label}

                </div>

              </div>

            ))}

          </div>

          <div className="bg-g-50 rounded-xl p-3">

            <div className="font-mono text-[9px] text-g-400 tracking-[1.5px] uppercase mb-1.5">Current Stage</div>

            <div className="flex items-center gap-2">

              <span className="text-xl">🤖</span>

              <div className="flex-1">

                <div className="text-sm font-bold text-g-900">AI Scoring in Progress</div>

                <div className="text-xs text-g-500">3,842 applications being scored · Model v2.4</div>

              </div>

              <span className="bg-green-faint text-green-dark border border-green-border font-mono text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">

                <span className="w-1 h-1 bg-green rounded-full animate-pulse-dot"/>

                LIVE

              </span>

            </div>

          </div>

        </Card>



        {/* Funnel */}

        <Card>

          <CardHeader title="Admissions Funnel" icon="📉" subtitle="100K → 1K conversion"/>

          <div className="flex flex-col gap-2">

            <FunnelRow label="Applications" value="100,247" width={100} gradient="linear-gradient(90deg,#2563eb,#3b82f6)"/>

            <FunnelRow label="AI Screened"  value="98,210"  width={97}  gradient="linear-gradient(90deg,#0891b2,#06b6d4)"/>

            <FunnelRow label="Pre-filtered" value="38,000"  width={38}  gradient="linear-gradient(90deg,#d97706,#f59e0b)"/>

            <FunnelRow label="Shortlisted"  value="12,000"  width={12}  gradient="linear-gradient(90deg,#16a34a,#22c55e)"/>

            <FunnelRow label="Admitted"     value="1,000"   width={1}   gradient="linear-gradient(90deg,#15803d,#16a34a)"/>

          </div>

        </Card>

      </div>



      {/* App Types + Objectives */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">

        <Card>

          <CardHeader title="Application Types at AUI" icon="🎓" subtitle="Criteria per applicant type"/>

          <div className="flex flex-col gap-2.5">

            {[

              { tag: 'Freshman', color: 'bg-green-faint text-green-dark border-green-border', desc: 'High school records, TOEFL ≥ 71 iBT, essay, interview' },

              { tag: 'Transfer',  color: 'bg-blue-light  text-blue-500 border-blue-green-border',   desc: 'Min 2.5 GPA, 30+ credits, all transcripts, interview' },

              { tag: 'Graduate',  color: 'bg-amber-light text-amber border-amber-border',  desc: "Bachelor's degree, TOEFL ≥ 79 iBT, 2 rec letters, CV, essay" },

              { tag: 'Visiting',  color: 'bg-g-100       text-g-600 border-g-200',         desc: 'Home institution approval, enrollment verification' },

            ].map(item => (

              <div key={item.tag} className="flex items-start gap-2.5">

                <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold border flex-shrink-0 ${item.color}`}>

                  {item.tag}

                </span>

                <span className="text-xs text-g-600 leading-relaxed pt-0.5">{item.desc}</span>

              </div>

            ))}

          </div>

        </Card>



       

      </div>



   

    </div>

  )

}