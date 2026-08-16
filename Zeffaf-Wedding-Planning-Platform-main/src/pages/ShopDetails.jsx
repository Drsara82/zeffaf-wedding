import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext.jsx";

import {
  FaFacebookF,
  FaArrowRight,
  FaTwitter,
  FaInstagram,
  FaPinterestP,
  FaStar,
} from "react-icons/fa";
import PageHeader from "../components/shared/PageHeader.jsx";
import AnimatedPage from "../components/shared/AnimatedPage";
import { supabase } from "../services/supabase";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

const tabContentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

const proxyImage = (image) => {
  if (!image || typeof image !== "string") {
    return "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'><rect fill='%23f3f4f6' width='400' height='300'/></svg>";
  }

  if (image.includes("drive.google.com")) {
    const stripped = image.replace(/^https?:\/\//, "");
    return `https://images.weserv.nl/?url=${encodeURIComponent(stripped)}`;
  }

  return image;
};

const renderField = (label, value) => {
  if (!value || (Array.isArray(value) && value.length === 0)) return null;

  return (
    <div className="flex gap-2">
      <span className="font-semibold text-footer-dark">{label}</span>

      {Array.isArray(value) ? (
        <div className="flex flex-wrap gap-2">
          {value.map((v, i) => (
            <span key={i} className="text-footer-light">
              {v}
            </span>
          ))}
        </div>
      ) : (
        <span className="text-footer-light">{value}</span>
      )}
    </div>
  );
};

const CATEGORY_MAP = {
  1: { label: "Venues", slug: "venues" },
  2: { label: "Veil Designer", slug: "veil-designer" },
  3: { label: "Wedding Planner", slug: "wedding-planner" },
  4: { label: "Hair Dresser", slug: "hair-dresser" },
  5: { label: "Favors & Products", slug: "favors-products" },
  6: { label: "Officiant", slug: "officiant" },
  7: { label: "Makeup Artist", slug: "makeup-artist" },
  8: { label: "Dresses & Suits", slug: "dresses-suits" },
  9: { label: "Photoshoot", slug: "photoshoot" },
};

const ShopDetails = () => {
  const { type, id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [tab, setTab] = useState("description");
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [dateError, setDateError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [errors, setErrors] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!name.trim() || name.length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (rating < 1) {
      newErrors.rating = "Rating is required";
    }

    if (!review.trim() || review.length < 10) {
      newErrors.review = "Review must be at least 10 characters";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    if (!product?.id) {
      toast.error("Invalid item");
      return;
    }

    try {
      const { error } = await supabase.from("vendor_reviews").insert({
        vendor_id: Number(product.id),
        user_name: name.trim(),
        comment: review.trim(),
        rate: rating,
      });

      if (error) throw error;

      setProduct((prev) => ({
        ...prev,
        vendor_reviews: [
          ...(prev.vendor_reviews || []),
          {
            user_name: name.trim(),
            comment: review.trim(),
            rate: rating,
          },
        ],
      }));

      setName("");
      setEmail("");
      setReview("");
      setRating(0);
      setErrors({});
    } catch (err) {
      toast.error("Failed to submit review");
    }
  };

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);

      const numericId = Number(id);

      if (!numericId) {
        setProduct(null);
        setLoading(false);
        return;
      }

      try {
        // PRODUCT
        if (type === "product") {
          const { data, error } = await supabase
            .from("products")
            .select("*, product_images(image_url)")
            .eq("id", numericId)
            .maybeSingle();

          if (error) throw error;

          setProduct(data || null);
        }

        // VENDOR
        if (type === "vendor") {
          const { data, error } = await supabase
            .from("vendors")
            .select(
              `
      *,
      packages,
      vendor_available_dates(available_date),
      vendor_images(image_url),
      vendor_reviews(user_name, rate, comment)
    `
            )
            .eq("id", numericId)
            .maybeSingle();

          if (error) {
            console.log(error);
          }

          setProduct(data || null);
        }
      } catch {
        setProduct(null);
      }

      setLoading(false);
    };

    fetchItem();
  }, [type, id]);

