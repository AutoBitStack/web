import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	ArrowDownIcon,
	ArrowUpRightIcon,
	BitcoinIcon,
	MinusIcon,
	PlusIcon,
} from "lucide-react";
import { listSupportedTokens, listChains } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const DCAPage = () => {
	return (
		<div className="flex flex-col justify-center h-full gap-6 w-full max-w-[600px] mx-auto">
			<div className="flex items-center gap-2">
				<Button variant="ghost" className="rounded-full w-24">
					Swap <ArrowUpRightIcon className="w-4 h-4" />
				</Button>
				<Button variant="secondary" className="rounded-full w-24">
					DCA
				</Button>
				<Button variant="ghost" className="rounded-full w-24">
					Limit
				</Button>
				<Button variant="ghost" className="rounded-full w-24">
					Orders
				</Button>
			</div>
			<Card className="w-full p-4">
				<div className="text-xl font-semibold">DCA</div>
				<div className="text-muted-foreground text-sm">
					Steady Bitcoin Accumulation on Autopilot
				</div>
				<div className="my-4 space-y-1">
					<div className="bg-muted p-4 rounded-lg space-y-2">
						<div className="text-xs text-muted-foreground">Sell</div>
						<div className="flex items-center">
							<div className="flex-1">
								<input
									type="text"
									className="w-full text-4xl reset-input"
									placeholder="0.02"
								/>{" "}
							</div>
							<div className="flex-none">
								<SelectChain />
							</div>
						</div>
						<div className="text-xs text-muted-foreground">
							Minimum 0.02 ETH
						</div>
					</div>
					<div className="relative">
						<span className="absolute p-2 bg-muted border-[3px] border-background rounded-lg left-1/2 -translate-x-1/2 -top-6">
							<ArrowDownIcon className="h-4 w-4" />
						</span>
					</div>
					<div className="bg-muted p-4 rounded-lg space-y-2">
						<div className="text-xs text-muted-foreground">Buy</div>
						<div className="flex items-center">
							<div className="flex-1">
								<input
									type="text"
									className="w-full text-4xl reset-input"
									placeholder="-"
									disabled
								/>{" "}
							</div>
							<div className="flex-none">
								<SelectChain />
							</div>
						</div>
						<div className="text-xs text-muted-foreground">
							Buying BTC on Bitcoin Network
						</div>
					</div>
				</div>
				<div className="my-4 flex flex-col gap-4">
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
					<div className="flex items-center justify-between">
						<div className="text-sm">Total Frequency</div>
						<div className="flex items-center gap-1">
							<div className="flex items-center h-6">
								<div className="border rounded-l-lg text-sm p-2">
									<MinusIcon className="w-3 h-3" />
								</div>
								<div className="w-[40px] border-y py-0.5">
									<input
										type="text"
										className="reset-input w-full text-center text-sm"
										placeholder="10"
									/>
								</div>
								<div className="border rounded-r-lg text-sm p-2">
									<PlusIcon className="w-3 h-3" />
								</div>
							</div>
						</div>
					</div>
					<Separator />
					<div className="space-y-2">
						<div className="flex items-center justify-between">
							<div className="text-sm text-muted-foreground">
								Amount Per swap
							</div>
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
							<div className="text-sm text-muted-foreground font-bold">
								Total
							</div>
							<div className="font-bold">0.2 ETH</div>
						</div>
					</div>
				</div>
				<Button variant="default" className="w-full">
					Connect Wallet
				</Button>
			</Card>
		</div>
	);
};

const SelectChain = () => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					className="flex items-center gap-1 rounded-full"
				>
					<BitcoinIcon className="w-4 h-4" /> Bitcoin
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="center">
				{listChains.map((item) => {
					return (
						<>
							<DropdownMenuLabel key={item} className="capitalize">
								{item}
							</DropdownMenuLabel>
							<DropdownMenuSeparator key={`${item}separator`} />
							{listSupportedTokens[item]?.map((x) => {
								return (
									<DropdownMenuItem
										key={x.contractAddress}
										disabled={item === "arbitrum"}
									>
										<div className="w-full flex items-center gap-2">
											<img
												src={x.icon}
												alt={x.name}
												className="w-4 h-4 rounded-full"
											/>
											<div className="text-sm">{x.symbol}</div>
										</div>
									</DropdownMenuItem>
								);
							})}
						</>
					);
				})}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
export default DCAPage;
