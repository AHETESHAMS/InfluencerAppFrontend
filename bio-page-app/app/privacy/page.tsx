export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 py-20 px-6">
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Privacy Policy
        </h1>

        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="mt-10 space-y-8 text-gray-700 dark:text-gray-300 leading-relaxed">

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              1. Information We Collect
            </h2>
            <p className="mt-2">
              We collect basic information such as your name, email address, and profile details when you register on our platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              2. How We Use Your Information
            </h2>
            <p className="mt-2">
              Your information is used to provide and improve our services, personalize your experience, and communicate important updates.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              3. Payment Security
            </h2>
            <p className="mt-2">
              All payments are securely processed via Razorpay. We do not store your card or banking details.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              4. Data Protection
            </h2>
            <p className="mt-2">
              We implement industry-standard security measures to protect your data from unauthorized access.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              5. Third-Party Services
            </h2>
            <p className="mt-2">
              We may use trusted third-party services (such as authentication and payment providers) to operate our platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              6. Your Rights
            </h2>
            <p className="mt-2">
              You can request access, correction, or deletion of your personal data at any time.
            </p>
          </section>

        </div>
      </div>

    </main>
  );
}