const { user, loading: authLoading } = useAuth();


/**
 * Handles adding a package to the cart.
 * It checks if the user is logged in and if a package is selected.
 * If the vendor is a product vendor, it also checks if a date is selected.
 * If the package is already in the cart, it shows an error message.
 * If there is an error while adding the package, it shows an error message.
 * If the package is added successfully, it shows a success message and dispatches a userChanged event.
 */
const handleAddPackageToCart = async () => {
  try {
    if (authLoading) return;

    if (!user) {
      toast.error("You must be logged in");
      return;
    }

    if (!selectedPackage) {
      toast.error("Please select a package");
      return;
    }

    if (product?.category_id === 1 && !selectedDate) {
      setDateError("Please select a date");
      return;
    }

    const vendorId = Number(product.id);
    if (Number.isNaN(vendorId)) {
      toast.error("Invalid vendor");
      return;
    }

    const imageUrl =
      Array.isArray(product.vendor_images) && product.vendor_images.length > 0
        ? product.vendor_images[0].image_url
        : null;

    const { data: existing } = await supabase
      .from("cart_items")
      .select("id")
      .eq("user_id", user.id)
      .eq("vendor_id", vendorId)
      .maybeSingle();

    if (existing) {
      toast.error("You already selected a package for this vendor");
      return;
    }

    const { error } = await supabase.from("cart_items").insert({
      user_id: user.id,
      vendor_id: vendorId,
      package_id: selectedPackage.id ?? null,
      title: `${product.name} - ${selectedPackage.title}`,
      price: selectedPackage.price,
      quantity: 1,
      booking_date: selectedDate || null,
      image_url: imageUrl,
    });

    if (error) throw error;

    window.dispatchEvent(new Event("userChanged"));
    toast.success("Package added to cart");
  } catch (err) {
    console.error(err);
    toast.error("Failed to add package");
  }
};



  if (loading) {
    return (
      <div className="flex justify-center py-40">
        <div className="animate-spin h-10 w-10 border-b-2 border-[#1B7262]" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-40 text-gray-500">Item not found</div>
    );
  }

  const itemTitle = product.title || product.name || "Details";
  const categoryData = CATEGORY_MAP[Number(product.category_id)] || null;

  const images = [
    ...(Array.isArray(product.product_images)
      ? product.product_images.map((i) => i.image_url)
      : []),
    ...(Array.isArray(product.vendor_images)
      ? product.vendor_images.map((i) => i.image_url)
      : []),
  ];

const handleAddDateToCart = async (date) => {
  try {
    if (authLoading) return;

    if (!user) {
      toast.error("You must be logged in");
      return;
    }

    const vendorId = Number(product.id);
    if (Number.isNaN(vendorId)) {
      toast.error("Invalid vendor");
      return;
    }

    const imageUrl =
      Array.isArray(product.vendor_images) && product.vendor_images.length > 0
        ? product.vendor_images[0].image_url
        : null;

    // check existing booking
    const { data: existing, error: checkError } = await supabase
      .from("cart_items")
      .select("id")
      .eq("user_id", user.id)
      .eq("vendor_id", vendorId)
      .maybeSingle();

    if (checkError) throw checkError;

    if (existing) {
      toast.error("You already booked a date for this vendor");
      return;
    }

    // insert booking
    const { error } = await supabase.from("cart_items").insert({
      user_id: user.id,
      vendor_id: vendorId,
      booking_date: date,
      quantity: 1,
      price: product.price || 0,
      title: `${product.name} - ${date}`,
      image_url: imageUrl,
    });

    if (error) throw error;

    setSelectedDate(date);
    setDateError("");
    window.dispatchEvent(new Event("userChanged"));

    toast.success(`Booking confirmed for ${date}`);
  } catch (err) {
    console.error(err);
    toast.error("Failed to add date");
  }
};

