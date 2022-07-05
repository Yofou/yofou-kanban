type TaskProps = {
	title: string;
	isDoneTasks: number;
	totalTasks: number;
	onClick: () => void;
};
export const Task: React.FC<TaskProps> = ({
	title,
	totalTasks,
	isDoneTasks,
	onClick,
}) => {
	return (
		<button
			onClick={onClick}
			className="flex flex-col rounded-[8px] bg-white dark:bg-grey-500 px-4 gap-2 text-left py-6 shadow-task-shadow"
		>
			<h2 className="text-heading-m text-grey-700 dark:text-white">{title}</h2>
			<p className="text-body-m text-grey-300">
				{isDoneTasks} of {totalTasks} tasks
			</p>
		</button>
	);
};
