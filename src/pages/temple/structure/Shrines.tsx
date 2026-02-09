import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, Landmark, X, Clock, MapPin, Image, History, FileText } from "lucide-react";
import { toast } from "sonner";

interface Shrine {
  id: string;
  shrineName: string;
  associatedDeity: string;
  parentStructure: string;
  description: string;
  status: "active" | "inactive";
  timings: string;
  location: string;
  history: string;
  dressCode: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

const mockShrines: Shrine[] = [
  {
    id: "1",
    shrineName: "Padmavathi Shrine",
    associatedDeity: "Goddess Padmavathi",
    parentStructure: "Main Temple",
    description: "Dedicated to the consort of Lord Venkateswara. This sacred shrine is adorned with intricate carvings and gold-plated doors. Devotees offer special prayers here before visiting the main temple.",
    status: "active",
    timings: "5:00 AM - 9:00 PM",
    location: "North Wing, Ground Floor",
    history: "Established in 1509 AD during the reign of Krishnadevaraya. The shrine was renovated in 1987 with gold plating sponsored by devotees.",
    dressCode: "Traditional attire preferred. Men: Dhoti/Formal pants. Women: Saree/Salwar.",
    images: [
      "https://images.unsplash.com/photo-1600693577615-9f3a0f7a16ba?w=400",
      "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?w=400",
    ],
    createdAt: "2024-01-15",
    updatedAt: "2024-02-01",
  },
  {
    id: "2",
    shrineName: "Varadaraja Shrine",
    associatedDeity: "Lord Varadaraja",
    parentStructure: "Main Temple",
    description: "Ancient shrine dedicated to Lord Vishnu in standing posture. Features beautiful stone sculptures from the Chola period.",
    status: "active",
    timings: "6:00 AM - 8:00 PM",
    location: "East Wing, Ground Floor",
    history: "Originally built in 1200 AD. The current structure dates from the 16th century Vijayanagara period.",
    dressCode: "Traditional attire required for special poojas.",
    images: [
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400",
    ],
    createdAt: "2024-01-10",
    updatedAt: "2024-01-28",
  },
  {
    id: "3",
    shrineName: "Lakshmi Shrine",
    associatedDeity: "Goddess Lakshmi",
    parentStructure: "Main Temple",
    description: "Shrine for prosperity and blessings. Special abhishekam performed on Fridays.",
    status: "inactive",
    timings: "7:00 AM - 7:00 PM",
    location: "South Wing, Ground Floor",
    history: "Added in 1850 during temple expansion.",
    dressCode: "Traditional attire preferred.",
    images: [],
    createdAt: "2024-01-20",
    updatedAt: "2024-01-25",
  },
];

const parentOptions = ["Main Temple", "Padmavathi Shrine", "Varadaraja Shrine"];

const Shrines = () => {
  const [shrines, setShrines] = useState<Shrine[]>(mockShrines);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editingShrine, setEditingShrine] = useState<Shrine | null>(null);
  const [viewingShrine, setViewingShrine] = useState<Shrine | null>(null);
  const [formData, setFormData] = useState({
    shrineName: "",
    associatedDeity: "",
    parentStructure: "",
    description: "",
    status: "active" as "active" | "inactive",
    timings: "",
    location: "",
    history: "",
    dressCode: "",
  });

