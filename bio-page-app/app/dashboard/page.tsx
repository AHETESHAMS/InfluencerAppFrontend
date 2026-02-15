"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut, getSession } from "next-auth/react";



export default function HomePage() {
  const [dark, setDark] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const [userName, setUserName] = useState<string | null>(null);
  const [userImage, setUserImage] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // ⭐ COUNTER STATES
const [creators, setCreators] = useState(0);
const [clicks, setClicks] = useState(0);
const [brands, setBrands] = useState(0);


  // ✅ FIXED: Global Dark Mode Load
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
  document.documentElement.classList.add("dark");
}

setDark(savedTheme === "dark");


    const token = localStorage.getItem("token");

setIsLoggedIn(!!token);




  const loadUser = async () => {

  const savedName = localStorage.getItem("userName");
  const savedImage = localStorage.getItem("userImage");

  if (savedName) setUserName(savedName);
  if (savedImage) setUserImage(savedImage);

  const role = localStorage.getItem("role");
  if (role?.toUpperCase() === "ADMIN") {
    setIsAdmin(true);
  }

  // session fetch silently (background update)
  const session = await getSession();

  if (session?.user) {
    const name = session.user.name || savedName;
    const image = session.user.image || savedImage;

    setUserName(name);
    setUserImage(image || null);

    // update storage for next loads
    localStorage.setItem("userName", name || "");
    localStorage.setItem("userImage", image || "");
  }
};


    loadUser();
  },
  
  []);
  // ⭐ COUNTER ANIMATION
