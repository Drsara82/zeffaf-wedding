import React, { useState } from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion"; 


const testimonials = [
  {
    text: "As a satisfied customer, I want to share my positive experience with others. Their software as a service platform has greatly improved the efficiency.",
    name: "Evan Lwis",
  },
  {
    text: "Working with this team has been incredible. Their professionalism and dedication helped us reach a whole new level.",
    name: "Sophia Martinez",
  },
  {
    text: "The best service I have ever used. Everything was smooth, responsive, and handled with extreme care.",
    name: "Daniel Parker",
  },
];

export default function TestimonialSection() {
  const [index, setIndex] = useState(0);

  return (
    <section className="py-24 bg-white dark:bg-[#101926] overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="font-sail text-footer-green mb-2 text-xl">Our Testimonial</h3>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-navy-dark mb-10 dark:text-gray-100">
            Feedback from Clients
          </h2>
        </motion.div>

        <div className="relative flex justify-center items-center max-w-5xl mx-auto">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="hidden md:block"
          >
            <FaQuoteLeft className="text-[--primary] text-5xl opacity-20" />
          </motion.div>

          <div className="max-w-3xl mx-auto px-8 min-h-[250px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-gray-600 text-lg md:text-2xl italic leading-relaxed mb-8 dark:text-gray-300">
                  "{testimonials[index].text}"
                </p>
                <h4 className="text-navy-dark font-serif font-bold text-xl dark:text-green-200">
                  — {testimonials[index].name}
                </h4>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center mt-10 gap-3">
              {testimonials.map((_, i) => (
                <motion.span
                  key={i}
                  onClick={() => setIndex(i)}
                  animate={{
                    width: i === index ? 32 : 12,
                    backgroundColor: i === index ? "#155A4E" : "#d1d5db", 
                  }}
                  className="cursor-pointer h-3 rounded-full"
                ></motion.span>
              ))}
            </div>
          </div>

          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
            className="hidden md:block"
          >
            <FaQuoteRight className="text-[--primary] text-5xl opacity-20" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
