"use client";

import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import SubSidebar from "./components/SubSidebar";
import { HourProps } from "./components/navbar/Hours";
import { supabase } from "./lib/supabase";
import LocationSidebar from "./components/locationSidebar/locationSidebar";

const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
const HoursMarker = dynamic(() => import("./components/navbar/HoursMarker"), { ssr: false });
const MapMarker = dynamic(() => import("./components/MapMarker"), { ssr: false });
const MapController = dynamic(() => import("./components/MapController"), { ssr: false });

const SUPABASE_TABLE_NAME = process.env.NEXT_PUBLIC_SUPABASE_TABLE!;

export default function Home() {
	const [isClient, setIsClient] = useState(false);
	const [showMarkers, setShowMarkers] = useState(false);
	const [markerData, setMarkerData] = useState<HourProps[]>([]);
	const [selectedBuilding, setSelectedBuilding] = useState<{
		name: string;
		lat: number;
		lng: number;
	} | null>(null);
	const [shouldFlyToMarker, setShouldFlyToMarker] = useState(false);
	const [showSubSidebar, setShowSubSidebar] = useState(false);

	const handleSelectBuilding = async (buildingName: string) => {
		const { data, error } = await supabase
			.from(SUPABASE_TABLE_NAME)
			.select("name, latitude, longitude")
			.eq("name", buildingName)
			.maybeSingle();

		if (error || !data) {
			console.error("Failed to fetch building data:", error);
			return;
		}

		setSelectedBuilding({
			name: data.name,
			lat: data.latitude,
			lng: data.longitude,
		});
		setShouldFlyToMarker(true);

		if (buildingName === "New Computer Science Building") {
			setShowSubSidebar(true);
		}
		
	};

	useEffect(() => {
		setIsClient(true);
	}, []);

	const handleToggle = (visible: boolean) => {
		setShowMarkers(visible);
	};

	const handleDataChange = (data: HourProps[]) => {
		setMarkerData(data);
	};

	const handleCloseSubSidebar = () => {
		setShowSubSidebar(false);  
		setSelectedBuilding(null);
	};
	
	if (!isClient) return <p>Loading map...</p>;

	return (
		<div className="relative w-full h-screen">
			<Navbar
				onSignIn={() => console.log("Sign In clicked")}
				onToggle={handleToggle}
				onDataChange={handleDataChange}
			/>

			<div className="absolute top-0 left-0 w-full h-full pointer-events-auto">
				<MapContainer
					center={[40.915547526247074, -73.12272596217514]}
					zoom={16}
					style={{ height: "100%", width: "100%" }}
					zoomControl={false}
					attributionControl={false}
				>
					<TileLayer
						attribution='&copy; OpenStreetMap contributors'
						url="https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=d3uIpCWUCDWUe0yLzTJp"
					/>

					{showMarkers && <HoursMarker data={markerData} />}
					{selectedBuilding && (
						<>
							<MapMarker
								position={[selectedBuilding.lat, selectedBuilding.lng]}
								label={selectedBuilding.name}
							/>
							{shouldFlyToMarker && (
								<MapController
									lat={selectedBuilding.lat}
									lng={selectedBuilding.lng}
									onComplete={() => setShouldFlyToMarker(false)}
								/>
							)}
						</>
					)}
				</MapContainer>
			</div>

			<Sidebar onSelectBuilding={handleSelectBuilding} />
			<SubSidebar
				isOpen={showSubSidebar}
				onClose={handleCloseSubSidebar}
				building={selectedBuilding}
			/>
			<LocationSidebar />
		</div>
	);
}
