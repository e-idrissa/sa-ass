import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose'; // <--- Importer jwtVerify de jose

// Les interfaces IToken doivent correspondre à la structure de votre payload JWT
interface IToken {
  sub: string;
  email: string;
  role: string;
  type?: string; // Assurez-vous que c'est correct
  // ... autres champs de votre payload
}

const JWT_SECRET = process.env.JWT_SECRET; // N'oubliez pas de définir cette variable d'environnement

// Assurez-vous que JWT_SECRET est défini
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not defined.');
}

// Convertir le secret en un format compatible avec jose (Uint8Array)
// C'est important que ce soit la même chaîne que celle utilisée pour signer le token
const encodedSecret = new TextEncoder().encode(JWT_SECRET);

const COOKIE_NAME = process.env.COOKIE_NAME || 'auth_token'; // J'ai renommé pour correspondre à nos conventions

export async function middleware(req: NextRequest) { // <--- Le middleware doit être async
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
  const type = req.cookies.get('type')?.value;
  console.log(token);
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    // Utiliser jwtVerify de jose
    const { payload } = await jwtVerify(token, encodedSecret, {
      // Vous pouvez ajouter des options de validation ici si nécessaire, par exemple:
      // issuer: 'urn:example:issuer',
      // audience: 'urn:example:audience',
    });
    console.log(payload);

    const parsedPayload: IToken = {
      sub: payload.sub!,
      email: payload.email as string,
      role: payload.role as string,
      type: type,
    }; // Caster le payload pour votre interface
    console.log(parsedPayload);

    // 4️⃣ Pages spéciales accessibles uniquement avec JWT temporaire
    if ((path.startsWith('/verify') || path.startsWith('/reset-password')) && parsedPayload.type !== 'temp') {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    // 5️⃣ Pages admin → require role=admin et type=auth
    if (path.startsWith('/admin')) {
      if (parsedPayload.role !== 'admin' || parsedPayload.type !== 'auth') {
        return NextResponse.redirect(new URL('/unauthorized', req.url));
      }
    }

    // 6️⃣ Toutes les autres routes protégées → require type=auth
    if (!path.startsWith('/verify') && !path.startsWith('/reset-password')) {
      if (parsedPayload.type !== 'auth') {
        return NextResponse.redirect(new URL('/login', req.url));
      }
    }

    return NextResponse.next();
  } catch (err) {
    console.error('JWT verification failed:', err); // Message d'erreur plus clair
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)', // protège tout sauf assets
  ],
};