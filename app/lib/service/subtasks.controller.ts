import { redirect } from "@remix-run/node";
import { getSession } from "~/cookies";
import { db } from "../server/db.server";

export const put = async (request: Request) => {
	const session = await getSession(request.headers.get("Cookie"));

	if (session.id.length === 0) return redirect("/");

	const data = await request.formData();
	const id = data.get("subtask-id") ?? "no-id-provided";
	const board = await db.boards.findFirst({
		where: {
			userId: session.data?.user?.id,
		},
		include: {
			columns: {
				include: {
					task: {
						include: {
							subtasks: {
								where: {
									id: id as string,
								},
							},
						},
					},
				},
			},
		},
	});

	if (!board) return redirect("/dashboard");
	await db.$queryRaw`update "SubTask" set "isDone" = not "isDone" where "id" = ${id} returning *`;
	return null;
};
