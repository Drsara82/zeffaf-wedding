import React from "react";
import TestimonialCard from "./ServiceTestimonialCard.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { testimonials } from "../../../data/services.js";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

export default function ServicesTestimonials() {
  return (
    <section className="w-full py-20 bg-white dark:bg-[#101926] overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="font-sail text-[20px] text-[--primary] mb-[12px] dark:text-green-200">
            Our Testimonial
          </p>
          <h1 className="font-bodoni font-bold text-[36px] md:text-[48px] text-[--navy] leading-tight mb-[14px] dark:text-white">
            Our Client's Feedback
          </h1>
        </motion.div>

        <div className="relative w-full mt-12">
          <div className="testi-prev absolute left-[-50px] top-1/2 -translate-y-1/2 z-10 cursor-pointer text-gray-400 hover:text-[--primary] transition-all hidden xl:block">
            <BiChevronLeft size={50} />
          </div>
          <div className="testi-next absolute right-[-50px] top-1/2 -translate-y-1/2 z-10 cursor-pointer text-gray-400 hover:text-[--primary] transition-all hidden xl:block">
            <BiChevronRight size={50} />
          </div>

          <Swiper
            loop={true}
            modules={[Navigation, Pagination, Autoplay]}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              nextEl: ".testi-next",
              prevEl: ".testi-prev",
            }}
            pagination={{
              el: ".custom-dots",
              clickable: true,
            }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 2 },
            }}
            className="pb-12"
          >
            {testimonials.map((item) => (
              <SwiperSlide key={item.id} className="py-4">
                <motion.div
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="h-full"
                >
                  <TestimonialCard
                    image={item.image}
                    rating={item.rating}
                    text={item.text}
                    name={item.name}
                    job={item.job}
                  />
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="custom-dots flex justify-center gap-2 mt-4"></div>
      </div>

   
    </section>
  );
}
