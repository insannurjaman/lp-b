import Header from './components/Header'
import HeroSection from './components/HeroSection'
import SixActions from './components/SixActions'
import Workspace from './components/Workspace'
import Capabilities from './components/Capabilities'
import Closing from './components/Closing'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <SixActions />
        <Workspace />
        <Capabilities />
        <Closing />
      </main>
      <Footer />
    </>
  )
}
