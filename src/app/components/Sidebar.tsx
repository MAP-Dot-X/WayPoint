"use client";
import { useSidebar } from "../context/SidebarContext";
import { X, Compass, Clock, Calendar, Phone, Settings, MessageSquareWarning } from "lucide-react";

export default function Sidebar() {
	const { isOpen, toggleSidebar } = useSidebar();

	return (
		<div
			className={`fixed top-0 left-0 h-full bg-white shadow-lg transition-all duration-300 z-[1000] ${
				isOpen ? "w-64" : "hidden"
			} overflow-hidden border-r border-gray-300`}
		>
			<div className="flex items-center justify-between p-4 border-b text-black">
				<h2 className="text-lg font-bold">WayPoint</h2>
				<button
					onClick={toggleSidebar}
					className="p-2 rounded-full bg-white text-black hover:bg-gray-100 transition"
					aria-label="Close sidebar"
				>
					<X size={20} />
				</button>
			</div>

			<div className="p-4 text-black">
				<ul>
					<li className="py-2 flex items-center hover:bg-blue-100 cursor-pointer p-2 transition-all duration-200">
						<Compass size={20} className="mr-3" />
						Explore
					</li>
					<li className="py-2 flex items-center hover:bg-blue-100 cursor-pointer p-2 transition-all duration-200">
						<MessageSquareWarning size={20} className="mr-3" />
						Report
					</li>
					<li className="py-2 flex items-center hover:bg-blue-100 cursor-pointer p-2 transition-all duration-200">
						<Clock size={20} className="mr-3" />
						Recent
					</li>
					<li className="py-2 flex items-center hover:bg-blue-100 cursor-pointer p-2 transition-all duration-200">
						<Calendar size={20} className="mr-3" />
						Events
					</li>
					<hr className="my-2 border-t border-gray-300" />
					<li className="py-2 flex items-center hover:bg-blue-100 cursor-pointer p-2 transition-all duration-200">
						<Phone size={20} className="mr-3" />
						Contact
					</li>
					<li className="py-2 flex items-center hover:bg-blue-100 cursor-pointer p-2 transition-all duration-200">
						<Settings size={20} className="mr-3" />
						Settings
					</li>
				</ul>
			</div>
		</div>
	);
}
