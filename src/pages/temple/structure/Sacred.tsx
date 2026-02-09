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
import { Plus, Pencil, Trash2, Heart, Clock, MapPin, Image, History, Users } from "lucide-react";
import { toast } from "sonner";
import SearchableSelect from "@/components/SearchableSelect";
import CustomFieldsSection, { CustomField } from "@/components/CustomFieldsSection";

interface SacredArea {
  id: string;
  sacredName: string;
  guruName: string;
  year: string;
  parentStructure: string;
  notes: string;
  status: "active" | "inactive";
  timings: string;
  location: string;
  history: string;
  rituals: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
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
    timings: "5:00 AM - 9:00 PM",
    location: "Inner Sanctum, East Wing",
    history: "Sri Ramanujacharya (1017-1137 CE) was a philosopher and theologian who consolidated the Vishishtadvaita Vedanta school of Hindu philosophy. His samadhi is considered one of the most sacred sites in the temple.",
    rituals: "Daily abhishekam at 6:00 AM. Special pujas on Tirunakshatra days. Annual Brahmotsavam celebration.",
    images: [
      "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?w=400",
      "https://images.unsplash.com/photo-1600693577615-9f3a0f7a16ba?w=400",
    ],
    createdAt: "2024-01-15",
    updatedAt: "2024-02-01",
  },
  {
    id: "2",
    sacredName: "Guru Mandapam",
    guruName: "Sri Vedanta Desika",
    year: "1369",
    parentStructure: "Main Temple",
    notes: "Memorial for the renowned philosopher and poet",
    status: "active",
    timings: "6:00 AM - 8:00 PM",
    location: "South Wing, First Floor",
    history: "Sri Vedanta Desika (1268-1369 CE) was one of the most brilliant philosophers in Hindu tradition. This mandapam was built to honor his contributions to Vaishnavism.",
    rituals: "Weekly discourse on Thursdays. Special celebrations on his Tirunakshatra.",
    images: [
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400",
    ],
    createdAt: "2024-01-10",
    updatedAt: "2024-01-28",
  },
];

const parentOptions = [
  { value: "Main Temple", label: "Main Temple" },
  { value: "Padmavathi Shrine", label: "Padmavathi Shrine" },
  { value: "Varadaraja Shrine", label: "Varadaraja Shrine" },
];

const statusOptions = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

const guruOptions = [
  { value: "Sri Ramanujacharya", label: "Sri Ramanujacharya" },
  { value: "Sri Vedanta Desika", label: "Sri Vedanta Desika" },
  { value: "Sri Manavala Mamunigal", label: "Sri Manavala Mamunigal" },
];

