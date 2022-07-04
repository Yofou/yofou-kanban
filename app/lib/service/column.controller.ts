import { json, redirect } from "@remix-run/node";
import createColumnValidator from "~/validators/create-column";
import JoiToHumanError from "../JoiToHumanError";
import { addOne as addOneColumn } from "./column.service";
import { getHex } from "pastel-color";
import { v4 } from "uuid";
import { getOne as getOneBoard } from "./board.serivce";
import { getSession } from "~/cookies";

export const post = async (request: Request) => {
	const session = await getSession(request.headers.get("Cookie"));

	if (session?.id?.length === 0) return redirect("/");
	const data = await request.formData();
	const body = Object.fromEntries(data);

	const validator = createColumnValidator.validate(body);
	if (validator?.error) {
		return json({
			...validator,
			error: JoiToHumanError(validator.error),
		});
	}

	const boardId = parseInt(body["board-id"] as string);
	const board = await getOneBoard(session.data?.user?.id, boardId);

	if (board?.userId !== session.data.user.id) return redirect("/dashboard");
	await addOneColumn({
		id: v4(),
		title: body["Column name"] as string,
		boardId: boardId,
		color: getHex() as string,
	});
	return null;
};
