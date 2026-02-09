import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart3, IndianRupee, TrendingUp, Users, Clock, Landmark } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const revenueByStructure = [
  { name: "Main Temple", revenue: 285000, bookings: 1240 },
  { name: "Padmavathi Shrine", revenue: 45000, bookings: 320 },
  { name: "Varadaraja Shrine", revenue: 28000, bookings: 180 },
  { name: "Lakshmi Shrine", revenue: 12000, bookings: 95 },
];

const ritualPerformance = [
  { name: "Suprabhatam", bookings: 450, revenue: 225000, avgOccupancy: 96 },
  { name: "Archana", bookings: 320, revenue: 32000, avgOccupancy: 88 },
  { name: "Abhishekam", bookings: 180, revenue: 360000, avgOccupancy: 72 },
  { name: "Sahasranama", bookings: 95, revenue: 142500, avgOccupancy: 60 },
  { name: "Ashtottara", bookings: 75, revenue: 37500, avgOccupancy: 45 },
];

const darshanLoad = [
  { time: "6-8 AM", count: 1200 },
  { time: "8-10 AM", count: 1800 },
  { time: "10-12 PM", count: 900 },
  { time: "12-2 PM", count: 400 },
  { time: "2-4 PM", count: 600 },
  { time: "4-6 PM", count: 1500 },
  { time: "6-8 PM", count: 1100 },
];

const capacityUtil = [
  { name: "Utilized", value: 78 },
  { name: "Available", value: 22 },
];

const COLORS = ["hsl(16, 85%, 23%)", "hsl(0, 0%, 90%)"];

const Reports = () => {
  const [filterType, setFilterType] = useState("all");
  const [filterPeriod, setFilterPeriod] = useState("month");

  const totalRevenue = revenueByStructure.reduce((a, r) => a + r.revenue, 0);
  const totalBookings = revenueByStructure.reduce((a, r) => a + r.bookings, 0);

  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Reports</h1>
            <p className="text-muted-foreground">Operational and financial insights</p>
          </div>
          <div className="flex gap-2">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[140px] bg-background"><SelectValue /></SelectTrigger>
              <SelectContent className="bg-popover"><SelectItem value="all">All Types</SelectItem><SelectItem value="Ritual">Ritual</SelectItem><SelectItem value="Darshan">Darshan</SelectItem></SelectContent>
            </Select>
            <Select value={filterPeriod} onValueChange={setFilterPeriod}>
              <SelectTrigger className="w-[130px] bg-background"><SelectValue /></SelectTrigger>
              <SelectContent className="bg-popover"><SelectItem value="week">This Week</SelectItem><SelectItem value="month">This Month</SelectItem><SelectItem value="quarter">Quarter</SelectItem><SelectItem value="year">This Year</SelectItem></SelectContent>
            </Select>
          </div>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total Revenue", value: `₹${totalRevenue.toLocaleString()}`, icon: IndianRupee, color: "text-emerald-600" },
            { label: "Total Bookings", value: totalBookings.toLocaleString(), icon: TrendingUp, color: "text-primary" },
            { label: "Avg Occupancy", value: "78%", icon: Users, color: "text-blue-600" },
            { label: "Peak Hour", value: "8–10 AM", icon: Clock, color: "text-amber-600" },
          ].map((kpi, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">{kpi.label}</p>
                    <p className="text-2xl font-bold mt-1">{kpi.value}</p>
                  </div>
                  <kpi.icon className={`h-8 w-8 ${kpi.color} opacity-60`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Revenue by Structure */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Landmark className="h-4 w-4 text-primary" />Revenue by Structure
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={revenueByStructure}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 90%)" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="hsl(16, 85%, 23%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Darshan Load */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-600" />Darshan Load by Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={darshanLoad}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 90%)" />
                  <XAxis dataKey="time" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="hsl(217, 91%, 60%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Ritual Performance */}
          <Card className="lg:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-primary" />Ritual Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ritual</TableHead>
                    <TableHead className="text-center">Bookings</TableHead>
                    <TableHead className="text-right">Revenue</TableHead>
                    <TableHead className="text-center">Avg Occupancy</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ritualPerformance.map(r => (
                    <TableRow key={r.name}>
                      <TableCell className="font-medium">{r.name}</TableCell>
                      <TableCell className="text-center">{r.bookings}</TableCell>
                      <TableCell className="text-right">₹{r.revenue.toLocaleString()}</TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full" style={{ width: `${r.avgOccupancy}%` }} />
                          </div>
                          <span className="text-sm">{r.avgOccupancy}%</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Capacity Utilization */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Capacity Utilization</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={capacityUtil} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" label={({ name, value }) => `${name}: ${value}%`}>
                    {capacityUtil.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-4 mt-2">
                {capacityUtil.map((c, i) => (
                  <div key={c.name} className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                    <span className="text-xs text-muted-foreground">{c.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default Reports;
