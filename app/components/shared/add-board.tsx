import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { useFetcher } from "@remix-run/react";
import { InnerBoardModel } from "../dashboard/inner-board-model";

export type Column = { id: string; value: string };
type AddBoardProps = {
	onModalClose: () => void;
};
export const AddBoard: React.FC<AddBoardProps> = ({ onModalClose }) => {
	const fetcher = useFetcher();

	const columnsData = fetcher.data?.values?.columns?.map((item: string) => ({
		id: v4(),
		value: item,
	})) as Column[] | null;
	const [columns, setColumns] = useState(
		columnsData ?? [{ id: v4(), value: "" }]
	);
	const addColumn = () => {
		setColumns([...columns, { id: v4(), value: "" }]);
	};

	const removeColumn = (id: string) => () => {
		if (columns.length === 1) return;
		setColumns(columns.filter((item) => id !== item.id));
	};

	useEffect(() => {
		if (fetcher.type === "done" && !fetcher.data) onModalClose();
	}, [fetcher]);

	return (
		<fetcher.Form method="post" action="/api/boards">
			<InnerBoardModel
				title="Add New Board"
				cta="Create New Board"
				addColumn={addColumn}
				removeColumn={removeColumn}
				columns={columns}
				fetcher={fetcher}
			/>
		</fetcher.Form>
	);
};
