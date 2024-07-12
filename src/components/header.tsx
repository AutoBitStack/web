import { GitHubLogoIcon } from "@radix-ui/react-icons";
import CustomConnectButton from "./connect-button";

const Header = () => {
	return (
		<div className="flex items-center justify-end sm:justify-between h-20">
			<div className="hidden sm:block">AutoBitStack</div>
			<div className="flex items-center gap-4 justify-center">
				<CustomConnectButton />
				<GitHubLogoIcon className="h-6 w-6" />
			</div>
		</div>
	);
};

export default Header;
