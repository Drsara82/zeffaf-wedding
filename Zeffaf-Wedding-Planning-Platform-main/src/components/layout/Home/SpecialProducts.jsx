import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import bgImg from "../../../assets/images/services/services_bg.png";
import ProductCard from "../../shared/ProductCard";
import { readService } from "../../../services/read.service";
import { useNavigate } from "react-router-dom";

const FAVORS_CATEGORY_SLUG = "favor-products";

export default function SpecialProducts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        const data = await readService.itemsByCategory(
          FAVORS_CATEGORY_SLUG
        );

        setItems((data || []).slice(0, 6));
      } catch (e) {
        console.error(e);
        setItems([]);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return (
    <section className="w-full">
      <div
        className="py-20"
        style={{
          backgroundImage: `url(${bgImg})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "left center",
        }}
      >
        <p className="text-center mb-3 text-[--primary] text-[20px] font-sail">
          Our Shop
        </p>

        <h2 className="text-3xl font-serif font-semibold text-footer-dark text-center mb-12">
          Special Product For You
        </h2>

        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((item) => (
                <ProductCard
                  key={item.id}
                  product={item}
                  buttonLabel="View Details"
                  hidePrice={true}
                />
              ))}
            </div>
          )}

          <div className="flex justify-center mt-12">
            <button
              onClick={() =>
                navigate(`/shop?category=${FAVORS_CATEGORY_SLUG}`)
              }
              className="flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
            >
              View All Products <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
