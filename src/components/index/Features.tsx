// import { motion } from "framer-motion";

// const features = [
//   {
//     title: "Time Sessions",
//     description:
//       "Set custom time sessions to help you focus and stay productive.",
//     images: ["/images/app/time-count.png"],
//   },
//   {
//     title: "Stats & Insights",
//     description:
//       "Track your progress with detailed stats and insights into your daily productivity.",
//     images: ["/images/app/stats-page.png"],
//   },
//   {
//     title: "Kanban Boards",
//     description:
//       "Organize and keep track of your tasks and projects with our built-in Kanban boards.",
//     images: ["/images/app/open-board-page.png"],
//   },
// ];

// export const Features = () => {
//   return (
//     <div className="py-20 bg-white text-gray-700">
//       <div className="max-w-5xl mx-auto space-y-10">
//         <div className="text-center flex flex-col items-center">
//           <h1
//             className="text-5xl font-bold text-center text-green-600"
//             id="features"
//           >
//             Features
//           </h1>
//           <p className="text-lg max-w-3xl text-gray-700 mt-4">
//             Below are some of the current features within DayBoard. More are being added as the app grows.
//           </p>
//         </div>
//         <div className="max-w-5xl mx-auto space-y-16">
//         {features.map((feature, index) => (
//           <motion.div
//             key={index}
//             className={`flex flex-col-reverse ${
//               index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
//             } items-center`}
//             initial={{ opacity: 0, y: index % 2 === 0 ? 100 : 0 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//           >
//             <div className="md:w-1/2 text-left px-5 max-md:mt-4">
//               <h2 className="text-4xl font-bold text-green-600 mb-4">
//                 {feature.title}
//               </h2>
//               <p className="text-lg text-gray-700">{feature.description}</p>
//             </div>
//             <div className="md:w-1/2 px-5">
//               {feature.images.map((image, index) => (
//                 <motion.img
//                   key={index}
//                   src={image}
//                   alt={feature.title}
//                   className="rounded-xl w-full h-full object-cover"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ duration: 0.8 }}
//                 />
//               ))}
//             </div>
//           </motion.div>
//         ))}
//         </div>
//       </div>
//     </div>
//   );
// };


'use client'

import { motion } from "framer-motion"
import { HiClock } from "react-icons/hi2"
import { PiGraph, PiLayout } from "react-icons/pi"


const features = [
  {
    title: "Time Sessions",
    description: "Set custom time sessions to help you focus and stay productive. Track your work intervals and breaks with our intuitive timer interface.",
    icon: HiClock,
    image: "/images/app/time-count.png",
    stats: [
      { label: "productivity and focus", value: "Increase" }
    ]
  },
  {
    title: "Stats & Insights",
    description: "Get detailed analytics about your productivity patterns. Understand your peak performance hours and optimize your schedule accordingly.",
    icon: PiGraph,
    image: "/images/app/stats-page.png",
    stats: [
      { label: "Productivity insights", value: "Daily" }
    ]
  },
  {
    title: "Kanban Boards",
    description: "Visualize your workflow with our customizable Kanban boards. Organize tasks, track progress, and collaborate with your team seamlessly.",
    icon: PiLayout,
    image: "/images/app/open-board-page.png",
    stats: [
      { label: "Project tasks", value: "Organize" }
    ]
  }
]

export function Features() {
  return (
    <section className="py-24 overflow-hidden" id="features">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-2"
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Features for
              <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent"> Productivity</span>
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Discover how DayBoard can transform your productivity and help you achieve more in less time.
            </p>
          </motion.div>
        </div>

        <div className="mx-auto mt-16 max-w-5xl">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`mb-24 grid gap-8 items-center ${
                index % 2 === 0 ? 'lg:grid-cols-[2fr,1fr]' : 'lg:grid-cols-[1fr,2fr]'
              }`}
            >
              <div className={`space-y-6 ${index % 2 === 0 ? '' : 'lg:order-last'}`}>
                <div className="inline-flex items-center space-x-2 rounded-full bg-green-500/10 px-3 py-1">
                  <feature.icon className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-500">Feature {index + 1}</span>
                </div>
                <h3 className="text-2xl font-bold">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
                <div className="grid grid-cols-2 gap-4">
                  {feature.stats.map((stat) => (
                    <div key={stat.label} className="space-y-1">
                      <p className="text-2xl font-bold text-green-500">{stat.value}</p>
                      <p className="text-sm text-gray-400">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className={`relative aspect-video rounded-xl border border-white/10 bg-white/5 overflow-hidden ${
                index % 2 === 0 ? 'lg:order-last' : ''
              }`}>
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="object-cover fill-all transition-transform hover:scale-105"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

