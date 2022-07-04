import { ActionFunction } from "@remix-run/node";
import { post } from "~/lib/service/column.controller";

export const action: ActionFunction = ({ request }) => {
	if (request.method === "POST") return post(request);
	return null;
};
