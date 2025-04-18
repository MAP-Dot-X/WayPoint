'use server'

const { pipeline, env } = await import('@xenova/transformers');
import {supabase} from '@/app/lib/supabase';

// Configuration
env.allowLocalModels = true; // Allow caching models locally
env.backends.onnx.wasm.numThreads = 1; // Num of threads used on machine
const EMBEDDING_MODEL = 'Xenova/all-MiniLM-L6-v2';

// Create a reusable pipeline
// Note: First run will download the model (cache it). Subsequent runs are faster.
console.log('Loading embedding model...');
const extractor = await pipeline('feature-extraction', EMBEDDING_MODEL, {
   quantized: true
});
console.log('Model loaded.');

export async function queryEmbeddingAction(query: string): Promise<any[]> {
    // Generate embedding
    const output = await extractor(query, { pooling: 'mean', normalize: true });
    // Convert Float32Array to a standard array
    const embedding = Array.from(output.data);

    console.log("Embedding", embedding);

    const { data: documents } = await supabase.rpc('match_items', {
        query_embedding: embedding, // Pass the embedding you want to compare
        match_threshold: 0.30, // Choose an appropriate threshold for your data
        match_count: 10, // Choose the number of matches
        })

    console.log(`Successfully got embeddings for: ${query}`);

    return new Promise((resolve, reject) => {
        if (documents) {
            console.log("Documents:", documents);
            resolve(documents);
        }
        else {
            reject(new Error('No documents found'));
        }
    });

}
console.log('Query embedding generation complete.');
