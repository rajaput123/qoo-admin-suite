import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Upload, Building2, User, FileText, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import SearchableSelect from "@/components/SearchableSelect";

const steps = [
  { id: 1, title: "Temple Info", icon: Building2 },
  { id: 2, title: "Authorized Person", icon: User },
  { id: 3, title: "Legal Details", icon: FileText },
  { id: 4, title: "Declaration", icon: Shield },
];

const stateOptions = [
  { value: "karnataka", label: "Karnataka" },
  { value: "tamil-nadu", label: "Tamil Nadu" },
  { value: "andhra-pradesh", label: "Andhra Pradesh" },
  { value: "kerala", label: "Kerala" },
  { value: "maharashtra", label: "Maharashtra" },
];

const TempleRegister = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleNext = () => {
    if (currentStep < 4) {
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
            Your temple registration is under review. We'll notify you once your account is approved.
          </p>
          <div className="glass-card rounded-2xl p-6 mb-6">
            <p className="text-sm text-muted-foreground mb-2">Application Reference</p>
            <p className="text-lg font-mono font-semibold text-foreground">REG-2024-001234</p>
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
      <header className="border-b border-border bg-card">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Login
          </button>
          <h1 className="text-xl font-bold text-primary">Keehoo</h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-bold text-foreground mb-2">Temple Registration</h1>
          <p className="text-muted-foreground">Complete the form below to register your temple on Keehoo</p>
        </motion.div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-10">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm
                  ${currentStep > step.id 
                    ? "bg-primary text-primary-foreground" 
                    : currentStep === step.id 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted text-muted-foreground"
                  }
                `}>
                  {currentStep > step.id ? <Check className="h-5 w-5" /> : <step.icon className="h-5 w-5" />}
                </div>
                <span className={`text-xs mt-2 ${currentStep >= step.id ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-16 sm:w-24 h-0.5 mx-2 ${currentStep > step.id ? "bg-primary" : "bg-border"}`} />
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="glass-card rounded-2xl p-8">
            {/* Step 1: Temple Information */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="text-lg font-semibold text-foreground mb-4">Temple Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="templeName">Temple Legal Name *</Label>
                    <Input id="templeName" placeholder="e.g., Sri Venkateswara Temple Trust" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="deityName">Primary Deity Name *</Label>
                    <Input id="deityName" placeholder="e.g., Lord Venkateswara" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="trustName">Trust/Society Name</Label>
                    <Input id="trustName" placeholder="e.g., Temple Trust Board" />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Full Address *</Label>
                    <Textarea id="address" placeholder="Enter complete temple address" rows={2} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>State *</Label>
                    <SearchableSelect
                      options={stateOptions}
                      value=""
                      onValueChange={() => {}}
                      placeholder="Select State"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="pincode">Pincode *</Label>
                    <Input id="pincode" placeholder="e.g., 560001" />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Authorized Person */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="text-lg font-semibold text-foreground mb-4">Authorized Person Details</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="personName">Full Name *</Label>
                    <Input id="personName" placeholder="Enter your full name" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="role">Role/Designation *</Label>
                    <Input id="role" placeholder="e.g., Chief Administrator" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="mobile">Mobile Number *</Label>
                    <div className="flex gap-2">
                      <Input id="mobile" placeholder="+91 98765 43210" className="flex-1" />
                      {!otpVerified && (
                        <Button 
                          type="button" 
                          variant={otpSent ? "outline" : "default"}
                          onClick={handleSendOtp}
                          disabled={otpVerified}
                        >
                          {otpSent ? "Resend" : "Send OTP"}
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  {otpSent && !otpVerified && (
                    <div className="space-y-2">
                      <Label htmlFor="otp">Enter OTP *</Label>
                      <div className="flex gap-2">
                        <Input id="otp" placeholder="Enter 6-digit OTP" className="flex-1" maxLength={6} />
                        <Button type="button" onClick={handleVerifyOtp}>Verify</Button>
                      </div>
                    </div>
                  )}
                  
                  {otpVerified && (
                    <div className="space-y-2">
                      <Label>Verification Status</Label>
                      <div className="flex items-center gap-2 h-10 px-3 bg-green-50 border border-green-200 rounded-lg">
                        <Check className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-green-700 font-medium">Mobile Verified</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input id="email" type="email" placeholder="admin@temple.org" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Create Password *</Label>
                    <Input id="password" type="password" placeholder="Minimum 8 characters" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password *</Label>
                    <Input id="confirmPassword" type="password" placeholder="Re-enter password" />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Legal Details */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="text-lg font-semibold text-foreground mb-4">Legal & Verification Details</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="regNumber">Trust Registration Number *</Label>
                    <Input id="regNumber" placeholder="e.g., TRN/2020/12345" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="pan">PAN Number (Optional)</Label>
                    <Input id="pan" placeholder="e.g., ABCDE1234F" />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label>Trust Registration Certificate *</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                      <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        PDF, JPG, or PNG (max. 5MB)
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bankName">Bank Name (Optional)</Label>
                    <Input id="bankName" placeholder="e.g., State Bank of India" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="accountNumber">Account Number (Optional)</Label>
                    <Input id="accountNumber" placeholder="Enter bank account number" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="ifsc">IFSC Code (Optional)</Label>
                    <Input id="ifsc" placeholder="e.g., SBIN0001234" />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Declaration */}
            {currentStep === 4 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="text-lg font-semibold text-foreground mb-4">Declaration & Consent</h2>
                
                <div className="space-y-4">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h3 className="font-medium text-foreground mb-2">Terms of Service</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      By registering on Keehoo, you agree to our Terms of Service, which govern your use of the platform. 
                      You confirm that all information provided is accurate and that you are authorized to register this temple.
                    </p>
                  </div>
                  
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h3 className="font-medium text-foreground mb-2">Privacy Policy</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      We collect and process your data in accordance with our Privacy Policy. 
                      Your temple and personal information will be used to provide our services and will not be shared without consent.
                    </p>
                  </div>
                  
                  <div className="space-y-3 pt-4">
                    <div className="flex items-start gap-3">
                      <Checkbox id="terms" className="mt-1" />
                      <Label htmlFor="terms" className="text-sm font-normal cursor-pointer leading-relaxed">
                        I accept the <span className="text-primary underline">Terms of Service</span> and confirm that all information provided is accurate.
                      </Label>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Checkbox id="privacy" className="mt-1" />
                      <Label htmlFor="privacy" className="text-sm font-normal cursor-pointer leading-relaxed">
                        I have read and agree to the <span className="text-primary underline">Privacy Policy</span>.
                      </Label>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Checkbox id="authorized" className="mt-1" />
                      <Label htmlFor="authorized" className="text-sm font-normal cursor-pointer leading-relaxed">
                        I confirm that I am authorized to register this temple and act on behalf of the trust/organization.
                      </Label>
                    </div>
                  </div>
                </div>
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
            
            {currentStep < 4 ? (
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
      </main>
    </div>
  );
};

export default TempleRegister;
