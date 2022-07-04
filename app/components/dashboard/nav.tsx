import { useSelector } from "react-redux";
import { RootState } from "~/lib/store";
import { Button } from "../shared/button";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "../icon/logo";
import { DropdownDialog } from "../shared/dropdown-dialog";
import { useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import { useFetcher } from "@remix-run/react";
import { ConfirmDelete } from "~/components/shared/confirm-delete";

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

	const [onConfirmDelete, setOnConfirmDelete] = useState(false);
	const onDeleteBoard = () => {
		if (!user?.id || !selectedBoard?.id) return;
		fetcher.submit(
			{ "user-id": `${user.id}`, "board-id": `${selectedBoard.id}` },
			{ method: "delete", action: "/api/boards" }
		);
	};

	const onSignOut = () => {
		fetcher.submit(null, { method: "delete", action: "/api/session" });
	};

	// TODO: make aria-label more informant later on?
	return (
		<div className="bg-white dark:bg-grey-500 border-b border-grey-200 relative dark:border-grey-400 ">
			<motion.nav
				transition={{ ease: "easeInOut", duration: 0.15 }}
				layout
				className={`bg-white items-center dark:bg-grey-500 sticky top-0 grid ${
					!isDashboardOpen
						? "grid-cols-[max-content,1fr,repeat(2,max-content)] w-screen left-0"
						: "grid-cols-[1fr,repeat(2,max-content)] w-[calc(100vw-300px)] left-[300px]"
				}  gap-6 px-6 pt-[22px] pb-7`}
				aria-label="Add Task navigaton"
			>
				<AnimatePresence exitBeforeEnter>
					<>
						{!isDashboardOpen && (
							<motion.div
								transition={{
									ease: "easeInOut",
									duration: 0.15,
								}}
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
							transition={{
								easings: "ease-in-out",
								duration: 0.15,
							}}
							layout
							className="text-heading-xl text-grey-700 dark:text-white"
						>
							{selectedBoard?.title ?? "Select a board"}
						</motion.h2>

						{selectedBoard && <Button theme="primaryL">+ Add New Task</Button>}

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
								{selectedBoard && (
									<button className="text-left focus:outline-none border-b border-b-[transparent] focus:border-purple-600">
										Edit Board
									</button>
								)}
								{selectedBoard && (
									<button
										onClick={() => setOnConfirmDelete(true)}
										className="text-red-600 text-left focus:outline-none border-b border-b-[transparent] focus:border-red-600"
									>
										Delete Board
									</button>
								)}
								<button
									onClick={onSignOut}
									className="text-red-600 text-left focus:outline-none border-b border-b-[transparent] focus:border-red-600"
								>
									Sign out
								</button>
							</DropdownDialog>
						</div>
					</>
				</AnimatePresence>
			</motion.nav>

			<ConfirmDelete
				title="Delete this board?"
				show={onConfirmDelete}
				setShow={setOnConfirmDelete}
				onDelete={onDeleteBoard}
			>
				Are you sure you want to delete the ‘Platform Launch’ board? This action
				will remove all columns and tasks and cannot be reversed.
			</ConfirmDelete>
		</div>
	);
};
