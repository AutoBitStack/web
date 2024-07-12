import { validatePositiveInteger } from "@/lib/utils";
import { MinusIcon, PlusIcon } from "lucide-react";

const InputTotalFrequency: React.FC<{
	setTotal: React.Dispatch<React.SetStateAction<string>>;
	total: string;
}> = ({ total, setTotal }) => {
	const decreaseNumber = () => {
		const newValue = validatePositiveInteger(total);
		if (newValue && newValue !== "1")
			setTotal((Number(newValue) - 1).toString());
	};
	const increaseNumber = () => {
		const newValue = validatePositiveInteger(total);
		if (newValue) setTotal((Number(newValue) + 1).toString());
		else setTotal("1");
	};
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = validatePositiveInteger(e.target.value);
		if (newValue) setTotal(newValue);
	};
	return (
		<div className="flex items-center justify-between">
			<div className="text-sm">Total Frequency</div>
			<div className="flex items-center gap-1">
				<div className="flex items-center h-6">
					<button
						className="border rounded-l-lg text-sm p-2"
						type="button"
						onClick={() => decreaseNumber()}
					>
						<MinusIcon className="w-3 h-3" />
					</button>
					<div className="w-[40px] border-y py-0.5">
						<input
							type="text"
							className="reset-input w-full text-center text-sm"
							placeholder="10"
							value={total}
							onChange={handleChange}
							disabled
						/>
					</div>
					<button
						className="border rounded-r-lg text-sm p-2"
						type="button"
						onClick={() => increaseNumber()}
					>
						<PlusIcon className="w-3 h-3" />
					</button>
				</div>
			</div>
		</div>
	);
};

export default InputTotalFrequency;
