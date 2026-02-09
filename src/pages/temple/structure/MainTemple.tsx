import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Pencil, Home, Clock, MapPin, Image, History, Calendar, Users, X, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import SearchableSelect from "@/components/SearchableSelect";
import CustomFieldsSection, { CustomField } from "@/components/CustomFieldsSection";

const templeImages = [
  "https://images.unsplash.com/photo-1600693577615-9f3a0f7a16ba?w=800",
  "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?w=800",
  "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
];

const statusOptions = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

const MainTemple = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [customFields, setCustomFields] = useState<CustomField[]>([]);
  
  const [templeData, setTempleData] = useState({
    templeName: "Sri Venkateswara Temple",
    primaryDeity: "Lord Venkateswara",
    description: "One of the most famous and richest temples in India, dedicated to Lord Venkateswara, a form of the Hindu god Vishnu. The temple is located on the seventh peak of Tirumala Hills, also known as the \"Temple of Seven Hills\". The temple is visited by about 50,000 to 100,000 pilgrims daily, making it one of the most visited holy places in the world.",
    establishedYear: "1509",
    status: "active",
    timings: "3:00 AM - 12:00 AM (21 hours daily)",
    location: "Tirumala, Tirupati, Andhra Pradesh, India",
    history: "The temple was built over the course of several centuries starting from 300 AD. The main temple construction was completed during the reign of the Pallava dynasty. Major renovations were done by the Chola and Vijayanagara rulers. The temple gained prominence during the reign of the Pallava queen Samavai. The golden gopuram was installed in 1958.",
    coordinates: "13.6833° N, 79.3474° E",
    altitude: "853 meters above sea level",
    visitorCount: "50,000 - 100,000 daily",
    annualRevenue: "₹3,500+ Crores",
    staffCount: "6,000+",
    images: templeImages,
    createdAt: "2024-01-01",
    updatedAt: "2024-02-15",
  });

  const [formData, setFormData] = useState({ ...templeData });

  const handleEdit = () => {
    setFormData({ ...templeData });
    setIsEditModalOpen(true);
  };

  const handleSave = () => {
    setTempleData({ ...formData, updatedAt: new Date().toISOString().split('T')[0] });
    setIsEditModalOpen(false);
    toast.success("Main Temple details updated successfully");
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % templeData.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + templeData.images.length) % templeData.images.length);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Main Temple</h1>
          <p className="text-muted-foreground">Root structure of your temple hierarchy</p>
        </div>
        <Button onClick={handleEdit}>
          <Pencil className="h-4 w-4 mr-2" />
          Edit Details
        </Button>
      </div>

      {/* Hero Section */}
      <Card className="overflow-hidden">
        <div className="relative h-64 md:h-80">
          <img
            src={templeData.images[currentImageIndex]}
            alt={templeData.templeName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Image Navigation */}
          {templeData.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
              >
                <ChevronLeft className="h-5 w-5 text-white" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
              >
                <ChevronRight className="h-5 w-5 text-white" />
              </button>
              <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2">
                {templeData.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`h-2 w-2 rounded-full transition-colors ${
                      idx === currentImageIndex ? "bg-white" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
          
          {/* Temple Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex items-end justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                    <Home className="h-5 w-5 text-white" />
                  </div>
                  <Badge variant={templeData.status === "active" ? "default" : "secondary"}>
                    {templeData.status}
                  </Badge>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">{templeData.templeName}</h2>
                <p className="text-white/80 mt-1">{templeData.primaryDeity}</p>
              </div>
              <div className="hidden md:block text-right text-white/80">
                <p className="text-sm">Established</p>
                <p className="text-xl font-semibold text-white">{templeData.establishedYear}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{templeData.visitorCount}</p>
                <p className="text-xs text-muted-foreground">Daily Visitors</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Calendar className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{templeData.establishedYear}</p>
                <p className="text-xs text-muted-foreground">Established</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <Users className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{templeData.staffCount}</p>
                <p className="text-xs text-muted-foreground">Staff Members</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MapPin className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{templeData.altitude}</p>
                <p className="text-xs text-muted-foreground">Altitude</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabbed Content */}
      <Card>
        <Tabs defaultValue="overview" className="w-full">
          <CardHeader className="pb-0">
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
          </CardHeader>

          <CardContent className="pt-6">
            <TabsContent value="overview" className="mt-0 space-y-4">
              <div>
                <h4 className="font-medium mb-2">About the Temple</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{templeData.description}</p>
              </div>
              <Separator />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Primary Deity</p>
                  <p className="font-medium">{templeData.primaryDeity}</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Annual Revenue</p>
                  <p className="font-medium">{templeData.annualRevenue}</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Operating Hours</p>
                  <p className="font-medium">{templeData.timings}</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Last Updated</p>
                  <p className="font-medium">{templeData.updatedAt}</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="details" className="mt-0 space-y-4">
              <div className="grid gap-4">
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Temple Name</p>
                  <p className="font-medium">{templeData.templeName}</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Primary Deity</p>
                  <p className="font-medium">{templeData.primaryDeity}</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Established Year</p>
                  <p className="font-medium">{templeData.establishedYear}</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Status</p>
                  <Badge variant={templeData.status === "active" ? "default" : "secondary"}>
                    {templeData.status}
                  </Badge>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Description</p>
                  <p className="font-medium">{templeData.description}</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="timings" className="mt-0">
              <div className="flex items-start gap-3 p-4 border rounded-lg">
                <Clock className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Operating Hours</p>
                  <p className="text-sm text-muted-foreground mt-1">{templeData.timings}</p>
                  <div className="mt-4 space-y-2">
                    <p className="text-sm font-medium">Daily Schedule:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Suprabhatam: 3:00 AM</li>
                      <li>• Thomala Seva: 4:00 AM - 5:00 AM</li>
                      <li>• Archana: 5:30 AM - 6:30 AM</li>
                      <li>• Sarva Darshan: 7:00 AM onwards</li>
                      <li>• Ekantha Seva: 11:00 PM - 12:00 AM</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="gallery" className="mt-0">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {templeData.images.map((img, idx) => (
                  <div
                    key={idx}
                    className="rounded-lg overflow-hidden border cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => setCurrentImageIndex(idx)}
                  >
                    <img
                      src={img}
                      alt={`${templeData.templeName} ${idx + 1}`}
                      className="w-full h-32 object-cover"
                    />
                  </div>
                ))}
              </div>
              {templeData.images.length === 0 && (
                <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                  <Image className="h-12 w-12 mb-2 opacity-50" />
                  <p>No images available</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="history" className="mt-0">
              <div className="flex items-start gap-3 p-4 border rounded-lg">
                <History className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Historical Background</p>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{templeData.history}</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="location" className="mt-0 space-y-4">
              <div className="flex items-start gap-3 p-4 border rounded-lg">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-sm text-muted-foreground mt-1">{templeData.location}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Coordinates</p>
                  <p className="font-medium">{templeData.coordinates}</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Altitude</p>
                  <p className="font-medium">{templeData.altitude}</p>
                </div>
              </div>
              <div className="h-48 bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
                <MapPin className="h-8 w-8 mr-2 opacity-50" />
                <span>Map View (Integration Ready)</span>
              </div>
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>

      {/* Info Note */}
      <Card className="border-dashed">
        <CardContent className="pt-6">
          <div className="text-center text-muted-foreground text-sm">
            <p>Only one Main Temple record is allowed per tenant.</p>
            <p className="mt-1">This serves as the root of your temple hierarchy.</p>
          </div>
        </CardContent>
      </Card>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto bg-background">
          <DialogHeader>
            <DialogTitle>Edit Main Temple</DialogTitle>
            <DialogDescription>Update the main temple details</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="templeName">Temple Name</Label>
                <Input
                  id="templeName"
                  value={formData.templeName}
                  onChange={(e) => setFormData({ ...formData, templeName: e.target.value })}
                  placeholder="Enter temple name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="primaryDeity">Primary Deity</Label>
                <Input
                  id="primaryDeity"
                  value={formData.primaryDeity}
                  onChange={(e) => setFormData({ ...formData, primaryDeity: e.target.value })}
                  placeholder="Enter deity name"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="establishedYear">Established Year</Label>
                <Input
                  id="establishedYear"
                  value={formData.establishedYear}
                  onChange={(e) => setFormData({ ...formData, establishedYear: e.target.value })}
                  placeholder="Enter year"
                />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <SearchableSelect
                  options={statusOptions}
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value })}
                  placeholder="Select status"
                  searchPlaceholder="Search status..."
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timings">Operating Hours</Label>
              <Input
                id="timings"
                value={formData.timings}
                onChange={(e) => setFormData({ ...formData, timings: e.target.value })}
                placeholder="e.g., 5:00 AM - 10:00 PM"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Enter full address"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter temple description"
                rows={4}
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
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MainTemple;
