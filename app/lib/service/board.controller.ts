import { json, redirect } from "@remix-run/node";
import createBoard from "~/validators/create-board";
import JoiToHumanError from "../JoiToHumanError";
import { db } from "../server/db.server";

export const post = async (request: Request) => {
  const data = await request.formData();
  type Body = { [key: string]: FormDataEntryValue | FormDataEntryValue[] };
  const body: Body = Object.fromEntries(data);
  body["columns"] = data.getAll("columns");

  const validator = createBoard.validate(body);
  if (validator?.error) {
    return json({ ...validator, error: JoiToHumanError(validator.error) });
  }

  const board = await db.boards.create({
    data: {
      user: {
        connect: {
          id: parseInt(body["user-id"] as string),
        },
      },
      title: body["Board name"] as string,
      columns: {
        createMany: {
          data:
            (body["columns"] as string[])?.map((column: string) => ({
              title: column,
              color: "",
            })) ?? [],
        },
      },
    },
  });

  return redirect(`/dashboard/${board.id}`);
};

export const del = async (request: Request) => {
  const data = await request.formData();
  const body = Object.fromEntries(data);

  if (body["user-id"] && body["board-id"]) {
    await db.boards.deleteMany({
      where: {
        id: parseInt(body["board-id"] as string),
        userId: parseInt(body["user-id"] as string),
      },
    });

    return redirect("/dashboard");
  }

  return null;
};
