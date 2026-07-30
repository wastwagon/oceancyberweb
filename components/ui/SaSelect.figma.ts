// url=https://www.figma.com/design/Pk5GjBdlET8oOcvoNGsjb1/Untitled-UI-PRO-VARIABLES?node-id=6520-67419
// source=components/ui/SaSelect.tsx
// component=SaSelect
// NOTE: Publish requires Figma Organization/Enterprise Code Connect. Local template ready for CLI publish after upgrade.
import figma from "figma";

const instance = figma.selectedInstance;

const placeholder =
  instance.findText("Text")?.textContent ??
  instance.getString("Placeholder") ??
  "Select option";

const disabled = instance.getBoolean("Disabled");

const density = instance.getEnum("Size", {
  sm: "micro",
  md: "compact",
  lg: "default",
});

export default {
  example: figma.code`
    <SaSelect
      density="${density || "default"}"
      ${disabled ? "disabled" : ""}
    >
      <option value="">${placeholder}</option>
    </SaSelect>
  `,
  imports: ['import { SaSelect } from "@/components/ui/SaSelect"'],
  id: "sa-select",
  metadata: { nestable: true },
};
