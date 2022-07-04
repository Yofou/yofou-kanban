import { ActionFunction } from "@remix-run/node";
import { del, post, put } from "~/lib/service/board.controller";

export const action: ActionFunction = async ({ request }) => {
	if (request.method === "POST") return post(request);
	if (request.method === "DELETE") return del(request);
	if (request.method === "PUT") return put(request);

	return null;
};
