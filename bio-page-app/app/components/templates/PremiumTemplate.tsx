import { Youtube, Instagram, Music, X } from "lucide-react";

interface TemplateProps {
  data?: {
    name?: string;
    bio?: string;
    image?: string;
    links?: { title: string; url: string }[];
  };
}

export default function PremiumTemplate({ data }: TemplateProps) {

  const profile = {
    name: data?.name || "Arielle Studio",
    bio:
      data?.bio ||
      "Creative Director • Visual Storytelling • Luxury Branding",
    image:
      data?.image ||
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400",
    links:
      data?.links || [
        { title: "Portfolio", url: "#" },
        { title: "Work With Me", url: "#" },
        { title: "Client Testimonials", url: "#" },
        { title: "Contact", url: "#" },
      ],
  };

  return (
    <div className="w-full h-full flex flex-col items-center text-center px-6 pt-10 pb-10
                    bg-gradient-to-b from-[#111827] to-black text-white">

      {/* Profile */}
      <div className="relative w-24 h-24">
        <img
          src={profile.image}
          alt="profile"
          className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-xl"
        />
      </div>

      {/* Name */}
      <h1 className="mt-4 text-lg font-semibold tracking-wide">
        {profile.name}
      </h1>

      {/* Bio */}
      <p className="text-white/70 text-xs mt-1 max-w-[210px] leading-relaxed">
        {profile.bio}
      </p>

      {/* Premium Links */}
      <div className="w-full mt-6 space-y-3">
        {profile.links.map((link, i) => (
          <a
            key={i}
            href={link.url}
            className="
              block w-full
              py-3
              text-sm
              font-semibold
              rounded-xl
              bg-white/10
              border border-white/20
              backdrop-blur-md
              shadow-lg
              hover:bg-white/20
              transition
              tracking-wide
            "
          >
            {link.title}
          </a>
        ))}
      </div>

      {/* Social Icons */}
      <div className="flex gap-6 mt-8 text-white/90">
        <Music size={22} />
        <Youtube size={22} />
        <X size={22} />
        <Instagram size={22} />
      </div>

    </div>
  );
}
