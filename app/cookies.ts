import { createCookie, createSessionStorage } from "@remix-run/node";
import { db } from "./lib/app.server";

export type ThemeType = "dark" | "light";
export const theme = createCookie("theme", { maxAge: 60 * 60 * 24 * 30 * 12 });

export const sessionId = createCookie("sessionId", {
  maxAge: 60 * 60 * 24 * 30,
});

const foo = createSessionStorage({
  cookie: sessionId,
  async createData(data, expires) {
    console.log(data);
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
  async deleteData(id) {},
});

export const { commitSession, getSession, destroySession } = foo;
