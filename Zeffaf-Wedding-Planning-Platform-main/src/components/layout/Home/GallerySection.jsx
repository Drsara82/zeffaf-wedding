import React from "react";
export const GallerySection = () => {
  return (
    <section className="py-16 px-4">
      <h2 className="text-center text-3xl font-serif mb-10">Our Work</h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <img
            key={i}
            src={`https://source.unsplash.com/random/600x600?wedding=${i}`}
            alt="gallery"
            className="w-full h-64 object-cover rounded-lg"
          />
        ))}
      </div>
    </section>
  );
};
