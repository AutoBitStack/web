import type { Token } from "@/types";
import SelectChain from "./select-chain";

export const SelectToken: React.FC<{
	value: string;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	selectedToken: Token;
	setSelectedToken: React.Dispatch<React.SetStateAction<Token>>;
}> = ({ value, handleChange, selectedToken, setSelectedToken }) => {
	return (
		<div className="bg-muted p-4 rounded-lg space-y-2">
			<div className="text-xs text-muted-foreground">Sell</div>
			<div className="flex items-center">
				<div className="flex-1">
					<input
						type="text"
						className="w-full text-4xl reset-input"
						placeholder={selectedToken.minimumAmount.toString()}
						value={value}
						onChange={handleChange}
					/>{" "}
				</div>
				<div className="flex-none">
					<SelectChain
						selectedToken={selectedToken}
						setSelectedToken={setSelectedToken}
					/>
				</div>
			</div>
			<div className="text-xs text-muted-foreground">
				Minimum {selectedToken.minimumAmount} {selectedToken.symbol}
			</div>
		</div>
	);
};
