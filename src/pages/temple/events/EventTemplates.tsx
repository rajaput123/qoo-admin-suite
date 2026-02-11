import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Plus, Copy, Eye, LayoutTemplate } from "lucide-react";
import { eventTemplates, structures } from "@/data/eventData";
import SelectWithAddNew from "@/components/SelectWithAddNew";
import CustomFieldsSection, { CustomField } from "@/components/CustomFieldsSection";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { eventActions } from "@/modules/events/hooks";

function addDaysIso(startDate: string, days: number) {
  const d = new Date(startDate);
  d.setDate(d.getDate() + Math.max(0, days));
  return d.toISOString().slice(0, 10);
}

const EventTemplates = () => {
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [detailTemplate, setDetailTemplate] = useState<string | null>(null);
  const [customFields, setCustomFields] = useState<CustomField[]>([]);
  const [typeOptions, setTypeOptions] = useState(["Festival", "Special Ritual", "Annadanam", "Cultural", "VIP", "Public"]);
  const [formType, setFormType] = useState("");

  const detail = eventTemplates.find(t => t.id === detailTemplate);

  function createFromTemplate(tplId: string) {
    const tpl = eventTemplates.find((t) => t.id === tplId);
    if (!tpl) return;

    const startDate = new Date().toISOString().slice(0, 10);
    const endDate = addDaysIso(startDate, Math.max(0, tpl.defaultDuration - 1));
    const defaultStructure = structures[0] ?? { id: "STR-001", name: "Main Temple" };

    const ev = eventActions.createEvent({
      name: `${tpl.name} (New)`,
      type: tpl.type as any,
      templeId: "TMP-001",
      structureId: defaultStructure.id,
      structureName: defaultStructure.name,
      startDate,
      endDate,
      estimatedBudget: tpl.estimatedBudget,
      actualSpend: 0,
      estimatedFootfall: "—",
      description: tpl.description,
      status: "Draft",
      organizer: "—",
      capacity: 0,
      linkedSeva: [],
    });

    toast.success("Event created from template");
    navigate(`/temple/events/${ev.id}`);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Event Templates</h1>
          <p className="text-sm text-muted-foreground mt-1">Reusable event configurations for quick setup</p>
        </div>
        <Button onClick={() => setDialogOpen(true)}><Plus className="h-4 w-4 mr-2" />Create Template</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Est. Budget</TableHead>
                <TableHead>Default Sevas</TableHead>
                <TableHead>Default Roles</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {eventTemplates.map(t => (
                <TableRow key={t.id}>
                  <TableCell className="font-medium">{t.name}</TableCell>
                  <TableCell><Badge variant="outline" className="text-xs">{t.type}</Badge></TableCell>
                  <TableCell className="text-sm">{t.defaultDuration} day(s)</TableCell>
                  <TableCell className="text-sm">₹{(t.estimatedBudget / 100000).toFixed(1)}L</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">{t.defaultSevas.slice(0, 2).map(s => <Badge key={s} variant="secondary" className="text-[10px]">{s}</Badge>)}{t.defaultSevas.length > 2 && <Badge variant="secondary" className="text-[10px]">+{t.defaultSevas.length - 2}</Badge>}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">{t.defaultRoles.slice(0, 2).map(r => <Badge key={r} variant="secondary" className="text-[10px]">{r}</Badge>)}{t.defaultRoles.length > 2 && <Badge variant="secondary" className="text-[10px]">+{t.defaultRoles.length - 2}</Badge>}</div>
                  </TableCell>
                  <TableCell className="text-sm">{t.usageCount}x</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setDetailTemplate(t.id)}><Eye className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => createFromTemplate(t.id)}><Copy className="h-4 w-4" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create Template Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Create Event Template</DialogTitle></DialogHeader>
          <div className="space-y-4 mt-4">
            <div><Label>Template Name</Label><Input placeholder="e.g. Major Festival Template" /></div>
            <div><Label>Type</Label><SelectWithAddNew value={formType} onValueChange={setFormType} placeholder="Select type" options={typeOptions} onAddNew={v => setTypeOptions(p => [...p, v])} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Default Duration (days)</Label><Input type="number" placeholder="e.g. 10" /></div>
              <div><Label>Estimated Budget (₹)</Label><Input type="number" placeholder="e.g. 500000" /></div>
            </div>
            <div><Label>Description</Label><Textarea placeholder="Template description..." rows={2} /></div>
            <CustomFieldsSection fields={customFields} onFieldsChange={setCustomFields} />
          </div>
          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => { toast.success("Template created"); setDialogOpen(false); }}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Template Detail Dialog */}
      <Dialog open={!!detailTemplate} onOpenChange={() => setDetailTemplate(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>{detail?.name || "Template Details"}</DialogTitle></DialogHeader>
          {detail && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><p className="text-muted-foreground text-xs">Type</p><p>{detail.type}</p></div>
                <div><p className="text-muted-foreground text-xs">Duration</p><p>{detail.defaultDuration} day(s)</p></div>
                <div><p className="text-muted-foreground text-xs">Budget</p><p>₹{(detail.estimatedBudget / 100000).toFixed(1)}L</p></div>
                <div><p className="text-muted-foreground text-xs">Used</p><p>{detail.usageCount} times</p></div>
              </div>
              <div><p className="text-xs text-muted-foreground mb-1">Description</p><p className="text-sm">{detail.description}</p></div>
              <div><p className="text-xs text-muted-foreground mb-1">Default Sevas</p><div className="flex flex-wrap gap-1">{detail.defaultSevas.map(s => <Badge key={s} variant="outline" className="text-xs">{s}</Badge>)}{detail.defaultSevas.length === 0 && <span className="text-xs text-muted-foreground">None</span>}</div></div>
              <div><p className="text-xs text-muted-foreground mb-1">Default Roles</p><div className="flex flex-wrap gap-1">{detail.defaultRoles.map(r => <Badge key={r} variant="outline" className="text-xs">{r}</Badge>)}</div></div>
              <div><p className="text-xs text-muted-foreground mb-1">Default Materials</p><div className="flex flex-wrap gap-1">{detail.defaultMaterials.map(m => <Badge key={m} variant="outline" className="text-xs">{m}</Badge>)}{detail.defaultMaterials.length === 0 && <span className="text-xs text-muted-foreground">None</span>}</div></div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDetailTemplate(null)}>Close</Button>
            <Button onClick={() => { if (detailTemplate) createFromTemplate(detailTemplate); setDetailTemplate(null); }}><Copy className="h-4 w-4 mr-2" />Use Template</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EventTemplates;
