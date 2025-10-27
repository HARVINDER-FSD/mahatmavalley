-- Create storage bucket for testimonial videos
insert into storage.buckets (id, name, public)
values ('testimonial-videos', 'testimonial-videos', true);

-- Allow public access to view videos
create policy "Public Access"
on storage.objects for select
using (bucket_id = 'testimonial-videos');

-- Allow authenticated users to upload videos (you can adjust this based on your needs)
create policy "Authenticated users can upload videos"
on storage.objects for insert
with check (
  bucket_id = 'testimonial-videos' 
  and auth.role() = 'authenticated'
);

-- Allow authenticated users to delete videos
create policy "Authenticated users can delete videos"
on storage.objects for delete
using (
  bucket_id = 'testimonial-videos' 
  and auth.role() = 'authenticated'
);