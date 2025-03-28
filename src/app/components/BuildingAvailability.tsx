"use client";
import { Clock } from "lucide-react";

export default function BuildingAvailability() {
  return (
    <div className="absolute top-4 left-110 z-[1000]">
        <button className="px-4 py-2 bg-white text-black rounded-full hover:bg-gray-200 transition flex items-center">
        <Clock size={20} className="mr-2" />
            Availability
        </button>
    </div>
  );
}
