import { useState } from "react";

type InputProps = React.PropsWithChildren<{
	type?: React.HTMLInputTypeAttribute;
	autoFocus?: boolean;
	required?: boolean;
	defaultValue?: string;
	error?: string;
	name?: string;
	className?: string;
	labelClassName?: string;
}>;
export const Input: React.FC<InputProps> = ({
	children,
	type = "text",
	autoFocus = false,
	required = false,
	defaultValue = "",
	error,
	name,
	labelClassName = "",
	className = "",
}) => {
	const [value, setValue] = useState(defaultValue);
	const showError = error && (defaultValue === value || value.length === 0);

	return (
		<label
			className={`text-body-m flex flex-col gap-2 w-full text-grey-400 dark:text-white ${labelClassName}`}
		>
			{children} {showError && `- ${error}`}
			<input
				className={`px-4 py-2 text-body-l rounded-[4px] ${
					showError ? "border-red-600" : "border-[#828FA3]/25"
				} outline-none focus:outline-none focus:border-purple-600 bg-[transparent] border ${className}`}
				type={type}
				name={name ?? children?.toString()}
				autoFocus={autoFocus}
				required={required}
				value={value}
				onChange={(el) => setValue(el.target.value)}
			/>
		</label>
	);
};
