"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react"; // ✅ ADDED for Facebook

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      alert("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: email.split("@")[0],
          email,
          password,
        }),
      });

      if (!res.ok) {
        throw new Error("Registration failed");
      }

      const data = await res.json();
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    } catch (err) {
      alert("User already exists or error occurred");
    } finally {
      setLoading(false);
    }
  };

  // ✅ FACEBOOK LOGIN HANDLER
  const handleFacebookLogin = () => {
    signIn("facebook", {
      callbackUrl: "/dashboard",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 transition-colors duration-300">
      
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-lg px-6 py-8 transition-colors duration-300">

        <h1 className="text-center text-2xl font-semibold text-gray-800 dark:text-white mb-8">
          Sign Up
        </h1>

        {/* Google Sign Up */}
        <button className="w-full flex items-center justify-center gap-3 border border-gray-300 dark:border-gray-600 rounded-xl py-3 text-gray-700 dark:text-gray-200 font-medium shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition mb-4">
          <svg width="20" height="20" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.7 1.22 9.19 3.6l6.85-6.85C35.82 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.5 24c0-1.64-.15-3.22-.43-4.75H24v9.02h12.7c-.55 2.97-2.22 5.48-4.7 7.18l7.21 5.59C43.98 36.27 46.5 30.61 46.5 24z"/>
            <path fill="#FBBC05" d="M10.54 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24s.92 7.54 2.56 10.78l7.98-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.91-5.81l-7.21-5.59c-2.01 1.35-4.58 2.15-8.7 2.15-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          <span>Sign up with Google</span>
        </button>

        {/* Facebook Sign Up */}
        <button
          onClick={handleFacebookLogin}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 dark:border-gray-600 rounded-xl py-3 text-gray-700 dark:text-gray-200 font-medium shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition mb-6"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
            <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H8.08V12h2.36V9.8c0-2.33 1.39-3.62 3.52-3.62 1.02 0 2.08.18 2.08.18v2.29h-1.17c-1.15 0-1.5.71-1.5 1.44V12h2.56l-.41 2.89h-2.15v6.99A10 10 0 0 0 22 12z"/>
          </svg>
          <span>Sign up with Facebook</span>
        </button>

        {/* OR Divider */}
        <div className="flex items-center mb-6">
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
          <span className="px-3 text-gray-400 text-sm">or</span>
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
        </div>

        {/* Email */}
        <div className="mb-4">
          <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 shadow-sm">
            <span className="mr-3 text-gray-400">✉️</span>
            <input
              type="email"
              placeholder="Email"
              className="w-full outline-none text-gray-700 dark:text-gray-200 bg-transparent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-4">
          <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 shadow-sm">
            <span className="mr-3 text-gray-400">🔒</span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full outline-none text-gray-700 dark:text-gray-200 bg-transparent"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="ml-3 text-gray-400 cursor-pointer select-none"
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 shadow-sm">
            <span className="mr-3 text-gray-400">🔒</span>
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="w-full outline-none text-gray-700 dark:text-gray-200 bg-transparent"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="ml-3 text-gray-400 cursor-pointer select-none"
            >
              {showConfirmPassword ? "🙈" : "👁️"}
            </span>
          </div>
        </div>

        {/* Create Account */}
        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-xl font-medium shadow-md hover:opacity-95 transition"
        >
          {loading ? "Creating..." : "Create Account"}
        </button>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-green-600 dark:text-green-400 font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
