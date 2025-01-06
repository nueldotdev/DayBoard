import { motion } from 'framer-motion'
import { Button } from '../app/objects/ui/Button'
import { HiCheck } from 'react-icons/hi2'

const plans = [
  {
    name: 'Basic',
    price: { monthly: 0,},
    features: [
      'Up to 5 projects',
      'Basic time tracking',
      'Simple Kanban boards',
    ],
  },
  {
    name: 'Pro',
    price: { monthly: 3 },
    features: [
      'Unlimited projects',
      'Advanced time analytics',
      'Customizable backgrounds',
      'Upload your own images',
    ],
  },
]

export function Pricing() {

  return (
    <section className="py-24 bg-black" id="pricing">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-2"
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Choose Your <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">Productivity Plan</span>
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Find the plan that fits you.
            </p>
          </motion.div>
        </div>

        <div className="flex flex-col items-stretch justify-center mt-16 space-y-8 md:flex-row md:space-x-8 md:space-y-0">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex-1 max-w-[450px] fill-all"
            >
              <div className={`relative fill-all flex flex-col p-6 bg-white/5 rounded-lg border shadow-lg  ${index === 1 ? 'border border-green-500' : 'border-white/10'}`}>
                <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                <div className="mt-4 text-4xl font-bold text-white">
                  ${plan.price.monthly}
                  <span className="text-base font-normal text-gray-400">
                    /month
                  </span>
                </div>
                <ul className="mt-6 space-y-4 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center text-gray-300">
                      <HiCheck className="w-5 h-5 mr-2 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="mt-8" onClick={() => {window.location.href = '/waitlist'}}>
                  Get Started
                </Button>
                {index === 1 && (
                  <div className="absolute -top-4 left-0 right-0 flex justify-center">
                    <span className="bg-green-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                      Recommended
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-400">
            All plans come with a 14-day free trial. No credit card required.
          </p>
        </motion.div> */}
      </div>
    </section>
  )
}

