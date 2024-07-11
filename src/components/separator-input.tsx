import { ArrowDownIcon } from "lucide-react";

const SeparatorInput = () => {
	return (
		<div className="relative">
			<span className="absolute p-2 bg-muted border-[3px] border-background rounded-lg left-1/2 -translate-x-1/2 -top-6">
				<ArrowDownIcon className="h-4 w-4" />
			</span>
		</div>
	);
};

export default SeparatorInput;
