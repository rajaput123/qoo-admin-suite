import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Counter, HallRoom } from "@/types/temple-structure";

interface CounterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  counter?: Counter | null;
  hallRooms?: HallRoom[];
  onSave: (data: Partial<Counter>) => void;
}

export function CounterModal({ open, onOpenChange, counter, hallRooms, onSave }: CounterModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{counter ? "Edit Counter" : "Add Counter"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <p className="text-muted-foreground">Counter modal - placeholder implementation</p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button onClick={() => { onSave({}); onOpenChange(false); }}>Save</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
