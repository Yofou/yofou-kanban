import {
  ActionFunction,
  json,
  LoaderFunction,
  redirect,
} from "@remix-run/node";
import { Link, useActionData } from "@remix-run/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AuthDialog } from "~/components/shared/auth-dialog";
import { Button } from "~/components/shared/button";
import { Input } from "~/components/shared/input";
import { set as setAuthTitle } from "~/lib/auth-slice";
import JoiToHumanError from "~/lib/JoiToHumanError";
import loginUserValidation from "~/validators/login-user";
import { verify } from "~/lib/argon.server";
import { db } from "~/lib/app.server";
import { commitSession, getSession } from "~/cookies";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));

  if (session.data) return redirect("/dashboard");
  return json({});
};

type LoginForm = {
  Email: string;
  Password: string;
};
export const action: ActionFunction = async ({ request }) => {
  if (request.method !== "POST") return json({});

  const data = await request.formData();
  const body = Object.fromEntries(data) as LoginForm;

  const validator = loginUserValidation.validate(body);
  if (validator?.error)
    return json({
      ...validator,
      error: JoiToHumanError(validator.error),
    });

  const user = await db.user.findFirst({
    where: {
      email: body.Email,
    },
  });

  if (!user || !(await verify(user?.password, body.Password)))
    return json({
      error: {
        all: "Invalid user creditionals",
      },
      value: body,
    });

  // TODO: make sure user can't create session if they're already logged in
  const session = await getSession(request.headers.get("Cookie"));

  session.set("userId", user.id);
  return redirect("/dashboard", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

export const Login: React.FC = () => {
  const errors = useActionData();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setAuthTitle("login"));
  }, []);

  return (
    <AuthDialog action="/login" title="Login">
      <Input
        defaultValue={errors?.value["Email"] ?? ""}
        error={errors?.error?.["Email"]}
      >
        Email
      </Input>
      <Input
        type="password"
        defaultValue={errors?.value["Password"] ?? ""}
        error={errors?.error?.["Password"]}
      >
        Password
      </Input>
      <div className="flex w-full justify-between items-center">
        <Button theme="primaryS">Submit</Button>
        <Link
          className="uppercase text-body-m text-purple-600 hover:line-through"
          to="/sign-up"
        >
          sign up
        </Link>
      </div>

      {errors?.error?.["all"] && (
        <p className="text-body-m text-red-600">{errors?.error?.["all"]}</p>
      )}
    </AuthDialog>
  );
};

export default Login;
