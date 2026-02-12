import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Building2, MapPin, FileText, User, Shield, CreditCard, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { UploadCloud } from "lucide-react";

type LegalType = "charitable-trust" | "society" | "religious-institution" | "govt-board" | "other";
type AccountType = "current" | "savings";

interface TempleSection {
  templeName: string;
  templeAlternateName: string;
  templeType: "public" | "private" | "trust-managed" | "govt-managed" | "";
  establishedYear: string;
  primaryDeity: string;
  secondaryDeities: string;
  templeCategory: string;
  shortDescription: string;
  templePhotos: File[];
  templeLogo: File | null;
}

interface LocationSection {
  addressLine1: string;
  addressLine2: string;
  landmark: string;
  city: string;
  district: string;
  state: string;
  country: string;
  pincode: string;
  latitude: string;
  longitude: string;
  hasMapPin: boolean;
}

interface LegalSection {
  registeredName: string;
  legalType: LegalType | "";
  registrationDate: string;
  registrationNumber: string;
  registeredUnderAct: string;
  pan: string;
  twelveA: string;
  eightyG: string;
  sameAsTempleAddress: boolean;
  regAddressLine1: string;
  regAddressLine2: string;
  regCity: string;
  regDistrict: string;
  regState: string;
  regCountry: string;
  regPincode: string;
  trustDeedFile: File | null;
  panFile: File | null;
  certificateFile: File | null;
}

interface AdminSection {
  fullName: string;
  designation: string;
  mobile: string;
  email: string;
  altPhone: string;
  templeEmail: string;
  idProofType: string;
  idProofNumber: string;
  idProofFile: File | null;
  preferredChannel: "sms" | "whatsapp" | "email" | "";
}

interface BankSection {
  accountHolderName: string;
  bankName: string;
  branchName: string;
  accountType: AccountType | "";
  accountNumber: string;
  confirmAccountNumber: string;
  ifsc: string;
  branchAddress: string;
  upiId: string;
  chequeFile: File | null;
}

interface ConfirmationsSection {
  infoTrue: boolean;
  termsAccepted: boolean;
}

interface RegistrationFormState {
  role: "temple" | "";
  temple: TempleSection;
  location: LocationSection;
  legal: LegalSection;
  admin: AdminSection;
  bank: BankSection;
  confirmations: ConfirmationsSection;
}

const initialForm: RegistrationFormState = {
  role: "temple",
  temple: {
    templeName: "",
    templeAlternateName: "",
    templeType: "",
    establishedYear: "",
    primaryDeity: "",
    secondaryDeities: "",
    templeCategory: "",
    shortDescription: "",
    templePhotos: [],
    templeLogo: null,
  },
  location: {
    addressLine1: "",
    addressLine2: "",
    landmark: "",
    city: "",
    district: "",
    state: "",
    country: "",
    pincode: "",
    latitude: "",
    longitude: "",
    hasMapPin: false,
  },
  legal: {
    registeredName: "",
    legalType: "",
    registrationDate: "",
    registrationNumber: "",
    registeredUnderAct: "",
    pan: "",
    twelveA: "",
    eightyG: "",
    sameAsTempleAddress: true,
    regAddressLine1: "",
    regAddressLine2: "",
    regCity: "",
    regDistrict: "",
    regState: "",
    regCountry: "",
    regPincode: "",
    trustDeedFile: null,
    panFile: null,
    certificateFile: null,
  },
  admin: {
    fullName: "",
    designation: "",
    mobile: "",
    email: "",
    altPhone: "",
    templeEmail: "",
    idProofType: "",
    idProofNumber: "",
    idProofFile: null,
    preferredChannel: "",
  },
  bank: {
    accountHolderName: "",
    bankName: "",
    branchName: "",
    accountType: "",
    accountNumber: "",
    confirmAccountNumber: "",
    ifsc: "",
    branchAddress: "",
    upiId: "",
    chequeFile: null,
  },
  confirmations: {
    infoTrue: false,
    termsAccepted: false,
  },
};

