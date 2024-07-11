import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import DialogDCA from "./dialog-dca";
import DialogLimit from "./dialog-limit";

export const TableOrders = () => {
	return (
		<Table>
			<TableHeader>
				<TableRow className="bg-accent">
					<TableHead className="w-[100px]">ID</TableHead>
					<TableHead className="hidden sm:table-cell">Status</TableHead>
					<TableHead className="hidden sm:table-cell">Type</TableHead>
					<TableHead className="text-right hidden sm:table-cell">
						Amount
					</TableHead>
					<TableHead />
				</TableRow>
			</TableHeader>
			<TableBody className="text-xs">
				<TableRow>
					<TableCell className="font-medium">INV001</TableCell>
					<TableCell className="hidden sm:table-cell">
						<Badge variant="default">ACTIVE</Badge>
					</TableCell>
					<TableCell className="hidden sm:table-cell">DCA</TableCell>
					<TableCell className="text-right hidden sm:table-cell">
						$250.00
					</TableCell>
					<TableCell className="flex justify-end">
						<DialogDCA />
					</TableCell>
				</TableRow>
				<TableRow>
					<TableCell className="font-medium">INV001</TableCell>
					<TableCell className="hidden sm:table-cell">
						<Badge variant="default">ACTIVE</Badge>
					</TableCell>
					<TableCell className="hidden sm:table-cell">LIMIT</TableCell>
					<TableCell className="text-right hidden sm:table-cell">
						$250.00
					</TableCell>
					<TableCell className="flex justify-end">
						<DialogLimit />
					</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	);
};

export default TableOrders;