-- Products previously only modeled Coal (gcv/ash/moisture columns), but the
-- live Services page has three product verticals: Coal, Minerals, Salt.
-- Move to a category + generic specs list shape that fits all three.

alter table products add column if not exists category text not null default 'Coal';
alter table products add column if not exists specs jsonb not null default '[]'::jsonb;
alter table products add column if not exists coming_soon boolean not null default false;

-- Migrate existing gcv/ash/moisture data into the generic specs array so
-- nothing is lost, then drop the coal-only columns.
update products set specs = (
  select jsonb_agg(v) from (values
    ('GCV: ' || gcv),
    ('Ash: ' || ash),
    ('Moisture: ' || moisture)
  ) as t(v)
) where specs = '[]'::jsonb and gcv is not null;

alter table products drop column if exists gcv;
alter table products drop column if exists ash;
alter table products drop column if exists moisture;
