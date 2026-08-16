import React from "react";
export const AboutSection = () => {
  return (
    <section className="py-20 px-4 bg-white dark:bg-[#101926]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <img
          src="https://images.unsplash.com/photo-1520854221256-17451cc331bf"
          alt="about"
          className="rounded-xl"
        />
        <div>
          <p className="text-emerald-600 text-sm mb-2">Our Story</p>
          <h2 className="text-3xl font-serif mb-4 dark:text-white">
            Weave Story Into Every Thread of Your Event
          </h2>
          <p className="text-gray-600 mb-6 dark:text-gray-300">
            Our wedding planning and events coordination services are designed
            for any sized budget.
          </p>
          <button className="bg-emerald-600 text-white px-6 py-3 rounded">
            More About Us
          </button>
        </div>
      </div>
    </section>
  );
};
