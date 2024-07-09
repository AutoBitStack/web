// src/route/router.tsx

import { Navigate, createBrowserRouter } from "react-router-dom";
import Layout from "@/components/layout";
import ErrorPage from "@/components/error-page";
import DCAPage from "@/views/dca";
import LimitPage from "@/views/limit";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <Navigate to="dca" replace />,
			},
			{
				path: "dca",
				element: <DCAPage />,
			},
			{
				path: "limt",
				element: <LimitPage />,
			},
		],
	},
]);

export default router;
