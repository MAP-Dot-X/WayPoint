import { Wrench, Anvil, Zap, Computer } from "lucide-react";
import SubSidebar from "./Sidebar";

type Props = {
	onSelectBuilding: (buildingName: string) => void;
};

const academicIcons = {
	Wrench,
	Anvil,
	Zap,
	Computer,
};

export default function AcademicSidebar({ onSelectBuilding }: Props) {
	return (
		<SubSidebar
		sidebarType="Academic"
		onSelectBuilding={onSelectBuilding}
		icons={academicIcons}
		/>
	);
}
