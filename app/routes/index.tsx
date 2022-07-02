import { LoginDialog } from "~/components/index/login-dialog";
import { Nav } from "~/components/shared/nav";

export default function Index() {
  return (
    <div className="w-full h-full grid grid-rows-[max-content,1fr]">
      <Nav>Login</Nav>
      <LoginDialog />
    </div>
  );
}
