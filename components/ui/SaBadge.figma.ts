// url=https://www.figma.com/design/Pk5GjBdlET8oOcvoNGsjb1/Untitled-UI-PRO-VARIABLES?node-id=6643-131928
// source=components/ui/SaBadge.tsx
// component=SaBadge
// NOTE: Publish requires Figma Organization/Enterprise Code Connect. Local template ready for CLI publish after upgrade.
import figma from "figma";

const instance = figma.selectedInstance;

const label =
  instance.findText("Text")?.textContent ??
  instance.getString("Text") ??
  "Badge";

const variant = instance.getEnum("Color", {
  Gray: "muted",
  Brand: "primary",
  Error: "danger",
  Warning: "muted",
  Success: "primary",
  "Gray blue": "muted",
  "Blue light": "muted",
  Blue: "primary",
  Indigo: "primary",
  Purple: "primary",
  Pink: "danger",
  Orange: "muted",
});

export default {
  example: figma.code`<SaBadge variant="${variant}">${label}</SaBadge>`,
  imports: ['import { SaBadge } from "@/components/ui/SaBadge"'],
  id: "sa-badge",
  metadata: { nestable: true },
};
