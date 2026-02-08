import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface CustomField {
  label: string;
  type: string;
}

interface CustomFieldsSectionProps {
  fields: CustomField[];
  onFieldsChange: (fields: CustomField[]) => void;
}

const fieldTypes = [
  { value: "text", label: "Text" },
  { value: "number", label: "Number" },
  { value: "date", label: "Date" },
  { value: "toggle", label: "Toggle" },
  { value: "dropdown", label: "Dropdown" },
  { value: "radio", label: "Radio" },
  { value: "checkbox", label: "Checkbox" },
  { value: "textarea", label: "Textarea" },
  { value: "email", label: "Email" },
  { value: "url", label: "URL" },
  { value: "phone", label: "Phone" },
];

const CustomFieldsSection = ({ fields, onFieldsChange }: CustomFieldsSectionProps) => {
  const addField = () => {
    onFieldsChange([...fields, { label: "", type: "text" }]);
  };

  const removeField = (index: number) => {
    const newFields = fields.filter((_, i) => i !== index);
    onFieldsChange(newFields);
  };

  const updateField = (index: number, key: keyof CustomField, value: string) => {
    const newFields = [...fields];
    newFields[index][key] = value;
    onFieldsChange(newFields);
  };

  return (
    <div className="space-y-3">
      {fields.length > 0 && (
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Custom Fields</p>
      )}
      {fields.map((field, index) => (
        <div key={index} className="flex items-center gap-2">
          <div className="flex-1">
            <Input
              placeholder="Field label"
              value={field.label}
              onChange={(e) => updateField(index, "label", e.target.value)}
            />
          </div>
          <Select
            value={field.type}
            onValueChange={(val) => updateField(index, "type", val)}
          >
            <SelectTrigger className="w-32 bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              {fieldTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 shrink-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            onClick={() => removeField(index)}
          >
            <Minus className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={addField} className="w-full gap-1.5">
        <Plus className="h-3.5 w-3.5" />
        Add Custom Field
      </Button>
    </div>
  );
};

export default CustomFieldsSection;
