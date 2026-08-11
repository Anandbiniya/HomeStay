import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { LeadProvider } from './context/LeadContext'
import HomePage from './pages/HomePage'
import StayPage from './pages/StayPage'
import CampingPage from './pages/CampingPage'
import CampingDetailPage from './pages/CampingDetailPage'
import ExperiencePage from './pages/ExperiencePage'
import AboutPage from './pages/AboutPage'
import VolunteerPage from './pages/VolunteerPage'
import GalleryPage from './pages/GalleryPage'
import ReelsPage from './pages/ReelsPage'
import ReviewsPage from './pages/ReviewsPage'
import LocationPage from './pages/LocationPage'

export default function App() {
  return (
    <BrowserRouter>
      <LeadProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/stay" element={<StayPage />} />
          <Route path="/camping" element={<CampingPage />} />
          <Route path="/camping/:slug" element={<CampingDetailPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/volunteer" element={<VolunteerPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/reels" element={<ReelsPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/location" element={<LocationPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </LeadProvider>
    </BrowserRouter>
  )
}
