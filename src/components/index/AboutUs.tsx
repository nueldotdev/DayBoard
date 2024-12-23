import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "Alice Johnson",
    role: "Founder & CEO",
    image: "/images/alice.jpg",
    bio: "Visionary leader building the productivity revolution.",
  },
  {
    name: "Bob Smith",
    role: "Lead Engineer",
    image: "/images/bob.jpg",
    bio: "The architect behind the magic of DayBoard.",
  },
  {
    name: "Catherine Brown",
    role: "Product Designer",
    image: "/images/catherine.jpg",
    bio: "Crafting interfaces that feel like art.",
  },
];

export const AboutUs = () => {
  return (
    <div className="py-20 bg-gradient-to-b from-white to-gray-100 text-gray-800">
      {/* Mission Section */}
      <motion.div
        className="max-w-7xl mx-auto px-10 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: { duration: 1 } },
        }}
      >
        <h1 className="text-6xl font-bold mb-8">
          Meet the Team Behind <span className="text-yellow-400">DayBoard</span>
        </h1>
        <p className="text-2xl max-w-4xl mx-auto">
          We're on a mission to empower creators, entrepreneurs, and dreamers
          with the tools they need to focus and thrive.
        </p>
      </motion.div>

      {/* Team Section */}
      <motion.div
        className="mt-16 grid sm:grid-cols-3 gap-10 px-5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
          },
        }}
      >
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden"
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold">{member.name}</h3>
              <p className="text-yellow-400 text-lg">{member.role}</p>
              <p className="text-gray-600 mt-4">{member.bio}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
