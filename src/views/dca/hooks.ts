import { useReadContract, useWriteContract } from "wagmi";
import erc20Abi from "@/lib/erc20-abi.json";
import hubAbi from "@/lib/abi.json";
import { HUB_CONTRACT } from "@/lib/utils";
import { zeroAddress } from "viem";

export const useDCA = (tokenAddress: string, ownerAddress: string) => {
	const {
		data: hashApprove,
		writeContract: writeApprove,
		isPending: isPendingApproval,
		error: errorApproval,
	} = useWriteContract();
	const {
		data: hashDca,
		writeContract: writeDca,
		isPending: isPendingCreateDca,
		error: errorDca,
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

	const writeContractDca = (
		amount: bigint,
		btcAddress: string,
		frequency: number,
		limit: string,
	) => {
		if (tokenAddress !== zeroAddress) {
			writeDca({
				address: HUB_CONTRACT,
				abi: hubAbi,
				functionName: "createDCAOrder",
				args: [tokenAddress, amount, btcAddress, frequency, limit],
			});
		} else {
			writeDca({
				address: HUB_CONTRACT,
				abi: hubAbi,
				functionName: "createDCAOrder",
				args: [tokenAddress, amount, btcAddress, frequency, limit],
				value: amount,
			});
		}
	};

	return {
		checkAllowance,
		hashApprove,
		hashDca,
		isPendingApproval,
		isPendingCreateDca,
		errorApproval,
		errorDca,
		writeContractApprove,
		writeContractDca,
	};
};
