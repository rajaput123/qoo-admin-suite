import type { Temple, ChildTemple, Sacred, Zone, HallRoom, Counter } from '@/types/temple-structure';

// Dummy data for temple structure module
export const dummyTemples: Temple[] = [
  {
    id: 'temple-1',
    name: 'Sri Venkateswara Temple',
    location: 'Tirumala, Andhra Pradesh',
    description: 'Main temple dedicated to Lord Venkateswara',
    deity: 'Lord Venkateswara',
    contactPhone: '+91 877 223 1234',
    contactEmail: 'info@tirumala.org',
    contactAddress: 'Tirumala, Chittoor District, Andhra Pradesh',
    image: '/placeholder.svg',
    status: 'active',
    isPrimary: true,
    operationalStatus: 'open',
    facilities: ['Parking', 'Prasadam', 'Accommodation', 'Library'],
    dressCode: 'Traditional attire required. Men: Dhoti/Kurta. Women: Saree/Churidar.',
    darshanTimings: {
      open: '03:00 AM',
      close: '11:00 PM',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    },
    templeHistory: 'Ancient temple with rich history...',
    gpsCoordinates: {
      latitude: 13.6775,
      longitude: 79.3458,
    },
    geoFencingRadius: 500,
    customFields: {},
    statusHistory: [],
    createdAt: '2024-01-01T00:00:00Z',
  },
];

export const dummyChildTemples: ChildTemple[] = [
  {
    id: 'child-1',
    name: 'Sri Padmavathi Temple',
    parentTempleId: 'temple-1',
    location: 'Tiruchanur, Andhra Pradesh',
    description: 'Temple dedicated to Goddess Padmavathi',
    image: '/placeholder.svg',
    status: 'active',
    distance: 5.2,
    gpsCoordinates: {
      latitude: 13.6500,
      longitude: 79.3500,
    },
    customFields: {},
    createdAt: '2024-01-01T00:00:00Z',
  },
];

export const dummySacreds: Sacred[] = [
  {
    id: 'sacred-1',
    name: 'Main Deity - Lord Venkateswara',
    sacredType: 'deity',
    associatedTempleId: 'temple-1',
    associatedTempleType: 'temple',
    description: 'Main deity of the temple',
    image: '/placeholder.svg',
    status: 'active',
    festivals: [
      { name: 'Brahmotsavam', date: '2024-10-15' },
    ],
    abhishekamSchedule: [
      { day: 'Monday', time: '06:00 AM', type: 'Suprabhatam' },
    ],
    createdAt: '2024-01-01T00:00:00Z',
  },
];

export const dummyZones: Zone[] = [
  {
    id: 'zone-1',
    name: 'Main Sanctum Zone',
    zoneType: 'public',
    associatedTempleId: 'temple-1',
    associatedTempleType: 'temple',
    capacity: 500,
    description: 'Main darshan area',
    status: 'active',
    image: '/placeholder.svg',
    createdAt: '2024-01-01T00:00:00Z',
  },
];

export const dummyHallRooms: HallRoom[] = [
  {
    id: 'hall-1',
    name: 'Main Darshan Hall',
    type: 'hall',
    zoneId: 'zone-1',
    capacity: 350,
    description: 'Main hall for darshan',
    status: 'active',
    image: '/placeholder.svg',
    maintenanceSchedule: [],
    createdAt: '2024-01-01T00:00:00Z',
  },
];

export const dummyCounters: Counter[] = [
  {
    id: 'counter-1',
    name: 'Seva Booking Counter',
    counterType: 'seva',
    hallRoomId: 'hall-1',
    servicePricing: {
      baseRate: 100,
      currency: 'INR',
    },
    shiftTimings: [
      { day: 'Monday', openTime: '06:00', closeTime: '20:00' },
    ],
    paymentMethods: ['cash', 'card', 'upi'],
    status: 'active',
    image: '/placeholder.svg',
    createdAt: '2024-01-01T00:00:00Z',
  },
];
