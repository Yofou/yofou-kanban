import { json, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import styles from "./styles/app.css"
import { store } from './lib/store'
import { Provider } from 'react-redux'
import { LoaderFunction } from "@remix-run/node"
import { theme, ThemeType } from "~/cookies"

export function links() {
  return [{ rel: "stylesheet", href: styles }]
}

export const loader: LoaderFunction = async ({ request }) => {
	const cookies = request.headers.get("Cookie")
	
	const themeFromCookie = await theme.parse(cookies) 
	return json({
		theme: themeFromCookie ?? "dark"
	})
}

export const meta: MetaFunction = () => ({
	charset: "utf-8",
	title: "New Remix App",
	viewport: "width=device-width,initial-scale=1",
});

export default function App() {
	const { theme } = useLoaderData<{ theme: ThemeType }>()
	
	return (
		<html className={theme} lang="en">
			<head>
				<Meta />
				<Links />
			</head>
			<body>
				<Provider store={store}>
					<Outlet />
					<ScrollRestoration />
					<Scripts />
					<LiveReload />
				</Provider>
			</body>
		</html>
	);
}
