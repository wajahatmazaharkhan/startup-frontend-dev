import { Navbar } from "../components"
import Testimonials from "../components/ui/testimonials/Testimonials"
import LandingPageFeatures from "../features/landing"

const Home = () => {
  return (
    <div>

      {/* Navbar */}
      <Navbar />

      {/* Feature Section (LP003) */}
      <LandingPageFeatures />

      {/* Testimonials Section */}
      <Testimonials />

      {/* (Optional) Footer component can be added here */}
      {/* <Footer /> */}

    </div>
  )
}

export default Home
