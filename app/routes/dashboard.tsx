import { Aside } from "~/components/dashboard/aside";
import { Nav } from "~/components/dashboard/nav";
import { NoColumn } from "~/components/dashboard/no-column";

const Dashboard: React.FC = () => {
  return (
    <div className="w-full h-full grid grid-cols-[300px,1fr]">
      <Aside />
      <main className="grid grid-rows-[max-content,1fr]">
        <Nav />
        <NoColumn />
      </main>
    </div>
  );
};

export default Dashboard;
