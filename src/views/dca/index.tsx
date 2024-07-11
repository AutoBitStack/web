import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Menus } from "@/components/menus";
import { SelectToken } from "@/components/select-token";
import SeparatorInput from "@/components/separator-input";
import InputBTCWallet from "@/components/input-btc-wallet";
import TitleCard from "./components/title-card";
import SelectFrequency from "./components/select-frequency";
import InputTotalFrequency from "./components/input-total-frequency";
import SummaryDCA from "./components/summary-dca";

const DCAPage = () => {
	return (
		<div className="flex flex-col justify-center h-full gap-6 w-full max-w-[600px] mx-auto">
			<Menus activeMenu="dca" />
			<Card className="w-full p-4">
				<TitleCard />
				<div className="my-4 space-y-1">
					<SelectToken />
					<SeparatorInput />
					<InputBTCWallet />
				</div>
				<div className="my-4 flex flex-col gap-4">
					<SelectFrequency />
					<InputTotalFrequency />
					<Separator />
					<SummaryDCA />
				</div>
				<Button variant="default" className="w-full">
					Connect Wallet
				</Button>
			</Card>
		</div>
	);
};

export default DCAPage;
