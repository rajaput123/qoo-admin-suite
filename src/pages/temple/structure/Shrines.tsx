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
import { Plus, Pencil, Trash2, Landmark } from "lucide-react";
import { toast } from "sonner";

interface Shrine {
  id: string;
  shrineName: string;
  associatedDeity: string;
  parentStructure: string;
  description: string;
  status: "active" | "inactive";
}

const mockShrines: Shrine[] = [
  {
    id: "1",
    shrineName: "Padmavathi Shrine",
    associatedDeity: "Goddess Padmavathi",
    parentStructure: "Main Temple",
    description: "Dedicated to the consort of Lord Venkateswara",
    status: "active",
  },
  {
    id: "2",
    shrineName: "Varadaraja Shrine",
    associatedDeity: "Lord Varadaraja",
    parentStructure: "Main Temple",
    description: "Ancient shrine dedicated to Lord Vishnu in standing posture",
    status: "active",
  },
  {
    id: "3",
    shrineName: "Lakshmi Shrine",
    associatedDeity: "Goddess Lakshmi",
    parentStructure: "Main Temple",
    description: "Shrine for prosperity and blessings",
    status: "inactive",
  },
];

const parentOptions = ["Main Temple", "Padmavathi Shrine", "Varadaraja Shrine"];

const Shrines = () => {
  const [shrines, setShrines] = useState<Shrine[]>(mockShrines);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingShrine, setEditingShrine] = useState<Shrine | null>(null);
  const [formData, setFormData] = useState({
    shrineName: "",
    associatedDeity: "",
    parentStructure: "",
    description: "",
    status: "active" as "active" | "inactive",
  });

  const resetForm = () => {
    setFormData({
      shrineName: "",
      associatedDeity: "",
      parentStructure: "",
      description: "",
      status: "active",
    });
    setEditingShrine(null);
  };

  const handleOpenModal = (shrine?: Shrine) => {
    if (shrine) {
      setEditingShrine(shrine);
      setFormData({
        shrineName: shrine.shrineName,
        associatedDeity: shrine.associatedDeity,
        parentStructure: shrine.parentStructure,
        description: shrine.description,
        status: shrine.status,
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
    if (editingShrine) {
      setShrines(shrines.map(s => 
        s.id === editingShrine.id 
          ? { ...s, ...formData }
          : s
      ));
      toast.success("Shrine updated successfully");
    } else {
      const newShrine: Shrine = {
        id: Date.now().toString(),
        ...formData,
      };
      setShrines([...shrines, newShrine]);
      toast.success("Shrine added successfully");
    }
    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    setShrines(shrines.filter(s => s.id !== id));
    toast.success("Shrine deleted successfully");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Shrines / Sub Temples</h1>
          <p className="text-muted-foreground">Define sub-temples or deity-specific areas</p>
        </div>
        <Button onClick={() => handleOpenModal()}>
          <Plus className="h-4 w-4 mr-2" />
          Add Shrine
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Landmark className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>All Shrines</CardTitle>
              <CardDescription>{shrines.length} shrines configured</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Shrine Name</TableHead>
                <TableHead>Associated Deity</TableHead>
                <TableHead>Parent Structure</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shrines.map((shrine) => (
                <TableRow key={shrine.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-medium">{shrine.shrineName}</TableCell>
                  <TableCell>{shrine.associatedDeity}</TableCell>
                  <TableCell>{shrine.parentStructure}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{shrine.description}</TableCell>
                  <TableCell>
                    <Badge variant={shrine.status === "active" ? "default" : "secondary"}>
                      {shrine.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleOpenModal(shrine)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(shrine.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {shrines.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                    No shrines configured. Click "Add Shrine" to create one.
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
            <DialogTitle>{editingShrine ? "Edit Shrine" : "Add New Shrine"}</DialogTitle>
            <DialogDescription>
              {editingShrine ? "Update shrine details" : "Create a new shrine or sub-temple"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="shrineName">Shrine Name</Label>
              <Input
                id="shrineName"
                value={formData.shrineName}
                onChange={(e) => setFormData({ ...formData, shrineName: e.target.value })}
                placeholder="Enter shrine name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="associatedDeity">Associated Deity</Label>
              <Input
                id="associatedDeity"
                value={formData.associatedDeity}
                onChange={(e) => setFormData({ ...formData, associatedDeity: e.target.value })}
                placeholder="Enter deity name"
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
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter description"
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
            <Button onClick={handleSave}>{editingShrine ? "Update" : "Add"} Shrine</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Shrines;
