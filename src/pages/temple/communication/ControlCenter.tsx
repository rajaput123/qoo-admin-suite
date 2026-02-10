import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Send, Clock, CheckCircle, AlertTriangle, Plus, Search, Filter, Users, Mail, MessageSquare, Smartphone } from "lucide-react";
import { toast } from "sonner";

const kpis = [
  { label: "Messages Sent Today", value: "47", icon: Send, change: "+12" },
  { label: "Pending Approval", value: "8", icon: Clock, change: "3 urgent" },
  { label: "Delivery Rate", value: "96.4%", icon: CheckCircle, change: "+0.8%" },
  { label: "Active Alerts", value: "2", icon: AlertTriangle, change: "1 critical" },
];

const recentMessages = [
  { id: "MSG-001", subject: "Maha Shivaratri Schedule", channel: "SMS + WhatsApp", audience: "All Devotees", status: "delivered", sent: "2024-02-10 09:00", deliveryRate: "97.2%" },
  { id: "MSG-002", subject: "Temple Closure - Maintenance", channel: "Email", audience: "Registered Donors", status: "pending_approval", sent: "-", deliveryRate: "-" },
  { id: "MSG-003", subject: "Special Abhishekam Booking Open", channel: "Push Notification", audience: "Premium Members", status: "delivered", sent: "2024-02-09 14:30", deliveryRate: "94.1%" },
  { id: "MSG-004", subject: "Emergency: Parking Lot Change", channel: "SMS", audience: "Today's Bookings", status: "delivered", sent: "2024-02-09 07:15", deliveryRate: "99.1%" },
  { id: "MSG-005", subject: "Annual Report Summary", channel: "Email", audience: "Trustees", status: "draft", sent: "-", deliveryRate: "-" },
  { id: "MSG-006", subject: "Volunteer Registration Drive", channel: "WhatsApp", audience: "Volunteers", status: "scheduled", sent: "2024-02-11 10:00", deliveryRate: "-" },
];

const templates = [
  { id: "TPL-001", name: "Festival Announcement", category: "Events", lastUsed: "2024-02-01", usageCount: 23 },
  { id: "TPL-002", name: "Timing Change Notice", category: "Operations", lastUsed: "2024-01-28", usageCount: 15 },
  { id: "TPL-003", name: "Emergency Alert", category: "Crisis", lastUsed: "2024-01-15", usageCount: 4 },
  { id: "TPL-004", name: "Donation Receipt", category: "Finance", lastUsed: "2024-02-08", usageCount: 156 },
];

const statusColors: Record<string, string> = {
  delivered: "text-green-700 bg-green-50 border-green-200",
  pending_approval: "text-amber-700 bg-amber-50 border-amber-200",
  draft: "text-muted-foreground bg-muted border-border",
  scheduled: "text-blue-700 bg-blue-50 border-blue-200",
  failed: "text-red-700 bg-red-50 border-red-200",
};

