"use client";

import { X } from "lucide-react";

interface NewComputerScienceBuildingProps {
	isOpen: boolean;
	onClose: () => void;
	building: {
		name: string;
		lat: number;
		lng: number;
	} | null;
}

export default function NewComputerScienceBuildingSidebar({
	isOpen,
	onClose,
	building,
}: NewComputerScienceBuildingProps) {
	if (!building) return null;

	return (
		<div
			className={`fixed top-0 right-0 h-full w-100 bg-white text-black shadow-lg z-1000 transform transition-transform duration-300 ease-in-out ${
				isOpen ? "translate-x-0" : "translate-x-full"
			}`}
		>
			<div className="flex items-center justify-between p-4 border-b border-gray-300">
				<h2 className="text-lg font-semibold text-gray-900">{building.name}</h2>
				<button onClick={onClose}>
					<X className="w-5 h-5 text-black" />
				</button>
			</div>

			<div className="p-4">
				<p className="font-semibold">Coordinates:</p>
				<p>Lat: {building.lat}</p>
				<p>Lng: {building.lng}</p>

				<p className="mt-4 text-sm text-black">
					This is the New Computer Science Building.
				</p>
			</div>
		</div>
	);
}
