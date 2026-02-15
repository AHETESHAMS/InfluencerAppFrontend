export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 py-20 px-6">

      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Contact Us
        </h1>

        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Have questions or need support? We’d love to hear from you.
        </p>
      </div>

      <div className="max-w-4xl mx-auto mt-16 grid md:grid-cols-2 gap-12">

        {/* Contact Info */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Get in Touch
          </h2>

          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Reach out to us for support, business inquiries, or feedback.
          </p>

          <div className="mt-6 space-y-4 text-gray-700 dark:text-gray-300">
            <p>📧 support@influencer.com</p>
            <p>📍 India</p>
            <p>⏰ Mon - Fri, 9AM - 6PM</p>
          </div>
        </div>

        {/* Contact Form */}
        <form className="space-y-4">

          <input
            type="text"
            placeholder="Your Name"
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 bg-white dark:bg-gray-900 text-gray-800 dark:text-white"
          />

          <input
            type="email"
            placeholder="Your Email"
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 bg-white dark:bg-gray-900 text-gray-800 dark:text-white"
          />

          <textarea
            placeholder="Your Message"
            rows={5}
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 bg-white dark:bg-gray-900 text-gray-800 dark:text-white"
          />

          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-lg font-medium transition"
          >
            Send Message
          </button>

        </form>

      </div>

    </main>
  );
}
