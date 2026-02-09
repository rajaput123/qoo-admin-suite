import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Plus, Pencil, Trash2, MonitorSmartphone, Clock, MapPin, Image, FileText, Settings } from "lucide-react";
import { toast } from "sonner";
import SearchableSelect from "@/components/SearchableSelect";
import CustomFieldsSection, { CustomField } from "@/components/CustomFieldsSection";

type CounterType = "donation" | "ticket" | "prasadam" | "info";

interface Counter {
  id: string;
  counterName: string;
  counterType: CounterType;
  parentStructure: string;
  description: string;
  status: "active" | "inactive";
  timings: string;
  location: string;
  services: string;
  guidelines: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

const mockCounters: Counter[] = [
  {
    id: "1",
    counterName: "Hundi Counter 1",
    counterType: "donation",
    parentStructure: "Main Temple",
    description: "Main donation collection counter for general donations and special contribution schemes.",
    status: "active",
    timings: "6:00 AM - 9:00 PM",
    location: "Main Entrance, Right Side",
    services: "General donations, Corpus fund contributions, Annadanam contributions, Special scheme donations",
    guidelines: "All donations above ₹500 are eligible for 80G tax exemption. Receipts are provided immediately. Online transfer details available.",
    images: [
      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400",
    ],
    createdAt: "2024-01-15",
    updatedAt: "2024-02-01",
  },
  {
    id: "2",
    counterName: "Darshan Ticket Counter",
    counterType: "ticket",
    parentStructure: "Main Temple",
    description: "Special darshan ticket booking counter for VIP and express darshan slots.",
    status: "active",
    timings: "5:00 AM - 8:00 PM",
    location: "Queue Complex, Counter 1-3",
    services: "VIP Darshan (₹300), Express Darshan (₹100), Special Seva Darshan, Senior Citizen Darshan",
    guidelines: "Valid ID proof required. One ticket per person. Children below 10 years free. Online booking recommended.",
    images: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400",
    ],
    createdAt: "2024-01-10",
    updatedAt: "2024-01-28",
  },
  {
    id: "3",
    counterName: "Prasadam Counter A",
    counterType: "prasadam",
    parentStructure: "Main Temple",
    description: "Laddu prasadam distribution counter for all devotees.",
    status: "active",
    timings: "7:00 AM - 8:00 PM",
    location: "Exit Gate, Left Side",
    services: "Laddu Prasadam (2 per person), Special Prasadam packets, Festival special items",
    guidelines: "One free laddu per darshan ticket. Additional laddus can be purchased. Fresh prasadam prepared daily.",
    images: [],
    createdAt: "2024-01-20",
    updatedAt: "2024-01-25",
  },
  {
    id: "4",
    counterName: "Information Desk",
    counterType: "info",
    parentStructure: "Main Temple",
    description: "Visitor information and assistance counter.",
    status: "active",
    timings: "6:00 AM - 10:00 PM",
    location: "Main Entrance Hall",
    services: "Temple information, Lost and found, Wheelchair assistance, Emergency contact, Tour guidance",
    guidelines: "Available in multiple languages. Assistance for specially-abled devotees. Free temple maps available.",
    images: [],
    createdAt: "2024-01-12",
    updatedAt: "2024-01-22",
  },
];

const counterTypeOptions = [
  { value: "donation", label: "Donation" },
  { value: "ticket", label: "Ticket" },
  { value: "prasadam", label: "Prasadam" },
  { value: "info", label: "Info" },
];

const parentOptions = [
  { value: "Main Temple", label: "Main Temple" },
  { value: "Padmavathi Shrine", label: "Padmavathi Shrine" },
  { value: "Varadaraja Shrine", label: "Varadaraja Shrine" },
  { value: "Kalyana Mandapam", label: "Kalyana Mandapam" },
];

const statusOptions = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

const getCounterTypeColor = (type: CounterType) => {
  switch (type) {
    case "donation": return "bg-primary/10 text-primary border-primary/20";
    case "ticket": return "bg-blue-100 text-blue-800 border-blue-200";
    case "prasadam": return "bg-amber-100 text-amber-800 border-amber-200";
    case "info": return "bg-purple-100 text-purple-800 border-purple-200";
    default: return "";
  }
};

