import { json } from "@remix-run/node";
import addTaskValidator from "~/validators/add-task";
import JoiToHumanError from "../JoiToHumanError";
import { db } from "../server/db.server";

export const post = async (request: Request) => {
	type Body = { [key: string]: FormDataEntryValue | FormDataEntryValue[] };
	const data = await request.formData();
	const body: Body = Object.fromEntries(data);
	body["sub-tasks"] = data.getAll("sub-tasks");

	const validator = addTaskValidator.validate(body);
	if (validator?.error) {
		return json({
			...validator,
			error: JoiToHumanError(validator.error),
		});
	}

	console.log(body);

	await db.task.create({
		data: {
			title: body["Title"] as string,
			description: body["Description"] as string,
			columnId: body["status"] as string,
			subtasks: {
				createMany: {
					data: (body["sub-tasks"] as string[]).map((sub) => ({
						title: sub,
						isDone: false,
					})),
				},
			},
		},
		include: {
			subtasks: true,
		},
	});

	return null;
};
