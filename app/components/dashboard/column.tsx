type ColumnProps = React.PropsWithChildren<{
	title: string;
	color: string;
	total: number;
}>;
export const Column: React.FC<ColumnProps> = ({
	title,
	children,
	total,
	color,
}) => {
	return (
		<div>
			<h2 className="text-heading-s mb-6 flex gap-2 items-center text-grey-300">
				<div
					className="w-[15px] h-[15px] rounded-full bg-[color:var(--color)]"
					style={{ "--color": color } as any}
				/>
				{title} ({total})
			</h2>
			<div className="flex flex-col gap-5">{children}</div>
		</div>
	);
};
