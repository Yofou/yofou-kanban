import { useSelector } from "react-redux";
import { RootState } from "~/lib/store";
import { Column } from "./column";

export const Board: React.FC = () => {
	const selectedBoard = useSelector(
		(state: RootState) => state.boards.selected
	);
	return (
		<div className="w-full bg-grey-100 dark:bg-grey-600 p-6 h-full grid grid-flow-col auto-cols-[280px]">
			{selectedBoard?.columns.map((column) => {
				return (
					<Column
						key={column.id}
						title={column.title}
						total={column.task.length}
						color={column.color}
					></Column>
				);
			})}
			<button className="bg-gradient-to-b from-[#E9EFFA] to-[#E9EFFA]/50 dark:from-grey-500 dark:to-grey-500/50 text-grey-300 text-heading-xl">
				+ New Columnm
			</button>
		</div>
	);
};
