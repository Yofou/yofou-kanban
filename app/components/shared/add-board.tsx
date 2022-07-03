import { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { v4 } from "uuid";
import { useFetcher } from "@remix-run/react";
import { useSelector } from "react-redux";
import { RootState } from "~/lib/store";

export const AddBoard: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const fetcher = useFetcher();
  const [columns, setColumns] = useState([{ id: v4(), value: "" }]);
  const addColumn = () => {
    setColumns([...columns, { id: v4(), value: "" }]);
  };

  const removeColumn = (id: string) => () => {
    if (columns.length === 1) return;
    setColumns(columns.filter((item) => id !== item.id));
  };

  return (
    <fetcher.Form method="post" action="/api/boards">
      <input
        className="hidden"
        name="user-id"
        defaultValue={user?.id}
        type="text"
      />
      <h2 className="text-heading-l text-grey-700 dark:text-white mb-6">
        Add New Board
      </h2>

      <fieldset>
        <Input>Board name</Input>
      </fieldset>

      <h3 className="text-body-m text-grey-700 mt-6 mb-2 dark:text-white">
        Board Columns
      </h3>
      <fieldset className="flex flex-col gap-3">
        {columns.map((item) => {
          return (
            <div
              key={item.id}
              className="grid grid-cols-[1fr,max-content] items-center gap-4"
            >
              <Input name="columns" defaultValue={item.value} />
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
    </fetcher.Form>
  );
};
