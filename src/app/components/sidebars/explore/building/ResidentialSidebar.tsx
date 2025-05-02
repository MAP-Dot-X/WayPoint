import { House, Building, Building2 } from "lucide-react";
import Sidebar from "./Sidebar";

type Props = {
	onSelectBuilding: (buildingName: string) => void;
};

const residentialIcons = {
	House,
	Building,
	Building2,
};

export default function ResidentialSidebar({ onSelectBuilding }: Props) {
	return (
		<Sidebar
		sidebarType="Residential"
		onSelectBuilding={onSelectBuilding}
		icons={residentialIcons}
		/>
	);
}
