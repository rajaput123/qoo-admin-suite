import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, TrendingUp, TrendingDown, DollarSign, Heart, Sparkles, Filter } from "lucide-react";
import { format } from "date-fns";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

// Mock data
const monthlyData = [
  { month: "Jan", income: 450000, expense: 320000, budget: 400000 },
  { month: "Feb", income: 520000, expense: 380000, budget: 400000 },
  { month: "Mar", income: 480000, expense: 350000, budget: 400000 },
  { month: "Apr", income: 610000, expense: 420000, budget: 500000 },
  { month: "May", income: 580000, expense: 410000, budget: 500000 },
  { month: "Jun", income: 650000, expense: 450000, budget: 500000 },
];

const budgetVsActual = [
  { category: "Donations", actual: 2800000, budget: 2500000 },
  { category: "Seva Income", actual: 1200000, budget: 1000000 },
  { category: "Daily Operations", actual: 2100000, budget: 2400000 },
  { category: "Event Expenses", actual: 1800000, budget: 2000000 },
];

const SimpleFinanceDashboard = () => {
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});
  const [selectedTemple, setSelectedTemple] = useState("all");
  const [eventFilter, setEventFilter] = useState("all");

  // Calculate totals
  const totalIncome = 4000000; // Donations + Seva
  const totalExpenses = 3900000; // Daily Operations + Events
  const netBalance = totalIncome - totalExpenses;
  const donationIncome = 2800000;
  const sevaIncome = 1200000;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Finance Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">Quick financial overview for temple management</p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Filter className="h-4 w-4" /> Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label className="text-xs">Date Range</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "LLL dd, y")} -{" "}
                          {format(dateRange.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(dateRange.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Select date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={new Date()}
                    selected={{ from: dateRange.from, to: dateRange.to }}
                    onSelect={(range) => setDateRange(range || {})}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label className="text-xs">Temple/Location</Label>
              <Select value={selectedTemple} onValueChange={setSelectedTemple}>
                <SelectTrigger className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Temples</SelectItem>
                  <SelectItem value="main">Main Temple</SelectItem>
                  <SelectItem value="branch1">Branch 1</SelectItem>
                  <SelectItem value="branch2">Branch 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs">Event or Non-event</Label>
              <Select value={eventFilter} onValueChange={setEventFilter}>
                <SelectTrigger className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="event">Event Only</SelectItem>
                  <SelectItem value="non-event">Non-event Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button variant="outline" className="w-full">Apply Filters</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <Badge variant="outline" className="text-xs">Income</Badge>
            </div>
            <p className="text-2xl font-bold">₹{totalIncome.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Total Income</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <TrendingDown className="h-5 w-5 text-red-600" />
              <Badge variant="outline" className="text-xs">Expense</Badge>
            </div>
            <p className="text-2xl font-bold">₹{totalExpenses.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Total Expenses</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className={`h-5 w-5 ${netBalance >= 0 ? "text-green-600" : "text-red-600"}`} />
              <Badge variant={netBalance >= 0 ? "default" : "destructive"} className="text-xs">
                {netBalance >= 0 ? "Profit" : "Loss"}
              </Badge>
            </div>
            <p className={`text-2xl font-bold ${netBalance >= 0 ? "text-green-600" : "text-red-600"}`}>
              ₹{Math.abs(netBalance).toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">Net Balance</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Heart className="h-5 w-5 text-blue-600" />
            </div>
            <p className="text-2xl font-bold">₹{donationIncome.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Donation Income</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Sparkles className="h-5 w-5 text-purple-600" />
            </div>
            <p className="text-2xl font-bold">₹{sevaIncome.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Seva Income</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Monthly Income vs Expense Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Monthly Income vs Expense Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value: number) => `₹${value.toLocaleString()}`} />
                <Legend />
                <Line type="monotone" dataKey="income" stroke="#22c55e" strokeWidth={2} name="Income" />
                <Line type="monotone" dataKey="expense" stroke="#ef4444" strokeWidth={2} name="Expense" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Budget vs Actual Comparison */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Budget vs Actual Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={budgetVsActual}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip formatter={(value: number) => `₹${value.toLocaleString()}`} />
                <Legend />
                <Bar dataKey="actual" fill="#3b82f6" name="Actual" />
                <Bar dataKey="budget" fill="#94a3b8" name="Budget" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SimpleFinanceDashboard;
