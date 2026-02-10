// ==========================================
// EVENT MANAGEMENT MODULE - ENHANCED DATA LAYER
// Central coordination hub for all temple events
// ==========================================

import { eventRefs, eventMaterialAllocations, eventFreelancerAllocations, eventVolunteerAllocations, eventSecurityData, kitchenBatches, inventoryItems, freelancerRefs, templeStructures as structures } from "./templeData";
import { templeTasks } from "./taskData";

export { eventRefs, eventMaterialAllocations, eventFreelancerAllocations, eventVolunteerAllocations, eventSecurityData, kitchenBatches, inventoryItems, freelancerRefs, structures };

// Re-export temple tasks filtered for events
export const getEventTasks = (eventId: string) => templeTasks.filter(t => t.eventId === eventId);

// ---- ENHANCED EVENT ENTITY ----
export interface TempleEvent {
  id: string;
  name: string;
  type: "Festival" | "Annadanam" | "Cultural" | "VIP" | "Public" | "Special Ritual";
  templeId: string;
  structureId: string;
  structureName: string;
  startDate: string;
  endDate: string;
  estimatedBudget: number;
  actualSpend: number;
  estimatedFootfall: string;
  description: string;
  status: "Planning" | "Scheduled" | "In Progress" | "Completed" | "Archived";
  createdBy: string;
  createdAt: string;
}

export const templeEvents: TempleEvent[] = [
  {
    id: "EVT-001", name: "Brahmotsavam 2026", type: "Festival", templeId: "TMP-001", structureId: "STR-001", structureName: "Main Temple",
    startDate: "2026-03-15", endDate: "2026-03-24", estimatedBudget: 5000000, actualSpend: 0, estimatedFootfall: "75,000",
    description: "10-day annual Brahmotsavam celebration with all major rituals, processions, and cultural programs.",
    status: "Planning", createdBy: "Temple Admin", createdAt: "2026-01-15",
  },
  {
    id: "EVT-002", name: "Vaikuntha Ekadasi", type: "Special Ritual", templeId: "TMP-001", structureId: "STR-001", structureName: "Main Temple",
    startDate: "2026-01-10", endDate: "2026-01-10", estimatedBudget: 800000, actualSpend: 785000, estimatedFootfall: "1,00,000",
    description: "Vaikuntha Dwara Darshanam – one of the most sacred days of the year.",
    status: "Completed", createdBy: "Temple Admin", createdAt: "2025-12-01",
  },
  {
    id: "EVT-003", name: "Ugadi Festival", type: "Festival", templeId: "TMP-001", structureId: "STR-001", structureName: "Main Temple",
    startDate: "2026-03-28", endDate: "2026-03-30", estimatedBudget: 1200000, actualSpend: 0, estimatedFootfall: "50,000",
    description: "Telugu New Year celebrations with special puja, cultural events, and prasadam distribution.",
    status: "Planning", createdBy: "Temple Admin", createdAt: "2026-02-01",
  },
  {
    id: "EVT-004", name: "Maha Shivaratri", type: "Special Ritual", templeId: "TMP-001", structureId: "STR-001", structureName: "Main Temple",
    startDate: "2026-02-15", endDate: "2026-02-15", estimatedBudget: 2500000, actualSpend: 1150000, estimatedFootfall: "80,000",
    description: "Night-long Shiva worship with Rudra Abhishekam, Maha Nyasa Purva, and all-night darshan.",
    status: "Scheduled", createdBy: "Temple Admin", createdAt: "2026-01-20",
  },
  {
    id: "EVT-005", name: "Ratha Yatra", type: "Festival", templeId: "TMP-001", structureId: "STR-001", structureName: "Main Temple",
    startDate: "2026-04-10", endDate: "2026-04-10", estimatedBudget: 1500000, actualSpend: 0, estimatedFootfall: "60,000",
    description: "Grand chariot procession through the temple complex and surrounding streets.",
    status: "Planning", createdBy: "Temple Admin", createdAt: "2026-02-05",
  },
  {
    id: "EVT-006", name: "Annual Annadanam Drive", type: "Annadanam", templeId: "TMP-001", structureId: "STR-005", structureName: "Annadanam Hall",
    startDate: "2026-04-01", endDate: "2026-04-03", estimatedBudget: 600000, actualSpend: 0, estimatedFootfall: "50,000",
    description: "3-day mass feeding program serving 50,000+ devotees.",
    status: "Planning", createdBy: "Temple Admin", createdAt: "2026-02-08",
  },
  {
    id: "EVT-007", name: "Classical Music Festival", type: "Cultural", templeId: "TMP-001", structureId: "STR-006", structureName: "Cultural Hall",
    startDate: "2026-05-01", endDate: "2026-05-03", estimatedBudget: 300000, actualSpend: 0, estimatedFootfall: "5,000",
    description: "3-evening Carnatic music festival featuring renowned artists.",
    status: "Planning", createdBy: "Temple Admin", createdAt: "2026-02-10",
  },
  {
    id: "EVT-008", name: "New Year Special Abhishekam", type: "Special Ritual", templeId: "TMP-001", structureId: "STR-001", structureName: "Main Temple",
    startDate: "2026-01-01", endDate: "2026-01-01", estimatedBudget: 200000, actualSpend: 195000, estimatedFootfall: "30,000",
    description: "New Year sunrise special Abhishekam with prasadam distribution.",
    status: "Archived", createdBy: "Temple Admin", createdAt: "2025-12-15",
  },
];

