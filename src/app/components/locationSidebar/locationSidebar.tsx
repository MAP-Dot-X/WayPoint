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
        image_link: string;
        opening: string | null;
        closing: string | null;
        day_of_week: string | null;
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
<div
  className={`
    absolute top-0 right-0 h-full max-w-[400px] w-full
    ${isOpen ? "bg-white shadow-lg text-black translate-x-0" : "pointer-events-none translate-x-full"}
    transition-transform duration-200 z-[1000]
  `}
>

            {locationData && !loadingLocation && (
                <div className="p-4">
                    <button onClick={() => setIsOpen(false)} className="text-gray-600 hover:text-gray-800">
                        <ChevronsRight className="w-5 h-5 cursor-pointer" />
                    </button>
                    <img src={locationData.image_link} alt={locationData.name} className="w-full object-cover mb-2" />
                    <h2 className="text-lg font-bold mb-2">{locationData.name}</h2>
                    <p className="mb-2">Latitude: {locationData.latitude}</p>
                    <p className="mb-2">Longitude: {locationData.longitude}</p>
                    <p className="mb-2">Opening: {locationData.opening}</p>
                    <p className="mb-2">Closing: {locationData.closing}</p>
                    <p className="mb-2">Day of Week: {locationData.day_of_week}</p>
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