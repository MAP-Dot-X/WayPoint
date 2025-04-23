'use server'

import { supabase } from "@/app/lib/supabase";

export const getLocationAction = async (locationId: string) => {
    const { data, error } = await supabase
        .from(process.env.NEXT_PUBLIC_SUPABASE_TABLE!)
        .select("name, latitude, longitude")
        .eq("id", locationId)
        .maybeSingle();

    if (error || !data)
        console.error("Failed to fetch building data:", error);
    return data;
}