import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Building2, Shield, Phone, Mail, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type LoginRole = "super-admin" | "temple-admin";
type TempleAuthMethod = "password" | "otp";

const Login = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<LoginRole>("super-admin");
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [authMethod, setAuthMethod] = useState<TempleAuthMethod>("password");
  const [otpSent, setOtpSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === "super-admin") {
      navigate("/hub");
    } else {
      navigate("/temple-hub");
    }
  };

  const handleSendOtp = () => {
    setOtpSent(true);
  };

  const handleRegisterClick = () => {
    navigate("/temple-register");
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 brown-gradient relative items-center justify-center p-12">
        <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-md text-center"
        >
          <div className="mb-8">
            <h1 className="text-5xl font-bold text-white mb-2 tracking-tight">Keehoo</h1>
            <div className="w-12 h-0.5 bg-white/60 mx-auto" />
          </div>
          <h2 className="text-2xl font-semibold text-white/95 mb-4">
            Digital Governance for Temples
          </h2>
          <p className="text-white/75 text-base leading-relaxed">
            {role === "super-admin" 
              ? "Manage temple directory and onboarding at scale"
              : "Manage your temple operations digitally"
            }
          </p>
          <div className="mt-12 flex items-center justify-center gap-8 text-white/50 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-white/80">10K+</div>
              <div>Temples</div>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="text-center">
              <div className="text-2xl font-bold text-white/80">500+</div>
              <div>Organizations</div>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="text-center">
              <div className="text-2xl font-bold text-white/80">99.9%</div>
              <div>Uptime</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-background">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <h1 className="text-3xl font-bold text-primary">Keehoo</h1>
            <p className="text-sm text-muted-foreground mt-1">Digital Governance for Temples</p>
          </div>

          <div className="bg-card rounded-2xl card-shadow-lg p-8">
            {/* Role Selection */}
            <div className="mb-6">
              <Tabs value={role} onValueChange={(v) => setRole(v as LoginRole)} className="w-full">
                <TabsList className="grid w-full grid-cols-2 h-11">
                  <TabsTrigger value="super-admin" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    <Shield className="h-4 w-4" />
                    Super Admin
                  </TabsTrigger>
                  <TabsTrigger value="temple-admin" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    <Building2 className="h-4 w-4" />
                    Temple Admin
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <AnimatePresence mode="wait">
              {role === "super-admin" ? (
                <motion.div
                  key="super-admin"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-foreground">
                      {isRegister ? "Create Account" : "Welcome back"}
                    </h2>
                    <p className="text-muted-foreground text-sm mt-1">
                      {isRegister
                        ? "Get started with your admin account"
                        : "Sign in to your admin dashboard"}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {isRegister && (
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" placeholder="Enter your full name" className="h-10" />
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="admin@example.com" className="h-10" />
                    </div>

                    {isRegister && (
                      <div className="space-y-2">
                        <Label htmlFor="org">Organization Type</Label>
                        <Input id="org" placeholder="e.g., Trust, Society" className="h-10" />
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="h-10 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    {isRegister && (
                      <div className="space-y-2">
                        <Label htmlFor="confirm">Confirm Password</Label>
                        <div className="relative">
                          <Input
                            id="confirm"
                            type={showConfirm ? "text" : "password"}
                            placeholder="••••••••"
                            className="h-10 pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirm(!showConfirm)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          >
                            {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>
                    )}

                    {!isRegister && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Checkbox id="remember" />
                          <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
                            Remember me
                          </Label>
                        </div>
                        <button type="button" className="text-sm text-primary hover:text-accent transition-colors">
                          Forgot password?
                        </button>
                      </div>
                    )}

                    <Button type="submit" className="w-full h-10 font-medium">
                      {isRegister ? "Create Account" : "Sign In"}
                    </Button>
                  </form>

                  <div className="mt-6 text-center">
                    <p className="text-sm text-muted-foreground">
                      {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
                      <button
                        onClick={() => setIsRegister(!isRegister)}
                        className="text-primary hover:text-accent font-medium transition-colors"
                      >
                        {isRegister ? "Sign in" : "Register"}
                      </button>
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="temple-admin"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-foreground">Temple Login</h2>
                    <p className="text-muted-foreground text-sm mt-1">
                      Access your temple management dashboard
                    </p>
                  </div>

                  {/* Auth Method Toggle */}
                  <div className="flex gap-2 mb-6">
                    <Button
                      type="button"
                      variant={authMethod === "password" ? "default" : "outline"}
                      size="sm"
                      onClick={() => { setAuthMethod("password"); setOtpSent(false); }}
                      className="flex-1 gap-2"
                    >
                      <Mail className="h-4 w-4" />
                      Password
                    </Button>
                    <Button
                      type="button"
                      variant={authMethod === "otp" ? "default" : "outline"}
                      size="sm"
                      onClick={() => { setAuthMethod("otp"); setOtpSent(false); }}
                      className="flex-1 gap-2"
                    >
                      <Phone className="h-4 w-4" />
                      OTP
                    </Button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="mobile">Mobile Number</Label>
                      <Input 
                        id="mobile" 
                        type="tel" 
                        placeholder="+91 98765 43210" 
                        className="h-10" 
                      />
                    </div>

                    {authMethod === "password" ? (
                      <div className="space-y-2">
                        <Label htmlFor="temple-password">Password</Label>
                        <div className="relative">
                          <Input
                            id="temple-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="h-10 pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        {!otpSent ? (
                          <Button 
                            type="button" 
                            variant="outline" 
                            className="w-full h-10"
                            onClick={handleSendOtp}
                          >
                            Send OTP
                          </Button>
                        ) : (
                          <div className="space-y-2">
                            <Label htmlFor="otp">Enter OTP</Label>
                            <Input 
                              id="otp" 
                              type="text" 
                              placeholder="Enter 6-digit OTP" 
                              className="h-10 text-center tracking-widest" 
                              maxLength={6}
                            />
                            <p className="text-xs text-muted-foreground text-center">
                              OTP sent to your mobile number
                            </p>
                          </div>
                        )}
                      </>
                    )}

                    {(authMethod === "password" || otpSent) && (
                      <Button type="submit" className="w-full h-10 font-medium">
                        Sign In
                      </Button>
                    )}
                  </form>

                  <div className="mt-6 text-center">
                    <p className="text-sm text-muted-foreground">
                      New temple?{" "}
                      <button
                        onClick={handleRegisterClick}
                        className="text-primary hover:text-accent font-medium transition-colors"
                      >
                        Register your temple
                      </button>
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
