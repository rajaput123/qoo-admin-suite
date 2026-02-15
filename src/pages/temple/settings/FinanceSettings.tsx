import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Trash2, Edit, CheckCircle2, XCircle, Building2, CreditCard, Calendar } from "lucide-react";
import { toast } from "sonner";

interface BankAccount {
  id: string;
  accountName: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  branch: string;
  isPrimary: boolean;
}

const FinanceSettings = () => {
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([
    {
      id: "BANK-001",
      accountName: "Main Temple Account",
      bankName: "State Bank of India",
      accountNumber: "****1234",
      ifscCode: "SBIN0001234",
      branch: "Tirupati Main Branch",
      isPrimary: true,
    },
    {
      id: "BANK-002",
      accountName: "Donation Account",
      bankName: "HDFC Bank",
      accountNumber: "****5678",
      ifscCode: "HDFC0005678",
      branch: "Tirupati Branch",
      isPrimary: false,
    },
  ]);
  const [showAddBank, setShowAddBank] = useState(false);
  const [editingBank, setEditingBank] = useState<BankAccount | null>(null);
  const [bankForm, setBankForm] = useState({
    accountName: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    branch: "",
  });
  const [taxInfo, setTaxInfo] = useState({
    gstNumber: "29ABCDE1234F1Z5",
    panNumber: "ABCDE1234F",
    tanNumber: "",
    otherTaxIds: "",
  });
  const [panVerified, setPanVerified] = useState(true);
  const [currency, setCurrency] = useState("INR");
  const [financialYear, setFinancialYear] = useState("2024-2025");

  const handleAddBank = () => {
    if (!bankForm.accountName || !bankForm.bankName || !bankForm.accountNumber) {
      toast.error("Please fill required fields");
      return;
    }
    const newAccount: BankAccount = {
      id: `BANK-${String(bankAccounts.length + 1).padStart(3, "0")}`,
      ...bankForm,
      isPrimary: bankAccounts.length === 0,
    };
    setBankAccounts([...bankAccounts, newAccount]);
    setBankForm({ accountName: "", bankName: "", accountNumber: "", ifscCode: "", branch: "" });
    setShowAddBank(false);
    toast.success("Bank account added successfully");
  };

  const handleEditBank = (account: BankAccount) => {
    setEditingBank(account);
    setBankForm({
      accountName: account.accountName,
      bankName: account.bankName,
      accountNumber: account.accountNumber.replace(/\*/g, ""),
      ifscCode: account.ifscCode,
      branch: account.branch,
    });
    setShowAddBank(true);
  };

  const handleUpdateBank = () => {
    if (!editingBank) return;
    setBankAccounts(bankAccounts.map(acc => 
      acc.id === editingBank.id ? { ...acc, ...bankForm } : acc
    ));
    setShowAddBank(false);
    setEditingBank(null);
    setBankForm({ accountName: "", bankName: "", accountNumber: "", ifscCode: "", branch: "" });
    toast.success("Bank account updated successfully");
  };

  const handleDeleteBank = (id: string) => {
    if (bankAccounts.find(acc => acc.id === id)?.isPrimary) {
      toast.error("Cannot delete primary account");
      return;
    }
    setBankAccounts(bankAccounts.filter(acc => acc.id !== id));
    toast.success("Bank account deleted");
  };

  const handleSetPrimary = (id: string) => {
    setBankAccounts(bankAccounts.map(acc => ({
      ...acc,
      isPrimary: acc.id === id,
    })));
    toast.success("Primary account updated");
  };

  const handleSaveTaxInfo = () => {
    toast.success("Tax information saved successfully");
  };

  const handleVerifyPAN = () => {
    setPanVerified(true);
    toast.success("PAN verified successfully");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Finance Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Configure financial operations and bank accounts</p>
      </div>

      {/* Bank Account Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <Building2 className="h-4 w-4" /> Bank Account Management
            </CardTitle>
            <Dialog open={showAddBank} onOpenChange={setShowAddBank}>
              <DialogTrigger asChild>
                <Button size="sm" onClick={() => { setEditingBank(null); setBankForm({ accountName: "", bankName: "", accountNumber: "", ifscCode: "", branch: "" }); }}>
                  <Plus className="h-4 w-4 mr-2" /> Add Account
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingBank ? "Edit Bank Account" : "Add Bank Account"}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label>Account Name *</Label>
                    <Input
                      value={bankForm.accountName}
                      onChange={(e) => setBankForm({ ...bankForm, accountName: e.target.value })}
                      placeholder="e.g., Main Temple Account"
                    />
                  </div>
                  <div>
                    <Label>Bank Name *</Label>
                    <Input
                      value={bankForm.bankName}
                      onChange={(e) => setBankForm({ ...bankForm, bankName: e.target.value })}
                      placeholder="e.g., State Bank of India"
                    />
                  </div>
                  <div>
                    <Label>Account Number *</Label>
                    <Input
                      value={bankForm.accountNumber}
                      onChange={(e) => setBankForm({ ...bankForm, accountNumber: e.target.value })}
                      placeholder="Enter account number"
                    />
                  </div>
                  <div>
                    <Label>IFSC Code</Label>
                    <Input
                      value={bankForm.ifscCode}
                      onChange={(e) => setBankForm({ ...bankForm, ifscCode: e.target.value })}
                      placeholder="e.g., SBIN0001234"
                    />
                  </div>
                  <div>
                    <Label>Branch</Label>
                    <Input
                      value={bankForm.branch}
                      onChange={(e) => setBankForm({ ...bankForm, branch: e.target.value })}
                      placeholder="Branch name"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1" onClick={() => setShowAddBank(false)}>
                    Cancel
                  </Button>
                  <Button className="flex-1" onClick={editingBank ? handleUpdateBank : handleAddBank}>
                    {editingBank ? "Update" : "Add"} Account
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Account Name</TableHead>
                <TableHead>Bank Name</TableHead>
                <TableHead>Account Number</TableHead>
                <TableHead>IFSC Code</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bankAccounts.map(account => (
                <TableRow key={account.id}>
                  <TableCell className="font-medium">{account.accountName}</TableCell>
                  <TableCell>{account.bankName}</TableCell>
                  <TableCell className="font-mono text-xs">{account.accountNumber}</TableCell>
                  <TableCell className="font-mono text-xs">{account.ifscCode}</TableCell>
                  <TableCell>{account.branch}</TableCell>
                  <TableCell>
                    {account.isPrimary ? (
                      <Badge variant="default">Primary</Badge>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSetPrimary(account.id)}
                        className="text-xs"
                      >
                        Set Primary
                      </Button>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEditBank(account)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      {!account.isPrimary && (
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteBank(account.id)}>
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Tax Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <CreditCard className="h-4 w-4" /> Tax Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>GST Number</Label>
              <Input
                value={taxInfo.gstNumber}
                onChange={(e) => setTaxInfo({ ...taxInfo, gstNumber: e.target.value })}
                placeholder="29ABCDE1234F1Z5"
              />
            </div>
            <div>
              <Label>PAN Number</Label>
              <div className="flex items-center gap-2">
                <Input
                  value={taxInfo.panNumber}
                  onChange={(e) => setTaxInfo({ ...taxInfo, panNumber: e.target.value })}
                  placeholder="ABCDE1234F"
                  maxLength={10}
                />
                {panVerified ? (
                  <Badge variant="default" className="gap-1">
                    <CheckCircle2 className="h-3 w-3" /> Verified
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="gap-1">
                    <XCircle className="h-3 w-3" /> Not Verified
                  </Badge>
                )}
              </div>
              {!panVerified && (
                <Button variant="outline" size="sm" className="mt-2" onClick={handleVerifyPAN}>
                  Verify PAN
                </Button>
              )}
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>TAN Number</Label>
              <Input
                value={taxInfo.tanNumber}
                onChange={(e) => setTaxInfo({ ...taxInfo, tanNumber: e.target.value })}
                placeholder="Enter TAN number"
              />
            </div>
            <div>
              <Label>Other Tax IDs</Label>
              <Input
                value={taxInfo.otherTaxIds}
                onChange={(e) => setTaxInfo({ ...taxInfo, otherTaxIds: e.target.value })}
                placeholder="Enter other tax identification numbers"
              />
            </div>
          </div>
          <Button onClick={handleSaveTaxInfo}>Save Tax Information</Button>
        </CardContent>
      </Card>

      {/* Financial Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Calendar className="h-4 w-4" /> Financial Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Default Currency</Label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="INR">Indian Rupee (₹)</SelectItem>
                  <SelectItem value="USD">US Dollar ($)</SelectItem>
                  <SelectItem value="EUR">Euro (€)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Financial Year</Label>
              <Select value={financialYear} onValueChange={setFinancialYear}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2023-2024">2023-2024</SelectItem>
                  <SelectItem value="2024-2025">2024-2025</SelectItem>
                  <SelectItem value="2025-2026">2025-2026</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={() => toast.success("Financial settings saved")}>Save Settings</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinanceSettings;
