import type { DataAdapter } from './adapter';
import { LocalAdapter } from './localAdapter';
import { SupabaseAdapter } from './supabaseAdapter';

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const usingSupabase = Boolean(url && key);

export const db: DataAdapter = usingSupabase
  ? new SupabaseAdapter(url!, key!)
  : new LocalAdapter();
