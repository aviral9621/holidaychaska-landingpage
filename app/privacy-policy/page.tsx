import { LegalShell } from "@/components/LegalShell";

export const metadata = { title: "Privacy Policy | Gujarat Tour Packages" };

export default function PrivacyPolicy() {
  return (
    <LegalShell title="Privacy Policy" subtitle="Gujarat Tour Packages — A Holiday Chaska Company">
      <p>We collect: name, phone number, email address, travel dates, and trip preferences submitted via inquiry forms.</p>
      <p>We use this data only to: respond to your inquiry, plan your tour, and communicate via WhatsApp or email.</p>
      <p>We do <strong>not</strong>: sell your data to third parties, share it with advertisers, or store payment card details.</p>
      <p><strong>Cookies:</strong> We use Google Analytics cookies for anonymous usage analytics only. No personal data is tracked via cookies.</p>
      <p><strong>Data requests:</strong> Email <a href="mailto:enquiry@holidaychaska.com">enquiry@holidaychaska.com</a> to request data deletion or access.</p>
    </LegalShell>
  );
}
