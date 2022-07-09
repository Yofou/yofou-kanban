import { redirect, Session } from "@remix-run/node";
import { db } from "../server/db.server";

export const isBoardOwnerByColumnId = async (
	session: Session,
	columnId: string
) => {
	const isBoardOwner = await db.boards.findFirst({
		where: {
			userId: session.data?.user?.id,
		},
		include: {
			columns: {
				where: {
					id: columnId,
				},
			},
		},
	});

	if (!isBoardOwner) return redirect("/dashboard");
};
