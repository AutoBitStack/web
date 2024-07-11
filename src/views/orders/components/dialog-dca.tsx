import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
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

const DialogDCA = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="link" className="text-xs h-6">
					Detail
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>DCA Orders</DialogTitle>
					<DialogDescription>
						This is the detail of your DCA Order
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
						<div className="mt-4 space-y-2">
							<div className="flex items-center justify-between">
								<div className="text-muted-foreground text-sm">Sell Amount</div>
								<div className="text-sm flex items-center gap-1">
									<div>0.2</div>
									<img
										src="https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/icon/eth.svg"
										alt=""
										className="w-4 h-4 rounded-full"
									/>
								</div>
							</div>
							<div className="flex items-center justify-between">
								<div className="text-muted-foreground text-sm">
									Remaining Amount
								</div>
								<div className="text-sm flex items-center gap-1">
									<div>0.13</div>
									<img
										src="https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/icon/eth.svg"
										alt=""
										className="w-4 h-4 rounded-full"
									/>
								</div>
							</div>
							<div className="flex items-center justify-between">
								<div className="text-muted-foreground text-sm">Frequency</div>
								<div className="text-sm">Weeks</div>
							</div>
							<div className="flex items-center justify-between">
								<div className="text-muted-foreground text-sm">
									Remaining Total Frequency
								</div>
								<div className="text-sm">10</div>
							</div>
						</div>
						<Accordion type="single" collapsible>
							<AccordionItem value="item-1">
								<AccordionTrigger>Transaction history</AccordionTrigger>
								<AccordionContent>
									<div className="">
										<div className="flex items-center justify-between">
											<div className="text-muted-foreground text-sm">
												Period #1
											</div>
											<Button variant="link">
                                                1672571-Ethereum-22
                                            </Button>
										</div>
                                        <div className="flex items-center justify-between">
											<div className="text-muted-foreground text-sm">
												Period #2
											</div>
											<Button variant="link">
                                                1672571-Ethereum-22
                                            </Button>
										</div>
                                        <div className="flex items-center justify-between">
											<div className="text-muted-foreground text-sm">
												Period #3
											</div>
											<Button variant="link">
                                                1672571-Ethereum-22
                                            </Button>
										</div>
									</div>
								</AccordionContent>
							</AccordionItem>
						</Accordion>
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

export default DialogDCA;
