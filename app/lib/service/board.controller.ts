import { json, redirect } from "@remix-run/node";
import createBoard from "~/validators/create-board";
import JoiToHumanError from "../JoiToHumanError";
import { db } from "../server/db.server";
import { getHex } from "pastel-color";
import { getSession } from "~/cookies";

export const post = async (request: Request) => {
	const session = await getSession(request.headers.get("Cookie"));

	if (session?.id?.length === 0) return redirect("/");
	const data = await request.formData();
	type Body = { [key: string]: FormDataEntryValue | FormDataEntryValue[] };
	const body: Body = Object.fromEntries(data);
	body["columns-names"] = data.getAll("columns-names");

	const validator = createBoard.validate(body);
	if (validator?.error) {
		return json({ ...validator, error: JoiToHumanError(validator.error) });
	}

	const board = await db.boards.create({
		data: {
			user: {
				connect: {
					id: session.data?.user?.id,
				},
			},
			title: body["Board name"] as string,
			columns: {
				createMany: {
					data:
						(body["columns-names"] as string[])?.map((column: string) => ({
							title: column,
							color: getHex(),
						})) ?? [],
				},
			},
		},
	});

	return redirect(`/dashboard/${board.id}`);
};

export const del = async (request: Request) => {
	const session = await getSession(request.headers.get("Cookie"));

	if (session?.id?.length === 0) return redirect("/");
	const data = await request.formData();
	const body = Object.fromEntries(data);

	if (body["user-id"] && body["board-id"]) {
		await db.boards.deleteMany({
			where: {
				id: parseInt(body["board-id"] as string),
				userId: session.data?.user?.id,
			},
		});

		return redirect("/dashboard");
	}

	return null;
};

export const put = async (request: Request) => {
	const session = await getSession(request.headers.get("Cookie"));

	if (session.id?.length === 0) return redirect("/");
	type Body = { [key: string]: FormDataEntryValue | FormDataEntryValue[] };
	const data = await request.formData();
	const body: Body = Object.fromEntries(data);

	const ids = data.getAll("columns-id");
	const names = data.getAll("columns-names");
	body["removed-columns"] = data.getAll("removed-columns");
	const columns = Array.from(ids, (_, index) => ({
		name: names[index],
		id: ids[index],
	}));

	const updateAndDeleteBoard = db.$transaction([
		db.columns.deleteMany({
			where: {
				id: {
					in: body["removed-columns"] as string[],
				},
			},
		}),
		db.boards.update({
			where: {
				id: parseInt(body["board-id"] as string),
			},
			data: {
				title: body["Board name"] as string,
			},
		}),
	]);

	const createOrUpdateColumns = db.$transaction(
		columns.map((column) => {
			return db.columns.upsert({
				where: {
					id: column.id as string,
				},
				create: {
					boardId: parseInt(body["board-id"] as string),
					title: column.name as string,
					color: getHex(),
				},
				update: {
					title: column.name as string,
				},
			});
		})
	);

	await Promise.all([updateAndDeleteBoard, createOrUpdateColumns]);
	return null;
};
