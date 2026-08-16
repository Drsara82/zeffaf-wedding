import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageHeader from "../components/shared/PageHeader";
import SharedInput from "../components/shared/Input.jsx";
import { Link } from "react-router-dom";
import googleIcon from "../assets/images/icons/google.svg";
import facebookIcon from "../assets/images/icons/facebook (1).png";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({ email: "", password: "" });

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

    if (!formData.email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Invalid email address";
    }

    if (!formData.password) {
      tempErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        toast.error("Invalid email or password");
        return;
      }

      toast.success("Welcome back");
      navigate("/");
    } catch {
      toast.error("Login failed");
    }
  };
const redirectTo = `${window.location.origin}${window.location.pathname}`;



const handleGoogleLogin = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo,
    },
  });

  if (error) {
    toast.error("Google login failed");
  }
};

const handleFacebookLogin = async () => {
  const redirectTo = `${window.location.origin}${window.location.pathname}`;

  const { error } = await supabase.auth.signInWithOAuth({
    provider: "facebook",
    options: {
      redirectTo,
    },
  });

  if (error) {
    toast.error("Facebook login failed");
  }
};

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          navigate("/");
        }
      }
    );

    return () => {
      listener?.subscription?.unsubscribe();
    };
  }, [navigate]);

  return (
    <>
      <PageHeader
        title="Sign In"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Sign In" }]}
      />

      <div className="bg-white dark:bg-gray-900 py-16 transition-colors duration-300">
        <div className="max-w-[770px] mx-auto px-4">
          <div className="border border-gray-200 dark:border-gray-700 rounded-sm p-8 bg-white dark:bg-gray-800 transition-colors duration-300">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-serif text-footer-dark dark:text-white">
                Welcome back!
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-300 mt-2">
                Enter your credentials to access your account
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <SharedInput
                label="Email Address"
                type="text"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                required
              />

              <div className="space-y-2">
                <SharedInput
                  label="Password"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  error={errors.password}
                  required
                />

                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                  {/* Remember for 30 days removed intentionally */}
                </label>
              </div>

              <button
                type="submit"
                className="w-full h-[50px] bg-primary dark:bg-emerald-600 text-white text-sm font-medium hover:opacity-90 transition"
              >
                Sign In
              </button>
            </form>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={handleGoogleLogin}
                className="h-[48px] border border-gray-200 dark:border-emerald-400 flex items-center justify-center gap-2 text-sm bg-white dark:bg-transparent text-gray-700 dark:text-white font-medium rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-emerald-900/40 transition"
              >
                <img src={googleIcon} alt="Google" className="w-5 h-5" />
                <span>Sign In with Google</span>
              </button>

              <button
                className="h-[48px] border border-blue-200 dark:border-blue-400 flex items-center justify-center gap-2 text-sm bg-white dark:bg-transparent text-blue-700 dark:text-white font-medium rounded-lg shadow-sm hover:bg-blue-50 dark:hover:bg-blue-900/40 transition"
                onClick={handleFacebookLogin}
              >
                <img src={facebookIcon} alt="Facebook" className="w-5 h-5" />
                <span className="">Sign In with Facebook</span>
              </button>
            </div>

            <p className="text-center text-sm text-gray-600 dark:text-gray-300 mt-6">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-[#1F6F5C] dark:text-emerald-400 hover:underline font-medium"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
