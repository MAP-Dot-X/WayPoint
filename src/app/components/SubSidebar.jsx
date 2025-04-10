"use client";
import { X } from "lucide-react";

export default function SubSidebar({ activeItem, onClose }) {
  const isOpen = !!activeItem; // open if activeItem is non-null

  //placeholder info
  const getSubItems = () => {
    switch (activeItem) {
      case "Explore":
        return [
          "Campus Dining",
          "Buildings",
          "Bus Tracking",
          "Bike Station Data",
        ];
      case "Report":
        return [
          "Submit a Maintenance Issue",
          "Report Lost & Found",
          "Security Concern",
        ];
      case "Recent":
        return [
          "Recent Dining Menu",
          "Recent Building Info",
          "Recent Bus Routes",
        ];
      case "Events":
        return ["Campus Events", "Sports Matches", "Clubs & Organizations"];
      default:
        return [];
    }
  };

  return (
    <aside
      className={`
        fixed top-0 left-0 h-full
        bg-white shadow-xl border-r border-gray-200
        z-[1100]
        transform transition-transform duration-300
        flex flex-col
        ${isOpen ? "translate-x-0 w-56" : "-translate-x-full w-56"}
      `}
      style={{
        borderTopRightRadius: "1rem",
        borderBottomRightRadius: "1rem",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">{activeItem}</h2>
        <button
          onClick={onClose}
          aria-label="Close sub-sidebar"
          className="p-2 rounded-full bg-gray-50 text-gray-700 hover:bg-gray-100 transition"
        >
          <X size={20} />
        </button>
      </div>

      {/* placeholder content */}
      <div className="flex-1 overflow-y-auto mt-2 px-4">
        <ul className="space-y-1 text-gray-700">
          {getSubItems().map((subItem) => (
            <li
              key={subItem}
              className="bg-gray-50 hover:bg-blue-100 hover:text-blue-800
              p-2 rounded-md transition cursor-pointer"
            >
              {subItem}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
