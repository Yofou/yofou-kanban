import { db } from "../server/db.server";

export const getAllBoardTasks = async (userId: number) => {
	return await db.boards.findMany({
		where: {
			userId: userId,
		},
	});
};

export const getOne = async (userId: number, boardId: number) => {
	return db.boards.findFirst({
		where: {
			userId: userId,
			id: boardId,
		},
		include: {
			columns: {
				include: {
					task: {
						include: {
							subtasks: {
								orderBy: {
									id: "asc",
								},
							},
						},
					},
				},
			},
		},
	});
};

export const updateOne = async () => {};
