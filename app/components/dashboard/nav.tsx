import { useSelector } from "react-redux";
import { RootState } from "~/lib/store";
import { Button } from "../shared/button";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "../icon/logo";
import { DropdownDialog } from "../shared/dropdown-dialog";
import { useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import { useFetcher } from "@remix-run/react";

export const Nav: React.FC = () => {
  const fetcher = useFetcher();
  const [showOptions, setShowOptions] = useState(false);
  const ref = useDetectClickOutside({
    onTriggered: () => setShowOptions(false),
  });

  const isDashboardOpen = useSelector(
    (state: RootState) => state.dashboardAside
  );

  const selectedBoard = useSelector(
    (state: RootState) => state.boards.selected
  );

  const user = useSelector((state: RootState) => state.user);

  const onDeleteBoard = () => {
    if (!user?.id || !selectedBoard?.id) return;
    fetcher.submit(
      { "user-id": `${user.id}`, "board-id": `${selectedBoard.id}` },
      { method: "delete", action: "/api/boards" }
    );
  };

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
      <AnimatePresence exitBeforeEnter>
        <>
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
            transition={{ easings: "ease-in-out", duration: 0.15 }}
            layout
            className="text-heading-xl text-grey-700 dark:text-white"
          >
            Platform Launch
          </motion.h2>
          <Button theme="primaryL">+ Add New Task</Button>
          <div ref={ref} className="relative">
            <motion.button
              onClick={() => setShowOptions(!showOptions)}
              layout
              className="px-2"
            >
              <img src="/options.svg" alt="" />
            </motion.button>

            <DropdownDialog
              className="absolute text-body-l text-grey-300 top-full right-full"
              show={showOptions}
            >
              <button className="text-left focus:outline-none border-b border-b-[transparent] focus:border-purple-600">
                Edit Button
              </button>
              <button
                onClick={onDeleteBoard}
                className="text-red-600 text-left focus:outline-none border-b border-b-[transparent] focus:border-red-600"
              >
                Delete Board
              </button>
              <button className="text-red-600 text-left focus:outline-none border-b border-b-[transparent] focus:border-red-600">
                Sign out
              </button>
            </DropdownDialog>
          </div>
        </>
      </AnimatePresence>
    </motion.nav>
  );
};
