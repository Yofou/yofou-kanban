import Logo from "../icon/logo"

export const Aside: React.FC = () => {
	return <aside className="w-full h-full grid grid-rows-[max-content,1fr,repeat(2,max-content)] py-8 bg-white dark:bg-grey-500 border-r border-r-grey-200 dark:border-r-grey-400">
		<a className="text-grey-700 dark:text-white ml-[34px]">
			<Logo />
		</a>
	</aside>
}
