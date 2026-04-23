import type { Application, Graduate, StudentRecord, Course } from '../types'

// ── Applications ──────────────────────────────────────────────────

export const APPLICATIONS: Application[] = [
  {
    id: 'APP-001', name: 'Sofia Benchaabane', initials: 'SB', color: '#16a34a',
    type: 'freshman', typeLabel: 'Freshman', program: 'SBA', city: 'Casablanca',
    score: 87, verdict: 'admit', confidence: 97,
    dimensions: [
      { label: 'Academic', value: 91, color: '#16a34a' },
      { label: 'TOEFL',    value: 84, color: '#2563eb' },
      { label: 'Essay',    value: 78, color: '#7c3aed' },
      { label: 'Interview',value: 82, color: '#d97706' },
    ],
    shap: [
      { label: 'HS Academic',   value: 18.2, positive: true  },
      { label: 'TOEFL Score',   value: 12.4, positive: true  },
      { label: 'Essay Quality', value:  8.7, positive: true  },
      { label: 'Interview',     value:  6.1, positive: true  },
      { label: 'Missing Docs',  value:  3.2, positive: false },
    ],
  },
  {
    id: 'APP-002', name: 'Amine Mouline', initials: 'AM', color: '#059669',
    type: 'freshman', typeLabel: 'Freshman', program: 'SSE', city: 'Marrakech',
    score: 92, verdict: 'admit', confidence: 99,
    dimensions: [
      { label: 'Academic', value: 96, color: '#16a34a' },
      { label: 'TOEFL',    value: 91, color: '#2563eb' },
      { label: 'Essay',    value: 88, color: '#7c3aed' },
      { label: 'Interview',value: 90, color: '#d97706' },
    ],
    shap: [
      { label: 'HS Academic',    value: 22.1, positive: true },
      { label: 'TOEFL Score',    value: 15.3, positive: true },
      { label: 'Essay Quality',  value: 11.2, positive: true },
      { label: 'Interview',      value:  9.8, positive: true },
      { label: 'Extracurric.',   value:  4.2, positive: true },
    ],
  },
  {
    id: 'APP-003', name: 'Karim Al-Mansouri', initials: 'KA', color: '#d97706',
    type: 'transfer', typeLabel: 'Transfer', program: 'SSE', city: 'Rabat',
    score: 61, verdict: 'review', confidence: 68,
    dimensions: [
      { label: 'Academic', value: 65, color: '#16a34a' },
      { label: 'GPA',      value: 58, color: '#2563eb' },
      { label: 'Credits',  value: 72, color: '#7c3aed' },
      { label: 'Interview',value: 60, color: '#d97706' },
    ],
    shap: [
      { label: 'Transfer GPA',   value:  9.1, positive: true  },
      { label: 'Credit Hours',   value:  7.4, positive: true  },
      { label: 'TOEFL Score',    value:  5.2, positive: true  },
      { label: 'Gaps in Record', value:  8.3, positive: false },
      { label: 'Missing Docs',   value:  4.1, positive: false },
    ],
  },
  {
    id: 'APP-004', name: 'Nadia Bensouda', initials: 'NB', color: '#7c3aed',
    type: 'graduate', typeLabel: 'Graduate', program: 'MBA', city: 'Fès',
    score: 78, verdict: 'admit', confidence: 88,
    dimensions: [
      { label: 'Degree',      value: 82, color: '#16a34a' },
      { label: 'TOEFL',       value: 85, color: '#2563eb' },
      { label: 'Rec Letters', value: 75, color: '#7c3aed' },
      { label: 'CV/Essay',    value: 76, color: '#d97706' },
    ],
    shap: [
      { label: "Bachelor's GPA", value: 14.2, positive: true  },
      { label: 'TOEFL Score',    value: 11.8, positive: true  },
      { label: 'Rec Letters',    value:  9.3, positive: true  },
      { label: 'Work Exp.',      value:  6.7, positive: true  },
      { label: 'Essay Quality',  value:  3.1, positive: false },
    ],
  },
  {
    id: 'APP-005', name: 'Youssef Lahlou', initials: 'YL', color: '#dc2626',
    type: 'freshman', typeLabel: 'Freshman', program: 'SSAH', city: 'Agadir',
    score: 42, verdict: 'reject', confidence: 94,
    dimensions: [
      { label: 'Academic', value: 45, color: '#16a34a' },
      { label: 'TOEFL',    value: 38, color: '#2563eb' },
      { label: 'Essay',    value: 48, color: '#7c3aed' },
      { label: 'Interview',value: 40, color: '#d97706' },
    ],
    shap: [
      { label: 'HS Academic',   value:  3.2, positive: true  },
      { label: 'TOEFL Score',   value: 14.1, positive: false },
      { label: 'Essay Quality', value:  8.9, positive: false },
      { label: 'Missing Docs',  value:  6.4, positive: false },
      { label: 'GPA Below Min', value: 11.2, positive: false },
    ],
  },
  {
    id: 'APP-006', name: 'Imane Chraibi', initials: 'IC', color: '#2563eb',
    type: 'transfer', typeLabel: 'Transfer', program: 'SBA', city: 'Tanger',
    score: 71, verdict: 'review', confidence: 74,
    dimensions: [
      { label: 'Academic', value: 74, color: '#16a34a' },
      { label: 'GPA',      value: 68, color: '#2563eb' },
      { label: 'Credits',  value: 80, color: '#7c3aed' },
      { label: 'Interview',value: 65, color: '#d97706' },
    ],
    shap: [
      { label: 'Transfer GPA',   value: 11.4, positive: true  },
      { label: 'Credit Hours',   value:  9.2, positive: true  },
      { label: 'TOEFL Score',    value:  7.8, positive: true  },
      { label: 'Missing Docs',   value:  5.6, positive: false },
      { label: 'Interview',      value:  2.1, positive: false },
    ],
  },
  {
    id: 'APP-007', name: 'Omar Tahiri', initials: 'OT', color: '#0891b2',
    type: 'graduate', typeLabel: 'Graduate', program: 'MSCYB', city: 'Meknès',
    score: 83, verdict: 'admit', confidence: 91,
    dimensions: [
      { label: 'Degree',      value: 88, color: '#16a34a' },
      { label: 'TOEFL',       value: 82, color: '#2563eb' },
      { label: 'Rec Letters', value: 79, color: '#7c3aed' },
      { label: 'CV/Essay',    value: 85, color: '#d97706' },
    ],
    shap: [
      { label: "Bachelor's GPA", value: 16.8, positive: true },
      { label: 'TOEFL Score',    value: 12.3, positive: true },
      { label: 'Research Exp.',  value:  9.7, positive: true },
      { label: 'Rec Letters',    value:  7.2, positive: true },
      { label: 'CV Quality',     value:  5.1, positive: true },
    ],
  },
  {
    id: 'APP-008', name: 'Fatima Zahra Idrissi', initials: 'FZ', color: '#be185d',
    type: 'visiting', typeLabel: 'Visiting', program: 'SSAH', city: 'Paris',
    score: 69, verdict: 'review', confidence: 71,
    dimensions: [
      { label: 'Home GPA',    value: 72, color: '#16a34a' },
      { label: 'Language',    value: 70, color: '#2563eb' },
      { label: 'Inst. Appr.', value: 65, color: '#7c3aed' },
      { label: 'Enrollment',  value: 68, color: '#d97706' },
    ],
    shap: [
      { label: 'Home GPA',       value:  8.9, positive: true  },
      { label: 'Language Cert.', value:  7.4, positive: true  },
      { label: 'Inst. Approval', value:  6.2, positive: true  },
      { label: 'Missing Verif.', value:  4.8, positive: false },
      { label: 'Enrollment Gap', value:  3.1, positive: false },
    ],
  },
]

