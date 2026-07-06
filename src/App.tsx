import Header from './components/Header'
import Hero from './components/Hero'
import ChannelCoverage from './components/ChannelCoverage'
import ProblemSection from './components/ProblemSection'
import JourneySection from './components/JourneySection'
import ProductPillars from './components/ProductPillars'
import CustomerTimeline from './components/CustomerTimeline'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ChannelCoverage />
        <ProblemSection />
        <JourneySection />
        <ProductPillars />
        <CustomerTimeline />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
