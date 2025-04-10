"use client";
import { useSidebar } from "../context/SidebarContext";
import { X, Compass, Clock, Calendar, Phone, Settings, MessageSquareWarning } from "lucide-react";

import { useState } from "react";
import SubSidebar from "./SubSidebar";

function NavItem({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick: () => void }) {
  return (
    <li
      className="
        flex items-center gap-3
        px-4 py-2
        cursor-pointer 
        hover:bg-blue-100 hover:text-blue-800
        transition-colors duration-200 ease-in-out
      "
      onClick={onClick}
    >
      {icon}
      <span className="text-md font-medium">{label}</span>
    </li>
  );
}

export default function Sidebar() {
  const { isOpen, toggleSidebar } = useSidebar();

  //track which item is clicked
  const [activeItem, setActiveItem] = useState(null);

  //closes sub-sidebar by resetting active item
  const closeSubSidebar = () => setActiveItem(null);

  return (
    <>
      {/* Main Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full
          bg-gradient-to-br from-gray-50 to-white
          shadow-xl border-r border-gray-200
          z-[1000]
          transform transition-transform duration-350
          flex flex-col
          ${isOpen ? "translate-x-0 w-70" : "-translate-x-full w-70"}
        `}
        style={{
          borderTopRightRadius: "1rem",
          borderBottomRightRadius: "1rem",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">WayPoint</h2>
          <button
            onClick={toggleSidebar}
            aria-label="Close sidebar"
            className="p-2 rounded-full bg-white text-gray-700 hover:bg-gray-100 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Main Content */}
        <nav className="flex-1 overflow-y-auto mt-2">
          <ul className="text-gray-700">
            <NavItem
              icon={<Compass size={20} />}
              label="Explore"
              onClick={() => setActiveItem("Explore")}
            />
            <NavItem
              icon={<MessageSquareWarning size={20} />}
              label="Report"
              onClick={() => setActiveItem("Report")}
            />
            <NavItem
              icon={<Clock size={20} />}
              label="Recent"
              onClick={() => setActiveItem("Recent")}
            />
            <NavItem
              icon={<Calendar size={20} />}
              label="Events"
              onClick={() => setActiveItem("Events")}
            />

            <hr className="my-3 border-gray-200" />

            {/* Items that don't open sub-sidebar */}
            <NavItem
              icon={<Phone size={20} />}
              label="Contact"
              onClick={() => console.log("Contact clicked")}
            />
            <NavItem
              icon={<Settings size={20} />}
              label="Settings"
              onClick={() => console.log("Settings clicked")}
            />
          </ul>
        </nav>

        {/* Footer */}
        <div
          className="
            p-3 text-center text-xs text-gray-400 
            border-t border-gray-200
            bg-gray-50
          "
          style={{ borderBottomRightRadius: "1rem" }}
        >
          © 2025 WayPoint
        </div>
      </aside>

      {/* shows if activeItem is set */}
      <SubSidebar activeItem={activeItem} onClose={closeSubSidebar} />
    </>
  );
}
