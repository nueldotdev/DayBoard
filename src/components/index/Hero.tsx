
import { motion } from "framer-motion";
import { HiExternalLink } from "react-icons/hi";

export const Hero: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <div className="relative bg-black text-white py-20 overflow-hidden px-5 min-h-screen flex items-center justify-center">
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col items-center space-y-4">
            <div className="flex flex-col items-center">
              <div className="p-4 pb-0  flex items-center justify-center space-x-2">
                <img
                  src={"/dayboard-dark.svg"}
                  alt="Dayboard Logo"
                  className="w-8 h-8"
                />
                <h1 className="text-2xl font-bold">DayBoard</h1>
              </div>
              <div className="text-sm justify-center flex items-center space-x-1">
                <p>by</p>{" "}
                <a
                  href="http://nueldotdev.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-green-500/50 hover:text-green-500 transition-all hover:underline"
                >
                  nueldotdev <HiExternalLink stroke="1.5" size={12} />
                </a>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight max-w-4xl">
              Get the most out of every 24 hours.
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl">
              Manage your time, and focus on what matters most with DayBoard.
            </p>
            <motion.button
              onClick={onClick}
              className="bg-green-500 text-black font-medium px-4 py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-green-400 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Join the waitlist</span>
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-500/10 to-transparent" />
    </div>
  );
};
