"use client";
import React from "react";
import {
	X,
	Compass,
	Clock,
	Calendar,
	Phone,
	Settings,
	MessageSquareWarning,
} from "lucide-react";
import { useSidebar } from "../context/SidebarContext";
import ExploreSidebar from "./sidebars/ExploreSidebar";
import ReportSidebar from "./sidebars/ReportSidebar";
import RecentSidebar from "./sidebars/RecentSidebar";
import EventSidebar from "./sidebars/EventSidebar";
import BuildingsSidebar from "./sidebars/BuildingsSidebar";
import TransportationsSidebar from "./sidebars/TransportationsSidebar";
import SidebarTemplate from "./SidebarTemplate";
import DiningSidebar from "./sidebars/DiningSidebar";
import AcademicSidebar from "./sidebars/AcademicSidebar";

interface NavItemProps {
	icon: React.ReactNode;
	label: string;
	onClick: () => void;
}

type SidebarProps = {
	onSelectBuilding: (buildingName: string) => void;
};

function NavItem({ icon, label, onClick }: NavItemProps) {
	return (
		<li
			className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-blue-100 hover:text-blue-800 transition-colors duration-200 ease-in-out"
			onClick={onClick}
		>
			{icon}
			<span className="text-md font-medium">{label}</span>
		</li>
	);
}

export default function Sidebar({ onSelectBuilding }: SidebarProps) {
	const { isOpen, activeSidebar, openSidebar, closeSidebar, goBack } = useSidebar();

	const getActiveContent = () => {
		switch (activeSidebar) {
			case "Explore":
				return <ExploreSidebar />;
			case "Report":
				return <ReportSidebar />;
			case "Recent":
				return <RecentSidebar />;
			case "Events":
				return <EventSidebar />;
			case "Buildings":
				return <BuildingsSidebar />;
			case "Transportations":
				return <TransportationsSidebar />;
			case "Dining":
				return <DiningSidebar />;
			case "Academic":
				return <AcademicSidebar onSelectBuilding={onSelectBuilding} />;
			default:
				return null;
		}
	};

	return (
		<aside
			className={`
				fixed top-0 left-0 h-full bg-gradient-to-br from-gray-50 to-white
				shadow-xl border-r border-gray-200 z-[1000]
				transform transition-transform duration-350 flex flex-col
				${isOpen ? "translate-x-0 w-70" : "-translate-x-full w-70"}
			`}
			style={{
				borderTopRightRadius: "1rem",
				borderBottomRightRadius: "1rem",
			}}
		>
			{activeSidebar ? (
				<SidebarTemplate
					title="WayPoint"
					activeItem={activeSidebar}
					onBack={goBack}
					onClose={closeSidebar}
				>
					{getActiveContent()}
				</SidebarTemplate>
			) : (
				<>
					<div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
						<h1 className="text-xl font-bold text-gray-800">WayPoint</h1>
						<X size={20} className="text-black cursor-pointer" onClick={closeSidebar} />
					</div>
					<nav className="flex-1 overflow-y-auto mt-2">
						<ul className="text-gray-700">
						<NavItem icon={<Compass size={20} />} label="Explore" onClick={() => openSidebar("Explore")} />
						<NavItem icon={<MessageSquareWarning size={20} />} label="Report" onClick={() => openSidebar("Report")} />
						<NavItem icon={<Clock size={20} />} label="Recent" onClick={() => openSidebar("Recent")} />
						<NavItem icon={<Calendar size={20} />} label="Events" onClick={() => openSidebar("Events")} />
						<hr className="my-3 border-gray-200" />
						<NavItem icon={<Phone size={20} />} label="Contact" onClick={() => console.log("Contact clicked")} />
						<NavItem icon={<Settings size={20} />} label="Settings" onClick={() => console.log("Settings clicked")} />
						</ul>
					</nav>
					<div
						className="p-3 text-center text-xs text-gray-400 border-t border-gray-200 bg-gray-50"
						style={{ borderBottomRightRadius: "1rem" }}
					>
						© 2025 WayPoint
					</div>
				</>
			)}
		</aside>
	);
}
