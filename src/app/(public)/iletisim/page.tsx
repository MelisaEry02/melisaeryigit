import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { getSettings } from "@/lib/db";

export const metadata: Metadata = { title: "İletişim" };

export default function ContactPage() {
  const settings = getSettings();

  return (
    <div className="site-shell py-16 md:py-20">
      <h1 className="font-display text-4xl text-ink md:text-5xl">İletişim</h1>
      <p className="mt-3 max-w-xl text-lg text-ink-soft">
        {settings.contact_blurb}
      </p>
      <div className="mt-12">
        <ContactForm />
      </div>
    </div>
  );
}
