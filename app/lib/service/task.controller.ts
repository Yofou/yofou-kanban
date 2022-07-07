import { json, redirect } from "@remix-run/node";
import { getSession } from "~/cookies";
import addTaskValidator from "~/validators/add-task";
import editTaskValidator from "~/validators/edit-task";
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

export const put = async (request: Request) => {
	const session = await getSession(request.headers.get("Cookie"));

	if (session.id.length === 0) return redirect("/");
	const data = await request.formData();
	const body = Object.fromEntries(data);

	const validator = editTaskValidator.validate(body);
	if (validator.error) {
		return json({
			...validator,
			error: JoiToHumanError(validator.error),
		});
	}

	await db.task.update({
		where: {
			id: parseInt(body["task-id"] as string),
		},
		data: {
			title: body["title"] as string | undefined,
			description: body["description"] as string | undefined,
			columnId: body["status"] as string | undefined,
		},
	});

	return null;
};

export const del = async (request: Request) => {
	const session = await getSession(request.headers.get("Cookie"));

	if (session.id.length === 0) return redirect("/");
	const data = await request.formData();

	await db.task.delete({
		where: {
			id: parseInt(data.get("task-id") as string),
		},
	});

	return { delete: "ok" };
};
