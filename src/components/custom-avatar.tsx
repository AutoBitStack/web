import type { AvatarComponent } from "@rainbow-me/rainbowkit";
import { blo } from "blo";

export const CustomAvatar: AvatarComponent = ({ address, size }) => {
	return (
		<img
			src={blo(address as `0x${string}`)}
			width={size}
			height={size}
			style={{ borderRadius: 999 }}
            alt="avatar-wallet"
		/>
	);
};

export default CustomAvatar;