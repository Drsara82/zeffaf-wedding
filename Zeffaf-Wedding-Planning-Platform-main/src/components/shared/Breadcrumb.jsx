import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ items = [] }) => {
  if (!items.length) return null;

  return (
    <nav className="mt-4" aria-label="breadcrumb">
      <div className="flex items-center justify-center text-sm">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;

          return (
            <span key={idx} className="inline-flex items-center">
              {item.href && !isLast ? (
                <Link
                  to={item.href}
                  className="text-gray-600 hover:text-primary transition dark:text-gray-300 dark:hover:text-emerald-400"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={
                    isLast
                      ? "text-navy font-medium dark:text-emerald-400"
                      : "text-gray-600 dark:text-gray-300"
                  }
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}

              {!isLast && (
                <span className="text-gray-400 dark:text-gray-500 mx-2">
                  {">"}
                </span>
              )}
            </span>
          );
        })}
      </div>
    </nav>
  );
};

export default Breadcrumb;
/* 

<Breadcrumb 
  items={[
    { label: 'Shop', href: '/shop' },
    { label: 'Wedding Dress' },
  ]}
/>
*/
