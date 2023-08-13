import 'server-only';

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import { headers, cookies } from 'next/headers';

// import type { Database } from '@/lib/database.types';
type Database = any;

export async function GET() {
  const supabase = createRouteHandlerClient<Database>({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  // So we don't have to check the dashboard more than every six months:
  // Limit users to 20 medications

  if (!session) {
    return NextResponse.json({ teaser: '/' });
  } else {
    return NextResponse.json({ teaser: '/something' });
  }
}
