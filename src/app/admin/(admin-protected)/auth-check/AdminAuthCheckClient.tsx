// app/admin/auth-check/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AdminAuthCheck() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const refreshAuth = async () => {
      try {
        const res = await fetch("/api/auth/admin/refresh", {
          method: "POST",
          credentials: "include",
        });

        if (res.ok) {
          // Get the redirect URL from query params or default to dashboard
          const redirectTo = searchParams.get("redirect") || "/admin/dashboard";
          router.push(redirectTo);
        } else {
          // Refresh failed, redirect to login
          router.push("/admin/login");
        }
      } catch (error) {
        console.error("Auth refresh error:", error);
        router.push("/admin/login");
      }
    };

    refreshAuth();
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Verifying your session...</p>
      </div>
    </div>
  );
}