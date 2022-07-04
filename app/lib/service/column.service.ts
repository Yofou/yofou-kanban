import { Columns } from "@prisma/client";
import { db } from "../server/db.server";

export const addOne = (data: Columns) =>
	db.columns.create({
		data,
	});
