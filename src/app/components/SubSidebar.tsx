import NewComputerScienceBuildingSidebar from "./sidebars/NewComputerScienceBuildingSidebar";

interface SubSidebarProps {
	building: {
		name: string;
		lat: number;
		lng: number;
	} | null;
	isOpen: boolean;
	onClose: () => void;
}

export default function SubSidebar({ building, isOpen, onClose }: SubSidebarProps) {
	if (!isOpen || building?.name !== "New Computer Science Building") return null;

	return (
		<NewComputerScienceBuildingSidebar
			isOpen={isOpen}
			onClose={onClose}
			building={building}
		/>
	);
}
