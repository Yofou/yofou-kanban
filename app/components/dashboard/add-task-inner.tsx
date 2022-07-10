import { Columns, Task } from "@prisma/client";
import { FetcherWithComponents } from "@remix-run/react";
import DeleteIcon from "../icon/delete-icon";
import { Button } from "../shared/button";
import { Dropdown } from "../shared/dropdown";
import { Input } from "../shared/input";
import { TextArea } from "../shared/text-area";
import { SubTasks } from "./add-task";
import React from "react";

type AddTaskInnerProps = {
	title: string;
	cta: string;
	task?: Task;
	subtasks: SubTasks[];
	columns: Columns[];
	addSubtask: () => void;
	removeSubtask: (id: string) => () => void;
	fetcher: FetcherWithComponents<any>;
};

export const AddTaskInner: React.FC<AddTaskInnerProps> = ({
	title,
	cta,
	task,
	subtasks,
	columns,
	addSubtask,
	removeSubtask,
	fetcher,
}) => {
	return (
		<>
			<h2 className="text-heading-l text-grey-700 dark:text-white mb-6">
				{title}
			</h2>

			<Input
				defaultValue={task?.title ?? ""}
				error={fetcher.data?.error?.["Title"]}
			>
				Title
			</Input>
			<TextArea
				defaultValue={task?.description ?? ""}
				error={fetcher.data?.error?.["Description"]}
				className="mt-6"
			>
				Description
			</TextArea>

			<fieldset className="mt-6">
				<h3 className="text-body-m text-grey-300 dark:text-white mb-2">
					Subtasks {fetcher.data?.error?.["sub-tasks"] && "- boop"}
				</h3>
				{subtasks.map((sub) => {
					return (
						<div
							key={sub.id}
							className="grid gap-4 grid-cols-[1fr,max-content] mb-3"
						>
							<input
								readOnly
								value={sub.id}
								className="hidden"
								name="sub-tasks-id"
								type="text"
							/>
							<Input defaultValue={sub.value} name="sub-tasks" />
							<button
								className="text-grey-300 hover:text-red-600 transition-colors"
								type="button"
								onClick={removeSubtask(sub.id)}
							>
								<DeleteIcon />
							</button>
						</div>
					);
				})}

				{subtasks.map((sub, index) => {
					if (!fetcher.data?.error?.[index])
						return <React.Fragment key={`${sub.id}_error`}></React.Fragment>;
					return (
						<p
							className="text-body-m text-red-600 my-2"
							key={`${sub.id}_error`}
						>
							{fetcher.data?.error?.[index]}
						</p>
					);
				})}

				<Button
					type="button"
					onClick={addSubtask}
					className="w-full"
					theme="secondary"
				>
					+ Add New Subtask
				</Button>
			</fieldset>

			<fieldset className="mt-6">
				<h3 className="text-body-m text-grey-700 dark:text-white mb-2">
					Status
				</h3>
				<Dropdown
					options={columns}
					name="status"
					keyResolver={(column) => column.title}
					valueResolver={(column) => column.id}
					findCurrentValue={
						task ? (column) => column.id === task.columnId : undefined
					}
				/>
			</fieldset>

			<Button
				type="submit"
				className="w-full mt-6 disabled:opacity-50"
				disable={fetcher.state !== "idle"}
				theme="primaryS"
			>
				{cta}
			</Button>
		</>
	);
};
