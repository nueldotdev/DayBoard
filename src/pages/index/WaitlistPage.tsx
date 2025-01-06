'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import toast, { Toaster } from 'react-hot-toast'
import { HiOutlineArrowRight } from 'react-icons/hi2'
import api from '../../../services/axios'

export default function WaitlistPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {      
      // Add your actual API call here
      const response = await api.post('/add-to-waitlist/', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Success:', response.data)      
      toast.success('Successfully joined the waitlist!')
      setShowThankYou(true)
    } catch (error) {
      console.error('Error:', error)
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 w-full h-full opacity-20">
        <div className="absolute w-full h-full bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:16px_16px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 min-h-screen flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-xl mx-auto text-center"
        >
          <p className="text-green-500 mb-4">Dayboard | Time Management App</p>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-white">
            Join the waitlist to keep up with our progress
          </h1>

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-4 mx-auto max-w-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative">
              <input
                type="text"
                placeholder="First name..."
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-green-500 transition-colors"
              />
            </div>

            <div className="relative">
              <input
                type="email"
                placeholder="Email address..."
                required
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-green-500 transition-colors"
              />
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-500 text-black font-medium px-4 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-green-400 transition-colors disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? (
                <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Join the waitlist
                  <HiOutlineArrowRight className="w-6 h-6" />
                </>
              )}
            </motion.button>
          </motion.form>

          {showThankYou && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg"
            >
              <p className="text-green-500 font-medium">
                Thank you for joining our waitlist! 🎉
              </p>
              <p className="text-white/80 text-sm mt-2">
                We're thrilled to have you on board. We'll keep you updated on our progress and let you know as soon as Dayboard is ready.
              </p>
            </motion.div>
          )}

        </motion.div>
        <Toaster
          position="bottom-center"
          toastOptions={{
            duration: 5000,
            style: {
              background: '#1a1a1a',
              color: '#fff',
              border: '1px solid rgba(34, 197, 94, 0.2)',
            },
            success: {
              iconTheme: {
                primary: '#22c55e',
                secondary: '#1a1a1a',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#1a1a1a',
              },
            },
          }}
        />
      </div>
    </div>
  )
}

