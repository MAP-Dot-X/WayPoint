"use client";
import React from "react";

export default function RecentSidebar() {
  return (
    <ul>
      <li
        className="flex items-center gap-3 px-4 py-2 cursor-pointer text-black hover:bg-blue-100 hover:text-blue-800 transition-colors duration-200 ease-in-out"
      >
        Recent Dining Menu
      </li>
      <li
        className="flex items-center gap-3 px-4 py-2 cursor-pointer text-black hover:bg-blue-100 hover:text-blue-800 transition-colors duration-200 ease-in-out"
      >
        Recent Building Info
      </li>
      <li
        className="flex items-center gap-3 px-4 py-2 cursor-pointer text-black hover:bg-blue-100 hover:text-blue-800 transition-colors duration-200 ease-in-out"
      >
        Recent Bus Routes
      </li>
      
    </ul>
  );
}

