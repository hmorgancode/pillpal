import 'server-only';
import './globals.scss';

import { cache } from 'react';
import type { ReactNode } from 'react';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Metadata } from 'next';
import { Plus_Jakarta_Sans, Staatliches } from 'next/font/google';
import { SupabaseProvider } from './SupabaseProvider';

// import type { Database } from '@/lib/database.types';
type Database = any;

export const metadata: Metadata = {
  title: {
    template: '%s | PillPal',
    default: 'PillPal',
  },
  description: 'Support and accountability for prescription medication scheduling',
  colorScheme: 'light',
  applicationName: 'PillPal',
  // referrer: 'origin-when-cross-origin',
  appleWebApp: {
    title: 'PillPal',
    statusBarStyle: 'black-translucent',
  },
};

// import { config } from '@fortawesome/fontawesome-svg-core';
// So that font-awesome won't try to insert <style>s into the <head>. (next prevents this anyways)
// config.autoAddCss = false;

// const plusJakartaSans = Plus_Jakarta_Sans({
//   style: 'normal', // 'italic'
//   subsets: ['latin'],
//   variable: '--font-plus-jakarta-sans',
// });
// const staatliches = Staatliches({
//   weight: '400',
//   style: ['normal'],
//   subsets: ['latin'],
//   variable: '--font-staatliches',
// });

// SupabaseProvider needs to go in RootLayout because supabase-js needs to create the "supabase-auth-token" cookie for middleware auth to work.
// (we can get sb-refresh-token and sb-access-token via magic link but there has to be an unauthenticated root page for supabase-js to work in)

export default async function RootLayout({ children }: { children: ReactNode }) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  return (
    <html lang="en">
      {/* <body className={`${plusJakartaSans.variable} ${staatliches.variable}`}> */}\
      <body>
        <SupabaseProvider session={session}>
          {children}
        </SupabaseProvider>
      </body>
    </html>
  );
}
