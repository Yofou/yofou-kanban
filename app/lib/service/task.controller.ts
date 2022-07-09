import { json, redirect } from "@remix-run/node";
import { getSession } from "~/cookies";
import addTaskValidator from "~/validators/add-task";
import editTaskValidator from "~/validators/edit-task";
import JoiToHumanError from "../JoiToHumanError";
import { db } from "../server/db.server";
import { isBoardOwnerByColumnId } from "./task.service";

export const post = async (request: Request) => {
	const session = await getSession(request.headers.get("Cookie"));

	if (session.id?.length === 0) return redirect("/");
	type Body = { [key: string]: FormDataEntryValue | FormDataEntryValue[] };
	const data = await request.formData();
	const body: Body = Object.fromEntries(data);
	body["sub-tasks"] = data.getAll("sub-tasks");
	body["sub-tasks-id"] = data.getAll("sub-tasks-id");

	const validator = addTaskValidator.validate(body);
	if (validator?.error) {
		return json({
			...validator,
			error: JoiToHumanError(validator.error),
		});
	}

	await isBoardOwnerByColumnId(session, body["status"] as string);

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
	type Body = { [key: string]: FormDataEntryValue | FormDataEntryValue[] };
	const body: Body = Object.fromEntries(data);
	body["sub-tasks"] = data.getAll("sub-tasks");
	body["sub-tasks-id"] = data.getAll("sub-tasks-id");
	body["removed-sub-tasks"] = data.getAll("removed-sub-tasks");

	const validator = editTaskValidator.validate(body);
	if (validator.error) {
		return json({
			...validator,
			error: JoiToHumanError(validator.error),
		});
	}

	await isBoardOwnerByColumnId(session, body["status"] as string);

	await db.$transaction([
		db.task.update({
			where: {
				id: parseInt(body["task-id"] as string),
			},
			data: {
				title: body["Title"] as string | undefined,
				description: body["Description"] as string | undefined,
				columnId: body["status"] as string | undefined,
			},
		}),
		db.subTask.deleteMany({
			where: {
				id: {
					in: body["removed-sub-tasks"] as string[],
				},
			},
		}),
		...body["sub-tasks"].map((value, idIndex) => {
			const id = (body["sub-tasks-id"] as string[])[idIndex];
			return db.subTask.upsert({
				where: {
					id,
				},
				create: {
					id,
					taskId: parseInt(body["task-id"] as string),
					title: value as string,
				},
				update: {
					title: value as string,
				},
			});
		}),
	]);

	return null;
};

export const del = async (request: Request) => {
	const session = await getSession(request.headers.get("Cookie"));

	if (session.id.length === 0) return redirect("/");
	const data = await request.formData();

	const isBoardOwner = await db.boards.findFirst({
		where: {
			userId: session.data?.user?.id,
		},
		include: {
			columns: {
				include: {
					task: {
						where: {
							id: parseInt(data.get("task-id") as string),
						},
					},
				},
			},
		},
	});

	if (!isBoardOwner) return redirect("/dashboard");
	await db.task.delete({
		where: {
			id: parseInt(data.get("task-id") as string),
		},
	});

	return { delete: "ok" };
};
