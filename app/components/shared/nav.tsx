import { useFetcher } from "@remix-run/react";
import { useSelector } from "react-redux";
import { RootState } from "~/lib/store";
import Logo from "../icon/logo";

type NavProps = React.PropsWithChildren<{}>;
export const Nav: React.FC<NavProps> = ({ children }) => {
  const theme = useSelector((state: RootState) => state.theme);
  const fetcher = useFetcher();
  const switchTheme = async () => {
    fetcher.submit(null, { method: "post", action: "/api/theme" });
  };

  return (
    <nav className="bg-white gap-6 px-6 pt-[22px] pb-7 items-center dark:bg-grey-500 border-b border-grey-200 dark:border-grey-400 grid grid-cols-[repeat(2,max-content),1fr]">
      <div className="text-grey-700 dark:text-white">
        <Logo />
      </div>

      <h2 className="text-heading-xl capitalize text-grey-700 dark:text-white">
        {children}
      </h2>

      <button onClick={switchTheme} className="text-grey-300 justify-self-end">
        {theme === "light" ? (
          <img src="/moon.svg" alt="Dark theme" />
        ) : (
          <img src="/sun.svg" alt="Light Theme" />
        )}
      </button>
    </nav>
  );
};
