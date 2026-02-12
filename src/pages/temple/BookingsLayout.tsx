import { Calendar, Clock, BookOpen, Store, UserCheck, BarChart3 } from "lucide-react";
import TempleLayout from "@/components/TempleLayout";

const navItems = [
  { label: "Today", path: "/temple/bookings", icon: Clock, badge: "Live" },
  { label: "All Bookings", path: "/temple/bookings/all", icon: BookOpen, badge: "156" },
  { label: "Counter Booking", path: "/temple/bookings/counter", icon: Store },
  { label: "Attendance", path: "/temple/bookings/attendance", icon: UserCheck },
  { label: "Reports", path: "/temple/bookings/reports", icon: BarChart3 },
];

const BookingsLayout = () => {
  return <TempleLayout title="Booking Management" icon={Calendar} navItems={navItems} />;
};

export default BookingsLayout;
