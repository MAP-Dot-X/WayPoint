"use client";

import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { HourProps } from "./Hours";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const greenIcon = L.icon({
	iconUrl:
		"https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
	iconRetinaUrl:
		"https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
	shadowUrl: markerShadow.src,
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41],
});

const redIcon = L.icon({
	iconUrl:
		"https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
	iconRetinaUrl:
		"https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
	shadowUrl: markerShadow.src,
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41],
});

const isLocationOpen = (
	opening: string | null,
	closing: string | null,
	daysText: string
): boolean => {
	const now = new Date();
	const currentDay = now.toLocaleString("en-US", { weekday: "long" });

	const days = daysText.split(",").map((day) => day.trim());
	if (!days.includes(currentDay)) return false;

	if (opening === null && closing === null) {
		return true;
	}
	if (opening === null || closing === null) {
		return false;
	}

	const [openHour, openMin, openSec] = opening.split(":").map(Number);
	const [closeHour, closeMin, closeSec] = closing.split(":").map(Number);

	const openTime = new Date(
		now.getFullYear(),
		now.getMonth(),
		now.getDate(),
		openHour,
		openMin,
		openSec || 0
	);

	let closeTime;
	if (closing === "00:00:00") {
		// Treat "00:00:00" as midnight of the next day.
		closeTime = new Date(
			now.getFullYear(),
			now.getMonth(),
			now.getDate() + 1,
			0, 0, 0
		);
	} else {
		closeTime = new Date(
			now.getFullYear(),
			now.getMonth(),
			now.getDate(),
			closeHour,
			closeMin,
			closeSec || 0
		);
	}

	return now >= openTime && now < closeTime;
};

interface HoursMarkerProps {
	data: HourProps[];
}

const HoursMarker = ({ data }: HoursMarkerProps) => {
	const currentDay = new Date().toLocaleString("en-US", { weekday: "long" });
	
	const filteredDay = data.filter((location) => {
		const days = location.day_of_week.split(",").map((day) => day.trim());
		return days.includes(currentDay);
	});
	
	if (!filteredDay || filteredDay.length === 0) return null;

	return (
		<>
			{filteredDay.map((location) => {
				const open = isLocationOpen(
					location.opening,
					location.closing,
					location.day_of_week
				);
				const selectedIcon = open ? greenIcon : redIcon;
				
				const hoursDisplay =
					location.opening === null && location.closing === null
						? "24H"
						: `${location.opening} - ${location.closing}`;
				
				return (
					<Marker
						key={location.id}
						position={[location.latitude, location.longitude]}
						icon={selectedIcon}
					>
						<Popup>
							<strong>{location.name}</strong>
							<br />
							{open ? "Open now" : "Closed"}
							<br />
							{hoursDisplay}
						</Popup>
					</Marker>
				);
			})}
		</>
	);
};

export default HoursMarker;
