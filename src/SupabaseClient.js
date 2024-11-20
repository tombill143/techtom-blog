// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Correctly passing Supabase URL and Key
const supabase = createClient(
    'https://jfjoidnbttulojznfujf.supabase.co',  // Supabase URL
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impmam9pZG5idHR1bG9qem5mdWpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIwNDE3MzQsImV4cCI6MjA0NzYxNzczNH0.kTMIlFruZd1XQ9nEgtuj6JkRlePyO5VP0n_IvWuD1KM'  // Supabase Key
); 

export default supabase;
