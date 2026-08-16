import React from "react";

import img1 from "../../../assets/images/home/ourWork/ben-atkins.jpg";

import img2 from "../../../assets/images/home/ourWork/jen-theodore.jpg";

import img3 from "../../../assets/images/home/ourWork/jens-lindner.jpg";

import img4 from "../../../assets/images/home/ourWork/ozkan-guner.jpg";

import img5 from "../../../assets/images/home/ourWork/pexels-alinatolle.jpg";

import img6 from "../../../assets/images/home/ourWork/wedding-dreamz.jpg";
import { motion } from "framer-motion";
const works = [
  {
    id: 1,

    image: img1,

    title: "Maria & Neville",

    subtitle: "Austria, Jul 2022",
  },

  {
    id: 2,

    image: img2,

    title: "Wedding Story",

    subtitle: "Nature Session",
  },

  {
    id: 3,

    image: img3,

    title: "Happy Couple",

    subtitle: "Indoor Wedding",
  },

  {
    id: 4,

    image: img4,

    title: "Forest Love",

    subtitle: "Outdoor Shoot",
  },

  {
    id: 5,

    image: img5,

    title: "Classic Bride",

    subtitle: "Black & White",
  },

  {
    id: 6,

    image: img6,

    title: "Wedding Day",

    subtitle: "Special Moments",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function OurWorkSection() {
  return (
    <section className="py-20 bg-white dark:bg-[#101926]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-center leading-[28px] mb-4 text-[--primary] text-[20px] font-sail">
            Portfolio
          </p>
          <h2 className="text-3xl font-serif font-semibold text-footer-dark dark:text-gray-100">
            Our Work
          </h2>
        </div>

        <motion.div
          className="grid grid-cols-12 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {works.map((work, index) => {
            const gridSpans = [
              "col-span-12 sm:col-span-6 lg:col-span-4",
              "col-span-12 sm:col-span-6 lg:col-span-3",
              "col-span-12 sm:col-span-6 lg:col-span-5",
              "col-span-12 sm:col-span-6 lg:col-span-3",
              "col-span-12 sm:col-span-6 lg:col-span-4",
              "col-span-12 sm:col-span-6 lg:col-span-5",
            ];

            return (
              <WorkCard
                key={work.id}
                item={work}
                className={gridSpans[index]}
                variants={itemVariants}
              />
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function WorkCard({ item, className }) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -10 }}
      className={`${className} h-[300px] group relative overflow-hidden rounded-lg shadow-sm`}
    >
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[90%] h-[90%] bg-white/40 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-lg transform group-hover:scale-100 scale-95">
          <h3 className="text-2xl font-semibold fixed-title">{item.title}</h3>

          <p className="text-sm font-medium fixed-subtitle">{item.subtitle}</p>
        </div>
      </div>
    </motion.div>
  );
}
