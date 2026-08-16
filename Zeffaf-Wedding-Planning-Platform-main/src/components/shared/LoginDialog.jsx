import React from "react";

export default function LoginDialog({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-[#172235] rounded-xl shadow-lg p-8 max-w-xs w-full text-center border border-green-700 dark:border-green-400">
        <h2 className="text-xl font-bold text-green-700 dark:text-green-400 mb-4">
          تسجيل الدخول مطلوب
        </h2>
        <p className="text-gray-700 dark:text-gray-200 mb-6">
          يجب عليك تسجيل الدخول أولاً لإضافة المنتج إلى المفضلة.
        </p>
        <button
          className="bg-green-700 dark:bg-green-400 text-white dark:text-green-900 px-6 py-2 rounded font-semibold hover:bg-green-800 dark:hover:bg-green-500 transition mb-2"
          onClick={() => (window.location.href = "/login")}
        >
          تسجيل الدخول
        </button>
        <button
          className="block w-full mt-2 text-sm text-gray-500 dark:text-gray-300 underline"
          onClick={onClose}
        >
          إغلاق
        </button>
      </div>
    </div>
  );
}
