import { json, LoaderFunction, redirect } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { LayoutGroup } from "framer-motion";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Aside } from "~/components/dashboard/aside";
import { Nav } from "~/components/dashboard/nav";
import { getSession } from "~/cookies";
import { getAllBoardTasks } from "~/lib/service/board.serivce";
import { RootState } from "~/lib/store";
import { set as setBoards } from "~/lib/store/boards-slice";
import { set as setUser } from "~/lib/store/user-slice";

export const loader: LoaderFunction = async ({ request }) => {
	const session = await getSession(request.headers.get("Cookie"));
	if (session.id?.length === 0) return redirect("/");

	const boards = await getAllBoardTasks(session.data.user.id);
	return json({
		user: session.data.user,
		boards,
	});
};

const Dashboard: React.FC = () => {
	const dispatch = useDispatch();
	const data = useLoaderData();

	useEffect(() => {
		dispatch(setUser(data.user));
		dispatch(setBoards(data.boards));
	}, [data]);

	const isDashboardAsideOpen = useSelector(
		(state: RootState) => state.dashboardAside.staggered
	);
	return (
		<div
			className={`w-full h-full grid ${
				isDashboardAsideOpen
					? "grid-cols-[max-content,calc(100vw-300px)]"
					: "grid-cols-1"
			}`}
		>
			<Aside />
			<main className="w-full grid grid-rows-[max-content,1fr]">
				<LayoutGroup>
					<Nav />
					<Outlet />
				</LayoutGroup>
			</main>
		</div>
	);
};

export default Dashboard;
