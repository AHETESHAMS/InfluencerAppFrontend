"use client";

import { useRef, useState } from "react";
import {
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaPhoneAlt,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function EditPage() {
  const profileRef = useRef<HTMLInputElement>(null);
  const cardImageRef = useRef<HTMLInputElement>(null);

  const [profileImage, setProfileImage] = useState("/avatar.png");
  const [cardImage, setCardImage] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center px-4 py-10">
      <div className="w-full max-w-md">

        {/* Page Title */}
        <h1 className="text-center text-2xl font-semibold text-gray-800 mb-8">
          Edit Page
        </h1>

        {/* Profile Image */}
        <div className="flex flex-col items-center mb-6">
          <div
            onClick={() => profileRef.current?.click()}
            className="relative cursor-pointer"
          >
            <img
              src={profileImage}
              className="w-28 h-28 rounded-full object-cover border-4 border-emerald-500 shadow"
            />
            <div className="absolute bottom-1 right-1 bg-white p-1 rounded-full shadow text-sm">
              ✏️
            </div>
          </div>

          <input
            ref={profileRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) =>
              e.target.files &&
              setProfileImage(URL.createObjectURL(e.target.files[0]))
            }
          />

          <input
            type="text"
            placeholder="Your Name"
            className="mt-4 w-full px-4 py-3 rounded-xl border border-gray-200 shadow-sm text-gray-800 placeholder-gray-400 outline-none"
          />

          <p className="text-gray-500 text-sm mt-1">
            Creator · Business · Affiliations
          </p>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center gap-4 mb-6">
          <SocialIcon icon={<FcGoogle size={22} />} />
          <SocialIcon icon={<FaInstagram size={20} color="#E1306C" />} />
          <SocialIcon icon={<FaLinkedinIn size={20} color="#0A66C2" />} />
          <SocialIcon icon={<FaYoutube size={22} color="#FF0000" />} />
          <SocialIcon icon={<FaPhoneAlt size={18} color="#16A34A" />} />
        </div>

        {/* Add Card */}
        <button className="flex items-center gap-2 mb-6 px-4 py-3 bg-white rounded-xl shadow hover:bg-gray-50">
          <span className="text-xl">＋</span>
          <span className="font-medium text-gray-800">Add Card</span>
        </button>

        {/* Card Editor */}
        <div className="bg-white rounded-2xl shadow-lg p-5">
          <div
            onClick={() => cardImageRef.current?.click()}
            className="border border-dashed border-gray-300 rounded-xl p-4 mb-4 text-center cursor-pointer hover:bg-gray-50"
          >
            {cardImage ? (
              <img
                src={cardImage}
                className="w-full h-40 object-cover rounded-lg"
              />
            ) : (
              <p className="text-gray-500">Upload Image</p>
            )}
          </div>

          <input
            ref={cardImageRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) =>
              e.target.files &&
              setCardImage(URL.createObjectURL(e.target.files[0]))
            }
          />

          <input
            type="text"
            placeholder="Title"
            className="w-full mb-3 px-4 py-3 rounded-xl border border-gray-200 shadow-sm text-gray-800 placeholder-gray-400 outline-none"
          />

          <input
            type="text"
            placeholder="Short description (1–2 lines)"
            className="w-full mb-3 px-4 py-3 rounded-xl border border-gray-200 shadow-sm text-gray-800 placeholder-gray-400 outline-none"
          />

          <input
            type="url"
            placeholder="Link (affiliate / website)"
            className="w-full mb-4 px-4 py-3 rounded-xl border border-gray-200 shadow-sm text-gray-800 placeholder-gray-400 outline-none"
          />

          <div className="flex justify-between items-center">
            <button className="text-red-500 text-xl">🗑️</button>
            <button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 rounded-xl shadow">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Reusable Icon Button */
function SocialIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <button className="w-11 h-11 rounded-xl bg-white shadow flex items-center justify-center hover:bg-gray-50">
      {icon}
    </button>
  );
}
