"use client";
import React from "react";
import {
	Wrench,
	Anvil,
	Zap,
	Computer
} from "lucide-react";

export type AcademicSidebarProps = {
	onSelectBuilding: (buildingName: string) => void;
};

export default function AcademicSidebar({ onSelectBuilding }: AcademicSidebarProps) {
    
	return (
		<ul>
			<li onClick={() => onSelectBuilding("Engineering Building")} className="px-4 py-2 hover:bg-blue-100 cursor-pointer">
				<div className="flex items-center gap-3">
					<Wrench size={20} />
					<span className="font-medium">Engineering Building</span>
				</div>
				<p className="text-sm text-gray-500 ml-8">College of Engineering and Applied Sciences</p>
			</li>

			<li onClick={() => onSelectBuilding("Heavy Engineering Building")} className="px-4 py-2 hover:bg-blue-100 cursor-pointer">
				<div className="flex items-center gap-3">
					<Anvil size={20} />
					<span className="font-medium">Heavy Engineering Building</span>
				</div>
				<p className="text-sm text-gray-500 ml-8">College of Engineering and Applied Sciences</p>
			</li>

			<li onClick={() => onSelectBuilding("Light Engineering Building")} className="px-4 py-2 hover:bg-blue-100 cursor-pointer">
				<div className="flex items-center gap-3">
					<Zap size={20} />
					<span className="font-medium">Light Engineering Building</span>
				</div>
				<p className="text-sm text-gray-500 ml-8">College of Engineering and Applied Sciences</p>
			</li>

			<li onClick={() => onSelectBuilding("Old Computer Science Building")} className="px-4 py-2 hover:bg-blue-100 cursor-pointer">
				<div className="flex items-center gap-3">
					<Computer size={20} />
					<span className="font-medium">Old Computer Science Building</span>
				</div>
				<p className="text-sm text-gray-500 ml-8">College of Engineering and Applied Sciences</p>
			</li>

			<li onClick={() => onSelectBuilding("New Computer Science Building")} className="px-4 py-2 hover:bg-blue-100 cursor-pointer">
				<div className="flex items-center gap-3">
					<Computer size={20} />
					<span className="font-medium">New Computer Science Building</span>
					
				</div>
				<p className="text-sm text-gray-500 ml-8">College of Engineering and Applied Sciences</p>
			</li>
		</ul>
	);
}
