import { motion } from "framer-motion";
import { Building2, Camera, Save, Globe, Phone, Mail, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

const TempleProfile = () => {
  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl"
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-1">Temple Profile</h1>
            <p className="text-muted-foreground">Manage your temple's public profile and details</p>
          </div>
          <Button className="gap-2">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>

        {/* Profile Picture */}
        <div className="glass-card rounded-2xl p-6 mb-6">
          <h3 className="font-semibold text-foreground mb-4">Temple Image</h3>
          <div className="flex items-center gap-6">
            <div className="relative group">
              <div className="w-24 h-24 rounded-xl bg-muted flex items-center justify-center overflow-hidden">
                <Building2 className="h-10 w-10 text-muted-foreground" />
              </div>
              <button className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl">
                <Camera className="h-5 w-5 text-white" />
              </button>
            </div>
            <div>
              <Button variant="outline" size="sm" className="mb-2">Upload Image</Button>
              <p className="text-xs text-muted-foreground">JPG, PNG or WEBP. Max 5MB.</p>
            </div>
          </div>
        </div>

        {/* Basic Details */}
        <div className="glass-card rounded-2xl p-6 mb-6">
          <h3 className="font-semibold text-foreground mb-4">Basic Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="templeName">Temple Name</Label>
              <Input id="templeName" defaultValue="Sri Venkateswara Temple" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="displayName">Display Name</Label>
              <Input id="displayName" defaultValue="Tirumala Temple" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deity">Primary Deity</Label>
              <Input id="deity" defaultValue="Lord Venkateswara" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                rows={3}
                defaultValue="One of the most famous Hindu temples dedicated to Lord Venkateswara, a form of Vishnu."
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="glass-card rounded-2xl p-6 mb-6">
          <h3 className="font-semibold text-foreground mb-4">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone Number
                </div>
              </Label>
              <Input id="phone" defaultValue="+91 98765 43210" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address
                </div>
              </Label>
              <Input id="email" type="email" defaultValue="info@temple.org" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Website
                </div>
              </Label>
              <Input id="website" defaultValue="www.temple.org" />
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="glass-card rounded-2xl p-6 mb-6">
          <h3 className="font-semibold text-foreground mb-4">Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Full Address
                </div>
              </Label>
              <Textarea id="address" rows={2} defaultValue="Temple Street, Tirumala Hills, Tirupati" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" defaultValue="Tirupati" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input id="state" defaultValue="Andhra Pradesh" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pincode">Postal Code</Label>
              <Input id="pincode" defaultValue="517501" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input id="country" defaultValue="India" />
            </div>
          </div>
        </div>

        {/* Account Info (Read-only) */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="font-semibold text-foreground mb-4">Account Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Tenant ID</p>
              <p className="font-mono text-sm">TNT-2024-001234</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Subscription Plan</p>
              <Badge variant="secondary">Premium</Badge>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Account Status</p>
              <Badge variant="outline" className="text-green-700 border-green-300 bg-green-50">Active</Badge>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Member Since</p>
              <p className="text-sm">January 15, 2024</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TempleProfile;
