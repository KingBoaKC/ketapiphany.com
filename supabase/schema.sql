-- Run this in your Supabase SQL editor

create table if not exists posts (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default now(),
  author_name text not null,
  title text not null,
  content text,
  image_url text,
  post_type text not null check (post_type in ('image', 'text')),
  category text not null check (category in ('art', 'poetry', 'journal', 'story')),
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  moderator_notes text
);

-- Enable RLS
alter table posts enable row level security;

-- Public can read approved posts
create policy "approved posts are public"
  on posts for select
  using (status = 'approved');

-- Anyone can insert (submit) posts
create policy "anyone can submit"
  on posts for insert
  with check (true);

-- Service role can do everything (for admin panel)
-- This is handled by using the service role key server-side

-- Storage bucket for images
insert into storage.buckets (id, name, public)
values ('submissions', 'submissions', true)
on conflict do nothing;

-- Allow anyone to upload to submissions bucket
create policy "anyone can upload images"
  on storage.objects for insert
  with check (bucket_id = 'submissions');

-- Public read access to submissions bucket
create policy "public can view images"
  on storage.objects for select
  using (bucket_id = 'submissions');

-- Reports table (for flagged content)
create table if not exists reports (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default now(),
  post_id uuid references posts(id) on delete cascade,
  reason text not null
);

-- Only service role can read reports (admin panel)
alter table reports enable row level security;

-- Anyone can submit a report
create policy "anyone can report"
  on reports for insert
  with check (true);
