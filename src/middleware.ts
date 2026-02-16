import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["el", "en"];
const defaultLocale = "el";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ελέγχουμε αν το pathname έχει ήδη τη γλώσσα (el ή en)
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return;

  // Αν δεν την έχει, κάνουμε redirect στην default γλώσσα (el)
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Εξαιρούμε τα αρχεία (εικόνες, favicon κλπ) για να μην κάνει redirect σε αυτά
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
