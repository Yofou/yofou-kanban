import { json, LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useSelector } from "react-redux";
import { Aside } from "~/components/dashboard/aside";
import { Nav } from "~/components/dashboard/nav";
import { NoColumn } from "~/components/dashboard/no-column";
import { getSession } from "~/cookies";
import { RootState } from "~/lib/store";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));

  if (!session.data) return redirect("/");
  return json({
    user: session.data.user,
  });
};

const Dashboard: React.FC = () => {
  const data = useLoaderData();

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
