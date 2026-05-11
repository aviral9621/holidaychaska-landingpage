import { LegalShell } from "@/components/LegalShell";

export const metadata = { title: "Refund & Cancellation Policy | Uttarakhand Tour Packages" };

export default function Refund() {
  return (
    <LegalShell title="Refund & Cancellation Policy" subtitle="Uttarakhand Tour Packages — A Holiday Chaska Company">
      <h2>1. Booking Confirmation</h2>
      <p>A booking is confirmed only after receipt of advance payment and written confirmation via email or WhatsApp from our team.</p>

      <h2>2. Cancellation by the Traveler</h2>
      <table>
        <thead>
          <tr><th>Cancellation Timeline</th><th>Refund Amount</th></tr>
        </thead>
        <tbody>
          <tr><td>30 or more days before departure</td><td>90% of total package</td></tr>
          <tr><td>15 to 29 days before departure</td><td>50% of total package</td></tr>
          <tr><td>7 to 14 days before departure</td><td>25% of total package</td></tr>
          <tr><td>Less than 7 days before departure</td><td>No refund</td></tr>
          <tr><td>No-show on departure date</td><td>No refund</td></tr>
        </tbody>
      </table>
      <p><em>GST at 5% and payment gateway charges are non-refundable in all cases.</em></p>

      <h2>3. Cancellation by Uttarakhand Tour Packages</h2>
      <p>If we cancel due to natural disaster, government-imposed travel restrictions, force majeure events, or circumstances beyond our control, you will receive either a <strong>full refund</strong> or the option to <strong>reschedule at no extra cost</strong>.</p>

      <h2>4. Amendments and Rescheduling</h2>
      <ul>
        <li>Date change 15+ days before departure: ₹500 amendment fee per person</li>
        <li>Date change within 15 days: treated as cancellation; cancellation charges apply</li>
        <li>Package upgrades: subject to availability and price difference</li>
      </ul>

      <h2>5. Non-Refundable Items</h2>
      <ul>
        <li>Flight tickets booked on traveler&apos;s behalf (subject to airline policy)</li>
        <li>Festival event tickets (Nanda Devi Mahotsav, etc.)</li>
        <li>Jungle safari permits (Jim Corbett National Park)</li>
        <li>Visa fees, if applicable</li>
      </ul>

      <h2>6. Refund Processing</h2>
      <p>Approved refunds are processed within <strong>7–10 business days</strong> to the original payment method. Bank transfer refunds may take an additional 3–5 business days.</p>

      <h2>7. How to Request a Cancellation</h2>
      <p>Send a written cancellation request to:</p>
      <ul>
        <li>Email: <a href="mailto:enquiry@holidaychaska.com">enquiry@holidaychaska.com</a></li>
        <li>WhatsApp: +91 97175 80259</li>
      </ul>
      <p>Include your booking reference number, full name, and travel date. We will acknowledge within 24 hours.</p>

      <h2>8. Dispute Resolution</h2>
      <p>Both parties agree to resolve disputes amicably. Unresolved disputes are subject to jurisdiction in Haldwani, Uttarakhand, India.</p>
    </LegalShell>
  );
}
