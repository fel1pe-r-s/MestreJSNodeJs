import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyJwt } from '@/lib/jwt';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value;

  // Protect /admin routes (except /admin/login)
  if (request.nextUrl.pathname.startsWith('/admin') && !request.nextUrl.pathname.startsWith('/admin/login')) {
    console.log('Middleware: Checking /admin route', request.nextUrl.pathname);
    console.log('Middleware: Token present?', !!token);
    
    if (!token) {
      console.log('Middleware: No token, redirecting to login');
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    const decoded = await verifyJwt(token);
    console.log('Middleware: Decoded token?', !!decoded);
    
    if (!decoded || (decoded as any).role !== 'admin_painel_total') {
      console.log('Middleware: Invalid token or role, redirecting to login');
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    console.log('Middleware: Auth successful');
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
