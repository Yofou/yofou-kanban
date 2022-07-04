import { useFetcher } from "@remix-run/react";
import { FormEventHandler, useEffect } from "react";
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

	const onDebounce: FormEventHandler<HTMLFormElement> = (e) => {
		if (fetcher.state !== "idle") e.preventDefault();
	};

	return (
		<>
			<h2 className="text-heading-l text-grey-700 dark:text-white mb-6">
				Add New Column
			</h2>

			<fetcher.Form onSubmit={onDebounce} method="post" action="/api/columns">
				<Input error={fetcher.data?.error?.["Column name"]}>Column name</Input>
				<Button
					disable={fetcher.state !== "idle"}
					className="w-full mt-4"
					theme="primaryS"
				>
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
