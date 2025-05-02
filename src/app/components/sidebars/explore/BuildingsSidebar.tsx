"use client";
import React from "react";
import {
	GraduationCap,
	Home,
	BookOpen,
	Users,
} from "lucide-react";
import { useSidebar } from "../../../context/SidebarContext";

export default function BuildingsSidebar() {
	const { openSidebar } = useSidebar();

	return (
		<ul>
			<li
				onClick={() => openSidebar("Academic")}
				className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-blue-100 hover:text-blue-800 transition"
			>
				<GraduationCap size={20} />
				Academic
			</li>
			<li
				onClick={() => openSidebar("Residential")}
				className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-blue-100 hover:text-blue-800 transition"
			>
				<Home size={20} />
				Residential
			</li>
			<li
				onClick={() => openSidebar("Library")}
				className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-blue-100 hover:text-blue-800 transition"
			>
				<BookOpen size={20} />
				Library
			</li>
			<li
				onClick={() => openSidebar("Social")}
				className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-blue-100 hover:text-blue-800 transition"
			>
				<Users size={20} />
				Social
			</li>
		</ul>
	);
}
