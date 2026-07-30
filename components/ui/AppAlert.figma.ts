// url=https://www.figma.com/design/Pk5GjBdlET8oOcvoNGsjb1/Untitled-UI-PRO-VARIABLES?node-id=6520-67419
// source=components/ui/AppAlert.tsx
// component=AppAlert
// NOTE: Publish requires Figma Organization/Enterprise Code Connect. Local template ready for CLI publish after upgrade.
import figma from "figma";

const instance = figma.selectedInstance;

const title =
  instance.findText("Title")?.textContent ??
  instance.getString("Title") ??
  "";

const body =
  instance.findText("Supporting text")?.textContent ??
  instance.findText("Description")?.textContent ??
  instance.getString("Supporting text") ??
  "Alert message";

const tone = instance.getEnum("Color", {
  Gray: "info",
  Brand: "info",
  Error: "error",
  Warning: "warning",
  Success: "success",
});

export default {
  example: figma.code`
    <AppAlert tone="${tone || "info"}" ${title ? figma.code`title="${title}"` : ""}>
      ${body}
    </AppAlert>
  `,
  imports: ['import { AppAlert } from "@/components/ui/AppAlert"'],
  id: "app-alert",
  metadata: { nestable: false },
};
