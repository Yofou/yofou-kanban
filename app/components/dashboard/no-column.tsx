import { useFetcher } from "@remix-run/react";
import { useState } from "react";
import { Button } from "../shared/button";
import { Input } from "../shared/input";
import { Modal } from "../shared/modal";

export const NoColumn: React.FC = () => {
	const [show, setShow] = useState(false);
	const toggle = () => setShow(!show);

	const fetcher = useFetcher();

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
				<h2 className="text-heading-l text-grey-700 dark:text-white mb-6">
					Add New Column
				</h2>

				<fetcher.Form method="put">
					<Input>Column name</Input>
					<Button className="w-full mt-4" theme="primaryS">
						Confirm
					</Button>
				</fetcher.Form>
			</Modal>
		</>
	);
};
