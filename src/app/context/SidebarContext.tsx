"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface SidebarContextProps {
	isOpen: boolean;
	activeSidebar: string | null;
	previousSidebar: string | null;
	toggleSidebar: () => void;
	setActiveSidebar: (sidebar: string | null) => void;
	goBack: () => void;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [activeSidebar, setActiveSidebarState] = useState<string | null>(null);
	const [previousSidebar, setPreviousSidebar] = useState<string | null>(null);

	const toggleSidebar = () => {
		setIsOpen((prev) => {
			const closing = prev;
			if (closing) {
				setActiveSidebar(null);
				setPreviousSidebar(null);
			}
			return !prev;
		});
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
				toggleSidebar,
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
