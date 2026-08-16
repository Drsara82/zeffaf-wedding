import React from "react";
import ceremonies from "../../../assets/images/about/iconsabout/ceremonies.svg";
import flowerarrangements from "../../../assets/images/about/iconsabout/flowerarrangements.svg";
import happycouple from "../../../assets/images/about/iconsabout/happycouple.svg";
import weddingcakes from "../../../assets/images/about/iconsabout/weddingcakes.svg";
import { motion } from "framer-motion";
export default function AboutStats() {
  const stats = [
    { icon: flowerarrangements, number: "1542+", label: "Flower Arrangements" },
    { icon: happycouple, number: "1,260+", label: "Happy Couples" },
    { icon: weddingcakes, number: "150+", label: "Wedding Cakes" },
    { icon: ceremonies, number: "1000+", label: "Ceremonies" },
  ];
  const duplicatedStats = [...stats, ...stats];
 return (
    <section className="py-16 bg-white dark:bg-[#101926] overflow-hidden border-y border-gray-100 dark:border-gray-800">
      <div className="relative flex">
        <motion.div
          className="flex space-x-12 items-center whitespace-nowrap"
          animate={{
            x: ["0%", "-50%"], 
          }}
          transition={{
            duration: 25, 
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {duplicatedStats.map((item, index) => (
            <div key={index} className="flex items-center space-x-4 min-w-[250px]">
              <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                <img src={item.icon} alt="stat icon" className="w-10 h-10 object-contain" />
              </div>

              <div className="flex flex-col text-left">
                <h3 className="text-2xl font-serif font-bold text-emerald-800 dark:text-green-200">
                  {item.number}
                </h3>
                <p className="text-gray-500 text-sm font-medium dark:text-gray-300">
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

