-- Grant the authenticated admin session (Supabase Auth) full read/write
-- access to every table, on top of the public-read-published policies from
-- 0001_init.sql. There is only one admin account and no public signup, so
-- "authenticated" here always means the site admin.

create policy "admin full access pages"         on pages         for all to authenticated using (true) with check (true);
create policy "admin full access page_sections" on page_sections for all to authenticated using (true) with check (true);
create policy "admin full access products"      on products      for all to authenticated using (true) with check (true);
create policy "admin full access activities"    on activities    for all to authenticated using (true) with check (true);
create policy "admin full access schools"       on schools       for all to authenticated using (true) with check (true);
create policy "admin full access media"         on media         for all to authenticated using (true) with check (true);
create policy "admin full access messages"      on messages      for all to authenticated using (true) with check (true);
create policy "admin full access settings"      on settings      for all to authenticated using (true) with check (true);
