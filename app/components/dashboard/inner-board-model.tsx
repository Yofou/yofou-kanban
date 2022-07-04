import { FetcherWithComponents } from "@remix-run/react";
import { Column } from "../shared/add-board";
import { Button } from "../shared/button";
import { Input } from "../shared/input";

type InnerBoardModelProps = React.PropsWithChildren<{
	fetcher: FetcherWithComponents<any>;
	columns: Column[];
	addColumn: () => void;
	removeColumn: (id: string) => () => void;
	boardName?: string;
	title: string;
	cta: string;
}>;
export const InnerBoardModel: React.FC<InnerBoardModelProps> = ({
	fetcher,
	columns,
	addColumn,
	removeColumn,
	boardName,
	title,
	cta,
}) => {
	return (
		<>
			<h2 className="text-heading-l text-grey-700 dark:text-white mb-6">
				{title}
			</h2>

			<fieldset>
				<Input
					defaultValue={boardName ?? ""}
					error={fetcher.data?.error?.["Board name"]}
				>
					Board name
				</Input>
			</fieldset>

			<h3 className="text-body-m text-grey-700 mt-6 mb-2 dark:text-white">
				Board Columns
			</h3>
			<fieldset className="flex flex-col gap-3">
				{columns.map((item, index) => {
					return (
						<div
							key={item.id}
							className="grid grid-cols-[1fr,max-content] items-center gap-4"
						>
							<div>
								{fetcher.data?.error?.[index] && (
									<p className="text-body-m text-red-600 mb-2">
										{fetcher.data.error[index]}
									</p>
								)}
								<Input
									labelClassName="hidden"
									name="columns-id"
									defaultValue={item.id}
								/>
								<Input name="columns-names" defaultValue={item.value} />
							</div>
							<button type="button" onClick={removeColumn(item.id)}>
								<img src="/board-close.svg" />
							</button>
						</div>
					);
				})}
				<Button onClick={addColumn} type="button" theme="secondary">
					+ Add New Column
				</Button>
			</fieldset>

			<Button className="mt-6 w-full" theme="primaryS">
				{cta}
			</Button>
		</>
	);
};
