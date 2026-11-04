"use client";

import { usePathname } from "next/navigation";

/** Rota değişiminde main içeriğe soft fade-in. */
export function PageFade({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="page-fade">
      {children}
    </div>
  );
}
