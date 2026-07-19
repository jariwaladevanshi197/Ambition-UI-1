-- The "media" bucket was created public (readable), but Supabase Storage
-- enforces its own RLS on storage.objects independent of the `media` table's
-- policies — without these, authenticated admin uploads fail with
-- "new row violates row-level security policy" even though bucket is public.

create policy "public read media objects"
  on storage.objects for select
  using (bucket_id = 'media');

create policy "authenticated upload media objects"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'media');

create policy "authenticated update media objects"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'media');

create policy "authenticated delete media objects"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'media');
