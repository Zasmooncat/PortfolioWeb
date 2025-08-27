// ===============================
// src/supabase/client.js
// ===============================
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
// ⚠️ En frontend NUNCA uses service_key. Debe ser el ANON.
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// console.log("🔧 Configuración Supabase:");
// console.log("📍 URL:", supabaseUrl);
// console.log("🔑 ANON Key existe:", !!supabaseAnonKey);
// console.log(
//   "🔑 ANON Key preview:",
//   supabaseAnonKey ? `${supabaseAnonKey.substring(0, 10)}...` : 'MISSING'
// );

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Variables de entorno de Supabase no encontradas');
  console.log('VITE_SUPABASE_URL:', supabaseUrl);
  console.log('VITE_SUPABASE_ANON_KEY existe:', !!supabaseAnonKey);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true, // permite gestión automática del email link si lo usas
  },
});

console.log("✅ Cliente creado:", !!supabase);

