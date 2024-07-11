import { MinusIcon, PlusIcon } from "lucide-react";

const InputTotalFrequency = () => {
	return (
		<div className="flex items-center justify-between">
			<div className="text-sm">Total Frequency</div>
			<div className="flex items-center gap-1">
				<div className="flex items-center h-6">
					<div className="border rounded-l-lg text-sm p-2">
						<MinusIcon className="w-3 h-3" />
					</div>
					<div className="w-[40px] border-y py-0.5">
						<input
							type="text"
							className="reset-input w-full text-center text-sm"
							placeholder="10"
						/>
					</div>
					<div className="border rounded-r-lg text-sm p-2">
						<PlusIcon className="w-3 h-3" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default InputTotalFrequency;
