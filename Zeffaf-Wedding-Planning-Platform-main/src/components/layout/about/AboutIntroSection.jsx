import React from "react";
import { motion } from "framer-motion";
import coupleImage from "../../../assets/images/about/image (2).png";
import SharedButton from "../../shared/Button";

export default function AboutIntroSection() {
  return (
    <section className="py-20 bg-white dark:bg-[#101926] overflow-hidden">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative inline-block"
        >
          <img
            src={coupleImage}
            alt="About Us"
            className="w-full block hover:scale-[1.02] transition-transform duration-500"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="absolute -bottom-4 -right-4 w-full h-full border-2 border-[--primary] rounded-lg -z-10"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6"
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-[--primary] text-lg md:text-xl font-sail"
          >
            About <span className="font-sail"> Zeffaf</span>
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-footer-dark leading-tight"
          >
            We Will Make Your Dream
            <br />
            Wedding A Reality
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="space-y-4"
          >
            <p className="text-footer-light text-sm md:text-base leading-relaxed">
              Zeffaf is a wedding platform built to simplify planning and reduce
              stress. We help couples discover trusted vendors manage details
              and make confident decisions.
            </p>
            <p className="text-footer-light text-sm md:text-base leading-relaxed">
              Our focus is clarity organization and meaningful choices. Every
              feature supports a smoother journey from engagement to wedding
              day.
            </p>
          </motion.div>

          <div className="flex justify-center md:justify-start">
            <SharedButton to="/about" variant="primary" size="md">
              More About Us
            </SharedButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
