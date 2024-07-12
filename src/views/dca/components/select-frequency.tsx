import { Button } from "@/components/ui/button";

const SelectFrequency: React.FC<{
	frequency: number;
	setFrequency: React.Dispatch<React.SetStateAction<number>>;
}> = ({ frequency, setFrequency }) => {
	return (
		<div className="flex items-center justify-between">
			<div className="text-sm">Frequency</div>
			<div className="flex items-center gap-1">
				<Button
					variant={frequency === 0 ? "secondary" : "ghost"}
					className="text-xs h-6"
					onClick={() => setFrequency(0)}
				>
					Days
				</Button>
				<Button
					variant={frequency === 1 ? "secondary" : "ghost"}
					className="text-xs h-6"
					onClick={() => setFrequency(1)}
				>
					Weeks
				</Button>
				<Button
					variant={frequency === 2 ? "secondary" : "ghost"}
					className="text-xs h-6"
					onClick={() => setFrequency(2)}
				>
					Months
				</Button>
			</div>
		</div>
	);
};

export default SelectFrequency;