const steps = [
  { id: 1, title: "Role Selection", icon: User },
  { id: 2, title: "Temple Details", icon: Building2 },
  { id: 3, title: "Location", icon: MapPin },
  { id: 4, title: "Trust & Legal", icon: FileText },
  { id: 5, title: "Admin Details", icon: User },
  { id: 6, title: "Bank Details", icon: CreditCard },
  { id: 7, title: "Review & Submit", icon: Shield },
];

const TempleRegister = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState<RegistrationFormState>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const goNext = () => {
    if (currentStep < 7) setCurrentStep(currentStep + 1);
  };

  const goPrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const updateForm = <K extends keyof RegistrationFormState>(
    section: K,
    value: RegistrationFormState[K]
  ) => {
    setForm(prev => ({ ...prev, [section]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await new Promise(res => setTimeout(res, 800));
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const referenceNumber = `REG-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 999999)).padStart(6, '0')}`;

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center"
        >
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Registration Submitted!</h1>
          <p className="text-muted-foreground mb-6">
            Your temple registration is under review. We'll notify you via SMS and email once your account is approved.
          </p>
          <div className="glass-card rounded-2xl p-6 mb-6 text-left">
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground">Application Reference</p>
                <p className="text-lg font-mono font-semibold text-foreground">{referenceNumber}</p>
              </div>
              <div className="border-t border-border pt-3">
                <p className="text-xs text-muted-foreground">Temple Name</p>
                <p className="text-sm font-medium text-foreground">{form.temple.templeName || "N/A"}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Mobile Number</p>
                <p className="text-sm font-medium text-foreground">+91 {form.admin.mobile || "N/A"}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Status</p>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                  Submitted for Review
                </span>
              </div>
            </div>
          </div>
          <div className="bg-muted/50 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-medium text-foreground mb-2">What happens next?</h3>
            <ul className="text-sm text-muted-foreground space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="text-primary">1.</span>
                Our team will review your registration
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">2.</span>
                We may contact you for additional verification
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">3.</span>
                Upon approval, you'll receive login credentials
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">4.</span>
                Average review time: 2-3 business days
              </li>
            </ul>
          </div>
          <Button onClick={() => navigate("/")} variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Login
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Login
          </button>
          <h1 className="text-xl font-bold text-primary">Temple Admin</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-bold text-foreground mb-2">Temple Admin Registration</h1>
          <p className="text-muted-foreground">Complete this institutional onboarding to activate your Temple / Trust on the platform.</p>
        </motion.div>

        {/* Progress Steps */}
        <div className="mb-10 overflow-x-auto pb-2">
          <div className="flex items-center justify-between min-w-[800px]">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm transition-colors
                    ${currentStep > step.id
                      ? "bg-primary text-primary-foreground"
                      : currentStep === step.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }
                  `}>
                    {currentStep > step.id ? <Check className="h-5 w-5" /> : <step.icon className="h-5 w-5" />}
                  </div>
                  <span className={`text-xs mt-2 whitespace-nowrap text-center max-w-[100px] ${currentStep >= step.id ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 sm:w-16 h-0.5 mx-2 transition-colors ${currentStep > step.id ? "bg-primary" : "bg-border"}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="glass-card rounded-2xl p-8">
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <StepRoleSelection form={form} updateForm={updateForm} />
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <StepTempleDetails form={form} updateForm={updateForm} />
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <StepLocationDetails form={form} updateForm={updateForm} />
              </motion.div>
            )}

            {currentStep === 4 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <StepLegalDetails form={form} updateForm={updateForm} />
              </motion.div>
            )}

            {currentStep === 5 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <StepAdminDetails form={form} updateForm={updateForm} />
              </motion.div>
            )}

            {currentStep === 6 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <StepBankDetails form={form} updateForm={updateForm} />
              </motion.div>
            )}

            {currentStep === 7 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <StepReviewSubmit form={form} updateForm={updateForm} />
              </motion.div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={goPrev}
              disabled={currentStep === 1}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </Button>

            {currentStep < 7 ? (
              <Button type="button" onClick={goNext} className="gap-2">
                Next
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                className="gap-2"
                disabled={submitting || !form.confirmations.infoTrue || !form.confirmations.termsAccepted}
              >
                {submitting ? "Submitting..." : "Submit for Verification"}
                <Check className="h-4 w-4" />
              </Button>
            )}
          </div>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Step {currentStep} of {steps.length}
        </p>
      </main>
    </div>
  );
};

