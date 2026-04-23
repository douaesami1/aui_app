import { Routes, Route, Navigate } from 'react-router-dom'
import AppShell      from './components/layout/AppShell'
import Dashboard     from './pages/Dashboard'
import Applications  from './pages/Applications'
import Graduates     from './pages/Graduates'
import Students      from './pages/Students'
import Courses       from './pages/Courses'
import { Analytics }    from './pages/Analytics'
import { Completeness } from './pages/Completeness'
import {
  Fairness,
  Requirements,
  Flow,
  Grades,
  Features,
} from './pages/OtherPages'

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell/>}>
        <Route index                element={<Navigate to="/overview" replace/>}/>
        <Route path="overview"      element={<Dashboard/>}/>
        <Route path="applications"  element={<Applications/>}/>
        <Route path="graduates"     element={<Graduates/>}/>
        <Route path="analytics"     element={<Analytics/>}/>
        <Route path="fairness"      element={<Fairness/>}/>
        <Route path="completeness"  element={<Completeness/>}/>
        <Route path="requirements"  element={<Requirements/>}/>
        <Route path="flow"          element={<Flow/>}/>
        <Route path="students"      element={<Students/>}/>
        <Route path="courses"       element={<Courses/>}/>
        <Route path="grades"        element={<Grades/>}/>
        <Route path="features"      element={<Features/>}/>
        <Route path="*"             element={<Navigate to="/overview" replace/>}/>
      </Route>
    </Routes>
  )
}
