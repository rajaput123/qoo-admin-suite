import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, ArrowRight, Check, Phone, Building2, MapPin, FileText,
  User, Shield, Camera, Globe, UploadCloud, CheckCircle2, Save,
  Image, X, ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

/* ─── Types ─── */
type RegistrationLevel = "level1" | "level2";

interface Level1Data {
  mobile: string;
  otpSent: boolean;
  otpVerified: boolean;
  templeName: string;
  city: string;
  state: string;
  adminName: string;
  email: string;
  proofType: "photo" | "certificate" | "maps" | "website" | "";
  proofValue: string;
  proofFile: string | null;
}

interface Level2Data {
  templeType: string;
  establishedYear: string;
  primaryDeity: string;
  shortDescription: string;
  addressLine1: string;
  addressLine2: string;
  pincode: string;
  district: string;
  country: string;
  exteriorPhoto: string | null;
  sanctumPhoto: string | null;
  additionalPhotos: string[];
  trustName: string;
  registrationNumber: string;
  pan: string;
  legalType: string;
  registrationDate: string;
  twelveA: string;
  eightyG: string;
  trustDeed: string | null;
  certificate: string | null;
  adminIdProof: string | null;
  infoTrue: boolean;
  termsAccepted: boolean;
}

const initialLevel1: Level1Data = {
  mobile: "", otpSent: false, otpVerified: false,
  templeName: "", city: "", state: "",
  adminName: "", email: "",
  proofType: "", proofValue: "", proofFile: null,
};

const initialLevel2: Level2Data = {
  templeType: "", establishedYear: "", primaryDeity: "", shortDescription: "",
  addressLine1: "", addressLine2: "", pincode: "", district: "", country: "india",
  exteriorPhoto: null, sanctumPhoto: null, additionalPhotos: [],
  trustName: "", registrationNumber: "", pan: "", legalType: "", registrationDate: "", twelveA: "", eightyG: "",
  trustDeed: null, certificate: null, adminIdProof: null,
  infoTrue: false, termsAccepted: false,
};

const level1Steps = [
  { id: 1, title: "Mobile Verify", icon: Phone },
  { id: 2, title: "Basic Info", icon: Building2 },
  { id: 3, title: "Admin Info", icon: User },
  { id: 4, title: "Proof of Existence", icon: Shield },
];

const level2Steps = [
  { id: 1, title: "Temple Details", icon: Building2 },
  { id: 2, title: "Full Address", icon: MapPin },
  { id: 3, title: "Temple Photos", icon: Camera },
  { id: 4, title: "Trust & Legal", icon: FileText },
  { id: 5, title: "Documents", icon: UploadCloud },
  { id: 6, title: "Review & Submit", icon: CheckCircle2 },
];

const stateOptions = [
  "Andhra Pradesh", "Karnataka", "Kerala", "Maharashtra", "Tamil Nadu",
  "Telangana", "Uttar Pradesh", "West Bengal", "Rajasthan", "Gujarat",
  "Madhya Pradesh", "Bihar", "Odisha", "Punjab", "Haryana",
];

