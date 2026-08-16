import React from "react";
import { useNavigate } from "react-router-dom";

const EmptyCart = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <img
        src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
        alt="Empty Cart"
        className="w-32 h-32 mb-6 opacity-80 drop-shadow-lg animate-bounce"
        loading="lazy"
      />
      <h2
        className="text-2xl font-bold text-gray-700 mb-2"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        Your cart is empty!
      </h2>
      <p
        className="text-gray-500 mb-6"
        style={{ fontFamily: "var(--font-body)" }}
      >
        You haven't added any products yet. Browse the shop and add your
        favorite items.
      </p>
      <button
        onClick={() => navigate("/shop")}
        className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-3 rounded-lg shadow transition"
      >
        Start Shopping
      </button>
    </div>
  );
};

export default EmptyCart;
