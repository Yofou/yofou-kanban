import { Link } from "@remix-run/react";
import Fluent_board from "../icon/fluent_board";

type AsideNavLinkProps = React.PropsWithChildren<{
	href: string;
	isActive?: boolean;
}>;
export const AsideNavLink: React.FC<AsideNavLinkProps> = ({
	children,
	href,
	isActive = false,
}) => {
	return (
		<Link
			className={`text-heading-m flex gap-4 items-center ${
				isActive ? "bg-purple-600 text-white" : "text-grey-300"
			}  py-[15px] pl-8 rounded-r-[9999px]`}
			to={href}
		>
			<Fluent_board />
			{children}
		</Link>
	);
};
