"use client";
import { useMap } from "react-leaflet";
import { useEffect } from "react";

type MapControllerProps = {
	lat: number;
	lng: number;
	zoom?: number;
	onComplete: () => void;
};

export default function MapController({ lat, lng, zoom = 18, onComplete }: MapControllerProps) {
	const map = useMap();

	useEffect(() => {
		map.flyTo([lat, lng], zoom, {
			animate: true,
			duration: 1,
		});

		const cancelFly = () => {
			onComplete();
		};

		map.on("dragstart", cancelFly);
		map.on("zoomstart", cancelFly);

		return () => {
			map.off("dragstart", cancelFly);
			map.off("zoomstart", cancelFly);
		};
	}, [lat, lng, zoom, map, onComplete]);

	return null;
}