const Counters = () => {
  const [counters, setCounters] = useState<Counter[]>(mockCounters);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editingCounter, setEditingCounter] = useState<Counter | null>(null);
  const [viewingCounter, setViewingCounter] = useState<Counter | null>(null);
  const [customFields, setCustomFields] = useState<CustomField[]>([]);
  const [isAddParentOpen, setIsAddParentOpen] = useState(false);
  const [isAddTypeOpen, setIsAddTypeOpen] = useState(false);
  const [formData, setFormData] = useState({
    counterName: "",
    counterType: "donation" as CounterType,
    parentStructure: "",
    description: "",
    status: "active" as "active" | "inactive",
    timings: "",
    location: "",
    services: "",
    guidelines: "",
  });

  const resetForm = () => {
    setFormData({
      counterName: "",
      counterType: "donation",
      parentStructure: "",
      description: "",
      status: "active",
      timings: "",
      location: "",
      services: "",
      guidelines: "",
    });
    setEditingCounter(null);
    setCustomFields([]);
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
        timings: counter.timings,
        location: counter.location,
        services: counter.services,
        guidelines: counter.guidelines,
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

  const handleRowClick = (counter: Counter) => {
    setViewingCounter(counter);
    setIsViewModalOpen(true);
  };

  const handleSave = () => {
    if (editingCounter) {
      setCounters(counters.map(c => 
        c.id === editingCounter.id 
          ? { ...c, ...formData, updatedAt: new Date().toISOString().split('T')[0] }
          : c
      ));
      toast.success("Counter updated successfully");
    } else {
      const newCounter: Counter = {
        id: Date.now().toString(),
        ...formData,
        images: [],
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
      };
      setCounters([...counters, newCounter]);
      toast.success("Counter added successfully");
    }
    handleCloseModal();
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCounters(counters.filter(c => c.id !== id));
    toast.success("Counter deleted successfully");
  };

  const handleEditFromView = () => {
    if (viewingCounter) {
      setIsViewModalOpen(false);
      handleOpenModal(viewingCounter);
    }
  };

  return (
    <div className="p-6 space-y-6">
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
                <TableHead>Timings</TableHead>
                <TableHead>Parent Structure</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {counters.map((counter) => (
                <TableRow 
                  key={counter.id} 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleRowClick(counter)}
                >
                  <TableCell className="font-medium">{counter.counterName}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getCounterTypeColor(counter.counterType)}>
                      {counter.counterType.charAt(0).toUpperCase() + counter.counterType.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{counter.timings}</TableCell>
                  <TableCell>{counter.parentStructure}</TableCell>
                  <TableCell>
                    <Badge variant={counter.status === "active" ? "default" : "secondary"}>
                      {counter.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenModal(counter);
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={(e) => handleDelete(counter.id, e)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {counters.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                    No counters configured. Click "Add Counter" to create one.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Details Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-y-auto bg-background">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <MonitorSmartphone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <DialogTitle>{viewingCounter?.counterName}</DialogTitle>
                  <DialogDescription>{viewingCounter?.parentStructure}</DialogDescription>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={getCounterTypeColor(viewingCounter?.counterType || "info")}>
                  {viewingCounter?.counterType.charAt(0).toUpperCase() + (viewingCounter?.counterType.slice(1) || "")}
                </Badge>
                <Badge variant={viewingCounter?.status === "active" ? "default" : "secondary"}>
                  {viewingCounter?.status}
                </Badge>
              </div>
            </div>
          </DialogHeader>

          <Tabs defaultValue="overview" className="mt-4">
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
              <TabsTrigger value="overview" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">
                Overview
              </TabsTrigger>
              <TabsTrigger value="details" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">
                Details
              </TabsTrigger>
              <TabsTrigger value="timings" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">
                Timings
              </TabsTrigger>
              <TabsTrigger value="services" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">
                Services
              </TabsTrigger>
              <TabsTrigger value="guidelines" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">
                Guidelines
              </TabsTrigger>
              <TabsTrigger value="gallery" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">
                Gallery
              </TabsTrigger>
              <TabsTrigger value="location" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">
                Location
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-4 space-y-4">
              {viewingCounter?.images && viewingCounter.images.length > 0 && (
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src={viewingCounter.images[0]} 
                    alt={viewingCounter.counterName}
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}
              <div>
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-sm text-muted-foreground">{viewingCounter?.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground">Counter Type</p>
                  <p className="font-medium capitalize">{viewingCounter?.counterType}</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground">Operating Hours</p>
                  <p className="font-medium">{viewingCounter?.timings}</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="details" className="mt-4 space-y-4">
              <div className="grid gap-4">
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Counter Name</p>
                  <p className="font-medium">{viewingCounter?.counterName}</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Counter Type</p>
                  <p className="font-medium capitalize">{viewingCounter?.counterType}</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Description</p>
                  <p className="font-medium">{viewingCounter?.description}</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="timings" className="mt-4">
              <div className="flex items-start gap-3 p-4 border rounded-lg">
                <Clock className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Operating Hours</p>
                  <p className="text-sm text-muted-foreground mt-1">{viewingCounter?.timings}</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="services" className="mt-4">
              <div className="flex items-start gap-3 p-4 border rounded-lg">
                <Settings className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Available Services</p>
                  <p className="text-sm text-muted-foreground mt-1">{viewingCounter?.services}</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="guidelines" className="mt-4">
              <div className="flex items-start gap-3 p-4 border rounded-lg">
                <FileText className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Guidelines & Policies</p>
                  <p className="text-sm text-muted-foreground mt-1">{viewingCounter?.guidelines}</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="gallery" className="mt-4">
              {viewingCounter?.images && viewingCounter.images.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                  {viewingCounter.images.map((img, idx) => (
                    <div key={idx} className="rounded-lg overflow-hidden border">
                      <img 
                        src={img} 
                        alt={`${viewingCounter.counterName} ${idx + 1}`}
                        className="w-full h-32 object-cover"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                  <Image className="h-12 w-12 mb-2 opacity-50" />
                  <p>No images available</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="location" className="mt-4">
              <div className="flex items-start gap-3 p-4 border rounded-lg">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Location within Temple</p>
                  <p className="text-sm text-muted-foreground mt-1">{viewingCounter?.location}</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>Close</Button>
            <Button onClick={handleEditFromView}>
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add/Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto bg-background">
          <DialogHeader>
            <DialogTitle>{editingCounter ? "Edit Counter" : "Add New Counter"}</DialogTitle>
            <DialogDescription>
              {editingCounter ? "Update counter details" : "Create a new service counter"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
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
                <Label>Counter Type</Label>
                <SearchableSelect
                  options={counterTypeOptions}
                  value={formData.counterType}
                  onValueChange={(value) => setFormData({ ...formData, counterType: value as CounterType })}
                  placeholder="Select type"
                  searchPlaceholder="Search types..."
                  onAddNew={() => setIsAddTypeOpen(true)}
                  addNewLabel="Add New Type"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Parent Structure</Label>
                <SearchableSelect
                  options={parentOptions}
                  value={formData.parentStructure}
                  onValueChange={(value) => setFormData({ ...formData, parentStructure: value })}
                  placeholder="Select parent"
                  searchPlaceholder="Search structures..."
                  onAddNew={() => setIsAddParentOpen(true)}
                  addNewLabel="Add New Structure"
                />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <SearchableSelect
                  options={statusOptions}
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value as "active" | "inactive" })}
                  placeholder="Select status"
                  searchPlaceholder="Search..."
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="timings">Timings</Label>
                <Input
                  id="timings"
                  value={formData.timings}
                  onChange={(e) => setFormData({ ...formData, timings: e.target.value })}
                  placeholder="e.g., 6:00 AM - 9:00 PM"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g., Main Entrance, Right Side"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter counter description"
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="services">Services</Label>
              <Textarea
                id="services"
                value={formData.services}
                onChange={(e) => setFormData({ ...formData, services: e.target.value })}
                placeholder="List services provided at this counter"
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="guidelines">Guidelines</Label>
              <Textarea
                id="guidelines"
                value={formData.guidelines}
                onChange={(e) => setFormData({ ...formData, guidelines: e.target.value })}
                placeholder="Enter guidelines and policies"
                rows={3}
              />
            </div>

            <Separator />

            {/* Custom Fields */}
            <CustomFieldsSection fields={customFields} onFieldsChange={setCustomFields} />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseModal}>Cancel</Button>
            <Button onClick={handleSave}>{editingCounter ? "Update" : "Add"} Counter</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add New Counter Type Dialog */}
      <Dialog open={isAddTypeOpen} onOpenChange={setIsAddTypeOpen}>
        <DialogContent className="sm:max-w-[400px] bg-background">
          <DialogHeader>
            <DialogTitle>Add New Counter Type</DialogTitle>
            <DialogDescription>Create a new counter type</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Type Name</Label>
              <Input placeholder="Enter type name" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddTypeOpen(false)}>Cancel</Button>
            <Button onClick={() => { setIsAddTypeOpen(false); toast.success("Type added"); }}>Add Type</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add New Parent Structure Dialog */}
      <Dialog open={isAddParentOpen} onOpenChange={setIsAddParentOpen}>
        <DialogContent className="sm:max-w-[400px] bg-background">
          <DialogHeader>
            <DialogTitle>Add New Structure</DialogTitle>
            <DialogDescription>Create a new parent structure</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Structure Name</Label>
              <Input placeholder="Enter structure name" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddParentOpen(false)}>Cancel</Button>
            <Button onClick={() => { setIsAddParentOpen(false); toast.success("Structure added"); }}>Add Structure</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Counters;
