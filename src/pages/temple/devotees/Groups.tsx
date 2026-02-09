import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, UsersRound, Users, Megaphone, Search, Send, Mail, MessageSquare } from "lucide-react";
import { toast } from "sonner";

type Group = {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  volunteerCount: number;
  lastCommunication: string;
  createdAt: string;
  members: { name: string; phone: string; type: string }[];
};

const groups: Group[] = [
  { id: "GRP-001", name: "Monthly Donors", description: "Devotees who donate every month", memberCount: 45, volunteerCount: 8, lastCommunication: "2026-02-05", createdAt: "2025-06-01", members: [{ name: "Ramesh Kumar", phone: "+91 98765 43210", type: "Devotee" }, { name: "Lakshmi Devi", phone: "+91 87654 32109", type: "Volunteer" }, { name: "Suresh Reddy", phone: "+91 76543 21098", type: "Devotee" }, { name: "Anand Verma", phone: "+91 54321 09876", type: "Volunteer" }] },
  { id: "GRP-002", name: "Shiva Shrine Devotees", description: "Regular visitors to the Shiva Shrine", memberCount: 120, volunteerCount: 0, lastCommunication: "2026-01-28", createdAt: "2025-08-15", members: [{ name: "Meena Iyer", phone: "+91 43210 98765", type: "Devotee" }, { name: "Vijay Nair", phone: "+91 32109 87654", type: "Devotee" }] },
  { id: "GRP-003", name: "Annadanam Volunteers", description: "Volunteers for daily Annadanam service", memberCount: 12, volunteerCount: 12, lastCommunication: "2026-02-08", createdAt: "2025-04-10", members: [{ name: "Lakshmi Devi", phone: "+91 87654 32109", type: "Volunteer" }, { name: "Deepa Murthy", phone: "+91 10987 65432", type: "Volunteer" }] },
  { id: "GRP-004", name: "Festival Volunteers", description: "Volunteers available for festivals and special events", memberCount: 28, volunteerCount: 28, lastCommunication: "2026-02-01", createdAt: "2025-09-20", members: [{ name: "Anand Verma", phone: "+91 54321 09876", type: "Volunteer" }, { name: "Ravi Shankar", phone: "+91 21098 76543", type: "Volunteer" }] },
  { id: "GRP-005", name: "VIP Devotees", description: "High-value devotees requiring special attention", memberCount: 18, volunteerCount: 3, lastCommunication: "2026-02-06", createdAt: "2025-07-01", members: [{ name: "Ramesh Kumar", phone: "+91 98765 43210", type: "Devotee" }, { name: "Lakshmi Devi", phone: "+91 87654 32109", type: "Volunteer" }, { name: "Priya Sharma", phone: "+91 65432 10987", type: "Devotee" }] },
];

