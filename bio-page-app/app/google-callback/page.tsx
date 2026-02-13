"use client";

import { useEffect } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function GoogleCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleGoogleCallback = async () => {
      try {
        // 1️⃣ Get Google session from NextAuth
        const session = await getSession();
        const user = session?.user;

        if (!user?.email) {
          throw new Error("Google user not found");
        }

        // 2️⃣ Call backend Google login API
        const res = await fetch("http://localhost:8080/api/auth/google", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            name: user.name,
          }),
        });

        if (!res.ok) {
          throw new Error("Backend Google login failed");
        }

        const data = await res.json();

        // 3️⃣ Store JWT
        localStorage.setItem("token", data.token);

        // 4️⃣ Redirect to dashboard
        router.replace("/dashboard");
      } catch (err) {
        alert("Google login failed");
        router.replace("/login");
      }
    };

    handleGoogleCallback();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center text-gray-600">
      Logging in with Google...
    </div>
  );
}
