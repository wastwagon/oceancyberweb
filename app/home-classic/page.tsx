import { redirect } from "next/navigation";

/**
 * Classic home is now the active `/`.
 * Keep this path as a convenience redirect.
 */
export default function HomeClassicRedirect() {
  redirect("/");
}
