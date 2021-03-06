import { useFetcher } from "@remix-run/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "~/lib/store";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { set as setTheme } from "~/lib/store/theme-slice";

type AsideThemeProps = {
	className?: string;
};
export const AsideTheme: React.FC<AsideThemeProps> = ({ className = "" }) => {
	const dispatch = useDispatch();
	const fetcher = useFetcher();
	const theme = useSelector((state: RootState) => state.theme);
	const onClick = () => {
		fetcher.submit(null, { method: "post", action: "/api/theme" });
	};

	useEffect(() => {
		if (fetcher.data?.theme) dispatch(setTheme(fetcher.data?.theme));
	}, [fetcher]);

	return (
		<div
			className={`w-[calc(100%-50px)] grid grid-cols-[repeat(3,max-content)] gap-6 place-content-center place-self-center bg-grey-100 dark:bg-grey-600 rounded-[6px] py-[14px] ${className}`}
		>
			<img src="/sun.svg" alt="light theme" />
			<button
				onClick={onClick}
				className={`w-10 hover:bg-purple-300 transition-colors h-5 px-[3px] relative rounded-full bg-purple-600`}
			>
				{theme && (
					<motion.div
						transition={{ ease: "easeInOut", duration: 0.15 }}
						initial={{
							scale: 0,
							y: "-50%",
						}}
						animate={{
							scale: 1,
							x: theme === "light" ? "0px" : "20px",
							y: "-50%",
						}}
						className={`w-[14px] h-[14px] rounded-full bg-white absolute top-1/2 transform -translate-x-1/2 -translate-y-1/2`}
					></motion.div>
				)}
			</button>
			<img src="/moon.svg" alt="dark theme" />
		</div>
	);
};
