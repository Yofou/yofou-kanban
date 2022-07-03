import { db } from "../server/db.server";

export const getAllBoardTasks = async () => {
  return await db.boards.findMany({
    include: {
      columns: {
        include: {
          task: {
            select: {
              id: true,
              title: true,
              description: true,
              _count: {
                select: {
                  subtasks: true,
                },
              },
            },
          },
        },
      },
    },
  });
};
