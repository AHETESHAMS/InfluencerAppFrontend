"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  // ✅ EXISTING STATE (UNCHANGED)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();


  // ================= EMAIL LOGIN (UNCHANGED) =================
  const handleLogin = async () => {
  if (!email || !password) {
    alert("Please enter email and password");
    return;
  }

  try {
    setLoading(true);

    const res = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim(), password }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data?.message || data?.error || "Login failed");
      return;
    }

    // ⭐ CLEAR OLD LOGIN DATA
localStorage.removeItem("token");
localStorage.removeItem("role");
localStorage.removeItem("userName");


// ⭐ SAVE NEW LOGIN DATA
localStorage.setItem("token", data.token);
localStorage.setItem("role", data.role.toUpperCase());
localStorage.setItem("userName", email.split("@")[0]);

console.log("LOGIN RESPONSE:", data);
console.log("ROLE SAVED:", data.role);
console.log("LOCAL STORAGE ROLE:", localStorage.getItem("role"));

router.push("/dashboard");



  } catch (err) {
    alert("Server error. Please try again.");
  } finally {
    setLoading(false);
  }
};

  // ================= GOOGLE LOGIN =================
  const handleGoogleLogin = () => {
    signIn("google", {
      callbackUrl: "/google-callback",
      prompt: "select_account",
    });
  };

  // ================= FACEBOOK LOGIN =================
  const handleFacebookLogin = () => {
    signIn("facebook", {
      callbackUrl: "/facebook-callback",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 transition-colors duration-300">
      
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-lg px-6 py-8 transition-colors duration-300">

        <h1 className="text-center text-2xl font-semibold text-gray-800 dark:text-white mb-8">
          Login
        </h1>

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
        <div className="mb-6">
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

        {/* Email Login */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-xl font-medium shadow-md"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* OR */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
          <span className="px-3 text-gray-400 text-sm">or</span>
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 dark:border-gray-600 rounded-xl py-3 text-gray-700 dark:text-gray-200 font-medium shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition mb-3"
        >
          <svg width="20" height="20" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.7 1.22 9.19 3.6l6.85-6.85C35.82 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.5 24c0-1.64-.15-3.22-.43-4.75H24v9.02h12.7c-.55 2.97-2.22 5.48-4.7 7.18l7.21 5.59C43.98 36.27 46.5 30.61 46.5 24z"/>
            <path fill="#FBBC05" d="M10.54 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24s.92 7.54 2.56 10.78l7.98-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.91-5.81l-7.21-5.59c-2.01 1.35-4.58 2.15-8.7 2.15-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          <span>Login with Google</span>
        </button>

        {/* Facebook Login */}
        <button
          onClick={handleFacebookLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 dark:border-gray-600 rounded-xl py-3 text-gray-700 dark:text-gray-200 font-medium shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
            <path d="M22 12.07C22 6.48 17.52 2 11.93 2S1.86 6.48 1.86 12.07c0 4.99 3.66 9.13 8.44 9.93v-7.02H7.9v-2.91h2.4V9.41c0-2.37 1.4-3.68 3.55-3.68 1.03 0 2.1.18 2.1.18v2.31h-1.18c-1.16 0-1.52.72-1.52 1.46v1.75h2.59l-.41 2.91h-2.18V22c4.78-.8 8.44-4.94 8.44-9.93z"/>
          </svg>
          <span>Login with Facebook</span>
        </button>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          Don’t have an account?{" "}
          <Link href="/register" className="text-green-600 dark:text-green-400 font-medium hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
