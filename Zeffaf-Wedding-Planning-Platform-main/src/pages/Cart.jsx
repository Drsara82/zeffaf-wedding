import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../services/supabase";

import PageHeader from "../components/shared/PageHeader";
import EmptyCart from "../components/shared/EmptyCart";
import AnimatedPage from "../components/shared/AnimatedPage";

/* =======================
   HELPERS
======================= */

const proxyImage = (image) => {
  if (!image)
    return "https://via.placeholder.com/80x80?text=No+Image";

  if (typeof image === "string" && image.includes("drive.google.com")) {
    const stripped = image.replace(/^https?:\/\//, "");
    return `https://images.weserv.nl/?url=${encodeURIComponent(stripped)}`;
  }

  return image;
};

/* =======================
   CART ITEM DESKTOP
======================= */

const CartItem = ({ item, updateQuantity, removeItem }) => {
  const total = (item.price || 0) * item.quantity;

  const handleQuantityChange = (delta) => {
    const q = item.quantity + delta;
    if (q >= 1) updateQuantity(item.id, q);
  };

  return (
    <tr className="border-b bg-white dark:bg-[#181f2a]">
      <td className="px-2 text-center">
        <button onClick={() => removeItem(item.id)}>
          <FaTimes />
        </button>
      </td>

      <td className="py-4 pr-4">
        <div className="flex gap-4 items-center">
          <img
            src={proxyImage(item.image_url)}
            alt={item.title}
            className="w-20 h-20 object-cover rounded"
          />

          <div>
            <p className="font-semibold">{item.title}</p>
          </div>
        </div>
      </td>

      <td className="text-center">E£ {item.price}</td>

      <td className="text-center">
        <button onClick={() => handleQuantityChange(-1)}>−</button>
        <span className="mx-2">{item.quantity}</span>
        <button onClick={() => handleQuantityChange(1)}>+</button>
      </td>

      <td className="text-center">E£ {total.toFixed(2)}</td>
    </tr>
  );
};

/* =======================
   CART ITEM MOBILE
======================= */

const CartItemMobile = ({ item, removeItem }) => {
  const total = (item.price || 0) * item.quantity;

  return (
    <div className="border-b py-4">
      <div className="flex gap-4">
        <img
          src={proxyImage(item.image_url)}
          className="w-24 h-24 object-cover rounded"
        />

        <div className="flex-1">
          <div className="flex justify-between">
            <p className="font-semibold">{item.title}</p>
            <button onClick={() => removeItem(item.id)}>
              <FaTimes />
            </button>
          </div>

          <p className="mt-2 font-semibold">E£ {total.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

/* =======================
   CART PAGE
======================= */

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  /* ===== FETCH CART ===== */

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);

      const { data: auth } = await supabase.auth.getUser();
      const user = auth?.user;

      if (!user) {
        setCartItems([]);
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from("cart_items")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      setCartItems(data || []);
      setLoading(false);
    };

    fetchCart();
    window.addEventListener("userChanged", fetchCart);

    return () => window.removeEventListener("userChanged", fetchCart);
  }, []);

  /* ===== ACTIONS ===== */

  const removeItem = async (id) => {
    await supabase.from("cart_items").delete().eq("id", id);
    setCartItems((prev) => prev.filter((i) => i.id !== id));
    window.dispatchEvent(new Event("userChanged"));
  };

  const removeAll = async () => {
    const { data: auth } = await supabase.auth.getUser();
    const user = auth?.user;
    if (!user) return;

    await supabase.from("cart_items").delete().eq("user_id", user.id);
    setCartItems([]);
    window.dispatchEvent(new Event("userChanged"));
  };

  const updateQuantity = async (id, quantity) => {
    await supabase
      .from("cart_items")
      .update({ quantity })
      .eq("id", id);

    setCartItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, quantity } : i
      )
    );
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item.price || 0) * item.quantity,
    0
  );

  /* ===== UI ===== */

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (!cartItems.length) {
    return <EmptyCart />;
  }

  return (
   <AnimatedPage>
      <div className="bg-white min-h-screen dark:bg-[#101926]">
        <PageHeader
          title="Cart"
          breadcrumbs={[{ label: "Home", href: "/home" }, { label: "Cart" }]}
        />
        <main className="mx-auto max-w-[1290px] px-4 py-8 md:py-16">
          <div className="hidden md:block overflow-x-auto mb-12">
            <table className="min-w-full">
              <thead>
                <tr className="text-left text-base font-normal text-gray-500 dark:text-gray-300 tracking-wider border-b border-gray-300 dark:border-gray-700 border-t dark:border-t-gray-700 bg-white dark:bg-[#181f2a]">
                  <th className="py-4 px-2 w-5">
                    <button
                      onClick={removeAll}
                      className="text-black dark:text-white transition text-sm"
                      title="Remove all cart items"
                    >
                      <FaTimes />
                    </button>
                  </th>
                  <th className="py-4 pr-4 font-normal text-base text-gray-500 dark:text-gray-300 w-full lg:w-[45%]">
                    Product
                  </th>
                  <th className="py-4 font-normal text-base text-gray-500 dark:text-gray-300 text-center w-full lg:w-[15%]">
                    Price
                  </th>
                  <th className="py-4 font-normal text-base text-gray-500 dark:text-gray-300 text-center w-full lg:w-[20%]">
                    Quantity
                  </th>
                  <th className="py-4 font-normal text-base text-gray-500 dark:text-gray-300 text-center w-full lg:w-[15%]">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    updateQuantity={updateQuantity}
                    removeItem={removeItem}
                  />
                ))}
              </tbody>
            </table>
          </div>
          <div className="md:hidden mb-8">
            {cartItems.map((item) => (
              <CartItemMobile
                key={item.id}
                item={item}
                updateQuantity={updateQuantity}
                removeItem={removeItem}
              />
            ))}
          </div>
          <div className="flex flex-col lg:flex-row gap-8 pt-4">
            <div className="flex-grow">
              <div className="mt-8 flex flex-col sm:flex-row items-stretch justify-start gap-2 w-full lg:w-[480px]">
                <input
                  type="text"
                  placeholder="Enter Coupon Code"
                  className="bg-gray-100 dark:bg-[#232b3b] flex-1 min-h-[50px] px-4 py-3 text-base border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-gray-400 dark:focus:border-gray-500 text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                />
                <button className="bg-gray-800 dark:bg-green-700 text-white px-6 min-h-[50px] text-base font-semibold hover:bg-gray-700 dark:hover:bg-green-800 transition whitespace-nowrap">
                  Submit
                </button>
              </div>
            </div>
            <div className="p-6 bg-gray-100 dark:bg-[#181f2a] flex-shrink-0 w-full lg:w-[470px]">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                Order Summary
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between text-base">
                  <span className="text-gray-500 dark:text-gray-300 font-normal">
                    Subtotal
                  </span>
                  <span className="text-gray-800 dark:text-gray-100 font-normal">
                    E£ {subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-base border-b border-gray-200 dark:border-gray-700 pb-4">
                  <span className="text-gray-500 dark:text-gray-300 font-normal">
                    Shipping
                  </span>
                  <span className="text-gray-800 dark:text-gray-100 font-normal">
                    Free
                  </span>
                </div>
                <div className="pt-2 flex justify-between text-lg font-semibold text-gray-800 dark:text-gray-100">
                  <span>Total</span>
                  <span>E£ {subtotal.toFixed(2)}</span>
                </div>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <button
                  className="flex-1 bg-white dark:bg-[#232b3b] text-center text-gray-800 dark:text-gray-100 px-4 py-3 font-semibold text-base hover:bg-emerald-600 dark:hover:bg-green-700 hover:text-white dark:hover:text-white transition border border-gray-200 dark:border-gray-700"
                  onClick={() => navigate("/shop")}
                >
                  Keep Shopping
                </button>
                <button className="flex-1 bg-emerald-600 dark:bg-green-700 text-white px-4 py-3 font-semibold text-base hover:bg-emerald-700 dark:hover:bg-green-800 transition">
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </AnimatedPage>  
  );
};

export default Cart;

