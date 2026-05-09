import { LegalShell } from "@/components/LegalShell";

export const metadata = { title: "Terms & Conditions | Gujarat Tour Packages" };

export default function Terms() {
  return (
    <LegalShell title="Terms & Conditions" subtitle="Gujarat Tour Packages — A Holiday Chaska Company">
      <ul>
        <li>Use of this website constitutes acceptance of these terms.</li>
        <li>Inquiry submissions are <strong>not</strong> confirmed bookings. A booking is confirmed only after advance payment and written confirmation.</li>
        <li>Gujarat Tour Packages reserves the right to modify itineraries due to weather, road conditions, government restrictions, or force majeure events.</li>
        <li>Tour packages are operated by Holiday Chaska and its authorized partners.</li>
        <li>Governing law: Ahmedabad, Gujarat, India.</li>
        <li>Contact: <a href="mailto:enquiry@holidaychaska.com">enquiry@holidaychaska.com</a></li>
      </ul>
    </LegalShell>
  );
}