const handleAddSimpleProductToCart = async () => {
  try {
    if (authLoading) return;

    if (!user) {
      toast.error("You must be logged in");
      return;
    }

    const imageUrl =
      Array.isArray(product.product_images) &&
      product.product_images.length > 0
        ? product.product_images[0].image_url
        : null;

    // check if product already in cart
    const { data: existing, error: checkError } = await supabase
      .from("cart_items")
      .select("id, quantity")
      .eq("user_id", user.id)
      .eq("product_id", product.id)
      .maybeSingle();

    if (checkError) throw checkError;

    // لو موجود نزود الكمية
    if (existing) {
      const { error } = await supabase
        .from("cart_items")
        .update({
          quantity: existing.quantity + 1,
        })
        .eq("id", existing.id);

      if (error) throw error;
    }
    // لو مش موجود نعمل insert
    else {
      const { error } = await supabase.from("cart_items").insert({
        user_id: user.id,
        product_id: product.id,
        quantity: 1,
        price: product.price || 0,
        title: product.title || product.name,
        image_url: imageUrl,
      });

      if (error) throw error;
    }

    window.dispatchEvent(new Event("userChanged"));
    toast.success("Added to cart");
  } catch (err) {
    console.error(err);
    toast.error("Failed to add to cart");
  }
};


  const safeImages = images.filter(Boolean);

  return (
    <AnimatedPage>
      <div className="bg-footer-ground dark:bg-gray-900">
        <PageHeader
          title={itemTitle}
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            categoryData && {
              label: categoryData.label,
              href: `/shop?category=${categoryData.slug}`,
            },
            { label: itemTitle },
          ].filter(Boolean)}
        />

        <main className="max-w-7xl mx-auto px-4 py-16 ">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div>
              <Swiper
                modules={[Navigation, Pagination, Thumbs]}
                pagination={{ clickable: true }}
                thumbs={{ swiper: thumbsSwiper }}
              >
                {safeImages.map((img, i) => (
                  <SwiperSlide key={i}>
                    <img
                      src={proxyImage(img)}
                      className="w-full h-[480px] object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              {safeImages.length > 1 && (
                <Swiper
                  modules={[Thumbs]}
                  onSwiper={setThumbsSwiper}
                  slidesPerView={4}
                  spaceBetween={10}
                  className="mt-4"
                >
                  {safeImages.map((img, i) => (
                    <SwiperSlide key={i}>
                      <img
                        src={proxyImage(img)}
                        className="h-24 w-full object-cover cursor-pointer"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>

            <div className="space-y-4">
              <h1 className="mt-6 text-4xl font-bold text-footer-dark dark:text-white">
                {product?.title || product?.name || ""}
              </h1>

              <p className="text-footer-light dark:text-gray-300 text-lg">
                {product?.description || "More details will be added soon."}
              </p>

              <div className="space-y-2 pt-4 text-base dark:text-gray-300">
                {renderField(
                  "Price:",
                  product?.price
                    ? `${Number(product.price).toLocaleString()} EGP`
                    : product?.priceFrom
                    ? `From ${product.priceFrom} EGP`
                    : null
                )}

                {renderField("Location:", product?.location)}
                {renderField("Capacity:", product?.capacity)}

                {renderField(
                  "Phone:",
                  Array.isArray(product?.phone)
                    ? product.phone
                    : product?.phone
                    ? [product.phone]
                    : null
                )}

                {renderField("Website:", product?.website)}
                {renderField("Instagram:", product?.instagram)}
                {renderField(
                  "Facebook:",
                  product?.facebook || product?.Facebook
                )}
              </div>

              {Array.isArray(product?.vendor_available_dates) &&
                product.vendor_available_dates.length > 0 && (
                  <div className="pt-4">
                    <p className="font-semibold mb-2">Available Dates</p>

                    <div className="flex flex-wrap gap-2">
                      {product.vendor_available_dates.map((d, index) => {
                        if (!d?.available_date) return null;

                        return (
                          <button
                            key={`${d.available_date}-${index}`}
                            onClick={() => {
                              setSelectedDate(d.available_date);
                              setDateError("");
                            }}
                            className={`px-3 py-2 border rounded transition ${
                              selectedDate === d.available_date
                                ? "bg-primary text-white"
                                : ""
                            }`}
                          >
                            {d.available_date}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      disabled={!selectedDate}
                      onClick={() => handleAddDateToCart(selectedDate)}
                      className={`mt-4 px-6 py-3 font-semibold transition dark:disabled:bg-gray-700 dark:disabled:text-gray-500 ${
                        selectedDate
                          ? "bg-footer-dark text-white dark:bg-teal-600"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      Add Date to Cart
                    </button>

                    {dateError && (
                      <p className="text-red-500 text-sm mt-1">{dateError}</p>
                    )}
                  </div>
                )}

              {Array.isArray(product?.packages) &&
                product.packages.length > 0 && (
                  <div className="pt-6">
                    <h3 className="text-xl font-bold mb-3">Packages</h3>

                    <div className="space-y-3">
                      {product.packages.map((pkg, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedPackage(pkg)}
                          className={`w-full text-left border p-4 rounded dark:border-gray-700 dark:text-gray-200 ${
                            selectedPackage === pkg
                              ? "border-primary bg-primary/10 dark:bg-teal-600/20 dark:border-teal-600"
                              : "dark:bg-gray-800 dark:hover:bg-gray-700"
                          }`}
                        >
                          <p className="font-semibold dark:text-white">
                            {pkg.title} – {pkg.price} EGP
                          </p>

                          {Array.isArray(pkg.services) &&
                            pkg.services.length > 0 && (
                              <ul className="list-disc list-inside text-sm mt-2 dark:text-gray-300">
                                {pkg.services.map((s, i) => (
                                  <li key={i}>{s}</li>
                                ))}
                              </ul>
                            )}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={handleAddPackageToCart}
                      className="mt-6 flex items-center gap-2 bg-footer-dark dark:bg-teal-600 text-white px-6 py-3 dark:hover:bg-teal-700 transition"
                    >
                      Add Package to Cart
                      <FaArrowRight />
                    </button>
                  </div>
                )}

              {!product?.vendor_packages &&
                !product?.vendor_available_dates && (
                  <div className="pt-6">
                    <button
                      onClick={handleAddSimpleProductToCart}
                      className="bg-footer-dark dark:bg-teal-600 text-white px-6 py-3 font-semibold dark:hover:bg-teal-700 transition"
                    >
                      Add to Cart
                    </button>
                  </div>
                )}

              <div className="flex gap-4 pt-6 text-footer-light dark:text-gray-400">
                <FaFacebookF />
                <FaTwitter />
                <FaInstagram />
                <FaPinterestP />
              </div>
            </div>
          </div>

          <div className="flex mb-8 justify-center items-center space-x-4 ">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setTab("description")}
              className={`px-6 py-3 text-normal font-semibold transition-colors duration-300 dark:border-gray-700 ${
                tab === "description"
                  ? "bg-[#1B7262] text-white dark:bg-teal-600 dark:text-white"
                  : "bg-[#F7F7F7] dark:bg-gray-800 text-footer-dark dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              Description
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setTab("reviews")}
              className={`px-6 py-3 text-normal font-semibold transition-colors duration-300 dark:border-gray-700 ${
                tab === "reviews"
                  ? "bg-[#1B7262] text-white dark:bg-teal-600 dark:text-white"
                  : "bg-[#F7F7F7] dark:bg-gray-800 text-footer-dark dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              Reviews ({product.vendor_reviews?.length || 0})
            </motion.button>
          </div>

          <div className="py-4 dark:bg-gray-800 dark:rounded px-20">
            <AnimatePresence mode="wait">
              {tab === "description" && (
                <motion.div
                  key="description"
                  variants={tabContentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="text-footer-light leading-loose dark:text-gray-300"
                >
                  <div className="space-y-4 text-footer-light dark:text-gray-300">
                    {product?.description && (
                      <p className="leading-loose">{product.description}</p>
                    )}

                    {product?.location && (
                      <div>
                        <span className="font-semibold text-footer-dark dark:text-white">
                          Location
                        </span>
                        <p>{product.location}</p>
                      </div>
                    )}

                    {product?.phone && (
                      <div>
                        <span className="font-semibold text-footer-dark dark:text-white">
                          Phone
                        </span>
                        <p>{product.phone}</p>
                      </div>
                    )}

                    {!product?.description &&
                      !product?.location &&
                      !product?.phone && <p>Details coming soon.</p>}
                  </div>
                </motion.div>
              )}

              {tab === "reviews" && (
                <motion.div
                  key="reviews"
                  variants={tabContentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <h3 className="text-3xl font-bold mb-4 dark:text-white">
                    Reviews
                  </h3>

                  {Array.isArray(product?.vendor_reviews) &&
                  product.vendor_reviews.length > 0 ? (
                    <div className="space-y-6 mb-6">
                      {product.vendor_reviews.map((review, index) => (
                        <div
                          key={index}
                          className="border-b border-gray-200 dark:border-gray-700 pb-4"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-footer-dark dark:text-white">
                              {review?.user_name || "Anonymous"}
                            </span>

                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <FaStar
                                  key={star}
                                  className={`h-4 w-4 ${
                                    star <= Number(review?.rate || 0)
                                      ? "text-yellow-500"
                                      : "text-gray-300 dark:text-gray-600"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>

                          <p className="text-footer-light dark:text-gray-300">
                            {review?.comment || ""}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-footer-light dark:text-gray-300 mb-6">
                      There are no reviews yet.
                    </p>
                  )}

                  <p className="text-base font-normal text-footer-light dark:text-gray-300 mb-2">
                    we love to hear your thoughts about "
                    {product?.title || product?.name || "this product"}"
                  </p>

                  <p className="text-footer-light text-base font-normal mb-4 dark:text-gray-400">
                    Your email address will not be published. Required fields
                    are marked*
                    <span className="text-red-500">*</span>
                  </p>

                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                      <label className="block text-footer-dark dark:text-white font-medium mb-2">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white"
                      />
                      {errors.name && (
                        <span className="text-sm text-red-500">
                          {errors.name}
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="block text-footer-dark dark:text-white font-medium mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white"
                      />
                      {errors.email && (
                        <span className="text-sm text-red-500">
                          {errors.email}
                        </span>
                      )}
                    </div>

                    <div>
                      <span className="text-footer-dark dark:text-white block mb-1">
                        Your Rating <span className="text-red-500">*</span>
                      </span>
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FaStar
                            key={star}
                            onClick={() => setRating(star)}
                            className={`h-6 w-6 cursor-pointer ${
                              star <= rating
                                ? "text-yellow-500"
                                : "text-gray-400 dark:text-gray-600 hover:text-yellow-300 dark:hover:text-yellow-400"
                            }`}
                          />
                        ))}
                      </div>
                      {errors.rating && (
                        <span className="text-sm text-red-500">
                          {errors.rating}
                        </span>
                      )}
                    </div>

                    <div>
                      <span className="text-footer-dark dark:text-white block mb-1">
                        Your Review <span className="text-red-500">*</span>
                      </span>
                      <textarea
                        rows="4"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        className="w-full p-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white resize-none"
                      />
                      {errors.review && (
                        <span className="text-sm text-red-500">
                          {errors.review}
                        </span>
                      )}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className="px-6 py-3 font-medium bg-[#1B7262] dark:bg-teal-600 text-white dark:text-white dark:hover:bg-teal-700 transition"
                    >
                      Submit
                    </motion.button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </AnimatedPage>
  );
};

export default ShopDetails;
