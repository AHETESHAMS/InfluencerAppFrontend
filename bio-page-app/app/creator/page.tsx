"use client";

export default function CreatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 via-pink-500 to-orange-400 text-white flex justify-center">

      {/* MOBILE CONTAINER */}
      <div className="w-full max-w-sm px-5 py-8">

        {/* PROFILE */}
        <div className="text-center">

          {/* profile image */}
          <div className="mx-auto w-28 h-28 rounded-full p-[3px] bg-gradient-to-tr from-yellow-300 via-pink-400 to-purple-600 shadow-2xl">
            <img
              src="https://i.pravatar.cc/300"
              className="w-full h-full rounded-full object-cover"
            />
          </div>

          <h1 className="mt-4 text-2xl font-bold">Ahtesham Shaikh</h1>
          <p className="text-white/80 text-sm">
            Creator • Tech • Affiliate Deals
          </p>

          {/* SOCIALS */}
          <div className="flex justify-center gap-4 mt-4 text-lg">
            <span className="bg-white/20 px-3 py-2 rounded-full">📸</span>
            <span className="bg-white/20 px-3 py-2 rounded-full">▶️</span>
            <span className="bg-white/20 px-3 py-2 rounded-full">🐦</span>
            <span className="bg-white/20 px-3 py-2 rounded-full">💼</span>
          </div>
        </div>

        {/* FEATURED CARD */}
        <div className="mt-8 bg-white text-gray-900 rounded-2xl p-4 shadow-2xl">
          <p className="text-xs font-semibold text-purple-600">
            🔥 Featured Deal
          </p>

          <div className="flex gap-4 items-center mt-2">
            <img
              src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div>
              <h3 className="font-semibold">MacBook Air M2</h3>
              <p className="text-xs text-gray-500">
                Best laptop for creators
              </p>
            </div>
          </div>
        </div>

        {/* LINKS */}
        <div className="mt-6 space-y-4">

          {[
            "🎓 My Coding Course",
            "💰 Best Hosting Deal",
            "📚 Free React Guide",
            "🎥 YouTube Channel",
            "🛍 My Gear Setup",
          ].map((link, i) => (
            <button
              key={i}
              className="w-full py-4 rounded-xl font-semibold text-lg
              bg-white text-gray-900
              shadow-xl
              hover:scale-[1.03]
              active:scale-95
              transition transform"
            >
              {link}
            </button>
          ))}
        </div>

        {/* SECTION TITLE */}
        <h2 className="mt-10 mb-4 text-lg font-semibold">
          ⭐ Recommended Tools
        </h2>

        {/* PRODUCT CARDS */}
        <div className="space-y-4">

          {[
            "Canva Pro",
            "Hostinger Hosting",
            "Notion AI",
          ].map((tool, i) => (
            <div
              key={i}
              className="bg-white/20 backdrop-blur rounded-xl p-4 flex justify-between items-center"
            >
              <span>{tool}</span>
              <span>➡️</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
