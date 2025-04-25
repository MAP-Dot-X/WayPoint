"use client";
import React from "react";

export type ResidentialSidebarProps = {
	onSelectBuilding: (buildingName: string) => void;
};

export default function ResidentialSidebar({ onSelectBuilding }: ResidentialSidebarProps) {
	const buildings = {
		"Mendelsohn Community": [
			"O'neill Hall",
			"Irving Hall",
			"Ammann Hall",
			"Gray Hall",
		],
		"H Community": [
			"Benedict Hall",
			"Langmuir Hall",
			"James Hall",
		],
		"Roth Community": [
			"Cardozo Hall",
			"Gershwin Hall",
			"Hendrix Hall",
			"Mount Hall",
			"Whitman Hall",
		],
		"Tabler Community": [
			"Douglass Hall",
			"Dreiser Hall",
			"Hand Hall",
			"Chinn Hall",
			"Toscanini Hall",
		],
		"Kelly Community": [
			"Baruch Hall",
			"Dewey Hall",
			"Eisenhower Hall",
			"Hamilton Hall",
			"Schick Hall",
		],
		"Eleanor Roosevelt Community": [
			"Keller Hall",
			"Greeley Hall",
			"Wagner Hall",
			"Stimson Hall",
		],
		"West Apartments": [
			"Building A",
			"Building B",
			"Building C",
			"Building D",
			"Building E",
			"Building F",
			"Building G",
			"Building H",
			"Building I",
			"Building J",
			"Building K",
		],
		"Living Learning Community": [
			"Yang Hall",
			"Lauterbur Hall",
			"Chavez Hall",
			"Tubman Hall",
		],
		"Schomburg Apartments": [
			"Schomburg A",
			"Schomburg B",
		],
	};

	return (
		<div className="overflow-y-auto h-full">
			{Object.entries(buildings).map(([community, halls]) => (
				<div key={community} className="mb-6">
					<h2 className="text-lg font-semibold mb-2 pl-4">{community}</h2>
					<ul className="space-y-1">
						{halls.map((hall) => (
							<li
								key={hall}
								onClick={() => onSelectBuilding(hall)}
								className="py-2 hover:bg-blue-100 cursor-pointer"
							>
								<div className="flex items-center gap-3 pl-4">
									<span className="font-medium">{hall}</span>
								</div>
							</li>
						))}
					</ul>
				</div>
			))}
		</div>
	);
}
