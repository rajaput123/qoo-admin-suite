import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Save, Receipt, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useDonations, useFunds, useDonors } from "@/modules/donations/hooks";
import { recordDonation, createFund } from "@/modules/donations/donationsStore";
import { generateReceiptPDF } from "@/lib/receiptGenerator";
import SelectWithAddNew from "@/components/SelectWithAddNew";

type DonationType = "Counter" | "Online" | "Event" | "Project";

const AddDonation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const donations = useDonations();
  const managedFunds = useFunds();
  const donors = useDonors();

  const [formData, setFormData] = useState({
    // Step 1: Donation Basics
    amount: "",
    date: new Date().toISOString().split('T')[0],
    fund: "",
    donationType: "" as DonationType | "",
    
    // Step 2: Donor Section
    donorName: "",
    donorPhone: "",
    
    // Step 3: Tax Receipt Option
    wants80G: false,
    pan: "",
    address: "",
    email: "",
    
    // Step 4: Channel Details (conditional based on donation type)
    counterId: "",
    paymentMode: "Cash" as "Cash" | "UPI" | "Bank Transfer" | "Online" | "Cheque" | "In-Kind",
    paymentReference: "",
    eventName: "",
    projectName: "",
    
    // Additional
    remarks: "",
  });

  const [showAddFund, setShowAddFund] = useState(false);
  const [showAddCounter, setShowAddCounter] = useState(false);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [showAddProject, setShowAddProject] = useState(false);
  const [newFundName, setNewFundName] = useState("");
  const [newCounterName, setNewCounterName] = useState("");
  const [newEventName, setNewEventName] = useState("");
  const [newProjectName, setNewProjectName] = useState("");

  // Get available funds
  const getAvailableFunds = (): string[] => {
    const fundSet = new Set<string>();
    managedFunds.filter(f => f.isActive).forEach(fund => {
      fundSet.add(fund.name);
    });
    donations.forEach(donation => {
      if (donation.purpose) {
        fundSet.add(donation.purpose);
      }
    });
    return Array.from(fundSet).sort();
  };

  const [availableFunds, setAvailableFunds] = useState<string[]>(getAvailableFunds());
  
  useEffect(() => {
    setAvailableFunds(getAvailableFunds());
  }, [managedFunds, donations]);

  // Get available counters
  const [availableCounters, setAvailableCounters] = useState([
    { value: "counter-1", label: "Main Counter" },
    { value: "counter-2", label: "Donation Counter" },
    { value: "counter-3", label: "Seva Counter" },
  ]);

  // Get available events
  const [availableEvents, setAvailableEvents] = useState([
    { value: "event-1", label: "Maha Shivaratri 2025" },
    { value: "event-2", label: "Karthika Deepam" },
  ]);

  // Get available projects
  const [availableProjects, setAvailableProjects] = useState([
    { value: "project-1", label: "Temple Renovation" },
    { value: "project-2", label: "New Hall Construction" },
  ]);

  // Validate PAN format
  const validatePAN = (pan: string): boolean => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(pan.toUpperCase());
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      toast({ title: "Error", description: "Please enter a valid amount", variant: "destructive" });
      return;
    }

    if (!formData.fund) {
      toast({ title: "Error", description: "Please select a fund", variant: "destructive" });
      return;
    }

    if (!formData.donationType) {
      toast({ title: "Error", description: "Please select donation type", variant: "destructive" });
      return;
    }

    if (!formData.donorName.trim()) {
      toast({ title: "Error", description: "Please enter donor name", variant: "destructive" });
      return;
    }

    if (!formData.donorPhone.trim()) {
      toast({ title: "Error", description: "Please enter donor mobile number", variant: "destructive" });
      return;
    }

    // Validate 80G fields if requested
    if (formData.wants80G) {
      if (!formData.pan.trim()) {
        toast({ title: "Error", description: "PAN number is required for 80G receipt", variant: "destructive" });
        return;
      }
      if (!validatePAN(formData.pan)) {
        toast({ title: "Error", description: "Invalid PAN format. Format: ABCDE1234F", variant: "destructive" });
        return;
      }
      if (!formData.address.trim()) {
        toast({ title: "Error", description: "Address is required for 80G receipt", variant: "destructive" });
        return;
      }
    }

    // Conditional validation based on donation type
    if (formData.donationType === "Counter" && !formData.counterId) {
      toast({ title: "Error", description: "Please select a counter", variant: "destructive" });
      return;
    }

    if (formData.donationType === "Online" && !formData.paymentReference) {
      toast({ title: "Error", description: "Please enter payment reference", variant: "destructive" });
      return;
    }

    if (formData.donationType === "Event" && !formData.eventName) {
      toast({ title: "Error", description: "Please select an event", variant: "destructive" });
      return;
    }

    if (formData.donationType === "Project" && !formData.projectName) {
      toast({ title: "Error", description: "Please select a project", variant: "destructive" });
      return;
    }

    // Map donation type to source module
    const sourceModuleMap: Record<DonationType, string> = {
      "Counter": "Counter",
      "Online": "Online Portal",
      "Event": "Event",
      "Project": "Manual",
    };

    // Determine channel based on donation type
    let channel: "Cash" | "UPI" | "Bank Transfer" | "Online" | "Cheque" | "In-Kind" = "Cash";
    if (formData.donationType === "Online") {
      channel = "Online";
    } else if (formData.donationType === "Counter") {
      channel = formData.paymentMode;
    }

    // Record donation
    const donation = recordDonation({
      donorName: formData.donorName.trim(),
      phone: formData.donorPhone.trim(),
      email: formData.email.trim() || undefined,
      city: formData.address.trim() || undefined, // Using address as city for now
      pan: formData.wants80G ? formData.pan.toUpperCase().trim() : undefined,
      amount: parseFloat(formData.amount),
      purpose: formData.fund,
      channel: channel,
      mode: formData.paymentMode,
      referenceNo: formData.paymentReference || undefined,
      remarks: formData.remarks.trim() || undefined,
      sourceModule: sourceModuleMap[formData.donationType] as any,
      sourceRecordId: formData.eventName || formData.projectName || undefined,
      counterId: formData.counterId || undefined,
      date: formData.date,
      createdBy: "System",
    });

    // Generate receipt (file path stored in donation record)
    try {
      const donor = donors.find(d => d.donorId === donation.donorId);
      await generateReceiptPDF(donation, donor || null, formData.wants80G);
      
      toast({
        title: "Donation Recorded",
        description: formData.wants80G 
          ? `80G receipt ${donation.receiptNo} generated successfully. You can download it from the donations list.`
          : `Receipt ${donation.receiptNo} generated successfully. You can download it from the donations list.`,
      });
    } catch (error) {
      toast({
        title: "Donation Recorded",
        description: `Receipt ${donation.receiptNo} generated. You can download it from the donations list.`,
      });
    }

    // Navigate back to donations list
    navigate("/temple/donations/list");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/temple/donations/list")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Add Donation</h1>
          <p className="text-sm text-muted-foreground mt-1">Record a new donation</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Donation Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1: Donation Basics */}
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold mb-3">Step 1 — Enter Donation Basics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Amount (₹) *</Label>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Date *</Label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Fund *</Label>
                  <SelectWithAddNew
                    value={formData.fund}
                    onValueChange={(v) => setFormData({ ...formData, fund: v })}
                    placeholder="Select fund"
                    options={availableFunds}
                    onAddNew={(newFund) => {
                      try {
                        createFund({
                          name: newFund,
                          createdBy: "System",
                        });
                        setFormData({ ...formData, fund: newFund });
                        toast({ title: "Success", description: `Fund "${newFund}" created successfully` });
                      } catch (error: any) {
                        toast({ title: "Error", description: error.message || "Failed to create fund", variant: "destructive" });
                      }
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Donation Type *</Label>
                  <Select 
                    value={formData.donationType} 
                    onValueChange={(v) => setFormData({ ...formData, donationType: v as DonationType })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select donation type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Counter">Counter</SelectItem>
                      <SelectItem value="Online">Online</SelectItem>
                      <SelectItem value="Event">Event</SelectItem>
                      <SelectItem value="Project">Project</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Step 2: Donor Section */}
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold mb-3">Step 2 — Donor Section</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Donor Name *</Label>
                  <Input
                    placeholder="Enter donor name"
                    value={formData.donorName}
                    onChange={(e) => setFormData({ ...formData, donorName: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Mobile *</Label>
                  <Input
                    placeholder="Enter mobile number"
                    value={formData.donorPhone}
                    onChange={(e) => setFormData({ ...formData, donorPhone: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Step 3: Tax Receipt Option */}
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold mb-3">Step 3 — Tax Receipt Option</h3>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-0.5">
                  <Label htmlFor="80g-toggle" className="text-base">Donor wants tax receipt (80G)?</Label>
                  <p className="text-sm text-muted-foreground">Enable to generate 80G certificate</p>
                </div>
                <Switch
                  id="80g-toggle"
                  checked={formData.wants80G}
                  onCheckedChange={(checked) => setFormData({ ...formData, wants80G: checked })}
                />
              </div>

              {formData.wants80G && (
                <div className="mt-4 space-y-4 p-4 border rounded-lg bg-muted/30">
                  <div className="space-y-2">
                    <Label>PAN Number *</Label>
                    <Input
                      placeholder="ABCDE1234F"
                      value={formData.pan}
                      onChange={(e) => setFormData({ ...formData, pan: e.target.value.toUpperCase() })}
                      maxLength={10}
                    />
                    <p className="text-xs text-muted-foreground">Format: ABCDE1234F (5 letters, 4 digits, 1 letter)</p>
                  </div>

                  <div className="space-y-2">
                    <Label>Address *</Label>
                    <Textarea
                      placeholder="Enter complete address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Email (Optional)</Label>
                    <Input
                      type="email"
                      placeholder="Enter email address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Step 4: Channel Details */}
          {formData.donationType && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold mb-3">Step 4 — Channel Details</h3>
                
                {formData.donationType === "Counter" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Counter *</Label>
                      <Select value={formData.counterId} onValueChange={(v) => setFormData({ ...formData, counterId: v })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select counter" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableCounters.map(counter => (
                            <SelectItem key={counter.value} value={counter.value}>{counter.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Payment Mode *</Label>
                      <Select 
                        value={formData.paymentMode} 
                        onValueChange={(v: any) => setFormData({ ...formData, paymentMode: v })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Cash">Cash</SelectItem>
                          <SelectItem value="UPI">UPI</SelectItem>
                          <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                          <SelectItem value="Cheque">Cheque</SelectItem>
                          <SelectItem value="In-Kind">In-Kind</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {formData.donationType === "Online" && (
                  <div className="space-y-2">
                    <Label>Payment Reference *</Label>
                    <Input
                      placeholder="Transaction ID, Order ID, etc."
                      value={formData.paymentReference}
                      onChange={(e) => setFormData({ ...formData, paymentReference: e.target.value })}
                    />
                  </div>
                )}

                {formData.donationType === "Event" && (
                  <div className="space-y-2">
                    <Label>Event Name *</Label>
                    <Select value={formData.eventName} onValueChange={(v) => setFormData({ ...formData, eventName: v })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select event" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableEvents.map(event => (
                          <SelectItem key={event.value} value={event.value}>{event.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {formData.donationType === "Project" && (
                  <div className="space-y-2">
                    <Label>Project Name *</Label>
                    <Select value={formData.projectName} onValueChange={(v) => setFormData({ ...formData, projectName: v })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select project" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableProjects.map(project => (
                          <SelectItem key={project.value} value={project.value}>{project.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Additional Remarks */}
          <div className="space-y-2">
            <Label>Remarks (Optional)</Label>
            <Textarea
              placeholder="Any additional notes..."
              value={formData.remarks}
              onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
              rows={2}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => navigate("/temple/donations/list")}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              <Save className="h-4 w-4 mr-2" />
              Save Donation
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddDonation;
