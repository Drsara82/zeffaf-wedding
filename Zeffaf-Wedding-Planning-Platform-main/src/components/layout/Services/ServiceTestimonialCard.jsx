import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

export default function TestimonialCard({
  image,
  rating = 5,
  text,
  name,
  job,
}) {
  return (
    <div
      className="
    w-full
    md:w-[520px]
    lg:w-[570px]
    h-auto
    lg:h-[272px]
    bg-white dark:bg-[#172235]
    rounded-xl
    shadow-md dark:shadow-lg
    p-6
    flex
    gap-4
    items-start
    border dark:border-gray-700
  "
    >
      <img
        src={image}
        alt={name}
        className="w-16 h-16 rounded-full object-cover flex-shrink-0"
      />

      <div className="flex flex-col justify-center h-full w-full">
        <div className="flex gap-1 mb-2">
          {Array.from({ length: 5 }).map((_, i) =>
            i < rating ? (
              <FaStar key={i} className="text-yellow-400 text-[16px]" />
            ) : (
              <FaRegStar key={i} className="text-yellow-400 text-[16px]" />
            )
          )}
        </div>

        <p className="text-[--sidebar-text] text-[14px] leading-[22px] max-w-[90%] dark:text-gray-200">
          {text}
        </p>

        <div className="mt-6">
          <p className="text-[--primary] font-semibold text-[16px] font-bodoni dark:text-green-200">
            {name}
          </p>
          <p className="text-[--sidebar-text] text-[13px] font-opensans dark:text-gray-400">
            {job}
          </p>
        </div>
      </div>
    </div>
  );
}
