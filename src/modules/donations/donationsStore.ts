import { DonationsState, Donor, Donation, Allocation, Certificate80G, DonationAuditEntry, DonationChannel } from "./types";

const LS_KEY = "qoo.donations.v1";

function nowIso() {
  return new Date().toISOString();
}

function isoDate(d = new Date()) {
  return d.toISOString().slice(0, 10);
}

function displayTime(d = new Date()) {
  return d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
}

function displayTimestamp(d = new Date()) {
  return `${isoDate(d)} ${d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}`;
}

function safeJsonParse<T>(raw: string | null): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function getMaxNumericSuffix(values: string[], prefix: string) {
  let max = 0;
  for (const v of values) {
    if (!v.startsWith(prefix)) continue;
    const n = Number(v.slice(prefix.length));
    if (Number.isFinite(n)) max = Math.max(max, n);
  }
  return max;
}

function nextDonorId(state: DonationsState) {
  // DNR-001 style
  const nums = state.donors
    .map(d => d.donorId)
    .filter(id => id.startsWith("DNR-"))
    .map(id => Number(id.replace("DNR-", "")))
    .filter(n => Number.isFinite(n));
  const next = (nums.length ? Math.max(...nums) : 0) + 1;
  return `DNR-${String(next).padStart(3, "0")}`;
}

function nextDonationPair(state: DonationsState, year: number) {
  // DON-YYYY-NNNN and REC-YYYY-NNNN
  const prefix = `DON-${year}-`;
  const existing = state.donations.map(d => d.donationId).filter(id => id.startsWith(prefix));
  const max = getMaxNumericSuffix(existing, prefix);
  const next = max + 1;
  const suffix = String(next).padStart(4, "0");
  return {
    donationId: `DON-${year}-${suffix}`,
    receiptNo: `REC-${year}-${suffix}`,
  };
}

function nextAuditId(state: DonationsState) {
  const prefix = "AUD-";
  const existing = state.audit.map(a => a.id);
  const max = getMaxNumericSuffix(existing, prefix);
  return `AUD-${String(max + 1).padStart(3, "0")}`;
}

function next80GId(state: DonationsState, year: number) {
  const prefix = `80G-${year}-`;
  const existing = state.certificates80G.map(c => c.certificateId).filter(id => id.startsWith(prefix));
  const max = getMaxNumericSuffix(existing, prefix);
  return `80G-${year}-${String(max + 1).padStart(4, "0")}`;
}

