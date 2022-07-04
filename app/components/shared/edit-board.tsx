import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { useFetcher } from "@remix-run/react";
import { useSelector } from "react-redux";
import { RootState } from "~/lib/store";
import { InnerBoardModel } from "../dashboard/inner-board-model";
import { Column } from "./add-board";

type EditBoardProps = {
	onModalClose: () => void;
};
export const EditBoard: React.FC<EditBoardProps> = ({ onModalClose }) => {
	const selectedBoard = useSelector(
		(state: RootState) => state.boards.selected
	);
	if (!selectedBoard) return <></>;
	const fetcher = useFetcher();

	const columnsData = fetcher.data?.values?.columns?.map((item: string) => ({
		id: v4(),
		value: item,
	})) as Column[];

	const [columns, setColumns] = useState<Column[]>(
		columnsData ??
			selectedBoard.columns.map((column) => ({
				value: column.title,
				id: column.id,
			}))
	);

	const addColumn = () => {
		setColumns([...columns, { id: v4(), value: "" }]);
	};

	const [removedColumns, setRemovedColumns] = useState<Column[]>([]);
	const removeColumn = (id: string) => () => {
		if (columns.length === 1) return;
		setColumns(
			columns.reduce((total, column) => {
				if (column.id === id) {
					if (selectedBoard.columns.some((column) => column.id === id))
						setRemovedColumns([...removedColumns, column]);
					return total;
				}

				total.push(column);
				return total;
			}, [] as Column[])
		);
	};

	useEffect(() => {
		if (fetcher.type === "done" && !fetcher.data) onModalClose();
	}, [fetcher]);

	return (
		<fetcher.Form method="put" action="/api/boards">
			<InnerBoardModel
				title="Edit New Board"
				cta="Save Changes"
				addColumn={addColumn}
				removeColumn={removeColumn}
				columns={columns}
				fetcher={fetcher}
				boardName={selectedBoard?.title ?? ""}
			/>

			{removedColumns.map((column) => (
				<input
					key={column.id}
					className="hidden"
					name="removed-columns"
					defaultValue={column.id}
					type="text"
				/>
			))}

			<input
				className="hidden"
				name="board-id"
				defaultValue={selectedBoard.id}
				type="text"
			/>
		</fetcher.Form>
	);
};
