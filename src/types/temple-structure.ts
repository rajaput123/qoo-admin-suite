// Temple Structure Types

export interface GPSCoordinates {
  latitude: number;
  longitude: number;
}

export interface DarshanTimings {
  open: string;
  close: string;
  days: string[];
}

export interface StatusHistoryEntry {
  date: string;
  status: string;
  changedBy: string;
  reason?: string;
}

export interface Temple {
  id: string;
  name: string;
  location: string;
  description?: string;
  deity?: string;
  contactPhone?: string;
  contactEmail?: string;
  contactAddress?: string;
  image?: string;
  status: 'active' | 'inactive';
  isPrimary: boolean;
  operationalStatus?: 'open' | 'closed' | 'maintenance';
  facilities?: string[];
  dressCode?: string;
  darshanTimings?: DarshanTimings;
  templeHistory?: string;
  gpsCoordinates?: GPSCoordinates;
  geoFencingRadius?: number;
  customFields?: Record<string, string>;
  statusHistory?: StatusHistoryEntry[];
  createdAt: string;
}

export interface ChildTemple {
  id: string;
  name: string;
  parentTempleId: string;
  location: string;
  description?: string;
  image?: string;
  status: 'active' | 'inactive';
  distance?: number;
  gpsCoordinates?: GPSCoordinates;
  customFields?: Record<string, string>;
  createdAt: string;
}

export type SacredType = 'deity' | 'samadhi' | 'other';
export const sacredTypeLabels: Record<SacredType, string> = {
  deity: 'Deity',
  samadhi: 'Samadhi',
  other: 'Other',
};

export interface Sacred {
  id: string;
  name: string;
  sacredType: SacredType;
  associatedTempleId: string;
  associatedTempleType: 'temple' | 'child_temple';
  description?: string;
  image?: string;
  status: 'active' | 'inactive';
  festivals?: Array<{ name: string; date: string }>;
  abhishekamSchedule?: Array<{ day: string; time: string; type: string }>;
  createdAt: string;
}

export type ZoneType = 'public' | 'restricted' | 'maintenance' | 'other';
export const zoneTypeLabels: Record<ZoneType, string> = {
  public: 'Public',
  restricted: 'Restricted',
  maintenance: 'Maintenance',
  other: 'Other',
};

export interface Zone {
  id: string;
  name: string;
  zoneType: ZoneType;
  associatedTempleId: string;
  associatedTempleType: 'temple' | 'child_temple';
  capacity?: number;
  description?: string;
  status: 'active' | 'inactive';
  image?: string;
  createdAt: string;
}

export type HallRoomType = 'hall' | 'room';
export const hallRoomTypeLabels: Record<HallRoomType, string> = {
  hall: 'Hall',
  room: 'Room',
};

export interface HallRoom {
  id: string;
  name: string;
  type: HallRoomType;
  zoneId: string;
  capacity?: number;
  description?: string;
  status: 'active' | 'inactive';
  image?: string;
  maintenanceSchedule?: Array<{ day: string; time: string; type: string }>;
  createdAt: string;
}

export type CounterType = 'seva' | 'donation' | 'information' | 'ticket' | 'other';
export const counterTypeLabels: Record<CounterType, string> = {
  seva: 'Seva',
  donation: 'Donation',
  information: 'Information',
  ticket: 'Ticket',
  other: 'Other',
};

export interface ServicePricing {
  baseRate: number;
  currency: string;
  specialRate?: number;
}

export interface ShiftTiming {
  day: string;
  openTime: string;
  closeTime: string;
}

export interface StaffAllocation {
  staffId: string;
  shift: string;
}

export interface PerformanceMetrics {
  transactions: number;
  revenue: number;
  avgWaitTime: number;
}

export interface Counter {
  id: string;
  name: string;
  counterType: CounterType;
  hallRoomId: string;
  servicePricing?: ServicePricing;
  shiftTimings?: ShiftTiming[];
  staffAllocation?: StaffAllocation[];
  paymentMethods?: string[];
  analyticsEnabled?: boolean;
  performanceMetrics?: PerformanceMetrics;
  status: 'active' | 'inactive';
  image?: string;
  createdAt: string;
}
