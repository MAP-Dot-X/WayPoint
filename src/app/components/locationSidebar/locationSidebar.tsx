import { useLocationSidebarStore } from "@/app/stores/LocationSidebarStore";
import { useEffect, useState } from "react";
import { getLocationAction } from "./locationActions";
import { ChevronsRight } from "lucide-react";

export default function LocationSidebar() {
    const { isOpen, setIsOpen, selectedLocation } = useLocationSidebarStore();
    const [locationData, setLocationData] = useState<{
        name: string;
        latitude: number;
        longitude: number;
    } | null>(null);
    const [loadingLocation, setLoadingLocation] = useState(false);

    useEffect(() => {
        const fetchLocation = async () => {
            setLoadingLocation(true);
            if (selectedLocation) {
                const location = await getLocationAction(selectedLocation);
                setLocationData(location);
            }
            setLoadingLocation(false);
        };
        
        fetchLocation();
    }, [selectedLocation])
    
    return (
        <div className={`absolute top-0 right-0 h-full w-100 bg-white text-black shadow-lg z-1000
        ${isOpen ? "translate-x-0" : "translate-x-full"} duration-200`}>
            {locationData && !loadingLocation && (
                <div className="p-4">
                    <button onClick={() => setIsOpen(false)} className="text-gray-600 hover:text-gray-800">
                        <ChevronsRight className="w-5 h-5 cursor-pointer" />
                    </button>
                    <h2 className="text-lg font-bold mb-2">{locationData.name}</h2>
                    <p className="mb-2">Latitude: {locationData.latitude}</p>
                    <p className="mb-2">Longitude: {locationData.longitude}</p>
                </div>
            )}
            {loadingLocation && (
                <div className="p-4">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
                </div>
            )}
        </div>
    )
}