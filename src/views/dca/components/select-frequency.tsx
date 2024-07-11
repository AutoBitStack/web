import { Button } from "@/components/ui/button";

const SelectFrequency = () => {
	return (
		<div className="flex items-center justify-between">
			<div className="text-sm">Frequency</div>
			<div className="flex items-center gap-1">
				<Button variant="secondary" className="text-xs h-6">
					Days
				</Button>
				<Button variant="ghost" className="text-xs h-6">
					Weeks
				</Button>
				<Button variant="ghost" className="text-xs h-6">
					Months
				</Button>
			</div>
		</div>
	);
};

export default SelectFrequency;
