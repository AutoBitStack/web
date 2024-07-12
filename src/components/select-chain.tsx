import { listChains, listSupportedTokens } from "@/lib/utils";
import { Button } from "./ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import type { Token } from "@/types";

const SelectChain: React.FC<{
	selectedToken: Token;
	setSelectedToken: React.Dispatch<React.SetStateAction<Token>>;
}> = ({ selectedToken, setSelectedToken }) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					className="flex items-center gap-1 rounded-full w-[80px]"
				>
					<img
						src={selectedToken.icon}
						alt=""
						className="w-4 h-4 rounded-full"
					/>
					<div>{selectedToken.symbol}</div>
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
										disabled={item !== "ethereum"}
										onClick={() => setSelectedToken(x)}
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

export default SelectChain;
