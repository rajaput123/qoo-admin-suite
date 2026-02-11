import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEvents } from "@/modules/events/hooks";

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const statusColors: Record<string, string> = {
  Draft: "bg-gray-100 text-gray-700",
  Scheduled: "bg-blue-100 text-blue-700",
  Ongoing: "bg-green-100 text-green-700",
  Completed: "bg-amber-100 text-amber-700",
  Cancelled: "bg-red-100 text-red-700",
  Archived: "bg-gray-200 text-gray-600",
};

const CalendarView = () => {
  const navigate = useNavigate();
  const events = useEvents();
  const [currentMonth, setCurrentMonth] = useState(1); // Feb 2026
  const [currentYear] = useState(2026);
  const [structureFilter, setStructureFilter] = useState("All Structures");
  const [eventTypeFilter, setEventTypeFilter] = useState("All Types");

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDay }, (_, i) => i);

  const getEventsForDay = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return events.filter(e => {
      if (dateStr < e.startDate || dateStr > e.endDate) return false;
      if (structureFilter !== "All Structures" && e.structureName !== structureFilter) return false;
      if (eventTypeFilter !== "All Types" && e.type !== eventTypeFilter) return false;
      if (e.status === "Archived" || e.status === "Cancelled") return false;
      return true;
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Calendar View</h1>
          <p className="text-sm text-muted-foreground mt-1">Visual event scheduling across months</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => setCurrentMonth(p => p > 0 ? p - 1 : 11)}><ChevronLeft className="h-4 w-4" /></Button>
          <h2 className="text-lg font-semibold min-w-[180px] text-center">{months[currentMonth]} {currentYear}</h2>
          <Button variant="outline" size="icon" onClick={() => setCurrentMonth(p => p < 11 ? p + 1 : 0)}><ChevronRight className="h-4 w-4" /></Button>
        </div>
        <div className="flex items-center gap-2">
          <Select value={structureFilter} onValueChange={setStructureFilter}>
            <SelectTrigger className="h-9 w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Structures">All Structures</SelectItem>
              <SelectItem value="Main Temple">Main Temple</SelectItem>
              <SelectItem value="Annadanam Hall">Annadanam Hall</SelectItem>
              <SelectItem value="Cultural Hall">Cultural Hall</SelectItem>
            </SelectContent>
          </Select>
          <Select value={eventTypeFilter} onValueChange={setEventTypeFilter}>
            <SelectTrigger className="h-9 w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Types">All Types</SelectItem>
              <SelectItem value="Festival">Festival</SelectItem>
              <SelectItem value="Special Ritual">Special Ritual</SelectItem>
              <SelectItem value="Annadanam">Annadanam</SelectItem>
              <SelectItem value="Cultural">Cultural</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <div className="grid grid-cols-7">
          {daysOfWeek.map(d => (
            <div key={d} className="p-2 text-center text-xs font-medium text-muted-foreground bg-muted border-b">{d}</div>
          ))}
          {blanks.map(i => (
            <div key={`blank-${i}`} className="min-h-[100px] border-b border-r bg-muted/20" />
          ))}
          {days.map(day => {
            const dayEvents = getEventsForDay(day);
            const isToday = currentMonth === 1 && day === 10;
            return (
              <div key={day} className={`min-h-[100px] border-b border-r p-1 ${isToday ? "bg-primary/5" : ""}`}>
                <p className={`text-xs font-medium mb-1 ${isToday ? "text-primary font-bold" : "text-muted-foreground"}`}>{day}</p>
                <div className="space-y-0.5">
                  {dayEvents.slice(0, 3).map(e => (
                    <button key={e.id} onClick={() => navigate(`/temple/events/${e.id}`)}
                      className={`w-full text-left text-[10px] px-1 py-0.5 rounded truncate ${statusColors[e.status]}`}>
                      {e.name}
                    </button>
                  ))}
                  {dayEvents.length > 3 && <p className="text-[10px] text-muted-foreground">+{dayEvents.length - 3} more</p>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <span className="font-medium">Legend:</span>
        {Object.entries(statusColors).map(([status, color]) => (
          <div key={status} className="flex items-center gap-1">
            <span className={`w-3 h-3 rounded ${color}`} />
            <span>{status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarView;
