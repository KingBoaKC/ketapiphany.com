import { createBrowserClient } from '@supabase/ssr'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://nwrcubisqcjqbfvgdjrj.supabase.co'
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53cmN1YmlzcWNqcWJmdmdkanJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY1NDg4NTUsImV4cCI6MjA5MjEyNDg1NX0.P0KuLKvWi7-6yb_32rfnPqG72DQmqdWNCrTcC-fK0fA'

export function createClient() {
  return createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY)
}
