import Hours, { HourProps } from "./navbar/Hours";
import Crowdness from "./navbar/Crowdness";
import SearchBar from "./navbar/searchbar/SearchBar";
import SignIn from "./SignIn";

interface NavbarProps {
	onSignIn: () => void;
	onToggle: (visible: boolean) => void;
	onDataChange: (data: HourProps[]) => void;
}

export default function Navbar({ onSignIn, onToggle, onDataChange }: NavbarProps) {
	return (
		<nav>
			<SearchBar />
			<Hours onToggle={onToggle} onDataChange={onDataChange} />
			<Crowdness />
			<SignIn onClick={onSignIn} />
		</nav>
	);
}