  const resetForm = () => {
    setFormData({
      shrineName: "",
      associatedDeity: "",
      parentStructure: "",
      description: "",
      status: "active",
      timings: "",
      location: "",
      history: "",
      dressCode: "",
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
        timings: shrine.timings,
        location: shrine.location,
        history: shrine.history,
        dressCode: shrine.dressCode,
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

  const handleRowClick = (shrine: Shrine) => {
    setViewingShrine(shrine);
    setIsViewModalOpen(true);
  };

  const handleSave = () => {
    if (editingShrine) {
      setShrines(shrines.map(s => 
        s.id === editingShrine.id 
          ? { ...s, ...formData, updatedAt: new Date().toISOString().split('T')[0] }
          : s
      ));
      toast.success("Shrine updated successfully");
    } else {
      const newShrine: Shrine = {
        id: Date.now().toString(),
        ...formData,
        images: [],
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
      };
      setShrines([...shrines, newShrine]);
      toast.success("Shrine added successfully");
    }
    handleCloseModal();
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setShrines(shrines.filter(s => s.id !== id));
    toast.success("Shrine deleted successfully");
  };

  const handleEditFromView = () => {
    if (viewingShrine) {
      setIsViewModalOpen(false);
      handleOpenModal(viewingShrine);
    }
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
                <TableHead>Timings</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shrines.map((shrine) => (
                <TableRow 
                  key={shrine.id} 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleRowClick(shrine)}
                >
                  <TableCell className="font-medium">{shrine.shrineName}</TableCell>
                  <TableCell>{shrine.associatedDeity}</TableCell>
                  <TableCell>{shrine.parentStructure}</TableCell>
                  <TableCell>{shrine.timings}</TableCell>
                  <TableCell>
                    <Badge variant={shrine.status === "active" ? "default" : "secondary"}>
                      {shrine.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenModal(shrine);
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={(e) => handleDelete(shrine.id, e)}
                      >
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

      {/* View Details Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Landmark className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <DialogTitle>{viewingShrine?.shrineName}</DialogTitle>
                  <DialogDescription>{viewingShrine?.associatedDeity}</DialogDescription>
                </div>
              </div>
              <Badge variant={viewingShrine?.status === "active" ? "default" : "secondary"}>
                {viewingShrine?.status}
              </Badge>
            </div>
          </DialogHeader>

          <Tabs defaultValue="overview" className="mt-4">
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
              <TabsTrigger 
                value="overview" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="details"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Details
              </TabsTrigger>
              <TabsTrigger 
                value="timings"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Timings
              </TabsTrigger>
              <TabsTrigger 
                value="dresscode"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Dress Code
              </TabsTrigger>
              <TabsTrigger 
                value="gallery"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Gallery
              </TabsTrigger>
              <TabsTrigger 
                value="history"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                History
              </TabsTrigger>
              <TabsTrigger 
                value="location"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Location
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-4 space-y-4">
              {viewingShrine?.images && viewingShrine.images.length > 0 && (
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src={viewingShrine.images[0]} 
                    alt={viewingShrine.shrineName}
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}
              <div>
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-sm text-muted-foreground">{viewingShrine?.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground">Parent Structure</p>
                  <p className="font-medium">{viewingShrine?.parentStructure}</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground">Last Updated</p>
                  <p className="font-medium">{viewingShrine?.updatedAt}</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="details" className="mt-4 space-y-4">
              <div className="grid gap-4">
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Shrine Name</p>
                  <p className="font-medium">{viewingShrine?.shrineName}</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Associated Deity</p>
                  <p className="font-medium">{viewingShrine?.associatedDeity}</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Description</p>
                  <p className="font-medium">{viewingShrine?.description}</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="timings" className="mt-4">
              <div className="flex items-start gap-3 p-4 border rounded-lg">
                <Clock className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Operating Hours</p>
                  <p className="text-sm text-muted-foreground mt-1">{viewingShrine?.timings}</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="dresscode" className="mt-4">
              <div className="flex items-start gap-3 p-4 border rounded-lg">
                <FileText className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Dress Code Guidelines</p>
                  <p className="text-sm text-muted-foreground mt-1">{viewingShrine?.dressCode}</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="gallery" className="mt-4">
              {viewingShrine?.images && viewingShrine.images.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                  {viewingShrine.images.map((img, idx) => (
                    <div key={idx} className="rounded-lg overflow-hidden border">
                      <img 
                        src={img} 
                        alt={`${viewingShrine.shrineName} ${idx + 1}`}
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
                  <p className="text-sm text-muted-foreground mt-1">{viewingShrine?.history}</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="location" className="mt-4">
              <div className="flex items-start gap-3 p-4 border rounded-lg">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Location within Temple</p>
                  <p className="text-sm text-muted-foreground mt-1">{viewingShrine?.location}</p>
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
        <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingShrine ? "Edit Shrine" : "Add New Shrine"}</DialogTitle>
            <DialogDescription>
              {editingShrine ? "Update shrine details" : "Create a new shrine or sub-temple"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
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
            </div>
            <div className="grid grid-cols-2 gap-4">
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
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g., North Wing, Ground Floor"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dressCode">Dress Code</Label>
              <Textarea
                id="dressCode"
                value={formData.dressCode}
                onChange={(e) => setFormData({ ...formData, dressCode: e.target.value })}
                placeholder="Enter dress code guidelines"
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
