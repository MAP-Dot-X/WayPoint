"use client";

import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { HourProps } from "./components/navbar/Hours";

const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const HoursMarker = dynamic(() => import("./components/navbar/HoursMarker"), { ssr: false });

export default function Home() {
	const [isClient, setIsClient] = useState(false);
	const [showMarkers, setShowMarkers] = useState(false);
	const [markerData, setMarkerData] = useState<HourProps[]>([]);

	useEffect(() => {
		setIsClient(true);
	}, []);

	const handleToggle = (visible: boolean) => {
	setShowMarkers(visible);
	};
	
	const handleDataChange = (data: HourProps[]) => {
	setMarkerData(data);
	};

	if (!isClient) return <p>Loading map...</p>;

	return (
		<div className="relative w-full h-screen">
			<MapContainer
				center={[40.915547526247074, -73.12272596217514]}
				zoom={16}
				style={{ height: "100vh", width: "100vw" }}
				zoomControl={false}
				attributionControl={false}
			>
				<TileLayer
					attribution='&copy; OpenStreetMap contributors'
					url="https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=d3uIpCWUCDWUe0yLzTJp"
				/>

				{showMarkers && <HoursMarker data={markerData} />}
			</MapContainer>

			<Navbar 
		onSignIn={() => console.log("Sign In clicked")} 
		onToggle={handleToggle}
		onDataChange={handleDataChange} 
	/>
		</div>
	);
}