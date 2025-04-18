"use client";
import React from "react";
import {
  Utensils,
  Building2,
  Truck,
  MapPin,
} from "lucide-react";
import { useSidebar } from "../../context/SidebarContext";

export default function DiningSidebar() {
	const { setActiveSidebar } = useSidebar();

	return (
		<ul>
			<li
				onClick={() => setActiveSidebar("Dining Halls")}
				className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-blue-100 hover:text-blue-800 transition"
			>
				<Utensils size={20} />
				Dining Halls
			</li>
			<li
				onClick={() => setActiveSidebar("Affiliate Dinings")}
				className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-blue-100 hover:text-blue-800 transition"
			>
				<Building2 size={20} />
				Affiliate Dining
			</li>
			<li
				onClick={() => setActiveSidebar("Food Trucks")}
				className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-blue-100 hover:text-blue-800 transition"
			>
				<Truck size={20} />
				Food Trucks
			</li>
            <li
				onClick={() => setActiveSidebar("Off Campus Dining")}
				className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-blue-100 hover:text-blue-800 transition"
			>
				<MapPin size={20} />
				Off Campus Dining
			</li>
		</ul>
	);
}
