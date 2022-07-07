import { ActionFunction } from "@remix-run/node";
import { del, post, put } from "~/lib/service/task.controller";

export const action: ActionFunction = ({ request }) => {
	if (request.method === "POST") return post(request);
	if (request.method === "PUT") return put(request);
	if (request.method === "DELETE") return del(request);

	return null;
};
