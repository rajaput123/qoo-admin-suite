import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, Heart } from "lucide-react";
import { toast } from "sonner";

interface SacredArea {
  id: string;
  sacredName: string;
  guruName: string;
  year: string;
  parentStructure: string;
  notes: string;
  status: "active" | "inactive";
}

const mockSacredAreas: SacredArea[] = [
  {
    id: "1",
    sacredName: "Swami Samadhi",
    guruName: "Sri Ramanujacharya",
    year: "1137",
    parentStructure: "Main Temple",
    notes: "Sacred resting place of the great Vaishnava saint",
    status: "active",
  },
  {
    id: "2",
    sacredName: "Guru Mandapam",
    guruName: "Sri Vedanta Desika",
    year: "1369",
    parentStructure: "Main Temple",
    notes: "Memorial for the renowned philosopher and poet",
    status: "active",
  },
];

const parentOptions = ["Main Temple", "Padmavathi Shrine", "Varadaraja Shrine"];

const Sacred = () => {
  const [sacredAreas, setSacredAreas] = useState<SacredArea[]>(mockSacredAreas);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArea, setEditingArea] = useState<SacredArea | null>(null);
  const [formData, setFormData] = useState({
    sacredName: "",
    guruName: "",
    year: "",
    parentStructure: "",
    notes: "",
    status: "active" as "active" | "inactive",
  });

  const resetForm = () => {
    setFormData({
      sacredName: "",
      guruName: "",
      year: "",
      parentStructure: "",
      notes: "",
      status: "active",
    });
    setEditingArea(null);
  };

  const handleOpenModal = (area?: SacredArea) => {
    if (area) {
      setEditingArea(area);
      setFormData({
        sacredName: area.sacredName,
        guruName: area.guruName,
        year: area.year,
        parentStructure: area.parentStructure,
        notes: area.notes,
        status: area.status,
      });
    } else {
      resetForm();
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleSave = () => {
    if (editingArea) {
      setSacredAreas(sacredAreas.map(a => 
        a.id === editingArea.id 
          ? { ...a, ...formData }
          : a
      ));
      toast.success("Sacred area updated successfully");
    } else {
      const newArea: SacredArea = {
        id: Date.now().toString(),
        ...formData,
      };
      setSacredAreas([...sacredAreas, newArea]);
      toast.success("Sacred area added successfully");
    }
    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    setSacredAreas(sacredAreas.filter(a => a.id !== id));
    toast.success("Sacred area deleted successfully");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Sacred (Samadhi)</h1>
          <p className="text-muted-foreground">Define sacred memorial or spiritually significant areas</p>
        </div>
        <Button onClick={() => handleOpenModal()}>
          <Plus className="h-4 w-4 mr-2" />
          Add Sacred Area
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Heart className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>All Sacred Areas</CardTitle>
              <CardDescription>{sacredAreas.length} sacred areas configured</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sacred Name</TableHead>
                <TableHead>Guru Name</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Parent Structure</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sacredAreas.map((area) => (
                <TableRow key={area.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-medium">{area.sacredName}</TableCell>
                  <TableCell>{area.guruName}</TableCell>
                  <TableCell>{area.year}</TableCell>
                  <TableCell>{area.parentStructure}</TableCell>
                  <TableCell>
                    <Badge variant={area.status === "active" ? "default" : "secondary"}>
                      {area.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleOpenModal(area)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(area.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {sacredAreas.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                    No sacred areas configured. Click "Add Sacred Area" to create one.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{editingArea ? "Edit Sacred Area" : "Add New Sacred Area"}</DialogTitle>
            <DialogDescription>
              {editingArea ? "Update sacred area details" : "Create a new sacred or samadhi area"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="sacredName">Sacred Name</Label>
              <Input
                id="sacredName"
                value={formData.sacredName}
                onChange={(e) => setFormData({ ...formData, sacredName: e.target.value })}
                placeholder="Enter sacred area name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="guruName">Guru Name</Label>
              <Input
                id="guruName"
                value={formData.guruName}
                onChange={(e) => setFormData({ ...formData, guruName: e.target.value })}
                placeholder="Enter guru name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="year">Year Established</Label>
              <Input
                id="year"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                placeholder="Enter year"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="parentStructure">Parent Structure</Label>
              <Select
                value={formData.parentStructure}
                onValueChange={(value) => setFormData({ ...formData, parentStructure: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select parent structure" />
                </SelectTrigger>
                <SelectContent>
                  {parentOptions.map((option) => (
                    <SelectItem key={option} value={option}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Enter notes"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: "active" | "inactive") => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseModal}>Cancel</Button>
            <Button onClick={handleSave}>{editingArea ? "Update" : "Add"} Sacred Area</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Sacred;
