import React from "react";

export default function Pagination({
  currentPage = 1,
  totalPages = 5,
  onPageChange,
}) {
  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`
            w-10 h-10
            flex items-center justify-center
            rounded-sm
            font-medium
            transition-all duration-300
            ${
              currentPage === i
                ? "bg-primary text-white dark:bg-green-700 dark:text-white"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 dark:bg-[#172235] dark:text-gray-200 dark:border-gray-700 dark:hover:bg-green-700"
            }
          `}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`
          w-10 h-10
          flex items-center justify-center
          rounded-sm
          border border-gray-200 dark:border-gray-700
          transition-all duration-300
          ${
            currentPage === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600"
              : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-[#172235] dark:text-gray-200 dark:hover:bg-green-700"
          }
        `}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M15 18l-6-6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {renderPageNumbers()}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`
          w-10 h-10
          flex items-center justify-center
          rounded-sm
          border border-gray-200 dark:border-gray-700
          transition-all duration-300
          ${
            currentPage === totalPages
              ? "bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600"
              : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-[#172235] dark:text-gray-200 dark:hover:bg-green-700"
          }
        `}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 18l6-6-6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
/* <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      /> */
