import { permanentRedirect } from "next/navigation";

/** `/projects` consolidated into `/portfolio` (301). */
export default function ProjectsRedirectPage() {
  permanentRedirect("/portfolio");
}
