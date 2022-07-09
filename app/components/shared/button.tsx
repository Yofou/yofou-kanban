const themeDict = {
	primaryL: "text-heading-m text-white bg-purple-600 hover:bg-purple-300 ",
	primaryS: "text-heading-s text-white bg-purple-600 hover:bg-purple-300",
	secondary:
		"text-heading-s text-purple-600 bg-purple-600/10 dark:bg-white hover:bg-purple-600/25 dark:hover:bg-white",
	desctructive: "text-heading-s bg-red-600 hover:bg-red-300 text-white",
} as const;

type ButtonProps = React.PropsWithChildren<{
	onClick?: () => void;
	theme: keyof typeof themeDict;
	className?: string;
	type?: "button" | "submit" | "reset" | undefined;
	disable?: boolean;
}>;
export const Button: React.FC<ButtonProps> = ({
	onClick,
	children,
	theme,
	className = "",
	type = "submit",
	disable = false,
}) => {
	return (
		<button
			type={type}
			className={`${themeDict[theme]} ${className} disabled:opacity-50o transition-colors px-6 py-4 rounded-[9999px]`}
			onClick={onClick}
			disabled={disable}
		>
			{children}
		</button>
	);
};
