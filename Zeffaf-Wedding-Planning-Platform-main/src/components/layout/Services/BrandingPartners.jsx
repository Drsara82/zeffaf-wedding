import React from "react";
import { motion } from "framer-motion";
import wallnut from "../../../assets/images/brand-logos/wallnut.svg";
import saveTheDate from "../../../assets/images/brand-logos/save-the-date.svg";
import forever from "../../../assets/images/brand-logos/forever.svg";
import ne from "../../../assets/images/brand-logos/ne.svg";

export default function BrandingPartners() {
  const logos = [wallnut, saveTheDate, forever, ne];

  return (
    <div className="w-full bg-white dark:bg-[#101926] py-16 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-[24px] font-medium leading-[34px] text-navy whitespace-nowrap text-center lg:text-left lg:mr-10 dark:text-gray-100"
          >
            Our Trusted Branding Partners
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
            className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 justify-items-center gap-10 md:gap-20"
          >
            {logos.map((logo, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 },
                }}
                whileHover={{
                  scale: 1.1,
                  filter: "grayscale(0%)",
                  transition: { duration: 0.3 },
                }}
                className="flex items-center justify-center grayscale-[100%] hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-500"
              >
                <img
                  src={logo}
                  alt="partner logo"
                  className="w-[130px] h-[119px] object-contain cursor-pointer"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
