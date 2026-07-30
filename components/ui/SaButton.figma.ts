// url=https://www.figma.com/design/Pk5GjBdlET8oOcvoNGsjb1/Untitled-UI-PRO-VARIABLES?node-id=6520-67419
// source=components/ui/SaButton.tsx
// component=SaButton
// NOTE: Publish requires Figma Organization/Enterprise Code Connect. Local template ready for CLI publish after upgrade.
import figma from "figma";

const instance = figma.selectedInstance;

const label =
  instance.findText("Text")?.textContent ??
  instance.getString("Label") ??
  "Button";

const variant = instance.getEnum("Hierarchy", {
  Primary: "primary",
  "Secondary color": "secondary",
  "Secondary gray": "outline",
  Tertiary: "secondary",
  "Link color": "outline",
  "Link gray": "outline",
});

const size = instance.getEnum("Size", {
  sm: "sm",
  md: "default",
  lg: "lg",
  xl: "lg",
  "2xl": "lg",
});

const state = instance.getEnum("State", {
  Default: "default",
  Hover: "default",
  Focused: "default",
  Disabled: "disabled",
  Loading: "disabled",
});

export default {
  example: figma.code`
    <SaButton
      variant="${variant || "primary"}"
      size="${size || "default"}"
      ${state === "disabled" ? "disabled" : ""}
    >
      ${label}
    </SaButton>
  `,
  imports: ['import { SaButton } from "@/components/ui/SaButton"'],
  id: "sa-button",
  metadata: { nestable: true },
};
