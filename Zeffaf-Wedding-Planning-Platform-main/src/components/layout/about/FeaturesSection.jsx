import React from "react";

import venueReservationIcon from "../../../assets/images/services/features/Venue-Reservation.svg";
import officiantIcon from "../../../assets/images/services/features/officiant.svg";
import photoshootIcon from "../../../assets/images/services/features/Photoshoot.svg";
import makeUpArtistIcon from "../../../assets/images/services/features/Makeup-Artist.svg";
import veilDesignerIcon from "../../../assets/images/services/features/Viel-Designer.svg";
import hairDresserIcon from "../../../assets/images/services/features/Hair-Dresser.svg";
import dressesAndSuitsIcon from "../../../assets/images/services/features/dresses-and-suits.svg";
import weddingPlannerIcon from "../../../assets/images/services/features/Wedding-Planner.svg";
import favorProductsIcon from "../../../assets/images/services/features/Favour-Products.svg";

import { Link } from "react-router-dom";
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/navigation";

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

export default function FeaturesSection({ desktopSlides = 4 }) {
  const featuresData = [
    {
      title: "Venue Reservation",
      desc: "Booking support that helps you secure a venue that fits your guest count and style.",
      img: venueReservationIcon,
      slug: "venues",
    },
    {
      title: "Officiant",
      desc: "Ceremony guidance with a clear structure and smooth timing.",
      img: officiantIcon,
      slug: "officiant",
    },
    {
      title: "Photoshoot",
      desc: "Structured shots with set locations for clean and memorable photos.",
      img: photoshootIcon,
      slug: "photoshoot",
    },
    {
      title: "Makeup Artist",
      desc: "Photo-ready makeup that stays in place throughout the day.",
      img: makeUpArtistIcon,
      slug: "makeup-artist",
    },
    {
      title: "Veil Designer",
      desc: "Custom veil styling that matches your dress and fits the full look.",
      img: veilDesignerIcon,
      slug: "veil-designer",
    },
    {
      title: "Hair Dresser",
      desc: "A hairstyle that fits your face shape and holds well during the event.",
      img: hairDresserIcon,
      slug: "hair-dresser",
    },
    {
      title: "Dresses and Suits",
      desc: "Ready options with quick adjustments for fit and style.",
      img: dressesAndSuitsIcon,
      slug: "dresses-suits",
    },
    {
      title: "Wedding Planner",
      desc: "Clear planning that organizes your day and keeps everything on track.",
      img: weddingPlannerIcon,
      slug: "wedding-planner",
    },
    {
      title: "Favours & Products",
      desc: "Personalized gifts that add a simple touch for your guests.",
      img: favorProductsIcon,
      slug: "favors-products",
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-white dark:bg-[#0f172a] overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="mb-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <p className="mb-3 text-primary text-[18px] md:text-[20px] font-sail">
              Our Services
            </p>

            <h2
              className="font-bodoni font-bold text-[28px] md:text-[40px] lg:text-[48px] 
text-navy dark:text-white leading-tight"
            >
              We're Providing the Best <br className="hidden sm:block" />
              Digital Wedding Solution
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div
              className="services-prev w-11 h-11 flex items-center justify-center 
border border-gray-300 dark:border-gray-700 
rounded-lg bg-white dark:bg-[#020617] 
cursor-pointer hover:bg-primary group"
            >
              <FaChevronLeft className="text-navy dark:text-white text-[14px] group-hover:text-white" />
            </div>

            <div
              className="services-next w-11 h-11 flex items-center justify-center 
rounded-lg bg-primary cursor-pointer hover:bg-primary-dark"
            >
              <FaChevronRight className="text-white text-[14px]" />
            </div>
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Swiper
            modules={[Navigation]}
            spaceBetween={24}
            slidesPerView={desktopSlides}
            loop={true}
            navigation={{
              nextEl: ".services-next",
              prevEl: ".services-prev",
            }}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: desktopSlides },
            }}
          >
            {featuresData.map((feature) => (
              <SwiperSlide key={`${feature.slug}-feature`}>
                <motion.div variants={cardVariants}>
                  <Link
                    to={`/shop?category=${feature.slug}`}
                    className="block h-full"
                  >
               <motion.div
  whileHover={{ y: -8 }}
  transition={{ type: "spring", stiffness: 300 }}
  className="
  group 
  bg-white dark:bg-[#020617]
  p-8 
  rounded-lg 
  shadow-md dark:shadow-none
  hover:shadow-xl dark:hover:shadow-primary/20
  flex flex-col 
  min-h-[300px]"
>

                      <motion.img
                        src={feature.img}
                        alt={feature.title}
                        className="w-14 h-14 mb-8"
                        whileHover={{ scale: 1.1 }}
                      />
<h3 className="text-lg font-semibold text-navy dark:text-white mb-2">
  {feature.title}
</h3>
<p className="text-footer-light dark:text-gray-400 text-sm mb-6 line-clamp-3">
  {feature.desc}
</p>

                    <span className="mt-auto inline-flex items-center gap-2 
text-primary dark:text-primary-light text-sm font-medium">
                        Read More
                        <FaArrowRight className="text-xs" />
                      </span>
                    </motion.div>
                  </Link>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}
