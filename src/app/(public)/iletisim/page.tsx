import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { SpeechBubble } from "@/components/SpeechBubble";
import { getSettings } from "@/lib/db";

export const metadata: Metadata = { title: "İletişim" };

export default function ContactPage() {
  const settings = getSettings();

  return (
    <div className="site-shell py-16 md:py-20">
      <SpeechBubble label="İletişim">
        <h1 className="type-h1">İletişim</h1>
        <p className="mt-3 type-lead">{settings.contact_blurb}</p>
        <div className="mt-8">
          <ContactForm />
        </div>
      </SpeechBubble>
    </div>
  );
}
