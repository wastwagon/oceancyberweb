import { permanentRedirect } from "next/navigation";

/** Case study index consolidated under `/portfolio`. */
export default function CaseStudiesRedirectPage() {
  permanentRedirect("/portfolio");
}
