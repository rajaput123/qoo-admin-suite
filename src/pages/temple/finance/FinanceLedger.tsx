import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Filter, Download, ChevronDown, ChevronUp } from "lucide-react";
import { financeSelectors } from "@/modules/finance/financeStore";
import { Transaction } from "@/modules/finance/types";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

const TransactionRow = ({ transaction, accounts }: { transaction: Transaction, accounts: any[] }) => {
    const [expanded, setExpanded] = useState(false);

    const getAccountName = (id: string) => accounts.find(a => a.id === id)?.name || id;

    return (
        <>
            <TableRow className="cursor-pointer hover:bg-muted/50" onClick={() => setExpanded(!expanded)}>
                <TableCell className="font-mono text-xs">{transaction.date}</TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground">{transaction.id}</TableCell>
                <TableCell className="font-medium">{transaction.description}</TableCell>
                <TableCell>
                    {transaction.referenceId && (
                        <Badge variant="outline" className="text-xs font-normal">
                            {transaction.referenceType}: {transaction.referenceId}
                        </Badge>
                    )}
                </TableCell>
                <TableCell className="text-right font-mono text-xs">
                    ₹{transaction.entries.reduce((s, e) => s + e.debit, 0).toLocaleString()}
                </TableCell>
                <TableCell className="text-center">
                    <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 hover:bg-green-100 border-none">
                        {transaction.status}
                    </Badge>
                </TableCell>
                <TableCell>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </Button>
                </TableCell>
            </TableRow>
            {expanded && (
                <TableRow className="bg-muted/30 hover:bg-muted/30">
                    <TableCell colSpan={7} className="p-0">
                        <div className="p-4 pl-12 border-b">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-none hover:bg-transparent">
                                        <TableHead className="py-1 h-8 text-xs">Account</TableHead>
                                        <TableHead className="py-1 h-8 text-xs text-right">Debit</TableHead>
                                        <TableHead className="py-1 h-8 text-xs text-right">Credit</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {transaction.entries.map((entry, idx) => (
                                        <TableRow key={idx} className="border-none hover:bg-transparent">
                                            <TableCell className="py-1 text-sm">{getAccountName(entry.accountId)}
                                                <span className="text-xs text-muted-foreground ml-2 font-mono">({entry.accountId})</span>
                                            </TableCell>
                                            <TableCell className="py-1 text-right font-mono text-sm">{entry.debit > 0 ? `₹${entry.debit.toLocaleString()}` : "-"}</TableCell>
                                            <TableCell className="py-1 text-right font-mono text-sm">{entry.credit > 0 ? `₹${entry.credit.toLocaleString()}` : "-"}</TableCell>
                                        </TableRow>
                                    ))}
                                    <TableRow className="border-t hover:bg-transparent font-medium">
                                        <TableCell className="py-2 text-xs">Total</TableCell>
                                        <TableCell className="py-2 text-right font-mono text-xs">₹{transaction.entries.reduce((s, e) => s + e.debit, 0).toLocaleString()}</TableCell>
                                        <TableCell className="py-2 text-right font-mono text-xs">₹{transaction.entries.reduce((s, e) => s + e.credit, 0).toLocaleString()}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            <div className="mt-2 text-xs text-muted-foreground flex gap-4">
                                <span>Created by: {transaction.createdBy}</span>
                                <span>Posted at: {new Date(transaction.postedAt || "").toLocaleString()}</span>
                            </div>
                        </div>
                    </TableCell>
                </TableRow>
            )}
        </>
    );
};

const FinanceLedger = () => {
    const transactions = financeSelectors.getTransactions();
    const accounts = financeSelectors.getAccounts();
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const filtered = transactions.filter(t =>
        t.description.toLowerCase().includes(search.toLowerCase()) ||
        t.id.toLowerCase().includes(search.toLowerCase()) ||
        t.referenceId?.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const paginatedTransactions = filtered.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">General Ledger</h1>
                    <p className="text-muted-foreground">Immutable record of all financial transactions</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="gap-2"><Filter className="h-4 w-4" /> Filter</Button>
                    <Button variant="outline" className="gap-2"><Download className="h-4 w-4" /> Export</Button>
                </div>
            </div>

            <Card>
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <CardTitle>Journal Entries</CardTitle>
                        <div className="relative w-64">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search ledger..." value={search} onChange={e => setSearch(e.target.value)} className="pl-8" />
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Txn ID</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Reference</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                                <TableHead className="text-center">Status</TableHead>
                                <TableHead className="w-[50px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filtered.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center h-24 text-muted-foreground">No transactions found</TableCell>
                                </TableRow>
                            ) : (
                                paginatedTransactions.map(t => (
                                    <TransactionRow key={t.id} transaction={t} accounts={accounts} />
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {totalPages > 1 && (
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            />
                        </PaginationItem>
                        {Array.from({ length: totalPages }).map((_, i) => (
                            <PaginationItem key={i}>
                                <PaginationLink
                                    isActive={currentPage === i + 1}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className="cursor-pointer"
                                >
                                    {i + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem>
                            <PaginationNext
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}
        </motion.div>
    );
};

export default FinanceLedger;
