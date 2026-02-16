export default function GradientTemplate({ data }: any) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white flex flex-col items-center pt-16 px-6">

      <img
        src={data.image}
        className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
      />

      <h1 className="mt-4 text-2xl font-bold">{data.name}</h1>
      <p className="text-white/80 text-sm mt-1 text-center max-w-xs">
        {data.bio}
      </p>

      <div className="w-full max-w-sm mt-8 space-y-3">
        {data.links.map((link: any, i: number) => (
          <a
            key={i}
            href={link.url}
            className="block text-center py-3 rounded-full bg-white text-purple-700 font-semibold hover:scale-105 transition"
          >
            {link.title}
          </a>
        ))}
      </div>

    </div>
  );
}
