import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://iubiwzhybqztzgmwcfui.supabase.co';
const supabaseAnonKey = 'sb_publishable_3RDIkZi2ORL_VjWcR5Ao-g_F_SMObfl';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
