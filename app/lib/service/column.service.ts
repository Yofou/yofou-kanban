import { Columns } from "@prisma/client";
import { db } from "../server/db.server";

export type AddColumn = Omit<Columns, "id">;
export const addOne = (data: AddColumn) =>
	db.columns.create({
		data,
	});
