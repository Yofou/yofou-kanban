import { ActionFunction } from "@remix-run/node";
import { put } from "~/lib/service/subtasks.controller";

export const action: ActionFunction = ({ request }) => {
	if (request.method === "PUT") return put(request);
	return null;
};
