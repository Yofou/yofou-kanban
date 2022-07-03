import { json, LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Aside } from "~/components/dashboard/aside";
import { Nav } from "~/components/dashboard/nav";
import { Modal } from "~/components/shared/modal";
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
  const [showModal, setShowModal] = useState(true);

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
        <Modal show={showModal} onClickedOutside={() => setShowModal(false)}>
          <p>Hello</p>
        </Modal>
      </main>
    </div>
  );
};

export default Dashboard;
