import { db } from "../server/db.server";

export const put = async (request: Request) => {
	const data = await request.formData();
	const id = data.get("subtask-id") ?? "no-id-provided";

	await db.$queryRaw`update "SubTask" set "isDone" = not "isDone" where "id" = ${id} returning *`;
	return null;
};
