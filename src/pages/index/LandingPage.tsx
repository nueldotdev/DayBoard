import React, { useState } from "react";
import { HiOutlineClock, HiOutlineSparkles, HiOutlineUserGroup } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { Modal } from "../../components/app/objects/ui/Modal";
import { getTheme } from "../../utils/getTheme";

const LandingPage: React.FC = () => {
  const {currentTheme} = getTheme();
  const navigate = useNavigate();
  const [forModal, setForModal] = useState(false);
  const [name, setName] = useState("");

  const handleOpen = () => {
    localStorage.setItem("name", name);
    setForModal(false);
    navigate("/app");
  }

  return (
    <div className="bg-gradient-to-br from-green-400 to-blue-500 text-white">
      {/* Hero Section */}
      <header className="h-screen flex flex-col items-center justify-center text-center py-16 px-6 bg-animated-gradient">
        <h1 className="max-md:text-xl md:text-3xl lg:text-5xl font-bold mb-4">DayBoard is Under Construction 🚧</h1>
        <p className="text-lg font-light max-w-2xl">
          We're building <i>DayBoard</i> to help you manage your time—but we're not there yet!
        </p>
        <p>Right now you can play around with the app itself, just click the button below</p>
        <div className="mt-6 flex gap-4">
          {/* <button className="px-6 py-3 bg-white text-green-600 font-medium rounded-md shadow hover:scale-105 transition-transform">
            Join the Waitlist
          </button>
          <button className="px-6 py-3 bg-transparent border border-white rounded-md shadow hover:bg-white hover:text-green-600 transition-all">
            Learn More
          </button> */}
          <button className="px-6 py-3 bg-transparent border border-white rounded-md shadow hover:bg-white hover:text-green-600 transition-all" onClick={() => { setForModal(true) }}>
            Explore The App
          </button>
        </div>
      </header>

      {/* What We're Building Section */}
      <section className="bg-white text-green-600 py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">What is DayBoard?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="flex flex-col items-center">
              <HiOutlineClock className="text-6xl mb-4" />
              <h3 className="text-xl font-semibold mb-2">A Smarter Timer</h3>
              <p className="text-sm font-light">
                Focus, track, and structure your day with a timer designed for real productivity.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="flex flex-col items-center">
              <HiOutlineSparkles className="text-6xl mb-4" />
              <h3 className="text-xl font-semibold mb-2">Your Daily Hub</h3>
              <p className="text-sm font-light">
                A central place to set goals, track progress, and stay organized.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="flex flex-col items-center">
              <HiOutlineUserGroup className="text-6xl mb-4" />
              <h3 className="text-xl font-semibold mb-2">Community-Driven</h3>
              <p className="text-sm font-light">
                We're building this for you, with your feedback. Join the conversation!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-green-600 text-white py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Want to Be Part of DayBoard?</h2>
          <p className="text-lg font-light max-w-xl mx-auto mb-8">
            We're in the early stages and would love your input. Sign up to get updates and early access!
          </p>
          <button className="px-8 py-4 bg-white text-green-600 font-medium rounded-md shadow hover:scale-105 transition-transform">
            Sign Me Up
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-6 text-center">
        <p className="text-sm font-light">
          © {new Date().getFullYear()} DayBoard. Built with ❤️ and caffeine.
        </p>
      </footer>

      <Modal open={forModal} onClose={() => setForModal(false)} theme={currentTheme}>
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-2">Insert a name!</h2>
          <p className="mb-4">
            This is just for display purposes, nothing else...
          </p>
          <input
            type="text"
            className={`w-full p-2 border rounded-md ${currentTheme.global.border} ${currentTheme.global.bg} ${currentTheme.global.text}`}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md"
            onClick={handleOpen}
          >
            Done
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default LandingPage;
