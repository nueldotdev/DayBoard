import { motion } from "framer-motion";

const features = [
  {
    title: "Pomodoro Timer",
    description: "Boost your focus with customizable Pomodoro sessions.",
    image: "/images/pomodoro-mockup.png",
  },
  {
    title: "Advanced Stats",
    description:
      "Track your progress with detailed stats and insights into your daily productivity.",
    image: "/images/stats-mockup.png",
  },
  {
    title: "Sync Across Devices",
    description: "Seamlessly connect and access DayBoard on all your devices.",
    image: "/images/sync-mockup.png",
  },
];

export const Features = () => {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto space-y-20">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className={`flex flex-col ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            } items-center`}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="md:w-1/2 text-center md:text-left px-5">
              <h2 className="text-4xl font-bold text-green-600 mb-4">
                {feature.title}
              </h2>
              <p className="text-lg text-gray-700">{feature.description}</p>
            </div>
            <div className="md:w-1/2 px-5">
              <img
                src={feature.image}
                alt={feature.title}
                className="rounded-xl shadow-lg"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
