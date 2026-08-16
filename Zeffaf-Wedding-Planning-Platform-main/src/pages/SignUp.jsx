import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageHeader from "../components/shared/PageHeader";
import SharedInput from "../components/shared/Input.jsx";
import { Link, useNavigate } from "react-router-dom";
import googleIcon from "../assets/images/icons/google.svg";
import facebookIcon from "../assets/images/icons/facebook (1).png";
import { supabase } from "../services/supabase";


const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    agree: false,
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    agree: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    let tempErrors = {};

    if (!formData.name) tempErrors.name = "Name is required";

    if (!formData.email) tempErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      tempErrors.email = "Invalid email address";

    if (!formData.password) tempErrors.password = "Password is required";
    else if (formData.password.length < 6)
      tempErrors.password = "Password must be at least 6 characters";

    if (!formData.agree)
      tempErrors.agree = "You must agree to the terms and privacy policy";

    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validate()) return;

  const { data, error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: {
      data: {
        full_name: formData.name,
      },
    },
  });

  if (error) {
    toast.error(error.message);
    return;
  }

  const sessionUser = data.user;

  localStorage.setItem(
    "user",
    JSON.stringify({
      id: sessionUser.id,
      email: sessionUser.email,
    })
  );

  toast.success("Account created successfully");
  navigate("/");
};

const handleGoogleSignup = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: window.location.origin,
    },
  });

  if (error) toast.error("Google signup failed");
};
  const handleFacebookSignup = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "facebook",
      options: {
        redirectTo: window.location.origin,
      },
    });

    if (error) toast.error("Facebook signup failed");
  };
  return (
    <>
      <PageHeader
        title="Sign Up"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Sign Up" }]}
      />

      <div className="bg-white dark:bg-gray-900 py-16 transition-colors duration-300">
        <div className="max-w-[770px] mx-auto px-4">
          <div className="border border-gray-200 dark:border-gray-700 rounded-sm p-8 bg-white dark:bg-gray-800 transition-colors duration-300">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-serif text-footer-dark dark:text-white">
               Create your Account
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-300 mt-2">
                Enter your credentials to create your account
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <SharedInput
                label="Your Name"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                required
              />

              <SharedInput
                label="Email Address"
                type="text"
                name="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                required
              />

              <SharedInput
                label="New Password"
                type="password"
                name="password"
                placeholder="Create password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                required
              />

              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  name="agree"
                  checked={formData.agree}
                  onChange={handleChange}
                  className="accent-primary cursor-pointer"
                />
                I agree to the terms and privacy policy
              </label>
              {errors.agree && (
                <span className="text-sm text-red-500">{errors.agree}</span>
              )}

              <button
                type="submit"
                className={`w-full h-[50px] text-white text-sm font-medium transition 
                  ${
                    !formData.name ||
                    !formData.email ||
                    !formData.password ||
                    !formData.agree ||
                    Object.keys(errors).some((k) => errors[k])
                      ? "bg-gray-400 dark:bg-gray-700 cursor-not-allowed opacity-60"
                      : "bg-primary dark:bg-emerald-600 hover:opacity-90"
                  }
                `}
                disabled={
                  !formData.name ||
                  !formData.email ||
                  !formData.password ||
                  !formData.agree ||
                  Object.keys(errors).some((k) => errors[k])
                }
              >
                Sign Up
              </button>
            </form>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                className="h-[48px] border border-gray-200 dark:border-emerald-400 flex items-center justify-center gap-2 text-sm bg-white dark:bg-transparent text-gray-700 dark:text-white font-medium rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-emerald-900/40 transition"
                onClick={handleGoogleSignup}
              >
                <img src={googleIcon} alt="Google" className="w-5 h-5" />
                <span className="">Sign Up with Google</span>
              </button>

          <button
  onClick={handleFacebookSignup}
  className="h-[48px] border border-gray-200 dark:border-emerald-400 flex items-center justify-center gap-2 text-sm bg-white dark:bg-transparent text-gray-700 dark:text-white font-medium rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-emerald-900/40 transition"
>
  <img src={facebookIcon} alt="Facebook" className="w-5 h-5" />
  <span className="">Sign Up with Facebook</span>
</button>

            </div>

            <p className="text-center text-sm text-gray-600 dark:text-gray-300 mt-6">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#1F6F5C] dark:text-emerald-400 hover:underline font-medium"
              >
                Sign In Now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
