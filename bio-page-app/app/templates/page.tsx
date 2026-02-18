"use client";

import MinimalTemplate from "@/components/templates/MinimalTemplate";
import GradientTemplate from "@/components/templates/GradientTemplate";
import PremiumTemplate from "@/components/templates/PremiumTemplate";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function TemplatesPage() {

  const templates = [
    {
      name: "Minimal",
      component: (
        <MinimalTemplate
          data={{
            name: "Faiz Creator",
            bio: "Content Creator & Marketer",
            image: "/avatar/avatar2.jpg",
            links: [
              { title: "My Store", url: "#" },
              { title: "YouTube", url: "#" },
              { title: "Instagram", url: "#" },
            ],
          }}
        />
      ),
    },
    {
      name: "Premium",
      component: (
        <PremiumTemplate
          data={{
            name: "Riya Influencer",
            bio: "Lifestyle & Fashion",
            image: "/avatar/avatar5.jpg",
            links: [
              { title: "TikTok", url: "#" },
              { title: "My Blog", url: "#" },
              { title: "Brand Deals", url: "#" },
            ],
          }}
        />
      ),
    },
    {
      name: "Gradient",
      component: (
        <GradientTemplate
          data={{
            name: "Aman Tech",
            bio: "Tech Reviews & Gadgets",
            image: "/avatar/avatar3.jpg",
            links: [
              { title: "YouTube Channel", url: "#" },
              { title: "Top Gadgets", url: "#" },
              { title: "Amazon Store", url: "#" },
            ],
          }}
        />
      ),
    },
  ];

  return (
    <>
      {/* GLOBAL HEADER */}
      <Header />

      {/* PAGE */}
      <main className="relative pt-28 overflow-hidden">



        {/* BACKGROUND */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600" />
        <div className="absolute top-[-120px] left-[-120px] w-[380px] h-[380px] bg-pink-500/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-120px] right-[-120px] w-[380px] h-[380px] bg-blue-400/30 rounded-full blur-3xl"></div>

        {/* ✅ YE WRAPPER ADD KARNA HAI */}
  <div className="relative z-10 pb-32 px-6">


          {/* TITLE */}
          <div className="max-w-5xl mx-auto text-center mb-20 text-white">
            <h1 className="text-5xl font-bold">
              Choose Your Style ✨
            </h1>

            <p className="mt-4 text-lg text-white/80">
              Pick a design that matches your vibe and start sharing instantly
            </p>
          </div>

          {/* TEMPLATE GRID */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16 max-w-6xl mx-auto">
            {templates.map((t) => (
              <div
                key={t.name}
                className="
                  group
                  bg-white/90 backdrop-blur-xl
                  rounded-[30px]
                  shadow-2xl
                  p-7
                  flex flex-col items-center
                  hover:-translate-y-2
                  hover:shadow-[0_25px_80px_rgba(0,0,0,0.35)]
                  transition
                "
              >
                {/* PHONE PREVIEW */}
                <div className="
                  w-[260px] h-[520px]
                  rounded-[42px]
                  bg-black
                  p-[8px]
                  shadow-[0_40px_90px_rgba(0,0,0,0.45)]
                  group-hover:scale-[1.04]
                  transition
                ">
                  <div className="w-full h-full rounded-[32px] overflow-hidden">
                    {t.component}
                  </div>
                </div>

                {/* TEMPLATE NAME */}
                <h3 className="mt-7 text-xl font-semibold text-gray-900">
                  {t.name}
                </h3>

                {/* BUTTON */}
                <button
                  onClick={() => {
                    localStorage.setItem("selectedTemplate", t.name);
                    alert(`${t.name} template selected`);
                  }}
                  className="
                    mt-6 w-full
                    bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600
                    text-white
                    py-3
                    rounded-full
                    font-medium
                    shadow-lg
                    hover:scale-105
                    hover:shadow-xl
                    transition
                  "
                >
                  Use Template
                </button>
              </div>
            ))}
          </div>

        </div>

        <Footer />
      </main>
      

    </>
  );
}
