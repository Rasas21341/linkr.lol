// Add your Supabase project URL and anon key here
const SUPABASE_URL = 'https://fuqupdmftukfnxclocyz.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_EU_A6WflIqVR4ElNjVUeRA_b9TezHBY';

// Ensure Supabase is available before initializing
let supabaseClient = null;
if (typeof window !== 'undefined' && window.supabase) {
  supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
} else if (typeof supabase !== 'undefined') {
  supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
} else {
  throw new Error('Supabase library not loaded');
}

// Example: Fetch user profile by username
async function fetchUserProfile(username) {
  const { data, error } = await supabaseClient
    .from('profiles')
    .select('*')
    .eq('username', username)
    .single();
  if (error) throw error;
  return data;
}

// Example: Update user profile
async function updateUserProfile(username, profile) {
  const { data, error } = await supabaseClient
    .from('profiles')
    .update(profile)
    .eq('username', username);
  if (error) throw error;
  return data;
}

// Example: Insert or update user profile
async function insertUserProfile(profile) {
  console.log('Saving profile to Supabase:', profile); // Debug log
  const { data, error } = await supabaseClient
    .from('profiles')
    .upsert([profile], { onConflict: ['username'] }); // upsert with conflict on username
  if (error) throw error;
  return data;
}

// Register new user (username/password)
async function registerUser(user) {
  const { data, error } = await supabaseClient
    .from('users')
    .insert([user]);
  if (error) throw error;
  return data;
}