import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import {
    ArrowLeft, Edit, Archive, Trash2, Plus, Upload, Calendar,
    IndianRupee, TrendingUp, FileText, Users, Activity,
    CheckCircle, Clock, X
} from "lucide-react";
import { toast } from "sonner";
import { projects, Project, Milestone, Donation, Expense, Update, CustomField, getStatusColor } from "@/data/projectData";
import CustomFieldsSection from "@/components/CustomFieldsSection";

const ProjectDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Find project (in real app, fetch from API)
    const project = projects.find(p => p.id === id);

    if (!project) {
        return (
            <div className="p-6">
                <div className="text-center py-20">
                    <h2 className="text-xl font-semibold mb-2">Project Not Found</h2>
                    <Button onClick={() => navigate("/temple/projects/all")} variant="outline">
                        Back to Projects
                    </Button>
                </div>
            </div>
        );
    }

    const [activeTab, setActiveTab] = useState("overview");
    const [showMilestoneDialog, setShowMilestoneDialog] = useState(false);
    const [showExpenseDialog, setShowExpenseDialog] = useState(false);
    const [showUpdateDialog, setShowUpdateDialog] = useState(false);
    const [showDonationDialog, setShowDonationDialog] = useState(false);

    const fundingProgress = (project.raisedAmount / project.goalAmount) * 100;
    const remainingBudget = project.goalAmount - project.spentAmount;
    const budgetVariance = ((project.spentAmount - project.goalAmount) / project.goalAmount) * 100;

    return (
        <div className="p-6 space-y-6">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" onClick={() => navigate("/temple/projects/all")}>
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent">
                                    {project.title}
                                </h1>
                                <Badge className={`${getStatusColor(project.status)} border-0`}>
                                    {project.status}
                                </Badge>
                            </div>
                            <p className="text-muted-foreground">{project.type} • {project.manager}</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="gap-2">
                            <Edit className="h-4 w-4" />Edit
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2">
                            <Archive className="h-4 w-4" />Archive
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2 text-red-600">
                            <Trash2 className="h-4 w-4" />Delete
                        </Button>
                    </div>
                </div>

                {/* Progress Banner */}
                <Card className="p-6 mb-6 border-0">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-muted-foreground">Overall Progress</span>
                                <span className="text-sm font-medium">{project.completion}%</span>
                            </div>
                            <div className="h-3 bg-muted rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-amber-600 to-amber-800 transition-all"
                                    style={{ width: `${project.completion}%` }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Key Stats */}
                    <div className="grid grid-cols-4 gap-4">
                        <div>
                            <p className="text-xs text-muted-foreground">Goal Amount</p>
                            <p className="text-lg font-bold">₹{(project.goalAmount / 100000).toFixed(1)}L</p>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground">Raised</p>
                            <p className="text-lg font-bold text-green-600">₹{(project.raisedAmount / 100000).toFixed(1)}L</p>
                            <p className="text-xs text-muted-foreground">{fundingProgress.toFixed(0)}%</p>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground">Spent</p>
                            <p className="text-lg font-bold text-amber-600">₹{(project.spentAmount / 100000).toFixed(1)}L</p>
                            <p className="text-xs text-muted-foreground">{((project.spentAmount / project.goalAmount) * 100).toFixed(0)}%</p>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground">Remaining Budget</p>
                            <p className={`text-lg font-bold ${remainingBudget >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                                ₹{Math.abs(remainingBudget / 100000).toFixed(1)}L
                            </p>
                            {budgetVariance > 0 && (
                                <p className="text-xs text-red-600">{budgetVariance.toFixed(0)}% over</p>
                            )}
                        </div>
                    </div>
                </Card>

                {/* Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <div className="border-b border-border">
                        <TabsList className="w-full justify-start border-b-0 rounded-none h-auto p-0 bg-transparent gap-0">
                            <TabsTrigger value="overview" className="rounded-none border-b-2 border-transparent data-[state=active]:border-amber-700 data-[state=active]:bg-transparent px-4 py-2">
                                <FileText className="h-4 w-4 mr-2" />Overview
                            </TabsTrigger>
                            <TabsTrigger value="funding" className="rounded-none border-b-2 border-transparent data-[state=active]:border-amber-700 data-[state=active]:bg-transparent px-4 py-2">
                                <IndianRupee className="h-4 w-4 mr-2" />Funding
                            </TabsTrigger>
                            <TabsTrigger value="expenses" className="rounded-none border-b-2 border-transparent data-[state=active]:border-amber-700 data-[state=active]:bg-transparent px-4 py-2">
                                <TrendingUp className="h-4 w-4 mr-2" />Expenses
                            </TabsTrigger>
                            <TabsTrigger value="updates" className="rounded-none border-b-2 border-transparent data-[state=active]:border-amber-700 data-[state=active]:bg-transparent px-4 py-2">
                                <Users className="h-4 w-4 mr-2" />Updates
                            </TabsTrigger>
                            <TabsTrigger value="activity" className="rounded-none border-b-2 border-transparent data-[state=active]:border-amber-700 data-[state=active]:bg-transparent px-4 py-2">
                                <Activity className="h-4 w-4 mr-2" />Activity Log
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    {/* Tab 1: Overview */}
                    <TabsContent value="overview" className="space-y-6 mt-6">
                        <Card className="p-6 border-0">
                            <h3 className="font-semibold mb-4">Project Details</h3>
                            <div className="space-y-4">
                                <div>
                                    <Label className="text-sm font-medium">Description</Label>
                                    <Textarea
                                        value={project.description}
                                        rows={4}
                                        className="mt-1.5"
                                        readOnly
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label className="text-sm font-medium">Start Date</Label>
                                        <Input value={project.startDate} readOnly className="mt-1.5" />
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium">End Date</Label>
                                        <Input value={project.endDate} readOnly className="mt-1.5" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label className="text-sm font-medium">Priority</Label>
                                        <Input value={project.priority} readOnly className="mt-1.5" />
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium">Completion %</Label>
                                        <Input value={`${project.completion}%`} readOnly className="mt-1.5" />
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Milestones */}
                        <Card className="p-6 border-0">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold">Milestones</h3>
                                <Button size="sm" onClick={() => setShowMilestoneDialog(true)} className="gap-2">
                                    <Plus className="h-4 w-4" />Add Milestone
                                </Button>
                            </div>
                            <div className="space-y-3">
                                {project.milestones.map(milestone => (
                                    <div key={milestone.id} className="border rounded-lg p-4">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h4 className="font-medium">{milestone.title}</h4>
                                                    <Badge className={
                                                        milestone.status === "Completed" ? "bg-green-100 text-green-700" :
                                                            milestone.status === "In Progress" ? "bg-blue-100 text-blue-700" :
                                                                milestone.status === "Delayed" ? "bg-red-100 text-red-700" :
                                                                    "bg-gray-100 text-gray-700"
                                                    }>
                                                        {milestone.status}
                                                    </Badge>
                                                </div>
                                                <p className="text-sm text-muted-foreground">{milestone.description}</p>
                                                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="h-3 w-3" />
                                                        {milestone.targetDate}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <IndianRupee className="h-3 w-3" />
                                                        ₹{(milestone.estimatedCost / 100000).toFixed(1)}L
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Custom Fields */}
                        <Card className="p-6 border-0">
                            <h3 className="font-semibold mb-4">Custom Fields (Overview)</h3>
                            <CustomFieldsSection
                                fields={project.customFields.overview.map(f => ({ name: f.name, value: f.value, type: f.type as any }))}
                                onFieldsChange={() => { }}
                            />
                        </Card>
                    </TabsContent>

                    {/* Tab 2: Funding */}
                    <TabsContent value="funding" className="space-y-6 mt-6">
                        <Card className="p-6 border-0">
                            <h3 className="font-semibold mb-4">Fundraising Configuration</h3>
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label className="text-sm font-medium">Fundraising Goal</Label>
                                        <Input value={`₹${(project.goalAmount / 100000).toFixed(1)}L`} readOnly className="mt-1.5" />
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium">Minimum Contribution</Label>
                                        <Input value={`₹${project.minimumContribution}`} readOnly className="mt-1.5" />
                                    </div>
                                </div>
                                <div>
                                    <Label className="text-sm font-medium">Suggested Donation Slabs</Label>
                                    <div className="flex gap-2 mt-1.5">
                                        {project.suggestedSlabs.map((slab, i) => (
                                            <Badge key={i} variant="outline">₹{slab.toLocaleString()}</Badge>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <Label className="text-sm font-medium">Show Donor Names</Label>
                                    <Switch checked={project.showDonorNames} />
                                </div>
                                <div className="flex items-center justify-between">
                                    <Label className="text-sm font-medium">Public Visibility</Label>
                                    <Switch checked={project.publicVisibility} />
                                </div>
                                <div>
                                    <Label className="text-sm font-medium">Transparency Note</Label>
                                    <Textarea value={project.transparencyNote} readOnly rows={3} className="mt-1.5" />
                                </div>
                            </div>
                        </Card>

                        {/* Donations Table */}
                        <Card className="p-6 border-0">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold">Donations Received</h3>
                                <Button size="sm" onClick={() => setShowDonationDialog(true)} className="gap-2">
                                    <Plus className="h-4 w-4" />Record Donation
                                </Button>
                            </div>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Donor</TableHead>
                                        <TableHead className="text-right">Amount</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Milestone Linked</TableHead>
                                        <TableHead>Payment Mode</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {project.donations.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                                                No donations recorded yet
                                            </TableCell>
                                        </TableRow>
                                    ) : project.donations.map(donation => (
                                        <TableRow key={donation.id}>
                                            <TableCell className="font-medium">
                                                {donation.anonymous ? "Anonymous" : donation.donorName}
                                            </TableCell>
                                            <TableCell className="text-right font-medium text-green-600">
                                                ₹{donation.amount.toLocaleString()}
                                            </TableCell>
                                            <TableCell className="text-sm">{donation.date}</TableCell>
                                            <TableCell className="text-sm">
                                                {donation.milestoneLinked ?
                                                    project.milestones.find(m => m.id === donation.milestoneLinked)?.title || "—"
                                                    : "—"
                                                }
                                            </TableCell>
                                            <TableCell className="text-sm">{donation.paymentMode}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Card>

                        {/* Custom Fields */}
                        <Card className="p-6 border-0">
                            <h3 className="font-semibold mb-4">Custom Fields (Funding)</h3>
                            <CustomFieldsSection
                                fields={project.customFields.funding.map(f => ({ name: f.name, value: f.value, type: f.type as any }))}
                                onFieldsChange={() => { }}
                            />
                        </Card>
                    </TabsContent>

                    {/* Tab 3: Expenses */}
                    <TabsContent value="expenses" className="space-y-6 mt-6">
                        {/* Expense Summary */}
                        <div className="grid grid-cols-3 gap-4">
                            <Card className="p-4 border-0">
                                <p className="text-xs text-muted-foreground">Total Spent</p>
                                <p className="text-2xl font-bold text-amber-600">₹{(project.spentAmount / 100000).toFixed(1)}L</p>
                            </Card>
                            <Card className="p-4 border-0">
                                <p className="text-xs text-muted-foreground">Remaining Budget</p>
                                <p className={`text-2xl font-bold ${remainingBudget >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                                    ₹{Math.abs(remainingBudget / 100000).toFixed(1)}L
                                </p>
                            </Card>
                            <Card className="p-4 border-0">
                                <p className="text-xs text-muted-foreground">Budget Variance</p>
                                <p className={`text-2xl font-bold ${budgetVariance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                                    {budgetVariance > 0 ? '+' : ''}{budgetVariance.toFixed(1)}%
                                </p>
                            </Card>
                        </div>

                        {/* Expenses Table */}
                        <Card className="p-6 border-0">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold">Expense Tracking</h3>
                                <Button size="sm" onClick={() => setShowExpenseDialog(true)} className="gap-2">
                                    <Plus className="h-4 w-4" />Add Expense
                                </Button>
                            </div>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Expense Title</TableHead>
                                        <TableHead>Vendor</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead className="text-right">Amount</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Approved By</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {project.expenses.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                                                No expenses recorded yet
                                            </TableCell>
                                        </TableRow>
                                    ) : project.expenses.map(expense => (
                                        <TableRow key={expense.id}>
                                            <TableCell className="font-medium">{expense.title}</TableCell>
                                            <TableCell className="text-sm">{expense.vendor}</TableCell>
                                            <TableCell className="text-sm">{expense.category}</TableCell>
                                            <TableCell className="text-right font-medium">₹{expense.amount.toLocaleString()}</TableCell>
                                            <TableCell className="text-sm">{expense.date}</TableCell>
                                            <TableCell>
                                                <Badge className={
                                                    expense.paidStatus === "Paid" ? "bg-green-100 text-green-700" :
                                                        expense.paidStatus === "Overdue" ? "bg-red-100 text-red-700" :
                                                            "bg-amber-100 text-amber-700"
                                                }>
                                                    {expense.paidStatus}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-sm">{expense.approvedBy || "—"}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Card>

                        {/* Custom Fields */}
                        <Card className="p-6 border-0">
                            <h3 className="font-semibold mb-4">Custom Fields (Expenses)</h3>
                            <CustomFieldsSection
                                fields={project.customFields.expenses.map(f => ({ name: f.name, value: f.value, type: f.type as any }))}
                                onFieldsChange={() => { }}
                            />
                        </Card>
                    </TabsContent>

                    {/* Tab 4: Updates */}
                    <TabsContent value="updates" className="space-y-6 mt-6">
                        <Card className="p-6 border-0">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold">Progress Updates</h3>
                                <Button size="sm" onClick={() => setShowUpdateDialog(true)} className="gap-2">
                                    <Plus className="h-4 w-4" />Post Update
                                </Button>
                            </div>
                            <div className="space-y-4">
                                {project.updates.length === 0 ? (
                                    <div className="text-center text-muted-foreground py-8">
                                        No updates posted yet
                                    </div>
                                ) : project.updates.map(update => (
                                    <div key={update.id} className="border rounded-lg p-4">
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <Badge variant="outline">{update.type}</Badge>
                                                {update.visibleToDevotees && (
                                                    <Badge className="bg-blue-100 text-blue-700">Public</Badge>
                                                )}
                                            </div>
                                            <span className="text-xs text-muted-foreground">{update.date}</span>
                                        </div>
                                        <h4 className="font-medium mb-1">{update.title}</h4>
                                        <p className="text-sm text-muted-foreground">{update.content}</p>
                                        <p className="text-xs text-muted-foreground mt-2">Posted by {update.author}</p>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Custom Fields */}
                        <Card className="p-6 border-0">
                            <h3 className="font-semibold mb-4">Custom Fields (Updates)</h3>
                            <CustomFieldsSection
                                fields={project.customFields.updates.map(f => ({ name: f.name, value: f.value, type: f.type as any }))}
                                onFieldsChange={() => { }}
                            />
                        </Card>
                    </TabsContent>

                    {/* Tab 5: Activity Log */}
                    <TabsContent value="activity" className="space-y-6 mt-6">
                        <Card className="p-6 border-0">
                            <h3 className="font-semibold mb-4">Activity Timeline</h3>
                            <div className="space-y-3">
                                {project.activityLog.map(log => (
                                    <div key={log.id} className="flex gap-3 pb-3 border-b last:border-b-0">
                                        <div className={`mt-1 p-1.5 rounded-full ${log.type === 'donation' ? 'bg-green-100' :
                                            log.type === 'expense' ? 'bg-amber-100' :
                                                log.type === 'milestone' ? 'bg-blue-100' :
                                                    log.type === 'status' ? 'bg-purple-100' :
                                                        'bg-gray-100'
                                            }`}>
                                            {log.type === 'donation' && <IndianRupee className="h-3 w-3 text-green-600" />}
                                            {log.type === 'expense' && <TrendingUp className="h-3 w-3 text-amber-600" />}
                                            {log.type === 'milestone' && <CheckCircle className="h-3 w-3 text-blue-600" />}
                                            {log.type === 'status' && <Activity className="h-3 w-3 text-purple-600" />}
                                            {log.type === 'update' && <FileText className="h-3 w-3 text-gray-600" />}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm font-medium">{log.event}</p>
                                                <span className="text-xs text-muted-foreground">{new Date(log.timestamp).toLocaleDateString()}</span>
                                            </div>
                                            <p className="text-sm text-muted-foreground">{log.description}</p>
                                            <p className="text-xs text-muted-foreground mt-0.5">by {log.user}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </TabsContent>
                </Tabs>
            </motion.div>

            {/* Dialogs */}

            {/* Add Milestone Dialog */}
            <Dialog open={showMilestoneDialog} onOpenChange={setShowMilestoneDialog}>
                <DialogContent className="bg-background">
                    <DialogHeader>
                        <DialogTitle>Add Milestone</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <Label>Milestone Title *</Label>
                            <Input placeholder="e.g., Foundation Work" className="mt-1.5" />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Textarea placeholder="Milestone details..." rows={3} className="mt-1.5" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>Target Date *</Label>
                                <Input type="date" className="mt-1.5" />
                            </div>
                            <div>
                                <Label>Estimated Cost *</Label>
                                <Input type="number" placeholder="0" className="mt-1.5" />
                            </div>
                        </div>
                        <div>
                            <Label>Status</Label>
                            <Select defaultValue="Pending">
                                <SelectTrigger className="mt-1.5 bg-background">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-popover">
                                    <SelectItem value="Pending">Pending</SelectItem>
                                    <SelectItem value="In Progress">In Progress</SelectItem>
                                    <SelectItem value="Completed">Completed</SelectItem>
                                    <SelectItem value="Delayed">Delayed</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowMilestoneDialog(false)}>Cancel</Button>
                        <Button onClick={() => { toast.success("Milestone added"); setShowMilestoneDialog(false); }}>Add Milestone</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Record Donation Dialog */}
            <Dialog open={showDonationDialog} onOpenChange={setShowDonationDialog}>
                <DialogContent className="bg-background max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Record Donation</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>Donor Name *</Label>
                                <Input placeholder="Enter donor name" className="mt-1.5" />
                            </div>
                            <div>
                                <Label>Contact Number</Label>
                                <Input placeholder="Phone number" className="mt-1.5" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>Donation Amount *</Label>
                                <Input type="number" placeholder="0" className="mt-1.5" />
                            </div>
                            <div>
                                <Label>Donation Date *</Label>
                                <Input type="date" className="mt-1.5" />
                            </div>
                        </div>
                        <div>
                            <Label>Payment Mode *</Label>
                            <Select defaultValue="Online">
                                <SelectTrigger className="mt-1.5 bg-background">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-popover">
                                    <SelectItem value="Online">Online Transfer</SelectItem>
                                    <SelectItem value="Card">Credit/Debit Card</SelectItem>
                                    <SelectItem value="Cash">Cash</SelectItem>
                                    <SelectItem value="Cheque">Cheque</SelectItem>
                                    <SelectItem value="UPI">UPI</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label>Link to Milestone (Optional)</Label>
                            <Select>
                                <SelectTrigger className="mt-1.5 bg-background">
                                    <SelectValue placeholder="Select milestone" />
                                </SelectTrigger>
                                <SelectContent className="bg-popover">
                                    <SelectItem value="none">None</SelectItem>
                                    {project.milestones.map(m => (
                                        <SelectItem key={m.id} value={m.id}>{m.title}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label>Transaction/Receipt Number</Label>
                            <Input placeholder="Reference number" className="mt-1.5" />
                        </div>
                        <div className="flex items-center gap-2">
                            <Switch id="anonymous" />
                            <Label htmlFor="anonymous" className="cursor-pointer">Mark as Anonymous</Label>
                        </div>
                        <div>
                            <Label>Notes</Label>
                            <Textarea placeholder="Additional notes..." rows={3} className="mt-1.5" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowDonationDialog(false)}>Cancel</Button>
                        <Button onClick={() => { toast.success("Donation recorded successfully"); setShowDonationDialog(false); }}>
                            Record Donation
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Add Expense Dialog */}
            <Dialog open={showExpenseDialog} onOpenChange={setShowExpenseDialog}>
                <DialogContent className="bg-background max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Add Expense</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                        <div>
                            <Label>Expense Title *</Label>
                            <Input placeholder="e.g., Steel bars purchase" className="mt-1.5" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>Vendor Name *</Label>
                                <Input placeholder="Vendor/Supplier name" className="mt-1.5" />
                            </div>
                            <div>
                                <Label>Category *</Label>
                                <Select defaultValue="Materials">
                                    <SelectTrigger className="mt-1.5 bg-background">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-popover">
                                        <SelectItem value="Materials">Construction Materials</SelectItem>
                                        <SelectItem value="Labor">Labor Costs</SelectItem>
                                        <SelectItem value="Equipment">Equipment Rental</SelectItem>
                                        <SelectItem value="Professional">Professional Services</SelectItem>
                                        <SelectItem value="Administrative">Administrative</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>Amount *</Label>
                                <Input type="number" placeholder="0" className="mt-1.5" />
                            </div>
                            <div>
                                <Label>Expense Date *</Label>
                                <Input type="date" className="mt-1.5" />
                            </div>
                        </div>
                        <div>
                            <Label>Payment Status *</Label>
                            <Select defaultValue="Pending">
                                <SelectTrigger className="mt-1.5 bg-background">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-popover">
                                    <SelectItem value="Pending">Pending</SelectItem>
                                    <SelectItem value="Paid">Paid</SelectItem>
                                    <SelectItem value="Overdue">Overdue</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>Invoice/Bill Number</Label>
                                <Input placeholder="Bill reference" className="mt-1.5" />
                            </div>
                            <div>
                                <Label>Approved By</Label>
                                <Input placeholder="Approver name" className="mt-1.5" />
                            </div>
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Textarea placeholder="Expense details..." rows={3} className="mt-1.5" />
                        </div>
                        <div>
                            <Label>Upload Bill/Invoice (Optional)</Label>
                            <Input type="file" className="mt-1.5" accept=".pdf,.jpg,.jpeg,.png" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowExpenseDialog(false)}>Cancel</Button>
                        <Button onClick={() => { toast.success("Expense added successfully"); setShowExpenseDialog(false); }}>
                            Add Expense
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Post Update Dialog */}
            <Dialog open={showUpdateDialog} onOpenChange={setShowUpdateDialog}>
                <DialogContent className="bg-background max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Post Project Update</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                        <div>
                            <Label>Update Title *</Label>
                            <Input placeholder="e.g., Foundation work completed" className="mt-1.5" />
                        </div>
                        <div>
                            <Label>Update Type *</Label>
                            <Select defaultValue="Progress">
                                <SelectTrigger className="mt-1.5 bg-background">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-popover">
                                    <SelectItem value="Progress">Progress Update</SelectItem>
                                    <SelectItem value="Photo Gallery">Photo Gallery</SelectItem>
                                    <SelectItem value="Completion">Completion Notice</SelectItem>
                                    <SelectItem value="Delay">Delay Notification</SelectItem>
                                    <SelectItem value="Announcement">General Announcement</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label>Update Content *</Label>
                            <Textarea
                                placeholder="Describe the progress or update in detail..."
                                rows={6}
                                className="mt-1.5"
                            />
                        </div>
                        <div>
                            <Label>Upload Photos (Optional)</Label>
                            <Input type="file" className="mt-1.5" accept="image/*" multiple />
                            <p className="text-xs text-muted-foreground mt-1">You can select multiple images</p>
                        </div>
                        <div className="flex items-center gap-2 p-3 border rounded-lg bg-muted/30">
                            <Switch id="visibility" defaultChecked />
                            <div className="flex-1">
                                <Label htmlFor="visibility" className="cursor-pointer font-medium">Visible to Devotees</Label>
                                <p className="text-xs text-muted-foreground">Make this update public on devotee app/website</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>Update Date</Label>
                                <Input type="date" className="mt-1.5" defaultValue={new Date().toISOString().split('T')[0]} />
                            </div>
                            <div>
                                <Label>Posted By</Label>
                                <Input placeholder="Your name" className="mt-1.5" defaultValue={project.manager} />
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowUpdateDialog(false)}>Cancel</Button>
                        <Button onClick={() => { toast.success("Update posted successfully"); setShowUpdateDialog(false); }}>
                            Post Update
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ProjectDetail;
