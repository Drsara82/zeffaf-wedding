import React from "react";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { FaRegComment, FaArrowRight } from "react-icons/fa";

export default function BlogCard({ id, image, date, title, comments }) {
  return (
    <Link
      to={`/blog/${id}`}
      className="group block bg-white dark:bg-[#172235] rounded-xl overflow-hidden shadow 
                 transition-all duration-300 hover:shadow-lg hover:scale-[1.03]
                 max-w-[410px] max-h-[488px] border border-gray-200 dark:border-gray-700"
    >
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-[320px] object-cover bg-gray-100 dark:bg-gray-900"
        />

        <div
          className="absolute bottom-[-24px] right-[20px]
                     bg-[--primary] text-white w-[50px] h-[56px]
                     flex flex-col items-center justify-center dark:bg-green-700"
        >
          <span className="text-[20px] font-bold dark:text-white">
            {date.split(" ")[0]}
          </span>
          <span className="text-[12px] dark:text-gray-200">
            {date.split(" ")[1]}
          </span>
        </div>
      </div>

      <div className="p-5 bg-white dark:bg-[#172235]">
        <div className="text-[--sidebar-text] text-xs flex items-center gap-4 mb-2 dark:text-gray-300">
          <span className="flex items-center gap-1">
            <CgProfile className="text-[--primary] dark:text-white" />
            <span className="dark:text-white">Admin</span>
          </span>

          <span className="flex items-center gap-1">
            <FaRegComment className="text-[--primary] dark:text-white" />
            <span className="dark:text-white">
              {comments?.length || 0} Comments
            </span>
          </span>
        </div>

        <h3
          className="font-bodoni text-[22px] leading-[34px] font-bold
                     text-[--primary] mb-4
                     group-hover:text-[--navy] dark:text-white dark:group-hover:text-green-300"
        >
          {title}
        </h3>

        <div
          className="flex items-center gap-1 text-sm font-semibold
                     text-[--sidebar-text] dark:text-gray-300
                     group-hover:text-[--primary] dark:group-hover:text-green-300 "
        >
          Read More
          <FaArrowRight className="text-xs transition-transform duration-300 ease-in-out group-hover:translate-x-2" />
        </div>
      </div>
    </Link>
  );
}
