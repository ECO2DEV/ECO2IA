import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
// This function can be marked `async` if using `await` inside

const secret = process.env.NEXTAUTH_SECRET;
export async function middleware(req) {
  const token = await getToken({ req, secret });
  // console.log('JSON Web Token', token);
  if (!token) {
    return NextResponse.redirect(new URL('/auth/signin', req.url));
  }
  // console.log('Middleware called', request);
  // return NextResponse.redirect(new URL('/auth/signin', request.url));

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/#pricing', '/pricing', '/profile', '/suscribe']
};
