import { useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";

const faqs = [
  {
    question: "What is DayBoard?",
    answer:
      "DayBoard is a productivity app designed to help you focus, track progress, and customize your workflow with ease.",
  },
  {
    question: "Is there a free version?",
    answer:
      "Yes! Our free plan includes core features like timers and basic analytics. Upgrade to Pro for advanced tools.",
  },
  {
    question: "Can I use DayBoard on multiple devices?",
    answer:
      "Absolutely! Your account syncs across devices, making it seamless to use wherever you are.",
  },
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) =>
    setOpenIndex(openIndex === index ? null : index);

  return (
    <div className="py-20 px-10 bg-gradient-to-b from-gray-900 to-black text-white">
      <h2 className="text-6xl font-bold text-center mb-16 text-yellow-400">
        Frequently Asked Questions
      </h2>
      <div className="max-w-4xl mx-auto space-y-8">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className="p-6 bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all"
            initial="collapsed"
            animate={openIndex === index ? "open" : "collapsed"}
            variants={{
              collapsed: { scale: 1 },
              open: { scale: 1.02 },
            }}
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex justify-between items-center cursor-pointer">
              <h3 className="text-2xl font-bold">{faq.question}</h3>
              {openIndex === index ? (
                <HiOutlineChevronUp className="text-3xl" />
              ) : (
                <HiOutlineChevronDown className="text-3xl" />
              )}
            </div>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-4 text-lg text-gray-300"
              >
                {faq.answer}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};
