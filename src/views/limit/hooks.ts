import { useReadContract, useWriteContract } from "wagmi";
import erc20Abi from "@/lib/erc20-abi.json";
import hubAbi from "@/lib/abi.json";
import { HUB_CONTRACT } from "@/lib/utils";
import { zeroAddress } from "viem";

export const useLimit = (tokenAddress: string, ownerAddress: string) => {
	const {
		data: hashApprove,
		writeContract: writeApprove,
		isPending: isPendingApproval,
		error: errorApproval,
	} = useWriteContract();

	const {
		data: hashLimit,
		writeContract: writeLimit,
		isPending: isPendingLimit,
		error: errorLimit,
	} = useWriteContract();

	const checkAllowance = useReadContract({
		abi: erc20Abi,
		address: tokenAddress as `0x${string}`,
		functionName: "allowance",
		args: [ownerAddress, HUB_CONTRACT],
	});

	const writeContractApprove = (amount: bigint) => {
		writeApprove({
			address: tokenAddress as `0x${string}`,
			abi: erc20Abi,
			functionName: "approve",
			args: [HUB_CONTRACT, amount],
		});
	};

	const writecontractLimit = (
		amount: bigint,
		btcAddress: string,
		priceTarget: string,
	) => {
		if (tokenAddress !== zeroAddress) {
			writeLimit({
				address: HUB_CONTRACT,
				abi: hubAbi,
				functionName: "createLimitOrder",
				args: [tokenAddress, amount, btcAddress, priceTarget],
			});
		} else {
			writeLimit({
				address: HUB_CONTRACT,
				abi: hubAbi,
				functionName: "createLimitOrder",
				args: [tokenAddress, amount, btcAddress, priceTarget],
				value: amount,
			});
		}
	};

	return {
		checkAllowance,
		hashApprove,
		hashLimit,
		isPendingApproval,
		isPendingLimit,
		errorLimit,
		errorApproval,
		writeContractApprove,
		writecontractLimit,
	};
};
