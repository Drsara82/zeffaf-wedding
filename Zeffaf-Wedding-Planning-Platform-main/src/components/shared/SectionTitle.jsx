import React from "react";
import Breadcrumb from "./Breadcrumb";

const SectionTitle = ({
  title,
  size = "text-5xl md:text-6xl",
  color = "text-gray-900",
  className = "",
  breadcrumbs = [],
}) => {
  return (
    <div className={`w-full pt-20 pb-8 px-4 text-center ${className}`}>
      <h2 className={`${size} font-bold ${color}`}>{title}</h2>
      <Breadcrumb items={breadcrumbs} />
    </div>
  );
};

export default SectionTitle;

//<SectionTitle title="Our Services" />
/* 
<SectionTitle 
  title="Our Services" 
  color="text-blue-600" 
/> 
*/
