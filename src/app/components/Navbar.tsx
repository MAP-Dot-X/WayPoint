import BuildingAvailability from "./BuildingAvailability";
import Crowdness from "./Crowdness";
import SearchBar from "./SearchBar";
import SignIn from "./SignIn";

interface NavbarProps {
  onSignIn: () => void;
}

export default function Navbar({ onSignIn }: NavbarProps) {
  return (
    <nav>
        <SearchBar />
        <BuildingAvailability />
        <Crowdness />
        <SignIn onClick={onSignIn} />
    </nav>
  );
}
