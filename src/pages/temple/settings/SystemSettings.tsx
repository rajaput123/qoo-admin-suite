import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Mail, FileText, Globe, Clock, FileEdit } from "lucide-react";
import { toast } from "sonner";

const SystemSettings = () => {
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: false,
    bookingReminders: true,
    paymentAlerts: true,
    eventReminders: true,
    donationAlerts: true,
  });

  const [emailConfig, setEmailConfig] = useState({
    smtpServer: "smtp.gmail.com",
    smtpPort: "587",
    smtpUsername: "noreply@temple.org",
    smtpPassword: "********",
    fromEmail: "noreply@temple.org",
    fromName: "Temple Management System",
  });

  const [smsConfig, setSmsConfig] = useState({
    provider: "Twilio",
    apiKey: "********",
    apiSecret: "********",
    senderId: "TEMPLE",
  });

  const [documentTemplates, setDocumentTemplates] = useState([
    { id: "TMP-001", name: "Donation Receipt", type: "Receipt", enabled: true },
    { id: "TMP-002", name: "80G Certificate", type: "Certificate", enabled: true },
    { id: "TMP-003", name: "Booking Confirmation", type: "Confirmation", enabled: true },
    { id: "TMP-004", name: "Event Invitation", type: "Invitation", enabled: false },
  ]);

  const [reportSettings, setReportSettings] = useState({
    defaultFormat: "PDF",
    includeLogo: true,
    includeFooter: true,
    autoEmail: false,
  });

  const [systemConfig, setSystemConfig] = useState({
    timezone: "Asia/Kolkata",
    dateFormat: "DD/MM/YYYY",
    timeFormat: "12h",
    currency: "INR",
    language: "en",
  });

  const handleSaveNotifications = () => {
    toast.success("Notification preferences saved");
  };

  const handleSaveEmailConfig = () => {
    toast.success("Email configuration saved");
  };

  const handleSaveSMSConfig = () => {
    toast.success("SMS configuration saved");
  };

  const handleSaveSystemConfig = () => {
    toast.success("System settings saved");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">System Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Configure system-wide settings and preferences</p>
      </div>

      <Tabs defaultValue="notifications" className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-transparent">
          <TabsTrigger value="notifications" className="rounded-none border-b-2 border-transparent data-[state=active]:border-amber-700">
            Notifications
          </TabsTrigger>
          <TabsTrigger value="email" className="rounded-none border-b-2 border-transparent data-[state=active]:border-amber-700">
            Email
          </TabsTrigger>
          <TabsTrigger value="sms" className="rounded-none border-b-2 border-transparent data-[state=active]:border-amber-700">
            SMS
          </TabsTrigger>
          <TabsTrigger value="templates" className="rounded-none border-b-2 border-transparent data-[state=active]:border-amber-700">
            Templates
          </TabsTrigger>
          <TabsTrigger value="system" className="rounded-none border-b-2 border-transparent data-[state=active]:border-amber-700">
            System
          </TabsTrigger>
        </TabsList>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Bell className="h-4 w-4" /> Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email Notifications</Label>
                    <p className="text-xs text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch
                    checked={notifications.emailNotifications}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, emailNotifications: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>SMS Notifications</Label>
                    <p className="text-xs text-muted-foreground">Receive notifications via SMS</p>
                  </div>
                  <Switch
                    checked={notifications.smsNotifications}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, smsNotifications: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Push Notifications</Label>
                    <p className="text-xs text-muted-foreground">Receive push notifications in browser</p>
                  </div>
                  <Switch
                    checked={notifications.pushNotifications}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, pushNotifications: checked })}
                  />
                </div>
              </div>
              <div className="border-t pt-4 space-y-4">
                <p className="text-sm font-medium">Notification Types</p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Booking Reminders</Label>
                    <Switch
                      checked={notifications.bookingReminders}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, bookingReminders: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Payment Alerts</Label>
                    <Switch
                      checked={notifications.paymentAlerts}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, paymentAlerts: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Event Reminders</Label>
                    <Switch
                      checked={notifications.eventReminders}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, eventReminders: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Donation Alerts</Label>
                    <Switch
                      checked={notifications.donationAlerts}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, donationAlerts: checked })}
                    />
                  </div>
                </div>
              </div>
              <Button onClick={handleSaveNotifications}>Save Notification Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Configuration Tab */}
        <TabsContent value="email" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Mail className="h-4 w-4" /> Email Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>SMTP Server</Label>
                  <Input
                    value={emailConfig.smtpServer}
                    onChange={(e) => setEmailConfig({ ...emailConfig, smtpServer: e.target.value })}
                    placeholder="smtp.gmail.com"
                  />
                </div>
                <div>
                  <Label>SMTP Port</Label>
                  <Input
                    value={emailConfig.smtpPort}
                    onChange={(e) => setEmailConfig({ ...emailConfig, smtpPort: e.target.value })}
                    placeholder="587"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>SMTP Username</Label>
                  <Input
                    value={emailConfig.smtpUsername}
                    onChange={(e) => setEmailConfig({ ...emailConfig, smtpUsername: e.target.value })}
                    placeholder="your-email@domain.com"
                  />
                </div>
                <div>
                  <Label>SMTP Password</Label>
                  <Input
                    type="password"
                    value={emailConfig.smtpPassword}
                    onChange={(e) => setEmailConfig({ ...emailConfig, smtpPassword: e.target.value })}
                    placeholder="Enter password"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>From Email</Label>
                  <Input
                    value={emailConfig.fromEmail}
                    onChange={(e) => setEmailConfig({ ...emailConfig, fromEmail: e.target.value })}
                    placeholder="noreply@temple.org"
                  />
                </div>
                <div>
                  <Label>From Name</Label>
                  <Input
                    value={emailConfig.fromName}
                    onChange={(e) => setEmailConfig({ ...emailConfig, fromName: e.target.value })}
                    placeholder="Temple Management System"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => toast.info("Testing email connection...")}>
                  Test Connection
                </Button>
                <Button onClick={handleSaveEmailConfig}>Save Email Configuration</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SMS Configuration Tab */}
        <TabsContent value="sms" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Bell className="h-4 w-4" /> SMS Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>SMS Provider</Label>
                <Select
                  value={smsConfig.provider}
                  onValueChange={(value) => setSmsConfig({ ...smsConfig, provider: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Twilio">Twilio</SelectItem>
                    <SelectItem value="AWS SNS">AWS SNS</SelectItem>
                    <SelectItem value="MSG91">MSG91</SelectItem>
                    <SelectItem value="TextLocal">TextLocal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>API Key</Label>
                  <Input
                    type="password"
                    value={smsConfig.apiKey}
                    onChange={(e) => setSmsConfig({ ...smsConfig, apiKey: e.target.value })}
                    placeholder="Enter API key"
                  />
                </div>
                <div>
                  <Label>API Secret</Label>
                  <Input
                    type="password"
                    value={smsConfig.apiSecret}
                    onChange={(e) => setSmsConfig({ ...smsConfig, apiSecret: e.target.value })}
                    placeholder="Enter API secret"
                  />
                </div>
              </div>
              <div>
                <Label>Sender ID</Label>
                <Input
                  value={smsConfig.senderId}
                  onChange={(e) => setSmsConfig({ ...smsConfig, senderId: e.target.value })}
                  placeholder="TEMPLE"
                  maxLength={6}
                />
                <p className="text-xs text-muted-foreground mt-1">Max 6 characters</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => toast.info("Testing SMS connection...")}>
                  Test Connection
                </Button>
                <Button onClick={handleSaveSMSConfig}>Save SMS Configuration</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Document Templates Tab */}
        <TabsContent value="templates" className="space-y-4 mt-6">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <FileText className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">Document Templates</h3>
              <p className="text-sm text-muted-foreground text-center max-w-md">
                This feature is coming soon. You'll be able to manage document templates, customize receipts, certificates, and reports.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Configuration Tab */}
        <TabsContent value="system" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Globe className="h-4 w-4" /> System Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Timezone</Label>
                  <Select
                    value={systemConfig.timezone}
                    onValueChange={(value) => setSystemConfig({ ...systemConfig, timezone: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Kolkata">Asia/Kolkata (IST)</SelectItem>
                      <SelectItem value="America/New_York">America/New_York (EST)</SelectItem>
                      <SelectItem value="Europe/London">Europe/London (GMT)</SelectItem>
                      <SelectItem value="Asia/Dubai">Asia/Dubai (GST)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Date Format</Label>
                  <Select
                    value={systemConfig.dateFormat}
                    onValueChange={(value) => setSystemConfig({ ...systemConfig, dateFormat: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                      <SelectItem value="DD-MM-YYYY">DD-MM-YYYY</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Time Format</Label>
                  <Select
                    value={systemConfig.timeFormat}
                    onValueChange={(value) => setSystemConfig({ ...systemConfig, timeFormat: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12h">12 Hour (AM/PM)</SelectItem>
                      <SelectItem value="24h">24 Hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Currency</Label>
                  <Select
                    value={systemConfig.currency}
                    onValueChange={(value) => setSystemConfig({ ...systemConfig, currency: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="INR">Indian Rupee (₹)</SelectItem>
                      <SelectItem value="USD">US Dollar ($)</SelectItem>
                      <SelectItem value="EUR">Euro (€)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>Language</Label>
                <Select
                  value={systemConfig.language}
                  onValueChange={(value) => setSystemConfig({ ...systemConfig, language: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="hi">Hindi</SelectItem>
                    <SelectItem value="ta">Tamil</SelectItem>
                    <SelectItem value="te">Telugu</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleSaveSystemConfig}>Save System Configuration</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemSettings;
