"use client";
import { Users } from "lucide-react";

export default function Crowdness() {
	return (
		<div className="absolute z-[1000] flex flex-col gap-2 left-30 top-[4.5rem] lg:top-4 lg:left-[580px] lg:flex-row">
			<button className="px-4 py-2 bg-white text-black rounded-full hover:bg-gray-200 transition flex items-center">
				<Users size={20} className="mr-2" />
				Crowdness
			</button>
		</div>
	);
	
}
