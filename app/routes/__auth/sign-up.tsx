import { set as setAuthTitle } from "~/lib/auth-slice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { AuthDialog } from "~/components/shared/auth-dialog";
import { Input } from "~/components/shared/input";
import { Button } from "~/components/shared/button";
import { Link } from "@remix-run/react";

const SignUp: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setAuthTitle("sign up"));
  }, []);

  return (
    <AuthDialog title="Sign Up">
      <Input>Username</Input>
      <Input type="email">Email</Input>
      <Input type="password">Password</Input>
      <Input type="password">Confirm Password</Input>
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
