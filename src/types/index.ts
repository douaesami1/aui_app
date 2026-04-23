// ── Application Types ─────────────────────────────────────────────

export type AppType = 'freshman' | 'transfer' | 'graduate' | 'visiting'
export type Verdict = 'admit' | 'review' | 'reject'

export interface SHAPFeature {
  label: string
  value: number
  positive: boolean
}

export interface ScoreDimension {
  label: string
  value: number
  color: string
}

export interface Application {
  id: string
  name: string
  initials: string
  color: string
  type: AppType
  typeLabel: string
  program: string
  city: string
  score: number
  verdict: Verdict
  confidence: number
  dimensions: ScoreDimension[]
  shap: SHAPFeature[]
}

// ── Graduate / Admitted Student ───────────────────────────────────

export interface Graduate {
  id: string
  name: string
  initials: string
  color: string
  type: string
  program: string
  score: number
  offerSent: boolean
  enrolled: boolean
  feesPaid: boolean
  roomAssigned: boolean
  coursesRegistered: boolean
}

// ── Student Record ────────────────────────────────────────────────

export interface StudentRecord {
  id: string
  entranceYear: string
  currentClass: string
  careerGpa: number
  hoursEnrolled: number
  assignedRoom: string
  firstName: string
  lastName: string
  mobile: string
  email: string
  appId: string
  cin: string
  division: string
  stage: string
  program: string
  bacType: string
  visaType: string
  missingFields: string[]
}

// ── Course ────────────────────────────────────────────────────────

export interface Course {
  code: string
  prefix: string
  studentsNeeded: number
  seatsAvailable: number
  enrolled: number
  sections: number
  fillRate: number
  status: 'good' | 'warning' | 'critical'
}

// ── Nav Item ──────────────────────────────────────────────────────

export type Screen =
  | 'overview'
  | 'applications'
  | 'graduates'
  | 'analytics'
  | 'fairness'
  | 'completeness'
  | 'requirements'
  | 'flow'
  | 'students'
  | 'courses'
  | 'grades'
  | 'features'

export interface NavItem {
  id: Screen
  label: string
  icon: string
  pill?: { count: number; color: 'green' | 'amber' | 'red' }
  section?: string
}
