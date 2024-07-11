import { Menus } from "@/components/menus";
import { Card } from "@/components/ui/card";
import TitleCard from "./components/title-card";
import TableOrders from "./components/table-order";

export const Orders = () => {
	return (
		<div className="flex flex-col justify-center h-full gap-6 w-full max-w-[600px] mx-auto">
			<Menus activeMenu="orders" />
			<Card className="w-full p-4">
				<TitleCard />
				<div className="mt-4">
					<TableOrders />
				</div>
			</Card>
		</div>
	);
};

export default Orders;