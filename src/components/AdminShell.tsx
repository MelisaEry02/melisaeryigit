"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { AdminNav } from "@/components/AdminNav";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname === "/admin/login";

  // Public PageSplash admin’de yok; boot kapak kalırsa login görünmez.
  useEffect(() => {
    document.documentElement.dataset.boot = "off";
    document.getElementById("me-boot-splash")?.setAttribute("data-done", "1");
  }, []);

  if (isLogin) {
    return <>{children}</>;
  }

  return (
    <div className="admin-shell min-h-screen">
      <AdminNav />
      <div className="min-w-0 p-5 md:p-8">{children}</div>
    </div>
  );
}
