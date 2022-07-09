import { SubTask, Task } from "@prisma/client";
import { useFetcher } from "@remix-run/react";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { Board } from "~/lib/store/boards-slice";
import { SubTasks } from "./add-task";
import { AddTaskInner } from "./add-task-inner";

type EditTaskProps = {
	task: Task & { subtasks: SubTask[] };
	board: Board;
	closeModal: () => void;
};
export const EditTask: React.FC<EditTaskProps> = ({
	board,
	task,
	closeModal,
}) => {
	const fetcher = useFetcher();
	const [removedSubTasks, setRemoveSubTasks] = useState<SubTasks["id"][]>([]);
	const [subtasks, setSubTasks] = useState<SubTasks[]>(
		task.subtasks.map((sub) => ({ id: sub.id.toString(), value: sub.title }))
	);

	const addSubTask = () => {
		setSubTasks([...subtasks, { id: v4(), value: "" }]);
	};

	const removeSubTask = (id: string) => () => {
		setSubTasks(subtasks.filter((sub) => sub.id !== id));
		if (task.subtasks.some((sub) => `${sub.id}` === id))
			setRemoveSubTasks([...removedSubTasks, id]);
	};

	useEffect(() => {
		const wasSuccesfulRequest =
			fetcher.state === "idle" &&
			fetcher.type === "done" &&
			fetcher.data === null;
		if (wasSuccesfulRequest) closeModal();
	}, [fetcher]);

	return (
		<fetcher.Form method="put" action="/api/tasks">
			<AddTaskInner
				task={task}
				title="Edit Task"
				cta="Save Changes"
				columns={board.columns ?? []}
				fetcher={fetcher}
				subtasks={subtasks}
				addSubtask={addSubTask}
				removeSubtask={removeSubTask}
			/>

			<input
				readOnly
				className="hidden"
				name="task-id"
				value={task.id}
				type="text"
			/>

			{removedSubTasks.map((sub) => (
				<input
					key={sub}
					readOnly
					className="hidden"
					name="removed-sub-tasks"
					value={sub}
					type="text"
				/>
			))}
		</fetcher.Form>
	);
};
