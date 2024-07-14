import { ThemeProvider } from "@/components/theme-provider";
import { RouterProvider } from "react-router-dom";
import router from "./route/router";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { sepolia } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Toaster } from "sonner";
import CustomAvatar from "./components/custom-avatar";

const config = getDefaultConfig({
	appName: "AutoStackBit",
	projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID as string,
	chains: [sepolia],
	ssr: false,
});
const queryClient = new QueryClient();

function App() {
	return (
		<WagmiProvider config={config}>
			<QueryClientProvider client={queryClient}>
				<RainbowKitProvider avatar={CustomAvatar}>
					<ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
						<Toaster
							position="top-center"
							className="toaster group"
							toastOptions={{
								classNames: {
									toast:
										"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg group-[.toaster]:pointer-events-auto",
								},
							}}
							closeButton
						/>
						<RouterProvider router={router} />
					</ThemeProvider>
				</RainbowKitProvider>
			</QueryClientProvider>
		</WagmiProvider>
	);
}

export default App;
