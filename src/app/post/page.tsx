import { supabase } from "../lib/supabase"

const SUPABASE_TABLE_NAME = process.env.NEXT_PUBLIC_SUPABASE_TABLE!;

// http://localhost:3000/post
// replace availability with db name
export default async function page() {
    const { data } = await supabase.from(SUPABASE_TABLE_NAME).select('*');
    return <pre>{JSON.stringify(data, null, 2)}</pre>
}