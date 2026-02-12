import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertCircle, CheckCircle, Plus, Trash2 } from "lucide-react";

interface ResourceItem {
    id: string;
    name: string;
    type: string;
    quantity: number;
    startTime: string;
    endTime: string;
    hasConflict: boolean;
}

const DEFAULT_RESOURCE_TYPES = ["Hall", "Equipment", "Vehicle", "Decoration"];

interface ResourceAllocationSectionProps {
    onResourcesChange?: (resources: ResourceItem[]) => void;
}

const ResourceAllocationSection = ({ onResourcesChange }: ResourceAllocationSectionProps) => {
    const [resources, setResources] = useState<ResourceItem[]>([]);
    const [resourceTypes, setResourceTypes] = useState<string[]>(DEFAULT_RESOURCE_TYPES);
    const [newTypeName, setNewTypeName] = useState("");
    const [isAddTypeDialogOpen, setIsAddTypeDialogOpen] = useState(false);

    const addResource = () => {
        const newResource: ResourceItem = {
            id: `res-${Date.now()}`,
            name: "",
            type: resourceTypes[0] || "Hall",
            quantity: 1,
            startTime: "09:00",
            endTime: "18:00",
            hasConflict: false,
        };
        const updated = [...resources, newResource];
        setResources(updated);
        onResourcesChange?.(updated);
    };

    const addResourceType = () => {
        if (newTypeName.trim() && !resourceTypes.includes(newTypeName.trim())) {
            setResourceTypes([...resourceTypes, newTypeName.trim()]);
            setNewTypeName("");
            setIsAddTypeDialogOpen(false);
        }
    };

    const removeResource = (id: string) => {
        const updated = resources.filter((r) => r.id !== id);
        setResources(updated);
        onResourcesChange?.(updated);
    };

    const updateResource = (id: string, field: keyof ResourceItem, value: any) => {
        const updated = resources.map((r) => (r.id === id ? { ...r, [field]: value } : r));
        setResources(updated);
        onResourcesChange?.(updated);
    };

    const getTypeBadge = (type: string) => {
        const colorMap: { [key: string]: string } = {
            Hall: "bg-indigo-100 text-indigo-700 border-indigo-300",
            Equipment: "bg-amber-100 text-amber-700 border-amber-300",
            Vehicle: "bg-cyan-100 text-cyan-700 border-cyan-300",
            Decoration: "bg-pink-100 text-pink-700 border-pink-300",
        };
        return colorMap[type] || "bg-gray-100 text-gray-700 border-gray-300";
    };

    return (
        <div className="space-y-4">
            <div className="border rounded-lg p-4 bg-muted/30">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <p className="text-sm font-medium">Resource Allocation</p>
                        <p className="text-xs text-muted-foreground mt-1">
                            Add halls, equipment, vehicles, and decorations needed
                        </p>
                    </div>
                    <div className="flex gap-3 items-center">
                        {resources.length > 0 && (
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">
                                {resources.length} resources
                            </Badge>
                        )}
                        <Button size="sm" onClick={addResource} className="gap-2">
                            <Plus className="h-4 w-4" />
                            Add Resource
                        </Button>
                    </div>
                </div>

                {resources.length === 0 ? (
                    <div className="border-2 border-dashed rounded-lg p-8 text-center">
                        <p className="text-sm text-muted-foreground mb-3">No resources added yet</p>
                        <Button size="sm" variant="outline" onClick={addResource} className="gap-2">
                            <Plus className="h-4 w-4" />
                            Add Your First Resource
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                        {resources.map((resource) => (
                            <div
                                key={resource.id}
                                className={`border rounded-lg p-4 bg-background hover:shadow-sm transition-shadow ${resource.hasConflict ? "border-red-300 bg-red-50/30" : ""
                                    }`}
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-2 flex-1">
                                        <Badge variant="outline" className={`text-xs ${getTypeBadge(resource.type)}`}>
                                            {resource.type}
                                        </Badge>
                                        {!resource.hasConflict && resource.name && (
                                            <CheckCircle className="h-3 w-3 text-green-600" />
                                        )}
                                        {resource.hasConflict && <AlertCircle className="h-3 w-3 text-destructive" />}
                                    </div>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => removeResource(resource.id)}
                                        className="h-7 w-7 p-0 text-destructive hover:text-destructive"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>

                                <div className="grid grid-cols-4 gap-3">
                                    <div className="flex gap-2">
                                        <div className="flex-1">
                                            <Label className="text-xs">Type</Label>
                                            <Select
                                                value={resource.type}
                                                onValueChange={(value) => updateResource(resource.id, "type", value)}
                                            >
                                                <SelectTrigger className="h-8 text-xs mt-1 bg-background">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent className="bg-popover">
                                                    {resourceTypes.map((type) => (
                                                        <SelectItem key={type} value={type}>
                                                            {type}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <Dialog open={isAddTypeDialogOpen} onOpenChange={setIsAddTypeDialogOpen}>
                                            <DialogTrigger asChild>
                                                <Button size="sm" variant="outline" className="h-8 w-8 p-0 mt-5">
                                                    <Plus className="h-3 w-3" />
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-md">
                                                <DialogHeader>
                                                    <DialogTitle>Add New Resource Type</DialogTitle>
                                                </DialogHeader>
                                                <div className="space-y-4 pt-4">
                                                    <div>
                                                        <Label>Type Name</Label>
                                                        <Input
                                                            value={newTypeName}
                                                            onChange={(e) => setNewTypeName(e.target.value)}
                                                            placeholder="e.g., Furniture, Utensils, etc."
                                                            className="mt-1"
                                                            onKeyDown={(e) => e.key === "Enter" && addResourceType()}
                                                        />
                                                    </div>
                                                    <div className="flex justify-end gap-2">
                                                        <Button variant="outline" onClick={() => setIsAddTypeDialogOpen(false)}>
                                                            Cancel
                                                        </Button>
                                                        <Button onClick={addResourceType}>Add Type</Button>
                                                    </div>
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                    <div>
                                        <Label className="text-xs">Resource Name</Label>
                                        <Input
                                            value={resource.name}
                                            onChange={(e) => updateResource(resource.id, "name", e.target.value)}
                                            placeholder="e.g., Main Hall"
                                            className="h-8 text-xs mt-1"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-xs">Quantity</Label>
                                        <Input
                                            type="number"
                                            value={resource.quantity}
                                            onChange={(e) =>
                                                updateResource(resource.id, "quantity", parseInt(e.target.value) || 1)
                                            }
                                            className="h-8 text-xs mt-1"
                                            min={1}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <Label className="text-xs">Start</Label>
                                            <Input
                                                type="time"
                                                value={resource.startTime}
                                                onChange={(e) => updateResource(resource.id, "startTime", e.target.value)}
                                                className="h-8 text-xs mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label className="text-xs">End</Label>
                                            <Input
                                                type="time"
                                                value={resource.endTime}
                                                onChange={(e) => updateResource(resource.id, "endTime", e.target.value)}
                                                className="h-8 text-xs mt-1"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {resource.hasConflict && (
                                    <div className="mt-3 p-2 bg-red-100 border border-red-300 rounded text-xs text-red-800">
                                        <AlertCircle className="h-3 w-3 inline mr-1" />
                                        Resource conflict detected. This item may be already booked for overlapping time.
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-xs text-blue-800">
                        <strong>Note:</strong> The system will check for conflicts when you create the event. Manage detailed schedules in the event detail page.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ResourceAllocationSection;
