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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, DoorOpen, Check, X, Clock, MapPin, Image, History, Users, CalendarDays, FileText } from "lucide-react";
import { toast } from "sonner";

interface Hall {
  id: string;
  hallName: string;
  capacity: number;
  bookingAllowed: boolean;
  parentStructure: string;
  description: string;
  status: "active" | "inactive";
  timings: string;
  location: string;
  amenities: string;
  bookingRules: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

const mockHalls: Hall[] = [
  {
    id: "1",
    hallName: "Kalyana Mandapam",
    capacity: 500,
    bookingAllowed: true,
    parentStructure: "Main Temple",
    description: "Wedding and special ceremony hall with traditional architecture featuring ornate pillars and sacred motifs. Air-conditioned with modern amenities while preserving traditional aesthetics.",
    status: "active",
    timings: "6:00 AM - 10:00 PM",
    location: "West Wing, Ground Floor",
    amenities: "Air conditioning, Sound system, Traditional decor, Changing rooms, Kitchen access, Parking for 100 vehicles",
    bookingRules: "Minimum 3 days advance booking. 50% advance payment required. Full payment 24 hours before event. Cancellation allowed up to 48 hours before with 20% deduction.",
    images: [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400",
    ],
    createdAt: "2024-01-15",
    updatedAt: "2024-02-01",
  },
  {
    id: "2",
    hallName: "Annadanam Hall",
    capacity: 1000,
    bookingAllowed: false,
    parentStructure: "Main Temple",
    description: "Community dining hall for prasadam distribution. Serves free meals to thousands of devotees daily.",
    status: "active",
    timings: "11:00 AM - 3:00 PM, 7:00 PM - 9:00 PM",
    location: "North Wing, Ground Floor",
    amenities: "Industrial kitchen, Seating for 500 at a time, Wash area, Storage facilities",
    bookingRules: "Not available for private booking. Open for all devotees during meal times.",
    images: [
      "https://images.unsplash.com/photo-1555244162-803834f70033?w=400",
    ],
    createdAt: "2024-01-10",
    updatedAt: "2024-01-28",
  },
  {
    id: "3",
    hallName: "Sabha Mandapam",
    capacity: 200,
    bookingAllowed: true,
    parentStructure: "Main Temple",
    description: "Assembly hall for religious discourses, cultural programs, and educational events.",
    status: "active",
    timings: "8:00 AM - 9:00 PM",
    location: "East Wing, First Floor",
    amenities: "Projector, Sound system, Stage, Green room, Air conditioning",
    bookingRules: "Advance booking required. Subject to temple event calendar. Religious programs given priority.",
    images: [],
    createdAt: "2024-01-20",
    updatedAt: "2024-01-25",
  },
];

const parentOptions = ["Main Temple", "Padmavathi Shrine", "Varadaraja Shrine"];

const Halls = () => {
  const [halls, setHalls] = useState<Hall[]>(mockHalls);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editingHall, setEditingHall] = useState<Hall | null>(null);
  const [viewingHall, setViewingHall] = useState<Hall | null>(null);
  const [formData, setFormData] = useState({
    hallName: "",
    capacity: 0,
    bookingAllowed: true,
    parentStructure: "",
    description: "",
    status: "active" as "active" | "inactive",
    timings: "",
    location: "",
    amenities: "",
    bookingRules: "",
  });

