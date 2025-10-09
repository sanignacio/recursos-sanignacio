import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export function NumberInput({
  className,
  id,
  ...props
}: React.ComponentProps<typeof Input>) {
  return (
    <div className="flex items-center gap-2">
      <Label htmlFor={id}>Cantidad</Label>
      <Input
        id={id}
        type="number"
        placeholder="0"
        min={0}
        className={className}
        {...props}
      />
    </div>
  );
}
