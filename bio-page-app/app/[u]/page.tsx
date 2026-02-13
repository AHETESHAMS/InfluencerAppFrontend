import { FiSearch, FiChevronRight } from "react-icons/fi";

type Card = {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
};

export default function PublicProfilePage() {
  // Later this will come from DB
  const cards: Card[] = [];

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center px-4 py-10">
      <div className="w-full max-w-md">

        {/* Profile Section */}
        <div className="text-center mb-8">
          <div className="w-28 h-28 mx-auto rounded-full border-4 border-emerald-500 bg-white" />

          <h1 className="mt-4 text-xl font-semibold text-gray-900">
            Your Name
          </h1>

          <p className="text-sm text-gray-600 mt-1">
            Creator · Business · Affiliations
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex items-center bg-white rounded-full shadow px-4 py-3 mb-8">
          <FiSearch className="text-gray-500 mr-3" />
          <input
            placeholder="Search"
            className="
              flex-1
              bg-transparent
              outline-none
              text-gray-800
              placeholder:text-gray-500
            "
          />
          <button className="bg-gray-900 text-white rounded-full p-2">
            <FiChevronRight />
          </button>
        </div>

        {/* Cards / Empty State */}
        {cards.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-4">
            {cards.map((card) => (
              <a
                key={card.id}
                href={card.link}
                target="_blank"
                className="
                  bg-white
                  rounded-xl
                  shadow
                  p-4
                  flex
                  items-center
                  hover:shadow-md
                  transition
                "
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-14 h-14 rounded-lg object-cover mr-4"
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {card.description}
                  </p>
                </div>

                <FiChevronRight className="text-gray-400" />
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center text-gray-600 mt-12">
      <p className="text-sm">
        This page is being set up by the creator.
      </p>
      <p className="text-xs text-gray-500 mt-1">
        Check back soon 👋
      </p>
    </div>
  );
}
