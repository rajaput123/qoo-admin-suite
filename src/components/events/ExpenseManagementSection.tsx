import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, IndianRupee } from "lucide-react";

interface ExpenseItem {
    id: string;
    category: string;
    description: string;
    estimatedAmount: number;
    notes: string;
}

const EXPENSE_CATEGORIES = [
    "Decoration",
    "Food & Prasadam",
    "Priest Payments",
    "Sound & Lighting",
    "Security",
    "Transportation",
    "Printing & Publicity",
    "Miscellaneous",
];

interface ExpenseManagementSectionProps {
    onExpensesChange?: (expenses: ExpenseItem[]) => void;
}

const ExpenseManagementSection = ({ onExpensesChange }: ExpenseManagementSectionProps) => {
    const [expenses, setExpenses] = useState<ExpenseItem[]>([]);

    const addExpense = () => {
        const newExpense: ExpenseItem = {
            id: `exp-${Date.now()}`,
            category: "Decoration",
            description: "",
            estimatedAmount: 0,
            notes: "",
        };
        const updated = [...expenses, newExpense];
        setExpenses(updated);
        onExpensesChange?.(updated);
    };

    const removeExpense = (id: string) => {
        const updated = expenses.filter((e) => e.id !== id);
        setExpenses(updated);
        onExpensesChange?.(updated);
    };

    const updateExpense = (id: string, field: keyof ExpenseItem, value: any) => {
        const updated = expenses.map((e) => (e.id === id ? { ...e, [field]: value } : e));
        setExpenses(updated);
        onExpensesChange?.(updated);
    };

    const totalEstimate = expenses.reduce((sum, exp) => sum + exp.estimatedAmount, 0);

    const getCategoryColor = (category: string) => {
        const colors: { [key: string]: string } = {
            Decoration: "bg-pink-100 text-pink-700 border-pink-300",
            "Food & Prasadam": "bg-orange-100 text-orange-700 border-orange-300",
            "Priest Payments": "bg-purple-100 text-purple-700 border-purple-300",
            "Sound & Lighting": "bg-yellow-100 text-yellow-700 border-yellow-300",
            Security: "bg-red-100 text-red-700 border-red-300",
            Transportation: "bg-cyan-100 text-cyan-700 border-cyan-300",
            "Printing & Publicity": "bg-indigo-100 text-indigo-700 border-indigo-300",
            Miscellaneous: "bg-gray-100 text-gray-700 border-gray-300",
        };
        return colors[category] || "bg-gray-100 text-gray-700 border-gray-300";
    };

    return (
        <div className="space-y-4">
            <div className="border rounded-lg p-4 bg-muted/30">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <p className="text-sm font-medium">Budget & Expenses</p>
                        <p className="text-xs text-muted-foreground mt-1">
                            Add estimated expenses for this event
                        </p>
                    </div>
                    <div className="flex gap-3 items-center">
                        {expenses.length > 0 && (
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">
                                {expenses.length} items
                            </Badge>
                        )}
                        <Button size="sm" onClick={addExpense} className="gap-2">
                            <Plus className="h-4 w-4" />
                            Add Expense
                        </Button>
                    </div>
                </div>

                {expenses.length === 0 ? (
                    <div className="border-2 border-dashed rounded-lg p-8 text-center">
                        <p className="text-sm text-muted-foreground mb-3">No expenses added yet</p>
                        <Button size="sm" variant="outline" onClick={addExpense} className="gap-2">
                            <Plus className="h-4 w-4" />
                            Add Your First Expense
                        </Button>
                    </div>
                ) : (
                    <>
                        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 mb-4">
                            {expenses.map((expense) => (
                                <div
                                    key={expense.id}
                                    className="border rounded-lg p-4 bg-background hover:shadow-sm transition-shadow"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <Badge variant="outline" className={`text-xs ${getCategoryColor(expense.category)}`}>
                                            {expense.category}
                                        </Badge>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => removeExpense(expense.id)}
                                            className="h-7 w-7 p-0 text-destructive hover:text-destructive"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>

                                    <div className="grid grid-cols-3 gap-3 mb-3">
                                        <div>
                                            <Label className="text-xs">Category</Label>
                                            <Select
                                                value={expense.category}
                                                onValueChange={(value) => updateExpense(expense.id, "category", value)}
                                            >
                                                <SelectTrigger className="h-8 text-xs mt-1 bg-background">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent className="bg-popover">
                                                    {EXPENSE_CATEGORIES.map((cat) => (
                                                        <SelectItem key={cat} value={cat}>
                                                            {cat}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <Label className="text-xs">Description</Label>
                                            <Input
                                                value={expense.description}
                                                onChange={(e) => updateExpense(expense.id, "description", e.target.value)}
                                                placeholder="e.g., Flower arrangements"
                                                className="h-8 text-xs mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label className="text-xs">Estimated Amount (₹)</Label>
                                            <Input
                                                type="number"
                                                value={expense.estimatedAmount}
                                                onChange={(e) =>
                                                    updateExpense(expense.id, "estimatedAmount", parseInt(e.target.value) || 0)
                                                }
                                                placeholder="0"
                                                className="h-8 text-xs mt-1"
                                                min={0}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <Label className="text-xs">Notes (Optional)</Label>
                                        <Textarea
                                            value={expense.notes}
                                            onChange={(e) => updateExpense(expense.id, "notes", e.target.value)}
                                            placeholder="Additional details..."
                                            rows={2}
                                            className="text-xs mt-1"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t pt-4">
                            <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <IndianRupee className="h-5 w-5 text-green-700" />
                                    <span className="text-sm font-semibold text-green-900">Total Estimated Budget</span>
                                </div>
                                <span className="text-2xl font-bold text-green-700">
                                    ₹{totalEstimate.toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </>
                )}

                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-xs text-blue-800">
                        <strong>Note:</strong> Track actual expenses and compare with estimates in the event detail page under "Expenses" tab.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ExpenseManagementSection;
