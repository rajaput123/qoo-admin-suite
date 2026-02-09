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
import { Plus, Pencil, Trash2, MonitorSmartphone } from "lucide-react";
import { toast } from "sonner";

type CounterType = "donation" | "ticket" | "prasadam" | "info";

interface Counter {
  id: string;
  counterName: string;
  counterType: CounterType;
  parentStructure: string;
  description: string;
  status: "active" | "inactive";
}

const mockCounters: Counter[] = [
  {
    id: "1",
    counterName: "Hundi Counter 1",
    counterType: "donation",
    parentStructure: "Main Temple",
    description: "Main donation collection counter",
    status: "active",
  },
  {
    id: "2",
    counterName: "Darshan Ticket Counter",
    counterType: "ticket",
    parentStructure: "Main Temple",
    description: "Special darshan ticket booking",
    status: "active",
  },
  {
    id: "3",
    counterName: "Prasadam Counter A",
    counterType: "prasadam",
    parentStructure: "Main Temple",
    description: "Laddu prasadam distribution",
    status: "active",
  },
  {
    id: "4",
    counterName: "Information Desk",
    counterType: "info",
    parentStructure: "Main Temple",
    description: "Visitor information and assistance",
    status: "active",
  },
];

const counterTypes: { value: CounterType; label: string }[] = [
  { value: "donation", label: "Donation" },
  { value: "ticket", label: "Ticket" },
  { value: "prasadam", label: "Prasadam" },
  { value: "info", label: "Info" },
];

const parentOptions = ["Main Temple", "Padmavathi Shrine", "Varadaraja Shrine", "Kalyana Mandapam"];

const getCounterTypeColor = (type: CounterType) => {
  switch (type) {
    case "donation": return "bg-green-100 text-green-800 border-green-200";
    case "ticket": return "bg-blue-100 text-blue-800 border-blue-200";
    case "prasadam": return "bg-amber-100 text-amber-800 border-amber-200";
    case "info": return "bg-purple-100 text-purple-800 border-purple-200";
    default: return "";
  }
};

const Counters = () => {
  const [counters, setCounters] = useState<Counter[]>(mockCounters);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCounter, setEditingCounter] = useState<Counter | null>(null);
  const [formData, setFormData] = useState({
    counterName: "",
    counterType: "donation" as CounterType,
    parentStructure: "",
    description: "",
    status: "active" as "active" | "inactive",
  });

  const resetForm = () => {
    setFormData({
      counterName: "",
      counterType: "donation",
      parentStructure: "",
      description: "",
      status: "active",
    });
    setEditingCounter(null);
  };

  const handleOpenModal = (counter?: Counter) => {
    if (counter) {
      setEditingCounter(counter);
      setFormData({
        counterName: counter.counterName,
        counterType: counter.counterType,
        parentStructure: counter.parentStructure,
        description: counter.description,
        status: counter.status,
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
    if (editingCounter) {
      setCounters(counters.map(c => 
        c.id === editingCounter.id 
          ? { ...c, ...formData }
          : c
      ));
      toast.success("Counter updated successfully");
    } else {
      const newCounter: Counter = {
        id: Date.now().toString(),
        ...formData,
      };
      setCounters([...counters, newCounter]);
      toast.success("Counter added successfully");
    }
    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    setCounters(counters.filter(c => c.id !== id));
    toast.success("Counter deleted successfully");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Counters</h1>
          <p className="text-muted-foreground">Define service counters such as donation, ticket, or prasadam counters</p>
        </div>
        <Button onClick={() => handleOpenModal()}>
          <Plus className="h-4 w-4 mr-2" />
          Add Counter
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <MonitorSmartphone className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>All Counters</CardTitle>
              <CardDescription>{counters.length} counters configured</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Counter Name</TableHead>
                <TableHead>Counter Type</TableHead>
                <TableHead>Parent Structure</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {counters.map((counter) => (
                <TableRow key={counter.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-medium">{counter.counterName}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getCounterTypeColor(counter.counterType)}>
                      {counter.counterType.charAt(0).toUpperCase() + counter.counterType.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{counter.parentStructure}</TableCell>
                  <TableCell>
                    <Badge variant={counter.status === "active" ? "default" : "secondary"}>
                      {counter.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleOpenModal(counter)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(counter.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {counters.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                    No counters configured. Click "Add Counter" to create one.
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
            <DialogTitle>{editingCounter ? "Edit Counter" : "Add New Counter"}</DialogTitle>
            <DialogDescription>
              {editingCounter ? "Update counter details" : "Create a new service counter"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="counterName">Counter Name</Label>
              <Input
                id="counterName"
                value={formData.counterName}
                onChange={(e) => setFormData({ ...formData, counterName: e.target.value })}
                placeholder="Enter counter name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="counterType">Counter Type</Label>
              <Select
                value={formData.counterType}
                onValueChange={(value: CounterType) => setFormData({ ...formData, counterType: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {counterTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
            <Button onClick={handleSave}>{editingCounter ? "Update" : "Add"} Counter</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Counters;
