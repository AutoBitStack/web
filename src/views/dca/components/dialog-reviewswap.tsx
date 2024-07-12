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
import { listFrequencies } from "@/lib/utils";
import type { Token } from "@/types";
import { useDCA } from "../hooks";
import { useAccount, useWaitForTransactionReceipt } from "wagmi";
import { useEffect, useMemo, useState } from "react";
import { zeroAddress } from "viem";
import { toast } from "sonner";
import ToastTransaction from "@/components/toast-transaction";
import Spinner from "@/components/spinner";

const DialogReviewSwap: React.FC<{
	children: React.ReactNode;
	amount: string;
	token: Token;
	limit: string;
	frequency: number;
	btcAddress: string;
}> = ({ children, amount, frequency, limit, token, btcAddress }) => {
	const [open, setOpen] = useState(false);
	const { address } = useAccount();
	const {
		checkAllowance,
		hashApprove,
		isPendingApproval,
		hashDca,
		isPendingCreateDca,
		writeContractApprove,
		writeContractDca,
	} = useDCA(token.contractAddress, address ?? "");

	const { isLoading: isConfirmingApprove, isSuccess: isConfirmed } =
		useWaitForTransactionReceipt({
			hash: hashApprove,
		});
	const { isLoading: isConfirmingDca, isSuccess: isConfirmedDca } =
		useWaitForTransactionReceipt({
			hash: hashDca,
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
		if (hashDca && isConfirmedDca) {
			toast(
				<ToastTransaction
					link={`https://sepolia.etherscan.io/tx/${hashDca}`}
				/>,
			);
			checkAllowance.refetch();
            setOpen(false);
		}
	}, [hashDca, isConfirmedDca, checkAllowance.refetch]);

	const isApprove = useMemo(() => {
		checkAllowance.refetch();
		if (token.contractAddress === zeroAddress) return true;
		if (!(!!(checkAllowance.data as bigint) && !!amount)) return false;
		return (
			BigInt(checkAllowance.data as string) >=
			BigInt(Number(amount) * Number(limit) * 10 ** token.decimals)
		);
	}, [
		checkAllowance.data,
		amount,
		limit,
		token.decimals,
		token.contractAddress,
		checkAllowance.refetch,
	]);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>DCA Orders {String(isApprove)}</DialogTitle>
					<DialogDescription>
						This is the detail of your DCA Order
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
								<div className="text-muted-foreground text-sm">Frequency</div>
								<div className="text-sm">{listFrequencies[frequency]}</div>
							</div>
							<div className="flex items-center justify-between">
								<div className="text-muted-foreground text-sm">
									Total Frequency
								</div>
								<div className="text-sm">{limit}</div>
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
									{Number(amount) * Number(limit)} {token.symbol}
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
									BigInt(Number(amount) * Number(limit) * 10 ** token.decimals),
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
							disabled={!isApprove || isConfirmingDca || isPendingCreateDca}
							onClick={() =>
								writeContractDca(
									BigInt(Number(amount) * Number(limit) * 10 ** token.decimals),
									btcAddress,
									frequency,
									limit,
								)
							}
                            className="flex items-center gap-1"
						>
							{(isPendingCreateDca || isConfirmingDca) && <Spinner />}
							<div>Submit order</div>
						</Button>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default DialogReviewSwap;
