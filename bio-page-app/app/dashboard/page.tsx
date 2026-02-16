"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { signOut, getSession } from "next-auth/react";
import MinimalTemplate from "@/components/templates/MinimalTemplate";




export default function HomePage() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const [userName, setUserName] = useState<string | null>(null);
  const [userImage, setUserImage] = useState<string | null>(null);
  const [showTemplates, setShowTemplates] = useState(false);

  const [isAdmin, setIsAdmin] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [username, setUsername] = useState("");
  const previewData = {
  name: "Rohit Creator",
  bio: "Affiliate marketer & content creator",
  image: "/avatar.png",
  links: [
    { title: "My Store", url: "#" },
    { title: "YouTube Channel", url: "#" },
    { title: "Instagram", url: "#" },
  ],
};

  



  // ⭐ COUNTER STATES
const [creators, setCreators] = useState(0);
const [clicks, setClicks] = useState(0);
const [brands, setBrands] = useState(0);


  


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

const [hideHeader, setHideHeader] = useState(false);
const lastScroll = useRef(0);

useEffect(() => {
  const handleScroll = () => {
    const currentScroll = window.scrollY;
    setScrolled(currentScroll > 20);


    if (currentScroll > lastScroll.current && currentScroll > 80) {
      // scrolling down
      setHideHeader(true);
    } else {
      // scrolling up
      setHideHeader(false);
    }

    lastScroll.current = currentScroll;

  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  
  const handleLogout = async () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("userName");


  await signOut({ redirect: false });

  window.location.reload();   // instant refresh + clean state

  };

  const handleCreateUsername = () => {
  if (!username.trim()) return;

  const clean = username.toLowerCase().replace(/\s+/g, "");

  // save username
  localStorage.setItem("username", clean);

  // redirect to profile page
  router.push(`/${clean}`);
};


  return (
    <main className="pt-16 min-h-screen bg-white transition-all duration-300">

 {/* ================= HEADER ================= */}
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
      transition-all duration-500 ease-out
      transform
      ${hideHeader ? "-translate-y-24 opacity-0" : "translate-y-0 opacity-100"}
    `}
  >

    {/* LOGO */}
    <span className="font-extrabold tracking-tight text-xl md:text-2xl text-gray-900">
      Influencer
    </span>

    {/* CENTER NAV */}
    <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium">

      <button
        onClick={() => router.push("/features")}
        className="text-gray-600 hover:text-gray-900 transition"
      >
        Features
      </button>

      <button
        onClick={() => router.push("/subscribe")}
        className="text-gray-600 hover:text-gray-900 transition"
      >
        Pricing
      </button>

      {/* ⭐ Templates Capsule */}
      <button
        onClick={() => router.push("/templates")}

        className="
          px-5 py-2
          rounded-full
          bg-gradient-to-r from-indigo-500 to-purple-500
          text-white
          shadow-md
          hover:scale-105
          transition
        "
      >
        Templates
      </button>

      {isAdmin && (
        <button
          onClick={() => router.push("/admin")}
          className="text-gray-600 hover:text-gray-900 transition"
        >
          Admin
        </button>
      )}
    </nav>

    {/* RIGHT SIDE */}
    <div className="flex items-center gap-3 relative">

      {/* MOBILE MENU BUTTON */}
      <button
        className="md:hidden text-2xl text-gray-700"
        onClick={() => setMobileMenu(!mobileMenu)}
      >
        ☰
      </button>

      {/* AUTH */}
      {isLoggedIn === null ? null : !isLoggedIn ? (
        <div className="hidden md:flex items-center gap-3">

          <button
            onClick={() => router.push("/login")}
            className="px-5 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
          >
            Login
          </button>

          <button
            onClick={() => router.push("/register")}
            className="px-5 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Sign up free
          </button>

        </div>
      ) : (
        <>
          {/* PROFILE BUTTON */}
          <div
            onClick={() => setMenuOpen(!menuOpen)}
            className="
              flex items-center gap-3
              pl-2 pr-3 py-1.5
              rounded-full
              bg-gray-100
              hover:bg-gray-200
              cursor-pointer
              transition
            "
          >
            {userImage ? (
              <img
                src={userImage}
                alt="profile"
                className="w-9 h-9 rounded-full object-cover border-2 border-white"
              />
            ) : userName ? (
              <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                {userName.charAt(0).toUpperCase()}
              </div>
            ) : (
              <div className="w-9 h-9 rounded-full bg-gray-300 animate-pulse" />
            )}

            {userName && (
              <span className="hidden lg:block text-sm font-medium text-gray-800">
                {userName}
              </span>
            )}
          </div>

          {/* DROPDOWN */}
          {menuOpen && (
            <div className="absolute right-0 top-16 w-44 bg-white text-gray-800 rounded-xl shadow-xl overflow-hidden">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  router.push("/dashboard/edit");
                }}
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
  <div className="fixed top-20 left-0 w-full bg-white shadow-lg z-40 px-6 py-6 space-y-5 md:hidden">

    {/* FEATURES */}
    <button
      onClick={() => {
        router.push("/features");
        setMobileMenu(false);
      }}
      className="block w-full text-left text-gray-800 font-medium"
    >
      Features
    </button>

    {/* PRICING */}
    <button
      onClick={() => {
        router.push("/subscribe");
        setMobileMenu(false);
      }}
      className="block w-full text-left text-gray-800 font-medium"
    >
      Pricing
    </button>

    {/* ADMIN */}
    {isAdmin && (
      <button
        onClick={() => {
          router.push("/admin");
          setMobileMenu(false);
        }}
        className="block w-full text-left text-gray-800 font-medium"
      >
        Admin
      </button>
    )}

    {/* AUTH BUTTONS */}
    {!isLoggedIn && (
      <>
        <button
          onClick={() => {
            router.push("/login");
            setMobileMenu(false);
          }}
          className="block w-full text-left text-gray-800 font-medium"
        >
          Login
        </button>

        <button
          onClick={() => {
            router.push("/register");
            setMobileMenu(false);
          }}
          className="block w-full text-left text-gray-800 font-medium"
        >
          Sign Up
        </button>
      </>
    )}

  </div>
)}


      {/* ================= HERO ================= */}
<section className="relative overflow-hidden min-h-screen -mt-16 pt-16 pb-28">

  {/* BLUE BACKGROUND */}
  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900"></div>

  {/* optional glow for premium look */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.15),transparent_60%)]"></div>

  <div className="relative max-w-7xl mx-auto px-6 pt-20 md:pt-24 lg:min-h-[88vh]
  grid lg:grid-cols-2 gap-12 lg:gap-20 items-start text-white">

    {/* LEFT CONTENT */}
    <div className="text-center lg:text-left">

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight md:leading-[1.15]">
        Create a single page for <br className="hidden sm:block"/>
        all your affiliate & <br className="hidden sm:block"/>
        business links
      </h1>

      <p className="mt-6 text-lg text-white/80 max-w-xl mx-auto lg:mx-0">
        Share one link on Instagram, YouTube, or anywhere.
        Showcase products, brands, and websites you promote.
      </p>

      <div className="mt-8 flex flex-col items-center lg:items-start">
        {/* Username Creator */}
<div className="w-full max-w-xl mx-auto lg:mx-0 mt-6">

  <div className="flex flex-col sm:flex-row gap-3">

    {/* input */}
    <div className="flex items-center bg-white rounded-full px-5 py-4 flex-1 shadow-md">
      <span className="text-gray-500 mr-1">influencer/</span>

      <input
        type="text"
        placeholder="yourname"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="outline-none flex-1 text-gray-800 placeholder-gray-400 bg-transparent"
      />
    </div>

    {/* button */}
    <button
      onClick={handleCreateUsername}
      className="
        bg-green-800 hover:bg-green-700
        text-white
        px-8 py-4
        rounded-full
        font-semibold
        transition
        whitespace-nowrap
      "
    >
      Get started free
    </button>

  </div>
</div>


        {/* SOCIAL PROOF */}
<div className="mt-10 flex justify-center lg:justify-start gap-10">

  {/* ITEM */}
  <div className="flex flex-col items-center text-center min-w-[90px]">
    <p className="text-4xl font-extrabold leading-none tracking-tight">
      {creators.toLocaleString()}+
    </p>
    <p className="text-sm text-white/70 mt-1 tracking-wide">
      Creators
    </p>
  </div>

  <div className="flex flex-col items-center text-center min-w-[90px]">
    <p className="text-4xl font-extrabold leading-none tracking-tight">
      {clicks.toLocaleString()}+
    </p>
    <p className="text-sm text-white/70 mt-1 tracking-wide">
      Clicks
    </p>
  </div>

  <div className="flex flex-col items-center text-center min-w-[90px]">
    <p className="text-4xl font-extrabold leading-none tracking-tight">
      {brands.toLocaleString()}+
    </p>
    <p className="text-sm text-white/70 mt-1 tracking-wide">
      Brands
    </p>
  </div>

</div>


      </div>
    </div>

    {/* RIGHT MOBILE PREVIEW */}
    <div className="flex justify-center items-center lg:-mt-10 drop-shadow-2xl">
      <div className="w-[260px] sm:w-[280px] md:w-[300px] lg:w-[320px]">

        <div className="px-1.5 py-2 rounded-[28px] bg-white shadow-[0_25px_60px_rgba(0,0,0,0.18)]">

          <img
            src="/images/dashboard-profile.png"
            alt="mobile preview"
            className="w-full h-auto object-contain rounded-[22px]"
          />

        </div>
      </div>
    </div>

  </div>
</section>






      {/* ================= FEATURES + TESTIMONIALS ================= */}
<section className="bg-[#C9E71F] pt-20 pb-36 overflow-hidden">


  {/* CENTER CONTENT */}
  <div className="max-w-7xl mx-auto px-6">

    {/* FEATURES */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

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
          className="rounded-2xl border border-black/10 bg-white p-8 shadow-sm hover:shadow-lg transition"
        >
          <h3 className="text-xl font-semibold text-gray-900">
            {item.title}
          </h3>

          <p className="mt-4 text-gray-700 leading-relaxed">
            {item.desc}
          </p>
        </div>
      ))}
    </div>

    {/* TESTIMONIAL TITLE */}
    <h2 className="text-3xl font-bold text-center text-gray-900 mt-24">
      Loved by Creators & Influencers
    </h2>

  </div>

  {/* ✅ FULL WIDTH TESTIMONIAL STRIP */}
  <div className="mt-14 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">

    <div className="flex gap-8 animate-scroll px-6">

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
        {
          name: "Aman Verma",
          role: "YouTuber",
          text: "This page helped me share all my links in one place. Super clean & easy!",
          rating: 5,
        },
      ].map((t, i) => (
        <div
          key={i}
          className="min-w-[320px] bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition"
        >
          <div className="flex text-amber-400 text-lg mb-2">
            {"★".repeat(t.rating)}
            {"☆".repeat(5 - t.rating)}
          </div>

          <p className="text-gray-600 italic">“{t.text}”</p>

          <div className="mt-4 font-semibold text-gray-900">
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
<section className="bg-[#8B0015] py-24 pt-20 pb-40 overflow-hidden">
  <div className="max-w-4xl mx-auto px-6">

    <h2 className="text-3xl md:text-4xl font-bold text-center text-[#F7C6CF]">
      Frequently Asked Questions
    </h2>

    <div className="mt-12 space-y-5">

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
          className="group rounded-xl p-5 bg-[#A30D22] border border-white/10 transition hover:bg-[#B3122A]"
        >
          <summary className="cursor-pointer font-semibold text-[#FFE3E7] flex justify-between items-center">
            {faq.q}
            <span className="transition group-open:rotate-180 text-[#FFD2D8]">
              ⌄
            </span>
          </summary>

          <p className="mt-3 text-[#FFD2D8] leading-relaxed">
            {faq.a}
          </p>
        </details>
      ))}

    </div>
  </div>
</section>



      {/* ================= CTA + FOOTER BLOCK ================= */}
<section className="bg-[#5B2C6F] text-white text-center pt-24 pb-0">

  {/* CTA HEADING */}
  <p className="text-3xl font-semibold max-w-2xl mx-auto">
    Start earning from your links today for just ₹99/month
  </p>

  {/* CTA BUTTON */}
  <div className="mt-10 flex justify-center">
    <button
      onClick={() => router.push("/subscribe")}
      className="
        bg-white text-[#5B2C6F]
        py-5 px-10
        rounded-full
        shadow-lg
        transition-all duration-300
        hover:scale-105
        hover:bg-gray-100
        active:scale-95
      "
    >
      <p className="text-xl font-semibold">
        Start My Page Now 🚀
      </p>

      <p className="text-sm opacity-80 mt-1">
        Join today & start sharing your link in minutes
      </p>
    </button>
  </div>

  {/* TRUST BADGES */}
  <div className="mt-12 flex flex-wrap justify-center gap-4 text-sm">

    <div className="bg-white/15 px-4 py-2 rounded-full">
      🔒 Secure Payments by Razorpay
    </div>

    <div className="bg-white/15 px-4 py-2 rounded-full">
      ⚡ Instant Setup
    </div>

    <div className="bg-white/15 px-4 py-2 rounded-full">
      🌍 Global Ready
    </div>

    <div className="bg-white/15 px-4 py-2 rounded-full">
      💳 No Hidden Fees
    </div>

  </div>

  {/* ================= PREMIUM SAAS FOOTER ================= */}
<footer className="relative mt-24 text-white">

  {/* Background Gradient */}
  <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] via-[#111827] to-[#020617]"></div>

  {/* subtle glow */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.15),transparent_60%)]"></div>

  <div className="relative max-w-7xl mx-auto px-6 py-20">

    {/* TOP SECTION */}
    <div className="flex flex-col md:flex-row md:justify-between gap-14">

      {/* BRAND */}
      <div>
        <h3 className="text-xl font-semibold tracking-tight">
          Influencer
        </h3>

        <p className="text-white/60 mt-4 max-w-sm text-sm leading-relaxed">
          Build one powerful link to showcase your business,
          products, and affiliate partnerships.
        </p>
      </div>

      {/* NAV */}
      <div className="flex flex-wrap gap-x-12 gap-y-4 text-white/70 text-sm font-medium">

        {[
          { label: "About", path: "/about" },
          { label: "Privacy Policy", path: "/privacy" },
          { label: "Terms", path: "/terms" },
          { label: "Contact", path: "/contact" },
        ].map((item) => (
          <button
            key={item.label}
            onClick={() => router.push(item.path)}
            className="
              relative
              hover:text-white
              transition
              after:absolute
              after:left-0
              after:-bottom-1
              after:h-[1px]
              after:w-0
              after:bg-gradient-to-r
              after:from-indigo-400
              after:to-purple-400
              after:transition-all
              hover:after:w-full
            "
          >
            {item.label}
          </button>
        ))}

      </div>

    </div>

    {/* GLOW DIVIDER */}
    <div className="my-14 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

    {/* BOTTOM ROW */}
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-white/50 text-xs tracking-wide">

      <p>
        © {new Date().getFullYear()} Influencer. All rights reserved.
      </p>

      <p>
        Crafted for creators & professionals worldwide.
      </p>

    </div>

  </div>
</footer>
</section>
    </main>
  );
}