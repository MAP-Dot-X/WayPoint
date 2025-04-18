"use client";
import React from "react";
import { Building, Bus, Toilet, Utensils } from "lucide-react";
import { useSidebar } from "../../context/SidebarContext";

export default function ExploreSidebar() {
  const { setActiveSidebar } = useSidebar();

  return (
  	<ul>
		<li
			onClick={() => setActiveSidebar("Buildings")}
			className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-blue-100 hover:text-blue-800 transition"
		>
			<Building size={20} />
			Buildings
		</li>
		<li 
			onClick={() => setActiveSidebar("Transportations")}
			className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-blue-100 transition">
			<Bus size={20} />
			Transportations
		</li>
		<li className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-blue-100 transition">
			<Toilet size={20} />
			Restrooms
		</li>
		<li 
			onClick={() => setActiveSidebar("Dining")}
			className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-blue-100 transition">
			<Utensils size={20} />
			Dining
		</li>
	</ul>
  );
}
