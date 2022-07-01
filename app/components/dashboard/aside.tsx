import { Link } from "@remix-run/react";
import Fluent_board from "../icon/fluent_board";
import Logo from "../icon/logo";
import { AsideNavLink } from "./aside-nav-link";

export const Aside: React.FC = () => {
  return (
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
    </aside>
  );
};
