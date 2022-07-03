import { ActionFunction } from "@remix-run/node";
import JoiToHumanError from "~/lib/JoiToHumanError";
import createBoard from "~/validators/create-board";

export const action: ActionFunction = async ({ request }) => {
  console.log("I am being hit right??");
  if (request.method !== "POST") return null;

  const data = await request.formData();
  type Body = { [key: string]: FormDataEntryValue | FormDataEntryValue[] };
  const body: Body = Object.fromEntries(data);
  body["columns"] = data.getAll("columns");

  const validator = createBoard.validate(body);
  if (validator?.error) {
    console.log({ ...validator, error: JoiToHumanError(validator.error) });
  }
  return null;
};
