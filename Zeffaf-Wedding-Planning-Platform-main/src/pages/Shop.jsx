import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import PageHeader from "../components/shared/PageHeader";
import ProductCard from "../components/shared/ProductCard";
import Pagination from "../components/shared/Pagination";
import Loader from "../components/shared/Loader";
import { BsGrid1X2, BsGrid, BsGrid3X3Gap } from "react-icons/bs";
import AnimatedPage from "../components/shared/AnimatedPage";
import { readService } from "../services/read.service";

const ITEMS_PER_PAGE = 12;

export default function Shop() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [view, setView] = useState("grid4");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  /* LOAD CATEGORIES */
  useEffect(() => {
    readService.categories().then(setCategories);
  }, []);

  /* URL → STATE */
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSelectedCategory(params.get("category") || "all");
    setCurrentPage(1);
  }, [location.search]);

  /* LOAD ITEMS */
  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);

      try {
        if (selectedCategory === "all") {
          const data = await readService.allItems();
          if (!cancelled) setItems(data);
          return;
        }

        const data = await readService.itemsByCategory(selectedCategory);
        if (!cancelled) setItems(data || []);
      } catch {
        if (!cancelled) setItems([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [selectedCategory]);

  /* SORT + PAGINATION */
  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === "price-asc") return (a.price || 0) - (b.price || 0);
    if (sortBy === "price-desc") return (b.price || 0) - (a.price || 0);
    const aName = a.title || a.name || "";
    const bName = b.title || b.name || "";
    return aName.localeCompare(bName);
  });

  const totalPages = Math.max(
    1,
    Math.ceil(sortedItems.length / ITEMS_PER_PAGE)
  );

  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedItems = sortedItems.slice(start, start + ITEMS_PER_PAGE);

  /* HANDLERS */
  const handleCategoryChange = (value) => {
    if (value === "all") navigate("/shop");
    else navigate(`/shop?category=${encodeURIComponent(value)}`);
  };

  /* PAGE HEADER */
  let pageTitle = "Shop";
  if (selectedCategory !== "all") {
    const found = categories.find(c => c.slug === selectedCategory);
    if (found) pageTitle = found.name;
  }

  const breadcrumbs =
    selectedCategory === "all"
      ? [{ label: "Home", href: "/" }, { label: "Shop" }]
      : [
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: pageTitle },
        ];

  return (
    <AnimatedPage>
      <PageHeader title={pageTitle} breadcrumbs={breadcrumbs} />

    <div className="max-w-7xl mx-auto px-4 py-12 bg-white dark:bg-gray-900">

        {/* TOP BAR */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
         <div className="text-sm text-gray-600 dark:text-gray-300">

            There are <b>{sortedItems.length}</b> results
          </div>

          <div className="flex justify-center gap-3">
            {[{ id: "grid2", icon: <BsGrid1X2 /> },
              { id: "grid3", icon: <BsGrid /> },
              { id: "grid4", icon: <BsGrid3X3Gap /> }
            ].map(btn => (
              <button
                key={btn.id}
                onClick={() => setView(btn.id)}
           className={`p-2 border rounded transition
  dark:border-gray-700
  ${
    view === btn.id
      ? "bg-gray-800 text-white dark:bg-teal-600"
      : "dark:text-gray-300 dark:hover:bg-gray-800"
  }
`}

              >
                {btn.icon}
              </button>
            ))}
          </div>

          <div className="flex justify-end gap-3">
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
            className="border px-3 py-2
  bg-white text-gray-800
  dark:bg-gray-800 dark:text-gray-200
  dark:border-gray-700"

            >
              <option value="all">All Categories</option>
              {categories.map(c => (
                <option key={c.id} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            className="border px-3 py-2
  bg-white text-gray-800
  dark:bg-gray-800 dark:text-gray-200
  dark:border-gray-700"

            >
              <option value="default">Relevance</option>
              <option value="name">Name</option>
              <option value="price-asc">Price ↑</option>
              <option value="price-desc">Price ↓</option>
            </select>
          </div>
        </div>

        {/* CONTENT */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`grid gap-8 ${
              view === "grid4"
                ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                : view === "grid3"
                ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
                : "grid-cols-1 sm:grid-cols-2"
            }`}
          >
            <AnimatePresence>
              {paginatedItems.map(item => (
                <motion.div key={item.id} whileHover={{ y: -6 }}>
                  <ProductCard product={item} buttonLabel="View Details" />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {totalPages > 1 && (
          <div className="mt-12 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </AnimatedPage>
  );
}
