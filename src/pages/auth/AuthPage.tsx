import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast, { Toaster } from 'react-hot-toast'
import { HiArrowRight, HiLockClosed, HiUser } from 'react-icons/hi2'
import { HiMail } from 'react-icons/hi'
import { FcGoogle } from 'react-icons/fc' // Google Icon
import api from '../../../services/axios'
import { useUserStore } from '../../store/userStore'
import { useNavigate } from 'react-router-dom'

type AuthMode = 'login' | 'signup'

export default function AuthPage() {
  const navigate = useNavigate()

  const { setUser, user } = useUserStore()
  const [authMode, setAuthMode] = useState<AuthMode>('login')
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const actionParam = (urlParams.get("type") as AuthMode) || "signup";
    setAuthMode(actionParam);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      let endpoint = authMode === 'login' ? '/auth/login/' : '/auth/signup/'

      const response = await api.post(endpoint, formData);
      console.log('Response:', response.data)
      /*
        Will receive the following response from the backend:
          - access_token: JWT access token
          - refresh_token: JWT refresh token
          - user: User object
        
        - Save access and refresh tokens in local storage
        - Redirect user to dashboard page
        - Show success toast message
      */

      // Save tokens in local storage
      localStorage.setItem('access_token', response.data.access_token)
      localStorage.setItem('refresh_token', response.data.refresh_token)
      setUser(response.data.user[0])

      console.log('User:', user)

      toast.success(
        authMode === 'login'
          ? 'Successfully logged in!'
          : 'Account created successfully!'
      )

      // Redirect to dashboard page
      setTimeout(() => {
        navigate('/dashboard')
      }, 5000)

    } catch (error) {
      console.error('Error:', error)
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const toggleAuthMode = () => {
    setAuthMode((prevMode) => (prevMode === 'login' ? 'signup' : 'login'))
    setFormData({ first_name: '', last_name: '', email: '', password: '' })
  }

  const handleGoogleLogin = () => {
    // Redirect to Django backend endpoint for Google login
    window.location.href = 'https://backend-url.com/auth/google'
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
          className="w-full max-w-md mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-white text-center">
            {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h1>

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {authMode === 'signup' && (
                <motion.div
                  key="name"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className='flex space-x-2 items-center'
                >
                  <div className="relative w-full">
                    <HiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={18} />
                    <input
                      type="text"
                      placeholder="First name"
                      required
                      value={formData.first_name}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, first_name: e.target.value }))
                      }
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-green-500 transition-colors"
                    />
                  </div>
                  <div className="relative w-full">
                    <HiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={18} />
                    <input
                      type="text"
                      placeholder="Last name"
                      required
                      value={formData.last_name}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, last_name: e.target.value }))
                      }
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-green-500 transition-colors"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative">
              <HiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={18} />
              <input
                type="email"
                placeholder="Email address"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-green-500 transition-colors"
              />
            </div>

            <div className="relative">
              <HiLockClosed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={18} />
              <input
                type="password"
                placeholder="Password"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, password: e.target.value }))
                }
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-green-500 transition-colors"
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
                  {authMode === 'login' ? 'Log In' : 'Sign Up'}
                  <HiArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </motion.form>
          {/* <hr className='border-zinc-600 my-4' /> */}
          <p className="mt-10 text-white/60 text-center">
            {authMode === 'login' ? "Don't have an account?" : 'Already have an account?'}
            <button
              onClick={toggleAuthMode}
              className="ml-2 text-green-500 hover:underline focus:outline-none"
            >
              {authMode === 'login' ? 'Sign Up' : 'Log In'}
            </button>
          </p>
          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-white text-black font-medium px-4 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors mt-4"
          >
            <FcGoogle size={20} />
            Continue with Google
          </button>
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
