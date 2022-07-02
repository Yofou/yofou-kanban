import { Form, Link } from "@remix-run/react";
import { Button } from "../shared/button";
import { Input } from "../shared/input";

export const LoginDialog: React.FC = () => {
  return (
    <main className="place-self-center min-w-[410px] bg-white rounded-[6px] pt-8 pb-[50px] px-[30px] dark:bg-grey-500">
      <h2 className="text-heading-xl mb-[30px] dark:text-white text-grey-700">
        Login
      </h2>
      <Form className="flex flex-col items-start gap-4" action="">
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
      </Form>
    </main>
  );
};
