import { FiUser } from "react-icons/fi";
import { FaMoon, FaSun } from "react-icons/fa";

import { BsCart } from "react-icons/bs";
import { HiMenu } from "react-icons/hi";
import { IoChevronDown } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../../assets/images/icons/Vector.svg";
import whitelogo from "../../assets/images/icons/darkVector.svg";
import message from "../../assets/images/icons/message.svg";
import { supabase } from "../../services/supabase";
import { HiX } from "react-icons/hi";


export default function MainNavbar() {
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return false;
  });
  const toggleDark = () => {
    setDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return next;
    });
  };

  // On mount, respect saved theme
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    } else if (saved === "light") {
      document.documentElement.classList.remove("dark");
      setDark(false);
    }
  }, []);

  const { user, logout } = useAuth();

  const [cartCount, setCartCount] = useState(0);
  const [profileName, setProfileName] = useState(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const navigate = useNavigate();

  // Fetch profile name from Supabase profiles table
  useEffect(() => {
    if (!user) {
      setProfileName(null);
      return;
    }

    const name =
      user.user_metadata?.full_name ||
      user.user_metadata?.name ||
      user.email?.split("@")[0];

    setProfileName(name);
  }, [user]);

  const handleLogout = async () => {
    await logout();
    setIsProfileOpen(false);
    navigate("/login");
  };

  const closeMenu = () => setIsMenuOpen(false);
  const navItem =
    "font-opensans text-sm px-3 py-1 rounded-md transition-colors duration-200 text-[--primary] hover:text-emerald-500 dark:hover:text-emerald-400";
  return (
    <nav className="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 font-opensans text-sm leading-none">
      <div className="flex items-center justify-between h-16 px-4 md:px-10 lg:px-20 xl:px-40">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <img
              src={logo}
              alt="Methaq"
              className="h-8 w-auto flex-shrink-0 dark:hidden"
            />
            <img
              src={whitelogo}
              alt="Methaq"
              className="h-8 w-auto flex-shrink-0 hidden dark:block"
            />
            <span className="font-bodoni text-[40px] font-sail text-navy-dark dark:text-white">
              Zeffaf
            </span>
          </div>
        </Link>
        <ul className="hidden lg:flex items-center gap-2">
          {[
            { name: "Home", path: "/home" },
            { name: "About Us", path: "/about" },
            { name: "Services", path: "/services" },
            { name: "Shop", path: "/shop" },
            { name: "Blog", path: "/blog" },
            { name: "Contact Us", path: "/contact" },
          ].map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end
                className={({ isActive }) =>
                  `font-opensans text-sm px-3 py-1 rounded-md transition-all duration-200 font-medium relative ${
                    isActive
                      ? "text-emerald-600 dark:text-emerald-400 font-bold after:absolute after:left-0 after:right-0 after:bottom-0 after:h-1 after:rounded-full after:bg-gradient-to-r after:from-emerald-400 after:to-emerald-600 dark:after:from-emerald-400 dark:after:to-emerald-300 after:content-['']"
                      : "text-navy-dark dark:text-gray-200 hover:text-emerald-500 dark:hover:text-emerald-300 after:absolute after:left-0 after:right-0 after:bottom-0 after:h-1 after:rounded-full after:bg-gradient-to-r after:from-emerald-200 after:to-emerald-400 after:opacity-0 hover:after:opacity-100 after:content-[''] after:transition-all after:duration-300"
                  }`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="hidden lg:flex items-center gap-6 text-navy-dark dark:text-white text-xl border-l border-gray-300 dark:border-gray-700 pl-4">
          {/* Dark mode toggle */}
          <button
            onClick={toggleDark}
            className={`flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-400 transition-colors duration-300 shadow-md focus:outline-none bg-white dark:bg-gray-900 hover:bg-emerald-50 dark:hover:bg-gray-800`}
            title={dark ? "Light mode" : "Dark mode"}
            aria-label="Toggle dark mode"
            style={{
              boxShadow: dark ? "0 2px 8px 0 #2226" : "0 2px 8px 0 #cfcf",
            }}
          >
            {dark ? (
              <FaSun
                className="text-yellow-400 transition-transform duration-300 scale-110"
                size={22}
              />
            ) : (
              <FaMoon
                className="text-gray-700 transition-transform duration-300 scale-110"
                size={20}
              />
            )}
          </button>
          <div ref={profileRef} className="relative flex items-center gap-1">
            {user ? (
              <>
                <div
                  className="w-24 px-2 h-9 rounded-full text-navy-dark dark:text-white border border-gray-200 dark:border-gray-700 flex items-center justify-center font-bold text-base cursor-pointer select-none"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                  {profileName ? profileName.split(" ")[0] : <FiUser />}
                </div>

                <IoChevronDown
                  className={`cursor-pointer transition-transform duration-200 ${
                    isProfileOpen ? "rotate-180" : ""
                  }`}
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                />
                {isProfileOpen && (
                  <div className="absolute top-full right-0 mt-3 w-44 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 overflow-hidden">
                    <div className="px-4 py-2 text-sm font-semibold text-gray-700 font-bdodoni dark:text-gray-200 ">
                      Welcome {profileName?.split(" ")[0] || "User"}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition text-red-600 dark:text-red-400"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </>
            ) : (
              <>
                <FiUser className="text-xl" />
                <IoChevronDown
                  className={`cursor-pointer transition-transform duration-200 ${
                    isProfileOpen ? "rotate-180" : ""
                  }`}
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                />
                {isProfileOpen && (
                  <div className="absolute top-full right-0 mt-3 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 overflow-hidden">
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
          {/* <div className="relative">
            <Link to="/favorites">
              <LuHeart className="hover:text-primary dark:hover:text-yellow-400 cursor-pointer transition" />
              {favoritesCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full text-xs px-1.5 py-0.5 min-w-[20px] text-center font-bold">
                  {favoritesCount}
                </span>
              )}
            </Link>
          </div> */}
          <div className="relative">
            <Link to="/cart">
              <BsCart className="hover:text-primary dark:hover:text-yellow-400 cursor-pointer transition" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full text-xs px-1.5 py-0.5 min-w-[20px] text-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
          <Link to="/booking">
            <span className="text-base">Let’s Talk</span>
          </Link>
          <Link to="/booking">
            <motion.img
              src={message}
              alt="message"
              className="cursor-pointer"
              animate={{
                scale: [0.9, 1, 0.9],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </Link>
        </div>
        <HiMenu
          className="lg:hidden text-2xl text-navy-dark dark:text-white cursor-pointer"
          onClick={() => setIsMenuOpen(true)}
        />
      </div>

      <div
        className={`fixed inset-y-0 right-0 w-3/4 bg-white dark:bg-gray-900 shadow-lg transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 lg:hidden z-50`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <img
              src={dark ? whitelogo : logo}
              alt="Zeffaf"
              className="h-7 w-auto"
            />

            <span className="font-bodoni text-lg text-navy-dark dark:text-white">
              Zeffaf
            </span>
          </div>
          <button
            onClick={toggleDark}
            className="flex items-center gap-3 text-navy-dark dark:text-white"
          >
            {dark ? <FaSun /> : <FaMoon />}
            <span>{dark ? "Light Mode" : "Dark Mode"}</span>
          </button>

          <button
            onClick={closeMenu}
            className="text-2xl text-navy-dark dark:text-white hover:text-emerald-500 transition"
            aria-label="Close menu"
          >
            <HiX />
          </button>
        </div>
        <ul className="flex flex-col gap-5 px-6 py-6 text-base font-opensans text-navy-dark dark:text-white">
          {[
            { name: "Home", path: "/home" },
            { name: "About Us", path: "/about" },
            { name: "Services", path: "/services" },
            { name: "Shop", path: "/shop" },
            { name: "Blog", path: "/blog" },
            { name: "Contact Us", path: "/contact" },
          ].map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end
              onClick={closeMenu}
              className={({ isActive }) =>
                isActive
                  ? "font-semibold text-emerald-600 dark:text-emerald-400"
                  : "font-normal text-navy-dark dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              }
            >
              {item.name}
            </NavLink>
          ))}
          <div className="h-px bg-gray-200 my-2" />
          <NavLink
            to="/login"
            end
            onClick={closeMenu}
            className={({ isActive }) =>
              `flex items-center gap-2 transition-colors ${
                isActive
                  ? "font-semibold text-emerald-600 dark:text-emerald-400"
                  : "font-normal text-navy-dark dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400"
              }`
            }
          >
            <FiUser /> Login
          </NavLink>
          <NavLink
            to="/signup"
            end
            onClick={closeMenu}
            className={({ isActive }) =>
              `flex items-center gap-2 transition-colors ${
                isActive
                  ? "font-semibold text-emerald-600 dark:text-emerald-400"
                  : "font-normal text-navy-dark dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400"
              }`
            }
          >
            <FiUser /> Sign Up
          </NavLink>
        </ul>
      </div>
    </nav>
  );
}
