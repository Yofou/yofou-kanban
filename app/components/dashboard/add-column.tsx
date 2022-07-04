import { useFetcher } from "@remix-run/react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "~/lib/store";
import { Button } from "../shared/button";
import { Input } from "../shared/input";

type AddCoulmnProps = { onSubmit: () => void };
export const AddColumn: React.FC<AddCoulmnProps> = ({ onSubmit }) => {
	const fetcher = useFetcher();
	const selectedBoard = useSelector(
		(state: RootState) => state.boards.selected
	);

	useEffect(() => {
		if (fetcher.type === "done" && fetcher.data === null) onSubmit();
	}, [fetcher]);

	return (
		<>
			<h2 className="text-heading-l text-grey-700 dark:text-white mb-6">
				Add New Column
			</h2>

			<fetcher.Form method="post" action="/api/columns">
				<Input>Column name</Input>
				<Button className="w-full mt-4" theme="primaryS">
					Confirm
				</Button>

				<input
					name="board-id"
					className="hidden"
					defaultValue={selectedBoard?.id}
					type="text"
				/>
			</fetcher.Form>
		</>
	);
};
