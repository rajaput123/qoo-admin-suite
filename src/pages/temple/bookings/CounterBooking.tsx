import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Store, ChevronRight, Check, Printer, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import SearchableSelect from "@/components/SearchableSelect";
import CustomFieldsSection, { CustomField } from "@/components/CustomFieldsSection";

const offerings = [
  { id: "1", name: "Suprabhatam", type: "Ritual", structure: "Main Temple", time: "5:30 AM", price: 500, available: 12 },
  { id: "2", name: "Archana", type: "Ritual", structure: "Padmavathi Shrine", time: "7:00 AM", price: 100, available: 8 },
  { id: "3", name: "Abhishekam", type: "Ritual", structure: "Main Temple", time: "9:00 AM", price: 2000, available: 5 },
  { id: "4", name: "Morning Darshan", type: "Darshan", structure: "Main Temple", time: "6:00 AM – 10:00 AM", price: 0, available: 180 },
  { id: "5", name: "VIP Darshan", type: "Darshan", structure: "Main Temple", time: "8:00 AM – 10:00 AM", price: 300, available: 45 },
  { id: "6", name: "Sahasranama", type: "Ritual", structure: "Varadaraja Shrine", time: "11:00 AM", price: 1500, available: 28 },
];

const structureOptions = [
  { value: "all", label: "All Structures" },
  { value: "Main Temple", label: "Main Temple" },
  { value: "Padmavathi Shrine", label: "Padmavathi Shrine" },
  { value: "Varadaraja Shrine", label: "Varadaraja Shrine" },
];

const gothramOptions = [
  { value: "Bharadwaja", label: "Bharadwaja" },
  { value: "Kashyapa", label: "Kashyapa" },
  { value: "Vasishta", label: "Vasishta" },
  { value: "Atri", label: "Atri" },
  { value: "Gautama", label: "Gautama" },
  { value: "Vishwamitra", label: "Vishwamitra" },
  { value: "Jamadagni", label: "Jamadagni" },
];

const nakshatraOptions = [
  { value: "Ashwini", label: "Ashwini" }, { value: "Bharani", label: "Bharani" },
  { value: "Rohini", label: "Rohini" }, { value: "Mrigashira", label: "Mrigashira" },
  { value: "Pushya", label: "Pushya" }, { value: "Swati", label: "Swati" },
  { value: "Anuradha", label: "Anuradha" }, { value: "Hasta", label: "Hasta" },
  { value: "Uttara", label: "Uttara" },
];

const steps = ["Select Offering", "Select Slot", "Devotee Details", "Payment", "Confirm"];

type SlotOption = {
  id: string;
  dateLabel: string;
  dateIso: string;
  timeLabel: string;
  available: number;
};

function parse12hToMinutes(raw: string) {
  const m = raw.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!m) return null;
  let h = Number(m[1]);
  const min = Number(m[2]);
  const ampm = m[3].toUpperCase();
  if (!Number.isFinite(h) || !Number.isFinite(min)) return null;
  h = h % 12;
  if (ampm === "PM") h += 12;
  return h * 60 + min;
}

