import { PageFade } from "@/components/PageFade";
import { PageSplash } from "@/components/PageSplash";
import { ScrollAtmosphere } from "@/components/ScrollAtmosphere";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SOCIAL } from "@/components/SocialIcons";
import { getSettings } from "@/lib/db";

export const dynamic = "force-dynamic";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = getSettings();
  const siteName = settings.site_name || "Melisa Eryiğit";

  return (
    <ThemeProvider>
      <PageSplash siteName={siteName} />
      <ScrollAtmosphere />
      <SiteHeader siteName={siteName} />
      <main>
        <PageFade>{children}</PageFade>
      </main>
      <SiteFooter
        siteName={siteName}
        contact={{
          email: settings.contact_email || SOCIAL.email,
          phone: settings.contact_phone || SOCIAL.phone,
          location: settings.contact_location || SOCIAL.location,
          whatsapp: settings.social_whatsapp || SOCIAL.whatsapp,
          github: settings.social_github,
          linkedin: settings.social_linkedin,
          instagram: settings.social_instagram || SOCIAL.instagram,
          tiktok: settings.social_tiktok || SOCIAL.tiktok,
        }}
      />
    </ThemeProvider>
  );
}
