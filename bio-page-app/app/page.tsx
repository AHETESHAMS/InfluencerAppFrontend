export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-md p-4">

        <div className="text-center mb-6">
          <div className="w-24 h-24 rounded-full bg-gray-300 mx-auto mb-3"></div>
          <h1 className="text-xl font-semibold">Your Name</h1>
          <p className="text-sm text-gray-600">
            Creator • Business • Affiliations
          </p>
        </div>

        <section className="mb-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-2">
            My Business
          </h2>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="font-medium">Your Business Name</p>
            <p className="text-sm text-gray-500">
              Short description of your business
            </p>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-2">
            Brands I Work With
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-xl p-3 text-center shadow-sm">
              Brand 1
            </div>
            <div className="bg-white rounded-xl p-3 text-center shadow-sm">
              Brand 2
            </div>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-2">
            Tools I Use
          </h2>
          <div className="space-y-3">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              Tool Name
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              Tool Name
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