interface StepProps {
  form: RegistrationFormState;
  updateForm: <K extends keyof RegistrationFormState>(
    section: K,
    value: RegistrationFormState[K]
  ) => void;
}

const StepRoleSelection = ({ form, updateForm }: StepProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-1">Role Selection</h2>
        <p className="text-sm text-muted-foreground">Choose what you are registering as</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <button
          type="button"
          className={`border rounded-lg p-4 text-left space-y-1 transition ${
            form.role === "temple"
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/20 hover:border-primary/40"
          }`}
          onClick={() =>
            updateForm("role", "temple" as RegistrationFormState["role"])
          }
        >
          <div className="text-sm font-semibold">Temple / Trust (Institution)</div>
          <p className="text-xs text-muted-foreground">
            For Mandirs, Devasthanams, Trust-managed temples and religious institutions.
          </p>
        </button>
      </div>
    </div>
  );
};

const StepTempleDetails = ({ form, updateForm }: StepProps) => {
  const temple = form.temple;
  const update = (patch: Partial<TempleSection>) =>
    updateForm("temple", { ...temple, ...patch });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-1">Temple Basic Details</h2>
        <p className="text-sm text-muted-foreground">Basic information about your temple</p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Temple Name *</Label>
          <Input
            value={temple.templeName}
            onChange={e => update({ templeName: e.target.value })}
            placeholder="Sri XYZ Temple"
          />
        </div>
        <div className="space-y-2">
          <Label>Temple Alternate Name</Label>
          <Input
            value={temple.templeAlternateName}
            onChange={e => update({ templeAlternateName: e.target.value })}
            placeholder="Local / historical name"
          />
        </div>
        <div className="space-y-2">
          <Label>Temple Type *</Label>
          <Select
            value={temple.templeType}
            onValueChange={v =>
              update({
                templeType: v as TempleSection["templeType"],
              })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="public">Public</SelectItem>
              <SelectItem value="private">Private</SelectItem>
              <SelectItem value="trust-managed">Trust Managed</SelectItem>
              <SelectItem value="govt-managed">Government Managed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Established Year</Label>
          <Input
            value={temple.establishedYear}
            onChange={e => update({ establishedYear: e.target.value })}
            placeholder="e.g. 1985"
          />
        </div>
        <div className="space-y-2">
          <Label>Primary Deity *</Label>
          <Input
            value={temple.primaryDeity}
            onChange={e => update({ primaryDeity: e.target.value })}
            placeholder="e.g. Sri Venkateswara Swamy"
          />
        </div>
        <div className="space-y-2">
          <Label>Secondary Deities</Label>
          <Input
            value={temple.secondaryDeities}
            onChange={e => update({ secondaryDeities: e.target.value })}
            placeholder="Comma-separated names"
          />
        </div>
        <div className="space-y-2">
          <Label>Temple Category</Label>
          <Input
            value={temple.templeCategory}
            onChange={e => update({ templeCategory: e.target.value })}
            placeholder="e.g. Heritage, City Temple, Pilgrimage Center"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Short Description *</Label>
        <Textarea
          rows={4}
          value={temple.shortDescription}
          onChange={e => update({ shortDescription: e.target.value })}
          placeholder="Describe the temple, key traditions, uniqueness, etc."
        />
      </div>
      <Separator />
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Temple Photos Upload * (min 3)</Label>
          <button
            type="button"
            className="flex items-center gap-2 border rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted/60"
          >
            <UploadCloud className="h-4 w-4" />
            Upload Photos
          </button>
          <p className="text-[11px] text-muted-foreground">
            Placeholder upload control – wire to your uploader.
          </p>
        </div>
        <div className="space-y-2">
          <Label>Temple Logo (Optional)</Label>
          <button
            type="button"
            className="flex items-center gap-2 border rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted/60"
          >
            <UploadCloud className="h-4 w-4" />
            Upload Logo
          </button>
        </div>
      </div>
    </div>
  );
};

