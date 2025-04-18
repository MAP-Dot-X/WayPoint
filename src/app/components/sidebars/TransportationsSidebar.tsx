"use client";
import React from "react";
import { BusFront, Bike, LockKeyhole, ParkingCircle } from "lucide-react";
import { useSidebar } from "../../context/SidebarContext";

export default function TransportationsSidebar() {
	const { setActiveSidebar } = useSidebar();

	return (
		<ul>
			<li
				onClick={() => setActiveSidebar("Bus")}
				className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-blue-100 hover:text-blue-800 transition"
			>
				<BusFront size={20} />
				Bus
			</li>
			<li
				onClick={() => setActiveSidebar("BikeStations")}
				className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-blue-100 hover:text-blue-800 transition"
			>
				<Bike size={20} />
				Bike Stations
			</li>
			<li
				onClick={() => setActiveSidebar("BikeRacks")}
				className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-blue-100 hover:text-blue-800 transition"
			>
				<LockKeyhole size={20} />
				Bike Racks
			</li>
			<li
				onClick={() => setActiveSidebar("Parkings")}
				className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-blue-100 hover:text-blue-800 transition"
			>
				<ParkingCircle size={20} />
				Parkings
			</li>
		</ul>
	);
}
