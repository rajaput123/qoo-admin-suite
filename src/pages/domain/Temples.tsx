import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Plus, Eye, Pencil, MapPin, MoreHorizontal, ExternalLink, GitMerge, Archive, Flag, Link2, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface Temple {
  id: string;
  name: string;
  location: string;
  state: string;
  category: string;
  status: "Published" | "Hidden";
  linkedTenant: string | null;
  lastUpdated: string;
  contributorCount: number;
}

const mockData: Temple[] = [
  { id: "1", name: "Sri Meenakshi Temple", location: "Madurai", state: "TN", category: "Shakti Peetha", status: "Published", linkedTenant: "Madurai Temple Board", lastUpdated: "Feb 6, 2026", contributorCount: 12 },
  { id: "2", name: "Jagannath Temple", location: "Puri", state: "OD", category: "Vaishnavism", status: "Published", linkedTenant: "Puri Temple Trust", lastUpdated: "Feb 5, 2026", contributorCount: 8 },
  { id: "3", name: "Kashi Vishwanath", location: "Varanasi", state: "UP", category: "Jyotirlinga", status: "Published", linkedTenant: null, lastUpdated: "Feb 5, 2026", contributorCount: 15 },
  { id: "4", name: "Tirupati Balaji", location: "Tirupati", state: "AP", category: "Vaishnavism", status: "Published", linkedTenant: "TTD", lastUpdated: "Feb 4, 2026", contributorCount: 23 },
  { id: "5", name: "Golden Temple", location: "Amritsar", state: "PB", category: "Sikh", status: "Published", linkedTenant: "SGPC", lastUpdated: "Feb 4, 2026", contributorCount: 18 },
  { id: "6", name: "Somnath Temple", location: "Gir Somnath", state: "GJ", category: "Jyotirlinga", status: "Published", linkedTenant: "Somnath Trust", lastUpdated: "Feb 3, 2026", contributorCount: 6 },
  { id: "7", name: "Kedarnath Temple", location: "Rudraprayag", state: "UK", category: "Jyotirlinga", status: "Hidden", linkedTenant: null, lastUpdated: "Feb 3, 2026", contributorCount: 4 },
  { id: "8", name: "Ramanathaswamy", location: "Rameswaram", state: "TN", category: "Jyotirlinga", status: "Published", linkedTenant: null, lastUpdated: "Feb 2, 2026", contributorCount: 9 },
  { id: "9", name: "Brihadeeswara Temple", location: "Thanjavur", state: "TN", category: "Shiva", status: "Published", linkedTenant: "ASI", lastUpdated: "Feb 1, 2026", contributorCount: 7 },
  { id: "10", name: "Konark Sun Temple", location: "Konark", state: "OD", category: "Surya", status: "Published", linkedTenant: "ASI", lastUpdated: "Jan 30, 2026", contributorCount: 5 },
  { id: "11", name: "Siddhivinayak Temple", location: "Mumbai", state: "MH", category: "Ganesha", status: "Published", linkedTenant: "Siddhivinayak Trust", lastUpdated: "Jan 28, 2026", contributorCount: 11 },
  { id: "12", name: "Vaishno Devi Temple", location: "Katra", state: "JK", category: "Shakti Peetha", status: "Published", linkedTenant: "Shrine Board", lastUpdated: "Jan 25, 2026", contributorCount: 14 },
];

const statusColors: Record<string, string> = {
  Published: "bg-success/10 text-success",
  Hidden: "bg-muted text-muted-foreground",
};

const Temples = () => {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [tenantFilter, setTenantFilter] = useState<string>("all");

  const filtered = mockData
    .filter((t) => statusFilter === "all" || t.status === statusFilter)
    .filter((t) => categoryFilter === "all" || t.category === categoryFilter)
    .filter((t) => {
      if (tenantFilter === "all") return true;
      if (tenantFilter === "linked") return t.linkedTenant !== null;
      return t.linkedTenant === null;
    });

  const categories = [...new Set(mockData.map((t) => t.category))];

  return (
    <div className="p-6 lg:p-8 max-w-7xl">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-1">Temples</h1>
            <p className="text-sm text-muted-foreground">Master directory of published temples</p>
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
            <SelectItem value="Hidden">Hidden</SelectItem>
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

        <Select value={tenantFilter} onValueChange={setTenantFilter}>
          <SelectTrigger className="w-40 h-9 text-sm bg-card">
            <SelectValue placeholder="Tenant" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            <SelectItem value="all">All Temples</SelectItem>
            <SelectItem value="linked">Linked to Tenant</SelectItem>
            <SelectItem value="unlinked">Not Linked</SelectItem>
          </SelectContent>
        </Select>

        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search temples..." className="h-9 pl-9 text-sm bg-card" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-card rounded-lg border card-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/30">
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Temple Name</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3 hidden md:table-cell">Location</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3 hidden lg:table-cell">Linked Tenant</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Status</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3 hidden sm:table-cell">Last Updated</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3 hidden lg:table-cell">Contributors</th>
                <th className="w-12 px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map((row) => (
                <tr key={row.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-foreground">{row.name}</p>
                      <p className="text-xs text-muted-foreground">{row.category}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" />
                      {row.location}, {row.state}
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    {row.linkedTenant ? (
                      <div className="flex items-center gap-1.5">
                        <Link2 className="h-3.5 w-3.5 text-success" />
                        <span className="text-sm text-foreground">{row.linkedTenant}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn("text-[11px] font-medium px-2.5 py-1 rounded-full", statusColors[row.status])}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground hidden sm:table-cell">{row.lastUpdated}</td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Users className="h-3.5 w-3.5" />
                      {row.contributorCount}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-1.5 rounded hover:bg-muted transition-colors">
                          <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48 bg-popover">
                        <DropdownMenuItem className="gap-2 text-sm">
                          <ExternalLink className="h-4 w-4" />
                          View Public Page
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-sm">
                          <Pencil className="h-4 w-4" />
                          Request Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2 text-sm">
                          <GitMerge className="h-4 w-4" />
                          Merge with Another
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-sm">
                          <Archive className="h-4 w-4" />
                          Archive
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2 text-sm text-warning">
                          <Flag className="h-4 w-4" />
                          Flag for Review
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 py-3 border-t flex items-center justify-between text-sm">
          <span className="text-muted-foreground text-xs">
            Showing {filtered.length} of {mockData.length} temples
          </span>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="sm" className="h-7 text-xs" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" className="h-7 text-xs bg-primary text-primary-foreground">
              1
            </Button>
            <Button variant="outline" size="sm" className="h-7 text-xs">
              2
            </Button>
            <Button variant="outline" size="sm" className="h-7 text-xs">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Temples;
