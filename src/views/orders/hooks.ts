import { createClientSupabase, HUB_CONTRACT } from "@/lib/utils";
import { useReadContract } from "wagmi";
import abi from "@/lib/abi.json";
export const useDetailOrder = () => {
	const getDcaOrder = (orderId: string) =>
		useReadContract({
			abi: abi,
			address: HUB_CONTRACT,
			functionName: "dcaOrders",
			args: [orderId],
		});

	const getLimitOrder = (orderId: string) =>
		useReadContract({
			abi: abi,
			address: HUB_CONTRACT,
			functionName: "limitOrders",
			args: [orderId],
		});

	const getAllData = async (address: string) => {
		const { error, data } = await createClientSupabase
			.from("hub_main")
			.select("*, hub_status (tx_hash)")
			.eq("user", address);
		if (error) return { isError: true, data: [] };
		return { isError: false, data: data };
	};

	return {
		getAllData,
		getDcaOrder,
		getLimitOrder,
	};
};