const Sacred = () => {
  const [sacredAreas, setSacredAreas] = useState<SacredArea[]>(mockSacredAreas);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editingArea, setEditingArea] = useState<SacredArea | null>(null);
  const [viewingArea, setViewingArea] = useState<SacredArea | null>(null);
  const [customFields, setCustomFields] = useState<CustomField[]>([]);
  const [isAddGuruOpen, setIsAddGuruOpen] = useState(false);
  const [isAddParentOpen, setIsAddParentOpen] = useState(false);
  const [formData, setFormData] = useState({
    sacredName: "",
    guruName: "",
    year: "",
    parentStructure: "",
    notes: "",
    status: "active" as "active" | "inactive",
    timings: "",
    location: "",
    history: "",
    rituals: "",
  });

  const resetForm = () => {
    setFormData({
      sacredName: "",
      guruName: "",
      year: "",
      parentStructure: "",
      notes: "",
      status: "active",
      timings: "",
      location: "",
      history: "",
      rituals: "",
    });
    setEditingArea(null);
    setCustomFields([]);
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
        timings: area.timings,
        location: area.location,
        history: area.history,
        rituals: area.rituals,
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

  const handleRowClick = (area: SacredArea) => {
    setViewingArea(area);
    setIsViewModalOpen(true);
  };

  const handleSave = () => {
    if (editingArea) {
      setSacredAreas(sacredAreas.map(a => 
        a.id === editingArea.id 
          ? { ...a, ...formData, updatedAt: new Date().toISOString().split('T')[0] }
          : a
      ));
      toast.success("Sacred area updated successfully");
    } else {
      const newArea: SacredArea = {
        id: Date.now().toString(),
        ...formData,
        images: [],
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
      };
      setSacredAreas([...sacredAreas, newArea]);
      toast.success("Sacred area added successfully");
    }
    handleCloseModal();
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSacredAreas(sacredAreas.filter(a => a.id !== id));
    toast.success("Sacred area deleted successfully");
  };

  const handleEditFromView = () => {
    if (viewingArea) {
      setIsViewModalOpen(false);
      handleOpenModal(viewingArea);
    }
  };

  return (
    <div className="p-6 space-y-6">
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
                <TableRow 
                  key={area.id} 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleRowClick(area)}
                >
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
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenModal(area);
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={(e) => handleDelete(area.id, e)}
                      >
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

      {/* View Details Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-y-auto bg-background">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Heart className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <DialogTitle>{viewingArea?.sacredName}</DialogTitle>
                  <DialogDescription>{viewingArea?.guruName} • Est. {viewingArea?.year}</DialogDescription>
                </div>
              </div>
              <Badge variant={viewingArea?.status === "active" ? "default" : "secondary"}>
                {viewingArea?.status}
              </Badge>
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
              <TabsTrigger value="rituals" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">
                Rituals
              </TabsTrigger>
              <TabsTrigger value="gallery" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">
                Gallery
              </TabsTrigger>
              <TabsTrigger value="history" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">
                History
              </TabsTrigger>
              <TabsTrigger value="location" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">
                Location
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-4 space-y-4">
              {viewingArea?.images && viewingArea.images.length > 0 && (
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src={viewingArea.images[0]} 
                    alt={viewingArea.sacredName}
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}
              <div>
                <h4 className="font-medium mb-2">About</h4>
                <p className="text-sm text-muted-foreground">{viewingArea?.notes}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground">Year Established</p>
                  <p className="font-medium">{viewingArea?.year}</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground">Parent Structure</p>
                  <p className="font-medium">{viewingArea?.parentStructure}</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="details" className="mt-4 space-y-4">
              <div className="grid gap-4">
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Sacred Name</p>
                  <p className="font-medium">{viewingArea?.sacredName}</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Guru Name</p>
                  <p className="font-medium">{viewingArea?.guruName}</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Notes</p>
                  <p className="font-medium">{viewingArea?.notes}</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="timings" className="mt-4">
              <div className="flex items-start gap-3 p-4 border rounded-lg">
                <Clock className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Visiting Hours</p>
                  <p className="text-sm text-muted-foreground mt-1">{viewingArea?.timings}</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="rituals" className="mt-4">
              <div className="flex items-start gap-3 p-4 border rounded-lg">
                <Users className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Rituals & Ceremonies</p>
                  <p className="text-sm text-muted-foreground mt-1">{viewingArea?.rituals}</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="gallery" className="mt-4">
              {viewingArea?.images && viewingArea.images.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                  {viewingArea.images.map((img, idx) => (
                    <div key={idx} className="rounded-lg overflow-hidden border">
                      <img 
                        src={img} 
                        alt={`${viewingArea.sacredName} ${idx + 1}`}
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

            <TabsContent value="history" className="mt-4">
              <div className="flex items-start gap-3 p-4 border rounded-lg">
                <History className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Historical Background</p>
                  <p className="text-sm text-muted-foreground mt-1">{viewingArea?.history}</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="location" className="mt-4">
              <div className="flex items-start gap-3 p-4 border rounded-lg">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Location within Temple</p>
                  <p className="text-sm text-muted-foreground mt-1">{viewingArea?.location}</p>
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
            <DialogTitle>{editingArea ? "Edit Sacred Area" : "Add New Sacred Area"}</DialogTitle>
            <DialogDescription>
              {editingArea ? "Update sacred area details" : "Create a new sacred or samadhi area"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sacredName">Sacred Name</Label>
                <Input
                  id="sacredName"
                  value={formData.sacredName}
                  onChange={(e) => setFormData({ ...formData, sacredName: e.target.value })}
                  placeholder="Enter name"
                />
              </div>
              <div className="space-y-2">
                <Label>Guru Name</Label>
                <SearchableSelect
                  options={guruOptions}
                  value={formData.guruName}
                  onValueChange={(value) => setFormData({ ...formData, guruName: value })}
                  placeholder="Select guru"
                  searchPlaceholder="Search gurus..."
                  onAddNew={() => setIsAddGuruOpen(true)}
                  addNewLabel="Add New Guru"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
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
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="timings">Timings</Label>
                <Input
                  id="timings"
                  value={formData.timings}
                  onChange={(e) => setFormData({ ...formData, timings: e.target.value })}
                  placeholder="e.g., 6:00 AM - 8:00 PM"
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
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g., Inner Sanctum, East Wing"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Enter notes about this sacred area"
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rituals">Rituals & Ceremonies</Label>
              <Textarea
                id="rituals"
                value={formData.rituals}
                onChange={(e) => setFormData({ ...formData, rituals: e.target.value })}
                placeholder="Enter rituals performed here"
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="history">History</Label>
              <Textarea
                id="history"
                value={formData.history}
                onChange={(e) => setFormData({ ...formData, history: e.target.value })}
                placeholder="Enter historical background"
                rows={3}
              />
            </div>

            <Separator />

            {/* Custom Fields */}
            <CustomFieldsSection fields={customFields} onFieldsChange={setCustomFields} />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseModal}>Cancel</Button>
            <Button onClick={handleSave}>{editingArea ? "Update" : "Add"} Sacred Area</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add New Guru Dialog */}
      <Dialog open={isAddGuruOpen} onOpenChange={setIsAddGuruOpen}>
        <DialogContent className="sm:max-w-[400px] bg-background">
          <DialogHeader>
            <DialogTitle>Add New Guru</DialogTitle>
            <DialogDescription>Create a new guru entry</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Guru Name</Label>
              <Input placeholder="Enter guru name" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddGuruOpen(false)}>Cancel</Button>
            <Button onClick={() => { setIsAddGuruOpen(false); toast.success("Guru added"); }}>Add Guru</Button>
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

export default Sacred;
