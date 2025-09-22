"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import React from "react";

export function AuthGuard({
  children,
  redirectTo = "/auth/login",
}: Readonly<{ children: React.ReactNode; redirectTo?: string }>) {
  const { isInitialized, isLoading, user } = useAuth();
  const router = useRouter();

  // Mostrar loading enquanto está verificando a autenticação
  if (!isInitialized || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!user) {
    router.replace(redirectTo);
    return null;
  }

  return <>{children}</>;
}
