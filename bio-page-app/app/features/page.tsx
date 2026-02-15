export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 py-20 px-6">
      
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Powerful Features for Creators
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Everything you need to grow your audience and monetize your links.
        </p>
      </div>

      <div className="max-w-6xl mx-auto mt-16 grid md:grid-cols-3 gap-8">
        {[
          {
            title: "One Link Hub",
            desc: "Share one smart link that contains all your affiliate & business links.",
          },
          {
            title: "Boost Engagement",
            desc: "Make it easy for followers to discover everything you promote.",
          },
          {
            title: "Professional Design",
            desc: "Clean, modern layouts that build trust with your audience.",
          },
          {
            title: "Fast Setup",
            desc: "Create your page in minutes — no technical skills needed.",
          },
          {
            title: "Mobile Optimized",
            desc: "Your page looks perfect on phones, tablets, and desktops.",
          },
          {
            title: "Secure Payments",
            desc: "All payments processed securely via Razorpay.",
          },
        ].map((f) => (
          <div
            key={f.title}
            className="p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {f.title}
            </h3>
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              {f.desc}
            </p>
          </div>
        ))}
      </div>

    </main>
  );
}
