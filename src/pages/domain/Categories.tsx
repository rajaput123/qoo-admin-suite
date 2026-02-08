import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Plus, Pencil, Trash2, FolderOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
  description: string;
  templeCount: number;
  parentCategory: string | null;
  status: "Active" | "Inactive";
}

const mockData: Category[] = [
  { id: "1", name: "Jyotirlinga", description: "Twelve sacred shrines of Lord Shiva", templeCount: 12, parentCategory: null, status: "Active" },
  { id: "2", name: "Shakti Peetha", description: "Sacred shrines of Goddess Shakti", templeCount: 51, parentCategory: null, status: "Active" },
  { id: "3", name: "Vaishnavism", description: "Temples dedicated to Lord Vishnu", templeCount: 234, parentCategory: null, status: "Active" },
  { id: "4", name: "Char Dham", description: "Four sacred pilgrimage sites", templeCount: 4, parentCategory: null, status: "Active" },
  { id: "5", name: "Pancharama", description: "Five ancient Shiva temples", templeCount: 5, parentCategory: "Jyotirlinga", status: "Active" },
  { id: "6", name: "Divya Desam", description: "108 Vishnu temples sung by Alvars", templeCount: 108, parentCategory: "Vaishnavism", status: "Active" },
  { id: "7", name: "Ashtavinayak", description: "Eight Ganesha temples in Maharashtra", templeCount: 8, parentCategory: null, status: "Active" },
  { id: "8", name: "Heritage", description: "UNESCO World Heritage temples", templeCount: 28, parentCategory: null, status: "Inactive" },
];

const Categories = () => {
  const [search, setSearch] = useState("");

  const filtered = mockData.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-8 max-w-7xl">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-1">Categories</h1>
            <p className="text-sm text-muted-foreground">Organize temples into categories</p>
          </div>
          <Button size="sm" className="gap-1.5">
            <Plus className="h-3.5 w-3.5" />
            Add Category
          </Button>
        </div>
      </motion.div>

      {/* Search */}
      <div className="mb-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search categories..."
            className="h-9 pl-9 text-sm bg-card"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((category, i) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: i * 0.03 }}
            className="bg-card rounded-lg border p-4 card-shadow hover:card-shadow-hover transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 rounded-lg bg-gold-light">
                <FolderOpen className="h-4 w-4 text-accent" />
              </div>
              <span className={cn(
                "text-[10px] font-medium px-2 py-0.5 rounded-full",
                category.status === "Active" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"
              )}>
                {category.status}
              </span>
            </div>
            <h3 className="font-medium text-foreground text-sm mb-1">{category.name}</h3>
            <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{category.description}</p>
            {category.parentCategory && (
              <p className="text-[10px] text-muted-foreground mb-2">
                Parent: <span className="text-foreground/70">{category.parentCategory}</span>
              </p>
            )}
            <div className="flex items-center justify-between pt-3 border-t">
              <span className="text-xs text-muted-foreground">
                <span className="font-medium text-foreground">{category.templeCount}</span> temples
              </span>
              <div className="flex items-center gap-1">
                <button className="p-1 rounded hover:bg-muted transition-colors" title="Edit">
                  <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
                </button>
                <button className="p-1 rounded hover:bg-destructive/10 transition-colors" title="Delete">
                  <Trash2 className="h-3.5 w-3.5 text-muted-foreground hover:text-destructive" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
