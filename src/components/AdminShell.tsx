"use client";

import { usePathname } from "next/navigation";
import { AdminNav } from "@/components/AdminNav";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname === "/admin/login";

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
