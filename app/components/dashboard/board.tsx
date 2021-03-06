import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "~/lib/store";
import { Modal } from "../shared/modal";
import { AddColumn } from "./add-column";
import { Column } from "./column";
import { Task } from "./task";
import { SubTask, Task as TaskType } from "@prisma/client";
import { InnerTask } from "./inner-task";
import { EditTask } from "./edit-task";
import { useSpring, animated, easings } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";

export const Board: React.FC = () => {
	const [selectedTask, setSelectedTask] = useState<
		(TaskType & { subtasks: SubTask[] }) | null
	>(null);
	const [show, setShow] = useState(false);
	const toggleShow = () => setShow(!show);
	const [showEditTask, setShowEditTask] = useState(false);
	const selectedBoard = useSelector(
		(state: RootState) => state.boards.selected
	);

	const isOpen = useSelector(
		(state: RootState) => state.dashboardAside.staggered
	);

	useEffect(() => {
		for (let column of selectedBoard?.columns ?? []) {
			for (let task of column.task) {
				if (task.id === selectedTask?.id) setSelectedTask(task);
			}
		}
	}, [selectedBoard]);

	const outer = useRef<HTMLDivElement>(null);
	const [rightBound, setRightBound] = useState(0);
	const [{ x }, api] = useSpring(() => ({ x: 0 }));

	useEffect(() => {
		setRightBound(
			(outer?.current?.clientWidth ?? 0) -
				(outer.current?.children[0]?.scrollWidth ?? 0)
		);
	}, [selectedBoard, isOpen]);

	// Set the drag hook and define component movement based on gesture data
	const bind = useDrag(
		({ offset: [mx], target, cancel }) => {
			if (
				target instanceof HTMLElement &&
				(target instanceof HTMLButtonElement ||
					target.parentElement instanceof HTMLButtonElement)
			) {
				cancel();
				return;
			}
			api.start({ x: mx, config: { frequency: 0.1, damping: 0.8 } });
		},
		{
			bounds: {
				left: rightBound - 150,
				right: 0,
			},
			rubberband: 0.8,
		}
	);

	return (
		<>
			<div ref={outer} className="overflow-hidden w-full h-full pr-[50px]">
				<animated.div
					{...bind()}
					style={{ x }}
					className="bg-grey-100 z-40 touch-none dark:bg-grey-600 p-6 h-full grid grid-flow-col gap-6 auto-cols-[280px]"
				>
					{selectedBoard?.columns.map((column) => {
						return (
							<Column
								key={column.id}
								title={column.title}
								total={column.task.length}
								color={column.color}
							>
								{column.task.map((task) => {
									return (
										<Task
											key={task.id}
											title={task.title}
											onClick={() => setSelectedTask(task)}
											totalTasks={task.subtasks.length}
											isDoneTasks={
												task.subtasks.filter((sub) => sub.isDone).length
											}
										/>
									);
								})}
							</Column>
						);
					})}
					<button
						onClick={toggleShow}
						className="bg-gradient-to-b rounded-[6px] from-[#E9EFFA] to-[#E9EFFA]/50 dark:from-grey-500 dark:to-grey-500/50 text-grey-300 hover:text-purple-600 transition-colors text-heading-xl"
					>
						+ New Column
					</button>
				</animated.div>
			</div>

			<Modal
				show={!!selectedTask && showEditTask === false}
				onClickedOutside={() => {
					if (showEditTask === false) setSelectedTask(null);
				}}
			>
				{selectedTask && (
					<InnerTask
						openEditModel={() => setShowEditTask(true)}
						closeModel={() => setSelectedTask(null)}
						task={selectedTask}
					/>
				)}
			</Modal>

			<Modal
				show={showEditTask}
				onClickedOutside={() => setShowEditTask(false)}
			>
				{selectedTask && selectedBoard && (
					<EditTask
						board={selectedBoard}
						task={selectedTask}
						closeModal={() => setShowEditTask(false)}
					/>
				)}
			</Modal>

			<Modal show={show} onClickedOutside={() => setShow(false)}>
				<AddColumn onSubmit={() => setShow(false)} />
			</Modal>
		</>
	);
};
