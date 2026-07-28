import type { DataAdapter } from './adapter';
import { LocalAdapter } from './localAdapter';
import { SupabaseAdapter } from './supabaseAdapter';
import { supabase, usingSupabase } from './supabaseClient';

export { usingSupabase };

export const db: DataAdapter = usingSupabase
  ? new SupabaseAdapter(supabase!)
  : new LocalAdapter();
