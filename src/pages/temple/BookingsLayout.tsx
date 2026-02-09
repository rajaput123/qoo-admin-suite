import { Calendar, Clock, Users, Search, Filter, Plus, CheckCircle, XCircle } from "lucide-react";
import TempleLayout from "@/components/TempleLayout";

const navItems = [
  { label: "All Bookings", path: "/temple/bookings", icon: Calendar, badge: "45" },
  { label: "Today's Bookings", path: "/temple/bookings/today", icon: Clock, badge: "12" },
  { label: "Upcoming", path: "/temple/bookings/upcoming", icon: Calendar },
  { label: "Completed", path: "/temple/bookings/completed", icon: CheckCircle },
  { label: "Cancellations", path: "/temple/bookings/cancelled", icon: XCircle },
];

const BookingsLayout = () => {
  return <TempleLayout title="Bookings" icon={Calendar} navItems={navItems} />;
};

export default BookingsLayout;
