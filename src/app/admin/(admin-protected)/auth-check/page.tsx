// app/admin/auth-check/page.tsx
import { Suspense } from "react";
import AdminAuthCheckClient from "./AdminAuthCheckClient";

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <AdminAuthCheckClient />
    </Suspense>
  );
}

function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <p className="text-gray-600">Preparing authentication…</p>
    </div>
  );
}
