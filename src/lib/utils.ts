import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { zeroAddress } from "viem";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

type Chains = "ethereum" | "arbitrum" | "polkadot";

interface Token {
	name: string;
	symbol: string;
	contractAddress: string;
	icon: string;
}

type SupportedTokens = {
	[key in Chains]?: Token[];
};

export const listSupportedTokens: SupportedTokens = {
	ethereum: [
		{
			name: "Ethereum",
			symbol: "ETH",
			contractAddress: zeroAddress,
			icon: "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/icon/eth.svg",
		},
		{
			name: "USD Coin",
			symbol: "USDC",
			contractAddress: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
			icon: "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/icon/usdc.svg",
		},
		{
			name: "Chainflip",
			symbol: "Flip",
			contractAddress: "0xdC27c60956cB065D19F08bb69a707E37b36d8086",
			icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/13268.png",
		},
	],
	arbitrum: [
		{
			name: "Ethereum",
			symbol: "ETH",
			contractAddress: zeroAddress,
			icon: "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/icon/eth.svg",
		},
		{
			name: "USD Coin",
			symbol: "USDC",
			contractAddress: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
			icon: "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/icon/usdc.svg",
		},
	],
};

export const listChains: Chains[] = Object.keys(
	listSupportedTokens,
) as Chains[];
