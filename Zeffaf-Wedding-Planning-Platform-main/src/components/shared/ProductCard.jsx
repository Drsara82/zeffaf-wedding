import React, { useState } from "react";
import { Link } from "react-router-dom";

/* =======================
   CONSTANTS
======================= */

const FALLBACK_IMAGE =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'><rect fill='%23374151' width='400' height='300'/><text x='200' y='150' fill='%23D1D5DB' font-family='Arial, Helvetica, sans-serif' font-size='20' text-anchor='middle' dominant-baseline='middle'>No Image</text></svg>";

/* =======================
   HELPERS
======================= */
const resolveType = (product) => {
  // categories with source = products
  const productCategories = [5, 8]

  return productCategories.includes(Number(product.category_id))
    ? "product"
    : "vendor"
}


const proxyImage = (image) => {
  if (!image) return FALLBACK_IMAGE;

  if (typeof image === "string" && image.includes("drive.google.com")) {
    try {
      const stripped = image.replace(/^https?:\/\//, "");
      return `https://images.weserv.nl/?url=${encodeURIComponent(stripped)}`;
    } catch {
      return image;
    }
  }

  return image;
};

const resolveImage = (product) => {
  if (
    Array.isArray(product.product_images) &&
    product.product_images[0]?.image_url
  ) {
    return proxyImage(product.product_images[0].image_url);
  }

  if (
    Array.isArray(product.vendor_images) &&
    product.vendor_images[0]?.image_url
  ) {
    return proxyImage(product.vendor_images[0].image_url);
  }

  if (product.image) {
    return proxyImage(product.image);
  }

  return FALLBACK_IMAGE;
};


/* =======================
   COMPONENT
======================= */

const ProductCard = ({ product, buttonLabel, hidePrice = false }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const imageSrc = resolveImage(product);
const resolveType = (item) => {
  if (item.vendor_name || item.vendor_images) return "vendor"
  return "product"
}

  return (
<Link to={`/shop/${resolveType(product)}/${product.id}`}>



      <div
        className="
          group
          relative
          border
          border-gray-200 dark:border-gray-700
          rounded-lg
          overflow-hidden
          bg-white dark:bg-gray-800
          shadow-sm
          hover:shadow-lg
          transition
        "
      >
        <div className="relative">
          {imageLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-gray-100" />
            </div>
          )}

          <img
            src={imageSrc}
            alt={product.title || product.name || "Product image"}
            className="w-full h-64 object-cover"
            loading="lazy"
            onLoad={() => setImageLoading(false)}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = FALLBACK_IMAGE;
              setImageLoading(false);
            }}
          />

          <button
            className="
              absolute
              top-1/2 left-1/2
              -translate-x-1/2 -translate-y-1/2
              bg-primary
              text-white
              text-sm
              font-medium
              px-6 py-2
              rounded
              shadow-md
              opacity-0
              group-hover:opacity-100
              transition-opacity
              duration-300
            "
          >
            {buttonLabel}
          </button>
        </div>

        <div className="py-4 text-center dark:bg-gray-800">
          <h3 className="text-lg font-semibold text-primary dark:text-teal-400">
            {product.title || product.name}
          </h3>

          {!hidePrice && product.price != null && (
            <p className="text-footer-light dark:text-gray-400 mt-2">
              {product.price} EGP
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
