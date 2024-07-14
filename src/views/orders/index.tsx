import { Menus } from "@/components/menus";
import { Card } from "@/components/ui/card";
import TitleCard from "./components/title-card";
import TableOrders from "./components/table-order";
import { useEffect, useState } from "react";
import { useDetailOrder } from "./hooks";
import { useAccount } from "wagmi";

export const Orders = () => {
	const { getAllData } = useDetailOrder();
	const [loading, setLoading] = useState(false);
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const [data, setData] = useState<{ isError: boolean; data: any[] }>({
		isError: false,
		data: [],
	});
	const { address } = useAccount();

	useEffect(() => {
		if (address) {
			getData();
		}
	}, [address]);

	const getData = async () => {
		setLoading(true);
		if (address) {
			const res = await getAllData(address);
			setData(res);
		}
		setLoading(false);
	};
	return (
		<div className="flex flex-col justify-center h-full gap-6 w-full max-w-[600px] mx-auto">
			<Menus activeMenu="orders" />
			<Card className="w-full p-4">
				<TitleCard />
				<div className="mt-4">
					<TableOrders loading={loading} data={data} />
					{(loading || data.data.length === 0) && (
						<div className="w-full h-[60px] flex items-center justify-center text-sm bg-accent text-muted-foreground">
							{loading && "Loading..."}
							{!loading &&
								data.data.length === 0 &&
								"Your transaction will appear here"}
						</div>
					)}
				</div>
			</Card>
		</div>
	);
};

export default Orders;
