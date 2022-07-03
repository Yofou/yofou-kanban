import { ActionFunction } from "@remix-run/node";
import { del, post } from "~/lib/service/board.controller";

export const action: ActionFunction = async ({ request }) => {
  if (request.method === "POST") return post(request);
  if (request.method === "DELETE") return del(request);

  return null;
};