const StepLocationDetails = ({ form, updateForm }: StepProps) => {
  const loc = form.location;
  const update = (patch: Partial<LocationSection>) =>
    updateForm("location", { ...loc, ...patch });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-1">Temple Location Details</h2>
        <p className="text-sm text-muted-foreground">Address and geographical information</p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Address Line 1 *</Label>
          <Input
            value={loc.addressLine1}
            onChange={e => update({ addressLine1: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Address Line 2</Label>
          <Input
            value={loc.addressLine2}
            onChange={e => update({ addressLine2: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Landmark</Label>
          <Input
            value={loc.landmark}
            onChange={e => update({ landmark: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>City *</Label>
          <Input
            value={loc.city}
            onChange={e => update({ city: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>District *</Label>
          <Input
            value={loc.district}
            onChange={e => update({ district: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>State *</Label>
          <Input
            value={loc.state}
            onChange={e => update({ state: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Country *</Label>
          <Input
            value={loc.country}
            onChange={e => update({ country: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Pincode *</Label>
          <Input
            value={loc.pincode}
            onChange={e => update({ pincode: e.target.value })}
          />
        </div>
      </div>
      <Separator />
      <div className="grid md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>GPS Latitude</Label>
          <Input
            value={loc.latitude}
            onChange={e => update({ latitude: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>GPS Longitude</Label>
          <Input
            value={loc.longitude}
            onChange={e => update({ longitude: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Map Pin Selection *</Label>
          <button
            type="button"
            className="border rounded-lg px-3 py-2 text-xs text-muted-foreground hover:bg-muted/60"
            onClick={() => update({ hasMapPin: !loc.hasMapPin })}
          >
            {loc.hasMapPin ? "Map pin set (placeholder)" : "Open map & drop pin (placeholder)"}
          </button>
          <p className="text-[11px] text-muted-foreground">
            Integrate with your real map widget later.
          </p>
        </div>
      </div>
    </div>
  );
};

const StepLegalDetails = ({ form, updateForm }: StepProps) => {
  const legal = form.legal;
  const update = (patch: Partial<LegalSection>) =>
    updateForm("legal", { ...legal, ...patch });

  const copyTempleAddress = () => {
    const t = form.location;
    update({
      regAddressLine1: t.addressLine1,
      regAddressLine2: t.addressLine2,
      regCity: t.city,
      regDistrict: t.district,
      regState: t.state,
      regCountry: t.country,
      regPincode: t.pincode,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-1">Trust / Legal Details</h2>
        <p className="text-sm text-muted-foreground">Legal and registration information</p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Registered Name of Trust / Institution *</Label>
          <Input
            value={legal.registeredName}
            onChange={e => update({ registeredName: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Legal Type *</Label>
          <Select
            value={legal.legalType}
            onValueChange={v =>
              update({
                legalType: v as LegalSection["legalType"],
              })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select legal type" />
            </SelectTrigger>
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
          <Label>Date of Registration *</Label>
          <Input
            type="date"
            value={legal.registrationDate}
            onChange={e => update({ registrationDate: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Registration / Trust Deed Number *</Label>
          <Input
            value={legal.registrationNumber}
            onChange={e => update({ registrationNumber: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Registered Under Act</Label>
          <Input
            value={legal.registeredUnderAct}
            onChange={e => update({ registeredUnderAct: e.target.value })}
            placeholder="e.g. Indian Trusts Act 1882"
          />
        </div>
        <div className="space-y-2">
          <Label>PAN of Trust / Institution *</Label>
          <Input
            value={legal.pan}
            onChange={e => update({ pan: e.target.value.toUpperCase() })}
          />
        </div>
        <div className="space-y-2">
          <Label>12A Registration Number (Optional)</Label>
          <Input
            value={legal.twelveA}
            onChange={e => update({ twelveA: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>80G Registration Number (Optional)</Label>
          <Input
            value={legal.eightyG}
            onChange={e => update({ eightyG: e.target.value })}
          />
        </div>
      </div>
      <Separator />
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Checkbox
            checked={legal.sameAsTempleAddress}
            onCheckedChange={checked => {
              const val = Boolean(checked);
              update({ sameAsTempleAddress: val });
              if (val) copyTempleAddress();
            }}
          />
          <Label className="text-sm">Registered address same as temple address</Label>
        </div>
        {!legal.sameAsTempleAddress && (
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Registered Address Line 1 *</Label>
              <Input
                value={legal.regAddressLine1}
                onChange={e => update({ regAddressLine1: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Registered Address Line 2</Label>
              <Input
                value={legal.regAddressLine2}
                onChange={e => update({ regAddressLine2: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>City *</Label>
              <Input
                value={legal.regCity}
                onChange={e => update({ regCity: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>District *</Label>
              <Input
                value={legal.regDistrict}
                onChange={e => update({ regDistrict: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>State *</Label>
              <Input
                value={legal.regState}
                onChange={e => update({ regState: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Country *</Label>
              <Input
                value={legal.regCountry}
                onChange={e => update({ regCountry: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Pincode *</Label>
              <Input
                value={legal.regPincode}
                onChange={e => update({ regPincode: e.target.value })}
              />
            </div>
          </div>
        )}
      </div>
      <Separator />
      <div className="grid md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>Trust Deed / Registration Certificate *</Label>
          <button
            type="button"
            className="flex items-center gap-2 border rounded-lg px-3 py-2 text-xs text-muted-foreground hover:bg-muted/60"
          >
            <UploadCloud className="h-3.5 w-3.5" />
            Upload file
          </button>
        </div>
        <div className="space-y-2">
          <Label>PAN Card of Institution *</Label>
          <button
            type="button"
            className="flex items-center gap-2 border rounded-lg px-3 py-2 text-xs text-muted-foreground hover:bg-muted/60"
          >
            <UploadCloud className="h-3.5 w-3.5" />
            Upload file
          </button>
        </div>
        <div className="space-y-2">
          <Label>12A / 80G Certificate (Optional)</Label>
          <button
            type="button"
            className="flex items-center gap-2 border rounded-lg px-3 py-2 text-xs text-muted-foreground hover:bg-muted/60"
          >
            <UploadCloud className="h-3.5 w-3.5" />
            Upload file
          </button>
        </div>
      </div>
    </div>
  );
};

const StepAdminDetails = ({ form, updateForm }: StepProps) => {
  const admin = form.admin;
  const update = (patch: Partial<AdminSection>) =>
    updateForm("admin", { ...admin, ...patch });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-1">Authorized Admin Details</h2>
        <p className="text-sm text-muted-foreground">Primary administrator information</p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Full Name *</Label>
          <Input
            value={admin.fullName}
            onChange={e => update({ fullName: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Designation / Role *</Label>
          <Input
            value={admin.designation}
            onChange={e => update({ designation: e.target.value })}
            placeholder="e.g. Chairman, Trustee, Temple Manager"
          />
        </div>
        <div className="space-y-2">
          <Label>Mobile Number *</Label>
          <Input
            value={admin.mobile}
            onChange={e => update({ mobile: e.target.value })}
            placeholder="+91 ..."
          />
        </div>
        <div className="space-y-2">
          <Label>Email Address *</Label>
          <Input
            type="email"
            value={admin.email}
            onChange={e => update({ email: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Alternate Phone</Label>
          <Input
            value={admin.altPhone}
            onChange={e => update({ altPhone: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Official Temple Email (Optional)</Label>
          <Input
            type="email"
            value={admin.templeEmail}
            onChange={e => update({ templeEmail: e.target.value })}
          />
        </div>
      </div>
      <Separator />
      <div className="grid md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>ID Proof Type *</Label>
          <Select
            value={admin.idProofType}
            onValueChange={v => update({ idProofType: v })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select ID type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="aadhaar">Aadhaar</SelectItem>
              <SelectItem value="pan">PAN</SelectItem>
              <SelectItem value="passport">Passport</SelectItem>
              <SelectItem value="driving-license">Driving License</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>ID Proof Number *</Label>
          <Input
            value={admin.idProofNumber}
            onChange={e => update({ idProofNumber: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Upload ID Proof *</Label>
          <button
            type="button"
            className="flex items-center gap-2 border rounded-lg px-3 py-2 text-xs text-muted-foreground hover:bg-muted/60"
          >
            <UploadCloud className="h-3.5 w-3.5" />
            Upload file
          </button>
        </div>
      </div>
      <Separator />
      <div className="space-y-2">
        <Label>Preferred Communication Channel *</Label>
        <div className="grid md:grid-cols-3 gap-2 text-sm">
          {[
            { value: "sms", label: "SMS" },
            { value: "whatsapp", label: "WhatsApp" },
            { value: "email", label: "Email" },
          ].map(opt => (
            <button
              key={opt.value}
              type="button"
              onClick={() =>
                update({
                  preferredChannel: opt.value as AdminSection["preferredChannel"],
                })
              }
              className={`border rounded-lg px-3 py-2 text-left ${
                admin.preferredChannel === opt.value
                  ? "border-primary bg-primary/5"
                  : "border-muted-foreground/20 hover:border-primary/40"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const StepBankDetails = ({ form, updateForm }: StepProps) => {
  const bank = form.bank;
  const update = (patch: Partial<BankSection>) =>
    updateForm("bank", { ...bank, ...patch });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-1">Bank Details</h2>
        <p className="text-sm text-muted-foreground">Temple / Trust bank account information</p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Account Holder Name *</Label>
          <Input
            value={bank.accountHolderName}
            onChange={e => update({ accountHolderName: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Bank Name *</Label>
          <Input
            value={bank.bankName}
            onChange={e => update({ bankName: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Branch Name *</Label>
          <Input
            value={bank.branchName}
            onChange={e => update({ branchName: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Account Type *</Label>
          <Select
            value={bank.accountType}
            onValueChange={v =>
              update({
                accountType: v as BankSection["accountType"],
              })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select account type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Current</SelectItem>
              <SelectItem value="savings">Savings</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Account Number *</Label>
          <Input
            value={bank.accountNumber}
            onChange={e => update({ accountNumber: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Confirm Account Number *</Label>
          <Input
            value={bank.confirmAccountNumber}
            onChange={e => update({ confirmAccountNumber: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>IFSC Code *</Label>
          <Input
            value={bank.ifsc}
            onChange={e => update({ ifsc: e.target.value.toUpperCase() })}
          />
        </div>
        <div className="space-y-2">
          <Label>Branch Address (Optional)</Label>
          <Input
            value={bank.branchAddress}
            onChange={e => update({ branchAddress: e.target.value })}
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>UPI ID for Donations (Optional)</Label>
          <Input
            value={bank.upiId}
            onChange={e => update({ upiId: e.target.value })}
            placeholder="e.g. temple@bank"
          />
        </div>
        <div className="space-y-2">
          <Label>Cancelled Cheque / Passbook Scan *</Label>
          <button
            type="button"
            className="flex items-center gap-2 border rounded-lg px-3 py-2 text-xs text-muted-foreground hover:bg-muted/60"
          >
            <UploadCloud className="h-3.5 w-3.5" />
            Upload file
          </button>
        </div>
      </div>
    </div>
  );
};

const StepReviewSubmit = ({ form, updateForm }: StepProps) => {
  const confirm = form.confirmations;
  const updateConfirm = (patch: Partial<ConfirmationsSection>) =>
    updateForm("confirmations", { ...confirm, ...patch });

  return (
    <div className="space-y-6 text-sm">
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-1">Review & Submit</h2>
        <p className="text-muted-foreground">
          Review details before submission. Use Previous to edit any section.
        </p>
      </div>

      <div className="space-y-4">
        <SectionReview title="Temple & Role">
          <ReviewField label="Registering As" value="Temple / Trust (Institution)" />
          <ReviewField label="Temple Name" value={form.temple.templeName} />
          <ReviewField label="Primary Deity" value={form.temple.primaryDeity} />
          <ReviewField label="Temple Type" value={form.temple.templeType || "-"} />
        </SectionReview>

        <SectionReview title="Location">
          <ReviewField
            label="Address"
            value={
              form.location.addressLine1 ||
              form.location.addressLine2 ||
              form.location.city
                ? `${form.location.addressLine1}, ${form.location.addressLine2}, ${form.location.city}, ${form.location.state} - ${form.location.pincode}`
                : "-"
            }
          />
          <ReviewField label="Country" value={form.location.country || "-"} />
        </SectionReview>

        <SectionReview title="Trust / Legal">
          <ReviewField label="Registered Name" value={form.legal.registeredName} />
          <ReviewField label="Legal Type" value={form.legal.legalType || "-"} />
          <ReviewField label="PAN" value={form.legal.pan || "-"} />
          <ReviewField label="12A" value={form.legal.twelveA || "-"} />
          <ReviewField label="80G" value={form.legal.eightyG || "-"} />
        </SectionReview>

        <SectionReview title="Authorized Admin">
          <ReviewField label="Name" value={form.admin.fullName} />
          <ReviewField label="Designation" value={form.admin.designation} />
          <ReviewField label="Mobile" value={form.admin.mobile} />
          <ReviewField label="Email" value={form.admin.email} />
        </SectionReview>

        <SectionReview title="Bank">
          <ReviewField label="Account Holder" value={form.bank.accountHolderName} />
          <ReviewField label="Bank" value={form.bank.bankName} />
          <ReviewField label="IFSC" value={form.bank.ifsc} />
        </SectionReview>
      </div>

      <Separator />

      <div className="space-y-2">
        <div className="flex items-start gap-2">
          <Checkbox
            checked={confirm.infoTrue}
            onCheckedChange={checked =>
              updateConfirm({ infoTrue: Boolean(checked) })
            }
          />
          <p>
            I confirm that the above information is true and accurate and that I am
            authorized to register this Temple / Trust on this platform.
          </p>
        </div>
        <div className="flex items-start gap-2">
          <Checkbox
            checked={confirm.termsAccepted}
            onCheckedChange={checked =>
              updateConfirm({ termsAccepted: Boolean(checked) })
            }
          />
          <p>
            I agree to the{" "}
            <span className="underline cursor-pointer">Terms of Service</span> and{" "}
            <span className="underline cursor-pointer">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

const SectionReview = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="border rounded-lg p-3 space-y-2">
    <div className="text-xs font-semibold uppercase text-muted-foreground tracking-wide">
      {title}
    </div>
    <div className="grid md:grid-cols-2 gap-x-6 gap-y-1.5">{children}</div>
  </div>
);

const ReviewField = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col">
    <span className="text-[11px] uppercase text-muted-foreground tracking-wide">
      {label}
    </span>
    <span className="text-sm">{value || "-"}</span>
  </div>
);

export default TempleRegister;
