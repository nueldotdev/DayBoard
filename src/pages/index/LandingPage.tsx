import { useState, useEffect } from "react"
import { AnimatePresence } from 'framer-motion'
import { Modal } from "../../components/app/objects/ui/Modal"
import { Header } from "../../components/index/Header"
import { Hero } from "../../components/index/Hero"
import { AboutUs } from "../../components/index/AboutUs"
import { Features } from "../../components/index/Features"
import { Footer } from "../../components/index/Footer"
import { Pricing } from "../../components/index/Pricing"
import { getTheme } from "../../utils/getTheme"


export default function LandingPage() {
  const {currentTheme} = getTheme()
  const [scroll, setScroll] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [name, setName] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 200)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleJoinWaitlist = () => {
    window.location.href = "/waitlist"
  }

  const handleSubmit = () => {
    if (name) {
      localStorage.setItem("name", name)
      setShowModal(false)
      // Navigate to app
      window.location.href = "/app"
    }
  }

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background patterns */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(22,163,74,0.15)_0%,rgba(0,0,0,0)_50%)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000000_1px,transparent_1px),linear-gradient(to_bottom,#00000000_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      <div className="relative z-10">
        <AnimatePresence>
          {scroll && <Header onClick={function (): void {
            throw new Error("Function not implemented.")
          } }  />}
        </AnimatePresence>

        <main>
          <Hero onClick={handleJoinWaitlist} />
          <Features />
          <Pricing />
          <AboutUs />
          <Footer />
        </main>
      </div>

      <Modal open={showModal} onClose={() => setShowModal(false)} theme={currentTheme}>
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-2">Insert a name!</h2>
          <p className="mb-4">
            This is just for display purposes, nothing else...
          </p>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md"
            onClick={() => {handleSubmit()}}
          >
            Done
          </button>
        </div>
      </Modal>
    </div>
  )
}

