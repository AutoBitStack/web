import InputBTCWallet from "@/components/input-btc-wallet";
import { Menus } from "@/components/menus";
import { SelectToken } from "@/components/select-token";
import SeparatorInput from "@/components/separator-input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import TitleCard from "./components/title-card";
import InputBTCPrice from "./components/input-btc-price";
import SummaryLimit from "./components/summary-limit";
import { useMemo, useState } from "react";
import type { Token } from "@/types";
import {
	handleInputCurrency,
	listSupportedTokens,
	validatePrice,
} from "@/lib/utils";
import { useAccount, useChainId } from "wagmi";
import DialogReviewLimit from "./components/dialog-create-limit";

const LimitPage = () => {
	const [amount, setAmount] = useState<string>("");
	const [token, setSelectedToken] = useState<Token>(
		listSupportedTokens.ethereum[1],
	);
	const [btcAddress, setBtcAddress] = useState("");

	const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
		setAmount(handleInputCurrency(e) ?? "");
	};

	const [price, setPrice] = useState("");
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPrice(validatePrice(e.target.value) ?? "");
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
			!!amount &&
			!!btcAddress &&
			Number(amount || 0) >= token.minimumAmount &&
			!!price
		);
	}, [amount, btcAddress, token.minimumAmount, price]);

	return (
		<div className="flex flex-col justify-center h-full gap-6 w-full max-w-[600px] mx-auto">
			<Menus activeMenu="limit" />
			<Card className="w-full p-4">
				<TitleCard />
				<div className="my-4 space-y-1">
					<SelectToken
						handleChange={handleChangeAmount}
						selectedToken={token}
						setSelectedToken={setSelectedToken}
						value={amount}
					/>
					<SeparatorInput />
					<InputBTCPrice price={price} handleChange={handleChange} />
					<SeparatorInput />
					<InputBTCWallet setWallet={setBtcAddress} wallet={btcAddress} />
				</div>
				<SummaryLimit amount={amount} priceTarget={price} token={token} />
				<DialogReviewLimit
					amount={amount}
					btcAddress={btcAddress}
					priceTarget={price}
					token={token}
				>
					<Button
						variant="default"
						className="w-full"
						disabled={errorWallet.isError || !isSubmitable}
					>
						{errorWallet.message}
					</Button>
				</DialogReviewLimit>
			</Card>
		</div>
	);
};

export default LimitPage;
