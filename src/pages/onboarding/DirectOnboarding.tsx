import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Plus,
  Building2,
  Users,
  Shield,
  Rocket,
  ChevronRight,
  ChevronLeft,
  Check,
  Search,
  Link2,
  Download,
  Upload,
  MoreHorizontal,
  Eye
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SearchableSelect from "@/components/SearchableSelect";
import CustomFieldsSection, { CustomField } from "@/components/CustomFieldsSection";

const steps = [
  { id: 1, label: "Temple Entity", icon: Building2 },
  { id: 2, label: "Tenant Setup", icon: Users },
  { id: 3, label: "Admin User", icon: Shield },
  { id: 4, label: "Activation", icon: Rocket },
];

const recentOnboardings = [
  { 
    id: "ONB-2001", 
    templeName: "Sri Padmanabhaswamy Temple", 
    tenantId: "TEN-5001",
    region: "Kerala",
    status: "Activated",
    createdBy: "Admin A",
    createdAt: "2024-01-15 14:30",
    completedSteps: 4
  },
  { 
    id: "ONB-2000", 
    templeName: "Meenakshi Amman Temple", 
    tenantId: "TEN-5000",
    region: "Tamil Nadu",
    status: "Pending Activation",
    createdBy: "Admin B",
    createdAt: "2024-01-15 11:20",
    completedSteps: 3
  },
  { 
    id: "ONB-1999", 
    templeName: "Jagannath Temple", 
    tenantId: null,
    region: "Odisha",
    status: "In Progress",
    createdBy: "Admin A",
    createdAt: "2024-01-15 09:45",
    completedSteps: 2
  },
];

const statusColors: Record<string, string> = {
  "In Progress": "bg-warning/10 text-warning",
  "Pending Activation": "bg-info/10 text-info",
  "Activated": "bg-success/10 text-success",
};

const templeTypeOptions = [
  { value: "hindu", label: "Hindu Temple" },
  { value: "jain", label: "Jain Temple" },
  { value: "buddhist", label: "Buddhist Temple" },
  { value: "sikh", label: "Gurudwara" },
];

const countryOptions = [
  { value: "in", label: "India" },
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "sg", label: "Singapore" },
];

const stateOptions = [
  { value: "tn", label: "Tamil Nadu" },
  { value: "kl", label: "Kerala" },
  { value: "ka", label: "Karnataka" },
  { value: "ap", label: "Andhra Pradesh" },
  { value: "mh", label: "Maharashtra" },
];

const subscriptionOptions = [
  { value: "basic", label: "Basic - Directory Only" },
  { value: "standard", label: "Standard - Booking Enabled" },
  { value: "premium", label: "Premium - Full SaaS" },
  { value: "enterprise", label: "Enterprise - Custom" },
];

const billingOptions = [
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Quarterly" },
  { value: "annual", label: "Annual" },
];

const regionTagOptions = [
  { value: "south", label: "South India" },
  { value: "north", label: "North India" },
  { value: "east", label: "East India" },
  { value: "west", label: "West India" },
];

const accountManagerOptions = [
  { value: "am1", label: "Account Manager A" },
  { value: "am2", label: "Account Manager B" },
  { value: "am3", label: "Account Manager C" },
];

const roleOptions = [
  { value: "owner", label: "Owner" },
  { value: "admin", label: "Administrator" },
  { value: "manager", label: "Manager" },
];

