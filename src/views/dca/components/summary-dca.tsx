import { Separator } from "@/components/ui/separator";

const SummaryDCA = () => {
	return (
		<div className="space-y-2">
			<div className="flex items-center justify-between">
				<div className="text-sm text-muted-foreground">Amount Per swap</div>
				<div className="text-sm">0.02</div>
			</div>
			<div className="flex items-center justify-between">
				<div className="text-sm text-muted-foreground">Frequency</div>
				<div className="text-sm">Every Weeks</div>
			</div>
			<div className="flex items-center justify-between">
				<div className="text-sm text-muted-foreground">Limit</div>
				<div className="text-sm">10</div>
			</div>
			<Separator />
			<div className="flex items-center justify-between">
				<div className="text-sm text-muted-foreground font-bold">Total</div>
				<div className="font-bold">0.2 ETH</div>
			</div>
		</div>
	);
};

export default SummaryDCA;
