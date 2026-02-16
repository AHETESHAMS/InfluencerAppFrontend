export default function MinimalTemplate({ data }: any) {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-16 px-6">

      <img
        src={data.image}
        className="w-24 h-24 rounded-full object-cover shadow-md"
      />

      <h1 className="mt-4 text-xl font-semibold">{data.name}</h1>
      <p className="text-gray-500 text-sm mt-1 text-center max-w-xs">
        {data.bio}
      </p>

      <div className="w-full max-w-sm mt-8 space-y-3">
        {data.links.map((link: any, i: number) => (
          <a
            key={i}
            href={link.url}
            className="block text-center py-3 rounded-xl bg-black text-white hover:scale-105 transition"
          >
            {link.title}
          </a>
        ))}
      </div>

    </div>
  );
}
