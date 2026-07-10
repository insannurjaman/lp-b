import Header from './components/Header'
import Hero from './components/Hero'
import ProductProof from './components/ProductProof'
import ProductWorkspace from './components/ProductWorkspace'
import Benefits from './components/Benefits'
import CapabilityGrid from './components/CapabilityGrid'
import OrchestrationChapter from './components/OrchestrationChapter'
import CustomerHistory from './components/CustomerHistory'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'
import MobileStickyCTA from './components/MobileStickyCTA'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProductProof />
        <ProductWorkspace />
        <Benefits />
        <CapabilityGrid />
        <OrchestrationChapter />
        <CustomerHistory />
        <FinalCTA />
      </main>
      <Footer />
      <MobileStickyCTA />
    </>
  )
}
