import { useFetcher } from "@remix-run/react";
import { Dispatch, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { v4 } from "uuid";
import { RootState } from "~/lib/store";
import { Modal } from "../shared/modal";
import { AddTaskInner } from "./add-task-inner";

export type SubTasks = {
	id: string;
	value: string;
};

type AddTaskProps = {
	show: boolean;
	setShow: Dispatch<boolean>;
};
export const AddTask: React.FC<AddTaskProps> = ({ show, setShow }) => {
	const uuid = useMemo(() => v4(), []);
	const fetcher = useFetcher();
	const columns = useSelector(
		(state: RootState) => state.boards.selected?.columns
	);
	const [subtasks, setSubtasks] = useState<SubTasks[]>([
		{ id: v4(), value: "" },
	]);

	const addSubTask = () => {
		setSubtasks([...subtasks, { id: v4(), value: "" }]);
	};

	const removeSubTask = (id: string) => () => {
		if (subtasks.length === 1) return;
		setSubtasks(subtasks.filter((task) => task.id !== id));
	};

	useEffect(() => {
		if (fetcher.type === "done" && !fetcher.data) setShow(false);
	}, [fetcher]);

	return (
		<Modal key={uuid} show={show} onClickedOutside={() => setShow(false)}>
			<fetcher.Form method="post" action="/api/tasks">
				<AddTaskInner
					fetcher={fetcher}
					addSubtask={addSubTask}
					columns={columns ?? []}
					removeSubtask={removeSubTask}
					subtasks={subtasks}
					title="Add New Task"
					cta="Create task"
				/>
			</fetcher.Form>
		</Modal>
	);
};
