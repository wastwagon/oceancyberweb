import { redirect } from "next/navigation";

/** Legacy URL — design content lives at /how-we-work#design */
export default function DesignProcessRedirectPage() {
  redirect("/how-we-work#design");
}
