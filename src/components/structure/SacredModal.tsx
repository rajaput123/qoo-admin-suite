import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Sacred, Temple, ChildTemple } from "@/types/temple-structure";

interface SacredModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sacred?: Sacred | null;
  temples?: Temple[];
  childTemples?: ChildTemple[];
  onSave: (data: Partial<Sacred>) => void;
}

export function SacredModal({ open, onOpenChange, sacred, temples, childTemples, onSave }: SacredModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{sacred ? "Edit Sacred" : "Add Sacred"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <p className="text-muted-foreground">Sacred modal - placeholder implementation</p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button onClick={() => { onSave({}); onOpenChange(false); }}>Save</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
