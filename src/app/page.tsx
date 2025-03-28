"use client";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";


// Dynamically import React-Leaflet components to prevent SSR issues
const MapContainer = dynamic(
	() => import("react-leaflet").then((mod) => mod.MapContainer),
	{ ssr: false }
);
const TileLayer = dynamic(
	() => import("react-leaflet").then((mod) => mod.TileLayer),
	{ ssr: false }
);

export default function Home() {
	const [isClient, setIsClient] = useState(false);
	
	useEffect(() => {
		setIsClient(true);
	}, []);

	const handleSignIn = () => {
		console.log("Sign In button clicked!");
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
					attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=d3uIpCWUCDWUe0yLzTJp"
				/>
			</MapContainer>
			
			<Navbar onSignIn={handleSignIn} />
		</div>
	);
}