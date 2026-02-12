import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, CalendarDays, IndianRupee, TrendingUp, AlertCircle } from "lucide-react";
import { useEvents } from "@/modules/events/hooks";
import { eventTypes as allEventTypes, eventStatuses } from "@/data/eventData";

const statusColors: Record<string, string> = {
  Draft: "bg-gray-100 text-gray-700 border-gray-200",
  Scheduled: "bg-blue-100 text-blue-700 border-blue-200",
  Published: "bg-green-100 text-green-700 border-green-200",
  Ongoing: "bg-amber-100 text-amber-700 border-amber-200",
  Completed: "bg-purple-100 text-purple-700 border-purple-200",
  Cancelled: "bg-red-100 text-red-700 border-red-200",
  Archived: "bg-gray-200 text-gray-600 border-gray-300",
};

const AllEvents = () => {
  const navigate = useNavigate();
  const events = useEvents();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Filter events (exclude archived)
  const filtered = events.filter((e) => {
    if (e.status === "Archived") return false;
    if (search && !e.name.toLowerCase().includes(search.toLowerCase()) && !e.id.toLowerCase().includes(search.toLowerCase())) return false;
    if (typeFilter !== "all" && e.type !== typeFilter) return false;
    if (statusFilter !== "all" && e.status !== statusFilter) return false;
    return true;
  });

  // Calculate stats
  const totalEvents = events.filter((e) => e.status !== "Archived").length;
  const ongoingCount = events.filter((e) => e.status === "Ongoing").length;
  const scheduledCount = events.filter((e) => e.status === "Scheduled" || e.status === "Published").length;
  const totalBudget = events.reduce((sum, e) => sum + e.estimatedBudget, 0);

  const kpis = [
    { label: "Total Events", value: totalEvents.toString(), icon: CalendarDays, description: "Active events this year" },
    { label: "Ongoing", value: ongoingCount.toString(), icon: TrendingUp, description: "Currently active" },
    { label: "Scheduled", value: scheduledCount.toString(), icon: AlertCircle, description: "Upcoming events" },
    { label: "Total Budget", value: `₹${(totalBudget / 100000).toFixed(1)}L`, icon: IndianRupee, description: "All events combined" },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">All Events</h1>
          <p className="text-muted-foreground text-sm">{totalEvents} active events — {events.filter((e) => e.status === "Archived").length} archived</p>
        </div>
        <Button onClick={() => navigate("/temple/events/create")}>
          <Plus className="h-4 w-4 mr-1.5" />
          Create Event
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
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

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search events..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9" />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[180px] h-9 bg-background">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            <SelectItem value="all">All Types</SelectItem>
            {allEventTypes.map((t) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px] h-9 bg-background">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            <SelectItem value="all">All Status</SelectItem>
            {eventStatuses.filter((s) => s !== "Archived").map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Events Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Dates</TableHead>
              <TableHead>Footfall</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                  No events found
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((event) => (
                <TableRow key={event.id} className="cursor-pointer hover:bg-muted/50" onClick={() => navigate(`/temple/events/${event.id}`)}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{event.name}</p>
                      <p className="text-xs text-muted-foreground">{event.id}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-[10px]">
                      {event.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{event.structureName}</TableCell>
                  <TableCell className="text-sm">
                    <div>
                      <p>{event.startDate}</p>
                      {event.startDate !== event.endDate && <p className="text-xs text-muted-foreground">to {event.endDate}</p>}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{event.estimatedFootfall}</TableCell>
                  <TableCell className="text-sm">
                    <div>
                      <p className="font-medium">₹{(event.estimatedBudget / 1000).toFixed(0)}K</p>
                      {event.actualSpend > 0 && <p className="text-xs text-muted-foreground">Spent: ₹{(event.actualSpend / 1000).toFixed(0)}K</p>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`text-[10px] ${statusColors[event.status]}`}>
                      {event.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>
          Showing {filtered.length} of {totalEvents} events
        </span>
      </div>
    </motion.div>
  );
};

export default AllEvents;
