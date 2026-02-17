import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { ChildTemple, Temple } from "@/types/temple-structure";

interface ChildTempleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  childTemple?: ChildTemple | null;
  temples?: Temple[];
  onSave: (data: Partial<ChildTemple>) => void;
}

export function ChildTempleModal({ open, onOpenChange, childTemple, temples, onSave }: ChildTempleModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{childTemple ? "Edit Child Temple" : "Add Child Temple"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <p className="text-muted-foreground">Child Temple modal - placeholder implementation</p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button onClick={() => { onSave({}); onOpenChange(false); }}>Save</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
