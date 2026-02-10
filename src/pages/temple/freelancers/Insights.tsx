import { motion } from "framer-motion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Star } from "lucide-react";

const topFreelancers = [
  { name: "Sound Waves Pro", category: "Sound Engineering", assignments: 30, totalPaid: 540000, rating: 4.9 },
  { name: "Pixel Studio", category: "Photography", assignments: 24, totalPaid: 480000, rating: 4.8 },
  { name: "Vastu Consultancy", category: "Consulting", assignments: 6, totalPaid: 180000, rating: 4.7 },
  { name: "Heritage Electricals", category: "Electrical Work", assignments: 20, totalPaid: 320000, rating: 4.6 },
  { name: "Decor Dreams", category: "Decoration", assignments: 18, totalPaid: 360000, rating: 4.5 },
];

const categoryBreakdown = [
  { category: "Photography / Videography", freelancers: 2, assignments: 34, spend: 630000 },
  { category: "Sound Engineering", freelancers: 1, assignments: 30, spend: 540000 },
  { category: "Decoration", freelancers: 1, assignments: 18, spend: 360000 },
  { category: "Electrical / Lighting", freelancers: 1, assignments: 20, spend: 320000 },
  { category: "Catering", freelancers: 1, assignments: 8, spend: 240000 },
  { category: "Consulting", freelancers: 1, assignments: 6, spend: 180000 },
  { category: "Graphic Design", freelancers: 1, assignments: 15, spend: 120000 },
];

const Insights = () => {
  const renderStars = (rating: number) => (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(s => (
        <Star key={s} className={`h-3.5 w-3.5 ${s <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"}`} />
      ))}
      <span className="ml-1 text-xs text-muted-foreground">{rating.toFixed(1)}</span>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Insights</h1>
          <p className="text-muted-foreground">Freelancer analytics and operational overview</p>
        </div>

        {/* Summary */}
        <div className="flex gap-8 text-sm">
          <div><span className="text-muted-foreground">Total Freelancers:</span> <strong className="text-lg ml-1">8</strong></div>
          <div><span className="text-muted-foreground">Active:</span> <strong className="text-lg ml-1">7</strong></div>
          <div><span className="text-muted-foreground">Total Assignments:</span> <strong className="text-lg ml-1">131</strong></div>
          <div><span className="text-muted-foreground">Total Spend:</span> <strong className="text-lg ml-1">₹23,90,000</strong></div>
        </div>

        {/* Top Freelancers */}
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Top Freelancers by Rating</h3>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Freelancer</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-center">Assignments</TableHead>
                  <TableHead className="text-right">Total Paid</TableHead>
                  <TableHead>Rating</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topFreelancers.map((f, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{f.name}</TableCell>
                    <TableCell>{f.category}</TableCell>
                    <TableCell className="text-center">{f.assignments}</TableCell>
                    <TableCell className="text-right">₹{f.totalPaid.toLocaleString()}</TableCell>
                    <TableCell>{renderStars(f.rating)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Category Breakdown */}
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Spend by Category</h3>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service Category</TableHead>
                  <TableHead className="text-center">Freelancers</TableHead>
                  <TableHead className="text-center">Assignments</TableHead>
                  <TableHead className="text-right">Total Spend</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categoryBreakdown.map((c, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{c.category}</TableCell>
                    <TableCell className="text-center">{c.freelancers}</TableCell>
                    <TableCell className="text-center">{c.assignments}</TableCell>
                    <TableCell className="text-right">₹{c.spend.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Insights;
