import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_to_a_strong_secret';
const COOKIE_NAME = process.env.COOKIE_NAME || 'token';

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // 1️⃣ Routes publiques côté pages
  if (path === '/login' || path.startsWith('/public')) {
    return NextResponse.next();
  }

  // 2️⃣ Routes publiques côté API
  if (path === '/api/auth/login') {
    return NextResponse.next();
  }

  // 3️⃣ Lecture du cookie JWT
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as IToken;

    // 4️⃣ Pages spéciales accessibles uniquement avec JWT temporaire
    if ((path.startsWith('/verify') || path.startsWith('/reset-password')) && payload.type !== 'temp') {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    // 5️⃣ Pages admin → require role=admin et type=sec
    if (path.startsWith('/admin')) {
      if (payload.role !== 'admin' || payload.type !== 'sec') {
        return NextResponse.redirect(new URL('/unauthorized', req.url));
      }
    }

    // 6️⃣ Toutes les autres routes protégées → require type=sec
    if (!path.startsWith('/verify') && !path.startsWith('/reset-password')) {
      if (payload.type !== 'sec') {
        return NextResponse.redirect(new URL('/login', req.url));
      }
    }

    return NextResponse.next();
  } catch (err) {
    console.error('JWT invalid:', err);
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)', // protège tout sauf assets
  ],
};
