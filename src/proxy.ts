// middleware.ts (Next.js 16 Compatible)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Only run for admin routes
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  console.log("🔍 Middleware triggered for:", pathname);

  // Get cookies
  const accessToken = request.cookies.get("adminAccessToken")?.value;
  const refreshToken = request.cookies.get("adminRefreshToken")?.value;

  console.log("🍪 Access Token exists:", !!accessToken);
  console.log("🍪 Refresh Token exists:", !!refreshToken);

  // Handle login page
  if (pathname === "/admin/login") {
    console.log("📍 On login page");

    if (accessToken) {
      try {
        // Dynamic import for jsonwebtoken to avoid edge runtime issues
        const jwt = await import("jsonwebtoken");
        const decoded = jwt.verify(
          accessToken,
          process.env.ACCESS_TOKEN_SECRET!
        ) as any;
        console.log("✅ Access token valid, role:", decoded.role);

        if (["admin", "superadmin"].includes(decoded.role)) {
          console.log("↪️  Redirecting to dashboard");
          return NextResponse.redirect(
            new URL("/admin/dashboard", request.url)
          );
        }
      } catch (e) {
        console.log("❌ Access token invalid:", e);

        if (refreshToken) {
          try {
            const jwt = await import("jsonwebtoken");
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!);
            console.log("✅ Refresh token valid, redirecting to auth-check");
            return NextResponse.redirect(
              new URL(
                "/admin/auth-check?redirect=/admin/dashboard",
                request.url
              )
            );
          } catch (refreshError) {
            console.log("❌ Refresh token also invalid");
          }
        }
      }
    } else if (refreshToken) {
      console.log("🔄 No access token but has refresh token");
      try {
        const jwt = await import("jsonwebtoken");
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!);
        console.log("✅ Refresh token valid, redirecting to auth-check");
        return NextResponse.redirect(
          new URL("/admin/auth-check?redirect=/admin/dashboard", request.url)
        );
      } catch (e) {
        console.log("❌ Refresh token invalid");
      }
    }

    console.log("➡️  No valid tokens, allowing login page");
    return NextResponse.next();
  }

  // Skip auth check for auth-check page
  if (pathname === "/admin/auth-check") {
    console.log("📍 On auth-check page, allowing");
    return NextResponse.next();
  }

  console.log("📍 On protected route:", pathname);

  // For all other admin routes, check authentication
  if (!accessToken) {
    console.log("⚠️  No access token");
    if (refreshToken) {
      console.log("🔄 Redirecting to auth-check");
      return NextResponse.redirect(
        new URL(
          `/admin/auth-check?redirect=${encodeURIComponent(pathname)}`,
          request.url
        )
      );
    }
    console.log("🔒 No tokens, redirecting to login");
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // Verify access token
  try {
    const jwt = await import("jsonwebtoken");
    const decoded = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET!
    ) as any;
    console.log("✅ Access token valid, role:", decoded.role);

    if (!["admin", "superadmin"].includes(decoded.role)) {
      console.log("❌ Invalid role, redirecting to home");
      return NextResponse.redirect(new URL("/", request.url));
    }

    console.log("✅ All checks passed, allowing access");
    const response = NextResponse.next();
    response.headers.set("x-user-role", decoded.role);
    return response;
  } catch (e) {
    console.log("❌ Access token expired/invalid:", e);

    if (refreshToken) {
      console.log("🔄 Redirecting to auth-check");
      return NextResponse.redirect(
        new URL(
          `/admin/auth-check?redirect=${encodeURIComponent(pathname)}`,
          request.url
        )
      );
    }
    console.log("🔒 No refresh token, redirecting to login");
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
