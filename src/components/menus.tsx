import { ArrowUpRightIcon } from "lucide-react";
import { Button } from "./ui/button";

export const Menus: React.FC<{ activeMenu: string }> = ({
	activeMenu = "dca",
}) => {
	return (
		<div className="flex items-center gap-2">
			<a
				href="https://swap.perseverance.chainflip.io/"
				target="_blank"
				rel="noopener noreferrer"
			>
				<Button variant="ghost" className="rounded-full w-24">
					Swap <ArrowUpRightIcon className="w-4 h-4" />
				</Button>
			</a>
			<a href="/dca">
				<Button variant={activeMenu === "dca" ? "secondary" : "ghost"} className="rounded-full w-24">
					DCA
				</Button>
			</a>
			<a href="/limit">
				<Button variant={activeMenu === "limit" ? "secondary" : "ghost"} className="rounded-full w-24">
					Limit
				</Button>
			</a>
			<a href="/orders">
				<Button variant={activeMenu === "orders" ? "secondary" : "ghost"} className="rounded-full w-24">
					Orders
				</Button>
			</a>
		</div>
	);
};