useEffect(() => {
  let started = false;

  if (started) return;
  started = true;

  const animate = (setter: React.Dispatch<React.SetStateAction<number>>, target: number) => {
    let count = 0;
    const duration = 1600;
    const stepTime = 32;
    const steps = duration / stepTime;
    const increment = target / steps;

    const update = () => {
      count += increment;
      if (count < target) {
        setter(Math.floor(count));
        requestAnimationFrame(update);
      } else {
        setter(target);
      }
    };

    update();
  };

  animate(setCreators, 12000);
  animate(setClicks, 2000000);
  animate(setBrands, 150);

}, []);



  
  // ✅ FIXED: Global Dark Toggle
  const toggleTheme = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDark(true);
    }
  };

  const handleLogout = async () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("userName");


  await signOut({ redirect: false });

  window.location.reload();   // instant refresh + clean state

  };

  return (
    <main className="pt-16 min-h-screen bg-white dark:bg-gray-950 transition-all duration-300">

      
      {/* ================= HEADER ================= */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white/90 dark:bg-gray-950/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">


          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            Influencer
          </span>

          <nav className="flex items-center gap-3 sm:gap-6 text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium relative">
            
            <button
            onClick={() => router.push("/features")}
            className="hidden sm:inline hover:text-emerald-500"
            >
            Features
            </button>

            <a
              onClick={() => router.push("/subscribe")}
              className="hidden sm:inline hover:text-emerald-500 cursor-pointer"
            >
              Pricing
            </a>
            {isAdmin && (
  <button
    onClick={() => router.push("/admin")}
    className="hidden md:inline hover:text-emerald-500 font-medium"
  >
    Admin
  </button>
)}



            {/* 🌗 Dark mode */}
            <button
              onClick={toggleTheme}
              className="relative w-14 h-8 flex items-center bg-gray-300 dark:bg-gray-700 rounded-full p-1 transition-colors duration-300"
            >
              <div
                className={`w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center text-sm transition-transform duration-300 ${
                  dark ? "translate-x-6" : "translate-x-0"
                }`}
              >
                {dark ? "🌙" : "☀️"}
              </div>
            </button>

            {/* MOBILE MENU BUTTON */}
            <button
              className="sm:hidden text-2xl ml-2"
              onClick={() => setMobileMenu(!mobileMenu)}
            >
              ☰
            </button>

            {isLoggedIn === null ? null : !isLoggedIn ? (

              <div className="hidden sm:flex items-center gap-2">
                <button
                  onClick={() => router.push("/login")}
                  className="bg-emerald-600 text-white px-5 py-2 rounded-full hover:bg-emerald-700 transition"
                >
                  Login
                </button>

                <button
                  onClick={() => router.push("/register")}
                  className="bg-purple-600 text-white px-5 py-2 rounded-full hover:bg-purple-700 transition"
                >
                  Sign Up
                </button>
              </div>
            ) : (
              <>
                <div
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  {userImage ? (
                  <img
                    src={userImage}
                    alt="profile"
                    className="w-9 h-9 rounded-full border object-cover"
                  />
                ) : userName ? (
                  <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center text-white font-semibold text-lg">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                ) : (
                  <div className="w-9 h-9 rounded-full bg-gray-200 animate-pulse" />
                )}

                  {userName && (
                    <span className="hidden md:block font-medium">
                      {userName}
                    </span>
                  )}
                </div>

                {menuOpen && (
                  <div className="absolute right-0 top-14 w-40 bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-xl shadow-lg overflow-hidden">
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        router.push("/dashboard/edit");
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      Edit Profile
                    </button>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </>
            )}
          </nav>
        </div>
      </header>
{/* MOBILE MENU */}
{mobileMenu && (
  <div className="sm:hidden mt-16 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 px-6 py-4 space-y-4">

    <a href="#" className="block">Features</a>

    <button
      onClick={() => router.push("/subscribe")}
      className="block"
    >
      Pricing
    </button>

    {isAdmin && (
    <button
      onClick={() => router.push("/admin")}
      className="block w-full text-left"
    >
      Admin
    </button>
  )}

    {!isLoggedIn && (
      <>
        <button
          onClick={() => router.push("/login")}
          className="block w-full text-left"
        >
          Login
        </button>

        <button
          onClick={() => router.push("/register")}
          className="block w-full text-left"
        >
          Sign Up
        </button>
      </>
    )}
  </div>
)}

      {/* ================= HERO ================= */}
<section className="max-w-7xl mx-auto px-6 pt-20 md:pt-24 lg:min-h-[88vh] grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

  {/* LEFT CONTENT */}
  <div className="text-center lg:text-left">

    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight md:leading-[1.15] text-gray-900 dark:text-white">
      Create a single page for <br className="hidden sm:block"/>
      all your affiliate & <br className="hidden sm:block"/>
      business links
    </h1>

    <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto lg:mx-0">
      Share one link on Instagram, YouTube, or anywhere.
      Showcase products, brands, and websites you promote.
    </p>

    <div className="mt-8 flex flex-col items-center lg:items-start">

      {/* CTA */}
      <button
        onClick={() => router.push("/subscribe")}
        className="bg-emerald-500 text-white px-8 py-4 rounded-full text-lg
        shadow-md hover:bg-emerald-600 transition
        w-full sm:w-auto max-w-xs"
      >
        Start your page for ₹99/month
      </button>

      <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 text-center max-w-xs">
        Cancel anytime • No hidden fees
      </p>

    
      {/* SOCIAL PROOF */}
      <div className="mt-10 flex justify-center lg:justify-start gap-6 sm:gap-10 flex-wrap">

        <div className="text-center">
          <p className="text-4xl font-extrabold bg-gradient-to-r from-emerald-500 to-emerald-700 bg-clip-text text-transparent">
            {creators.toLocaleString()}+
          </p>
          <p className="text-sm text-gray-500">Creators</p>
        </div>

        <div className="text-center">
          <p className="text-4xl font-extrabold bg-gradient-to-r from-purple-500 to-purple-700 bg-clip-text text-transparent">
            {clicks.toLocaleString()}+
          </p>
          <p className="text-sm text-gray-500">Clicks</p>
        </div>

        <div className="text-center">
          <p className="text-4xl font-extrabold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            {brands.toLocaleString()}+
          </p>
          <p className="text-sm text-gray-500">Brands</p>
        </div>

      </div>

    </div>
  </div>

  {/* RIGHT MOBILE PREVIEW */}
<div className="flex justify-center items-center lg:-mt-2">

  <div className="w-[260px] sm:w-[280px] md:w-[300px] lg:w-[320px]">

    <div className="
      px-1.5 py-2
      rounded-[28px]
      bg-white dark:bg-gray-900
      shadow-[0_25px_60px_rgba(0,0,0,0.18)]
    ">

      <img
        src="/images/dashboard-profile.png"
        alt="mobile preview"
        className="
          w-full
          h-auto
          object-contain
          rounded-[22px]
        "
      />

    </div>

  </div>

</div>


</section>


      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-3 gap-10">
        {[
          {
            title: "One Link for Everything",
            desc: "Create a single, beautiful page to hold all of your affiliate and business links.",
          },
          {
            title: "Showcase Any Link",
            desc: "Add affiliate links, brand pages, product promos, or any business links you want.",
          },
          {
            title: "Simple & Professional",
            desc: "Set up easily and customize your page to look modern and professional in minutes.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 shadow-sm"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {item.title}
            </h3>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              {item.desc}
            </p>
          </div>
        ))}
      </section>
      {/* ================= TESTIMONIALS ================= */}
<section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 overflow-hidden">

  <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
    Loved by Creators & Influencers
  </h2>

  {/* moving row */}
  <div className="mt-14 relative">
    <div className="flex gap-8 animate-scroll">

      {[
  {
    name: "Aman Verma",
    role: "YouTuber",
    text: "This page helped me share all my links in one place. Super clean & easy!",
    rating: 5,
  },
  {
    name: "Riya Sharma",
    role: "Instagram Creator",
    text: "My followers find everything quickly now. It boosted my engagement a lot.",
    rating: 5,
  },
  {
    name: "Karan Patel",
    role: "Affiliate Marketer",
    text: "Best tool to promote products & track my links. Highly recommended!",
    rating: 4,
  },
  {
    name: "Sneha Kapoor",
    role: "Lifestyle Blogger",
    text: "Setup was instant and my page looks very professional.",
    rating: 5,
  },

  // ⭐ duplicate for seamless scroll
  {
    name: "Aman Verma",
    role: "YouTuber",
    text: "This page helped me share all my links in one place. Super clean & easy!",
    rating: 5,
  },
  {
    name: "Riya Sharma",
    role: "Instagram Creator",
    text: "My followers find everything quickly now. It boosted my engagement a lot.",
    rating: 5,
  },
  {
    name: "Karan Patel",
    role: "Affiliate Marketer",
    text: "Best tool to promote products & track my links. Highly recommended!",
    rating: 4,
  },
  {
    name: "Sneha Kapoor",
    role: "Lifestyle Blogger",
    text: "Setup was instant and my page looks very professional.",
    rating: 5,
  },
].map((t, i) => (

        <div
          key={i}
          className="min-w-[320px] bg-gradient-to-br from-white/70 to-gray-100/60 dark:from-gray-800/70 dark:to-gray-900/70 backdrop-blur rounded-2xl p-6 shadow-md hover:shadow-lg transition transform-gpu will-change-transform backface-visibility-hidden"



        >
          {/* ⭐ stars */}
          <div className="flex text-amber-400 text-lg mb-2 drop-shadow-sm">
            {"★".repeat(t.rating)}
            {"☆".repeat(5 - t.rating)}
          </div>

          <p className="text-gray-600 dark:text-gray-400 italic">
            “{t.text}”
          </p>

          <div className="mt-4 font-semibold text-gray-900 dark:text-white">
            {t.name}
          </div>

          <div className="text-sm text-emerald-500">
            {t.role}
          </div>
        </div>
      ))}

    </div>
  </div>
</section>

{/* ================= FAQ ================= */}
<section className="max-w-4xl mx-auto px-6 py-20">
  <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
    Frequently Asked Questions
  </h2>

  <div className="mt-10 space-y-4">

    {[
      {
        q: "How does this platform work?",
        a: "Create your page, add your links, and share one single link with your audience.",
      },
      {
        q: "Can I cancel anytime?",
        a: "Yes, you can cancel your subscription anytime. No hidden charges.",
      },
      {
        q: "Is payment secure?",
        a: "Yes. All payments are securely processed via Razorpay.",
      },
      {
        q: "Can I use it for affiliate marketing?",
        a: "Absolutely! You can promote affiliate products, services, or your own business links.",
      },
      {
        q: "Will I get international payments support?",
        a: "Yes. International payments can be enabled once your account is fully activated.",
      },
    ].map((faq, i) => (
      <details
        key={i}
        className="group border border-gray-200 dark:border-gray-800 rounded-xl p-5 bg-white dark:bg-gray-900"
      >
        <summary className="cursor-pointer font-semibold text-gray-900 dark:text-white flex justify-between items-center">
          {faq.q}
          <span className="group-open:rotate-180 transition">⌄</span>
        </summary>

        <p className="mt-3 text-gray-600 dark:text-gray-400">
          {faq.a}
        </p>
      </details>
    ))}

  </div>
</section>


      {/* CTA */}
<section className="py-20 text-center">
  <p className="text-3xl font-semibold text-gray-900 dark:text-white">
    Start earning from your links today for just ₹99/month
  </p>

  {/* clickable CTA */}
  <div
    onClick={() => router.push("/subscribe")}
    className="mt-10 cursor-pointer flex justify-center"
  >
    <div className="bg-emerald-500 p-3 rounded-full shadow-[0_10px_30px_rgba(16,185,129,0.45)] transition duration-300 hover:shadow-[0_18px_45px_rgba(16,185,129,0.65)]">
      
      <div className="bg-emerald-600 text-white text-center py-5 px-6 rounded-full shadow-inner transform transition duration-300 ease-out hover:scale-105 will-change-transform">

        <p className="text-xl font-semibold">
          Start My Page Now 🚀
        </p>

        <p className="text-sm text-white/90 mt-1">
          Join today & start sharing your link in minutes
        </p>

      </div>
    </div>
  </div>

  {/* TRUST BADGES */}
<div className="mt-10 flex flex-wrap justify-center items-center gap-6 text-sm text-gray-600 dark:text-gray-400">

  <div className="flex items-center gap-2 bg-white dark:bg-gray-900 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-800 shadow-sm">
    🔒 <span>Secure Payments By Razorpay</span>
  </div>

  <div className="flex items-center gap-2 bg-white dark:bg-gray-900 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-800 shadow-sm">
    ⚡ <span>Instant Setup</span>
  </div>

  <div className="flex items-center gap-2 bg-white dark:bg-gray-900 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-800 shadow-sm">
    🌍 <span>Global Ready</span>
  </div>

  <div className="flex items-center gap-2 bg-white dark:bg-gray-900 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-800 shadow-sm">
    💳 <span>No Hidden Fees</span>
  </div>

</div>

</section>

            {/* ================= FOOTER ================= */}
      <footer className="border-t border-gray-200 dark:border-gray-800 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-10 text-center text-sm text-gray-600 dark:text-gray-400">

          <div className="flex flex-wrap justify-center gap-6 mb-4">
            <button
            onClick={() => router.push("/about")}
            className="hover:text-emerald-500 transition"
            >
            About
            </button>
            <button
            onClick={() => router.push("/privacy")}
            className="hover:text-emerald-500 transition"
            >
            Privacy Policy </button>
            <button
            onClick={() => router.push("/terms")}
            className="hover:text-emerald-500 transition"
        >
          Terms & Conditions
          </button>
            <button
          onClick={() => router.push("/contact")}
          className="hover:text-emerald-500 transition"
          >
          Contact Us
          </button>

          </div>

          <p>
            © {new Date().getFullYear()} Influencer. All rights reserved.
          </p>

        </div>
      </footer>
      


    </main>
  );
}
