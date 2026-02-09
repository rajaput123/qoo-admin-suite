import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Building2, MapPin, FileText, User, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import TempleDetailsStep from "@/components/registration/TempleDetailsStep";
import LocationStep from "@/components/registration/LocationStep";
import TrustLegalStep from "@/components/registration/TrustLegalStep";
import AuthorizedPersonStep from "@/components/registration/AuthorizedPersonStep";
import DeclarationStep from "@/components/registration/DeclarationStep";

const steps = [
  { id: 1, title: "Temple Details", icon: Building2 },
  { id: 2, title: "Location", icon: MapPin },
  { id: 3, title: "Trust & Legal", icon: FileText },
  { id: 4, title: "Authorized Person", icon: User },
  { id: 5, title: "Declaration", icon: Shield },
];

const TempleRegister = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Form state
  const [templeDetails, setTempleDetails] = useState({
    templeLegalName: "",
    displayName: "",
    deityName: "",
    templeType: "",
    yearEstablished: "",
    shortDescription: "",
  });

  const [location, setLocation] = useState({
    country: "",
    state: "",
    district: "",
    city: "",
    fullAddress: "",
    postalCode: "",
    googleMapPin: "",
  });

  const [trustLegal, setTrustLegal] = useState({
    trustName: "",
    trustRegNumber: "",
    legalEntityType: "",
    registrationDate: "",
    trustCertificate: null as string | null,
  });

  const [authorizedPerson, setAuthorizedPerson] = useState({
    personName: "",
    personRole: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [declaration, setDeclaration] = useState({
    termsAccepted: false,
    privacyAccepted: false,
    authorizedConfirmed: false,
    accuracyConfirmed: false,
  });

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleSendOtp = () => {
    setOtpSent(true);
  };

  const handleVerifyOtp = () => {
    setOtpVerified(true);
  };

  const canSubmit = declaration.termsAccepted && 
                    declaration.privacyAccepted && 
                    declaration.authorizedConfirmed && 
                    declaration.accuracyConfirmed &&
                    otpVerified;

  // Generate reference number
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
            <Check className="h-10 w-10 text-green-600" />
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
                <p className="text-sm font-medium text-foreground">{templeDetails.templeLegalName || "Sri Temple Trust"}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Mobile Number</p>
                <p className="text-sm font-medium text-foreground">+91 {authorizedPerson.mobile || "98765 43210"}</p>
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
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Login
          </button>
          <h1 className="text-xl font-bold text-primary">Keehoo</h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-bold text-foreground mb-2">Register Your Temple</h1>
          <p className="text-muted-foreground">Complete the form below to register your temple on Keehoo. Registration is free.</p>
        </motion.div>

        {/* Progress Steps */}
        <div className="mb-10 overflow-x-auto pb-2">
          <div className="flex items-center justify-between min-w-[600px]">
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
                  <span className={`text-xs mt-2 whitespace-nowrap ${currentStep >= step.id ? "text-foreground font-medium" : "text-muted-foreground"}`}>
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
            {/* Step 1: Temple Details */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <TempleDetailsStep
                  formData={templeDetails}
                  onFormChange={(field, value) => setTempleDetails(prev => ({ ...prev, [field]: value }))}
                />
              </motion.div>
            )}

            {/* Step 2: Location */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <LocationStep
                  formData={location}
                  onFormChange={(field, value) => setLocation(prev => ({ ...prev, [field]: value }))}
                />
              </motion.div>
            )}

            {/* Step 3: Trust & Legal */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <TrustLegalStep
                  formData={trustLegal}
                  onFormChange={(field, value) => setTrustLegal(prev => ({ ...prev, [field]: value }))}
                />
              </motion.div>
            )}

            {/* Step 4: Authorized Person */}
            {currentStep === 4 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <AuthorizedPersonStep
                  formData={authorizedPerson}
                  onFormChange={(field, value) => setAuthorizedPerson(prev => ({ ...prev, [field]: value }))}
                  otpSent={otpSent}
                  otpVerified={otpVerified}
                  onSendOtp={handleSendOtp}
                  onVerifyOtp={handleVerifyOtp}
                />
              </motion.div>
            )}

            {/* Step 5: Declaration */}
            {currentStep === 5 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <DeclarationStep
                  formData={declaration}
                  onFormChange={(field, value) => setDeclaration(prev => ({ ...prev, [field]: value }))}
                />
              </motion.div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrev}
              disabled={currentStep === 1}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </Button>
            
            {currentStep < 5 ? (
              <Button type="button" onClick={handleNext} className="gap-2">
                Next
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button type="submit" className="gap-2">
                Submit Registration
                <Check className="h-4 w-4" />
              </Button>
            )}
          </div>
        </form>

        {/* Step indicator for mobile */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          Step {currentStep} of {steps.length}
        </p>
      </main>
    </div>
  );
};

export default TempleRegister;
