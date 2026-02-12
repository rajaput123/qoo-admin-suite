export type DonorCategory = "Patron" | "Trust" | "Regular" | "Organization" | "Walk-in" | "Anonymous";

export interface Donor {
  donorId: string; // e.g. DNR-001
  name: string;
  phone: string; // may be "-"
  email: string; // may be "-"
  city: string; // may be "-"
  pan: string; // may be "-"
  category: DonorCategory;
  eligible80G: boolean;
  createdAt: string; // ISO datetime
}

export type DonationChannel = "Cash" | "UPI" | "Bank Transfer" | "Online" | "Cheque" | "In-Kind";

export type DonationPurpose =
  | "General / Hundi"
  | "Annadanam Sponsorship"
  | "Prasadam Sponsorship"
  | "Seva Sponsorship"
  | "Project-linked"
  | "Event-linked"
  | "Corpus Fund";

export interface Donation {
  donationId: string; // e.g. DON-2025-0891
  receiptNo: string; // e.g. REC-2025-0891
  donorId: string; // links to Donor
  donorName: string; // snapshot for receipts/audit
  amount: number;
  purpose: DonationPurpose | string;
  channel: DonationChannel;
  mode: string; // e.g. NEFT, Cash, GPay
  referenceNo?: string;
  remarks?: string;
  date: string; // ISO date (yyyy-mm-dd)
  time: string; // display time
  status: "Recorded";
  createdAt: string; // ISO datetime
}

export type AllocationLinkedType = "Project" | "Kitchen" | "Prasadam" | "Seva" | "Event" | "General";

export interface Allocation {
  donationId: string;
  purpose: string;
  linkedTo: string;
  linkedType: AllocationLinkedType;
  allocated: number;
  utilized: number;
}

export interface Certificate80G {
  certificateId: string; // e.g. 80G-2025-0045
  donorId: string;
  donorName: string;
  pan: string;
  fy: string; // e.g. 2024-25
  receiptNos: string[];
  totalAmount: number;
  status: "Generated" | "Pending" | "PAN Missing";
  generatedDate: string; // ISO date or "-"
  createdAt: string; // ISO datetime
}

export interface DonationAuditEntry {
  id: string; // AUD-xxx
  timestamp: string; // display timestamp
  action: string;
  entity: string;
  user: string;
  details: string;
}

export interface DonationsState {
  donors: Donor[];
  donations: Donation[];
  allocations: Allocation[];
  certificates80G: Certificate80G[];
  audit: DonationAuditEntry[];
}