function seedState(): DonationsState {
  const createdAt = nowIso();

  const donors: Donor[] = [
    { donorId: "DNR-001", name: "Sri Ramesh Agarwal", phone: "+91 98765 43210", email: "ramesh@email.com", city: "Hyderabad", pan: "ABCPA1234R", category: "Patron", eligible80G: true, createdAt },
    { donorId: "DNR-002", name: "Smt. Padma Foundation", phone: "+91 87654 32109", email: "info@padma.org", city: "Chennai", pan: "AAATA5678B", category: "Trust", eligible80G: true, createdAt },
    { donorId: "DNR-003", name: "Sri Venkatesh Trust", phone: "+91 76543 21098", email: "trust@venkatesh.org", city: "Tirupati", pan: "BBBTV9012C", category: "Trust", eligible80G: true, createdAt },
    { donorId: "DNR-004", name: "Karthik Reddy", phone: "+91 65432 10987", email: "karthik@email.com", city: "Bangalore", pan: "CCCPK3456D", category: "Regular", eligible80G: true, createdAt },
    { donorId: "DNR-005", name: "Village Dev Committee", phone: "+91 54321 09876", email: "-", city: "Anantapur", pan: "DDDPV7890E", category: "Organization", eligible80G: false, createdAt },
    { donorId: "DNR-006", name: "Anonymous Devotee", phone: "-", email: "-", city: "-", pan: "-", category: "Anonymous", eligible80G: false, createdAt },
    { donorId: "DNR-007", name: "Lakshmi Narasimha Bhakta Mandali", phone: "+91 43210 98765", email: "lnbm@email.com", city: "Vijayawada", pan: "EEEPN1234F", category: "Patron", eligible80G: true, createdAt },
  ];

  const donations: Donation[] = [
    { donationId: "DON-2025-0891", receiptNo: "REC-2025-0891", donorId: "DNR-001", donorName: "Sri Ramesh Agarwal", amount: 500000, purpose: "Project-linked", channel: "Bank Transfer", mode: "NEFT", date: "2025-02-10", time: "10:30 AM", status: "Recorded", createdAt },
    { donationId: "DON-2025-0890", receiptNo: "REC-2025-0890", donorId: "DNR-006", donorName: "Anonymous Devotee", amount: 25000, purpose: "General / Hundi", channel: "Cash", mode: "Cash", date: "2025-02-10", time: "09:15 AM", status: "Recorded", createdAt },
    { donationId: "DON-2025-0889", receiptNo: "REC-2025-0889", donorId: "DNR-004", donorName: "Karthik Reddy", amount: 100000, purpose: "Annadanam Sponsorship", channel: "UPI", mode: "GPay", date: "2025-02-09", time: "04:45 PM", status: "Recorded", createdAt },
    { donationId: "DON-2025-0888", receiptNo: "REC-2025-0888", donorId: "DNR-003", donorName: "Sri Venkatesh Trust", amount: 1000000, purpose: "Project-linked", channel: "Bank Transfer", mode: "RTGS", date: "2025-02-09", time: "11:00 AM", status: "Recorded", createdAt },
    { donationId: "DON-2025-0887", receiptNo: "REC-2025-0887", donorId: "DNR-004", donorName: "Karthik Reddy", amount: 15000, purpose: "Prasadam Sponsorship", channel: "Online", mode: "Razorpay", date: "2025-02-08", time: "06:20 PM", status: "Recorded", createdAt },
  ];

  const allocations: Allocation[] = [
    { donationId: "DON-2025-0891", purpose: "Project-linked", linkedTo: "Gopuram Renovation", linkedType: "Project", allocated: 500000, utilized: 410000 },
    { donationId: "DON-2025-0889", purpose: "Annadanam", linkedTo: "Daily Annadanam", linkedType: "Kitchen", allocated: 100000, utilized: 100000 },
    { donationId: "DON-2025-0888", purpose: "Project-linked", linkedTo: "New Hall Construction", linkedType: "Project", allocated: 1000000, utilized: 280000 },
    { donationId: "DON-2025-0887", purpose: "Prasadam Sponsorship", linkedTo: "Laddu Prasadam - Vaikunta Ekadashi", linkedType: "Prasadam", allocated: 15000, utilized: 15000 },
  ];

  const certificates80G: Certificate80G[] = [
    { certificateId: "80G-2025-0045", donorId: "DNR-001", donorName: "Sri Ramesh Agarwal", pan: "ABCPA1234R", fy: "2024-25", receiptNos: Array.from({ length: 8 }, (_, i) => `REC-2025-${String(800 + i).padStart(4, "0")}`), totalAmount: 2500000, status: "Generated", generatedDate: "2025-02-01", createdAt },
    { certificateId: "80G-2025-0044", donorId: "DNR-002", donorName: "Smt. Padma Foundation", pan: "AAATA5678B", fy: "2024-25", receiptNos: Array.from({ length: 3 }, (_, i) => `REC-2025-${String(700 + i).padStart(4, "0")}`), totalAmount: 10000000, status: "Generated", generatedDate: "2025-01-28", createdAt },
    { certificateId: "80G-2025-0043", donorId: "DNR-003", donorName: "Sri Venkatesh Trust", pan: "BBBTV9012C", fy: "2024-25", receiptNos: Array.from({ length: 12 }, (_, i) => `REC-2025-${String(600 + i).padStart(4, "0")}`), totalAmount: 5000000, status: "Pending", generatedDate: "-", createdAt },
    { certificateId: "80G-2025-0042", donorId: "DNR-004", donorName: "Karthik Reddy", pan: "CCCPK3456D", fy: "2024-25", receiptNos: Array.from({ length: 5 }, (_, i) => `REC-2025-${String(500 + i).padStart(4, "0")}`), totalAmount: 350000, status: "Generated", generatedDate: "2025-01-15", createdAt },
  ];

  const audit: DonationAuditEntry[] = [
    { id: "AUD-001", action: "Donation Recorded", entity: "DON-2025-0891", user: "System", timestamp: "2025-02-10 10:30", details: "₹5L from Sri Ramesh Agarwal via Bank Transfer" },
    { id: "AUD-002", action: "Fund Allocated", entity: "DON-2025-0891", user: "System", timestamp: "2025-02-10 10:35", details: "Allocated to Gopuram Renovation project" },
    { id: "AUD-003", action: "Receipt Generated", entity: "REC-2025-0891", user: "System", timestamp: "2025-02-10 10:30", details: "Auto-generated receipt for DON-2025-0891" },
  ];

  return { donors, donations, allocations, certificates80G, audit };
}

let stateCache: DonationsState | null = null;
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

function persist() {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(stateCache));
  } catch {
    // ignore
  }
}