  const resetForm = () => {
    setFormData({
      hallName: "",
      capacity: 0,
      bookingAllowed: true,
      parentStructure: "",
      description: "",
      status: "active",
      timings: "",
      location: "",
      amenities: "",
      bookingRules: "",
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
        timings: hall.timings,
        location: hall.location,
        amenities: hall.amenities,
        bookingRules: hall.bookingRules,
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

  const handleRowClick = (hall: Hall) => {
    setViewingHall(hall);
    setIsViewModalOpen(true);
  };

  const handleSave = () => {
    if (editingHall) {
      setHalls(halls.map(h => 
        h.id === editingHall.id 
          ? { ...h, ...formData, updatedAt: new Date().toISOString().split('T')[0] }
          : h
      ));
      toast.success("Hall updated successfully");
    } else {
      const newHall: Hall = {
        id: Date.now().toString(),
        ...formData,
        images: [],
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
      };
      setHalls([...halls, newHall]);
      toast.success("Hall added successfully");
    }
    handleCloseModal();
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setHalls(halls.filter(h => h.id !== id));
    toast.success("Hall deleted successfully");
  };

  const handleEditFromView = () => {
    if (viewingHall) {
      setIsViewModalOpen(false);
      handleOpenModal(viewingHall);
    }
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
                <TableHead>Timings</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {halls.map((hall) => (
                <TableRow 
                  key={hall.id} 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleRowClick(hall)}
                >
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
                  <TableCell>{hall.timings}</TableCell>
                  <TableCell>
                    <Badge variant={hall.status === "active" ? "default" : "secondary"}>
                      {hall.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenModal(hall);
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={(e) => handleDelete(hall.id, e)}
                      >
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

      {/* View Details Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <DoorOpen className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <DialogTitle>{viewingHall?.hallName}</DialogTitle>
                  <DialogDescription>Capacity: {viewingHall?.capacity.toLocaleString()} • {viewingHall?.parentStructure}</DialogDescription>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {viewingHall?.bookingAllowed && (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    <CalendarDays className="h-3 w-3 mr-1" />
                    Bookable
                  </Badge>
                )}
                <Badge variant={viewingHall?.status === "active" ? "default" : "secondary"}>
                  {viewingHall?.status}
                </Badge>
              </div>
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
                value="amenities"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Amenities
              </TabsTrigger>
              <TabsTrigger 
                value="booking"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Booking Rules
              </TabsTrigger>
              <TabsTrigger 
                value="gallery"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Gallery
              </TabsTrigger>
              <TabsTrigger 
                value="location"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Location
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-4 space-y-4">
              {viewingHall?.images && viewingHall.images.length > 0 && (
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src={viewingHall.images[0]} 
                    alt={viewingHall.hallName}
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}
              <div>
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-sm text-muted-foreground">{viewingHall?.description}</p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-3 bg-muted/50 rounded-lg text-center">
                  <p className="text-2xl font-bold text-primary">{viewingHall?.capacity.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Capacity</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg text-center">
                  <p className="text-2xl font-bold text-primary">{viewingHall?.bookingAllowed ? "Yes" : "No"}</p>
                  <p className="text-xs text-muted-foreground">Bookable</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg text-center">
                  <p className="text-2xl font-bold text-primary capitalize">{viewingHall?.status}</p>
                  <p className="text-xs text-muted-foreground">Status</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="details" className="mt-4 space-y-4">
              <div className="grid gap-4">
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Hall Name</p>
                  <p className="font-medium">{viewingHall?.hallName}</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Parent Structure</p>
                  <p className="font-medium">{viewingHall?.parentStructure}</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Description</p>
                  <p className="font-medium">{viewingHall?.description}</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="timings" className="mt-4">
              <div className="flex items-start gap-3 p-4 border rounded-lg">
                <Clock className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Operating Hours</p>
                  <p className="text-sm text-muted-foreground mt-1">{viewingHall?.timings}</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="amenities" className="mt-4">
              <div className="flex items-start gap-3 p-4 border rounded-lg">
                <Users className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Available Amenities</p>
                  <p className="text-sm text-muted-foreground mt-1">{viewingHall?.amenities}</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="booking" className="mt-4">
              <div className="flex items-start gap-3 p-4 border rounded-lg">
                <FileText className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Booking Rules & Policies</p>
                  <p className="text-sm text-muted-foreground mt-1">{viewingHall?.bookingRules}</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="gallery" className="mt-4">
              {viewingHall?.images && viewingHall.images.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                  {viewingHall.images.map((img, idx) => (
                    <div key={idx} className="rounded-lg overflow-hidden border">
                      <img 
                        src={img} 
                        alt={`${viewingHall.hallName} ${idx + 1}`}
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
                  <p className="text-sm text-muted-foreground mt-1">{viewingHall?.location}</p>
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
            <DialogTitle>{editingHall ? "Edit Hall" : "Add New Hall"}</DialogTitle>
            <DialogDescription>
              {editingHall ? "Update hall details" : "Create a new hall or event space"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
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
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
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
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="timings">Timings</Label>
                <Input
                  id="timings"
                  value={formData.timings}
                  onChange={(e) => setFormData({ ...formData, timings: e.target.value })}
                  placeholder="e.g., 6:00 AM - 10:00 PM"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g., West Wing, Ground Floor"
                />
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
            <div className="space-y-2">
              <Label htmlFor="amenities">Amenities</Label>
              <Textarea
                id="amenities"
                value={formData.amenities}
                onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
                placeholder="List available amenities"
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bookingRules">Booking Rules</Label>
              <Textarea
                id="bookingRules"
                value={formData.bookingRules}
                onChange={(e) => setFormData({ ...formData, bookingRules: e.target.value })}
                placeholder="Enter booking rules and policies"
                rows={3}
              />
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
