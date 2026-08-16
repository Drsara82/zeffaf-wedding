import React from "react";


export default function BlogCommentList({ comments }) {
  return (
    <div className="space-y-6">
      <h3 className="font-bodoni text-[22px] dark:text-white">
        {comments.length} Comments
      </h3>

      {comments.map((c) => (
        <div
          key={c.id}
          className="flex gap-4 p-6 bg-[#F9FAFB] dark:bg-[#172235] rounded-md"
        >
          <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-green-700 flex items-center justify-center text-white font-semibold">
            {c.name[0]}
          </div>

          <div className="flex-1">
            <p className="font-semibold text-[--navy] dark:text-green-200">
              {c.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{c.date}</p>
            <p className="text-sm text-[--sidebar-text] dark:text-gray-300">
              {c.comment}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
