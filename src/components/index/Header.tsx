import { motion } from 'framer-motion'
import React from 'react'

export const Header: React.FC = () => {
  return (
    <motion.header className='fixed z-50 w-full p-4 bg-white text-black flex justify-between items-center shadow-sm'
      initial={{opacity: 0, y: -50}}
      animate={{opacity: 1, y: 0, transition: {duration: 0.5}}}
      exit={{opacity: 0, y: -50, transition: {duration: 0.5}}}
    >
      <div className="flex items-center justify-center space-x-2">
        <img
          src={"/dayboard-light.svg"}
          alt="Dayboard Logo"
          className="w-8 h-8"
        />
        <h1 className="text-2xl font-bold">DayBoard</h1>
      </div>
      <div className='w-1/3'>
        <ul className='flex justify-center gap-x-4 items-center'>
          <li className='hover:text-green-500'>
            <a href="#">About</a>
          </li>
          <li className='hover:text-green-500'>
            <a href="#">Pricing</a>
          </li>
        </ul>
      </div>
      <div>
        <button className='py-2 px-6 rounded-lg bg-green-500 text-white font-normal shadow-md hover:shadow-xl transition-all'>Try it out</button>
      </div>
    </motion.header>
  )
}
