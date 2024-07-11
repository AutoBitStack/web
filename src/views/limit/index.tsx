import InputBTCWallet from "@/components/input-btc-wallet";
import { Menus } from "@/components/menus";
import { SelectToken } from "@/components/select-token";
import SeparatorInput from "@/components/separator-input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import TitleCard from "./components/title-card";
import InputBTCPrice from "./components/input-btc-price";
import SummaryLimit from "./components/summary-limit";

const LimitPage = () => {
	return (
		<div className="flex flex-col justify-center h-full gap-6 w-full max-w-[600px] mx-auto">
			<Menus activeMenu="limit" />
			<Card className="w-full p-4">
				<TitleCard />
				<div className="my-4 space-y-1">
					<SelectToken />
					<SeparatorInput />
					<InputBTCPrice />
					<SeparatorInput />
					<InputBTCWallet />
				</div>
				<SummaryLimit />
				<Button variant="default" className="w-full">
					Connect Wallet
				</Button>
			</Card>
		</div>
	);
};

export default LimitPage;
