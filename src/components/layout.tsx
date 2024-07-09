import { Outlet } from "react-router-dom";
import Header from "./header";

const Layout = () => {
	return (
		<div className="h-full">
			<div className="relative h-full w-full">
				<div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />{" "}
				<div className="relative mx-auto h-full w-full max-w-7xl px-6 md:px-8 lg:px-12 py-8">
					<Header />
					<main>
						<Outlet />
					</main>
				</div>
			</div>
		</div>
	);
};

export default Layout;
