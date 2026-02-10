import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Archive, Lock } from "lucide-react";
import { templeEvents, eventExpenses } from "@/data/eventData";

const EventArchive = () => {
  const navigate = useNavigate();
  const archived = templeEvents.filter(e => e.status === "Archived" || e.status === "Completed");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Event Archive</h1>
        <p className="text-sm text-muted-foreground mt-1">Completed and archived events — read-only</p>
      </div>

      <div className="border border-amber-200 bg-amber-50 rounded-lg p-3 flex items-center gap-2">
        <Lock className="h-4 w-4 text-amber-600" />
        <span className="text-sm text-amber-800">Archived events are read-only. No modifications allowed without admin override.</span>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event ID</TableHead>
                <TableHead>Event Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Structure</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead className="text-right">Budget</TableHead>
                <TableHead className="text-right">Actual Spend</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {archived.length === 0 ? (
                <TableRow><TableCell colSpan={9} className="text-center py-8 text-muted-foreground">No archived events</TableCell></TableRow>
              ) : archived.map(event => {
                const spend = eventExpenses.filter(e => e.eventId === event.id).reduce((a, e) => a + e.amount, 0);
                return (
                  <TableRow key={event.id}>
                    <TableCell className="font-mono text-xs">{event.id}</TableCell>
                    <TableCell className="font-medium">{event.name}</TableCell>
                    <TableCell><Badge variant="outline" className="text-xs">{event.type}</Badge></TableCell>
                    <TableCell className="text-sm">{event.structureName}</TableCell>
                    <TableCell className="text-sm">{event.startDate}{event.startDate !== event.endDate ? ` → ${event.endDate}` : ""}</TableCell>
                    <TableCell className="text-right text-sm">₹{(event.estimatedBudget / 100000).toFixed(1)}L</TableCell>
                    <TableCell className="text-right text-sm">₹{(spend / 100000).toFixed(1)}L</TableCell>
                    <TableCell>
                      <Badge className={`text-xs border-0 ${event.status === "Archived" ? "bg-gray-200 text-gray-600" : "bg-amber-100 text-amber-700"}`}>
                        {event.status === "Archived" && <Archive className="h-3 w-3 mr-1" />}
                        {event.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => navigate(`/temple/events/${event.id}`)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventArchive;
