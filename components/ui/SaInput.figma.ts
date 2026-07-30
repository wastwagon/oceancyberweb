// url=https://www.figma.com/design/Pk5GjBdlET8oOcvoNGsjb1/Untitled-UI-PRO-VARIABLES?node-id=13036-555637
// source=components/ui/SaInput.tsx
// component=SaInput
// NOTE: Publish requires Figma Organization/Enterprise Code Connect. Local template ready for CLI publish after upgrade.
import figma from "figma";

const instance = figma.selectedInstance;

const placeholder =
  instance.findText("Text")?.textContent ??
  instance.getString("Placeholder") ??
  "";

const disabled = instance.getBoolean("Disabled");

const density = instance.getEnum("Size", {
  sm: "micro",
  md: "compact",
  lg: "default",
});

export default {
  example: figma.code`
    <SaInput
      density="${density || "default"}"
      placeholder="${placeholder}"
      ${disabled ? "disabled" : ""}
    />
  `,
  imports: ['import { SaInput } from "@/components/ui/SaInput"'],
  id: "sa-input",
  metadata: { nestable: true },
};
