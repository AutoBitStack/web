import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { CopyIcon } from "lucide-react";
import { useDetailOrder } from "../hooks";
import { formatWallet, mappedByToken } from "@/lib/utils";

const DialogLimit: React.FC<{
	orderId: string;
	listTx: { tx_hash: string }[];
}> = ({ orderId, listTx }) => {
	const { getLimitOrder } = useDetailOrder();
	const { data, isError, isPending } = getLimitOrder(orderId);
	console.log(data);
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="link" className="text-xs h-6">
					Detail
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Limit Orders</DialogTitle>
					<DialogDescription>
						This is the detail of your Limit Order
					</DialogDescription>
				</DialogHeader>
				<Card>
					<CardHeader className="bg-accent rounded-t-xl">
						<CardTitle>
							Order ID 0x69..294{" "}
							<Button variant="outline" size="icon" className="w-5 h-5">
								<CopyIcon className="w-3 h-3" />
							</Button>{" "}
						</CardTitle>
						<CardDescription>Date: November 23, 2023</CardDescription>
					</CardHeader>
					<CardContent>
						{!isError && !isPending && !!data && (
							<>
								<div className="mt-4 space-y-2">
									<div className="flex items-center justify-between">
										<div className="text-muted-foreground text-sm">Status</div>
										{(data as boolean[])[5] && (
											<Badge className="text-xs">ACTIVE</Badge>
										)}
										{!(data as boolean[])[5] && (
											<Badge variant="destructive" className="text-xs">
												INACTIVE
											</Badge>
										)}
									</div>
									<div className="flex items-center justify-between">
										<div className="text-muted-foreground text-sm">
											Remaining Amount
										</div>
										<div className="text-sm flex items-center gap-1">
											<div>
												{Number((data as bigint[])[3]) /
													10 ** mappedByToken[(data as string[])[2]].decimals}
											</div>
											<img
												src={mappedByToken[(data as string[])[2]].icon}
												alt=""
												className="w-4 h-4 rounded-full"
											/>
										</div>
									</div>
									<div className="flex items-center justify-between">
										<div className="text-muted-foreground text-sm">
											Price Target
										</div>
										<div className="text-sm">
											{Number((data as bigint[])[4]) / 10 ** 4}
										</div>
									</div>
									<div className="flex items-center justify-between">
										<div className="text-muted-foreground text-sm">
											Bitcoin Address
										</div>
										<div className="text-sm flex items-center gap-1">
											<div>{formatWallet((data as string[])[1])}</div>
											<Button variant="outline" size="icon" className="w-5 h-5">
												<CopyIcon className="w-3 h-3" />
											</Button>
										</div>
									</div>
								</div>
								<Accordion type="single" collapsible>
									<AccordionItem value="item-1">
										<AccordionTrigger>Transaction history</AccordionTrigger>
										<AccordionContent className="max-h-[100px] overflow-y-auto">
											<div>
												{listTx.map((x, index) => {
													return (
														<div
															className="flex items-center justify-between"
															key={`${x.tx_hash}-item`}
														>
															<div className="text-muted-foreground text-sm">
																Period #{index + 1}
															</div>
															<a
																href={`https://scan.perseverance.chainflip.io/channels/${x.tx_hash}`}
																target="_blank"
																rel="noopener noreferrer"
															>
																<Button variant="link">{x.tx_hash}</Button>
															</a>
														</div>
													);
												})}
												{listTx.length === 0 && (
													<div className="text-muted-foreground">
														No transactions
													</div>
												)}
											</div>
										</AccordionContent>
									</AccordionItem>
								</Accordion>
							</>
						)}
						{isPending && "loading..."}
						{isError &&
							!isPending &&
							"Sorry we can't get the detail of the order"}
					</CardContent>
				</Card>
				<DialogFooter>
					<Button variant="destructive" type="submit">
						Cancel order
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default DialogLimit;
