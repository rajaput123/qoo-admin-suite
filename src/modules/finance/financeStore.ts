import { FinanceState, FinanceAccount, Transaction, Fund, BankAccount, TransactionStatus } from "./types";
// import { donationsStore } from "@/modules/donations/donationsStore"; // Placeholder for integration

const LS_KEY = "qoo.finance.v1";

function nowIso() {
    return new Date().toISOString();
}

function isoDate(d = new Date()) {
    return d.toISOString().slice(0, 10);
}

function nextTransactionId(state: FinanceState) {
    // TXN-YYYY-NNNN
    const prefix = `TXN-${new Date().getFullYear()}-`;
    const existing = state.transactions.map(t => t.id).filter(id => id.startsWith(prefix));
    const max = existing.reduce((m, id) => Math.max(m, Number(id.replace(prefix, ""))), 0);
    return `${prefix}${String(max + 1).padStart(5, "0")}`;
}

// Seed Chart of Accounts
function seedAccounts(): FinanceAccount[] {
    return [
        // Assets (1000-1999)
        { id: "A-1000", code: "1000", name: "Assets", type: "Asset", balance: 0, isSystem: true },
        { id: "A-1001", code: "1001", name: "Cash on Hand", type: "Asset", parentAccount: "A-1000", balance: 15000, isSystem: true },
        { id: "A-1002", code: "1002", name: "Bank Accounts", type: "Asset", parentAccount: "A-1000", balance: 0, isSystem: true },
        { id: "A-1003", code: "1003", name: "SBI Main Account", type: "Asset", parentAccount: "A-1002", balance: 2500000, isSystem: true },
        { id: "A-1004", code: "1004", name: "HDFC Project Account", type: "Asset", parentAccount: "A-1002", balance: 1000000, isSystem: true },

        // Liabilities (2000-2999)
        { id: "L-2000", code: "2000", name: "Liabilities", type: "Liability", balance: 0, isSystem: true },
        { id: "L-2001", code: "2001", name: "Vendor Payables", type: "Liability", parentAccount: "L-2000", balance: 50000, isSystem: true },

        // Equity / Funds (3000-3999)
        { id: "E-3000", code: "3000", name: "Funds & Equity", type: "Equity", balance: 0, isSystem: true },
        { id: "E-3001", code: "3001", name: "General Fund", type: "Equity", parentAccount: "E-3000", balance: 2500000, isSystem: true },
        { id: "E-3002", code: "3002", name: "Building Fund", type: "Equity", parentAccount: "E-3000", balance: 915000, isSystem: true },

        // Income (4000-4999)
        { id: "I-4000", code: "4000", name: "Income", type: "Income", balance: 0, isSystem: true },
        { id: "I-4001", code: "4001", name: "General Donations", type: "Income", parentAccount: "I-4000", balance: 0, isSystem: true },
        { id: "I-4002", code: "4002", name: "Hundi Collection", type: "Income", parentAccount: "I-4000", balance: 0, isSystem: true },
        { id: "I-4003", code: "4003", name: "Seva Revenue", type: "Income", parentAccount: "I-4000", balance: 0, isSystem: true },
        { id: "I-4004", code: "4004", name: "Project Donations", type: "Income", parentAccount: "I-4000", balance: 0, isSystem: true },

        // Expenses (5000-5999)
        { id: "X-5000", code: "5000", name: "Expenses", type: "Expense", balance: 0, isSystem: true },
        { id: "X-5001", code: "5001", name: "Annadanam", type: "Expense", parentAccount: "X-5000", balance: 0, isSystem: true },
        { id: "X-5002", code: "5002", name: "Maintenance", type: "Expense", parentAccount: "X-5000", balance: 0, isSystem: true },
        { id: "X-5003", code: "5003", name: "Priest Honorariums", type: "Expense", parentAccount: "X-5000", balance: 0, isSystem: true },
        { id: "X-5004", code: "5004", name: "Festival Expenses", type: "Expense", parentAccount: "X-5000", balance: 0, isSystem: true },
        { id: "X-5005", code: "5005", name: "Construction", type: "Expense", parentAccount: "X-5000", balance: 0, isSystem: true },
    ];
}

function seedFunds(): Fund[] {
    return [
        { id: "F-001", name: "General Fund", type: "General", balance: 2500000, status: "Active", description: "Unrestricted funds for general operations" },
        { id: "F-002", name: "Gopuram Renovation", type: "Restricted", balance: 915000, status: "Active", description: "Earmarked for Gopuram construction" },
        { id: "F-003", name: "Annadanam Corpus", type: "Endowment", balance: 5000000, status: "Active", description: "Interest used for daily feeding" },
    ];
}

function seedState(): FinanceState {
    const accounts = seedAccounts();
    const funds = seedFunds();
    return {
        accounts,
        transactions: [],
        funds,
        bankAccounts: [
            { id: "B-001", name: "SBI Main", bankName: "State Bank of India", accountNumber: "XXXX1234", ifsc: "SBIN0001234", linkedLedgerAccountId: "A-1003", currentBalance: 2500000 },
            { id: "B-002", name: "HDFC Projects", bankName: "HDFC Bank", accountNumber: "XXXX5678", ifsc: "HDFC0005678", linkedLedgerAccountId: "A-1004", currentBalance: 1000000 },
        ],
    };
}

