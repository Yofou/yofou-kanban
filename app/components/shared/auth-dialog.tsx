import { Form } from "@remix-run/react";

type AuthDialogProps = React.PropsWithChildren<{
	title: string;
	action?: string;
}>;
export const AuthDialog: React.FC<AuthDialogProps> = ({
	title,
	children,
	action = "/",
}) => {
	return (
		<main className="grid w-full h-full px-8">
			<div className="place-self-center w-full max-w-[410px] bg-white rounded-[6px] pt-8 pb-[50px] px-[30px] dark:bg-grey-500">
				<h2 className="text-heading-xl mb-[30px] dark:text-white text-grey-700">
					{title}
				</h2>
				<form
					className="flex flex-col items-start gap-4"
					action={action}
					method="post"
				>
					{children}
				</form>
			</div>
		</main>
	);
};
