import React from "react";
import { motion } from "framer-motion";

import weddingBliss from "../../../assets/images/about/worksImage/weddingBliss.png";
import weddingDressup from "../../../assets/images/about/worksImage/weddingDressup.png";
import weddingRing from "../../../assets/images/about/worksImage/weddingRing.png";
import decorationPlan from "../../../assets/images/about/worksImage/decorationPlan.png";
import madeWithLove from "../../../assets/images/about/worksImage/madeWithLove.png";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function OurWorkSection() {
  const worksData = [
    {
      title: "Wedding Planning",
      desc: "Full planning from engagement to wedding day",
      img: weddingBliss,
    },
    {
      title: "Bridal Styling",
      desc: "Dress selection makeup and full bridal look",
      img: weddingDressup,
    },
    {
      title: "Ring & Proposal",
      desc: "Engagement rings and proposal arrangements",
      img: weddingRing,
    },
    {
      title: "Venue Decoration",
      desc: "Floral design lighting and table setup",
      img: decorationPlan,
    },
    {
      title: "Made With Love",
      desc: "Every detail crafted with care and passion",
      img: madeWithLove,
    },
  ];

  return (
<section className="py-16 md:py-20 bg-white dark:bg-[#0f172a] overflow-hidden">

      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <p className="mb-3 text-[--primary] text-lg font-sail">
            Our Projects
          </p>
          <h2 className="font-bodoni font-bold text-3xl md:text-4xl lg:text-5xl text-[--navy] dark:text-white leading-tight">

            Our Amazing Work
          </h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
        >
          {worksData.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="group flex flex-col items-center"
            >
              {/* Image */}
              <motion.div
            className="w-full aspect-square rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700"
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Card */}
            <div className="bg-white dark:bg-[#020617] rounded-lg border border-gray-100 dark:border-gray-700 px-4 py-4 w-[92%] -mt-10 text-center min-h-[110px]">

              <h3 className="font-serif text-base md:text-lg font-bold text-footer-green dark:text-white line-clamp-1">

                  {item.title}
                </h3>
            <p className="text-footer-light dark:text-gray-400 text-sm mt-1 line-clamp-2 group-hover:line-clamp-none transition-all">

                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
