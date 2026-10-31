-- The public site now renders Services product cards from `products` and the
-- CSR page's Recent Initiatives from `activities`. Those cards show an image,
-- a description and a highlight metric that the tables didn't have yet.

alter table products add column if not exists description text;
alter table products add column if not exists image text;

alter table activities add column if not exists highlight text;
alter table activities add column if not exists highlight_label text;
