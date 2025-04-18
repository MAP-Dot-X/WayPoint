"use client";

import { useState } from "react";
import { Clock } from "lucide-react";
import { supabase } from "../../lib/supabase";

const SUPABASE_TABLE_NAME = process.env.NEXT_PUBLIC_SUPABASE_TABLE!;

export interface HourProps {
	id: string;
	name: string;
	latitude: number;
	longitude: number;
	opening: string;
	closing: string;
	day_of_week: string;
}

interface HoursProps {
	onDataChange: (data: HourProps[]) => void;
	onToggle: (visible: boolean) => void;
}

export default function Hours({ onDataChange, onToggle }: HoursProps) {
	const [isAvailable, setIsAvailable] = useState(false);
	const [hasFetched, setHasFetched] = useState(false);

	const handleClick = async () => {
		const newToggle = !isAvailable;
		setIsAvailable(newToggle);
		onToggle(newToggle);

		if (newToggle && !hasFetched) {
			const { data, error } = await supabase.from(SUPABASE_TABLE_NAME).select("*");
			
			if (error) {
				console.error("Error fetching data:", error);
			} else {
				console.log("Fetched data:", data);
				onDataChange(data);
				setHasFetched(true);
			}
		}
	};

	return (
		<div className="absolute top-4 left-110 z-[1000]">
		<button
		onClick={handleClick}
		className="px-4 py-2 bg-white text-black rounded-full hover:bg-gray-200 transition flex items-center"
		>
			<Clock size={20} className="mr-2" />
			Hours
		</button>
		</div>
	
	);
}
