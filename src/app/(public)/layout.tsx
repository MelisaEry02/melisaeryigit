import { PageSplash } from "@/components/PageSplash";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
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
    <>
      <PageSplash siteName={siteName} />
      <SiteHeader siteName={siteName} />
      <main>{children}</main>
      <SiteFooter
        siteName={siteName}
        social={{
          github: settings.social_github,
          linkedin: settings.social_linkedin,
          instagram: settings.social_instagram,
        }}
        cvUrl={settings.cv_url}
      />
    </>
  );
}
