import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import bgImg from "../../../assets/images/services/services_bg.png";
import { readService } from "../../../services/read.service";

/* ICON + DESC UI ONLY */
import venueReservationIcon from "../../../assets/images/services/features/Venue-Reservation.svg";
import officiantIcon from "../../../assets/images/services/features/officiant.svg";
import photoshootIcon from "../../../assets/images/services/features/Photoshoot.svg";
import makeUpArtistIcon from "../../../assets/images/services/features/Makeup-Artist.svg";
import veilDesignerIcon from "../../../assets/images/services/features/Viel-Designer.svg";
import hairDresserIcon from "../../../assets/images/services/features/Hair-Dresser.svg";
import dressesAndSuitsIcon from "../../../assets/images/services/features/dresses-and-suits.svg";
import weddingPlannerIcon from "../../../assets/images/services/features/Wedding-Planner.svg";
import favorProductsIcon from "../../../assets/images/services/features/Favour-Products.svg";

const SERVICES_UI = {
  venues: {
    icon: venueReservationIcon,
    desc: "Booking support that helps you secure a venue that fits your guest count and style."
  },
  "veil-designer": {
    icon: veilDesignerIcon,
    desc: "Custom veil styling that matches your dress and fits the full look."
  },
  "wedding-planner": {
    icon: weddingPlannerIcon,
    desc: "Clear planning that organizes your day and keeps everything on track."
  },
  "hair-dresser": {
    icon: hairDresserIcon,
    desc: "A hairstyle that fits your face shape and holds well during the event."
  },
  photoshoot: {
    icon: photoshootIcon,
    desc: "Structured shots with set locations for clean and memorable photos."
  },
  officiant: {
    icon: officiantIcon,
    desc: "Ceremony guidance with a clear structure and smooth timing."
  },
  "makeup-artist": {
    icon: makeUpArtistIcon,
    desc: "Photo-ready makeup that stays in place throughout the day."
  },
  "dresses-and-suits": {
    icon: dressesAndSuitsIcon,
    desc: "Ready options with quick adjustments for fit and style."
  },
  "favor-products": {
    icon: favorProductsIcon,
    desc: "Personalized gifts that add a simple touch for your guests."
  }
};

export const ServicesSection = ({ variant = "home" }) => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);

  useEffect(() => {
    readService.categories().then(setServices);
  }, []);

  const visibleServices = variant === "home"
    ? services.slice(0, 6)
    : services;

  return (
    <section
      className="py-20"
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left center",
      }}
    >
      <h2 className="text-center text-3xl mb-12">
        Complete Wedding Planning
      </h2>

      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {visibleServices.map((cat) => {
          const ui = SERVICES_UI[cat.slug];
          if (!ui) return null;

          return (
            <motion.div
              key={cat.id}
              whileHover={{ y: -10 }}
              className="p-8 bg-white: rounded-xl text-center"
            >
              <img src={ui.icon} className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">{cat.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{ui.desc}</p>

              <button
                onClick={() =>
                  navigate(`/shop?category=${cat.slug}`)
                }
                className="flex items-center gap-2 mx-auto text-primary"
              >
                Read More <FaArrowRight />
              </button>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};
