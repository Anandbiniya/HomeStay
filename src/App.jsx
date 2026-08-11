import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { LeadProvider } from './context/LeadContext'
import HomePage from './pages/HomePage'
import VolunteerPage from './pages/VolunteerPage'

export default function App() {
  return (
    <BrowserRouter>
      <LeadProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/volunteer" element={<VolunteerPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </LeadProvider>
    </BrowserRouter>
  )
}
