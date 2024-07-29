import type { Chains, SupportedTokens, Token } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { zeroAddress } from "viem";
import { createClient } from "@supabase/supabase-js";

export const HUB_CONTRACT = "0x6a40a5BC13E374b0Ae02fFF6A672138c695C7e66";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const listSupportedTokens: SupportedTokens = {
	ethereum: [
		{
			name: "Ethereum",
			symbol: "ETH",
			contractAddress: zeroAddress,
			icon: "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/icon/eth.svg",
			minimumAmount: 0.02,
			decimals: 18,
		},
		{
			name: "USD Coin",
			symbol: "USDC",
			contractAddress: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
			icon: "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/icon/usdc.svg",
			minimumAmount: 50,
			decimals: 6,
		},
		{
			name: "Chainflip",
			symbol: "Flip",
			contractAddress: "0xdC27c60956cB065D19F08bb69a707E37b36d8086",
			icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/13268.png",
			minimumAmount: 50,
			decimals: 18,
		},
	],
	arbitrum: [
		{
			name: "Ethereum",
			symbol: "ETH",
			contractAddress: zeroAddress,
			icon: "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/icon/eth.svg",
			minimumAmount: 0,
			decimals: 18,
		},
		{
			name: "USD Coin",
			symbol: "USDC",
			contractAddress: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
			icon: "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/icon/usdc.svg",
			minimumAmount: 0,
			decimals: 6,
		},
	],
	polkadot: [
		{
			name: "Polkadot",
			symbol: "DOT",
			contractAddress: "",
			icon: "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/icon/dot.svg",
			minimumAmount: 0,
			decimals: 18,
		},
	],
};

interface IMappedByToken {
	[key: string]: Token;
}

export const mappedByToken: IMappedByToken = {
	"0x0000000000000000000000000000000000000000": {
		name: "Ethereum",
		symbol: "ETH",
		contractAddress: zeroAddress,
		icon: "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/icon/eth.svg",
		minimumAmount: 0.02,
		decimals: 18,
	},
	"0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238": {
		name: "USD Coin",
		symbol: "USDC",
		contractAddress: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
		icon: "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/icon/usdc.svg",
		minimumAmount: 50,
		decimals: 6,
	},
	"0xdC27c60956cB065D19F08bb69a707E37b36d8086": {
		name: "Chainflip",
		symbol: "Flip",
		contractAddress: "0xdC27c60956cB065D19F08bb69a707E37b36d8086",
		icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/13268.png",
		minimumAmount: 50,
		decimals: 18,
	},
};

export const listChains: Chains[] = Object.keys(
	listSupportedTokens,
) as Chains[];

export const handleInputCurrency = (e: React.ChangeEvent<HTMLInputElement>) => {
	const inputValue = e.target.value;
	const regex = /^[0-9]\d*\.?\d*$/;
	if (inputValue === "" || regex.test(inputValue)) {
		return inputValue;
	}
	return null;
};

export const validatePositiveInteger = (
	inputValue: string,
	maxValue = Number.MAX_SAFE_INTEGER,
) => {
	const trimmedValue = inputValue.replace(/^0+/, "");
	const regex = /^[1-9]\d*$/;

	if (
		trimmedValue === "" ||
		(regex.test(trimmedValue) && Number(trimmedValue) <= maxValue)
	) {
		return trimmedValue;
	}
	return null;
};

export const validatePrice = (
	inputValue: string,
	maxDecimals = 4,
	maxValue = Number.MAX_SAFE_INTEGER,
): string | null => {
	// If the input starts with a dot, return null
	if (inputValue.startsWith(".")) {
		return null;
	}

	// Remove any non-digit and non-dot characters
	const cleanedValue = inputValue.replace(/[^\d.]/g, "");

	// Split into integer and decimal parts
	const [integerPart, decimalPart] = cleanedValue.split(".");

	// Limit decimal part to maxDecimals
	const limitedDecimalPart = decimalPart
		? decimalPart.slice(0, maxDecimals)
		: "";

	// Reconstruct the value
	let result = integerPart;
	if (decimalPart !== undefined) {
		result += `.${limitedDecimalPart}`;
	}

	// Ensure the value doesn't exceed maxValue
	const numValue = Number.parseFloat(result);
	if (Number.isNaN(numValue) || numValue > maxValue) {
		return null;
	}

	return result || null;
};

export const listFrequencies = ["Days", "Weeks", "Months"];

export const createClientSupabase = createClient(
	import.meta.env.VITE_SUPABASE_URL as string,
	import.meta.env.VITE_SUPABASE_ANON_KEY as string,
);

export const formatWallet = (value: string, start = 5, last = -5) =>
	`${value.slice(0, start)}...${value.slice(last)}`;
