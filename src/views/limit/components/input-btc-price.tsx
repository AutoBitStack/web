const InputBTCPrice: React.FC<{
	price: string;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ price, handleChange }) => {
	return (
		<div className="bg-muted p-4 rounded-lg space-y-2">
			<div className="text-xs text-muted-foreground">When BTC Price at</div>
			<div className="flex items-center">
				<div className="flex-1">
					<input
						type="text"
						className="w-full text-4xl reset-input"
						placeholder="55000.00"
						value={price}
						onChange={handleChange}
					/>{" "}
				</div>
			</div>
			<div className="text-xs text-muted-foreground">
				Buying BTC on Bitcoin Network
			</div>
		</div>
	);
};

export default InputBTCPrice;
