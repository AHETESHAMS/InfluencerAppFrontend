import { Youtube, Instagram, Music, X } from "lucide-react";

interface TemplateProps {
  data?: {
    name?: string;
    bio?: string;
    image?: string;
    links?: { title: string; url: string }[];
  };
}

export default function GradientTemplate({ data }: TemplateProps) {

  const profile = {
    name: data?.name || "Riya Influencer",
    bio: data?.bio || "Lifestyle • Fashion • Daily Vibes ✨",
    image:
      data?.image ||
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=400",
    links:
      data?.links || [
        { title: "My Reels", url: "#" },
        { title: "Instagram", url: "#" },
        { title: "Brand Collabs", url: "#" },
        { title: "Shop My Looks", url: "#" },
      ],
  };

  return (
    <div
      className="
        w-full h-full
        flex flex-col items-center text-center text-white
        bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600
        px-6 pt-10 pb-10
      "
    >
      {/* PROFILE */}
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 rounded-full blur-md bg-white/40"></div>

        <img
          src={profile.image}
          alt="profile"
          className="relative w-24 h-24 rounded-full object-cover border-4 border-white shadow-xl"
        />
      </div>

      {/* NAME */}
      <h1 className="mt-4 text-lg font-semibold tracking-tight">
        {profile.name}
      </h1>

      {/* BIO */}
      <p className="text-white/90 text-xs mt-1 max-w-[210px] leading-relaxed">
        {profile.bio}
      </p>

      {/* LINKS */}
      <div className="w-full mt-6 space-y-3">
        {profile.links.map((link, i) => (
          <a
            key={i}
            href={link.url}
            className="
              block w-full
              py-3
              rounded-full
              bg-white/20
              backdrop-blur-md
              border border-white/30
              text-white
              text-sm
              font-semibold
              shadow-lg
              hover:bg-white/30
              transition
              tracking-wide
            "
          >
            {link.title}
          </a>
        ))}
      </div>

      {/* SOCIAL ICONS */}
      <div className="flex gap-6 mt-8 text-white">
        <Music size={22} />
        <Youtube size={22} />
        <X size={22} />
        <Instagram size={22} />
      </div>
    </div>
  );
}
