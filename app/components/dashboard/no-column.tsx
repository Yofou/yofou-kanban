import { useState } from "react";
import { Button } from "../shared/button";
import { Modal } from "../shared/modal";
import { AddColumn } from "./add-column";

export const NoColumn: React.FC = () => {
	const [show, setShow] = useState(false);
	const toggle = () => setShow(!show);

	return (
		<>
			<section className="grid place-content-center place-items-center gap-8 grid-flow-row">
				<h2 className="text-heading-l text-grey-300">
					This board is empty. Create a new column to get started.
				</h2>
				<Button onClick={toggle} theme="primaryL">
					+ Add New Column
				</Button>
			</section>

			<Modal show={show} onClickedOutside={() => setShow(false)}>
				<AddColumn onSubmit={() => setShow(false)} />
			</Modal>
		</>
	);
};
