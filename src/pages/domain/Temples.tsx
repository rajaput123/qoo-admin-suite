import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Plus, Eye, Pencil, MapPin, MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface Temple {
  id: string;
  name: string;
  location: string;
  category: string;
  status: "Published" | "Draft" | "Under Review";
  lastUpdated: string;
}

const mockData: Temple[] = [
  { id: "1", name: "Sri Meenakshi Temple", location: "Madurai, TN", category: "Shakti Peetha", status: "Published", lastUpdated: "Feb 6, 2026" },
  { id: "2", name: "Jagannath Temple", location: "Puri, OD", category: "Vaishnavism", status: "Published", lastUpdated: "Feb 5, 2026" },
  { id: "3", name: "Kashi Vishwanath", location: "Varanasi, UP", category: "Jyotirlinga", status: "Published", lastUpdated: "Feb 5, 2026" },
  { id: "4", name: "Tirupati Balaji", location: "Tirupati, AP", category: "Vaishnavism", status: "Under Review", lastUpdated: "Feb 4, 2026" },
  { id: "5", name: "Golden Temple", location: "Amritsar, PB", category: "Sikh", status: "Published", lastUpdated: "Feb 4, 2026" },
  { id: "6", name: "Somnath Temple", location: "Gir Somnath, GJ", category: "Jyotirlinga", status: "Published", lastUpdated: "Feb 3, 2026" },
  { id: "7", name: "Kedarnath Temple", location: "Rudraprayag, UK", category: "Jyotirlinga", status: "Draft", lastUpdated: "Feb 3, 2026" },
  { id: "8", name: "Ramanathaswamy", location: "Rameswaram, TN", category: "Jyotirlinga", status: "Published", lastUpdated: "Feb 2, 2026" },
];

const statusColors: Record<string, string> = {
  Published: "bg-success/10 text-success",
  Draft: "bg-muted text-muted-foreground",
  "Under Review": "bg-warning/10 text-warning",
};

const Temples = () => {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const filtered = mockData
    .filter((t) => statusFilter === "all" || t.status === statusFilter)
    .filter((t) => categoryFilter === "all" || t.category === categoryFilter);

  const categories = [...new Set(mockData.map((t) => t.category))];

  return (
    <div className="p-6 lg:p-8 max-w-7xl">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-1">Temples</h1>
            <p className="text-sm text-muted-foreground">Manage all temples in the directory</p>
          </div>
          <Button size="sm" className="gap-1.5">
            <Plus className="h-3.5 w-3.5" />
            Add Temple
          </Button>
        </div>
      </motion.div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-36 h-9 text-sm bg-card">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Published">Published</SelectItem>
            <SelectItem value="Draft">Draft</SelectItem>
            <SelectItem value="Under Review">Under Review</SelectItem>
          </SelectContent>
        </Select>

        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-40 h-9 text-sm bg-card">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search temples..." className="h-9 pl-9 text-sm bg-card" />
        </div>
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((temple, i) => (
          <motion.div
            key={temple.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: i * 0.03 }}
            className="bg-card rounded-lg border p-4 card-shadow hover:card-shadow-hover transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <span className={cn("text-[10px] font-medium px-2 py-0.5 rounded-full", statusColors[temple.status])}>
                {temple.status}
              </span>
              <button className="p-1 rounded hover:bg-muted transition-colors">
                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
            <h3 className="font-medium text-foreground text-sm mb-1">{temple.name}</h3>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
              <MapPin className="h-3 w-3" />
              {temple.location}
            </div>
            <div className="text-xs text-muted-foreground mb-3">
              <span className="text-foreground/70">{temple.category}</span>
            </div>
            <div className="flex items-center justify-between pt-3 border-t">
              <span className="text-[10px] text-muted-foreground">{temple.lastUpdated}</span>
              <div className="flex items-center gap-1">
                <button className="p-1 rounded hover:bg-muted transition-colors" title="View">
                  <Eye className="h-3.5 w-3.5 text-muted-foreground" />
                </button>
                <button className="p-1 rounded hover:bg-muted transition-colors" title="Edit">
                  <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Temples;
