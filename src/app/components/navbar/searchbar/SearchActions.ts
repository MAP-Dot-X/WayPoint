'use server'

import { JinaEmbeddings } from "@langchain/community/embeddings/jina";
import {supabase} from '@/app/lib/supabase';

// Configuration
const TABLE_NAME = 'availability_v3_vectors';

// Initialize Jina Embeddings model
const embeddings = new JinaEmbeddings({
  apiKey: process.env.NEXT_PUBLIC_JINA_API_TOKEN,
  model: "jina-clip-v2", // Using the same model as in jinaEmbeddingUtil.js
});

console.log('Jina embeddings model initialized.');

export async function queryEmbeddingAction(query: string): Promise<any[]> {
    if (!query || query.trim() === '') {
        return [];
    }
    
    try {
        // Generate embedding using Jina
        const embedding = await embeddings.embedQuery(query);
        
        console.log("Generated embedding for query:", query);
        
        const { data: documents, error } = await supabase.rpc('match_items', {
            query_embedding: embedding, // Pass the embedding you want to compare
            match_threshold: 0.35, // Choose an appropriate threshold for your data
            match_count: 10, // Choose the number of matches
        });
        
        if (error) {
            console.error("Error matching items:", error);
            throw error;
        }
        
        console.log(`Successfully got matches for: "${query}"`);
        return documents || [];
    } catch (error) {
        console.error("Error in queryEmbeddingAction:", error);
        return [];
    }
}
