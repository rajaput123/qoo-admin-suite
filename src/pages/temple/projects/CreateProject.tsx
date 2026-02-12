import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { projectTypes, Project } from "@/data/projectData";

const CreateProject = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [type, setType] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [priority, setPriority] = useState<"High" | "Medium" | "Low">("Medium");
    const [manager, setManager] = useState("");

    const handleSave = (publish: boolean) => {
        if (!title || !type) {
            toast.error("Project title and type are required");
            return;
        }

        // Create new project ID
        const newId = `PRJ-${String(Date.now()).slice(-3).padStart(3, "0")}`;

        toast.success(`Project ${publish ? "published" : "saved as draft"} successfully`);

        // Redirect to project detail page
        navigate(`/temple/projects/${newId}`);
    };

    return (
        <div className="p-6">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                    <Button variant="ghost" size="icon" onClick={() => navigate("/temple/projects/all")}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">Create Project</h1>
                        <p className="text-muted-foreground">Start a new temple project or initiative</p>
                    </div>
                </div>

                {/* Form */}
                <Card className="max-w-2xl p-6">
                    <div className="space-y-6">
                        {/* Project Title */}
                        <div>
                            <Label className="text-sm font-medium">Project Title *</Label>
                            <Input
                                placeholder="e.g., New Gopuram Construction"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                className="mt-1.5"
                            />
                        </div>

                        {/* Project Type */}
                        <div>
                            <Label className="text-sm font-medium">Project Type *</Label>
                            <Select value={type} onValueChange={setType}>
                                <SelectTrigger className="mt-1.5 bg-background">
                                    <SelectValue placeholder="Select project type" />
                                </SelectTrigger>
                                <SelectContent className="bg-popover">
                                    {projectTypes.map(t => (
                                        <SelectItem key={t} value={t}>{t}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Dates */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label className="text-sm font-medium">Start Date</Label>
                                <Input
                                    type="date"
                                    value={startDate}
                                    onChange={e => setStartDate(e.target.value)}
                                    className="mt-1.5"
                                />
                            </div>
                            <div>
                                <Label className="text-sm font-medium">Expected End Date</Label>
                                <Input
                                    type="date"
                                    value={endDate}
                                    onChange={e => setEndDate(e.target.value)}
                                    className="mt-1.5"
                                />
                            </div>
                        </div>

                        {/* Priority */}
                        <div>
                            <Label className="text-sm font-medium">Priority</Label>
                            <Select value={priority} onValueChange={(v: any) => setPriority(v)}>
                                <SelectTrigger className="mt-1.5 bg-background">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-popover">
                                    <SelectItem value="High">High</SelectItem>
                                    <SelectItem value="Medium">Medium</SelectItem>
                                    <SelectItem value="Low">Low</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Project Manager */}
                        <div>
                            <Label className="text-sm font-medium">Project Manager</Label>
                            <Input
                                placeholder="e.g., Architect Krishnan"
                                value={manager}
                                onChange={e => setManager(e.target.value)}
                                className="mt-1.5"
                            />
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3 pt-4 border-t">
                            <Button variant="outline" onClick={() => navigate("/temple/projects/all")}>
                                Cancel
                            </Button>
                            <Button variant="outline" onClick={() => handleSave(false)}>
                                Save Draft
                            </Button>
                            <Button onClick={() => handleSave(true)}>
                                Publish Project
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Info Box */}
                <div className="max-w-2xl mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                        <strong>Next Step:</strong> After creating the project, you'll be redirected to the project detail page where you can add milestones, funding details, expenses, and updates.
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default CreateProject;
