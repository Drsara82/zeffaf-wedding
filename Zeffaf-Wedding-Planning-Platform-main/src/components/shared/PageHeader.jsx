import React from "react";
import Breadcrumb from "./Breadcrumb";
import bgShape from "../../assets/images/shared/bg_shape.png";
import darkBgShape from "../../assets/images/shared/dark_mode_bg.png";

const PageHeader = ({
  title,
  breadcrumbs = [],
  bgImage = bgShape,
  className = "",
}) => {
  // Detect dark mode using window.matchMedia (for SSR/CSR safety)
  const [isDark, setIsDark] = React.useState(false);
  React.useEffect(() => {
    const match = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(
      match.matches || document.documentElement.classList.contains("dark")
    );
    const handler = (e) =>
      setIsDark(
        e.matches || document.documentElement.classList.contains("dark")
      );
    match.addEventListener("change", handler);
    return () => match.removeEventListener("change", handler);
  }, []);

  return (
    <div
      className={`
        relative w-full px-4 text-center flex items-center justify-center
        min-h-[220px] sm:min-h-[260px] md:min-h-[320px] lg:min-h-[400px]
        ${className}
        bg-header-light dark:bg-header-dark
      `}
      style={{ backgroundColor: "transparent" }}
    >
      <div
        className="absolute inset-0 w-full h-full block dark:hidden pointer-events-none"
        style={{
          backgroundImage: `url(${bgShape})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundColor: "#f6f8fd",
          zIndex: 0,
        }}
      />
      <div
        className="absolute inset-0 w-full h-full hidden dark:block pointer-events-none"
        style={{
          backgroundImage: `url(${darkBgShape})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundColor: "#181f2a",
          zIndex: 0,
        }}
      />

      <div className="relative z-10 container mx-auto pt-6">
        <h1
          className="
          max-w-3xl mx-auto
          text-[22px] sm:text-[26px] md:text-[36px] lg:text-[44px]
          leading-snug font-bold text-[--primary] mb-2
        "
        >
          {title}
        </h1>

        {breadcrumbs.length > 0 && (
          <div className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
            <Breadcrumb items={breadcrumbs} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