export function getDonationsState(): DonationsState {
  if (stateCache) return stateCache;
  const fromLS = safeJsonParse<DonationsState>(typeof window !== "undefined" ? localStorage.getItem(LS_KEY) : null);
  stateCache = fromLS ?? seedState();
  return stateCache;
}

export function subscribeDonationsStore(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function setState(next: DonationsState) {
  stateCache = next;
  persist();
  emit();
}

export const donationSelectors = {
  getDonors(): Donor[] {
    return getDonationsState().donors;
  },
  getDonations(): Donation[] {
    return getDonationsState().donations;
  },
  getAllocations(): Allocation[] {
    return getDonationsState().allocations;
  },
  getCertificates(): Certificate80G[] {
    return getDonationsState().certificates80G;
  },
  getAudit(): DonationAuditEntry[] {
    return getDonationsState().audit;
  },
  getDonorById(donorId: string) {
    return getDonationsState().donors.find(d => d.donorId === donorId) ?? null;
  },
  getDonationsForDonor(donorId: string) {
    return getDonationsState().donations.filter(d => d.donorId === donorId);
  },
  getDonationById(donationId: string) {
    return getDonationsState().donations.find(d => d.donationId === donationId) ?? null;
  },
  getAllocationForDonation(donationId: string) {
    return getDonationsState().allocations.find(a => a.donationId === donationId) ?? null;
  },
  getPendingAllocationAmount() {
    const st = getDonationsState();
    const allocatedSet = new Set(st.allocations.map(a => a.donationId));
    return st.donations.filter(d => !allocatedSet.has(d.donationId)).reduce((sum, d) => sum + d.amount, 0);
  },
};

function normalizePhone(phone: string) {
  return phone.replace(/\s+/g, "").trim();
}

function findOrCreateDonor(params: { name: string; phone?: string; email?: string; city?: string; pan?: string }): { nextState: DonationsState; donor: Donor } {
  const st = getDonationsState();
  const name = params.name.trim() || "Anonymous Devotee";
  const phone = params.phone?.trim() || "-";
  const pan = params.pan?.trim() || "-";

  const isAnonymous = name.toLowerCase() === "anonymous" || name.toLowerCase().includes("anonymous");
  if (isAnonymous) {
    const anon = st.donors.find(d => d.category === "Anonymous") ?? st.donors.find(d => d.name.toLowerCase().includes("anonymous"));
    if (anon) return { nextState: st, donor: anon };
  }

  const byPhone = phone !== "-" ? st.donors.find(d => d.phone !== "-" && normalizePhone(d.phone) === normalizePhone(phone)) : undefined;
  const byPan = pan !== "-" ? st.donors.find(d => d.pan !== "-" && d.pan.toUpperCase() === pan.toUpperCase()) : undefined;
  const byName = st.donors.find(d => d.name.toLowerCase() === name.toLowerCase());
  const existing = byPan ?? byPhone ?? byName;
  if (existing) {
    const updated: Donor = {
      ...existing,
      name,
      phone: phone === "-" ? existing.phone : phone,
      email: params.email?.trim() || existing.email,
      city: params.city?.trim() || existing.city,
      pan: pan === "-" ? existing.pan : pan,
      eligible80G: (pan !== "-" && pan.length >= 10) ? true : existing.eligible80G,
    };
    const nextState: DonationsState = {
      ...st,
      donors: st.donors.map(d => (d.donorId === existing.donorId ? updated : d)),
    };
    return { nextState, donor: updated };
  }

  const donorId = nextDonorId(st);
  const donor: Donor = {
    donorId,
    name,
    phone,
    email: params.email?.trim() || "-",
    city: params.city?.trim() || "-",
    pan,
    category: isAnonymous ? "Anonymous" : "Regular",
    eligible80G: pan !== "-" && pan.length >= 10,
    createdAt: nowIso(),
  };
  const nextState: DonationsState = { ...st, donors: [donor, ...st.donors] };
  return { nextState, donor };
}

export function createDonor(input: Omit<Donor, "donorId" | "createdAt">) {
  const st = getDonationsState();
  const donor: Donor = { ...input, donorId: nextDonorId(st), createdAt: nowIso() };
  const nextState = { ...st, donors: [donor, ...st.donors] };
  setState(nextState);
  return donor;
}

export function recordDonation(input: {
  donorName: string;
  phone?: string;
  email?: string;
  city?: string;
  pan?: string;
  amount: number;
  purpose: string;
  channel: DonationChannel;
  mode: string;
  referenceNo?: string;
  remarks?: string;
  date?: string;
  time?: string;
  createdBy?: string;
}) {
  const createdBy = input.createdBy ?? "System";
  const date = input.date ?? isoDate();
  const time = input.time ?? displayTime();
  const year = Number(date.slice(0, 4)) || new Date().getFullYear();

  const { nextState: afterDonor, donor } = findOrCreateDonor({
    name: input.donorName,
    phone: input.phone,
    email: input.email,
    city: input.city,
    pan: input.pan,
  });

  const ids = nextDonationPair(afterDonor, year);
  const donation: Donation = {
    donationId: ids.donationId,
    receiptNo: ids.receiptNo,
    donorId: donor.donorId,
    donorName: donor.name,
    amount: input.amount,
    purpose: input.purpose,
    channel: input.channel,
    mode: input.mode,
    referenceNo: input.referenceNo,
    remarks: input.remarks,
    date,
    time,
    status: "Recorded",
    createdAt: nowIso(),
  };

  const auditDonation: DonationAuditEntry = {
    id: nextAuditId(afterDonor),
    timestamp: displayTimestamp(),
    action: "Donation Recorded",
    entity: donation.donationId,
    user: createdBy,
    details: `₹${donation.amount.toLocaleString()} from ${donation.donorName} via ${donation.channel}`,
  };
  const auditReceipt: DonationAuditEntry = {
    id: `AUD-${String(Number(auditDonation.id.replace("AUD-", "")) + 1).padStart(3, "0")}`,
    timestamp: auditDonation.timestamp,
    action: "Receipt Generated",
    entity: donation.receiptNo,
    user: "System",
    details: `Auto-generated receipt for ${donation.donationId}`,
  };

  const nextState: DonationsState = {
    ...afterDonor,
    donations: [donation, ...afterDonor.donations],
    audit: [auditReceipt, auditDonation, ...afterDonor.audit],
  };
  setState(nextState);
  return donation;
}

export function allocateFund(input: {
  donationId: string;
  purpose: string;
  linkedType: Allocation["linkedType"];
  linkedTo: string;
  allocated: number;
  utilized?: number;
  createdBy?: string;
}) {
  const st = getDonationsState();
  const existing = st.allocations.find(a => a.donationId === input.donationId);
  const allocation: Allocation = {
    donationId: input.donationId,
    purpose: input.purpose,
    linkedTo: input.linkedTo,
    linkedType: input.linkedType,
    allocated: input.allocated,
    utilized: input.utilized ?? (existing?.utilized ?? 0),
  };

  const audit: DonationAuditEntry = {
    id: nextAuditId(st),
    timestamp: displayTimestamp(),
    action: "Fund Allocated",
    entity: input.donationId,
    user: input.createdBy ?? "System",
    details: `Allocated to ${input.linkedTo} (${input.linkedType})`,
  };

  const nextState: DonationsState = {
    ...st,
    allocations: existing ? st.allocations.map(a => (a.donationId === input.donationId ? allocation : a)) : [allocation, ...st.allocations],
    audit: [audit, ...st.audit],
  };
  setState(nextState);
  return allocation;
}

export function generate80GCertificate(input: { donorId: string; fy: string; createdBy?: string }) {
  const st = getDonationsState();
  const donor = st.donors.find(d => d.donorId === input.donorId);
  if (!donor) return null;

  const fyYear = Number(input.fy.slice(0, 4)) || new Date().getFullYear();
  const receiptNos = st.donations
    .filter(d => d.donorId === donor.donorId)
    .map(d => d.receiptNo);
  const totalAmount = st.donations.filter(d => d.donorId === donor.donorId).reduce((s, d) => s + d.amount, 0);

  const status: Certificate80G["status"] =
    donor.pan === "-" ? "PAN Missing" : donor.eligible80G ? "Generated" : "Pending";

  const cert: Certificate80G = {
    certificateId: next80GId(st, fyYear),
    donorId: donor.donorId,
    donorName: donor.name,
    pan: donor.pan,
    fy: input.fy,
    receiptNos,
    totalAmount,
    status,
    generatedDate: status === "Generated" ? isoDate() : "-",
    createdAt: nowIso(),
  };

  const audit: DonationAuditEntry = {
    id: nextAuditId(st),
    timestamp: displayTimestamp(),
    action: "80G Certificate Generated",
    entity: cert.certificateId,
    user: input.createdBy ?? "System",
    details: `${cert.fy} certificate for ${donor.name}`,
  };

  const nextState: DonationsState = {
    ...st,
    certificates80G: [cert, ...st.certificates80G],
    audit: [audit, ...st.audit],
  };
  setState(nextState);
  return cert;
}

