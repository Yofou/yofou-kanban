import { ActionFunction, redirect } from "@remix-run/node";
import { destroySession, getSession } from "~/cookies";

export const action: ActionFunction = async ({ request }) => {
	if (request.method !== "DELETE") return null;

	const session = await getSession(request.headers.get("Cookie"));
	if (!session.id) return redirect("/");

	return redirect("/login", {
		headers: {
			"Set-Cookie": await destroySession(session),
		},
	});
};
