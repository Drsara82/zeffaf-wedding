import React, { useState, useEffect } from "react";
import leftImg from "../../../assets/images/services/image_1.png";
import rightImg from "../../../assets/images/services/image_2.png";
import mobileLeftImg from "../../../assets/images/services/mobileLeftImg.jpg";
import { motion } from "framer-motion";
import Button from "../../shared/Button";

export default function ServicesAbout() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="w-full bg-white dark:bg-[#101926] py-20 overflow-hidden">
      <motion.div
        className="max-w-[1200px] mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="flex flex-col items-center">
          <motion.p
            variants={itemVariants}
            className="font-sail text-[20px] text-[--primary] text-center mb-2 dark:text-green-200"
          >
            About Zeffaf
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="font-bodoni font-bold text-[36px] md:text-[48px] lg:text-[64px] text-[--navy] text-center leading-[44px] md:leading-[56px] lg:leading-[70px] mb-10 dark:text-white"
          >
            Unrivaled Scenery <br /> Unforgettable
          </motion.h1>
        </div>

        <div
          className="
            flex flex-col items-center gap-10
            lg:flex-row lg:items-center lg:justify-between lg:gap-16
          "
        >
          <motion.div variants={itemVariants}>
            <img
              src={isMobile ? mobileLeftImg : leftImg}
              alt="Left decor"
              className="
                w-[170px] h-[170px]
                md:w-[220px] md:h-[220px]
                lg:w-[260px] lg:h-[260px]
                rounded-full object-cover shadow-lg
              "
            />
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="max-w-[550px] text-center px-4"
          >
            <p
              className="
                font-opensans
                text-[14px] md:text-[16px] lg:text-[18px]
                leading-[22px] md:leading-[26px] lg:leading-[28px] dark:text-gray-300
                text-gray-700 
                mb-6 md:mb-8 lg:mb-10
              "
            >
              Our wedding planning and event coordination services are built to
              fit any budget while keeping the experience simple and
              stress-free. You get clear guidance, organized support, and a team
              focused on delivering a smooth celebration that matches your
              vision.
            </p>

            <Button
              to="/about"
              children="Read More"
              variant="green"
              className="mx-auto"
            />
          </motion.div>

          {!isMobile && (
            <motion.div variants={itemVariants}>
              <img
                src={rightImg}
                alt="Right decor"
                className="
                  w-[170px] h-[170px]
                  md:w-[220px] md:h-[220px]
                  lg:w-[260px] lg:h-[260px]
                  rounded-full object-cover shadow-lg
                "
              />
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
