import { json, LoaderFunction, redirect } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { LayoutGroup } from "framer-motion";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Aside } from "~/components/dashboard/aside";
import { Nav } from "~/components/dashboard/nav";
import { getSession } from "~/cookies";
import { getAllBoardTasks } from "~/lib/service/board.serivce";
import { set as setBoards } from "~/lib/store/boards-slice";
import { set as setUser } from "~/lib/store/user-slice";

export const loader: LoaderFunction = async ({ request, params }) => {
	const session = await getSession(request.headers.get("Cookie"));
	if (session.id?.length === 0) return redirect("/");

	const boards = await getAllBoardTasks(session.data.user.id);
	if (!params?.id && boards.length) {
		return redirect(`/dashboard/${boards[0].id}?dashboard`);
	}

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

	return (
		<div
			className={`w-full min-h-screen h-full grid grid-cols-1 sm:grid-cols-[max-content,1fr]`}
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