// Singleton Store
let stateCache: FinanceState | null = null;
const listeners = new Set<() => void>();

function emit() {
    listeners.forEach(l => l());
}

function persist() {
    try {
        localStorage.setItem(LS_KEY, JSON.stringify(stateCache));
    } catch { }
}

export function getFinanceState(): FinanceState {
    if (stateCache) return stateCache;
    const fromLS = typeof window !== "undefined" ? localStorage.getItem(LS_KEY) : null;
    stateCache = fromLS ? JSON.parse(fromLS) : seedState();
    return stateCache!;
}

export function subscribeFinanceStore(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
}

function setState(next: FinanceState) {
    stateCache = next;
    persist();
    emit();
}

// Calculate account balances from transactions
// This function re-calculates all account balances to ensure integrity
function recalculateBalances(state: FinanceState): FinanceState {
    const newAccounts = state.accounts.map(a => ({ ...a, balance: 0 }));
    const balanceMap = new Map<string, number>();

    // Initialize with system opening balances (for simplicity in this mock, we kept hardcoded balances in seed, 
    // but ideally everything should come from opening balance transactions. We'll add opening balances to the map)
    // For this v1, we will trust the transaction log + Initial Seed as "Zero" base + explicit Opening Balance transaction if needed.
    // Actually, let's keep it simple: Transaction log is the source of truth.
    // We will assume the seed balances are "Opening Balances" that should be represented by an initial transaction, 
    // but to keep it simple, we'll just sum transactions.
    // Correction: To support the seed data provided, we should treat seed balances as "Opening Balance".

    state.transactions.filter(t => t.status === "Posted").forEach(t => {
        t.entries.forEach(entry => {
            const current = balanceMap.get(entry.accountId) || 0;
            // Asset/Expense: Debit increases, Credit decreases
            // Liability/Equity/Income: Credit increases, Debit decreases
            // We will store raw "Debit - Credit" and interpret based on type later for display?
            // Standard Ledger: 
            // Assets: Debit is positive
            // Liabilities: Credit is positive
            // Income: Credit is positive
            // Expense: Debit is positive
            // Equity: Credit is positive

            const account = state.accounts.find(a => a.id === entry.accountId);
            if (!account) return;

            if (["Asset", "Expense"].includes(account.type)) {
                balanceMap.set(entry.accountId, current + entry.debit - entry.credit);
            } else {
                balanceMap.set(entry.accountId, current + entry.credit - entry.debit);
            }
        });
    });

    // Update state with computed balances
    // Note: mixing seed balance + transaction delta for now. 
    // Real implementation would have "Opening Balance" transaction.
    const updatedAccounts = state.accounts.map(a => ({
        ...a,
        balance: (a.isSystem && a.balance > 0 ? a.balance : 0) + (balanceMap.get(a.id) || 0)
    }));

    return { ...state, accounts: updatedAccounts };
}

export const financeActions = {
    // Post a Journal Entry (Double Entry)
    postTransaction(input: {
        description: string;
        entries: { accountId: string; debit: number; credit: number }[];
        referenceId?: string;
        referenceType?: Transaction["referenceType"];
        date?: string;
        createdBy?: string;
    }) {
        const st = getFinanceState();

        // Validate: Total Debit must equal Total Credit
        const totalDebit = input.entries.reduce((sum, e) => sum + e.debit, 0);
        const totalCredit = input.entries.reduce((sum, e) => sum + e.credit, 0);

        if (Math.abs(totalDebit - totalCredit) > 0.01) {
            throw new Error(`Transaction unbalanced: Debit ${totalDebit} != Credit ${totalCredit}`);
        }

        const transaction: Transaction = {
            id: nextTransactionId(st),
            date: input.date ?? isoDate(),
            description: input.description,
            entries: input.entries,
            referenceId: input.referenceId,
            referenceType: input.referenceType,
            status: "Posted",
            createdBy: input.createdBy ?? "System",
            createdAt: nowIso(),
            postedAt: nowIso(),
        };

        const nextState = {
            ...st,
            transactions: [transaction, ...st.transactions],
        };

        // Recalculate balances
        const finalizedState = recalculateBalances(nextState);
        setState(finalizedState);
        return transaction;
    },

    // Add a new Account to COA
    addAccount(input: Omit<FinanceAccount, "id" | "balance" | "isSystem">) {
        const st = getFinanceState();
        // Simple ID generation
        const id = `${input.type.charAt(0)}-${input.code}`;
        if (st.accounts.find(a => a.id === id)) {
            throw new Error("Account code already exists");
        }

        const account: FinanceAccount = {
            ...input,
            id,
            balance: 0,
            isSystem: false,
        };

        setState({ ...st, accounts: [...st.accounts, account] });
        return account;
    },
};

export const financeSelectors = {
    getAccounts: () => getFinanceState().accounts,
    getTransactions: () => getFinanceState().transactions,
    getFunds: () => getFinanceState().funds,
    getBankAccounts: () => getFinanceState().bankAccounts,
    getAccountById: (id: string) => getFinanceState().accounts.find(a => a.id === id),
    getTrialBalance: () => {
        // Return all accounts with non-zero balance
        return getFinanceState().accounts.filter(a => a.balance !== 0);
    }
};
