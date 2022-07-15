import { json, LoaderFunction, redirect } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { useEffect, } from "react"
import { useDispatch } from "react-redux"
import { Board } from "~/components/dashboard/board"
import { NoColumn } from "~/components/dashboard/no-column"
import { getSession } from "~/cookies"
import { getOne as getOneBoard } from "~/lib/service/board.serivce"
import { select as selectBoard } from "~/lib/store/boards-slice"

export const loader: LoaderFunction = async ({ params, request }) => {
	const session = await getSession(
		request.headers.get("Cookie")
	)

	if (session?.id?.length === 0) return redirect("/")
	const id = parseInt(params["id"] ?? "NaN")
	if (isNaN(id)) return redirect("/dashboard")
	
	const board = await getOneBoard(session.data.user.id, id)
	if (!board) return redirect("/dashboard")
	
	return json({
		board
	})
}

const DashboardId: React.FC = () => {
	const dispatch = useDispatch()
	const data = useLoaderData()

	useEffect(() => {
		dispatch( selectBoard(data.board) )
	}, [data])
	
	if (data.board.columns.length === 0) return <NoColumn/>
	return <Board />
}

export default DashboardId
