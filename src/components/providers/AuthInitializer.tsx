"use client";

import { useAuth } from "@/hooks/useAuth";
import { useEffect, useRef } from "react";

export function AuthInitializer({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { checkAuth, isInitialized } = useAuth();
  const hasInitialized = useRef(false);

  useEffect(() => {
    // Executar apenas uma vez
    if (!hasInitialized.current && !isInitialized) {
      hasInitialized.current = true;
      checkAuth();
    }
  }, [checkAuth, isInitialized]);

  return <>{children}</>;
}
