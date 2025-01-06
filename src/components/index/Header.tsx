import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { HiX } from 'react-icons/hi'

export const Header: React.FC<{onClick: () => void}> = ({onClick}) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <motion.header className='fixed z-50 w-full p-4 text-white flex justify-center items-center shadow-sm bg-black bg-opacity-30 backdrop-blur'
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
        exit={{ opacity: 0, y: -50, transition: { duration: 0.5 } }}
      >
        <div className='container max-md:w-full w-5/6 flex justify-between items-center'>
          <div className="flex items-center justify-center space-x-2">
            <img
              src={"/dayboard-dark.svg"}
              alt="Dayboard Logo"
              className="w-8 h-8"
            />
            <h1 className="text-2xl font-bold">DayBoard</h1>
          </div>

          <div className='hidden md:flex items-center justify-between gap-x-6'>
            <ul className='flex justify-center gap-x-4 items-center'>
              <li className='hover:text-green-500 hover:underline transition-all'>
                <a href="#about">About</a>
              </li>
              <li className='hover:text-green-500 hover:underline transition-all'>
                <a href="#features">Features</a>
              </li>
              <li className='hover:text-green-500 hover:underline transition-all'>
                <a href="#pricing">Pricing</a>
              </li>
            </ul>
            <motion.button
              onClick={onClick}
              className="bg-green-500 text-black font-medium px-4 py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-green-400 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >Try it out</motion.button>
          </div>

          <div className='md:hidden'>
            <HiOutlineMenuAlt1 className='text-2xl cursor-pointer' onClick={toggleSidebar} />
          </div>
        </div>
      </motion.header>

      {isOpen && (
        <motion.div className='fixed inset-0 z-[80] bg-black bg-opacity-50' onClick={toggleSidebar}>
          <motion.div className='fixed top-0 right-0 w-full h-full bg-zinc-900 text-white shadow-lg p-6'
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1}}
            exit={{ x: '100%', opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className='flex justify-between items-center mb-10'>
              <div className="flex items-center justify-center space-x-2">
                <img
                  src={"/dayboard-dark.svg"}
                  alt="Dayboard Logo"
                  className="w-8 h-8"
                />
                <h1 className="text-2xl font-bold">DayBoard</h1>
              </div>

              <HiX className='text-2xl cursor-pointer absolute top-4 right-4' onClick={toggleSidebar} />
            </div>
            <ul className='flex flex-col gap-y-4 text-lg'>
              <li className='hover:text-green-500 hover:underline transition-all'>
                <a href="#about" onClick={toggleSidebar}>About</a>
              </li>
              <li className='hover:text-green-500 hover:underline transition-all'>
                <a href="#features" onClick={toggleSidebar}>Features</a>
              </li>
              <li className='hover:text-green-500 hover:underline transition-all'>
                <a href="#pricing" onClick={toggleSidebar}>Pricing</a>
              </li>
            </ul>
            <button className='mt-6 py-2 px-6  rounded-md bg-green-500 text-white font-normal landing-btn' onClick={onClick}>Try it out</button>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}
