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
import { handleInputCurrency, listSupportedTokens } from "@/lib/utils";
import { useMemo, useState } from "react";
import type { Token } from "@/types";
import { useAccount, useChainId } from "wagmi";
import DialogReviewSwap from "./components/dialog-reviewswap";

const DCAPage = () => {
	const [amount, setAmount] = useState<string>("");
	const [token, setSelectedToken] = useState<Token>(
		listSupportedTokens.ethereum[1],
	);
	const [btcAddress, setBtcAddress] = useState("");
	const [frequency, setFrequency] = useState(0);
	const [totalFrequency, setTotalFrequency] = useState("5");

	const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
		setAmount(handleInputCurrency(e) ?? "");
	};

	const { isConnected, chainId: connectedChainId } = useAccount();
	const chainId = useChainId();

	const errorWallet = useMemo(() => {
		if (!isConnected) return { isError: true, message: "Wallet not connected" };
		if (chainId !== connectedChainId)
			return { isError: true, message: "Unsupoorted network" };
		return { isError: false, message: "Review order" };
	}, [chainId, isConnected, connectedChainId]);

	const isSubmitable = useMemo(() => {
		return (
			!!amount && !!btcAddress && Number(amount || 0) >= token.minimumAmount
		);
	}, [amount, btcAddress, token.minimumAmount]);

	return (
		<div className="flex flex-col justify-center h-full gap-6 w-full max-w-[600px] mx-auto">
			<Menus activeMenu="dca" />
			<Card className="w-full p-4">
				<TitleCard />
				<div className="my-4 space-y-1">
					<SelectToken
						value={amount}
						handleChange={handleChangeAmount}
						selectedToken={token}
						setSelectedToken={setSelectedToken}
					/>
					<SeparatorInput />
					<InputBTCWallet wallet={btcAddress} setWallet={setBtcAddress} />
				</div>
				<div className="my-4 flex flex-col gap-4">
					<SelectFrequency frequency={frequency} setFrequency={setFrequency} />
					<InputTotalFrequency
						total={totalFrequency}
						setTotal={setTotalFrequency}
					/>
					<Separator />
					<SummaryDCA
						frequency={frequency}
						amountPerSwap={amount}
						limit={totalFrequency}
						token={token}
					/>
				</div>
				<DialogReviewSwap
					amount={amount}
					btcAddress={btcAddress}
					frequency={frequency}
					limit={totalFrequency}
					token={token}
				>
					<Button
						variant="default"
						className="w-full"
						disabled={errorWallet.isError || !isSubmitable}
					>
						{errorWallet.message}
					</Button>
				</DialogReviewSwap>
			</Card>
		</div>
	);
};

export default DCAPage;
