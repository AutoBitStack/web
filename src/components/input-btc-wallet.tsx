const InputBTCWallet: React.FC<{
	wallet: string;
	setWallet: React.Dispatch<React.SetStateAction<string>>;
}> = ({ wallet, setWallet }) => {
	return (
		<div className="bg-muted p-4 rounded-lg space-y-2">
			<div className="text-xs text-muted-foreground">
				Your BTC Wallet Address
			</div>
			<div className="flex items-center">
				<div className="flex-1">
					<input
						type="text"
						className="w-full text-sm reset-input"
						placeholder="mt89KnwKL5w1QrZf4XoEDg4NbCDwEPCxv3"
						value={wallet}
						onChange={(e) => setWallet(e.target.value)}
					/>{" "}
				</div>
			</div>
		</div>
	);
};

export default InputBTCWallet;
