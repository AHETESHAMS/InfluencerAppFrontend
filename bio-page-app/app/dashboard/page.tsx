"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { signOut, getSession } from "next-auth/react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";



export default function HomePage() {
  const router = useRouter();

const [username, setUsername] = useState("");



useEffect(() => {
  const animate = (
  setter: React.Dispatch<React.SetStateAction<number>>,
  target: number
) => {

    let count = 0;
    const duration = 1500;
    const stepTime = 16;
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

  animate(setCreators, 14873);
  animate(setClicks, 2847321);
  animate(setBrands, 327);

}, []);

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

const handleCreateUsername = () => {
  if (!username.trim()) return;

  const clean = username.toLowerCase().replace(/\s+/g, "");

  localStorage.setItem("username", clean);

  router.push(`/${clean}`);
};

return (
    <main className="pt-16 min-h-screen bg-white transition-all duration-300">

 {/* Global Header */}
<Header />

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
<section className="bg-[#5B2C6F] text-white text-center pt-24 pb-18">

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

  {/* ✅ Footer inside CTA */}
  <div className="mt-24">
    <Footer />
  </div>

</section>

    </main>
  );
}