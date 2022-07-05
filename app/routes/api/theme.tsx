import { ActionFunction, json } from "@remix-run/node";
import { theme, ThemeType } from "~/cookies";

export const action: ActionFunction = async ({ request }) => {
	if (request.method !== "POST") return;
	const cookies = request.headers.get("Cookie");
	let themeFromCookie = (await theme.parse(cookies)) as ThemeType;
	if (themeFromCookie === "dark") themeFromCookie = "light";
	else if (themeFromCookie === "light") themeFromCookie = "dark";

	return json(
		{},
		{
			headers: {
				"Set-Cookie": await theme.serialize(themeFromCookie),
			},
		}
	);
};
