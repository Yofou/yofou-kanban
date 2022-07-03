import { set as setAuthTitle } from "~/lib/store/auth-slice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { AuthDialog } from "~/components/shared/auth-dialog";
import { Input } from "~/components/shared/input";
import { Button } from "~/components/shared/button";
import { Link, useActionData } from "@remix-run/react";
import {
	ActionFunction,
	json,
	LoaderFunction,
	redirect,
} from "@remix-run/node";
import createUserValidation from "~/validators/create-user";
import { db } from "~/lib/server/db.server";
import { hash } from "~/lib/server/argon.server";
import JoiToHumanError from "~/lib/JoiToHumanError";
import { commitSession, getSession } from "~/cookies";

export const loader: LoaderFunction = async ({ request }) => {
	const session = await getSession(request.headers.get("Cookie"));

	if (session?.id?.length > 0) return redirect("/dashboard");
	return json({});
};

type UserForm = {
	Username: string;
	Email: string;
	Password: string;
	"Confirm Password": string;
};
export const action: ActionFunction = async ({ request }) => {
	if (request.method !== "POST")
		return json({ errors: "Can only run POST action on /sign-up" });

	const data = await request.formData();
	const body = Object.fromEntries(data.entries()) as unknown as UserForm;

	const validate = createUserValidation.validate(body);
	if (validate?.error)
		return json({
			...validate,
			error: JoiToHumanError(validate.error),
		});

	const user = await db.user.create({
		data: {
			username: body.Username,
			email: body.Email,
			password: await hash(body.Password),
		},
	});

	const session = await getSession(request.headers.get("Cookie"));
	session.set("userId", user.id);

	return redirect("/dashboard", {
		headers: {
			"Set-Cookie": await commitSession(session),
		},
	});
};

const SignUp: React.FC = () => {
	const errors = useActionData();
	const dispatch = useDispatch();
	useEffect(() => {
		console.log(errors);
		dispatch(setAuthTitle("sign up"));
	}, []);

	return (
		<AuthDialog action="/sign-up" title="Sign Up">
			<Input
				error={errors?.error?.["Username"]}
				defaultValue={errors?.value["Username"] ?? ""}
			>
				Username
			</Input>
			<Input
				error={errors?.error?.["Email"]}
				defaultValue={errors?.value["Email"] ?? ""}
				type="email"
			>
				Email
			</Input>
			<Input
				error={errors?.error?.["Password"]}
				defaultValue={errors?.value["Password"] ?? ""}
				type="password"
			>
				Password
			</Input>
			<Input
				error={errors?.error?.["Confirm Password"]}
				defaultValue={errors?.value["Confirm Password"] ?? ""}
				type="password"
			>
				Confirm Password
			</Input>
			<div className="w-full flex justify-between items-center">
				<Button theme="primaryS">Sign up</Button>
				<Link
					className="text-body-m text-purple-600 hover:line-through uppercase"
					to="/login"
				>
					Login
				</Link>
			</div>
		</AuthDialog>
	);
};

export default SignUp;
