import { Separator } from "@/components/ui/separator";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Token } from "@/types";
import { InfoIcon } from "lucide-react";

const SummaryLimit: React.FC<{
	priceTarget: string;
	amount: string;
	token: Token;
}> = ({ priceTarget, amount, token }) => {
	return (
		<div className="mb-4 space-y-2">
			<div className="flex items-center justify-between">
				<div className="text-sm text-muted-foreground">Price Target</div>
				<div className="text-sm">{priceTarget}</div>
			</div>
			<div className="flex items-center justify-between">
				<div className="text-sm text-muted-foreground">Price Collar</div>
				<div className="text-sm flex items-center gap-1">
					<div>1%</div>
					<TooltipProvider delayDuration={100}>
						<Tooltip>
							<TooltipTrigger>
								<InfoIcon fill="black" className="w-5 h-5 stroke-white" />
							</TooltipTrigger>
							<TooltipContent>
								<div className="w-[300px]">
									A price collar sets both an upper and lower bound around a
									target price, the 1% above and below the target price creates
									a range within which the order can be executed.
								</div>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			</div>
			<div className="flex items-center justify-between">
				<div className="text-sm text-muted-foreground">Amount</div>
				<div className="text-sm">
					{amount} {token.symbol}
				</div>
			</div>
			<Separator />
			<div className="flex items-center justify-between">
				<div className="text-sm text-muted-foreground font-bold">Total</div>
				<div className="text-sm font-bold">
					{amount} {token.symbol}
				</div>
			</div>
		</div>
	);
};

export default SummaryLimit;
