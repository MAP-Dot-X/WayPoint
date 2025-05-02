"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "../../../../lib/supabase";

type Building = {
	id: string;
	name: string;
	latitude: string;
	longitude: string;
	sidebar: string;
	icon: string;
	area: string;
};

type SidebarProps = {
	sidebarType: string;
	onSelectBuilding: (buildingName: string) => void;
	icons: Record<string, React.FC<{ size?: number }>>;
};

export default function Sidebar({
	sidebarType,
	onSelectBuilding,
	icons,
}: SidebarProps) {
	const [buildings, setBuildings] = useState<Building[]>([]);

	useEffect(() => {
		const fetchBuildings = async () => {
			const { data, error } = await supabase
				.from(process.env.NEXT_PUBLIC_SUPABASE_SIDEBAR_TABLE!)
				.select("*")
				.eq("sidebarType", sidebarType)
				.order("name", { ascending: true })

			if (error) {
				console.error(`Failed to fetch ${sidebarType} buildings:`, error);
			} else {
				setBuildings(data || []);
			}
		};

		fetchBuildings();
	}, [sidebarType]);

	return (
		<ul>
			{buildings.map(({ id, name, icon, area }) => {
				const Icon = icons[icon] || icons["default"];
				return (
					<li
						key={id}
						onClick={() => onSelectBuilding(name)}
						className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
					>
						<div className="flex items-center gap-3">
							<Icon size={20} />
							<span className="font-medium">{name}</span>
						</div>
						<p className="text-sm text-gray-500 ml-8">{area}</p>
					</li>
				);
			})}
		</ul>
	);
}