const ControlCenter = () => {
  const [search, setSearch] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<typeof recentMessages[0] | null>(null);

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <kpi.icon className="h-5 w-5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{kpi.change}</span>
              </div>
              <p className="text-2xl font-bold">{kpi.value}</p>
              <p className="text-xs text-muted-foreground">{kpi.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="messages">
        <TabsList>
          <TabsTrigger value="messages">Message Queue</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="segments">Audience Segments</TabsTrigger>
        </TabsList>

        <TabsContent value="messages" className="space-y-4">
          {/* Actions */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-1">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search messages..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
              </div>
              <Button variant="outline" size="sm"><Filter className="h-4 w-4 mr-1" />Filter</Button>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm"><Plus className="h-4 w-4 mr-1" />Compose Message</Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>Compose Message</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div><Label>Subject</Label><Input placeholder="Message subject" /></div>
                  <div><Label>Channel</Label>
                    <Select><SelectTrigger><SelectValue placeholder="Select channel" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sms">SMS</SelectItem>
                        <SelectItem value="whatsapp">WhatsApp</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="push">Push Notification</SelectItem>
                        <SelectItem value="multi">Multi-Channel</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div><Label>Audience</Label>
                    <Select><SelectTrigger><SelectValue placeholder="Select audience" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Devotees</SelectItem>
                        <SelectItem value="donors">Registered Donors</SelectItem>
                        <SelectItem value="volunteers">Volunteers</SelectItem>
                        <SelectItem value="premium">Premium Members</SelectItem>
                        <SelectItem value="trustees">Trustees</SelectItem>
                        <SelectItem value="today">Today's Bookings</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div><Label>Message Body</Label><Textarea rows={4} placeholder="Type your message..." /></div>
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" size="sm">Save as Draft</Button>
                    <Button variant="outline" size="sm"><Clock className="h-4 w-4 mr-1" />Schedule</Button>
                    <Button size="sm" onClick={() => toast.success("Message submitted for approval")}><Send className="h-4 w-4 mr-1" />Submit for Approval</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Messages Table */}
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Channel</TableHead>
                  <TableHead>Audience</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Sent</TableHead>
                  <TableHead>Delivery</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentMessages.filter(m => m.subject.toLowerCase().includes(search.toLowerCase())).map((msg) => (
                  <TableRow key={msg.id} className="cursor-pointer" onClick={() => setSelectedMessage(msg)}>
                    <TableCell className="font-mono text-xs">{msg.id}</TableCell>
                    <TableCell className="font-medium">{msg.subject}</TableCell>
                    <TableCell>{msg.channel}</TableCell>
                    <TableCell>{msg.audience}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={statusColors[msg.status]}>
                        {msg.status.replace("_", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs">{msg.sent}</TableCell>
                    <TableCell>{msg.deliveryRate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="flex justify-end">
            <Button size="sm" onClick={() => toast.success("Template editor opened")}><Plus className="h-4 w-4 mr-1" />New Template</Button>
          </div>
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Template ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Last Used</TableHead>
                  <TableHead>Usage Count</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {templates.map((t) => (
                  <TableRow key={t.id} className="cursor-pointer">
                    <TableCell className="font-mono text-xs">{t.id}</TableCell>
                    <TableCell className="font-medium">{t.name}</TableCell>
                    <TableCell><Badge variant="secondary">{t.category}</Badge></TableCell>
                    <TableCell className="text-xs">{t.lastUsed}</TableCell>
                    <TableCell>{t.usageCount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="segments" className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { name: "All Devotees", count: "12,450", icon: Users },
              { name: "Registered Donors", count: "3,280", icon: Users },
              { name: "Premium Members", count: "842", icon: Users },
              { name: "Volunteers", count: "1,156", icon: Users },
              { name: "Today's Bookings", count: "347", icon: Users },
              { name: "Trustees & Board", count: "18", icon: Users },
            ].map((seg) => (
              <Card key={seg.name} className="cursor-pointer hover:border-primary/50 transition-colors">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                    <seg.icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{seg.name}</p>
                    <p className="text-xs text-muted-foreground">{seg.count} recipients</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Message Detail Modal */}
      <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Message Details</DialogTitle>
          </DialogHeader>
          {selectedMessage && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="text-muted-foreground">ID:</span> <span className="font-mono">{selectedMessage.id}</span></div>
                <div><span className="text-muted-foreground">Status:</span> <Badge variant="outline" className={statusColors[selectedMessage.status]}>{selectedMessage.status.replace("_", " ")}</Badge></div>
                <div><span className="text-muted-foreground">Channel:</span> {selectedMessage.channel}</div>
                <div><span className="text-muted-foreground">Audience:</span> {selectedMessage.audience}</div>
                <div><span className="text-muted-foreground">Sent:</span> {selectedMessage.sent}</div>
                <div><span className="text-muted-foreground">Delivery Rate:</span> {selectedMessage.deliveryRate}</div>
              </div>
              <div>
                <Label className="text-muted-foreground">Subject</Label>
                <p className="font-medium">{selectedMessage.subject}</p>
              </div>
              {selectedMessage.status === "pending_approval" && (
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => { toast.success("Message approved"); setSelectedMessage(null); }}>Approve & Send</Button>
                  <Button variant="destructive" size="sm" onClick={() => { toast.error("Message rejected"); setSelectedMessage(null); }}>Reject</Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ControlCenter;