// ---- EVENT SEVA ATTACHMENTS ----
export interface EventSeva {
  id: string;
  eventId: string;
  sevaName: string;
  sevaType: "Ritual" | "Darshan" | "Special";
  date: string;
  time: string;
  capacity: number;
  bookingRequired: boolean;
  priest: string;
  status: "Confirmed" | "Pending" | "Cancelled";
  conflict: boolean;
}

export const eventSevas: EventSeva[] = [
  { id: "ES-001", eventId: "EVT-004", sevaName: "Maha Rudra Abhishekam", sevaType: "Ritual", date: "2026-02-15", time: "04:00 AM", capacity: 200, bookingRequired: true, priest: "Sri Ramachandra Sharma", status: "Confirmed", conflict: false },
  { id: "ES-002", eventId: "EVT-004", sevaName: "Sahasranama Archana", sevaType: "Ritual", date: "2026-02-15", time: "06:00 AM", capacity: 300, bookingRequired: true, priest: "Sri Venkateshwara Dikshitar", status: "Confirmed", conflict: false },
  { id: "ES-003", eventId: "EVT-004", sevaName: "Special Night Darshan", sevaType: "Darshan", date: "2026-02-15", time: "08:00 PM", capacity: 5000, bookingRequired: true, priest: "N/A", status: "Confirmed", conflict: false },
  { id: "ES-004", eventId: "EVT-004", sevaName: "Extended Morning Darshan", sevaType: "Darshan", date: "2026-02-15", time: "05:00 AM", capacity: 8000, bookingRequired: false, priest: "N/A", status: "Pending", conflict: true },
  { id: "ES-005", eventId: "EVT-001", sevaName: "Suprabhatam", sevaType: "Ritual", date: "2026-03-15", time: "05:00 AM", capacity: 500, bookingRequired: true, priest: "Sri Gopala Bhatta", status: "Pending", conflict: false },
  { id: "ES-006", eventId: "EVT-001", sevaName: "Kalyanotsavam", sevaType: "Special", date: "2026-03-18", time: "09:00 AM", capacity: 1000, bookingRequired: true, priest: "Sri Ramachandra Sharma", status: "Pending", conflict: false },
];

// ---- EVENT EXPENSES ----
export interface EventExpense {
  id: string;
  eventId: string;
  eventName: string;
  category: "Freelancer Payment" | "Material Cost" | "Kitchen Cost" | "Miscellaneous" | "Decoration" | "Sound & Lighting" | "Transportation" | "Donations Refund";
  description: string;
  amount: number;
  vendor: string;
  date: string;
  status: "Paid" | "Pending" | "Approved" | "Rejected";
  linkedModule?: string;
  linkedId?: string;
}

