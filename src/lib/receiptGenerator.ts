import { Donation } from "@/modules/donations/types";
import { Donor } from "@/modules/donations/types";

/**
 * Generate receipt HTML for printing/downloading
 */
function generateReceiptHTML(
  donation: Donation,
  donor: Donor | null,
  is80G: boolean = false
): string {
  const formatCurrency = (val: number) => `₹${val.toLocaleString('en-IN')}`;
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const templeName = "Sri Venkateswara Temple";
  const templeAddress = "Tirumala, Chittoor District, Andhra Pradesh";
  const templePhone = "+91 877 223 1234";
  const templeEmail = "info@tirumala.org";

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Receipt ${donation.receiptNo}</title>
  <style>
    @media print {
      @page {
        size: A4;
        margin: 20mm;
      }
      body {
        margin: 0;
        padding: 0;
      }
    }
    body {
      font-family: Arial, sans-serif;
      max-width: 210mm;
      margin: 0 auto;
      padding: 20mm;
      color: #1f2937;
    }
    .header {
      text-align: center;
      border-bottom: 2px solid #d1d5db;
      padding-bottom: 16px;
      margin-bottom: 24px;
    }
    .header h1 {
      font-size: 28px;
      font-weight: bold;
      margin: 8px 0;
      color: #111827;
    }
    .header p {
      font-size: 14px;
      color: #4b5563;
      margin: 4px 0;
    }
    .receipt-info {
      display: flex;
      justify-content: space-between;
      margin-bottom: 24px;
    }
    .section {
      margin-bottom: 24px;
      border-bottom: 1px solid #e5e7eb;
      padding-bottom: 16px;
    }
    .section h2 {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 12px;
      color: #111827;
    }
    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      font-size: 14px;
    }
    .label {
      color: #6b7280;
      margin-bottom: 4px;
    }
    .value {
      font-weight: 600;
      color: #111827;
    }
    .amount-box {
      background-color: #f9fafb;
      padding: 16px;
      border-radius: 8px;
      margin-top: 16px;
    }
    .amount-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }
    .amount {
      font-size: 24px;
      font-weight: bold;
      color: #111827;
    }
    .footer {
      border-top: 2px solid #d1d5db;
      padding-top: 16px;
      margin-top: 24px;
      text-align: center;
      font-size: 12px;
      color: #6b7280;
    }
    .footer p {
      margin: 8px 0;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>${templeName}</h1>
    <p>${templeAddress}</p>
    <p>Phone: ${templePhone} | Email: ${templeEmail}</p>
    ${is80G ? `
    <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #e5e7eb;">
      <p style="font-size: 18px; font-weight: 600; color: #111827;">80G Tax Exemption Certificate</p>
      <p style="font-size: 12px; color: #6b7280;">Under Section 80G of the Income Tax Act, 1961</p>
    </div>
    ` : ''}
  </div>

  <div class="receipt-info">
    <div>
      <p class="label">Receipt No:</p>
      <p style="font-size: 18px; font-weight: bold; color: #111827;">${donation.receiptNo}</p>
    </div>
    <div style="text-align: right;">
      <p class="label">Date:</p>
      <p style="font-size: 18px; font-weight: 600; color: #111827;">${formatDate(donation.date)}</p>
    </div>
  </div>

  <div class="section">
    <h2>Donor Information</h2>
    <div class="grid">
      <div>
        <p class="label">Name:</p>
        <p class="value">${donation.donorName}</p>
      </div>
      ${donor?.phone && donor.phone !== "-" ? `
      <div>
        <p class="label">Phone:</p>
        <p class="value">${donor.phone}</p>
      </div>
      ` : ''}
      ${donor?.email && donor.email !== "-" ? `
      <div>
        <p class="label">Email:</p>
        <p class="value">${donor.email}</p>
      </div>
      ` : ''}
      ${donor?.city && donor.city !== "-" ? `
      <div>
        <p class="label">Address:</p>
        <p class="value">${donor.city}</p>
      </div>
      ` : ''}
      ${is80G && donor?.pan && donor.pan !== "-" ? `
      <div>
        <p class="label">PAN:</p>
        <p class="value">${donor.pan}</p>
      </div>
      ` : ''}
    </div>
  </div>

  <div class="section">
    <h2>Donation Details</h2>
    <div class="amount-box">
      <div class="amount-row">
        <span style="color: #6b7280;">Amount:</span>
        <span class="amount">${formatCurrency(donation.amount)}</span>
      </div>
      <div class="grid" style="margin-top: 16px;">
        <div>
          <p class="label">Purpose:</p>
          <p class="value">${donation.purpose}</p>
        </div>
        <div>
          <p class="label">Payment Mode:</p>
          <p class="value">${donation.channel}</p>
        </div>
        ${donation.referenceNo ? `
        <div>
          <p class="label">Reference No:</p>
          <p class="value">${donation.referenceNo}</p>
        </div>
        ` : ''}
        <div>
          <p class="label">Time:</p>
          <p class="value">${donation.time}</p>
        </div>
      </div>
    </div>
  </div>

  ${is80G ? `
  <div class="section">
    <p style="font-size: 14px; color: #6b7280; margin-bottom: 8px;">
      This donation is eligible for tax deduction under Section 80G of the Income Tax Act, 1961.
    </p>
    <p style="font-size: 12px; color: #9ca3af;">
      The donor is entitled to claim a deduction of 50% of the donation amount from their taxable income.
    </p>
  </div>
  ` : ''}

  <div class="footer">
    <p>This is a computer-generated receipt. No signature required.</p>
    <p>Thank you for your generous contribution. May the divine blessings be with you.</p>
    <p style="margin-top: 16px; color: #9ca3af; font-size: 11px;">
      Generated on ${new Date().toLocaleString('en-IN')}
    </p>
  </div>
</body>
</html>
  `;
}

/**
 * Download receipt as PDF (opens print dialog for saving as PDF)
 */
export function downloadReceipt(
  donation: Donation,
  donor: Donor | null,
  is80G: boolean = false
) {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    throw new Error('Unable to open print window. Please allow popups.');
  }

  const receiptHTML = generateReceiptHTML(donation, donor, is80G);
  
  printWindow.document.write(receiptHTML);
  printWindow.document.close();
  
  // Wait for content to load, then trigger print
  printWindow.onload = () => {
    setTimeout(() => {
      printWindow.print();
      // After print dialog closes, close the window
      setTimeout(() => {
        printWindow.close();
      }, 100);
    }, 250);
  };
}

/**
 * Print receipt directly
 */
export function printReceipt(
  donation: Donation,
  donor: Donor | null,
  is80G: boolean = false
) {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    throw new Error('Unable to open print window. Please allow popups.');
  }

  const receiptHTML = generateReceiptHTML(donation, donor, is80G);
  
  printWindow.document.write(receiptHTML);
  printWindow.document.close();
  
  printWindow.onload = () => {
    setTimeout(() => {
      printWindow.print();
    }, 250);
  };
}

/**
 * Generate PDF receipt and return file path (for storage)
 */
export async function generateReceiptPDF(
  donation: Donation,
  donor: Donor | null,
  is80G: boolean = false
): Promise<string> {
  // In a real implementation, this would:
  // 1. Generate PDF on server
  // 2. Store file on server/storage
  // 3. Return file path/URL
  
  // For now, we'll just return a file path
  // The actual PDF generation happens via downloadReceipt/printReceipt
  const filePath = `/receipts/${donation.receiptNo}.pdf`;
  return filePath;
}

/**
 * Send receipt via email (placeholder - would integrate with email service)
 */
export async function sendReceiptEmail(
  donation: Donation,
  donor: Donor | null,
  email: string,
  is80G: boolean = false
): Promise<void> {
  // In a real implementation, this would call an API endpoint
  // that sends the email with the receipt PDF attachment
  
  // For now, we'll use mailto as a fallback
  const subject = encodeURIComponent(`Donation Receipt ${donation.receiptNo}`);
  const body = encodeURIComponent(
    `Dear ${donation.donorName},\n\n` +
    `Thank you for your donation of ₹${donation.amount.toLocaleString('en-IN')}.\n\n` +
    `Receipt Number: ${donation.receiptNo}\n` +
    `Date: ${new Date(donation.date).toLocaleDateString('en-IN')}\n` +
    `Purpose: ${donation.purpose}\n\n` +
    `Please find the receipt attached.\n\n` +
    `With regards,\n` +
    `Temple Administration`
  );
  
  window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
}
