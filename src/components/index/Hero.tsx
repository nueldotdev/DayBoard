import { motion } from "framer-motion";
import { HiExternalLink } from "react-icons/hi";

export const Hero = () => {
  return (
    <div className="relative bg-white text-black py-20 overflow-hidden px-5 h-screen flex items-center justify-center">
      {/* Gradient Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(circle, rgba(3,171,73,0.2) 0%, rgba(255,255,255,0) 70%)",
        }}
      ></div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
        {/* Left Section */}
        <motion.div
          className="md:w-full text-center max-md:text-left h-3/4 gap-y-8 flex flex-col items-center justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          
          <div className="flex flex-col items-center">
            <div className="p-4 pb-0  flex items-center justify-center space-x-2">
              <img
                src={"/dayboard-light.svg"}
                alt="Dayboard Logo"
                className="w-8 h-8"
              />
              <h1 className="text-2xl font-bold">DayBoard</h1>
            </div>
            <div className="text-sm justify-center flex items-center space-x-1">
              <p>by</p> <a href="http://nueldotdev.vercel.app" target="_blank" rel="noopener noreferrer" className="flex items-center text-green-500/50 hover:text-green-500 transition-all hover:underline">nueldotdev <HiExternalLink stroke="1.5" size={12} /></a>
            </div>
          </div>
          <h1 className="text-7xl max-md:text-4xl text-black font-bold max-md:max-w-lg max-w-5xl">
            Manage your time, and focus on what matters.
          </h1>
          <p className="text-xl max-w-2xl max-md:max-w-lg">
            Take out the noise, the disorder and the chaos. Work on what you
            need to, when you need to and stay in control.
          </p>
          <button className="bg-green-500 text-white py-2 px-10 w-1/4 max-md:w-full rounded-md font-normal shadow-md hover:shadow-xl transition-all">
            Get Started
          </button>
        </motion.div>
      </div>
    </div>
  );
};
