import { createClientSupabase, HUB_CONTRACT } from "@/lib/utils";
import { useReadContract, useWriteContract } from "wagmi";
import abi from "@/lib/abi.json";

export const useDetailOrder = () => {
	const {
		data: hashCancelDca,
		writeContract: writeCancelDca,
		isPending: isPendingCancelDca,
		error: errorCancelDca,
	} = useWriteContract();

	const cancelDca = (orderId: string) => {
		writeCancelDca({
			abi: abi,
			address: HUB_CONTRACT,
			functionName: "cancelDCAOrder",
			args: [orderId],
		});
	};

	const {
		data: hashCancelLimit,
		writeContract: writeCancelLimit,
		isPending: isPendingCancelLimit,
		error: errorCancelLimit,
	} = useWriteContract();

	const cancelLimit = (orderId: string) => {
		writeCancelLimit({
			abi: abi,
			address: HUB_CONTRACT,
			functionName: "cancelLimitOrder",
			args: [orderId],
		});
	};

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
		hashCancelDca,
		isPendingCancelDca,
		errorCancelDca,
		hashCancelLimit,
		isPendingCancelLimit,
		errorCancelLimit,
		cancelLimit,
		cancelDca,
		getAllData,
		getDcaOrder,
		getLimitOrder,
	};
};
