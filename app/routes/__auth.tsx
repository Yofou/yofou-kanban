import { Outlet } from "@remix-run/react";
import { useSelector } from "react-redux";
import { Nav } from "~/components/shared/nav";
import { RootState } from "~/lib/store";

const Layout: React.FC = () => {
	const title = useSelector((state: RootState) => state.auth);
	return (
		<div className="w-full min-h-screen grid grid-rows-[max-content,1fr]">
			<Nav>{title}</Nav>
			<Outlet />
		</div>
	);
};

export default Layout;
