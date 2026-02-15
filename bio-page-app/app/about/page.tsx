export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 py-20 px-6">

      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          About Influencer
        </h1>

        <p className="mt-6 text-lg text-gray-600 dark:text-gray-400">
          Influencer is built to help creators, influencers, and entrepreneurs
          share all their important links in one beautiful and professional page.
        </p>
      </div>

      {/* Mission */}
      <div className="max-w-5xl mx-auto mt-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Our Mission
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            Our mission is to simplify how creators share their content,
            promote products, and grow their online presence.
            We believe one smart link can unlock unlimited opportunities.
          </p>
        </div>

        <div className="flex justify-center">
        <div className="w-[240px] sm:w-[260px] md:w-[280px] rounded-2xl overflow-hidden shadow-xl">
        <img
        src="/images/dashboard-profile.png"
        alt="preview"
        className="w-full h-auto object-contain"
        />
        </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="max-w-5xl mx-auto mt-20">
        <h2 className="text-2xl font-semibold text-center text-gray-900 dark:text-white">
          Why Choose Us?
        </h2>

        <div className="mt-10 grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Simple & Fast",
              desc: "Create your page in minutes without technical skills.",
            },
            {
              title: "Professional Design",
              desc: "Modern layouts that build trust and increase engagement.",
            },
            {
              title: "Built for Growth",
              desc: "Perfect for creators, influencers, and affiliate marketers.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm text-center"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {item.title}
              </h3>
              <p className="mt-3 text-gray-600 dark:text-gray-400">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Closing */}
      <div className="max-w-3xl mx-auto mt-20 text-center">
        <p className="text-lg text-gray-700 dark:text-gray-300">
          We’re committed to helping you grow your audience, promote your work,
          and build your brand with ease.
        </p>
      </div>

    </main>
  );
}