function minutesTo12hLabel(totalMinutes: number) {
  const h24 = Math.floor(totalMinutes / 60) % 24;
  const min = totalMinutes % 60;
  const ampm = h24 >= 12 ? "PM" : "AM";
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${String(min).padStart(2, "0")} ${ampm}`;
}

function getTodayIso(offsetDays = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}

function getDateLabel(offsetDays = 0) {
  if (offsetDays === 0) return "Today";
  if (offsetDays === 1) return "Tomorrow";
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toLocaleDateString("en-IN", { weekday: "short", day: "2-digit", month: "short" });
}

function buildSlotOptions(offering: (typeof offerings)[number]): SlotOption[] {
  const time = offering.time;

  if (time.includes("–") || time.includes("-")) {
    const parts = time.split("–").length > 1 ? time.split("–") : time.split("-");
    const startRaw = parts[0]?.trim() ?? "";
    const endRaw = parts[1]?.trim() ?? "";
    const startMin = parse12hToMinutes(startRaw);
    const endMin = parse12hToMinutes(endRaw);
    if (startMin != null && endMin != null && endMin > startMin) {
      const interval = 30;
      const times: number[] = [];
      for (let t = startMin; t <= endMin; t += interval) times.push(t);
      const count = times.length || 1;
      const base = Math.max(1, Math.floor(offering.available / count));
      let remainder = Math.max(0, offering.available - base * count);
      return times.map((t) => {
        const extra = remainder > 0 ? 1 : 0;
        remainder = Math.max(0, remainder - extra);
        const avail = base + extra;
        return {
          id: `${getTodayIso(0)}-${t}`,
          dateLabel: "Today",
          dateIso: getTodayIso(0),
          timeLabel: minutesTo12hLabel(t),
          available: avail,
        };
      });
    }
  }

  const fixed = parse12hToMinutes(time);
  const timeLabel = fixed != null ? minutesTo12hLabel(fixed) : time;
  return [0, 1, 2].map((offsetDays) => ({
    id: `${getTodayIso(offsetDays)}-${timeLabel}`,
    dateLabel: getDateLabel(offsetDays),
    dateIso: getTodayIso(offsetDays),
    timeLabel,
    available: offering.available,
  }));
}

const CounterBooking = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [filterStructure, setFilterStructure] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [selectedOffering, setSelectedOffering] = useState<typeof offerings[0] | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<SlotOption | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [devotee, setDevotee] = useState({ name: "", phone: "", email: "", gothram: "", nakshatra: "", sankalpam: "" });
  const [paymentMode, setPaymentMode] = useState("Cash");
  const [refNumber, setRefNumber] = useState("");
  const [customFields, setCustomFields] = useState<CustomField[]>([]);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [generatedId] = useState(`BK-${Date.now().toString().slice(-6)}`);

  const filteredOfferings = offerings.filter(o => {
    if (filterStructure !== "all" && o.structure !== filterStructure) return false;
    if (filterType !== "all" && o.type !== filterType) return false;
    return o.available > 0;
  });

  const handleConfirm = () => {
    setBookingComplete(true);
    toast.success("Counter booking created successfully!");
  };

  const handleReset = () => {
    setCurrentStep(0);
    setSelectedOffering(null);
    setSelectedSlot(null);
    setQuantity(1);
    setDevotee({ name: "", phone: "", email: "", gothram: "", nakshatra: "", sankalpam: "" });
    setPaymentMode("Cash");
    setRefNumber("");
    setCustomFields([]);
    setBookingComplete(false);
  };

  if (bookingComplete) {
    return (
      <div className="p-6">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-lg mx-auto">
          <Card>
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-emerald-600" />
              </div>
              <h2 className="text-xl font-bold mb-1">Booking Confirmed!</h2>
              <p className="text-muted-foreground mb-4">Booking created successfully.</p>
              <div className="text-left space-y-2 p-4 bg-muted/50 rounded-lg mb-6">
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Offering</span><span className="font-medium">{selectedOffering?.name}</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Structure</span><span className="font-medium">{selectedOffering?.structure}</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Devotee</span><span className="font-medium">{devotee.name}</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Quantity</span><span className="font-medium">{quantity}</span></div>
                <Separator />
                <div className="flex justify-between text-sm font-bold"><span>Total</span><span>₹{(selectedOffering?.price || 0) * quantity}</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Payment</span><span className="font-medium">{paymentMode}</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Source</span><Badge variant="secondary">Counter</Badge></div>
              </div>
              <div className="flex gap-2 justify-center">
                <Button variant="outline" className="gap-2"><Printer className="h-4 w-4" />Print Receipt</Button>
                <Button variant="outline" className="gap-2"><MessageSquare className="h-4 w-4" />SMS Confirmation</Button>
                <Button onClick={handleReset}>New Booking</Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight">Counter Booking</h1>
          <p className="text-muted-foreground">Book on behalf of devotees at the seva counter</p>
        </div>

        {/* Step Progress */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center gap-2 flex-shrink-0">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                i < currentStep ? "bg-primary text-primary-foreground" :
                i === currentStep ? "bg-primary text-primary-foreground ring-4 ring-primary/20" :
                "bg-muted text-muted-foreground"
              }`}>{i < currentStep ? <Check className="h-4 w-4" /> : i + 1}</div>
              <span className={`text-xs font-medium ${i <= currentStep ? "text-foreground" : "text-muted-foreground"}`}>{step}</span>
              {i < steps.length - 1 && <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />}
            </div>
          ))}
        </div>

        {/* Step 1 – Select Offering */}
        {currentStep === 0 && (
          <Card>
            <CardHeader><CardTitle className="text-base">Select Offering</CardTitle><CardDescription>Choose a ritual or darshan with available slots</CardDescription></CardHeader>
            <CardContent>
              <div className="flex gap-3 mb-4">
                <Select value={filterStructure} onValueChange={setFilterStructure}>
                  <SelectTrigger className="w-[160px] bg-background"><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-popover">{structureOptions.map(s => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}</SelectContent>
                </Select>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-[130px] bg-background"><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-popover"><SelectItem value="all">All Types</SelectItem><SelectItem value="Ritual">Ritual</SelectItem><SelectItem value="Darshan">Darshan</SelectItem></SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredOfferings.map(o => (
                  <button
                    key={o.id}
                    onClick={() => {
                      setSelectedOffering(o);
                      setSelectedSlot(null);
                      setQuantity(1);
                      setCurrentStep(1);
                    }}
                    className={`p-4 border rounded-lg text-left hover:border-primary hover:bg-muted/50 transition-all ${selectedOffering?.id === o.id ? "border-primary bg-primary/5" : ""}`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{o.name}</span>
                      <Badge variant={o.type === "Ritual" ? "default" : "secondary"}>{o.type}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{o.structure} · {o.time}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-semibold text-sm">{o.price > 0 ? `₹${o.price}` : "Free"}</span>
                      <span className="text-xs text-emerald-600 font-medium">{o.available} available</span>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2 – Select Slot */}
        {currentStep === 1 && selectedOffering && (
          <Card>
            <CardHeader><CardTitle className="text-base">Select Slot</CardTitle><CardDescription>{selectedOffering.name} · {selectedOffering.structure}</CardDescription></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {buildSlotOptions(selectedOffering).map((slot) => {
                  const isSelected = selectedSlot?.id === slot.id;
                  return (
                    <button
                      key={slot.id}
                      onClick={() => {
                        setSelectedSlot(slot);
                        setQuantity((q) => Math.min(q, slot.available));
                      }}
                      className={`p-3 border rounded-lg text-left transition-all hover:bg-muted/50 ${
                        isSelected ? "border-primary bg-primary/5 ring-2 ring-primary/20" : ""
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <p className="text-xs text-muted-foreground">{slot.dateLabel}</p>
                          <p className="font-semibold text-sm">{slot.timeLabel}</p>
                        </div>
                        <Badge variant="secondary" className="text-[10px]">{slot.available} left</Badge>
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-1">{slot.dateIso}</p>
                    </button>
                  );
                })}
              </div>
              <div>
                <Label>Quantity</Label>
                <Input
                  type="number"
                  min={1}
                  max={selectedSlot?.available ?? selectedOffering.available}
                  value={quantity}
                  onChange={e => setQuantity(Math.min(+e.target.value, selectedSlot?.available ?? selectedOffering.available))}
                  className="w-32"
                  disabled={!selectedSlot}
                />
                {!selectedSlot && <p className="text-xs text-muted-foreground mt-1">Select a slot to set quantity.</p>}
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setCurrentStep(0)}>Back</Button>
                <Button onClick={() => setCurrentStep(2)} disabled={!selectedSlot}>Continue</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3 – Devotee Details */}
        {currentStep === 2 && (
          <Card>
            <CardHeader><CardTitle className="text-base">Devotee Details</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Name</Label><Input value={devotee.name} onChange={e => setDevotee({ ...devotee, name: e.target.value })} placeholder="Devotee full name" /></div>
                <div><Label>Mobile Number</Label><Input value={devotee.phone} onChange={e => setDevotee({ ...devotee, phone: e.target.value })} placeholder="+91 XXXXX XXXXX" /></div>
              </div>
              <div><Label>Email (Optional)</Label><Input value={devotee.email} onChange={e => setDevotee({ ...devotee, email: e.target.value })} placeholder="email@example.com" /></div>
              {selectedOffering?.type === "Ritual" && (
                <>
                  <Separator />
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Ritual Details</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div><Label>Gothram</Label><SearchableSelect options={gothramOptions} value={devotee.gothram} onValueChange={v => setDevotee({ ...devotee, gothram: v })} placeholder="Select Gothram" /></div>
                    <div><Label>Nakshatra</Label><SearchableSelect options={nakshatraOptions} value={devotee.nakshatra} onValueChange={v => setDevotee({ ...devotee, nakshatra: v })} placeholder="Select Nakshatra" /></div>
                  </div>
                  <div><Label>Sankalpam</Label><Input value={devotee.sankalpam} onChange={e => setDevotee({ ...devotee, sankalpam: e.target.value })} placeholder="Enter sankalpam details" /></div>
                </>
              )}
              <Separator />
              <CustomFieldsSection fields={customFields} onFieldsChange={setCustomFields} />
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setCurrentStep(1)}>Back</Button>
                <Button onClick={() => setCurrentStep(3)}>Continue</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4 – Payment */}
        {currentStep === 3 && (
          <Card>
            <CardHeader><CardTitle className="text-base">Payment</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex justify-between mb-2"><span className="text-muted-foreground">Offering</span><span className="font-medium">{selectedOffering?.name}</span></div>
                <div className="flex justify-between mb-2"><span className="text-muted-foreground">Price</span><span>₹{selectedOffering?.price} × {quantity}</span></div>
                <Separator className="my-2" />
                <div className="flex justify-between font-bold text-lg"><span>Total</span><span>₹{(selectedOffering?.price || 0) * quantity}</span></div>
              </div>
              <div>
                <Label>Payment Mode</Label>
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {["Cash", "UPI", "Card", "Other"].map(mode => (
                    <button key={mode} onClick={() => setPaymentMode(mode)} className={`p-3 border rounded-lg text-center text-sm font-medium transition-all ${paymentMode === mode ? "border-primary bg-primary/5 text-primary" : "hover:bg-muted/50"}`}>{mode}</button>
                  ))}
                </div>
              </div>
              <div><Label>Reference Number</Label><Input value={refNumber} onChange={e => setRefNumber(e.target.value)} placeholder="Transaction / receipt reference" /></div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setCurrentStep(2)}>Back</Button>
                <Button onClick={() => setCurrentStep(4)}>Continue</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 5 – Confirm */}
        {currentStep === 4 && (
          <Card>
            <CardHeader><CardTitle className="text-base">Confirm Booking</CardTitle><CardDescription>Review all details before confirming</CardDescription></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 p-4 border rounded-lg">
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Offering</span><span className="font-medium">{selectedOffering?.name} ({selectedOffering?.type})</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Structure</span><span className="font-medium">{selectedOffering?.structure}</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Slot</span><span className="font-medium">{selectedSlot ? `${selectedSlot.dateLabel} · ${selectedSlot.timeLabel}` : (selectedOffering?.time ?? "—")}</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Quantity</span><span className="font-medium">{quantity}</span></div>
                <Separator />
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Devotee</span><span className="font-medium">{devotee.name}</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Phone</span><span className="font-medium">{devotee.phone}</span></div>
                {devotee.gothram && <div className="flex justify-between text-sm"><span className="text-muted-foreground">Gothram</span><span className="font-medium">{devotee.gothram}</span></div>}
                {devotee.nakshatra && <div className="flex justify-between text-sm"><span className="text-muted-foreground">Nakshatra</span><span className="font-medium">{devotee.nakshatra}</span></div>}
                <Separator />
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Payment</span><span className="font-medium">{paymentMode}</span></div>
                <div className="flex justify-between text-sm font-bold"><span>Total Amount</span><span>₹{(selectedOffering?.price || 0) * quantity}</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Source</span><Badge variant="secondary">Counter</Badge></div>
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setCurrentStep(3)}>Back</Button>
                <Button onClick={handleConfirm} className="gap-2"><Store className="h-4 w-4" />Confirm & Book</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  );
};

export default CounterBooking;
