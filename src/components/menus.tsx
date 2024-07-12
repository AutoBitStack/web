import { ArrowUpRightIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const Menus: React.FC<{ activeMenu: string }> = ({
	activeMenu = "dca",
}) => {
	return (
		<div className="flex items-center gap-2">
			<a
				href="https://swap.perseverance.chainflip.io/"
				target="_blank"
				rel="noopener noreferrer"
				className="hidden sm:block"
			>
				<Button variant="ghost" className="rounded-full w-24">
					Swap <ArrowUpRightIcon className="w-4 h-4" />
				</Button>
			</a>
			<Link to="/dca">
				<Button
					variant={activeMenu === "dca" ? "secondary" : "ghost"}
					className="rounded-full w-24"
				>
					DCA
				</Button>
			</Link>
			<Link to="/limit">
				<Button
					variant={activeMenu === "limit" ? "secondary" : "ghost"}
					className="rounded-full w-24"
				>
					Limit
				</Button>
			</Link>
			<Link to="/orders">
				<Button
					variant={activeMenu === "orders" ? "secondary" : "ghost"}
					className="rounded-full w-24"
				>
					Orders
				</Button>
			</Link>
		</div>
	);
};
