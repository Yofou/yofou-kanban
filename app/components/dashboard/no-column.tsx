import { Button } from "../shared/button";

export const NoColumn: React.FC = () => {
  return (
    <section className="grid place-content-center place-items-center gap-8 grid-flow-row">
      <h2 className="text-heading-l text-grey-300">
        This board is empty. Create a new column to get started.
      </h2>
      <Button theme="primaryL">+ Add New Column</Button>
    </section>
  );
};
