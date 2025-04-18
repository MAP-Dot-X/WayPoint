"use client";
import React from "react";

export default function EventSidebar() {
	return (
		<ul>
			<li
				className="flex items-center gap-3 px-4 py-2 cursor-pointer text-black hover:bg-blue-100 hover:text-blue-800 transition-colors duration-200 ease-in-out"
			>
				Campus Events
			</li>
			<li
				className="flex items-center gap-3 px-4 py-2 cursor-pointer text-black hover:bg-blue-100 hover:text-blue-800 transition-colors duration-200 ease-in-out"
			>
				Sports Matching
			</li>
			<li
				className="flex items-center gap-3 px-4 py-2 cursor-pointer text-black hover:bg-blue-100 hover:text-blue-800 transition-colors duration-200 ease-in-out"
			>
				Clubs &amp; Organizations
			</li>
		</ul>
	);
}

