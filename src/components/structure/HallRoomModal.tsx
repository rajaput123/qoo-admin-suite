import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { HallRoom, Zone } from "@/types/temple-structure";

interface HallRoomModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  hallRoom?: HallRoom | null;
  zones?: Zone[];
  onSave: (data: Partial<HallRoom>) => void;
}

export function HallRoomModal({ open, onOpenChange, hallRoom, zones, onSave }: HallRoomModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{hallRoom ? "Edit Hall/Room" : "Add Hall/Room"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <p className="text-muted-foreground">Hall/Room modal - placeholder implementation</p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button onClick={() => { onSave({}); onOpenChange(false); }}>Save</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
