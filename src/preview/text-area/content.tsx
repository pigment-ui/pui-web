import { PinIcon, UserIcon } from "lucide-react";

const code = `
import { Button } from "#/ui";
import { PinIcon, UserIcon } from "lucide-react";

function TextAreaContent() {
  return <TextArea startContent={<UserIcon />} endContent={<PinIcon />} label="Comment" description="Lorem ipsum dolor sit amet." />;
}
`;

export const content = { code, scope: { PinIcon, UserIcon } };
