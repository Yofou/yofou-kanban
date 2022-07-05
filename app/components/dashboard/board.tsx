import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "~/lib/store";
import { Modal } from "../shared/modal";
import { AddColumn } from "./add-column";
import { Column } from "./column";
import useEmblaCarousel from "embla-carousel-react";
import { Task } from "./task";
import { SubTask, Task as TaskType } from "@prisma/client";

export const Board: React.FC = () => {
	const [ref, embla] = useEmblaCarousel({
		dragFree: true,
		containScroll: "keepSnaps",
	});

	const [selectedTask, setSelectedTask] = useState<
		(TaskType & { subtasks: SubTask[] }) | null
	>(null);
	const [show, setShow] = useState(false);
	const toggleShow = () => setShow(!show);
	const selectedBoard = useSelector(
		(state: RootState) => state.boards.selected
	);

	useEffect(() => {
		setTimeout(() => {
			embla?.reInit();
		}, 250);
	}, [selectedBoard]);

	return (
		<>
			<div className="overflow-hidden w-full h-full pr-[50px]" ref={ref}>
				<div className="bg-grey-100 dark:bg-grey-600 p-6 h-full grid grid-flow-col gap-6 auto-cols-[280px]">
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
						className="bg-gradient-to-b rounded-[6px] from-[#E9EFFA] to-[#E9EFFA]/50 dark:from-grey-500 dark:to-grey-500/50 text-grey-300 text-heading-xl"
					>
						+ New Columnm
					</button>
				</div>
			</div>

			<Modal
				show={!!selectedTask}
				onClickedOutside={() => setSelectedTask(null)}
			>
				<p>qwdqw</p>
			</Modal>

			<Modal show={show} onClickedOutside={() => setShow(false)}>
				<AddColumn onSubmit={() => setShow(false)} />
			</Modal>
		</>
	);
};
