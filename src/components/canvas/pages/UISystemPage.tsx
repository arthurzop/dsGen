import { Button } from "@/components/ui-kit/Button";
import { Input } from "@/components/ui-kit/Input";
import { Select } from "@/components/ui-kit/Select";
import { Checkbox } from "@/components/ui-kit/Checkbox";
import { Radio } from "@/components/ui-kit/Radio";
import { Switch } from "@/components/ui-kit/Switch";
import { Badge } from "@/components/ui-kit/Badge";
import { Alert } from "@/components/ui-kit/Alert";
import { Tabs } from "@/components/ui-kit/Tabs";
import { Avatar } from "@/components/ui-kit/Avatar";

function Group({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span
        className="uppercase tracking-wide text-grey-400"
        style={{ fontSize: "12px" }}
      >
        {label}
      </span>
      {children}
    </div>
  );
}

interface UiSystemPageProps {
  sectionNumber: number;
}

export function UiSystemPage({ sectionNumber }: UiSystemPageProps) {
  return (
    <div
      className="grid w-full grid-cols-3 gap-8 p-12"
      style={{ fontFamily: "var(--token-font-family)" }}
    >
      <span
        className="col-span-3 font-medium uppercase tracking-wide"
        style={{
          fontSize: "var(--token-font-size-small)",
          color: "var(--token-color-dominant)",
        }}
      >
        UI System
      </span>

      <Group label="Buttons">
        <div className="flex flex-wrap gap-2">
          <Button variant="primary">Primário</Button>
          <Button variant="secondary">Secundário</Button>
          <Button variant="text">Texto</Button>
        </div>
      </Group>

      <Group label="Badges">
        <div className="flex flex-wrap gap-2">
          <Badge label="Novo" />
          <Badge label="Beta" />
          <Badge label="123" />
          <Badge label="Alpha" />
          <Badge label="Versões" />
        </div>
      </Group>

      <Group label="Avatars">
        <div className="flex gap-2">
          <Avatar initials="LU" />
          <Avatar initials="MA" />
        </div>
      </Group>

      <Group label="Inputs">
        <Input />
      </Group>

      <Group label="Select">
        <Select options={["Opção 1", "Opção 2", "Opção 3"]} />
      </Group>

      <Group label="Switch">
        <Switch />
      </Group>

      <Group label="Checkbox / Radio">
        <div className="flex flex-col gap-2">
          <Checkbox />
          <Radio options={["Ativo", "Inativo"]} />
        </div>
      </Group>

      <Group label="Tabs">
        <Tabs labels={["Overview", "Detalhes", "Config"]} />
      </Group>

      <Group label="Alert">
        <Alert />
      </Group>
    </div>
  );
}
