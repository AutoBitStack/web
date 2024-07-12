import { Separator } from "@/components/ui/separator";
import { listFrequencies } from "@/lib/utils";
import type { Token } from "@/types";
import type React from "react";

const SummaryDCA: React.FC<{
	amountPerSwap: string;
	frequency: number;
	limit: string;
	token: Token;
}> = ({ amountPerSwap, frequency, limit, token }) => {
	return (
		<div className="space-y-2">
			<div className="flex items-center justify-between">
				<div className="text-sm text-muted-foreground">Amount Per swap</div>
				<div className="text-sm">{amountPerSwap || "0"}</div>
			</div>
			<div className="flex items-center justify-between">
				<div className="text-sm text-muted-foreground">Frequency</div>
				<div className="text-sm">Every {listFrequencies[frequency]}</div>
			</div>
			<div className="flex items-center justify-between">
				<div className="text-sm text-muted-foreground">Limit</div>
				<div className="text-sm">{limit}</div>
			</div>
			<Separator />
			<div className="flex items-center justify-between">
				<div className="text-sm text-muted-foreground font-bold">Total</div>
				<div className="font-bold">
					{Number(limit) * Number(amountPerSwap ?? 1)} {token.symbol}
				</div>
			</div>
		</div>
	);
};

export default SummaryDCA;
