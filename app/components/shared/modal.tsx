import { useDetectClickOutside } from "react-detect-click-outside";
import { AnimatePresence, motion } from "framer-motion";

type ModalProps = React.PropsWithChildren<{
	show: boolean;
	className?: string;
	onClickedOutside: () => void;
}>;
export const Modal: React.FC<ModalProps> = ({
	children,
	className = "",
	onClickedOutside,
	show,
}) => {
	const ref = useDetectClickOutside({
		onTriggered: (e: Event) => {
			if (e instanceof KeyboardEvent) onClickedOutside();
			if (
				e?.target instanceof HTMLImageElement ||
				e?.target instanceof HTMLButtonElement
			)
				return;

			onClickedOutside();
		},
	});

	return (
		<AnimatePresence>
			{show && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="fixed z-10 grid top-0 bg-grey-700/50 left-0 w-full h-full"
				>
					<div
						ref={ref}
						className={`place-self-center max-w-[480px] w-full rounded-[6px] p-8 bg-white dark:bg-grey-500 opacity-[calc(.5+var(--bg-opacity))] ${className}`}
					>
						{children}
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};
