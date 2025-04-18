"use client";
import React from "react";
import { Wrench, PackageSearch, ShieldAlert } from "lucide-react";

export default function ReportSidebar() {
  return (
	<ul>
		<li
			className="flex items-center gap-3 px-4 py-2 cursor-pointer text-black hover:bg-blue-100 hover:text-blue-800 transition-colors duration-200 ease-in-out"
		>
			<Wrench size={20} />
			Submit a Maintenance Issue
		</li>
		<li
			className="flex items-center gap-3 px-4 py-2 cursor-pointer text-black hover:bg-blue-100 hover:text-blue-800 transition-colors duration-200 ease-in-out"
		>
			<PackageSearch size={20} />
			Report Lost &amp; Found
		</li>
	</ul>
  );
}
