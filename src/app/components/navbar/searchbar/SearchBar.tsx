"use client";
import React, { useState } from "react";
import { Search, Menu } from "lucide-react";
import { useSidebar } from "../../../context/SidebarContext";
import { queryEmbeddingAction } from "./SearchActions";

const SearchBar = () => {
	const [query, setQuery] = useState("");
	const [isActive, setIsActive] = useState(false);
	const { toggleSidebar } = useSidebar();
	const [queryDocuments, setQueryDocuments] = useState<any[]>([]);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value);
		queryEmbeddingAction(e.target.value)
			.then((documents) => {
				setQueryDocuments(documents);
				console.log("Documents:", documents);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
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
			onClick={toggleSidebar}
			/>
			<input
			type="text"
			placeholder="Search location..."
			value={query}
			onChange={handleQueryChange}
			onFocus={() => setIsActive(true)}
			onBlur={() => setIsActive(false)}
			className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-500"
			/>
			<button
			type="submit"
			className="ml-2 p-1.5 text-gray-600 hover:text-blue-600 focus:outline-none transition-colors"
			>
			<Search size={20} />
			</button>
			{
			queryDocuments.length > 0 && (
				<ul className="absolute top-12 left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-50">
				{queryDocuments.map((doc) => (
					<li key={doc.id} className="p-2 hover:bg-gray-100 text-black cursor-pointer">
					{doc.name}
					</li>
				))}
				</ul>
			)
			}
		</form>
		</div>
	);
};

export default SearchBar;
