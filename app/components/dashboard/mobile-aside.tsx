import { Dispatch, useRef } from "react";
import { useSelector } from "react-redux";
import { useDetectClickOutside } from "~/lib/clickoutide";
import { RootState } from "~/lib/store";
import Fluent_board from "../icon/fluent_board";
import { AsideNavLink } from "./aside-nav-link";
import { AsideTheme } from "./aside-theme";
import { AnimatePresence, motion } from "framer-motion";

type MobileAsideProps = {
	isOpen: boolean;
	setIsOpen: Dispatch<boolean>;
	onCreateBoard: () => void;
};
export const MobileAside: React.FC<MobileAsideProps> = ({
	isOpen,
	setIsOpen,
	onCreateBoard,
}) => {
	const boards = useSelector((state: RootState) => state.boards.boards);
	const selectedBoard = useSelector(
		(state: RootState) => state.boards.selected
	);
	const ref = useRef(null);
	const clickOutside = useDetectClickOutside({
		ref,
		onTriggered: () => setIsOpen(false),
		disableClick: !isOpen,
	});

	return (
		<AnimatePresence exitBeforeEnter>
			{isOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="hidden fixed z-20 w-screen min-h-screen bg-grey-700/50"
				>
					<div ref={clickOutside} className="w-full h-full relative">
						<div className="text-white p-4 shadow-task-shadow bg-white dark:bg-grey-500 rounded-[8px] max-w-[264px] w-full absolute top-20 left-1/2 -translate-x-1/2">
							<div className="-mx-4 mb-4">
								<h2 className="ml-6 mb-5 text-body-m text-grey-300 uppercase tracking-[2.4px]">
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
									onClick={() => {
										setIsOpen(false);
										onCreateBoard();
									}}
									className="text-left whitespace-nowrap flex gap-4 items-center pl-8 py-[15px] text-heading-m text-purple-600 hover:text-purple-300 transition-colors"
								>
									<Fluent_board />+ Create New Board
								</button>
							</div>
							<AsideTheme className="!w-full" />
						</div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};
