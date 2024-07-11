import SelectChain from "./select-chain";

export const SelectToken = () => {
	return (
		<div className="bg-muted p-4 rounded-lg space-y-2">
			<div className="text-xs text-muted-foreground">Sell</div>
			<div className="flex items-center">
				<div className="flex-1">
					<input
						type="text"
						className="w-full text-4xl reset-input"
						placeholder="0.02"
					/>{" "}
				</div>
				<div className="flex-none">
					<SelectChain />
				</div>
			</div>
			<div className="text-xs text-muted-foreground">Minimum 0.02 ETH</div>
		</div>
	);
};
