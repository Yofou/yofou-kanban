import { useSelector } from "react-redux";
import { RootState } from "~/lib/store";
import { Button } from "../shared/button";
import { motion } from "framer-motion";
import Logo from "../icon/logo";

export const Nav: React.FC = () => {
  const isDashboardOpen = useSelector(
    (state: RootState) => state.dashboardAside
  );
  return (
    // TODO: make aria-label more informant later on?
    <motion.nav
      transition={{ ease: "easeInOut", duration: 0.15 }}
      layout
      className={`bg-white items-center dark:bg-grey-500 border-b border-grey-200 dark:border-grey-400 grid ${
        !isDashboardOpen
          ? "grid-cols-[max-content,1fr,repeat(2,max-content)]"
          : "grid-cols-[1fr,repeat(2,max-content)]"
      }  gap-6 px-6 pt-[22px] pb-7`}
      aria-label="Add Task navigaton"
    >
      {!isDashboardOpen && (
        <motion.div
          transition={{ ease: "easeInOut", duration: 0.15 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          layout
          className="text-grey-700 dark:text-white"
        >
          <Logo />
        </motion.div>
      )}
      <motion.h2
        layout
        className="text-heading-xl text-grey-700 dark:text-white"
      >
        Platform Launch
      </motion.h2>
      <Button theme="primaryL">+ Add New Task</Button>
      <motion.button layout className="px-2">
        <img src="/options.svg" alt="" />
      </motion.button>
    </motion.nav>
  );
};
