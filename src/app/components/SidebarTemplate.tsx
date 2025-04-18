"use client";
import React from "react";
import { ArrowLeft, X } from "lucide-react";

interface SidebarTemplateProps {
  title: string;
  activeItem?: string | null;
  onBack?: () => void;
  onClose: () => void;
  children: React.ReactNode;
}

export default function SidebarTemplate({
  title,
  activeItem,
  onBack,
  onClose,
  children,
}: SidebarTemplateProps) {
  return (
    <div className="flex flex-col h-full w-full bg-gradient-to-br from-gray-50 to-white border-r border-gray-200 shadow-xl rounded-r-2xl overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
        {activeItem ? (
          <>
            <button
              onClick={onBack}
              aria-label="Back"
              className="p-2 rounded-full bg-gray-50 text-gray-700 hover:bg-gray-100 transition"
            >
              <ArrowLeft size={20} />
            </button>
            <h2 className="ml-4 text-xl font-semibold text-gray-800">
              {activeItem}
            </h2>
            <button
              onClick={onClose}
              aria-label="Close sidebar"
              className="p-2 rounded-full bg-white text-gray-700 hover:bg-gray-100 transition"
            >
              <X size={20} />
            </button>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
            <button
              onClick={onClose}
              aria-label="Close sidebar"
              className="p-2 rounded-full bg-white text-gray-700 hover:bg-gray-100 transition"
            >
              <X size={20} />
            </button>
          </>
        )}
      </div>
      <div className="flex-1 overflow-y-auto mt-2 text-black">{children}</div>
    </div>
  );
}
