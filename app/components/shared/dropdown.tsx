import { Dispatch, ReactElement, useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import { DropdownDialog } from "./dropdown-dialog";

type DropdownProps<T> = {
	options: T[];
	keyResolver: (value: T) => string;
	valueResolver: (value: T) => string;
	findCurrentValue?: (value: T) => boolean;
	bindSelected?: Dispatch<string>;
	name?: string;
};

type Component = <T>(props: DropdownProps<T>) => ReactElement | null;
export const Dropdown: Component = ({
	options,
	keyResolver,
	valueResolver,
	findCurrentValue,
	bindSelected,
	name = "",
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const ref = useDetectClickOutside({
		onTriggered: (e) => {
			e.stopPropagation();
			setIsOpen(false);
		},
	});
	const toggleOpen = () => setIsOpen(!isOpen);
	const defaultValue = findCurrentValue
		? options.find(findCurrentValue) ?? options[0]
		: options[0];
	const [selectedValue, setSelectedValue] = useState(defaultValue);
	const onSelectOption = (value: typeof options[number]) => () => {
		setSelectedValue(value);
		if (bindSelected) bindSelected(valueResolver(value));
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
			<div ref={ref} aria-expanded={isOpen} className="w-full relative">
				<button
					type="button"
					aria-live="polite"
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
