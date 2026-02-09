import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, UserCheck, HandHelping, IndianRupee, Heart, TrendingUp, Calendar, Crown } from "lucide-react";

const kpis = [
  { label: "Total Devotees", value: "1,247", icon: Users, description: "All registered devotees" },
  { label: "Active (6 Months)", value: "834", icon: UserCheck, description: "Visited in last 6 months" },
  { label: "Total Volunteers", value: "86", icon: HandHelping, description: "Registered volunteers" },
  { label: "Active Volunteers", value: "52", icon: TrendingUp, description: "Assigned this month" },
];

const topDonors = [
  { name: "Ramesh Kumar", phone: "+91 98765 43210", totalDonation: 125000, lastDonation: "2026-02-05", visits: 48 },
  { name: "Lakshmi Devi", phone: "+91 87654 32109", totalDonation: 85000, lastDonation: "2026-01-28", visits: 62 },
  { name: "Suresh Reddy", phone: "+91 76543 21098", totalDonation: 65000, lastDonation: "2026-02-01", visits: 35 },
  { name: "Priya Sharma", phone: "+91 65432 10987", totalDonation: 52000, lastDonation: "2026-01-15", visits: 29 },
  { name: "Anand Verma", phone: "+91 54321 09876", totalDonation: 48000, lastDonation: "2026-02-08", visits: 41 },
];

const frequentParticipants = [
  { name: "Meena Iyer", sevas: 42, darshans: 86, lastVisit: "2026-02-09", level: "Highly Active" },
  { name: "Vijay Nair", sevas: 38, darshans: 72, lastVisit: "2026-02-08", level: "Highly Active" },
  { name: "Kavita Rao", sevas: 31, darshans: 55, lastVisit: "2026-02-07", level: "Active" },
  { name: "Ganesh Pillai", sevas: 28, darshans: 48, lastVisit: "2026-02-06", level: "Active" },
];

const upcomingAssignments = [
  { volunteer: "Ravi Shankar", event: "Maha Shivaratri Seva", date: "2026-02-14", role: "Crowd Control" },
  { volunteer: "Deepa Murthy", event: "Annadanam Service", date: "2026-02-10", role: "Cooking" },
  { volunteer: "Karthik S", event: "Evening Archana Setup", date: "2026-02-09", role: "Ritual Support" },
  { volunteer: "Sunita Bai", event: "Weekend Darshan", date: "2026-02-11", role: "Admin" },
];

const levelColor = (level: string) => {
  if (level === "Highly Active") return "text-green-700 border-green-300 bg-green-50";
  if (level === "Active") return "text-blue-700 border-blue-300 bg-blue-50";
  if (level === "Occasional") return "text-amber-700 border-amber-300 bg-amber-50";
  return "text-muted-foreground border-border bg-muted";
};

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight">Devotee & Volunteer Dashboard</h1>
          <p className="text-muted-foreground">Temple CRM overview and key metrics</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {kpis.map((kpi, i) => (
            <Card key={i} className="group hover:shadow-md transition-all duration-200">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-muted group-hover:bg-primary group-hover:shadow-lg transition-all duration-200">
                    <kpi.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary-foreground transition-colors duration-200" />
                  </div>
                </div>
                <p className="text-xl font-bold">{kpi.value}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{kpi.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Top Donors */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Crown className="h-4 w-4 text-amber-600" />
                Top Donors
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Devotee</TableHead>
                    <TableHead className="text-right">Total Donated</TableHead>
                    <TableHead className="text-right">Visits</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topDonors.map((d, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <p className="font-medium text-sm">{d.name}</p>
                        <p className="text-xs text-muted-foreground">{d.phone}</p>
                      </TableCell>
                      <TableCell className="text-right font-medium text-sm">₹{d.totalDonation.toLocaleString()}</TableCell>
                      <TableCell className="text-right text-sm text-muted-foreground">{d.visits}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Frequent Seva Participants */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Heart className="h-4 w-4 text-red-500" />
                Frequent Seva Participants
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Devotee</TableHead>
                    <TableHead className="text-center">Sevas</TableHead>
                    <TableHead className="text-center">Darshans</TableHead>
                    <TableHead>Level</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {frequentParticipants.map((p, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <p className="font-medium text-sm">{p.name}</p>
                        <p className="text-xs text-muted-foreground">Last: {p.lastVisit}</p>
                      </TableCell>
                      <TableCell className="text-center font-medium text-sm">{p.sevas}</TableCell>
                      <TableCell className="text-center font-medium text-sm">{p.darshans}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`text-[10px] ${levelColor(p.level)}`}>{p.level}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Volunteer Assignments */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              Upcoming Volunteer Assignments
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Volunteer</TableHead>
                  <TableHead>Event / Task</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Role</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {upcomingAssignments.map((a, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium text-sm">{a.volunteer}</TableCell>
                    <TableCell className="text-sm">{a.event}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{a.date}</TableCell>
                    <TableCell><Badge variant="secondary" className="text-xs">{a.role}</Badge></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Dashboard;
