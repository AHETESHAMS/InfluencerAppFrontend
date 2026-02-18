"use client";

import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();

  return (
    <footer className="relative mt-24 text-white">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] via-[#111827] to-[#020617]" />

      {/* subtle glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.15),transparent_60%)]" />

      <div className="relative w-full px-6 md:px-12 lg:px-20 py-20">

        
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
                className="relative hover:text-white transition after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-gradient-to-r after:from-indigo-400 after:to-purple-400 after:transition-all hover:after:w-full"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* DIVIDER */}
        <div className="my-14 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* BOTTOM ROW */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-white/50 text-xs tracking-wide">
          <p>© {new Date().getFullYear()} Influencer. All rights reserved.</p>
          <p>Crafted for creators & professionals worldwide.</p>
        </div>
      </div>
    </footer>
  );
}
