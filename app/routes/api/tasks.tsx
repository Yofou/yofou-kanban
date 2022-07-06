import { ActionFunction } from "@remix-run/node";
import { post, put } from "~/lib/service/task.controller";

export const action: ActionFunction = ({ request }) => {
	if (request.method === "POST") return post(request);
	if (request.method === "PUT") return put(request);
	return null;
};
