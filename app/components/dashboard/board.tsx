import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "~/lib/store";
import { Modal } from "../shared/modal";
import { AddColumn } from "./add-column";
import { Column } from "./column";
import useEmblaCarousel from "embla-carousel-react";

export const Board: React.FC = () => {
	const [ref, embla] = useEmblaCarousel({
		dragFree: true,
		containScroll: "keepSnaps",
	});
	const [show, setShow] = useState(false);
	const toggleShow = () => setShow(!show);
	const selectedBoard = useSelector(
		(state: RootState) => state.boards.selected
	);

	useEffect(() => {
		embla?.reInit();
	}, [selectedBoard]);

	return (
		<div className="overflow-hidden w-full h-full pr-[50px]" ref={ref}>
			<div className="bg-grey-100 dark:bg-grey-600 p-6 h-full grid grid-flow-col auto-cols-[280px]">
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
				<button
					onClick={toggleShow}
					className="bg-gradient-to-b from-[#E9EFFA] to-[#E9EFFA]/50 dark:from-grey-500 dark:to-grey-500/50 text-grey-300 text-heading-xl"
				>
					+ New Columnm
				</button>
			</div>

			<Modal show={show} onClickedOutside={() => setShow(false)}>
				<AddColumn onSubmit={() => setShow(false)} />
			</Modal>
		</div>
	);
};
