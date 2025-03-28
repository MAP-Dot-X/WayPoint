"use client";
import { User } from "lucide-react";

interface SignInProps {
	onClick: () => void;
}

const SignIn = ({ onClick }: SignInProps) => {
	return (
		<button
			onClick={onClick}
			className="flex items-center bg-blue-400 text-white px-2 py-2 rounded-full hover:bg-blue-500 transition duration-300 absolute top-3 right-3 z-[1000]"
		>
			<User size={20} className="mr-2" />
			Sign In
		</button>
	);
};

export default SignIn;
