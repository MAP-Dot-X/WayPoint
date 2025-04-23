// @ts-check
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { JinaEmbeddings } from "@langchain/community/embeddings/jina";

// Get the directory path of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Resolve the path to the .env file at the project root
const envPath = resolve(__dirname, '../../../../../.env');
config({ path: envPath });

// Configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key:', supabaseKey ? 'Key exists' : 'Key missing');

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing required environment variables. Check your .env file.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);
const TABLE_NAME = 'availability_v3_vectors';

// New Embedding model instance
const embeddings = new JinaEmbeddings({
    apiKey: process.env.NEXT_PUBLIC_JINA_API_TOKEN,
    model: "jina-clip-v2", // Optional, defaults to "jina-clip-v2"
});

async function generateEmbeddings() {
    const { data: rows, error } = await supabase
        .from(TABLE_NAME)
        .select('id, name') // Select id and the column to embed

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
            const output = await embeddings.embedQuery(textToEmbed);
            // Convert Float32Array to a standard array
            const embedding = Array.from(output);

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
            console.error(`Error processing row ${row.id} ('${row.name}'):`, embedError);
        }
         // Optional: Add a small delay to avoid overwhelming resources if running locally on many items
         // await new Promise(resolve => setTimeout(resolve, 50));
    }
    console.log('Embedding generation complete.');
}

// Add a simple function to test the connection
async function testConnection() {
  try {
    const { data, error } = await supabase.from(TABLE_NAME).select('count()', { count: 'exact' });
    if (error) throw error;
    console.log('Successfully connected to Supabase. Table row count:', data[0].count);
  } catch (err) {
    console.error('Error connecting to Supabase:', err.message);
  }
}

testConnection();
generateEmbeddings();