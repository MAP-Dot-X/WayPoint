"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface SidebarContextProps {
	isOpen: boolean;
	activeSidebar: string | null;
	previousSidebar: string | null;
	openSidebar: (sidebar: string) => void;
	closeSidebar: () => void;
	setActiveSidebar: (sidebar: string | null) => void;
	goBack: () => void;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [activeSidebar, setActiveSidebarState] = useState<string | null>(null);
	const [previousSidebar, setPreviousSidebar] = useState<string | null>(null);

	const openSidebar = (sidebar: string) => {
		if (sidebar !== activeSidebar) {
			setPreviousSidebar(activeSidebar);
			setActiveSidebarState(sidebar);
		}
		setIsOpen(true);
	};

	const closeSidebar = () => {
		setIsOpen(false);
		setActiveSidebarState(null);
		setPreviousSidebar(null);
	};

	const setActiveSidebar = (sidebar: string | null) => {
		if (sidebar !== activeSidebar) {
			setPreviousSidebar(activeSidebar);
			setActiveSidebarState(sidebar);
		}
	};

	const goBack = () => {
		setActiveSidebarState(previousSidebar);
		setPreviousSidebar(null);
	};
	
	return (
		<SidebarContext.Provider
			value={{
				isOpen,
				activeSidebar,
				previousSidebar,
				openSidebar,
				closeSidebar,
				setActiveSidebar,
				goBack,
			}}
		>
			{children}
		</SidebarContext.Provider>
	);
};

export const useSidebar = () => {
	const context = useContext(SidebarContext);
	if (!context) {
		throw new Error("useSidebar must be used within a SidebarProvider");
	}
	return context;
};
