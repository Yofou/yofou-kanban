import { SubTask, Task } from "@prisma/client";
import { useFetcher } from "@remix-run/react";
import { useState } from "react";
import { Board } from "~/lib/store/boards-slice";
import { SubTasks } from "./add-task";
import { AddTaskInner } from "./add-task-inner";

type EditTaskProps = {
	task: Task & { subtasks: SubTask[] };
	board: Board;
};
export const EditTask: React.FC<EditTaskProps> = ({ board, task }) => {
	const fetcher = useFetcher();
	const [subtasks, setSubtasks] = useState<SubTasks[]>(
		task.subtasks.map((sub) => ({ id: sub.id.toString(), value: sub.title }))
	);

	const addSubTask = () => null;
	const removeSubTask = (id: string) => () => {};

	return (
		<fetcher.Form method="put" action="/api/task">
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
		</fetcher.Form>
	);
};
