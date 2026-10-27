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
      <main>{children}</main>
      <SiteFooter
        siteName={siteName}
        social={{
          github: settings.social_github,
          linkedin: settings.social_linkedin,
          instagram: settings.social_instagram || SOCIAL.instagram,
          tiktok: SOCIAL.tiktok,
        }}
        cvUrl={settings.cv_url}
      />
    </ThemeProvider>
  );
}