export const eventExpenses: EventExpense[] = [
  { id: "EXP-001", eventId: "EVT-004", eventName: "Maha Shivaratri", category: "Freelancer Payment", description: "Event Photography & Videography", amount: 25000, vendor: "Pixel Studio", date: "2026-02-15", status: "Approved", linkedModule: "Freelancer", linkedId: "FRL-0001" },
  { id: "EXP-002", eventId: "EVT-004", eventName: "Maha Shivaratri", category: "Sound & Lighting", description: "PA System & Live Stream Setup", amount: 18000, vendor: "Sound Waves Pro", date: "2026-02-15", status: "Approved", linkedModule: "Freelancer", linkedId: "FRL-0003" },
  { id: "EXP-003", eventId: "EVT-004", eventName: "Maha Shivaratri", category: "Decoration", description: "Festival Decoration & Mandap", amount: 45000, vendor: "Decor Dreams", date: "2026-02-14", status: "Pending", linkedModule: "Freelancer", linkedId: "FRL-0002" },
  { id: "EXP-004", eventId: "EVT-004", eventName: "Maha Shivaratri", category: "Sound & Lighting", description: "Festival Lighting Setup", amount: 28000, vendor: "Heritage Electricals", date: "2026-02-14", status: "Pending", linkedModule: "Freelancer", linkedId: "FRL-0007" },
  { id: "EXP-005", eventId: "EVT-004", eventName: "Maha Shivaratri", category: "Material Cost", description: "Flowers & Garlands – 500 pcs Jasmine + 50kg Rose", amount: 52500, vendor: "Sri Lakshmi Flowers", date: "2026-02-13", status: "Paid", linkedModule: "Inventory", linkedId: "REQ-001" },
  { id: "EXP-006", eventId: "EVT-004", eventName: "Maha Shivaratri", category: "Material Cost", description: "Ghee – 200L procurement", amount: 120000, vendor: "Nandi Oil & Ghee", date: "2026-02-12", status: "Paid", linkedModule: "Inventory", linkedId: "PO-2026-010" },
  { id: "EXP-007", eventId: "EVT-004", eventName: "Maha Shivaratri", category: "Kitchen Cost", description: "Annadanam Ingredients – 10,000 meals", amount: 180000, vendor: "Multiple Suppliers", date: "2026-02-14", status: "Approved", linkedModule: "Kitchen", linkedId: "BTH-2026-0888" },
  { id: "EXP-008", eventId: "EVT-004", eventName: "Maha Shivaratri", category: "Miscellaneous", description: "Police coordination & barricade rental", amount: 35000, vendor: "Local Authority", date: "2026-02-13", status: "Paid" },
  { id: "EXP-009", eventId: "EVT-004", eventName: "Maha Shivaratri", category: "Transportation", description: "Volunteer bus transport", amount: 15000, vendor: "City Bus Services", date: "2026-02-15", status: "Pending" },
  { id: "EXP-010", eventId: "EVT-002", eventName: "Vaikuntha Ekadasi", category: "Freelancer Payment", description: "Photography coverage", amount: 20000, vendor: "Pixel Studio", date: "2026-01-10", status: "Paid" },
  { id: "EXP-011", eventId: "EVT-002", eventName: "Vaikuntha Ekadasi", category: "Material Cost", description: "Pooja materials bulk order", amount: 85000, vendor: "Shiva Pooja Stores", date: "2026-01-08", status: "Paid" },
  { id: "EXP-012", eventId: "EVT-002", eventName: "Vaikuntha Ekadasi", category: "Kitchen Cost", description: "Prasadam & Annadanam", amount: 350000, vendor: "Multiple", date: "2026-01-10", status: "Paid" },
  { id: "EXP-013", eventId: "EVT-002", eventName: "Vaikuntha Ekadasi", category: "Decoration", description: "Temple decoration", amount: 120000, vendor: "Decor Dreams", date: "2026-01-09", status: "Paid" },
  { id: "EXP-014", eventId: "EVT-002", eventName: "Vaikuntha Ekadasi", category: "Miscellaneous", description: "Security & logistics", amount: 45000, vendor: "Various", date: "2026-01-10", status: "Paid" },
];

// ---- EVENT KITCHEN LINKS ----
export interface EventKitchenLink {
  id: string;
  eventId: string;
  estimatedBeneficiaries: number;
  menu: string;
  annadanamId?: string;
  linkedBatchIds: string[];
  ingredientRequestStatus: "Pending" | "Raised" | "Fulfilled";
}

