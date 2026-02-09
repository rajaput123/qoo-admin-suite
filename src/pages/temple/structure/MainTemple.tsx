import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pencil, Save, X, Home } from "lucide-react";
import { toast } from "sonner";

const MainTemple = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    templeName: "Sri Venkateswara Temple",
    primaryDeity: "Lord Venkateswara",
    description: "One of the most famous and richest temples in India, dedicated to Lord Venkateswara, a form of the Hindu god Vishnu. The temple is located on the seventh peak of Tirumala Hills.",
    establishedYear: "1509",
    status: "active",
  });

  const handleSave = () => {
    setIsEditing(false);
    toast.success("Main Temple details updated successfully");
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Main Temple</h1>
          <p className="text-muted-foreground">Define the root structure of your temple</p>
        </div>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>
            <Pencil className="h-4 w-4 mr-2" />
            Edit
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleCancel}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        )}
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Home className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>Temple Information</CardTitle>
              <CardDescription>Primary temple details and configuration</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="templeName">Temple Name</Label>
              {isEditing ? (
                <Input
                  id="templeName"
                  value={formData.templeName}
                  onChange={(e) => setFormData({ ...formData, templeName: e.target.value })}
                />
              ) : (
                <p className="text-sm py-2 px-3 bg-muted/50 rounded-md">{formData.templeName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="primaryDeity">Primary Deity</Label>
              {isEditing ? (
                <Input
                  id="primaryDeity"
                  value={formData.primaryDeity}
                  onChange={(e) => setFormData({ ...formData, primaryDeity: e.target.value })}
                />
              ) : (
                <p className="text-sm py-2 px-3 bg-muted/50 rounded-md">{formData.primaryDeity}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="establishedYear">Established Year</Label>
              {isEditing ? (
                <Input
                  id="establishedYear"
                  value={formData.establishedYear}
                  onChange={(e) => setFormData({ ...formData, establishedYear: e.target.value })}
                />
              ) : (
                <p className="text-sm py-2 px-3 bg-muted/50 rounded-md">{formData.establishedYear}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              {isEditing ? (
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-sm py-2 px-3 bg-muted/50 rounded-md capitalize">{formData.status}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            {isEditing ? (
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
              />
            ) : (
              <p className="text-sm py-2 px-3 bg-muted/50 rounded-md">{formData.description}</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="border-dashed">
        <CardContent className="pt-6">
          <div className="text-center text-muted-foreground text-sm">
            <p>Only one Main Temple record is allowed per tenant.</p>
            <p className="mt-1">This serves as the root of your temple hierarchy.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MainTemple;