const DirectOnboarding = () => {
  const [wizardOpen, setWizardOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [customFields, setCustomFields] = useState<CustomField[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleNextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const toggleSelectItem = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    setSelectedItems(prev => 
      prev.length === recentOnboardings.length ? [] : recentOnboardings.map(r => r.id)
    );
  };

  return (
    <div className="p-6 lg:px-8 lg:pt-4 lg:pb-8 max-w-7xl">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between mb-6"
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground">Direct Onboarding</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Platform-initiated temple and tenant creation
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Bulk Import
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Dialog open={wizardOpen} onOpenChange={setWizardOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Onboarding
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Direct Temple Onboarding</DialogTitle>
              </DialogHeader>

              {/* Stepper */}
              <div className="flex items-center justify-between mt-6 mb-8">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                        currentStep > step.id 
                          ? "bg-primary border-primary text-primary-foreground" 
                          : currentStep === step.id
                            ? "border-primary text-primary"
                            : "border-muted-foreground/30 text-muted-foreground"
                      }`}>
                        {currentStep > step.id ? (
                          <Check className="h-5 w-5" />
                        ) : (
                          <step.icon className="h-5 w-5" />
                        )}
                      </div>
                      <span className={`text-xs mt-2 ${
                        currentStep >= step.id ? "text-foreground font-medium" : "text-muted-foreground"
                      }`}>
                        {step.label}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-16 h-0.5 mx-2 ${
                        currentStep > step.id ? "bg-primary" : "bg-muted"
                      }`} />
                    )}
                  </div>
                ))}
              </div>

              {/* Step Content */}
              <div className="space-y-6">
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Temple Legal Name</Label>
                        <Input placeholder="Enter legal name" />
                      </div>
                      <div className="space-y-2">
                        <Label>Display Name</Label>
                        <Input placeholder="Enter display name" />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Deity</Label>
                        <Input placeholder="Primary deity" />
                      </div>
                      <div className="space-y-2">
                        <Label>Temple Type</Label>
                        <SearchableSelect
                          options={templeTypeOptions}
                          placeholder="Select type"
                          onValueChange={() => {}}
                          onAddNew={() => alert("Add new temple type")}
                          addNewLabel="Add Type"
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Country</Label>
                        <SearchableSelect
                          options={countryOptions}
                          placeholder="Select country"
                          onValueChange={() => {}}
                          onAddNew={() => alert("Add new country")}
                          addNewLabel="Add Country"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>State</Label>
                        <SearchableSelect
                          options={stateOptions}
                          placeholder="Select state"
                          onValueChange={() => {}}
                          onAddNew={() => alert("Add new state")}
                          addNewLabel="Add State"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>City</Label>
                        <Input placeholder="City" />
                      </div>
                    </div>

                    {/* Directory Link */}
                    <div className="glass-card rounded-xl p-4 space-y-3">
                      <div className="flex items-center gap-2">
                        <Link2 className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">Directory Link</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Link to existing directory entry or create new
                      </p>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search existing temple..." className="pl-9" />
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="createNew" />
                        <label htmlFor="createNew" className="text-sm">Create new directory entry</label>
                      </div>
                    </div>

                    {/* Custom Fields */}
                    <CustomFieldsSection 
                      fields={customFields}
                      onFieldsChange={setCustomFields}
                    />
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Tenant Name</Label>
                        <Input placeholder="Auto-generated from temple name" />
                      </div>
                      <div className="space-y-2">
                        <Label>Tenant ID</Label>
                        <Input value="TEN-5002" disabled className="bg-muted" />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Subscription Plan</Label>
                        <SearchableSelect
                          options={subscriptionOptions}
                          placeholder="Select plan"
                          onValueChange={() => {}}
                          onAddNew={() => alert("Add new plan")}
                          addNewLabel="Add Plan"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Billing Cycle</Label>
                        <SearchableSelect
                          options={billingOptions}
                          placeholder="Select cycle"
                          onValueChange={() => {}}
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Trial Period (Days)</Label>
                        <Input type="number" defaultValue="14" />
                      </div>
                      <div className="space-y-2">
                        <Label>Region Tag</Label>
                        <SearchableSelect
                          options={regionTagOptions}
                          placeholder="Select region"
                          onValueChange={() => {}}
                          onAddNew={() => alert("Add new region")}
                          addNewLabel="Add Region"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Assigned Account Manager</Label>
                      <SearchableSelect
                        options={accountManagerOptions}
                        placeholder="Select manager"
                        onValueChange={() => {}}
                        onAddNew={() => alert("Add new account manager")}
                        addNewLabel="Add Manager"
                      />
                    </div>

                    {/* Custom Fields */}
                    <CustomFieldsSection 
                      fields={customFields}
                      onFieldsChange={setCustomFields}
                    />
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Admin Full Name</Label>
                        <Input placeholder="Enter full name" />
                      </div>
                      <div className="space-y-2">
                        <Label>Role</Label>
                        <SearchableSelect
                          options={roleOptions}
                          placeholder="Select role"
                          onValueChange={() => {}}
                          onAddNew={() => alert("Add new role")}
                          addNewLabel="Add Role"
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Email</Label>
                        <Input type="email" placeholder="admin@temple.com" />
                      </div>
                      <div className="space-y-2">
                        <Label>Phone</Label>
                        <Input placeholder="+91 XXXXXXXXXX" />
                      </div>
                    </div>
                    <div className="glass-card rounded-xl p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Generate Temporary Password</p>
                          <p className="text-xs text-muted-foreground">System will generate a secure password</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Send Credentials via Email</p>
                          <p className="text-xs text-muted-foreground">Email login credentials to admin</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>

                    {/* Custom Fields */}
                    <CustomFieldsSection 
                      fields={customFields}
                      onFieldsChange={setCustomFields}
                    />
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="space-y-4">
                    <div className="glass-card rounded-xl p-4 space-y-3">
                      <h4 className="text-sm font-semibold">Compliance Verification</h4>
                      <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                        <span className="text-sm">Legal Documents Verified</span>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                        <span className="text-sm">Bank Details Verified</span>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                        <span className="text-sm">KYC Completed</span>
                        <Switch />
                      </div>
                    </div>

                    <div className="glass-card rounded-xl p-4 space-y-3">
                      <h4 className="text-sm font-semibold">Activation Mode</h4>
                      {[
                        { value: "directory", label: "Directory Only", desc: "Temple appears in public directory" },
                        { value: "booking", label: "Booking Enabled", desc: "Directory + online booking features" },
                        { value: "full", label: "Full SaaS Active", desc: "Complete platform access" },
                      ].map((mode) => (
                        <label key={mode.value} className="flex items-start gap-3 p-3 rounded-lg border cursor-pointer hover:bg-muted/50">
                          <input type="radio" name="activation" value={mode.value} className="mt-1" />
                          <div>
                            <p className="text-sm font-medium">{mode.label}</p>
                            <p className="text-xs text-muted-foreground">{mode.desc}</p>
                          </div>
                        </label>
                      ))}
                    </div>

                    {/* Summary */}
                    <div className="glass-card rounded-xl p-4 space-y-3">
                      <h4 className="text-sm font-semibold">Onboarding Summary</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Temple Entity</span>
                          <Badge variant="outline" className="text-success border-success">Complete</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Tenant Setup</span>
                          <Badge variant="outline" className="text-success border-success">Complete</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Admin User</span>
                          <Badge variant="outline" className="text-success border-success">Complete</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Activation</span>
                          <Badge variant="outline">Pending</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t">
                <Button 
                  variant="outline" 
                  onClick={handlePrevStep}
                  disabled={currentStep === 1}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                {currentStep < 4 ? (
                  <Button onClick={handleNextStep}>
                    Next
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button onClick={() => { setWizardOpen(false); setCurrentStep(1); }}>
                    <Rocket className="h-4 w-4 mr-2" />
                    Complete & Activate
                  </Button>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Onboarded", count: 1247, icon: Building2 },
          { label: "In Progress", count: 12, icon: Users },
          { label: "Pending Activation", count: 8, icon: Shield },
          { label: "Activated This Month", count: 45, icon: Rocket },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card rounded-2xl p-4 glass-shadow"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/10">
                <item.icon className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{item.count}</p>
                <p className="text-xs text-muted-foreground">{item.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bulk Actions */}
      {selectedItems.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-xl p-3 mb-4 flex items-center justify-between"
        >
          <span className="text-sm font-medium">{selectedItems.length} item(s) selected</span>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Rocket className="h-4 w-4 mr-2" />
              Activate Selected
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Selected
            </Button>
          </div>
        </motion.div>
      )}

      {/* Recent Onboardings Table */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="glass-card rounded-2xl glass-shadow overflow-hidden"
      >
        <div className="px-5 py-4 border-b border-border/50 flex items-center justify-between">
          <h2 className="font-semibold text-foreground">Recent Onboardings</h2>
          <Button variant="link" size="sm" className="text-primary">View All</Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox 
                  checked={selectedItems.length === recentOnboardings.length}
                  onCheckedChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Temple</TableHead>
              <TableHead>Tenant ID</TableHead>
              <TableHead>Region</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created By</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentOnboardings.map((item) => (
              <TableRow key={item.id} className="cursor-pointer hover:bg-muted/50">
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Checkbox 
                    checked={selectedItems.includes(item.id)}
                    onCheckedChange={() => toggleSelectItem(item.id)}
                  />
                </TableCell>
                <TableCell className="font-mono text-xs">{item.id}</TableCell>
                <TableCell className="font-medium">{item.templeName}</TableCell>
                <TableCell className="text-sm">{item.tenantId || "—"}</TableCell>
                <TableCell className="text-sm">{item.region}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={(item.completedSteps / 4) * 100} className="w-16 h-1.5" />
                    <span className="text-xs text-muted-foreground">{item.completedSteps}/4</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={statusColors[item.status]} variant="secondary">
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{item.createdBy}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-popover">
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Rocket className="h-4 w-4 mr-2" />
                        Continue Onboarding
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </motion.div>
    </div>
  );
};

export default DirectOnboarding;