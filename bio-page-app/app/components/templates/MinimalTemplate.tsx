import { Youtube, Instagram, Music, X } from "lucide-react";

interface TemplateProps {
  data?: {
    name?: string;
    bio?: string;
    image?: string;
    links?: { title: string; url: string }[];
  };
}

export default function MinimalTemplate({ data }: TemplateProps) {

  const profile = {
    name: data?.name || "Arielle Emmanuelle",
    bio:
      data?.bio ||
      "Director with a passion for climate justice",
    image:
      data?.image ||
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400",
    links:
      data?.links || [
        { title: "Work", url: "#" },
        { title: "Souvenir Collective", url: "#" },
        { title: "Inspiration", url: "#" },
        { title: "Want to collaborate together?", url: "#" },
      ],
  };

  return (
    <div className="w-full h-full bg-[#deddd9] px-6 pt-10 pb-10 flex flex-col items-center text-center">

      {/* Profile */}
<div className="relative w-24 h-24">
  <img
    src={profile.image}
    alt="profile"
    className="
      w-24 h-24
      rounded-full
      object-cover
      object-center
      border-4 border-white
      shadow-md
    "
  />
</div>


      {/* Name */}
      <h1 className="mt-4 text-lg font-semibold text-gray-900">
        {profile.name}
      </h1>

      {/* Bio */}
      <p className="text-gray-600 text-xs mt-1 max-w-[210px] leading-relaxed">
        {profile.bio}
      </p>

      {/* Paper Links */}
      <div className="w-full mt-6 space-y-3">
        {profile.links.map((link, i) => (
          <a
            key={i}
            href={link.url}
            className="
              block w-full
              bg-white
              text-gray-900
              py-3
              text-sm
              font-semibold
              border border-gray-200
              shadow-sm
              hover:shadow-md
              transition
              tracking-wide
            "
          >
            {link.title}
          </a>
        ))}
      </div>

      {/* Social Icons */}
      <div className="flex gap-6 mt-8 text-black">
        <Music size={22} />
        <Youtube size={22} />
        <X size={22} />
        <Instagram size={22} />
      </div>

    </div>
  );
}
