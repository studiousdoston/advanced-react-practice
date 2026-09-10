import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://rvsytuzretlkiueladtr.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2c3l0dXpyZXRsa2l1ZWxhZHRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg5NzM0MTMsImV4cCI6MjEwNDU0OTQxM30.AGsG20xwdoeSriaaLBf-y_OhIjaiKilDp3u4vRbaSDI";

const supabase = createClient(supabaseUrl, supabaseKey!);

export default supabase;
