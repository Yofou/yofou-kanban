import { SubTask, Task } from "@prisma/client";
import { useFetcher } from "@remix-run/react";
import { useEffect, useMemo, useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import { useSelector } from "react-redux";
import { RootState } from "~/lib/store";
import { CheckBox } from "../shared/checkbox";
import { Dropdown } from "../shared/dropdown";
import { DropdownDialog } from "../shared/dropdown-dialog";

type InnerTaskProps = {
	task: Task & { subtasks: SubTask[] };
	closeModel?: () => void;
	openEditModel: () => void;
};

export const InnerTask: React.FC<InnerTaskProps> = ({
	task,
	closeModel,
	openEditModel,
}) => {
	const [isTaskOptionsOpen, setIsTaskOptionsOpen] = useState(false);
	const board = useSelector((state: RootState) => state.boards.selected);
	const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
	const doneSubTasks = useMemo(() => {
		return task.subtasks.filter((sub) => sub.isDone).length;
	}, [task]);
	const fetcher = useFetcher();
	const ref = useDetectClickOutside({
		onTriggered: () => {
			setIsTaskOptionsOpen(false);
		},
	});

	const deleteTask = () => {
		fetcher.submit(
			{ "task-id": task.id.toString() },
			{ method: "delete", action: "/api/tasks" }
		);
	};

	useEffect(() => {
		if (selectedStatus) {
			fetcher.submit(
				{
					"task-id": task.id.toString(),
					status: selectedStatus,
				},
				{
					method: "put",
					action: "/api/tasks",
				}
			);
		}
	}, [selectedStatus]);

	useEffect(() => {
		if (
			fetcher.submission?.method === "DELETE" &&
			fetcher?.data?.delete === "ok" &&
			closeModel
		) {
			closeModel();
		}
	}, [fetcher]);

	return (
		<div>
			<h2 className="text-heading-l text-grey-700 mb-6 dark:text-white">
				{task.title}
			</h2>
			<p className="text-body-l text-grey-300 mb-6">{task.description}</p>

			<div className="mb-6">
				<h3 className="mb-4 text-body-m text-white">
					Subtasks ({doneSubTasks} of {task.subtasks.length})
				</h3>
				<div className="flex flex-col gap-2">
					{task.subtasks.map((subtask) => (
						<CheckBox
							onClick={() => {
								fetcher.submit(
									{
										"subtask-id": subtask.id.toString(),
									},
									{
										method: "put",
										action: "/api/subtasks",
									}
								);
							}}
							key={subtask.id}
							isChecked={subtask.isDone}
						>
							{subtask.title}
						</CheckBox>
					))}
				</div>
			</div>

			<div>
				<h3 className="text-body-m text-grey-300 dark:text-white mb-2">
					Current Status
				</h3>
				<Dropdown
					options={board?.columns ?? []}
					keyResolver={(column) => column.title}
					valueResolver={(column) => column.id}
					findCurrentValue={(column) => column.id === task.columnId}
					bindSelected={setSelectedStatus}
				/>
			</div>

			<div className="absolute top-8 right-8">
				<div ref={ref} className="relative">
					<button
						onClick={() => setIsTaskOptionsOpen(!isTaskOptionsOpen)}
						className=""
					>
						<img src="/options.svg" alt="" />
					</button>

					<DropdownDialog
						className="absolute top-[calc(100%+18px)] max-w-[190px] !w-screen left-1/2 transform -translate-x-1/2"
						show={isTaskOptionsOpen}
					>
						<button
							onClick={openEditModel}
							className="text-left text-body-l text-grey-300"
						>
							Edit Task
						</button>
						<button
							onClick={deleteTask}
							className="text-left text-body-l text-red-600"
						>
							Delete Task
						</button>
					</DropdownDialog>
				</div>
			</div>
		</div>
	);
};