export const eventKitchenLinks: EventKitchenLink[] = [
  {
    id: "EKL-001", eventId: "EVT-004", estimatedBeneficiaries: 80000, menu: "Laddu Prasadam, Pulihora, Annadanam Meals (10,000/day)",
    annadanamId: "ANN-004", linkedBatchIds: ["BTH-2026-0888"], ingredientRequestStatus: "Raised",
  },
  {
    id: "EKL-002", eventId: "EVT-001", estimatedBeneficiaries: 500000, menu: "Full Prasadam Set + Annadanam (50,000/day for 10 days)",
    annadanamId: "ANN-001", linkedBatchIds: [], ingredientRequestStatus: "Pending",
  },
];

// ---- EVENT TEMPLATES ----
export interface EventTemplate {
  id: string;
  name: string;
  type: TempleEvent["type"];
  description: string;
  defaultDuration: number;
  estimatedBudget: number;
  defaultSevas: string[];
  defaultRoles: string[];
  defaultMaterials: string[];
  usageCount: number;
}

export const eventTemplates: EventTemplate[] = [
  {
    id: "TPL-001", name: "Major Festival Template", type: "Festival", description: "Complete festival setup with all departments — 7-10 day duration",
    defaultDuration: 10, estimatedBudget: 5000000,
    defaultSevas: ["Suprabhatam", "Abhishekam", "Kalyanotsavam", "Special Darshan"],
    defaultRoles: ["Photography", "Decoration", "Sound System", "Lighting"],
    defaultMaterials: ["Rose Petals", "Jasmine Garlands", "Camphor", "Ghee"],
    usageCount: 3,
  },
  {
    id: "TPL-002", name: "Single Day Special Ritual", type: "Special Ritual", description: "One-day ritual event with extended darshan and prasadam",
    defaultDuration: 1, estimatedBudget: 800000,
    defaultSevas: ["Abhishekam", "Special Darshan"],
    defaultRoles: ["Photography", "Sound System"],
    defaultMaterials: ["Camphor", "Kumkum", "Coconut", "Milk"],
    usageCount: 5,
  },
  {
    id: "TPL-003", name: "Annadanam Drive", type: "Annadanam", description: "Mass feeding program with kitchen batch planning",
    defaultDuration: 3, estimatedBudget: 600000,
    defaultSevas: [],
    defaultRoles: ["Kitchen Assistants", "Crowd Control"],
    defaultMaterials: ["Rice", "Toor Dal", "Ghee", "Sesame Oil"],
    usageCount: 4,
  },
  {
    id: "TPL-004", name: "Cultural Event", type: "Cultural", description: "Music/dance festival in Cultural Hall",
    defaultDuration: 3, estimatedBudget: 300000,
    defaultSevas: [],
    defaultRoles: ["Sound System", "Lighting", "Photography"],
    defaultMaterials: [],
    usageCount: 2,
  },
];

// ---- DROPDOWN OPTIONS ----
export const eventTypes: TempleEvent["type"][] = ["Festival", "Annadanam", "Cultural", "VIP", "Public", "Special Ritual"];
export const eventStatuses: TempleEvent["status"][] = ["Planning", "Scheduled", "In Progress", "Completed", "Archived"];
export const expenseCategories: EventExpense["category"][] = ["Freelancer Payment", "Material Cost", "Kitchen Cost", "Miscellaneous", "Decoration", "Sound & Lighting", "Transportation", "Donations Refund"];

// ---- HELPER FUNCTIONS ----
export const getEventById = (id: string) => templeEvents.find(e => e.id === id);
export const getEventExpenses = (eventId: string) => eventExpenses.filter(e => e.eventId === eventId);
export const getEventSevas = (eventId: string) => eventSevas.filter(s => s.eventId === eventId);
export const getEventMaterials = (eventId: string) => eventMaterialAllocations.filter(m => m.eventId === eventId);
export const getEventFreelancers = (eventId: string) => eventFreelancerAllocations.filter(f => f.eventId === eventId);
export const getEventVolunteers = (eventId: string) => eventVolunteerAllocations.filter(v => v.eventId === eventId);
export const getEventKitchenLinks = (eventId: string) => eventKitchenLinks.filter(k => k.eventId === eventId);
export const getEventBatches = (eventId: string) => kitchenBatches.filter(b => b.eventId === eventId);
