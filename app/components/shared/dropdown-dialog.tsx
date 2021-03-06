import { AnimatePresence, motion } from "framer-motion";

type DropdownDialogProps = React.PropsWithChildren<{
	show: boolean;
	className?: string;
}>;
export const DropdownDialog: React.FC<DropdownDialogProps> = ({
	children,
	show,
	className = "",
}) => {
	if (show === false) return <></>;
	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 1 }}
				transition={{ ease: "easeIn", duration: 0.1 }}
				className={`w-max z-10 flex flex-col gap-4 p-4 bg-white dark:bg-grey-600 rounded-[8px] ${className}`}
			>
				{children}
			</motion.div>
		</AnimatePresence>
	);
};
