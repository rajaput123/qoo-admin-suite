
export type AccountType = "Asset" | "Liability" | "Equity" | "Income" | "Expense";
export type TransactionStatus = "Draft" | "Posted" | "Void";
export type FundType = "General" | "Restricted" | "Endowment" | "Project";

export interface FinanceAccount {
    id: string;
    code: string;
    name: string;
    type: AccountType;
    parentAccount?: string;
    description?: string;
    isSystem?: boolean; // Cannot be deleted
    balance: number; // Current balance (computed)
}

export interface Fund {
    id: string;
    name: string;
    type: FundType;
    description?: string;
    balance: number;
    startDate?: string;
    endDate?: string;
    status: "Active" | "Closed";
}

export interface LedgerEntry {
    accountId: string;
    debit: number;
    credit: number;
}

export interface Transaction {
    id: string;
    date: string;
    description: string;
    referenceId?: string; // Link to Donation ID, Expense ID, etc.
    referenceType?: "Donation" | "Expense" | "Payroll" | "Transfer" | "Adjustment";
    entries: LedgerEntry[];
    status: TransactionStatus;
    createdBy: string;
    createdAt: string;
    postedAt?: string;
}

export interface BankAccount {
    id: string;
    name: string;
    accountNumber: string;
    bankName: string;
    ifsc: string;
    linkedLedgerAccountId: string; // Link to specific Asset account
    currentBalance: number;
}

export interface FinanceState {
    accounts: FinanceAccount[];
    transactions: Transaction[];
    funds: Fund[];
    bankAccounts: BankAccount[];
}
