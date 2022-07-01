import { createCookie } from "@remix-run/node";

export type ThemeType = "dark" | "light"
export const theme = createCookie("theme", { maxAge: 60 * 60 * 24 * 30 * 12 });
