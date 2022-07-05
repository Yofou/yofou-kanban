import { ActionFunction } from "@remix-run/node";
import { post } from "~/lib/service/task.controller";

export const action: ActionFunction = ({ request }) => {
	if (request.method === "POST") return post(request);
	return null;
};
