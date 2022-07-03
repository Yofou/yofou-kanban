import { Dispatch } from "react";
import { Button } from "./button";
import { Modal } from "./modal";

type ConfirmDeleteProps = React.PropsWithChildren<{
	title: string;
	show?: boolean;
	setShow: Dispatch<boolean>;
	onDelete: () => void;
}>;
export const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({
	show = false,
	setShow,
	title,
	children,
	onDelete,
}) => {
	const onCancel = () => setShow(false);
	const onDestruct = () => {
		onDelete();
		onCancel();
	};

	return (
		<Modal
			className="flex flex-col gap-6"
			show={show}
			onClickedOutside={onCancel}
		>
			<h2 className="text-heading-l text-red-600">{title}</h2>
			<p className="text-body-l text-grey-300">{children}</p>

			<div className="grid gap-4 grid-cols-2">
				<Button onClick={onDestruct} theme="desctructive">
					Delete
				</Button>
				<Button onClick={onCancel} theme="secondary">
					Cancel
				</Button>
			</div>
		</Modal>
	);
};
