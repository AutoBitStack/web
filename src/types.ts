export type Chains = "ethereum" | "arbitrum" | "polkadot";

export interface Token {
	name: string;
	symbol: string;
	contractAddress: string;
	icon: string;
	minimumAmount: number;
	decimals: number;
}

export type SupportedTokens = {
	[key in Chains]: Token[];
};
