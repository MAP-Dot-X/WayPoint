"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Search, Menu, Loader2, X, MapPin } from "lucide-react";
import { useSidebar } from "../../../context/SidebarContext";
import { queryEmbeddingAction } from "./SearchActions";
import { useLocationSidebarStore } from "@/app/stores/LocationSidebarStore";

const SearchBar = () => {
	const [query, setQuery] = useState("");
	const [isActive, setIsActive] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const { openSidebar } = useSidebar();
	const [queryDocuments, setQueryDocuments] = useState<any[]>([]);
	const [debouncedQuery, setDebouncedQuery] = useState("");

	// Debounce search query to avoid excessive API calls
	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedQuery(query);
		}, 300); // .5s second delay

		return () => clearTimeout(timer);
	}, [query]);

	// Handle search when debounced query changes
	useEffect(() => {
		if (!debouncedQuery || debouncedQuery.trim() === '') {
			setQueryDocuments([]);
			return;
		}

		const performSearch = async () => {
			setIsLoading(true);
			try {
				const documents = await queryEmbeddingAction(debouncedQuery);
				setQueryDocuments(documents);
				console.log("Documents:", documents);
			} catch (error) {
				console.error("Error:", error);
			} finally {
				setIsLoading(false);
			}
		};

		performSearch();
	}, [debouncedQuery]);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value);
	};

	const clearSearch = () => {
		setQuery("");
		setQueryDocuments([]);
	};

	return (
		<div className="w-100 absolute top-3 left-3 z-[1000]">
			<form
				onSubmit={handleSubmit}
				className={`flex items-center px-3 py-2 rounded-full border transition-all duration-200 bg-white shadow-lg ${
				isActive ? "border-blue-500 ring-2 ring-blue-300" : "border-gray-300"
				}`}
			>
				<Menu
					size={20}
					className="mr-3 text-gray-600 cursor-pointer hover:text-blue-600"
					onClick={() => {
						openSidebar("");
					}}
				/>
				<div className="relative flex-1 flex items-center">
					<input
						type="text"
						placeholder="Search location..."
						value={query}
						onChange={handleQueryChange}
						onFocus={() => setIsActive(true)}
						onBlur={() => setIsActive(false)}
						className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-500"
					/>
					{isLoading && (
						<Loader2 size={18} className="animate-spin text-blue-500 absolute right-0" />
					)}
					{query && !isLoading && (
						<X 
							size={18} 
							className="text-gray-500 hover:text-gray-700 cursor-pointer absolute right-0"
							onClick={clearSearch}
						/>
					)}
				</div>
				<button
					type="submit"
					className="ml-2 p-1.5 text-gray-600 hover:text-blue-600 focus:outline-none transition-colors"
					disabled={isLoading}
				>
					<Search size={20} />
				</button>
			</form>
			
			{queryDocuments.length > 0 && (
				<div className="absolute top-12 left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-[300px] overflow-y-auto">
					<ul className="py-1">
						{queryDocuments.map((doc) => (
							<QueryItem key={doc.id} doc={doc} />
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

function QueryItem({ doc }: { doc: any }) {
	const {setSelectedLocation, setIsOpen} = useLocationSidebarStore();
	return (
		<li 
			onClick={() => {
				setSelectedLocation(doc.id);
				setIsOpen(true);
			}}
			key={doc.id}
			className="px-4 py-2 hover:bg-gray-100 text-gray-800 cursor-pointer flex items-center"
		>
			<div className="flex-1 flex items-center gap-2">
				<MapPin />
				<div className="font-medium">{doc.name}</div>
			</div>
		</li>
	)
}

export default SearchBar;
