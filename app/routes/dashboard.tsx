import { json, LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Aside } from "~/components/dashboard/aside";
import { Nav } from "~/components/dashboard/nav";
import { NoColumn } from "~/components/dashboard/no-column";
import { getSession } from "~/cookies";
import { getAllBoardTasks } from "~/lib/service/board.serivce";
import { RootState } from "~/lib/store";
import { set as setBoards } from "~/lib/store/boards-slice";
import { set as setUser } from "~/lib/store/user-slice";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const boards = await getAllBoardTasks();

  if (!session.data) return redirect("/");
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
  }, []);

  const isDashboardAsideOpen = useSelector(
    (state: RootState) => state.dashboardAside
  );
  return (
    <div
      className={`w-full h-full grid ${
        isDashboardAsideOpen ? "grid-cols-[max-content,1fr]" : "grid-cols-1"
      }`}
    >
      <Aside />
      <main className="grid grid-rows-[max-content,1fr]">
        <Nav />
        <NoColumn />
      </main>
    </div>
  );
};

export default Dashboard;