const Groups = () => {
  const [search, setSearch] = useState("");
  const [viewing, setViewing] = useState<Group | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [showComm, setShowComm] = useState<Group | null>(null);

  const filtered = groups.filter(g => !search || g.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Groups</h1>
            <p className="text-muted-foreground">Segment devotees for engagement and communication</p>
          </div>
          <Button onClick={() => setShowAdd(true)} className="gap-2"><Plus className="h-4 w-4" />Create Group</Button>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {[
            { label: "Total Groups", value: groups.length.toString(), icon: UsersRound },
            { label: "Total Members", value: groups.reduce((a, g) => a + g.memberCount, 0).toString(), icon: Users },
            { label: "Communications Sent", value: "24", icon: Megaphone },
          ].map((kpi, i) => (
            <Card key={i} className="group hover:shadow-md transition-all duration-200">
              <CardContent className="p-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-muted group-hover:bg-primary group-hover:shadow-lg transition-all duration-200 mb-2">
                  <kpi.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary-foreground transition-colors duration-200" />
                </div>
                <p className="text-xl font-bold">{kpi.value}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{kpi.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search */}
        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search groups..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <Badge variant="secondary" className="ml-auto">{filtered.length} groups</Badge>
        </div>

        {/* Group Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(g => (
            <Card key={g.id} className="hover:shadow-md transition-all cursor-pointer" onClick={() => setViewing(g)}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-base">{g.name}</CardTitle>
                    <p className="text-xs text-muted-foreground mt-1">{g.description}</p>
                  </div>
                  <Badge variant="secondary" className="text-[10px]">{g.id}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm mb-3">
                  <div className="flex items-center gap-1.5 text-muted-foreground"><Users className="h-3.5 w-3.5" />{g.memberCount} members</div>
                  {g.volunteerCount > 0 && <Badge variant="outline" className="text-[10px]">{g.volunteerCount} volunteers</Badge>}
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-[10px] text-muted-foreground">Last sent: {g.lastCommunication}</p>
                  <Button variant="ghost" size="sm" className="h-7 text-xs gap-1" onClick={e => { e.stopPropagation(); setShowComm(g); }}>
                    <Send className="h-3 w-3" />Send
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Group Detail Dialog */}
      <Dialog open={!!viewing} onOpenChange={() => setViewing(null)}>
        <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto bg-background">
          <DialogHeader>
            <DialogTitle>{viewing?.name}</DialogTitle>
            <DialogDescription>{viewing?.description}</DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="members" className="mt-2">
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
              <TabsTrigger value="members" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent text-sm">Members</TabsTrigger>
              <TabsTrigger value="info" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent text-sm">Details</TabsTrigger>
            </TabsList>
            <TabsContent value="members" className="mt-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-muted-foreground">{viewing?.members.length} of {viewing?.memberCount} shown</p>
                <Button variant="outline" size="sm" className="gap-1.5 text-xs"><Plus className="h-3 w-3" />Add Members</Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Type</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {viewing?.members.map((m, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium text-sm">{m.name}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{m.phone}</TableCell>
                      <TableCell><Badge variant={m.type === "Volunteer" ? "default" : "secondary"} className="text-[10px]">{m.type}</Badge></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="info" className="mt-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                {[
                  ["Group ID", viewing?.id],
                  ["Created", viewing?.createdAt],
                  ["Total Members", viewing?.memberCount],
                  ["Volunteers", viewing?.volunteerCount],
                  ["Last Communication", viewing?.lastCommunication],
                ].map(([label, value]) => (
                  <div key={label as string} className="p-3 bg-muted/50 rounded-lg"><p className="text-xs text-muted-foreground">{label as string}</p><p className="font-medium text-sm">{String(value)}</p></div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
          <DialogFooter>
            <Button variant="outline" className="gap-2" onClick={() => { setViewing(null); setShowComm(viewing); }}><Send className="h-4 w-4" />Send Communication</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Send Communication Dialog */}
      <Dialog open={!!showComm} onOpenChange={() => setShowComm(null)}>
        <DialogContent className="sm:max-w-[500px] bg-background">
          <DialogHeader>
            <DialogTitle>Send Communication</DialogTitle>
            <DialogDescription>To: {showComm?.name} ({showComm?.memberCount} members)</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label className="text-xs mb-1.5 block">Channel</Label>
              <div className="flex gap-2">
                {[{ icon: MessageSquare, label: "SMS" }, { icon: MessageSquare, label: "WhatsApp" }, { icon: Mail, label: "Email" }].map(ch => (
                  <Button key={ch.label} variant="outline" size="sm" className="gap-1.5 flex-1"><ch.icon className="h-3.5 w-3.5" />{ch.label}</Button>
                ))}
              </div>
            </div>
            <div><Label className="text-xs">Subject</Label><Input placeholder="Message subject..." className="mt-1" /></div>
            <div><Label className="text-xs">Message</Label><Textarea placeholder="Type your message..." className="mt-1 min-h-[100px]" /></div>
          </div>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setShowComm(null)}>Cancel</Button>
            <Button onClick={() => { setShowComm(null); toast.success("Communication sent successfully"); }} className="gap-2"><Send className="h-4 w-4" />Send</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Group Dialog */}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="sm:max-w-[500px] bg-background">
          <DialogHeader>
            <DialogTitle>Create New Group</DialogTitle>
            <DialogDescription>Segment devotees and volunteers for targeted engagement</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div><Label className="text-xs">Group Name</Label><Input placeholder="e.g. Monthly Donors" className="mt-1" /></div>
            <div><Label className="text-xs">Description</Label><Textarea placeholder="Describe the purpose of this group..." className="mt-1" /></div>
            <div>
              <Label className="text-xs">Add Members (Search)</Label>
              <Input placeholder="Search devotees or volunteers by name/phone..." className="mt-1" />
              <p className="text-[10px] text-muted-foreground mt-1">You can add members after creating the group</p>
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setShowAdd(false)}>Cancel</Button>
            <Button onClick={() => { setShowAdd(false); toast.success("Group created"); }}>Create Group</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Groups;