// ── Graduates ─────────────────────────────────────────────────────

export const GRADUATES: Graduate[] = [
  { id: 'G-001', name: 'Sofia Benchaabane', initials: 'SB', color: '#16a34a', type: 'Freshman', program: 'SBA',    score: 87, offerSent: true,  enrolled: true,  feesPaid: true,  roomAssigned: true,  coursesRegistered: true  },
  { id: 'G-002', name: 'Amine Mouline',     initials: 'AM', color: '#059669', type: 'Freshman', program: 'SSE',    score: 92, offerSent: true,  enrolled: true,  feesPaid: true,  roomAssigned: true,  coursesRegistered: true  },
  { id: 'G-003', name: 'Nadia Bensouda',    initials: 'NB', color: '#7c3aed', type: 'Graduate', program: 'MBA',    score: 78, offerSent: true,  enrolled: true,  feesPaid: true,  roomAssigned: false, coursesRegistered: false },
  { id: 'G-004', name: 'Omar Tahiri',       initials: 'OT', color: '#0891b2', type: 'Graduate', program: 'MSCYB', score: 83, offerSent: true,  enrolled: true,  feesPaid: false, roomAssigned: false, coursesRegistered: false },
  { id: 'G-005', name: 'Leila Amrani',      initials: 'LA', color: '#d97706', type: 'Freshman', program: 'SSAH',  score: 74, offerSent: true,  enrolled: false, feesPaid: false, roomAssigned: false, coursesRegistered: false },
  { id: 'G-006', name: 'Hassan Berrada',    initials: 'HB', color: '#2563eb', type: 'Transfer', program: 'SBA',   score: 81, offerSent: true,  enrolled: true,  feesPaid: true,  roomAssigned: true,  coursesRegistered: false },
]

