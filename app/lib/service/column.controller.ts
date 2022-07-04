import { json } from "@remix-run/node";
import createColumnValidator from "~/validators/create-column";
import JoiToHumanError from "../JoiToHumanError";
import { addOne as addOneColumn } from "./column.service";
import { getHex } from "pastel-color";

export const post = async (request: Request) => {
	const data = await request.formData();
	const body = Object.fromEntries(data);

	const validator = createColumnValidator.validate(body);
	if (validator?.error) {
		return json({
			...validator,
			error: JoiToHumanError(validator.error),
		});
	}

	await addOneColumn({
		title: body["Column name"] as string,
		boardId: parseInt(body["board-id"] as string),
		color: getHex() as string,
	});
	return null;
};
