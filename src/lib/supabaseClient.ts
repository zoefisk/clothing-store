import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL ?? (() => { throw new Error("Environment variable SUPABASE_URL not found"); })();
const supabaseKey = process.env.SUPABASE_ANON_KEY ?? (() => { throw new Error("Environment variable SUPABASE_ANON_KEY not found"); })();
export const supabase = createClient(supabaseUrl, supabaseKey);

// Function to check database connection
async function checkDatabaseConnection() {
    try {
        const { error } = await supabase.from('products').select('*').limit(1);
        if (error) {
            console.error('Database connection failed:', error.message);
        } else {
            console.log('Database connection successful.');
        }
    } catch (err) {
        console.error('Unexpected error while checking database connection:', err);
    }
}

// Call the function to check the connection
checkDatabaseConnection();