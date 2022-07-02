import { useSelector } from "react-redux";
import { Aside } from "~/components/dashboard/aside";
import { Nav } from "~/components/dashboard/nav";
import { NoColumn } from "~/components/dashboard/no-column";
import { RootState } from "~/lib/store";

const Dashboard: React.FC = () => {
  const isDashboardAsideOpen = useSelector(
    (state: RootState) => state.dashboardAside
  );
  return (
    <div
      className={`w-full h-full grid ${
        isDashboardAsideOpen ? "grid-cols-[300px,1fr]" : "grid-cols-1"
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
