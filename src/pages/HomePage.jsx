import Header from '../components/Header'
import Hero from '../components/Hero'
import About from '../components/About'
import Stay from '../components/Stay'
import Experience from '../components/Experience'
import Gallery from '../components/Gallery'
import Booking from '../components/Booking'
import Location from '../components/Location'
import Footer from '../components/Footer'

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Stay />
        <Experience />
        <Gallery />
        <Booking />
        <Location />
      </main>
      <Footer />
    </>
  )
}
