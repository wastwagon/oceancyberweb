// url=https://www.figma.com/design/Pk5GjBdlET8oOcvoNGsjb1/Untitled-UI-PRO-VARIABLES?node-id=13036-555610
// source=components/ui/SaField.tsx
// component=SaField
// NOTE: Publish requires Figma Organization/Enterprise Code Connect. Local template ready for CLI publish after upgrade.
import figma from "figma";

const instance = figma.selectedInstance;

const label =
  instance.findText("Label")?.textContent ??
  instance.getString("Label") ??
  "Label";

const hint =
  instance.findText("Hint text")?.textContent ??
  instance.getString("Hint text") ??
  "";

const required = instance.getBoolean("Required");

const control = instance.findInstance("Input") || instance.findInstance("Input field");
let controlCode;
if (control && control.type === "INSTANCE") {
  controlCode = control.executeTemplate().example;
}

export default {
  example: figma.code`
    <SaField
      label="${label}"
      ${required ? "required" : ""}
      ${hint ? figma.code`hint="${hint}"` : ""}
    >
      ${controlCode || figma.code`<SaInput />`}
    </SaField>
  `,
  imports: [
    'import { SaField } from "@/components/ui/SaField"',
    'import { SaInput } from "@/components/ui/SaInput"',
  ],
  id: "sa-field",
  metadata: { nestable: false },
};
