import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Temple } from "@/types/temple-structure";

interface TempleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  temple?: Temple | null;
  onSave: (data: Partial<Temple>) => void;
  hasPrimaryTemple?: boolean;
}

export function TempleModal({ open, onOpenChange, temple, onSave, hasPrimaryTemple }: TempleModalProps) {
  // Placeholder implementation
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{temple ? "Edit Temple" : "Add Temple"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Temple Name</Label>
            <Input placeholder="Enter temple name" defaultValue={temple?.name} />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea placeholder="Enter description" defaultValue={temple?.description} />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button onClick={() => { onSave({}); onOpenChange(false); }}>Save</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
