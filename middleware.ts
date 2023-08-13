import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'; // load this before NextResponse/NextRequest or there will be build errors
import { NextResponse, userAgent } from 'next/server';
import type { NextRequest } from 'next/server';
import { Database } from './lib/database.types';


export async function middleware(req: NextRequest) : Promise<NextResponse> {
  const { isBot } = userAgent(req);
  const { pathname } = req.nextUrl;

  // needs to go first cus the others won't redirect
  // if (req.nextUrl.pathname.startsWith('/.well-known/change-password')) {
  //   const changePasswordUrl = new URL('/login', req.url);
  //   return NextResponse.redirect(changePasswordUrl);
  // }

  // Refresh the user's session
  const res = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({ req, res });
  const { data: { session } } = await supabase.auth.getSession();

  return res;
}
