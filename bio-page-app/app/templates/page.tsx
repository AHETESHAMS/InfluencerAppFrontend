"use client";

import MinimalTemplate from "@/components/templates/MinimalTemplate";
import GradientTemplate from "@/components/templates/GradientTemplate";
import DarkTemplate from "@/components/templates/DarkTemplate";

export default function TemplatesPage() {

  const previewData = {
    name: "Rohit Creator",
    bio: "Affiliate marketer & content creator",
    image: "/avatar.png",
    links: [
      { title: "My Store", url: "#" },
      { title: "YouTube", url: "#" },
      { title: "Instagram", url: "#" },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 py-16 px-6">

      {/* PAGE TITLE */}
      <h1 className="text-3xl font-bold text-center mb-12">
        Choose Your Template
      </h1>

      {/* TEMPLATE GRID */}
      <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">

        <div className="bg-white rounded-3xl shadow-lg p-4">
          <MinimalTemplate data={previewData} />
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-4">
          <GradientTemplate data={previewData} />
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-4">
          <DarkTemplate data={previewData} />
        </div>

      </div>

    </div>
  );
}