// ── Student Record ─────────────────────────────────────────────────

export const STUDENT_RECORD: StudentRecord = {
  id: '157406',
  entranceYear: '2324',
  currentClass: 'SO',
  careerGpa: 2.71,
  hoursEnrolled: 16,
  assignedRoom: 'Campus 58-308',
  firstName: 'Hafsa',
  lastName: 'EL HASSENE',
  mobile: '+222 47 837 065',
  email: '157406@aui.ma',
  appId: '125753',
  cin: 'B00117729',
  division: 'UG',
  stage: 'ENR',
  program: 'BBA',
  bacType: 'Mauritanian Bac',
  visaType: 'I',
  missingFields: ['OEFP', 'Country', 'App Fee Date', 'Admission Type'],
}

// ── Courses ────────────────────────────────────────────────────────

export const COURSES: Course[] = [
  { code: 'ALS1000', prefix: 'AL', studentsNeeded:  3, seatsAvailable: 17,  enrolled: 13,  sections: 2, fillRate: 76, status: 'good'     },
  { code: 'ALS1001', prefix: 'AL', studentsNeeded: 16, seatsAvailable: 88,  enrolled: 69,  sections: 9, fillRate: 78, status: 'good'     },
  { code: 'ARB1000', prefix: 'AR', studentsNeeded:  9, seatsAvailable:  0,  enrolled:  0,  sections: 0, fillRate:  0, status: 'critical' },
  { code: 'ARB1241', prefix: 'AR', studentsNeeded: 55, seatsAvailable: 141, enrolled: 82,  sections: 7, fillRate: 58, status: 'good'     },
  { code: 'ARD1000', prefix: 'AR', studentsNeeded:  3, seatsAvailable: 16,  enrolled: 13,  sections: 2, fillRate: 81, status: 'good'     },
  { code: 'BUS2100', prefix: 'BU', studentsNeeded: 40, seatsAvailable: 60,  enrolled: 41,  sections: 3, fillRate: 68, status: 'good'     },
  { code: 'CSE1100', prefix: 'CS', studentsNeeded: 30, seatsAvailable: 45,  enrolled: 28,  sections: 3, fillRate: 62, status: 'warning'  },
  { code: 'ENG2200', prefix: 'EN', studentsNeeded: 25, seatsAvailable: 30,  enrolled: 29,  sections: 2, fillRate: 97, status: 'warning'  },
]
