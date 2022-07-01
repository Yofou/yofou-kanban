import { Aside } from "~/components/dashboard/aside"
import { Nav } from "~/components/dashboard/nav"

const Dashboard: React.FC = () => {
	return <div className="w-full h-full grid grid-cols-[300px,1fr]">
		<Aside />
		<main>
			<Nav />
			<p>Hello world</p>
		</main>
	</div>
}

export default Dashboard
