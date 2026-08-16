import React, { useState } from "react";
import { motion } from "framer-motion";
import BlogCard from "./BlogCard";
import Pagination from "../../shared/Pagination";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function BlogList({ mode = "grid", limit = null, blogs = [] }) {
  const limitedBlogs = limit ? blogs.slice(0, limit) : blogs;

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  const currentBlogs = limitedBlogs.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(limitedBlogs.length / itemsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const cardVariants = {
    hidden: (index) => ({
      opacity: 0,
      x: index % 2 === 0 ? -100 : 100,
    }),
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="max-w-7xl mx-auto px-8 py-20 bg-white dark:bg-[#101926] overflow-hidden">
      <p className="font-sail text-[20px] text-[--primary] text-center text-lg-start dark:text-green-200">
        Our Blog
      </p>

      <div className="flex flex-col items-center text-center gap-4 lg:flex-row lg:justify-center justify-center lg:items-center lg:text-left mb-12">
        <h2 className="font-bodoni text-[28px] md:text-[36px] lg:text-[48px] text-[--navy] text-center text-lg-start dark:text-white">
          Read Our Latest News & Blog
        </h2>
        {mode === "slider" && (
          <div className="flex items-center gap-3">
            <div className="blog-prev w-10 h-10 flex items-center justify-center border border-gray-200 dark:border-gray-700 rounded-md cursor-pointer bg-white dark:bg-[#172235] hover:bg-[--primary] dark:hover:bg-green-700 transition group">
              <FaChevronLeft className="text-[--navy] text-sm transition group-hover:text-white dark:text-white" />
            </div>

            <div className="blog-next w-10 h-10 flex items-center justify-center border border-gray-200 dark:border-gray-700 rounded-md cursor-pointer bg-white dark:bg-[#172235] hover:bg-[--primary] dark:hover:bg-green-700 transition group">
              <FaChevronRight className="text-[--navy] text-sm group-hover:text-white transition dark:text-white" />
            </div>
          </div>
        )}
      </div>

      {mode === "slider" && (
        <Swiper
          loop={true}
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={3}
          navigation={{
            nextEl: ".blog-next",
            prevEl: ".blog-prev",
          }}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {limitedBlogs.map((blog) => (
            <SwiperSlide key={blog.id}>
              <BlogCard {...blog} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {mode === "grid" && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {currentBlogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="group"
              >
                <BlogCard {...blog} />
              </motion.div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 mt-12 ">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={goToPage}
              />
            </div>
          )}
        </>
      )}
    </section>
  );
}
