import 'server-only';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
// import { ReactElement } from 'react';

import { MedInput } from './MedInput';

import type { Database } from '@/lib/database.types';

// do not cache this page
export const revalidate = 0;

// @TODO: Make RLS for insert using the check (user has not inserted more than 20 existing prescriptions)
// then have MedInput do an insert of the medication
// then give this page a list of all our medications
// THEN have the client generate a list of checks based purely on the medication
// THEN have the client use existing checks to populate the list first.

export default async function SouthHamptonOatsPage() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: { session } } = await supabase.auth.getSession();
  if (!session || session.user.email !== process.env.PILLPAL_ADMIN_EMAIL) {
    return <h1 className="p-4">Admin Only (sorry)</h1>;
  }
  return (
    <main className="w-full h-full min-h-screen flex flex-col text-white items-center bg-slate-700">
      <h2 className="my-12 font-bold text-2xl">Pill Pal Admin</h2>
      <MedInput />
      
    </main>
  );
}
