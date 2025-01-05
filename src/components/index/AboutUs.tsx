import { motion } from "framer-motion"

export const AboutUs = () => {
  return (
    <div className="py-20 bg-black text-white" id="about">
      <motion.div
        className="max-w-4xl mx-auto px-6 space-y-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: { duration: 1 } },
        }}
      >
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold">About <span className="text-green-500">DayBoard</span></h2>
        </div>
        <div className="space-y-6 text-gray-400">
          <p className="text-lg">
            I built DayBoard because I had a hard time staying organized and productive. I wanted a simple tool that would help me handle my day-to-day tasks efficiently. Initially built for personal use, but while building, I decided to share it with the world.
          </p>
          <p className="text-lg">
            It's still in development and I write about it on{" "}
            <a 
              href="https://threads.net/nueldotdev" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-green-500 hover:underline"
            >
              Threads
            </a>.
            I hope you give it a try and let me know what you think.
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Reach Out</h3>
          <div className="space-y-1">
            <a 
              href="mailto:walternuel02@gmail.com" 
              className="block text-green-500 hover:underline"
            >
              Email
            </a>
            <a 
              href="https://twitter.com/nueldotdev" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block text-green-500 hover:underline"
            >
              Twitter
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

