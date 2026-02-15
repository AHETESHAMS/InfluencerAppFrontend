export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 py-20 px-6">
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Terms & Conditions
        </h1>

        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="mt-10 space-y-8 text-gray-700 dark:text-gray-300 leading-relaxed">

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              1. Acceptance of Terms
            </h2>
            <p className="mt-2">
              By accessing and using our platform, you agree to comply with and be bound by these terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              2. Use of Service
            </h2>
            <p className="mt-2">
              You agree to use this platform only for lawful purposes and in a way that does not infringe the rights of others.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              3. Payments & Subscriptions
            </h2>
            <p className="mt-2">
              Subscription fees are billed monthly. Payments are securely processed through Razorpay.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              4. Cancellation Policy
            </h2>
            <p className="mt-2">
              You may cancel your subscription anytime. Access will remain active until the end of the billing cycle.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              5. Limitation of Liability
            </h2>
            <p className="mt-2">
              We are not responsible for any loss or damages arising from the use of our platform.
            </p>
          </section>

        </div>
      </div>

    </main>
  );
}