/* ─── Main Component ─── */
const TempleRegister = () => {
  const navigate = useNavigate();
  const [level, setLevel] = useState<RegistrationLevel>("level1");
  const [l1Step, setL1Step] = useState(1);
  const [l2Step, setL2Step] = useState(1);
  const [l1, setL1] = useState<Level1Data>(initialLevel1);
  const [l2, setL2] = useState<Level2Data>(initialLevel2);
  const [l1Submitted, setL1Submitted] = useState(false);
  const [l2Submitted, setL2Submitted] = useState(false);
  const [saving, setSaving] = useState(false);

  const updateL1 = (patch: Partial<Level1Data>) => setL1(prev => ({ ...prev, ...patch }));
  const updateL2 = (patch: Partial<Level2Data>) => setL2(prev => ({ ...prev, ...patch }));

  const handleSaveStep = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success("Progress saved successfully");
    }, 500);
  };

  const handleL1Submit = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setL1Submitted(true);
      toast.success("Basic registration submitted!");
    }, 800);
  };

  const handleL2Submit = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setL2Submitted(true);
      toast.success("Detailed registration submitted for admin review!");
    }, 800);
  };

  const referenceNumber = `REG-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 999999)).padStart(6, '0')}`;

  /* ─── Final confirmation after L2 ─── */
  if (l2Submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Registration Complete!</h1>
          <p className="text-muted-foreground mb-6">
            Your temple registration has been submitted for admin review. We'll notify you via SMS and email once approved.
          </p>
          <div className="border rounded-2xl p-6 mb-6 text-left bg-card">
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground">Application Reference</p>
                <p className="text-lg font-mono font-semibold text-foreground">{referenceNumber}</p>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-muted-foreground">Temple</p>
                  <p className="text-sm font-medium">{l1.templeName || "N/A"}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Admin</p>
                  <p className="text-sm font-medium">{l1.adminName || "N/A"}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Mobile</p>
                  <p className="text-sm font-medium">+91 {l1.mobile}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Status</p>
                  <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 text-xs">Under Admin Review</Badge>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-muted/50 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-medium text-foreground mb-2 text-sm">What happens next?</h3>
            <ul className="text-sm text-muted-foreground space-y-1.5">
              <li className="flex items-start gap-2"><span className="text-primary font-bold">1.</span> Our team reviews your documents</li>
              <li className="flex items-start gap-2"><span className="text-primary font-bold">2.</span> We may request additional verification</li>
              <li className="flex items-start gap-2"><span className="text-primary font-bold">3.</span> Upon approval, you'll receive login credentials</li>
              <li className="flex items-start gap-2"><span className="text-primary font-bold">4.</span> Average review time: 2–3 business days</li>
            </ul>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 gap-2" onClick={() => navigate("/application-status")}>
              Track Status
            </Button>
            <Button className="flex-1 gap-2" onClick={() => navigate("/")}>
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  /* ─── L1 submitted → transition screen ─── */
  if (l1Submitted && level === "level1") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Check className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Basic Info Submitted ✓</h1>
          <p className="text-muted-foreground mb-6">
            Your basic temple information has been saved. Complete the detailed registration to submit for admin approval.
          </p>
          <div className="border rounded-2xl p-5 mb-6 text-left bg-card space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Temple</span>
              <span className="font-medium">{l1.templeName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Location</span>
              <span className="font-medium">{l1.city}, {l1.state}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Admin</span>
              <span className="font-medium">{l1.adminName}</span>
            </div>
            <Separator />
            <div className="flex items-center gap-2">
              <div className="h-2 flex-1 rounded-full bg-muted overflow-hidden">
                <div className="h-full w-1/3 bg-primary rounded-full" />
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">Level 1 of 2</span>
            </div>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 text-left">
            <p className="text-sm text-amber-800">
              <strong>Next:</strong> Complete detailed registration (temple details, photos, legal info, documents) for admin verification.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => navigate("/")}>
              Complete Later
            </Button>
            <Button className="flex-1 gap-2" onClick={() => setLevel("level2")}>
              Continue to Level 2 <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  const currentSteps = level === "level1" ? level1Steps : level2Steps;
  const currentStep = level === "level1" ? l1Step : l2Step;
  const totalSteps = currentSteps.length;

  const goNext = () => {
    if (level === "level1" && l1Step < 4) setL1Step(l1Step + 1);
    if (level === "level2" && l2Step < 6) setL2Step(l2Step + 1);
  };
  const goPrev = () => {
    if (level === "level1" && l1Step > 1) setL1Step(l1Step - 1);
    if (level === "level2" && l2Step > 1) setL2Step(l2Step - 1);
  };

  const isLastStep = (level === "level1" && l1Step === 4) || (level === "level2" && l2Step === 6);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm">
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          <div className="text-center">
            <h1 className="text-sm font-bold text-primary">Temple Registration</h1>
            <p className="text-[10px] text-muted-foreground">
              {level === "level1" ? "Level 1 — Basic Registration" : "Level 2 — Detailed Registration"}
            </p>
          </div>
          <div className="w-16" />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8">
        {/* Level indicator */}
        <div className="flex items-center gap-3 mb-6">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${level === "level1" ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"}`}>
            <Check className="h-3 w-3" /> Level 1
          </div>
          <div className="w-8 h-px bg-border" />
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${level === "level2" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
            {level === "level2" ? <Building2 className="h-3 w-3" /> : <span className="w-3 h-3 rounded-full border border-muted-foreground/40 inline-block" />} Level 2
          </div>
        </div>

        {/* Step progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            {currentSteps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm transition-all ${
                    currentStep > step.id ? "bg-primary text-primary-foreground" :
                    currentStep === step.id ? "bg-primary text-primary-foreground shadow-md shadow-primary/25" :
                    "bg-muted text-muted-foreground"
                  }`}>
                    {currentStep > step.id ? <Check className="h-4 w-4" /> : <step.icon className="h-4 w-4" />}
                  </div>
                  <span className={`text-[10px] mt-1.5 whitespace-nowrap text-center max-w-[80px] leading-tight ${currentStep >= step.id ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                    {step.title}
                  </span>
                </div>
                {index < currentSteps.length - 1 && (
                  <div className={`w-8 sm:w-14 h-0.5 mx-1.5 transition-colors rounded-full ${currentStep > step.id ? "bg-primary" : "bg-border"}`} />
                )}
              </div>
            ))}
          </div>
          <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1.5 text-right">Step {currentStep} of {totalSteps}</p>
        </div>

        {/* Step Content */}
        <div className="bg-card border rounded-2xl p-6 sm:p-8 shadow-sm">
          <AnimatePresence mode="wait">
            <motion.div key={`${level}-${currentStep}`} initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -15 }} transition={{ duration: 0.2 }}>
              {level === "level1" && l1Step === 1 && <L1MobileVerify data={l1} update={updateL1} />}
              {level === "level1" && l1Step === 2 && <L1BasicInfo data={l1} update={updateL1} />}
              {level === "level1" && l1Step === 3 && <L1AdminInfo data={l1} update={updateL1} />}
              {level === "level1" && l1Step === 4 && <L1ProofOfExistence data={l1} update={updateL1} />}
              {level === "level2" && l2Step === 1 && <L2TempleDetails data={l2} update={updateL2} />}
              {level === "level2" && l2Step === 2 && <L2FullAddress data={l2} update={updateL2} l1={l1} />}
              {level === "level2" && l2Step === 3 && <L2TemplePhotos data={l2} update={updateL2} />}
              {level === "level2" && l2Step === 4 && <L2TrustLegal data={l2} update={updateL2} />}
              {level === "level2" && l2Step === 5 && <L2Documents data={l2} update={updateL2} />}
              {level === "level2" && l2Step === 6 && <L2ReviewSubmit l1={l1} l2={l2} update={updateL2} />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          <Button type="button" variant="outline" onClick={goPrev} disabled={currentStep === 1} className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Previous
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={handleSaveStep} disabled={saving} className="gap-1.5 text-xs text-muted-foreground">
            <Save className="h-3.5 w-3.5" /> {saving ? "Saving..." : "Save Progress"}
          </Button>
          {isLastStep ? (
            <Button
              onClick={level === "level1" ? handleL1Submit : handleL2Submit}
              disabled={saving || (level === "level2" && (!l2.infoTrue || !l2.termsAccepted))}
              className="gap-2"
            >
              {saving ? "Submitting..." : level === "level1" ? "Save & Continue" : "Submit for Review"}
              <Check className="h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={goNext} className="gap-2">
              Next <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </main>
    </div>
  );
};

/* ─────────────────────────── LEVEL 1 STEPS ─────────────────────────── */

const L1MobileVerify = ({ data, update }: { data: Level1Data; update: (p: Partial<Level1Data>) => void }) => {
  const [otp, setOtp] = useState("");

  return (
    <div className="space-y-6">
      <StepHeader title="Mobile Verification" subtitle="Verify your mobile number to begin registration" />
      <div className="max-w-sm space-y-4">
        <div className="space-y-2">
          <Label>Mobile Number *</Label>
          <div className="flex gap-2">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">+91</span>
            <Input
              placeholder="98765 43210"
              className="rounded-l-none"
              value={data.mobile}
              onChange={e => update({ mobile: e.target.value })}
              disabled={data.otpVerified}
            />
          </div>
        </div>
        {!data.otpVerified && !data.otpSent && (
          <Button type="button" onClick={() => update({ otpSent: true })} disabled={data.mobile.length < 10} className="w-full">
            Send OTP
          </Button>
        )}
        {data.otpSent && !data.otpVerified && (
          <div className="space-y-3">
            <Label>Enter 6-digit OTP</Label>
            <div className="flex gap-2">
              <Input placeholder="••••••" className="text-center tracking-widest" maxLength={6} value={otp} onChange={e => setOtp(e.target.value)} />
              <Button onClick={() => { if (otp.length === 6) update({ otpVerified: true }); }} disabled={otp.length < 6}>Verify</Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Didn't receive? <button type="button" className="text-primary underline" onClick={() => update({ otpSent: true })}>Resend</button>
            </p>
          </div>
        )}
        {data.otpVerified && (
          <div className="flex items-center gap-2 px-4 py-2.5 bg-green-50 border border-green-200 rounded-lg">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <span className="text-sm text-green-700 font-medium">Mobile verified successfully</span>
          </div>
        )}
      </div>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-sm">
        <p className="text-sm text-blue-800"><strong>Important:</strong> This mobile number will be your primary login ID.</p>
      </div>
    </div>
  );
};

const L1BasicInfo = ({ data, update }: { data: Level1Data; update: (p: Partial<Level1Data>) => void }) => (
  <div className="space-y-6">
    <StepHeader title="Temple Basic Info" subtitle="Tell us about your temple" />
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Temple Name *</Label>
        <Input value={data.templeName} onChange={e => update({ templeName: e.target.value })} placeholder="e.g., Sri Venkateswara Temple" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>City / Town *</Label>
          <Input value={data.city} onChange={e => update({ city: e.target.value })} placeholder="e.g., Tirupati" />
        </div>
        <div className="space-y-2">
          <Label>State *</Label>
          <Select value={data.state} onValueChange={v => update({ state: v })}>
            <SelectTrigger><SelectValue placeholder="Select State" /></SelectTrigger>
            <SelectContent>
              {stateOptions.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  </div>
);

const L1AdminInfo = ({ data, update }: { data: Level1Data; update: (p: Partial<Level1Data>) => void }) => (
  <div className="space-y-6">
    <StepHeader title="Admin Details" subtitle="Primary contact person for this registration" />
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label>Admin Name *</Label>
        <Input value={data.adminName} onChange={e => update({ adminName: e.target.value })} placeholder="Full name" />
      </div>
      <div className="space-y-2">
        <Label>Email Address *</Label>
        <Input type="email" value={data.email} onChange={e => update({ email: e.target.value })} placeholder="admin@temple.org" />
      </div>
      <div className="space-y-2 sm:col-span-2">
        <Label>Mobile Number (Verified)</Label>
        <Input value={`+91 ${data.mobile}`} disabled className="bg-muted" />
      </div>
    </div>
  </div>
);

const L1ProofOfExistence = ({ data, update }: { data: Level1Data; update: (p: Partial<Level1Data>) => void }) => {
  const proofOptions = [
    { value: "photo" as const, label: "Temple Photo", icon: Camera, desc: "Upload a clear photo of the temple" },
    { value: "certificate" as const, label: "Registration Certificate", icon: FileText, desc: "Trust or society registration document" },
    { value: "maps" as const, label: "Google Maps Link", icon: Globe, desc: "Paste a Google Maps URL of the temple" },
    { value: "website" as const, label: "Temple Website", icon: ExternalLink, desc: "Official website URL" },
  ];

  return (
    <div className="space-y-6">
      <StepHeader title="Proof of Temple Existence" subtitle="Provide at least one proof to verify your temple exists" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {proofOptions.map(opt => (
          <button
            key={opt.value}
            type="button"
            onClick={() => update({ proofType: opt.value, proofValue: "", proofFile: null })}
            className={`border rounded-xl p-4 text-left transition-all ${
              data.proofType === opt.value ? "border-primary bg-primary/5 shadow-sm" : "border-border hover:border-primary/30"
            }`}
          >
            <opt.icon className={`h-5 w-5 mb-2 ${data.proofType === opt.value ? "text-primary" : "text-muted-foreground"}`} />
            <p className="text-sm font-medium text-foreground">{opt.label}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{opt.desc}</p>
          </button>
        ))}
      </div>

      {data.proofType && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3 pt-2">
          {(data.proofType === "photo" || data.proofType === "certificate") && (
            <div className="space-y-2">
              <Label>{data.proofType === "photo" ? "Upload Temple Photo" : "Upload Certificate"}</Label>
              {!data.proofFile ? (
                <div
                  onClick={() => update({ proofFile: data.proofType === "photo" ? "temple_photo.jpg" : "certificate.pdf" })}
                  className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
                >
                  <UploadCloud className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Click to upload</p>
                  <p className="text-xs text-muted-foreground mt-1">JPG, PNG, or PDF (max 5MB)</p>
                </div>
              ) : (
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg border">
                  <FileText className="h-6 w-6 text-primary" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{data.proofFile}</p>
                    <p className="text-xs text-muted-foreground">Uploaded</p>
                  </div>
                  <button type="button" onClick={() => update({ proofFile: null })} className="p-1 hover:bg-muted rounded-full">
                    <X className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
              )}
            </div>
          )}
          {(data.proofType === "maps" || data.proofType === "website") && (
            <div className="space-y-2">
              <Label>{data.proofType === "maps" ? "Google Maps URL" : "Website URL"}</Label>
              <Input
                value={data.proofValue}
                onChange={e => update({ proofValue: e.target.value })}
                placeholder={data.proofType === "maps" ? "https://maps.google.com/..." : "https://www.temple.org"}
              />
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

/* ─────────────────────────── LEVEL 2 STEPS ─────────────────────────── */

const L2TempleDetails = ({ data, update }: { data: Level2Data; update: (p: Partial<Level2Data>) => void }) => (
  <div className="space-y-6">
    <StepHeader title="Temple Details" subtitle="Additional information about your temple" />
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label>Temple Type</Label>
        <Select value={data.templeType} onValueChange={v => update({ templeType: v })}>
          <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="public">Public</SelectItem>
            <SelectItem value="private">Private</SelectItem>
            <SelectItem value="trust-managed">Trust Managed</SelectItem>
            <SelectItem value="govt-managed">Government Managed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Year Established</Label>
        <Input value={data.establishedYear} onChange={e => update({ establishedYear: e.target.value })} placeholder="e.g., 1509" />
      </div>
      <div className="space-y-2 sm:col-span-2">
        <Label>Primary Deity</Label>
        <Input value={data.primaryDeity} onChange={e => update({ primaryDeity: e.target.value })} placeholder="e.g., Lord Venkateswara" />
      </div>
      <div className="space-y-2 sm:col-span-2">
        <Label>Short Description</Label>
        <Textarea rows={3} value={data.shortDescription} onChange={e => update({ shortDescription: e.target.value })} placeholder="Brief description of the temple's history and significance..." />
      </div>
    </div>
  </div>
);

const L2FullAddress = ({ data, update, l1 }: { data: Level2Data; update: (p: Partial<Level2Data>) => void; l1: Level1Data }) => (
  <div className="space-y-6">
    <StepHeader title="Full Address" subtitle="Complete address details for your temple" />
    <div className="bg-muted/50 rounded-lg p-3 flex items-center gap-2 text-sm">
      <MapPin className="h-4 w-4 text-primary shrink-0" />
      <span className="text-muted-foreground">City: <strong className="text-foreground">{l1.city}</strong>, State: <strong className="text-foreground">{l1.state}</strong> (from Level 1)</span>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="space-y-2 sm:col-span-2">
        <Label>Address Line 1 *</Label>
        <Input value={data.addressLine1} onChange={e => update({ addressLine1: e.target.value })} placeholder="Street, building name" />
      </div>
      <div className="space-y-2 sm:col-span-2">
        <Label>Address Line 2</Label>
        <Input value={data.addressLine2} onChange={e => update({ addressLine2: e.target.value })} placeholder="Area, locality, landmark" />
      </div>
      <div className="space-y-2">
        <Label>District</Label>
        <Input value={data.district} onChange={e => update({ district: e.target.value })} placeholder="District" />
      </div>
      <div className="space-y-2">
        <Label>Pincode *</Label>
        <Input value={data.pincode} onChange={e => update({ pincode: e.target.value })} placeholder="e.g., 517501" />
      </div>
      <div className="space-y-2">
        <Label>Country</Label>
        <Select value={data.country} onValueChange={v => update({ country: v })}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="india">India</SelectItem>
            <SelectItem value="usa">United States</SelectItem>
            <SelectItem value="uk">United Kingdom</SelectItem>
            <SelectItem value="canada">Canada</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  </div>
);

const L2TemplePhotos = ({ data, update }: { data: Level2Data; update: (p: Partial<Level2Data>) => void }) => {
  const mockUpload = (field: "exteriorPhoto" | "sanctumPhoto") => {
    update({ [field]: field === "exteriorPhoto" ? "temple_exterior.jpg" : "sanctum.jpg" });
  };

  return (
    <div className="space-y-6">
      <StepHeader title="Temple Photos" subtitle="Upload photos for verification and display" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <PhotoUpload label="Exterior / Main Entrance *" file={data.exteriorPhoto} onUpload={() => mockUpload("exteriorPhoto")} onRemove={() => update({ exteriorPhoto: null })} />
        <PhotoUpload label="Sanctum / Inner View *" file={data.sanctumPhoto} onUpload={() => mockUpload("sanctumPhoto")} onRemove={() => update({ sanctumPhoto: null })} />
      </div>
      <div className="space-y-2">
        <Label>Additional Photos (Optional)</Label>
        <div
          onClick={() => update({ additionalPhotos: [...data.additionalPhotos, `photo_${data.additionalPhotos.length + 1}.jpg`] })}
          className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors cursor-pointer"
        >
          <Image className="h-6 w-6 text-muted-foreground mx-auto mb-1" />
          <p className="text-sm text-muted-foreground">Click to add more photos</p>
        </div>
        {data.additionalPhotos.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {data.additionalPhotos.map((p, i) => (
              <div key={i} className="flex items-center gap-1.5 px-2.5 py-1 bg-muted rounded-full text-xs">
                <Image className="h-3 w-3" /> {p}
                <button onClick={() => update({ additionalPhotos: data.additionalPhotos.filter((_, j) => j !== i) })} className="hover:text-destructive">
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const PhotoUpload = ({ label, file, onUpload, onRemove }: { label: string; file: string | null; onUpload: () => void; onRemove: () => void }) => (
  <div className="space-y-2">
    <Label>{label}</Label>
    {!file ? (
      <div onClick={onUpload} className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
        <Camera className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
        <p className="text-sm text-muted-foreground">Click to upload</p>
        <p className="text-xs text-muted-foreground mt-1">JPG or PNG (max 5MB)</p>
      </div>
    ) : (
      <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg border">
        <Camera className="h-5 w-5 text-primary" />
        <div className="flex-1"><p className="text-sm font-medium">{file}</p></div>
        <button onClick={onRemove} className="p-1 hover:bg-muted rounded-full"><X className="h-4 w-4 text-muted-foreground" /></button>
      </div>
    )}
  </div>
);

const L2TrustLegal = ({ data, update }: { data: Level2Data; update: (p: Partial<Level2Data>) => void }) => (
  <div className="space-y-6">
    <StepHeader title="Trust & Legal Information" subtitle="Legal entity details for verification" />
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="space-y-2 sm:col-span-2">
        <Label>Trust / Organization Name *</Label>
        <Input value={data.trustName} onChange={e => update({ trustName: e.target.value })} placeholder="e.g., Sri Venkateswara Temple Trust" />
      </div>
      <div className="space-y-2">
        <Label>Registration Number *</Label>
        <Input value={data.registrationNumber} onChange={e => update({ registrationNumber: e.target.value })} placeholder="e.g., TRN/2020/12345" />
      </div>
      <div className="space-y-2">
        <Label>PAN *</Label>
        <Input value={data.pan} onChange={e => update({ pan: e.target.value.toUpperCase() })} placeholder="AAAAA0000A" />
      </div>
      <div className="space-y-2">
        <Label>Legal Entity Type</Label>
        <Select value={data.legalType} onValueChange={v => update({ legalType: v })}>
          <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="charitable-trust">Charitable Trust</SelectItem>
            <SelectItem value="society">Society</SelectItem>
            <SelectItem value="religious-institution">Religious Institution</SelectItem>
            <SelectItem value="govt-board">Govt. Board / Endowment</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Registration Date</Label>
        <Input type="date" value={data.registrationDate} onChange={e => update({ registrationDate: e.target.value })} />
      </div>
    </div>
    <Separator />
    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Optional</p>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label>12A Registration Number</Label>
        <Input value={data.twelveA} onChange={e => update({ twelveA: e.target.value })} />
      </div>
      <div className="space-y-2">
        <Label>80G Registration Number</Label>
        <Input value={data.eightyG} onChange={e => update({ eightyG: e.target.value })} />
      </div>
    </div>
  </div>
);

const L2Documents = ({ data, update }: { data: Level2Data; update: (p: Partial<Level2Data>) => void }) => {
  const docs = [
    { key: "trustDeed" as const, label: "Trust Deed / Registration Certificate *", file: data.trustDeed, mockName: "trust_deed.pdf" },
    { key: "certificate" as const, label: "12A / 80G Certificate (Optional)", file: data.certificate, mockName: "certificate.pdf" },
    { key: "adminIdProof" as const, label: "Admin ID Proof *", file: data.adminIdProof, mockName: "admin_id.pdf" },
  ];

  return (
    <div className="space-y-6">
      <StepHeader title="Document Upload" subtitle="Upload documents for verification" />
      <div className="space-y-4">
        {docs.map(doc => (
          <div key={doc.key} className="space-y-2">
            <Label>{doc.label}</Label>
            {!doc.file ? (
              <div
                onClick={() => update({ [doc.key]: doc.mockName })}
                className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors cursor-pointer"
              >
                <UploadCloud className="h-6 w-6 text-muted-foreground mx-auto mb-1" />
                <p className="text-xs text-muted-foreground">Click to upload • PDF, JPG, PNG (max 5MB)</p>
              </div>
            ) : (
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg border">
                <FileText className="h-5 w-5 text-primary" />
                <div className="flex-1"><p className="text-sm font-medium">{doc.file}</p><p className="text-xs text-muted-foreground">Uploaded</p></div>
                <button onClick={() => update({ [doc.key]: null })} className="p-1 hover:bg-muted rounded-full"><X className="h-4 w-4 text-muted-foreground" /></button>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <p className="text-sm text-amber-800">
          <strong>Note:</strong> Bank details will be collected during the verification process after your registration is approved.
        </p>
      </div>
    </div>
  );
};

const L2ReviewSubmit = ({ l1, l2, update }: { l1: Level1Data; l2: Level2Data; update: (p: Partial<Level2Data>) => void }) => (
  <div className="space-y-6">
    <StepHeader title="Review & Submit" subtitle="Review your details before submitting for admin approval" />

    <div className="space-y-3">
      <ReviewSection title="Basic Info (Level 1)">
        <ReviewRow label="Temple" value={l1.templeName} />
        <ReviewRow label="Location" value={`${l1.city}, ${l1.state}`} />
        <ReviewRow label="Admin" value={l1.adminName} />
        <ReviewRow label="Email" value={l1.email} />
        <ReviewRow label="Mobile" value={`+91 ${l1.mobile}`} />
      </ReviewSection>

      <ReviewSection title="Temple Details">
        <ReviewRow label="Type" value={l2.templeType || "—"} />
        <ReviewRow label="Established" value={l2.establishedYear || "—"} />
        <ReviewRow label="Deity" value={l2.primaryDeity || "—"} />
      </ReviewSection>

      <ReviewSection title="Address">
        <ReviewRow label="Address" value={[l2.addressLine1, l2.addressLine2, l2.district].filter(Boolean).join(", ") || "—"} />
        <ReviewRow label="Pincode" value={l2.pincode || "—"} />
      </ReviewSection>

      <ReviewSection title="Trust & Legal">
        <ReviewRow label="Trust Name" value={l2.trustName || "—"} />
        <ReviewRow label="Reg. Number" value={l2.registrationNumber || "—"} />
        <ReviewRow label="PAN" value={l2.pan || "—"} />
      </ReviewSection>

      <ReviewSection title="Documents & Photos">
        <ReviewRow label="Exterior Photo" value={l2.exteriorPhoto ? "✓ Uploaded" : "Not uploaded"} />
        <ReviewRow label="Sanctum Photo" value={l2.sanctumPhoto ? "✓ Uploaded" : "Not uploaded"} />
        <ReviewRow label="Trust Deed" value={l2.trustDeed ? "✓ Uploaded" : "Not uploaded"} />
        <ReviewRow label="Admin ID" value={l2.adminIdProof ? "✓ Uploaded" : "Not uploaded"} />
      </ReviewSection>
    </div>

    <Separator />

    <div className="space-y-3">
      <div className="flex items-start gap-2">
        <Checkbox checked={l2.infoTrue} onCheckedChange={c => update({ infoTrue: Boolean(c) })} />
        <p className="text-sm">I confirm that all information is true and accurate and that I am authorized to register this temple.</p>
      </div>
      <div className="flex items-start gap-2">
        <Checkbox checked={l2.termsAccepted} onCheckedChange={c => update({ termsAccepted: Boolean(c) })} />
        <p className="text-sm">
          I agree to the <span className="underline cursor-pointer text-primary">Terms of Service</span> and <span className="underline cursor-pointer text-primary">Privacy Policy</span>.
        </p>
      </div>
    </div>
  </div>
);

/* ─── Helpers ─── */
const StepHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div>
    <h2 className="text-lg font-semibold text-foreground mb-1">{title}</h2>
    <p className="text-sm text-muted-foreground">{subtitle}</p>
  </div>
);

const ReviewSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="border rounded-xl p-4 space-y-2">
    <p className="text-xs font-semibold uppercase text-muted-foreground tracking-wide">{title}</p>
    <div className="grid grid-cols-2 gap-x-6 gap-y-1.5">{children}</div>
  </div>
);

const ReviewRow = ({ label, value }: { label: string; value: string }) => (
  <div>
    <span className="text-[11px] uppercase text-muted-foreground tracking-wide">{label}</span>
    <p className="text-sm text-foreground">{value || "—"}</p>
  </div>
);

export default TempleRegister;
