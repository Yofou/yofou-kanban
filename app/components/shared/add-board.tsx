import { useEffect, useState } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { v4 } from "uuid";
import { useFetcher } from "@remix-run/react";
import { useSelector } from "react-redux";
import { RootState } from "~/lib/store";

type AddBoardProps = {
  onModalClose: () => void;
};
export const AddBoard: React.FC<AddBoardProps> = ({ onModalClose }) => {
  const user = useSelector((state: RootState) => state.user);
  const fetcher = useFetcher();

  type Column = { id: string; value: string };
  const columnsData = fetcher.data?.values?.columns?.map((item: string) => ({
    id: v4(),
    value: item,
  })) as Column[] | null;
  const [columns, setColumns] = useState(
    columnsData ?? [{ id: v4(), value: "" }]
  );
  const addColumn = () => {
    setColumns([...columns, { id: v4(), value: "" }]);
  };

  const removeColumn = (id: string) => () => {
    if (columns.length === 1) return;
    setColumns(columns.filter((item) => id !== item.id));
  };

  useEffect(() => {
    if (fetcher.type === "done" && !fetcher.data) onModalClose();
  }, [fetcher]);

  return (
    <fetcher.Form method="post" action="/api/boards">
      <h2 className="text-heading-l text-grey-700 dark:text-white mb-6">
        Add New Board
      </h2>

      <fieldset>
        <Input error={fetcher.data?.error?.["Board name"]}>Board name</Input>
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
                <Input name="columns" defaultValue={item.value} />
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
        Create new board
      </Button>

      <input
        className="hidden"
        name="user-id"
        defaultValue={user?.id}
        type="number"
      />
    </fetcher.Form>
  );
};
