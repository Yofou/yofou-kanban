import { Button } from "../shared/button";

export const Nav: React.FC = () => {
	return (
		// TODO: make aria-label more informant later on?
		<nav
			className="bg-white items-center dark:bg-grey-500 border-b border-grey-200 dark:border-grey-400 grid grid-cols-[1fr,repeat(2,max-content)] gap-6 px-6 pt-[22px] pb-7"
			aria-label="Add Task navigaton"
		>
			<h2 className="text-heading-xl text-grey-700 dark:text-white">
				Platform Launch
			</h2>
			<Button theme="primaryL">+ Add New Task</Button>
			<button>
				<img src="/options.svg" alt="" />
			</button>
		</nav>
	);
};
