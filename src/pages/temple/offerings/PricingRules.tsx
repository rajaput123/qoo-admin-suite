import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { IndianRupee, Pencil, Save } from "lucide-react";
import { toast } from "sonner";
import SearchableSelect from "@/components/SearchableSelect";
import CustomFieldsSection, { CustomField } from "@/components/CustomFieldsSection";

interface PricingRule {
  id: string;
  offering: string;
  type: "Ritual" | "Darshan";
  basePrice: number;
  festivalPrice: number;
  advanceBookingDays: number;
  cancellationPolicy: string;
  refundPolicy: string;
  maxPerDevotee: number;
}

const mockRules: PricingRule[] = [
  { id: "1", offering: "Suprabhatam", type: "Ritual", basePrice: 500, festivalPrice: 750, advanceBookingDays: 30, cancellationPolicy: "24 hours before", refundPolicy: "Full refund if cancelled 24h in advance", maxPerDevotee: 2 },
  { id: "2", offering: "Archana", type: "Ritual", basePrice: 100, festivalPrice: 150, advanceBookingDays: 15, cancellationPolicy: "12 hours before", refundPolicy: "No refund within 12h", maxPerDevotee: 5 },
  { id: "3", offering: "Abhishekam", type: "Ritual", basePrice: 2000, festivalPrice: 3000, advanceBookingDays: 60, cancellationPolicy: "48 hours before", refundPolicy: "80% refund if cancelled 48h in advance", maxPerDevotee: 1 },
  { id: "4", offering: "Morning Darshan", type: "Darshan", basePrice: 0, festivalPrice: 0, advanceBookingDays: 7, cancellationPolicy: "Anytime", refundPolicy: "N/A – Free", maxPerDevotee: 10 },
  { id: "5", offering: "VIP Darshan", type: "Darshan", basePrice: 300, festivalPrice: 500, advanceBookingDays: 30, cancellationPolicy: "24 hours before", refundPolicy: "Full refund if 24h before", maxPerDevotee: 4 },
];

const PricingRules = () => {
  const [rules, setRules] = useState<PricingRule[]>(mockRules);
  const [editing, setEditing] = useState<PricingRule | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [customFields, setCustomFields] = useState<CustomField[]>([]);

  const [form, setForm] = useState({
    basePrice: 0, festivalPrice: 0, advanceBookingDays: 30, cancellationPolicy: "", refundPolicy: "", maxPerDevotee: 2,
  });

  const openEdit = (r: PricingRule) => {
    setEditing(r);
    setForm({ basePrice: r.basePrice, festivalPrice: r.festivalPrice, advanceBookingDays: r.advanceBookingDays, cancellationPolicy: r.cancellationPolicy, refundPolicy: r.refundPolicy, maxPerDevotee: r.maxPerDevotee });
    setIsEditOpen(true);
  };

  const handleSave = () => {
    if (editing) {
      setRules(rules.map(r => r.id === editing.id ? { ...r, ...form } : r));
      toast.success("Pricing updated");
    }
    setIsEditOpen(false);
    setEditing(null);
  };

  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight">Pricing & Rules</h1>
          <p className="text-muted-foreground">Control pricing and booking policies per offering</p>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg"><IndianRupee className="h-5 w-5 text-primary" /></div>
              <div><CardTitle>Pricing Rules</CardTitle><CardDescription>{rules.length} offerings configured</CardDescription></div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Offering</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Base Price</TableHead>
                  <TableHead className="text-right">Festival Price</TableHead>
                  <TableHead className="text-center">Advance (Days)</TableHead>
                  <TableHead>Cancellation</TableHead>
                  <TableHead className="text-center">Max/Devotee</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rules.map(r => (
                  <TableRow key={r.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{r.offering}</TableCell>
                    <TableCell><Badge variant={r.type === "Ritual" ? "default" : "secondary"}>{r.type}</Badge></TableCell>
                    <TableCell className="text-right">{r.basePrice > 0 ? `₹${r.basePrice}` : "Free"}</TableCell>
                    <TableCell className="text-right">{r.festivalPrice > 0 ? `₹${r.festivalPrice}` : "Free"}</TableCell>
                    <TableCell className="text-center">{r.advanceBookingDays}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{r.cancellationPolicy}</TableCell>
                    <TableCell className="text-center">{r.maxPerDevotee}</TableCell>
                    <TableCell className="text-right"><Button variant="ghost" size="icon" onClick={() => openEdit(r)}><Pencil className="h-4 w-4" /></Button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>

      <Dialog open={isEditOpen} onOpenChange={() => setIsEditOpen(false)}>
        <DialogContent className="sm:max-w-[500px] max-h-[85vh] overflow-y-auto bg-background">
          <DialogHeader><DialogTitle>Edit Pricing – {editing?.offering}</DialogTitle><DialogDescription>Update pricing and booking rules</DialogDescription></DialogHeader>
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Base Price (₹)</Label><Input type="number" value={form.basePrice} onChange={e => setForm({ ...form, basePrice: +e.target.value })} /></div>
              <div><Label>Festival Price (₹)</Label><Input type="number" value={form.festivalPrice} onChange={e => setForm({ ...form, festivalPrice: +e.target.value })} /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Advance Booking (Days)</Label><Input type="number" value={form.advanceBookingDays} onChange={e => setForm({ ...form, advanceBookingDays: +e.target.value })} /></div>
              <div><Label>Max per Devotee</Label><Input type="number" value={form.maxPerDevotee} onChange={e => setForm({ ...form, maxPerDevotee: +e.target.value })} /></div>
            </div>
            <div><Label>Cancellation Policy</Label><Textarea value={form.cancellationPolicy} onChange={e => setForm({ ...form, cancellationPolicy: e.target.value })} rows={2} /></div>
            <div><Label>Refund Policy</Label><Textarea value={form.refundPolicy} onChange={e => setForm({ ...form, refundPolicy: e.target.value })} rows={2} /></div>
            <Separator />
            <CustomFieldsSection fields={customFields} onFieldsChange={setCustomFields} />
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setIsEditOpen(false)}>Cancel</Button><Button onClick={handleSave} className="gap-1"><Save className="h-4 w-4" />Save</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PricingRules;
