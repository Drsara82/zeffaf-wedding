import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function SharedButton({
  children = "Book Now",
  to,
  href,
  onClick,
  variant = "primary",
  size = "md",
  icon = true,
  disabled = false,
  className = "",
  bgColor,
  textColor,
  ...props
}) {
  const sizes = {
    sm: "text-sm px-4 py-2",
    md: "text-base px-6 py-3",
    lg: "text-lg px-8 py-4",
  };

  const variants = {
    primary: {
      bg: "bg-navy text-white hover:bg-[#030b2e]",
      border: "border-navy",
    },
 green: {
  bg: `
    bg-primary text-white
    hover:bg-[#1E7A6E]
    dark:bg-[#1B5E54]
    dark:hover:bg-[#237A6C]
  `,
  border: `
    border-primary
    dark:border-[#2F8F80]
  `,
},
    white: {
      bg: "bg-white text-navy hover:bg-gray-100",
      border: "border-white",
    },
  };

  const sizeClass = sizes[size] || sizes.md;
  const selectedVariant = variants[variant] || variants.primary;

  const variantClass = bgColor
    ? `${textColor ? `text-[${textColor}]` : "text-white"}`
    : selectedVariant.bg;

  const borderClass = bgColor ? `border-[${bgColor}]` : selectedVariant.border;
  const customBgStyle = bgColor ? { backgroundColor: bgColor } : {};

  const sharedClasses = `
    group relative inline-flex items-center justify-center 
    ${sizeClass} ${variantClass} font-medium tracking-wide
    rounded-sm shadow-md transition-colors duration-300
    ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
    ${className}
  `;

  const buttonVariants = {
    hover: { scale: 1.03 },
    tap: { scale: 0.97 },
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 }
  };

  const content = (
    <>
      <span
        className={`
          absolute -right-1.5 -bottom-1.5 
          w-full h-full 
         border ${borderClass} opacity-70 dark:opacity-50

          rounded-sm 
          pointer-events-none 
          transition-all duration-300 
          group-hover:right-0 group-hover:bottom-0
        `}
      />
      <span className="relative z-10 flex items-center">
        <span className={icon ? "mr-2" : ""}>{children}</span>
        {icon && (
          <motion.svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            variants={{
              hover: { x: 5 },
              initial: { x: 0 }
            }}
            transition={{ type: "spring", stiffness: 400 }}
            className="inline-block"
          >
            <path
              d="M5 12h14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 5l7 7-7 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        )}
      </span>
    </>
  );

  const Component = to ? motion(Link) : href ? motion.a : motion.button;
  
  const commonProps = {
    className: sharedClasses,
    style: customBgStyle,
    variants: buttonVariants,
    initial: "initial",
    animate: "animate",
    whileHover: disabled ? {} : "hover",
    whileTap: disabled ? {} : "tap",
    onClick: onClick,
    ...props
  };

  if (to && !disabled) return <Component to={to} {...commonProps}>{content}</Component>;
  if (href && !disabled) return <Component href={href} target="_blank" rel="noopener noreferrer" {...commonProps}>{content}</Component>;
  
  return <Component disabled={disabled} {...commonProps}>{content}</Component>;
}
// امثله علي الاستخدام
/*   Internal Link
<SharedButton to="/about">More About Us</SharedButton>

  External Link
<SharedButton href="https://google.com">Visit</SharedButton>

  بدون سهم
<SharedButton to="/contact" icon={false}>Contact</SharedButton>

  Button عادي (مش Link)
<SharedButton onClick={handleSubmit}>Submit Form</SharedButton>

  أنواع مختلفة
<SharedButton variant="ghost">Ghost</SharedButton>

//  Disabled
<SharedButton disabled>Can't Click</SharedButton> 

مع تغيير الالوان

<SharedButton to="/about" variant="primary">Primary</SharedButton>
<SharedButton to="/about" variant="ghost">Ghost (Green)</SharedButton>
<SharedButton to="/about" variant="outline">Outline</SharedButton>
<SharedButton to="/about" variant="red">Red Button</SharedButton>
<SharedButton to="/about" variant="yellow">Yellow Button</SharedButton>

*/
