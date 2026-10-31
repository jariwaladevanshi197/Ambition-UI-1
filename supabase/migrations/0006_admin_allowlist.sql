-- 0002 granted full access to every `authenticated` user, which is only safe
-- while public signup is disabled in the Supabase dashboard. If signup is ever
-- left on, anyone can create an account with the anon key and read the
-- messages inbox or rewrite the site. Restrict admin access to an explicit
-- allowlist instead, so it no longer depends on that dashboard setting.
--
-- After applying, grant access with:  node scripts/grant_admin.mjs you@company.com

create table if not exists admins (
  user_id     uuid primary key references auth.users(id) on delete cascade,
  created_at  timestamptz not null default now()
);
-- No policies: the allowlist is managed only via SQL / the secret key.
alter table admins enable row level security;

create or replace function public.is_admin()
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

drop policy if exists "admin full access pages"         on pages;
drop policy if exists "admin full access page_sections" on page_sections;
drop policy if exists "admin full access products"      on products;
drop policy if exists "admin full access activities"    on activities;
drop policy if exists "admin full access schools"       on schools;
drop policy if exists "admin full access media"         on media;
drop policy if exists "admin full access messages"      on messages;
drop policy if exists "admin full access settings"      on settings;

create policy "admin full access pages"         on pages         for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admin full access page_sections" on page_sections for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admin full access products"      on products      for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admin full access activities"    on activities    for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admin full access schools"       on schools       for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admin full access media"         on media         for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admin full access messages"      on messages      for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admin full access settings"      on settings      for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "authenticated upload media objects" on storage.objects;
drop policy if exists "authenticated update media objects" on storage.objects;
drop policy if exists "authenticated delete media objects" on storage.objects;

create policy "admin upload media objects"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'media' and public.is_admin());

create policy "admin update media objects"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'media' and public.is_admin());

create policy "admin delete media objects"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'media' and public.is_admin());
