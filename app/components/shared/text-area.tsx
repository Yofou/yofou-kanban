import { useState } from "react";

type TextAreaProps = React.PropsWithChildren<{
	name?: string;
	error?: string;
	defaultValue?: string;
	className?: string;
}>;

export const TextArea: React.FC<TextAreaProps> = ({
	name,
	error = "",
	defaultValue = "",
	className = "",
	children,
}) => {
	const [value, setValue] = useState(defaultValue);
	const showError = error && (defaultValue === value || value.length === 0);

	return (
		<label
			className={`flex flex-col gap-2 text-grey-300 dark:text-white text-body-m ${className}`}
		>
			{children} {showError && `- ${error}`}
			<textarea
				className={`w-full pt-2 px-4 bg-[color:transparent] outline-none focus:outline-none focus:border-purple-600 border rounded-[4px] ${
					showError ? "border-red-600" : "border-[#828FA3]/25"
				}`}
				name={name ?? children?.toString()}
				value={value}
				onChange={(el) => setValue(el.target.value)}
				rows={8}
			>
				{defaultValue}
			</textarea>
		</label>
	);
};
