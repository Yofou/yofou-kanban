import { ReactElement, useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import { DropdownDialog } from "./dropdown-dialog";

type DropdownProps<T> = {
	options: T[];
	keyResolver: (value: T) => string;
	valueResolver: (value: T) => string;
	name?: string;
};

type Component = <T>(props: DropdownProps<T>) => ReactElement | null;
export const Dropdown: Component = ({
	options,
	keyResolver,
	valueResolver,
	name = "",
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const ref = useDetectClickOutside({
		onTriggered: () => {
			setIsOpen(false);
		},
	});
	const toggleOpen = () => setIsOpen(!isOpen);
	const [selectedValue, setSelectedValue] = useState(options[0]);
	const onSelectOption = (value: typeof options[number]) => () => {
		setSelectedValue(value);
		setIsOpen(false);
	};

	return (
		<>
			<input
				className="hidden"
				name={name}
				readOnly
				value={valueResolver(selectedValue)}
				type="text"
			/>
			<div ref={ref} className="w-full relative">
				<button
					type="button"
					onClick={toggleOpen}
					className={`w-full text-body-l flex justify-between items-center py-2 px-4 rounded-[4px] text-grey-700 dark:text-white border ${
						isOpen ? "border-purple-600" : "border-[#828FA3]/25"
					}`}
				>
					{keyResolver(selectedValue)}

					<img src="/chevron.svg" alt="" />
				</button>

				<DropdownDialog
					className="top-[calc(100%+5px)] absolute !w-full left-0"
					show={isOpen}
				>
					{options.map((option) => (
						<button
							type="button"
							key={keyResolver(option)}
							onClick={onSelectOption(option)}
							className="text-body-l text-left text-grey-300"
						>
							{keyResolver(option)}
						</button>
					))}
				</DropdownDialog>
			</div>
		</>
	);
};
