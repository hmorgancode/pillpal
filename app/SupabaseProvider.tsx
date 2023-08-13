'use client';

import { createContext, useContext, useState, ReactNode, ReactElement, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { SupabaseClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/lib/database.types';

type MaybeSession = Session | null;

type SupabaseContext = {
  supabase: SupabaseClient<Database>,
  session: MaybeSession,
};

const Context = createContext<SupabaseContext | undefined>(undefined);

export function SupabaseProvider({ children, session }: { children: ReactNode, session: MaybeSession }) {
  const [supabase] = useState(() => createClientComponentClient<Database>());
  const router = useRouter();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      router.refresh();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, supabase]);

  return (
    <Context.Provider value={{ supabase, session }}>
      <>{children}</>
    </Context.Provider>
  );
}

export function useSupabase() {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error('useSupabase must be used inside SupabaseProvider');
  }
  return context;
}
