import { Link } from "@remix-run/react";
import { useDispatch, useSelector } from "react-redux";
import {
	setStaggered as setDashboardAsideOpenStaggered,
	setValue as setDashboardAsideOpen,
} from "~/lib/store/dashboard-aside-slice";
import Fluent_board from "../icon/fluent_board";
import Logo from "../icon/logo";
import { AsideNavLink } from "./aside-nav-link";
import { AsideTheme } from "./aside-theme";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Modal } from "../shared/modal";
import { AddBoard } from "../shared/add-board";
import { RootState } from "~/lib/store";

export const Aside: React.FC = () => {
	const [isCreateBoardOpen, setIsCreateBoardOpen] = useState(false);
	const onCreateBoard = () => setIsCreateBoardOpen(!isCreateBoardOpen);
	const isOpen = useSelector((state: RootState) => state.dashboardAside.value);
	const boards = useSelector((state: RootState) => state.boards.boards);

	const dispatch = useDispatch();
	const onToggleSideBar = () => {
		dispatch(setDashboardAsideOpen(!isOpen));
	};

	const setDashboardLayout = () => {
		dispatch(setDashboardAsideOpenStaggered(isOpen));
	};

	const selectedBoard = useSelector(
		(state: RootState) => state.boards.selected
	);

	return (
		<>
			<AnimatePresence exitBeforeEnter onExitComplete={setDashboardLayout}>
				{isOpen ? (
					<motion.aside
						layout
						transition={{ ease: "easeInOut", duration: 0.15 }}
						animate={{
							width: "300px",
						}}
						exit={{
							width: "0px",
							opacity: 0,
						}}
						key="dashboard"
						className="h-full grid grid-rows-[max-content,1fr,repeat(2,max-content)] py-8 bg-white dark:bg-grey-500 border-r border-r-grey-200 overflow-hidden dark:border-r-grey-400"
					>
						<Link to="/" className="text-grey-700 dark:text-white ml-[34px]">
							<Logo />
						</Link>

						<nav className="mt-[54px] flex flex-col">
							<h2 className="text-grey-300 uppercase ml-8 tracking-[2.4px] mb-5 text-heading-s">
								All boards ({boards.length})
							</h2>

							{boards.map((board) => (
								<AsideNavLink
									isActive={selectedBoard?.id === board?.id}
									key={board.id}
									href={`/dashboard/${board.id}`}
								>
									{board.title}
								</AsideNavLink>
							))}

							<button
								onClick={onCreateBoard}
								className="text-left whitespace-nowrap flex gap-4 items-center pl-8 py-[15px] text-heading-m text-purple-600"
							>
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
					</motion.aside>
				) : (
					<motion.button
						transition={{ ease: "easeInOut", duration: 0.15 }}
						initial={{
							translateX: "-100%",
						}}
						animate={{
							translateX: "0%",
						}}
						exit={{
							translateX: "-100%",
						}}
						key="toggle"
						onClick={onToggleSideBar}
						className="absolute z-10 bottom-8 rounded-r-full py-[19px] pl-[18px] pr-[22px] text-white bg-purple-600 hover:bg-purple-300 transition-colors duration-150"
					>
						<img src="/open-eye.svg" alt="eye open" />
					</motion.button>
				)}
				;
			</AnimatePresence>

			<Modal
				show={isCreateBoardOpen}
				onClickedOutside={() => setIsCreateBoardOpen(false)}
			>
				<AddBoard onModalClose={() => setIsCreateBoardOpen(false)} />
			</Modal>
		</>
	);
};
