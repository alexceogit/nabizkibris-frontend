import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['tr', 'en', 'el'];
const defaultLocale = 'tr';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip internal paths
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') ||
    pathname.startsWith('/static')
  ) {
    return NextResponse.next();
  }

  // Check if pathname is missing a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Redirect if there is no locale
  const locale = defaultLocale;
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths
    '/((?!_next|api|static|.*\\..*).*)',
  ],
};
