import { Link } from "@remix-run/react";
import { useDispatch, useSelector } from "react-redux";
import { toggle as toggleDashboardAside } from "~/lib/dashboard-aside-slice";
import { RootState } from "~/lib/store";
import Fluent_board from "../icon/fluent_board";
import Logo from "../icon/logo";
import { AsideNavLink } from "./aside-nav-link";
import { AsideTheme } from "./aside-theme";

export const Aside: React.FC = () => {
  const isDashboardOpen = useSelector(
    (state: RootState) => state.dashboardAside
  );
  const dispatch = useDispatch();
  const onToggleSideBar = () => {
    dispatch(toggleDashboardAside());
  };

  return isDashboardOpen ? (
    <aside className="w-full h-full grid grid-rows-[max-content,1fr,repeat(2,max-content)] py-8 bg-white dark:bg-grey-500 border-r border-r-grey-200 dark:border-r-grey-400">
      <Link to="/" className="text-grey-700 dark:text-white ml-[34px]">
        <Logo />
      </Link>

      <nav className="mt-[54px] flex flex-col">
        <h2 className="text-grey-300 uppercase ml-8 tracking-[2.4px] mb-5 text-heading-s">
          All boards (*)
        </h2>
        <AsideNavLink href="/">Platform Launch</AsideNavLink>
        <AsideNavLink href="/">Marketing Plan</AsideNavLink>
        <AsideNavLink href="/">Roadmap</AsideNavLink>
        <button className="text-left flex gap-4 items-center pl-8 py-[15px] text-heading-m text-purple-600">
          <Fluent_board />+ Create New Board
        </button>
      </nav>

      <AsideTheme />

      <button
        onClick={onToggleSideBar}
        className="text-grey-300 ml-8 mt-5 text-left flex gap-4 py-[15px] text-heading-m"
      >
        <img src="/close-eye.svg" alt="Eye shut" />
        Hide Sidebar
      </button>
    </aside>
  ) : (
    <button
      onClick={onToggleSideBar}
      className="absolute bottom-8 rounded-r-full py-[19px] pl-[18px] pr-[22px] text-white bg-purple-600"
    >
      <img src="/open-eye.svg" alt="eye open" />
    </button>
  );
};
