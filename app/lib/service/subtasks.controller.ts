import { db } from "../server/db.server";

export const put = async (request: Request) => {
	const data = await request.formData();
	const id = parseInt(
		(data.get("subtask-id") as string | null) ?? "not a number"
	);

	if (isNaN(id)) {
		return new Response(`subtask-id must be a number`);
	}

	await db.$queryRaw`update "SubTask" set "isDone" = not "isDone" where "id" = ${id} returning *`;

	return null;
};
