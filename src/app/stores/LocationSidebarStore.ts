import { create } from 'zustand';

interface LocationSidebarStoreProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    toggleIsOpen: () => void;

    selectedLocation: string | null;
    setSelectedLocation: (id: string | null) => void;
}

export const useLocationSidebarStore = create<LocationSidebarStoreProps>((set) => ({
    isOpen: false,
    setIsOpen: (isOpen: boolean) => {set({ isOpen }); console.log("works");},
    toggleIsOpen: () => set((state) => ({ isOpen: !state.isOpen })),

    selectedLocation: null,
    setSelectedLocation: (id: string | null) => set({ selectedLocation: id }),
}));