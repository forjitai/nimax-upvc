import type { Metadata } from "next";
import { business } from "@/config/business";
import { PageHeader } from "@/components/PageHeader";
import { ContactDetails } from "@/components/ContactDetails";
import { EnquiryForm } from "@/components/EnquiryForm";

export const ensureStatic = "navigation";

export const metadata: Metadata = {
  title: `Contact ${business.name} | Call, WhatsApp, Directions`,
  description: `Call or WhatsApp ${business.name} on ${business.phones.map((p) => p.display).join(" or ")}. ${business.address.street}, ${business.address.city} ${business.address.postalCode}.`,
  alternates: { canonical: "/contact" },
  openGraph: { title: `Contact ${business.name}`, url: "/contact" },
};

const include = [
  "Which window types you need (for example sliding, casement or mesh windows), or UPVC profiles",
  "How many windows, and rough sizes if you know them",
  "Whether it is a new building or a replacement",
  "Your area in Bengaluru",
  "Photos of the openings, if you have them (send on WhatsApp)",
];

export default function ContactPage() {
  return (
    <>
      <PageHeader crumbs={[{ label: "Contact Us", href: "/contact" }]} eyebrow="Contact us" title={`Contact ${business.name}`}
        lead="Call or WhatsApp either number, visit us, or send your requirement using the form." />
      <section aria-label="Contact details and enquiry form" className="nx-container grid gap-10 py-14 lg:grid-cols-[1fr_1.5fr]">
        <div className="min-w-0">
          <h2 className="nx-h3 mb-4">Phone, WhatsApp and address</h2>
          <ContactDetails />
        </div>
        <div className="min-w-0">
          <h2 className="nx-h3 mb-4">Send an enquiry</h2>
          <EnquiryForm />
          <div className="mt-8 rounded-brand-lg border border-line bg-bg-alt p-6">
            <h3 className="font-semibold text-heading">To get an accurate quotation, tell us:</h3>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[0.95rem]">
              {include.map((i) => <li key={i}>{i}</li>)}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
