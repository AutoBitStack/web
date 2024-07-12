import { CheckCircle2, ArrowUpRight } from "lucide-react";

export const ToastTransaction: React.FC<{ link: string }> = ({ link }) => {
	return (
		<div className="flex items-center gap-4">
			<CheckCircle2 className="fill-foreground stroke-background" />
			<div>
				<div className="text-sm font-medium">Transaction submitted</div>
				<a
					className="flex items-center gap-1"
					href={link}
					target="_blank"
					rel="noopener noreferrer"
				>
					<div className="text-xs underline underline-offset-2">
						View on explorer
					</div>
					<ArrowUpRight className="h-3 w-3" />
				</a>
			</div>
		</div>
	);
};

export default ToastTransaction;
