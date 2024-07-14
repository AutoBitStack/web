import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import type { Token } from "@/types";
import { useLimit } from "../hooks";
import { useAccount, useWaitForTransactionReceipt } from "wagmi";
import { useEffect, useMemo, useState } from "react";
import { zeroAddress } from "viem";
import { toast } from "sonner";
import ToastTransaction from "@/components/toast-transaction";
import Spinner from "@/components/spinner";

const DialogReviewLimit: React.FC<{
	children: React.ReactNode;
	amount: string;
	token: Token;
	priceTarget: string;
	btcAddress: string;
}> = ({ children, amount, priceTarget, token, btcAddress }) => {
	const [open, setOpen] = useState(false);
	const { address } = useAccount();
	const {
		checkAllowance,
		hashApprove,
		isPendingApproval,
		hashLimit,
		isPendingLimit,
		errorLimit,
		errorApproval,
		writeContractApprove,
		writecontractLimit,
	} = useLimit(token.contractAddress, address ?? "");

	useEffect(() => {
		if (errorLimit) {
			toast.error(errorLimit.message);
		}
	}, [errorLimit]);

	useEffect(() => {
		if (errorApproval) {
			toast.error(errorApproval.message);
		}
	}, [errorApproval]);

	const { isLoading: isConfirmingApprove, isSuccess: isConfirmed } =
		useWaitForTransactionReceipt({
			hash: hashApprove,
		});
	const { isLoading: isConfirmingDca, isSuccess: isConfirmedDca } =
		useWaitForTransactionReceipt({
			hash: hashLimit,
		});

	useEffect(() => {
		if (hashApprove && isConfirmed) {
			toast(
				<ToastTransaction
					link={`https://sepolia.etherscan.io/tx/${hashApprove}`}
				/>,
			);
			checkAllowance.refetch();
		}
	}, [hashApprove, isConfirmed, checkAllowance.refetch]);

	useEffect(() => {
		if (hashLimit && isConfirmedDca) {
			toast(
				<ToastTransaction
					link={`https://sepolia.etherscan.io/tx/${hashLimit}`}
				/>,
			);
			checkAllowance.refetch();
			setOpen(false);
		}
	}, [hashLimit, isConfirmedDca, checkAllowance.refetch]);

	const isApprove = useMemo(() => {
		checkAllowance.refetch();
		if (token.contractAddress === zeroAddress) return true;
		if (!(!!(checkAllowance.data as bigint) && !!amount)) return false;
		return (
			BigInt(checkAllowance.data as string) >=
			BigInt(Number(amount) * 10 ** token.decimals)
		);
	}, [
		checkAllowance.data,
		amount,
		token.decimals,
		token.contractAddress,
		checkAllowance.refetch,
	]);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Limit Order {String(isApprove)}</DialogTitle>
					<DialogDescription>
						This is the detail of your Limit Order
					</DialogDescription>
				</DialogHeader>
				<Card>
					<CardContent>
						<div className="mt-4 space-y-2">
							<div className="flex items-center justify-between">
								<div className="text-muted-foreground text-sm">Sell Amount</div>
								<div className="text-sm flex items-center gap-1">
									<div>{amount}</div>
								</div>
							</div>
							<div className="flex items-center justify-between">
								<div className="text-muted-foreground text-sm">Sell Token</div>
								<div className="flex items-center gap-1">
									<div className="text-sm">{token.symbol}</div>
									<img
										src={token.icon}
										alt=""
										className="w-4 h-4 rounded-full"
									/>
								</div>
							</div>
							<div className="flex items-center justify-between">
								<div className="text-muted-foreground text-sm">
									Price Target
								</div>
								<div className="text-sm">{priceTarget}</div>
							</div>
							<div className="flex items-center justify-between">
								<div className="text-muted-foreground text-sm">
									Bitcoin Address
								</div>
								<div className="text-sm">{btcAddress}</div>
							</div>
							<Separator />
							<div className="flex items-center justify-between">
								<div className="text-muted-foreground text-base font-bold">
									Total
								</div>
								<div className="text-base font-bold">
									{Number(amount)} {token.symbol}
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
				<DialogFooter>
					<div className="grid grid-cols-2 gap-2">
						<Button
							variant="default"
							type="button"
							onClick={() =>
								writeContractApprove(
									BigInt(Number(amount) * 10 ** token.decimals),
								)
							}
							disabled={isApprove || isPendingApproval || isConfirmingApprove}
							className="flex items-center gap-1"
						>
							{(isPendingApproval || isConfirmingApprove) && <Spinner />}
							<div>Approve token</div>
						</Button>
						<Button
							variant="default"
							type="button"
							disabled={!isApprove || isConfirmingDca || isPendingLimit}
							onClick={() =>
								writecontractLimit(
									BigInt(Number(amount) * 10 ** token.decimals),
									btcAddress,
									BigInt(Number(priceTarget) * 10 ** 4).toString(),
								)
							}
							className="flex items-center gap-1"
						>
							{(isPendingLimit || isConfirmingDca) && <Spinner />}
							<div>Submit order</div>
						</Button>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default DialogReviewLimit;
