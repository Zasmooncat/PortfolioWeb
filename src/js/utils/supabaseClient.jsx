// ===============================
// utils/supabaseclient.jsx  (OPCIONAL/LEGADO)
// Mantener sincronizado con src/supabase/client.js o ELIMINAR si no se usa.
// ===============================
import { createClient as createClientLegacy } from '@supabase/supabase-js'

const supabaseUrlLegacy = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKeyLegacy = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase_legacy = createClientLegacy(supabaseUrlLegacy, supabaseAnonKeyLegacy)
