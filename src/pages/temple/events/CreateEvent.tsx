import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { eventTypes, structures } from "@/data/eventData";
// Temporarily disabled template imports to debug blank page
// import { eventTypes, structures, eventTemplates } from "@/data/eventData";
// import type { EventTemplate } from "@/data/eventData";
import { eventActions } from "@/modules/events/hooks";
import SevaLinkingSection from "@/components/events/SevaLinkingSection";
import DonationConfigSection from "@/components/events/DonationConfigSection";
import ManpowerAssignmentSection from "@/components/events/ManpowerAssignmentSection";
import ResourceAllocationSection from "@/components/events/ResourceAllocationSection";
import ExpenseManagementSection from "@/components/events/ExpenseManagementSection";
import type { TempleEvent } from "@/data/eventData";

const CreateEvent = () => {
    const navigate = useNavigate();

    // Template Selection
    const [selectedTemplate, setSelectedTemplate] = useState<string>("");

    // Section 1: Basic Information
    const [name, setName] = useState("");
    const [type, setType] = useState<TempleEvent["type"]>("Festival");
    const [description, setDescription] = useState("");
    const [structureId, setStructureId] = useState("");
    const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10));
    const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10));

    // Section 2: Registration Settings
    const [enableRegistration, setEnableRegistration] = useState(false);
    const [registrationStart, setRegistrationStart] = useState("");
    const [registrationEnd, setRegistrationEnd] = useState("");
    const [maxCapacity, setMaxCapacity] = useState(1000);
    const [allowWaitlist, setAllowWaitlist] = useState(false);
    const [allowWalkin, setAllowWalkin] = useState(true);

    // Section 3: Seva Linking
    const [enableSevas, setEnableSevas] = useState(false);

    // Section 4: Donation Settings
    const [enableDonations, setEnableDonations] = useState(false);
    const [donationGoal, setDonationGoal] = useState(0);
    const [minDonation, setMinDonation] = useState(100);
    const [transparencyNote, setTransparencyNote] = useState("");

    // Removed: Custom Fields and individual expense estimates
    // Now using ExpenseManagementSection for line-item expenses

    // TEMPLATE FUNCTIONS TEMPORARILY DISABLED
    /*
    // Function to load template data into form
    const loadTemplate = (templateId: string) => {
        const template = eventTemplates.find(t => t.id === templateId);
        if (!template) return;

        // Load basic info
        setName(template.name);
        setType(template.type as TempleEvent["type"]);
        setDescription(template.description);
        if (template.hallAllocation) {
            const structure = structures.find(s => s.name === template.hallAllocation);
            if (structure) setStructureId(structure.id);
        }

        // Load seva settings
        setEnableSevas(template.enableSevaBooking);
        // Note: Seva selection handled by SevaLinkingSection component

        // Load donation settings
        setEnableDonations(template.enableDonations);
        if (template.suggestedDonationGoal) setDonationGoal(template.suggestedDonationGoal);
        if (template.minimumDonationAmount) setMinDonation(template.minimumDonationAmount);
        if (template.transparencyNote) setTransparencyNote(template.transparencyNote);

        // Note: Manpower and Resources handled by their respective components
        // Expenses handled by ExpenseManagementSection

        toast.success(`Template "${template.name}" loaded successfully!`);
    };

    const handleTemplateChange = (templateId: string) => {
        setSelectedTemplate(templateId);
        if (templateId) {
            loadTemplate(templateId);
        }
    };
    */

    const handleCreate = (publish: boolean) => {
        if (!name.trim()) {
            toast.error("Event name is required");
            return;
        }
        if (!structureId) {
            toast.error("Location is required");
            return;
        }

        const structure = structures.find((s) => s.id === structureId);

        const event = eventActions.createEvent({
            name: name.trim(),
            type,
            templeId: "TMP-001",
            structureId,
            structureName: structure?.name || "Unknown",
            startDate,
            endDate,
            estimatedBudget: 0, // Set from expense line items
            actualSpend: 0,
            estimatedFootfall: maxCapacity.toString(),
            description: description.trim(),
            status: publish ? "Published" : "Draft",
            organizer: "Temple Admin",
            capacity: maxCapacity,
            linkedSeva: [],
        });

        toast.success(`Event ${publish ? "published" : "saved as draft"}!`);
        navigate(`/temple/events/${event.id}`);
    };

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => navigate("/temple/events")}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">Create New Event</h1>
                        <p className="text-sm text-muted-foreground mt-1">Fill in all sections to create a comprehensive event</p>
                    </div>
                </div>
            </div>

            {/* Template Selector - TEMPORARILY DISABLED */}
            {/*
            <div className="border rounded-lg p-4 bg-muted/30">
                <div className="flex items-center gap-4">
                    <div className="flex-1">
                        <Label className="text-sm font-medium">Start from Template (Optional)</Label>
                        <p className="text-xs text-muted-foreground mt-1">
                            Load pre-configured settings from a saved template, or start fresh
                        </p>
                    </div>
                    <div className="w-80">
                        <Select value={selectedTemplate} onValueChange={handleTemplateChange}>
                            <SelectTrigger className="bg-background">
                                <SelectValue placeholder="Select a template or start fresh" />
                            </SelectTrigger>
                            <SelectContent className="bg-popover">
                                <SelectItem value="">No Template (Start Fresh)</SelectItem>
                                {eventTemplates.map((template) => (
                                    <SelectItem key={template.id} value={template.id}>
                                        {template.name} - {template.type}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
            */}

            {/* Horizontal Tabs */}
            <Tabs defaultValue="basic" className="space-y-4">
                <div className="border-b border-border">
                    <TabsList className="w-full justify-start border-b-0 rounded-none h-auto p-0 bg-transparent gap-0 flex-wrap">
                        <TabsTrigger value="basic" className="rounded-none border-b-2 border-transparent data-[state=active]:border-amber-700 data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:font-medium px-4 py-2 text-sm text-muted-foreground">
                            1. Basic Info
                        </TabsTrigger>
                        <TabsTrigger value="registration" className="rounded-none border-b-2 border-transparent data-[state=active]:border-amber-700 data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:font-medium px-4 py-2 text-sm text-muted-foreground">
                            2. Registration
                        </TabsTrigger>
                        <TabsTrigger value="sevas" className="rounded-none border-b-2 border-transparent data-[state=active]:border-amber-700 data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:font-medium px-4 py-2 text-sm text-muted-foreground">
                            3. Seva Linking
                        </TabsTrigger>
                        <TabsTrigger value="donations" className="rounded-none border-b-2 border-transparent data-[state=active]:border-amber-700 data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:font-medium px-4 py-2 text-sm text-muted-foreground">
                            4. Donations
                        </TabsTrigger>
                        <TabsTrigger value="manpower" className="rounded-none border-b-2 border-transparent data-[state=active]:border-amber-700 data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:font-medium px-4 py-2 text-sm text-muted-foreground">
                            5. Manpower
                        </TabsTrigger>
                        <TabsTrigger value="resources" className="rounded-none border-b-2 border-transparent data-[state=active]:border-amber-700 data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:font-medium px-4 py-2 text-sm text-muted-foreground">
                            6. Resources
                        </TabsTrigger>
                        <TabsTrigger value="expenses" className="rounded-none border-b-2 border-transparent data-[state=active]:border-amber-700 data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:font-medium px-4 py-2 text-sm text-muted-foreground">
                            7. Expenses
                        </TabsTrigger>
                    </TabsList>
                </div>

                {/* Tab 1: Basic Information */}
                <TabsContent value="basic" className="space-y-4">
                    <div>
                        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Basic Information</h3>
                        <div className="grid grid-cols-2 gap-4 max-w-4xl">
                            <div className="col-span-2">
                                <Label>Event Title *</Label>
                                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Brahmotsavam 2026" />
                            </div>
                            <div>
                                <Label>Event Type *</Label>
                                <Select value={type} onValueChange={(v) => setType(v as TempleEvent["type"])}>
                                    <SelectTrigger className="bg-background">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-popover">
                                        {eventTypes.map((t) => (
                                            <SelectItem key={t} value={t}>
                                                {t}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label>Location *</Label>
                                <Select value={structureId} onValueChange={setStructureId}>
                                    <SelectTrigger className="bg-background">
                                        <SelectValue placeholder="Select location" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-popover">
                                        {structures.map((s) => (
                                            <SelectItem key={s.id} value={s.id}>
                                                {s.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label>Start Date *</Label>
                                <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                            </div>
                            <div>
                                <Label>End Date *</Label>
                                <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                            </div>
                            <div className="col-span-2">
                                <Label>Description *</Label>
                                <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Brief description of the event..." rows={4} />
                            </div>
                        </div>
                    </div>
                </TabsContent>

                {/* Tab 2: Registration Settings */}
                <TabsContent value="registration" className="space-y-4">
                    <div>
                        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Registration Settings</h3>
                        <div className="space-y-4 max-w-4xl">
                            <div className="flex items-center justify-between py-3 border-b">
                                <div>
                                    <Label>Enable Registration?</Label>
                                    <p className="text-xs text-muted-foreground mt-1">Allow devotees to register for this event</p>
                                </div>
                                <Switch checked={enableRegistration} onCheckedChange={setEnableRegistration} />
                            </div>
                            {enableRegistration && (
                                <div className="grid grid-cols-2 gap-4 pt-4">
                                    <div>
                                        <Label>Registration Start Date</Label>
                                        <Input type="date" value={registrationStart} onChange={(e) => setRegistrationStart(e.target.value)} />
                                    </div>
                                    <div>
                                        <Label>Registration End Date</Label>
                                        <Input type="date" value={registrationEnd} onChange={(e) => setRegistrationEnd(e.target.value)} />
                                    </div>
                                    <div>
                                        <Label>Max Capacity</Label>
                                        <Input type="number" value={maxCapacity} onChange={(e) => setMaxCapacity(parseInt(e.target.value) || 0)} />
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <Label className="text-sm">Waitlist Enabled?</Label>
                                            <Switch checked={allowWaitlist} onCheckedChange={setAllowWaitlist} />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <Label className="text-sm">Allow Walk-in?</Label>
                                            <Switch checked={allowWalkin} onCheckedChange={setAllowWalkin} />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </TabsContent>

                {/* Tab 3: Seva Linking */}
                <TabsContent value="sevas" className="space-y-4">
                    <div>
                        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Seva Linking</h3>
                        <div className="max-w-4xl space-y-4">
                            <div className="flex items-center justify-between py-3 border-b">
                                <div>
                                    <Label>Enable Event Sevas?</Label>
                                    <p className="text-xs text-muted-foreground mt-1">Link ritual sevas and darshan to this event</p>
                                </div>
                                <Switch checked={enableSevas} onCheckedChange={setEnableSevas} />
                            </div>
                            {enableSevas && (
                                <SevaLinkingSection />
                            )}
                        </div>
                    </div>
                </TabsContent>

                {/* Tab 4: Donation Settings */}
                <TabsContent value="donations" className="space-y-4">
                    <div>
                        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Donation Settings</h3>
                        <div className="max-w-4xl space-y-4">
                            <div className="flex items-center justify-between py-3 border-b">
                                <div>
                                    <Label>Enable Donations?</Label>
                                    <p className="text-xs text-muted-foreground mt-1">Allow devotees to contribute to this event</p>
                                </div>
                                <Switch checked={enableDonations} onCheckedChange={setEnableDonations} />
                            </div>
                            {enableDonations && (
                                <DonationConfigSection />
                            )}
                        </div>
                    </div>
                </TabsContent>

                {/* Tab 5: Manpower Assignment */}
                <TabsContent value="manpower" className="space-y-4">
                    <div>
                        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Manpower Assignment</h3>
                        <div className="max-w-4xl">
                            <ManpowerAssignmentSection />
                        </div>
                    </div>
                </TabsContent>

                {/* Tab 6: Resource Allocation */}
                <TabsContent value="resources" className="space-y-4">
                    <div>
                        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Resource Allocation</h3>
                        <div className="max-w-4xl">
                            <ResourceAllocationSection />
                        </div>
                    </div>
                </TabsContent>

                {/* Tab 7: Expenses */}
                <TabsContent value="expenses" className="space-y-4">
                    <div>
                        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Budget & Expenses</h3>
                        <div className="max-w-4xl">
                            <ExpenseManagementSection />
                        </div>
                    </div>
                </TabsContent>
            </Tabs>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pb-8 border-t pt-4">
                <Button variant="outline" onClick={() => navigate("/temple/events")}>
                    Cancel
                </Button>
                <Button variant="outline" onClick={() => handleCreate(false)}>
                    Save as Draft
                </Button>
                <Button onClick={() => handleCreate(true)} className="bg-green-600 hover:bg-green-700">
                    Publish Event
                </Button>
            </div>
        </motion.div>
    );
};

export default CreateEvent;
