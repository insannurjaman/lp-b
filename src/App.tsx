import Header from './components/Header'
import Hero from './components/Hero'
import ProductProof from './components/ProductProof'
import ProductWorkspace from './components/ProductWorkspace'
import Benefits from './components/Benefits'
import CapabilityGrid from './components/CapabilityGrid'
import CustomerHistory from './components/CustomerHistory'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'

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
        <CustomerHistory />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
