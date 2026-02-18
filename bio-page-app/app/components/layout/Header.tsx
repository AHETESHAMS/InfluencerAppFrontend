"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { signOut, getSession } from "next-auth/react";

export default function Header() {
  const router = useRouter();

  const [mobileMenu, setMobileMenu] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [userImage, setUserImage] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const lastScroll = useRef(0);

  // 🔐 LOAD USER
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    loadUser();
  }, []);

  const loadUser = async () => {
    const savedName = localStorage.getItem("userName");
    const savedImage = localStorage.getItem("userImage");

    if (savedName) setUserName(savedName);
    if (savedImage) setUserImage(savedImage);

    const role = localStorage.getItem("role");
    if (role?.toUpperCase() === "ADMIN") setIsAdmin(true);

    const session = await getSession();

    if (session?.user) {
      const name = session.user.name || savedName;
      const image = session.user.image || savedImage;

      setUserName(name);
      setUserImage(image || null);

      localStorage.setItem("userName", name || "");
      localStorage.setItem("userImage", image || "");
    }
  };

  // 🔽 hide header on scroll
  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;

      if (current > lastScroll.current && current > 80) {
        setHideHeader(true);
      } else {
        setHideHeader(false);
      }

      lastScroll.current = current;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    localStorage.clear();
    await signOut({ redirect: false });
    window.location.reload();
  };

  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-center px-4 pointer-events-none">
        <div
          className={`
            pointer-events-auto
            w-full max-w-7xl
            rounded-full
            flex items-center justify-between
            bg-white
            shadow-[0_10px_30px_rgba(0,0,0,0.12)]
            px-5 md:px-10
            h-16 md:h-20
            mt-3 md:mt-4
            transition-all duration-500
            ${hideHeader ? "-translate-y-24 opacity-0" : ""}
          `}
        >
          {/* LOGO */}
          <span
            onClick={() => router.push("/")}
            className="font-extrabold text-xl md:text-2xl cursor-pointer"
          >
            Influencer
          </span>

          {/* NAV */}
          <nav className="hidden md:flex gap-8 text-sm font-medium">
            <button onClick={() => router.push("/features")}>Features</button>
            <button onClick={() => router.push("/subscribe")}>Pricing</button>

            <button
              onClick={() => router.push("/templates")}
              className="px-5 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
            >
              Templates
            </button>

            {isAdmin && (
              <button onClick={() => router.push("/admin")}>
                Admin
              </button>
            )}
          </nav>

          {/* RIGHT SIDE */}
          <div className="relative flex items-center gap-3">
            {/* mobile */}
            <button
              className="md:hidden text-2xl"
              onClick={() => setMobileMenu(!mobileMenu)}
            >
              ☰
            </button>

            {/* AUTH */}
            {isLoggedIn === false ? (
              <div className="hidden md:flex gap-3">
                <button
                  onClick={() => router.push("/login")}
                  className="px-5 py-2 rounded-full bg-gray-100"
                >
                  Login
                </button>
                <button
                  onClick={() => router.push("/register")}
                  className="px-5 py-2 rounded-full bg-blue-600 text-white"
                >
                  Sign up
                </button>
              </div>
            ) : (
              <>
                <div
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex items-center gap-3 bg-gray-100 px-3 py-1.5 rounded-full cursor-pointer"
                >
                  {userImage ? (
                    <img
                      src={userImage}
                      className="w-9 h-9 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center">
                      {userName?.charAt(0)}
                    </div>
                  )}
                  <span className="hidden lg:block text-sm">{userName}</span>
                </div>

                {menuOpen && (
                  <div className="absolute right-0 top-14 w-44 bg-white rounded-xl shadow-xl overflow-hidden">
                    <button
                      onClick={() => router.push("/dashboard/edit")}
                      className="w-full text-left px-4 py-3 hover:bg-gray-100"
                    >
                      Edit Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      {mobileMenu && (
        <div className="fixed top-20 left-0 w-full bg-white shadow-lg z-40 p-6 space-y-5 md:hidden">
          <button onClick={() => router.push("/features")}>Features</button>
          <button onClick={() => router.push("/subscribe")}>Pricing</button>
          <button onClick={() => router.push("/templates")}>Templates</button>
          {isAdmin && (
            <button onClick={() => router.push("/admin")}>Admin</button>
          )}
        </div>
      )}
    </>
  );
}
