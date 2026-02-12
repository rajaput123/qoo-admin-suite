import { useSyncExternalStore } from "react";
import { donationSelectors, getDonationsState, subscribeDonationsStore } from "./donationsStore";

export function useDonationsState() {
  return useSyncExternalStore(subscribeDonationsStore, getDonationsState, getDonationsState);
}

export function useDonors() {
  return useSyncExternalStore(subscribeDonationsStore, donationSelectors.getDonors, donationSelectors.getDonors);
}

export function useDonations() {
  return useSyncExternalStore(subscribeDonationsStore, donationSelectors.getDonations, donationSelectors.getDonations);
}

export function useAllocations() {
  return useSyncExternalStore(subscribeDonationsStore, donationSelectors.getAllocations, donationSelectors.getAllocations);
}

export function useCertificates80G() {
  return useSyncExternalStore(subscribeDonationsStore, donationSelectors.getCertificates, donationSelectors.getCertificates);
}

export function useDonationAudit() {
  return useSyncExternalStore(subscribeDonationsStore, donationSelectors.getAudit, donationSelectors.getAudit);
}

