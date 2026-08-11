import { LeadProvider } from './context/LeadContext'
import HomePage from './pages/HomePage'

export default function App() {
  return (
    <LeadProvider>
      <HomePage />
    </LeadProvider>
  )
}
