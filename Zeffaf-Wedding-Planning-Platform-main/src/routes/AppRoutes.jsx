import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import About from "../pages/About";
import Services from "../pages/Services";
import Projects from "../pages/Projects";
import ProjectsDetails from "../pages/ProjectDetails";
import Blog from "../pages/Blog";
import BlogDetails from "../pages/BlogDetails";
import Contact from "../pages/Contact";
import Pricing from "../pages/Pricing";
import Login from "../pages/Login";
import Signup from "../pages/SignUp";
import NotFound from "../pages/NotFound";
import ShopDetails from "../pages/ShopDetails";
import Shop from "../pages/Shop";
import Cart from "../pages/Cart";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/shop/:id/details"
        element={
          <ProtectedRoute>
            <ShopDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />

      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/shop/:serviceSlug" element={<Shop />} />

      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:id" element={<BlogDetails />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
