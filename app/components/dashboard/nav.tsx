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
import { Modal } from "../shared/modal";
import { EditBoard } from "../shared/edit-board";
import { AddTask } from "./add-task";
import { MobileAside } from "~/components/dashboard/mobile-aside";
import { AddBoard } from "../shared/add-board";

export const Nav: React.FC = () => {
	const fetcher = useFetcher();
	const [showOptions, setShowOptions] = useState(false);
	const ref = useDetectClickOutside({
		onTriggered: () => setShowOptions(false),
	});

	const isDashboardOpen = useSelector(
		(state: RootState) => state.dashboardAside.staggered
	);

	const selectedBoard = useSelector(
		(state: RootState) => state.boards.selected
	);

	const [isMobileAsideOpen, setIsMobileAsideOpen] = useState(false);

	const [isEditBoardOpen, setIsEditBoardOpen] = useState(false);
	const closeEditBoard = () => setIsEditBoardOpen(false);

	const user = useSelector((state: RootState) => state.user);

	const [onConfirmDelete, setOnConfirmDelete] = useState(false);
	const onDeleteBoard = () => {
		if (!user?.id || !selectedBoard?.id) return;
		fetcher.submit(
			{ "user-id": `${user.id}`, "board-id": `${selectedBoard.id}` },
			{ method: "delete", action: "/api/boards" }
		);
	};

	const [isAddingTask, setIsAddingTask] = useState(false);
	const [isCreateBoardOpen, setIsCreateBoardOpen] = useState(false);
	const onCreateBoard = () => setIsCreateBoardOpen(!isCreateBoardOpen);

	const onSignOut = () => {
		fetcher.submit(null, { method: "delete", action: "/api/session" });
	};

	return (
		<>
			<motion.nav
				transition={{ ease: "easeInOut", duration: 0 }}
				className={`items-center grid bg-white dark:bg-grey-500 border-b w-full border-grey-200 relative dark:border-grey-400 ${
					!isDashboardOpen
						? "grid-cols-[max-content,1fr,repeat(2,max-content)]"
						: "grid-cols-[max-content,1fr,repeat(2,max-content)] sm:grid-cols-[1fr,repeat(2,max-content)]"
				}  gap-4 sm:gap-6 px-6 pt-[22px] pb-7`}
				aria-label={`${
					(selectedBoard?.title ?? "") +
					(selectedBoard?.title?.toLowerCase()?.includes("board")
						? ""
						: " board")
				} navigaton`}
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
								className="hidden sm:block text-grey-700 dark:text-white"
							>
								<Logo />
							</motion.div>
						)}

						<img className="w-6 h-6 block sm:hidden" src="/logo.svg" alt="" />

						<motion.h2
							transition={{
								easings: "ease-in-out",
								duration: 0.15,
							}}
							layout
							className="text-heading-xl hidden sm:block text-grey-700 dark:text-white"
						>
							{selectedBoard?.title ?? "Select a board"}
						</motion.h2>

						<button
							onClick={() => setIsMobileAsideOpen(!isMobileAsideOpen)}
							className="sm:hidden flex gap-2 text-heading-l text-grey-700 dark:text-white"
						>
							{selectedBoard?.title ?? "Please Select a board"}
							<img
								className={`transition-transform ${
									isMobileAsideOpen ? "-rotate-180" : "rotate-0"
								}`}
								src="/chevron.svg"
								alt=""
							/>
						</button>

						{selectedBoard && (
							<Button
								className="grid px-[18px] py-[10px] sm:px-6 sm:py-4 place-content-center sm:block"
								onClick={() => setIsAddingTask(true)}
								theme="primaryL"
							>
								<p className="hidden sm:contents">+ Add New Task</p>
								<img className="inline sm:hidden" src="/+.svg" alt="" />
							</Button>
						)}

						<div
							ref={ref}
							aria-expanded={showOptions}
							className="relative grid place-content-center"
						>
							<motion.button
								onClick={() => setShowOptions(!showOptions)}
								className="px-2"
							>
								<img src="/options.svg" alt="" />
							</motion.button>

							<DropdownDialog
								className="absolute text-body-l text-grey-300 top-full right-full"
								show={showOptions}
							>
								{selectedBoard && (
									<button
										onClick={() => setIsEditBoardOpen(true)}
										className="text-left focus:outline-none border-b border-b-[transparent] focus:border-purple-600"
									>
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

			<Modal show={isEditBoardOpen} onClickedOutside={closeEditBoard}>
				<EditBoard onModalClose={closeEditBoard} />
			</Modal>

			<MobileAside
				isOpen={isMobileAsideOpen}
				setIsOpen={setIsMobileAsideOpen}
				onCreateBoard={onCreateBoard}
			/>

			<Modal
				show={isCreateBoardOpen}
				onClickedOutside={() => setIsCreateBoardOpen(false)}
			>
				<AddBoard onModalClose={() => setIsCreateBoardOpen(false)} />
			</Modal>

			<AddTask show={isAddingTask} setShow={setIsAddingTask} />

			<ConfirmDelete
				title="Delete this board?"
				show={onConfirmDelete}
				setShow={setOnConfirmDelete}
				onDelete={onDeleteBoard}
			>
				Are you sure you want to delete the ‘Platform Launch’ board? This action
				will remove all columns and tasks and cannot be reversed.
			</ConfirmDelete>
		</>
	);
};
