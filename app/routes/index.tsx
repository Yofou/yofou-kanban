import { useFetcher } from "@remix-run/react"

export default function Index() {
	const fetcher = useFetcher()
	const switchTheme = async () => {
		fetcher.submit(null, { method: "post", action: "/api/theme" })
	}

	return <>
		<p className="bg-red-300 dark:bg-grey-200 text-body-l">testing</p>
		<button onClick={switchTheme}>switch theme</button>
	</> 
}
