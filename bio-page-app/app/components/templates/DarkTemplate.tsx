export default function DarkTemplate({ data }: any) {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center pt-16 px-6">

      <img
        src={data.image}
        className="w-24 h-24 rounded-full border-2 border-green-400 shadow-[0_0_20px_rgba(74,222,128,0.7)]"
      />

      <h1 className="mt-4 text-xl font-semibold">{data.name}</h1>
      <p className="text-gray-400 text-sm mt-1 text-center max-w-xs">
        {data.bio}
      </p>

      <div className="w-full max-w-sm mt-8 space-y-3">
        {data.links.map((link: any, i: number) => (
          <a
            key={i}
            href={link.url}
            className="block text-center py-3 rounded-xl border border-green-400 hover:bg-green-400 hover:text-black transition"
          >
            {link.title}
          </a>
        ))}
      </div>

    </div>
  );
}
