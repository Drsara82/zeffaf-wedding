import React from "react";
import { auth, provider } from "../services/firebase";
import { signInWithPopup } from "firebase/auth";

const Login = () => {
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      alert("تم تسجيل الدخول بنجاح: " + result.user.displayName);
    } catch (error) {
      alert("حدث خطأ أثناء تسجيل الدخول: " + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl mb-4">تسجيل الدخول</h2>
      <button
        onClick={handleGoogleLogin}
        className="bg-blue-500 text-white px-4 py-2 rounded shadow"
      >
        تسجيل الدخول باستخدام Google
      </button>
    </div>
  );
};

export default Login;
