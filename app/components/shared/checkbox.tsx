import { useState } from "react";

type CheckBoxType = React.PropsWithChildren<{
	isChecked: boolean;
	onClick?: () => void;
}>;

export const CheckBox: React.FC<CheckBoxType> = ({
	onClick,
	children,
	isChecked,
}) => {
	const [isOn, setIsOn] = useState(isChecked);
	const handleChecked = () => {
		setIsOn(!isOn);
		if (onClick) onClick();
	};

	return (
		<button
			type="button"
			onClick={handleChecked}
			className={`grid grid-cols-[max-content,1fr] gap-4 text-body-m text-grey-700 dark:text-white p-3 bg-grey-100 dark:bg-grey-600 hover:!bg-purple-600/25 transition-colors w-full text-left items-center rounded-[4px]`}
		>
			<div
				className={`w-4 h-4 rounded-[2px] border grid place-content-center ${
					isOn
						? "bg-purple-600 border-purple-600"
						: "bg-white dark:bg-grey-500 border-[#828FA3]/25"
				} `}
			>
				{isOn && <img src="/checkmark.svg" alt="checkmark" />}
			</div>

			<span className={`${isOn ? "opacity-50 line-through" : ""}`}>
				{children}
			</span>
		</button>
	);
};
