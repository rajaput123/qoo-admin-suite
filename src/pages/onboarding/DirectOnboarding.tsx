import { useState } from "react";
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
  Link2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  "In Progress": "bg-amber-100 text-amber-700",
  "Pending Activation": "bg-blue-100 text-blue-700",
  "Activated": "bg-green-100 text-green-700",
};

const DirectOnboarding = () => {
  const [wizardOpen, setWizardOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="p-4 lg:px-8 lg:pt-4 lg:pb-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Direct Onboarding</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Platform-initiated temple and tenant creation
          </p>
        </div>
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
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hindu">Hindu Temple</SelectItem>
                          <SelectItem value="jain">Jain Temple</SelectItem>
                          <SelectItem value="buddhist">Buddhist Temple</SelectItem>
                          <SelectItem value="sikh">Gurudwara</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Country</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="in">India</SelectItem>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>State</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tn">Tamil Nadu</SelectItem>
                          <SelectItem value="kl">Kerala</SelectItem>
                          <SelectItem value="ka">Karnataka</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>City</Label>
                      <Input placeholder="City" />
                    </div>
                  </div>

                  {/* Directory Link */}
                  <Card className="border">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <Link2 className="h-4 w-4" />
                        Directory Link
                      </CardTitle>
                      <CardDescription className="text-xs">
                        Link to existing directory entry or create new
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search existing temple..." className="pl-9" />
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="createNew" />
                        <label htmlFor="createNew" className="text-sm">Create new directory entry</label>
                      </div>
                    </CardContent>
                  </Card>
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
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select plan" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="basic">Basic - Directory Only</SelectItem>
                          <SelectItem value="standard">Standard - Booking Enabled</SelectItem>
                          <SelectItem value="premium">Premium - Full SaaS</SelectItem>
                          <SelectItem value="enterprise">Enterprise - Custom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Billing Cycle</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select cycle" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="quarterly">Quarterly</SelectItem>
                          <SelectItem value="annual">Annual</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Trial Period (Days)</Label>
                      <Input type="number" defaultValue="14" />
                    </div>
                    <div className="space-y-2">
                      <Label>Region Tag</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select region" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="south">South India</SelectItem>
                          <SelectItem value="north">North India</SelectItem>
                          <SelectItem value="east">East India</SelectItem>
                          <SelectItem value="west">West India</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Assigned Account Manager</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select manager" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="am1">Account Manager A</SelectItem>
                        <SelectItem value="am2">Account Manager B</SelectItem>
                        <SelectItem value="am3">Account Manager C</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
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
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="owner">Owner</SelectItem>
                          <SelectItem value="admin">Administrator</SelectItem>
                          <SelectItem value="manager">Manager</SelectItem>
                        </SelectContent>
                      </Select>
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
                  <Card className="border bg-muted/50">
                    <CardContent className="p-4 space-y-3">
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
                    </CardContent>
                  </Card>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-4">
                  <Card className="border">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Compliance Verification</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
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
                    </CardContent>
                  </Card>

                  <Card className="border">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Activation Mode</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
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
                    </CardContent>
                  </Card>
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
                <Button onClick={() => setWizardOpen(false)}>
                  <Rocket className="h-4 w-4 mr-2" />
                  Complete Onboarding
                </Button>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border shadow-sm">
          <CardContent className="p-4">
            <p className="text-2xl font-bold">145</p>
            <p className="text-xs text-muted-foreground">Total Direct Onboardings</p>
          </CardContent>
        </Card>
        <Card className="border shadow-sm">
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-amber-600">8</p>
            <p className="text-xs text-muted-foreground">In Progress</p>
          </CardContent>
        </Card>
        <Card className="border shadow-sm">
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-blue-600">12</p>
            <p className="text-xs text-muted-foreground">Pending Activation</p>
          </CardContent>
        </Card>
        <Card className="border shadow-sm">
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-green-600">125</p>
            <p className="text-xs text-muted-foreground">Activated</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Table */}
      <Card className="border shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Recent Direct Onboardings</CardTitle>
        </CardHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Temple</TableHead>
              <TableHead>Tenant ID</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created By</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentOnboardings.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-mono text-xs">{item.id}</TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium text-sm">{item.templeName}</p>
                    <p className="text-xs text-muted-foreground">{item.region}</p>
                  </div>
                </TableCell>
                <TableCell className="font-mono text-xs">{item.tenantId || "—"}</TableCell>
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
                <TableCell className="text-sm">{item.createdBy}</TableCell>
                <TableCell className="text-xs text-muted-foreground">{item.createdAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default DirectOnboarding;
