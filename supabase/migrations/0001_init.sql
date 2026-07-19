-- Ambition Coal & Mining — initial CMS schema
-- Mirrors src/components/admin/types.ts and the PageSection shape in
-- src/components/admin/sections/PagesSection.tsx.

create extension if not exists pgcrypto;

-- ── Pages & Sections ─────────────────────────────────────────────
create table if not exists pages (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  title       text not null,
  published   boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create table if not exists page_sections (
  id           uuid primary key default gen_random_uuid(),
  page_id      uuid not null references pages(id) on delete cascade,
  type         text not null check (type in ('hero','stats','cards','text','cta','image-text','gallery')),
  label        text not null,
  visible      boolean not null default true,
  position     integer not null default 0,
  -- hero / image-text
  headline     text,
  subtext      text,
  cta_text     text,
  cta_link     text,
  image        text,
  -- text
  heading      text,
  body         text,
  -- cta
  cta_heading  text,
  cta_body     text,
  cta_btn      text,
  -- variable-shape content
  stats        jsonb not null default '[]'::jsonb,   -- StatItem[]
  cards        jsonb not null default '[]'::jsonb,   -- CardItem[]
  gallery      jsonb not null default '[]'::jsonb,   -- GalleryItem[]
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
create index if not exists page_sections_page_id_idx on page_sections(page_id, position);

-- ── Products ──────────────────────────────────────────────────────
create table if not exists products (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  type          text not null,
  gcv           text,
  ash           text,
  moisture      text,
  applications  text,
  featured      boolean not null default false,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- ── Activities ────────────────────────────────────────────────────
create table if not exists activities (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  description  text not null,
  category     text not null,
  date         text not null,
  featured     boolean not null default false,
  published    boolean not null default true,
  emoji        text,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- ── Schools ───────────────────────────────────────────────────────
create table if not exists schools (
  id             uuid primary key default gen_random_uuid(),
  name           text not null,
  project_type   text not null,
  location       text not null,
  state          text not null,
  beneficiaries  integer not null default 0 check (beneficiaries >= 0),
  description    text,
  status         text not null default 'Active' check (status in ('Active','Inactive')),
  emoji          text,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

-- ── Media ─────────────────────────────────────────────────────────
create table if not exists media (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  type         text not null check (type in ('image','video')),
  folder       text,
  storage_path text,   -- path in the Supabase Storage bucket
  size         text,
  created_at   timestamptz not null default now()
);

-- ── Messages (contact form inbox) ───────────────────────────────────
create table if not exists messages (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  type        text,
  message     text not null,
  read        boolean not null default false,
  created_at  timestamptz not null default now()
);

-- ── Settings (single row) ────────────────────────────────────────
create table if not exists settings (
  id         boolean primary key default true check (id),  -- enforces exactly one row
  name       text not null default 'Ambition Coal & Mining',
  tagline    text,
  email      text,
  phone      text,
  address    text,
  linkedin   text,
  twitter    text,
  youtube    text,
  est_year   text,
  updated_at timestamptz not null default now()
);
insert into settings (id) values (true) on conflict (id) do nothing;

-- ── Row Level Security ────────────────────────────────────────────
-- Public (anon key) can only read published/visible content, and can only
-- insert into messages (contact form). All writes/admin reads go through
-- server-side code using the secret key, which bypasses RLS entirely.

alter table pages          enable row level security;
alter table page_sections  enable row level security;
alter table products       enable row level security;
alter table activities     enable row level security;
alter table schools        enable row level security;
alter table media          enable row level security;
alter table messages       enable row level security;
alter table settings       enable row level security;

create policy "public read published pages" on pages
  for select using (published = true);

create policy "public read visible sections" on page_sections
  for select using (
    visible = true
    and exists (select 1 from pages p where p.id = page_sections.page_id and p.published = true)
  );

create policy "public read products" on products
  for select using (true);

create policy "public read published activities" on activities
  for select using (published = true);

create policy "public read active schools" on schools
  for select using (status = 'Active');

create policy "public read media" on media
  for select using (true);

create policy "public read settings" on settings
  for select using (true);

create policy "public can submit messages" on messages
  for insert with check (true);
-- No select/update/delete policy on messages for anon — inbox stays private,
-- only readable via the secret-key-backed admin API.
