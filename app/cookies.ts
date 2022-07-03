import { createCookie, createSessionStorage } from "@remix-run/node";
import { db } from "./lib/server/db.server";

export type ThemeType = "dark" | "light";
export const theme = createCookie("theme", { maxAge: 60 * 60 * 24 * 30 * 12 });

export const sessionId = createCookie("sessionId", {
	maxAge: 60 * 60 * 24 * 30,
});

const sessionStorage = createSessionStorage({
	cookie: sessionId,
	async createData(data, expires) {
		const id = await db.session.create({
			data: {
				userId: data.userId,
			},
		});

		return `${id.id}`;
	},

	async readData(id) {
		return await db.session.findFirst({
			where: {
				id: id,
			},
			include: {
				user: {
					select: {
						id: true,
						username: true,
						email: true,
					},
				},
			},
		});
	},

	// TODO: Complete these functions so we can sign out
	async updateData(id, data, expires) {},
	async deleteData(id) {
		await db.session.delete({
			where: {
				id,
			},
		});
	},
});

export const { commitSession, getSession, destroySession } = sessionStorage;
