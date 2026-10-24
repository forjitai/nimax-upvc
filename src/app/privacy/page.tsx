import type { Metadata } from "next";
import { business, telHref } from "@/config/business";
import { PageHeader } from "@/components/PageHeader";

export const ensureStatic = "navigation";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How the ${business.name} website handles the details you share in enquiries, calls and WhatsApp messages.`,
  alternates: { canonical: "/privacy" },
};

/*
 * Keep this page accurate. Update it whenever the website starts storing form
 * submissions, adds analytics, or sets cookies.
 */
export default function PrivacyPage() {
  return (
    <>
      <PageHeader crumbs={[{ label: "Privacy Policy", href: "/privacy" }]} title="Privacy policy"
        lead="Last updated 24 October 2026." />
      <article className="nx-container nx-prose space-y-8 py-14 text-[1.02rem]">
        <section>
          <h2 className="nx-h3">Who we are</h2>
          <p className="mt-2">This website belongs to {business.name}, {business.addressOneLine}.</p>
        </section>
        <section>
          <h2 className="nx-h3">Enquiries you send us</h2>
          <p className="mt-2">
            The enquiry form on this website does not store or send your details to our server. When you press
            &ldquo;Continue on WhatsApp&rdquo;, the details you typed (name, mobile number, product, location and requirement)
            are placed into a WhatsApp message to our number. Nothing is sent until you press Send in WhatsApp.
            WhatsApp&rsquo;s own privacy policy applies to messages sent through it.
          </p>
          <p className="mt-3">
            We use the details in your enquiry, call or message only to reply to you, prepare a quotation and carry out
            the work you ask for. We do not sell or share them for marketing.
          </p>
        </section>
        <section>
          <h2 className="nx-h3">Cookies and analytics</h2>
          <p className="mt-2">This website does not use advertising or analytics cookies. If that changes, this page will be updated first.</p>
        </section>
        <section>
          <h2 className="nx-h3">Hosting</h2>
          <p className="mt-2">
            The website is hosted by Vercel. Like most hosting providers, Vercel processes basic technical information such
            as IP addresses to deliver pages and protect the site from abuse.
          </p>
        </section>
        <section>
          <h2 className="nx-h3">Your choices</h2>
          <p className="mt-2">
            To ask what information we hold about you from an enquiry, or to have it deleted, call us on{" "}
            {business.phones.map((p, i) => (
              <span key={p.e164}>{i > 0 && " or "}<a href={telHref(p)} className="font-semibold text-primary underline">{p.display}</a></span>
            ))}.
          </p>
        </section>
      </article>
    </>
  );
}
