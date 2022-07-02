import { Form, Link } from "@remix-run/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AuthDialog } from "~/components/shared/auth-dialog";
import { Button } from "~/components/shared/button";
import { Input } from "~/components/shared/input";
import { set as setAuthTitle } from "~/lib/auth-slice";

export default function Index() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setAuthTitle("login"));
  }, []);

  return (
    <AuthDialog title="Login">
      <Input>Email</Input>
      <Input>Password</Input>
      <div className="flex w-full justify-between items-center">
        <Button theme="primaryS">Submit</Button>
        <Link
          className="uppercase text-body-m text-purple-600 hover:line-through"
          to="/sign-up"
        >
          sign up
        </Link>
      </div>
    </AuthDialog>
  );
}
