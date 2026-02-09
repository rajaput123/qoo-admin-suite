import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, DoorOpen, Check, X } from "lucide-react";
import { toast } from "sonner";

interface Hall {
  id: string;
  hallName: string;
  capacity: number;
  bookingAllowed: boolean;
  parentStructure: string;
  description: string;
  status: "active" | "inactive";
}

const mockHalls: Hall[] = [
  {
    id: "1",
    hallName: "Kalyana Mandapam",
    capacity: 500,
    bookingAllowed: true,
    parentStructure: "Main Temple",
    description: "Wedding and special ceremony hall",
    status: "active",
  },
  {
    id: "2",
    hallName: "Annadanam Hall",
    capacity: 1000,
    bookingAllowed: false,
    parentStructure: "Main Temple",
    description: "Community dining hall for prasadam distribution",
    status: "active",
  },
  {
    id: "3",
    hallName: "Sabha Mandapam",
    capacity: 200,
    bookingAllowed: true,
    parentStructure: "Main Temple",
    description: "Assembly hall for religious discourses and events",
    status: "active",
  },
];

const parentOptions = ["Main Temple", "Padmavathi Shrine", "Varadaraja Shrine"];

const Halls = () => {
  const [halls, setHalls] = useState<Hall[]>(mockHalls);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHall, setEditingHall] = useState<Hall | null>(null);
  const [formData, setFormData] = useState({
    hallName: "",
    capacity: 0,
    bookingAllowed: true,
    parentStructure: "",
    description: "",
    status: "active" as "active" | "inactive",
  });

  const resetForm = () => {
    setFormData({
      hallName: "",
      capacity: 0,
      bookingAllowed: true,
      parentStructure: "",
      description: "",
      status: "active",
    });
    setEditingHall(null);
  };

  const handleOpenModal = (hall?: Hall) => {
    if (hall) {
      setEditingHall(hall);
      setFormData({
        hallName: hall.hallName,
        capacity: hall.capacity,
        bookingAllowed: hall.bookingAllowed,
        parentStructure: hall.parentStructure,
        description: hall.description,
        status: hall.status,
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
    if (editingHall) {
      setHalls(halls.map(h => 
        h.id === editingHall.id 
          ? { ...h, ...formData }
          : h
      ));
      toast.success("Hall updated successfully");
    } else {
      const newHall: Hall = {
        id: Date.now().toString(),
        ...formData,
      };
      setHalls([...halls, newHall]);
      toast.success("Hall added successfully");
    }
    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    setHalls(halls.filter(h => h.id !== id));
    toast.success("Hall deleted successfully");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Halls</h1>
          <p className="text-muted-foreground">Define bookable or event spaces inside temple</p>
        </div>
        <Button onClick={() => handleOpenModal()}>
          <Plus className="h-4 w-4 mr-2" />
          Add Hall
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <DoorOpen className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>All Halls</CardTitle>
              <CardDescription>{halls.length} halls configured</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Hall Name</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Booking Allowed</TableHead>
                <TableHead>Parent Structure</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {halls.map((hall) => (
                <TableRow key={hall.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-medium">{hall.hallName}</TableCell>
                  <TableCell>{hall.capacity.toLocaleString()}</TableCell>
                  <TableCell>
                    {hall.bookingAllowed ? (
                      <div className="flex items-center gap-1 text-green-600">
                        <Check className="h-4 w-4" />
                        <span>Yes</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <X className="h-4 w-4" />
                        <span>No</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>{hall.parentStructure}</TableCell>
                  <TableCell>
                    <Badge variant={hall.status === "active" ? "default" : "secondary"}>
                      {hall.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleOpenModal(hall)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(hall.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {halls.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                    No halls configured. Click "Add Hall" to create one.
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
            <DialogTitle>{editingHall ? "Edit Hall" : "Add New Hall"}</DialogTitle>
            <DialogDescription>
              {editingHall ? "Update hall details" : "Create a new hall or event space"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="hallName">Hall Name</Label>
              <Input
                id="hallName"
                value={formData.hallName}
                onChange={(e) => setFormData({ ...formData, hallName: e.target.value })}
                placeholder="Enter hall name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="capacity">Capacity</Label>
              <Input
                id="capacity"
                type="number"
                value={formData.capacity || ""}
                onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) || 0 })}
                placeholder="Enter capacity"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="bookingAllowed">Booking Allowed</Label>
                <p className="text-sm text-muted-foreground">Enable online booking for this hall</p>
              </div>
              <Switch
                id="bookingAllowed"
                checked={formData.bookingAllowed}
                onCheckedChange={(checked) => setFormData({ ...formData, bookingAllowed: checked })}
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
            <Button onClick={handleSave}>{editingHall ? "Update" : "Add"} Hall</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Halls;
