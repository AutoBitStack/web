import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";

const Header = () => {
	return (
		<div className="flex items-center justify-between h-20">
			<div>AutoBitStack</div>
			<div className="flex items-center gap-4 justify-center">
				<Button variant="outline">Connect Wallet</Button>
				<GitHubLogoIcon className="h-6 w-6" />
			</div>
		</div>
	);
};

export default Header;
