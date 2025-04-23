"use client";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

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

type MapMarkerProps = {
	position: [number, number];
	label: string;
};

const MapMarker = ({ position, label }: MapMarkerProps) => {
	return (
		<Marker position={position} icon={redIcon}>
			<Popup>{label}</Popup>
		</Marker>
	);
};

export default MapMarker;
