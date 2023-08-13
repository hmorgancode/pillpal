import 'server-only';

// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
// import { headers, cookies } from 'next/headers';
// import { ReactElement } from 'react';

// import { Inter } from 'next/font/google';

// import type { Database } from '@/lib/database.types';

// do not cache this page
export const revalidate = 0;

export default async function SouthHamptonOatsPage() {
  // const supabase = createServerComponentClient<Database>({
  //   headers,
  //   cookies,
  // });
  // const { data: { session } } = await supabase.auth.getSession();
  return (
    <main className="w-full h-full min-h-screen flex flex-col text-white items-center bg-slate-700">
      <h2 className="mt-12 font-bold text-2xl">PillPal</h2>
      <p className="my-12 w-5/6">
        PillPal
      </p>
    </main>
  );
}
