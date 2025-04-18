import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
const { pipeline, env } = await import('@xenova/transformers');

// Configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
env.allowLocalModels = true; // Allow caching models locally
env.backends.onnx.wasm.numThreads = 1; // Num of threads used on machine
const TABLE_NAME = 'availability_v3_vectors';
const EMBEDDING_MODEL = 'Xenova/all-MiniLM-L6-v2';

// Create a reusable pipeline
// Note: First run will download the model (cache it). Subsequent runs are faster.
console.log('Loading embedding model...');
const extractor = await pipeline('feature-extraction', EMBEDDING_MODEL, {
   quantized: true
});
console.log('Model loaded.');

async function generateEmbeddings() {
    const { data: rows, error } = await supabase
        .from(TABLE_NAME)
        .select('id, name') // Select id and the column to embed
        .is('embedding', null); // Only get rows without embeddings

    if (error) {
        console.error('Error fetching rows:', error); return;
    }
    if (!rows) {
        console.log('No rows need embedding.'); return;
    }

    console.log(`Found ${rows.length} rows to embed...`);

    for (const row of rows) {
        try {
            const textToEmbed = row.name;
            if (!textToEmbed || typeof textToEmbed !== 'string' || textToEmbed.trim() === '') {
                 console.warn(`Skipping row ${row.id} due to invalid/empty 'name'`);
                 continue;
            }

            // Generate embedding
            const output = await extractor(textToEmbed, { pooling: 'mean', normalize: true });
            // Convert Float32Array to a standard array
            const embedding = Array.from(output.data);

            const { error: updateError } = await supabase
                .from(TABLE_NAME)
                .update({ embedding: embedding })
                .eq('id', row.id);

            if (updateError) {
                console.error(`Error updating row ${row.id}:`, updateError.message);
            } else {
                console.log(`Successfully embedded row ${row.id}`);
            }
        } catch (embedError) {
            console.error(`Error processing row <span class="math-inline">\{row\.id\} \('</span>{row.name}'):`, embedError);
        }
         // Optional: Add a small delay to avoid overwhelming resources if running locally on many items
         // await new Promise(resolve => setTimeout(resolve, 50));
    }
    console.log('Embedding generation complete.');
}

generateEmbeddings();