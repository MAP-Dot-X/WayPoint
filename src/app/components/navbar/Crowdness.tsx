"use client";
import { Users } from "lucide-react";

export default function Crowdness() {
  return (
    <div className="absolute top-4 left-145 z-[1000]">
      <button className="px-4 py-2 bg-white text-black rounded-full hover:bg-gray-200 transition flex items-center">
        <Users size={20} className="mr-2" />
            Crowdness
      </button>
    </div>
  );
}
