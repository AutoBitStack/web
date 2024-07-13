import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "./ui/button";
export const CustomConnectButton = () => {
	return (
		<ConnectButton.Custom>
			{({
				account,
				chain,
				openAccountModal,
				openChainModal,
				openConnectModal,
				mounted,
			}) => {
				const ready = mounted;
				const connected = ready && account && chain;
				return (
					<div
						{...(!ready && {
							"aria-hidden": true,
							style: {
								opacity: 0,
								pointerEvents: "none",
								userSelect: "none",
							},
						})}
					>
						{(() => {
							if (!connected) {
								return (
									<Button
										onClick={openConnectModal}
										type="button"
										variant="default"
									>
										Connect Wallet
									</Button>
								);
							}
							if (chain.unsupported) {
								return (
									<Button
										variant="destructive"
										onClick={openChainModal}
										type="button"
									>
										Wrong network
									</Button>
								);
							}
							return (
								<div style={{ display: "flex", gap: 12 }}>
									<Button
										variant="outline"
										onClick={openChainModal}
										style={{ display: "flex", alignItems: "center" }}
										type="button"
									>
										{chain.hasIcon && (
											<div
												style={{
													background: chain.iconBackground,
													width: 12,
													height: 12,
													borderRadius: 999,
													overflow: "hidden",
													marginRight: 4,
												}}
											>
												{chain.iconUrl && (
													<img
														alt={chain.name ?? "Chain icon"}
														src={chain.iconUrl}
														style={{ width: 12, height: 12 }}
													/>
												)}
											</div>
										)}
										{chain.name}
									</Button>
									<Button
										variant="outline"
										onClick={openAccountModal}
										type="button"
									>
										{account.displayName}
										{account.displayBalance
											? ` (${account.displayBalance})`
											: ""}
									</Button>
								</div>
							);
						})()}
					</div>
				);
			}}
		</ConnectButton.Custom>
	);
};

export default CustomConnectButton;