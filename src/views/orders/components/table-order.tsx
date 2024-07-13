import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import DialogDCA from "./dialog-dca";
import DialogLimit from "./dialog-limit";
import { formatWallet } from "@/lib/utils";

export const TableOrders: React.FC<{
	loading: boolean;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	data: { isError: boolean; data: any[] };
}> = ({ data, loading }) => {
	return (
		<Table>
			<TableHeader>
				<TableRow className="bg-accent">
					<TableHead className="w-[100px]">Order ID</TableHead>
					<TableHead className="hidden sm:table-cell">Type</TableHead>
					<TableHead className="hidden sm:table-cell">Date</TableHead>
					<TableHead className="text-right hidden sm:table-cell" />
					<TableHead />
				</TableRow>
			</TableHeader>
			<TableBody className="text-xs">
				{!loading &&
					data.data.length > 0 &&
					data.data.map((item) => {
						return (
							<TableRow key={item.order_id}>
								<TableCell className="font-medium">
									{formatWallet(item.order_id)}
								</TableCell>
								<TableCell className="hidden sm:table-cell capitalize">
									{item.type_product}
								</TableCell>
								<TableCell>{item.created_at}</TableCell>
								<TableCell className="flex justify-end">
									{item.type_product === "limit" && (
										<DialogLimit
											orderId={item.order_id}
											listTx={item.hub_status}
										/>
									)}
									{item.type_product === "dca" && (
										<DialogDCA
											orderId={item.order_id}
											listTx={item.hub_status}
										/>
									)}
								</TableCell>
							</TableRow>
						);
					})}
			</TableBody>
		</Table>
	);
};

export default TableOrders;
