import { getDonationsState } from "@/modules/donations/donationsStore";
import { financeActions, financeSelectors } from "./financeStore";
import { toast } from "sonner";

export const financeIntegration = {
    syncDonationsToLedger: () => {
        try {
            // 1. Get all donations
            const allDonations = getDonationsState().donations;

            // 2. Get existing transactions
            const existingTxns = financeSelectors.getTransactions();
            const processedIds = new Set(existingTxns.map(t => t.referenceId));

            // 3. Filter for unposted donations
            const newDonations = allDonations.filter(d =>
                d.status === "Recorded" && !processedIds.has(d.donationId)
            );

            if (newDonations.length === 0) {
                return 0;
            }

            // 4. Create Transactions
            let count = 0;
            newDonations.forEach(donation => {
                // Determine Credit Account (Income)
                let incomeAccountId = "I-4001"; // General Donations
                // Map purpose/channel to accounts
                if (donation.channel === "Cash") incomeAccountId = "I-4002"; // Hundi/Cash
                if (donation.purpose.includes("Seva")) incomeAccountId = "I-4003";
                if (donation.purpose.includes("Project")) incomeAccountId = "I-4004";

                // Determine Debit Account (Asset)
                let assetAccountId = "A-1001"; // Cash on Hand
                if (donation.channel === "Bank Transfer" || donation.channel === "UPI" || donation.channel === "Online") {
                    assetAccountId = "A-1003"; // SBI Main (Default for bank)
                }

                financeActions.postTransaction({
                    date: donation.date,
                    description: `Donation from ${donation.donorName} (${donation.purpose})`,
                    referenceId: donation.donationId,
                    referenceType: "Donation",
                    entries: [
                        { accountId: assetAccountId, debit: donation.amount, credit: 0 },
                        { accountId: incomeAccountId, debit: 0, credit: donation.amount },
                    ],
                    createdBy: "System Integration"
                });
                count++;
            });

            return count;
        } catch (e) {
            console.error("Sync failed", e);
            throw e;
        }
    }
};
