-- =====================================================
-- EBRACK - Supabase schema + RLS + admin auth RPCs
-- Run this in Supabase SQL Editor
-- =====================================================

-- =====================================================
-- Shared helper: touch updated_at on row update
-- =====================================================
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

-- =====================================================
-- 1) admin table (plaintext password per request)
-- =====================================================
-- Drop old admin table if it exists (previous version used password_hash column)
drop table if exists public.admin cascade;

create table public.admin (
  id          bigint generated always as identity primary key,
  email       text unique not null,
  password    text not null,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

drop trigger if exists admin_touch_updated on public.admin;
create trigger admin_touch_updated
  before update on public.admin
  for each row execute function public.touch_updated_at();

-- RLS on: no policies => anon has zero direct access.
-- Only SECURITY DEFINER RPCs below can read/write the admin table.
alter table public.admin enable row level security;

-- Seed the initial admin (matches .env)
insert into public.admin (email, password)
values ('ebrackassessoria@gmail.com', 'qweQWE123!@#')
on conflict (email) do update set password = excluded.password;

-- =====================================================
-- 2) RPC: admin_login(email, password) -> { id, email } or empty
-- =====================================================
create or replace function public.admin_login(p_email text, p_password text)
returns table (id bigint, email text)
language plpgsql
security definer
set search_path = public
as $$
begin
  return query
    select a.id, a.email
    from public.admin a
    where a.email = p_email
      and a.password = p_password;
end $$;

revoke all on function public.admin_login(text, text) from public;
grant execute on function public.admin_login(text, text) to anon, authenticated;

-- =====================================================
-- 3) RPC: admin_change_password(email, old, new) -> boolean
-- =====================================================
create or replace function public.admin_change_password(
  p_email text,
  p_old_password text,
  p_new_password text
) returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_found int;
begin
  if length(p_new_password) < 6 then
    raise exception 'A nova senha deve ter ao menos 6 caracteres';
  end if;

  update public.admin
     set password = p_new_password
   where email = p_email
     and password = p_old_password;

  get diagnostics v_found = row_count;
  return v_found > 0;
end $$;

revoke all on function public.admin_change_password(text, text, text) from public;
grant execute on function public.admin_change_password(text, text, text) to anon, authenticated;

-- =====================================================
-- 4) news table
-- =====================================================
create table if not exists public.news (
  id           bigint generated always as identity primary key,
  title        text not null,
  summary      text,
  category     text,
  icon         text,
  read_time    text,
  content      text,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

drop trigger if exists news_touch_updated on public.news;
create trigger news_touch_updated
  before update on public.news
  for each row execute function public.touch_updated_at();

alter table public.news enable row level security;

drop policy if exists "news_public_read"   on public.news;
drop policy if exists "news_public_insert" on public.news;
drop policy if exists "news_public_update" on public.news;
drop policy if exists "news_public_delete" on public.news;

create policy "news_public_read"   on public.news for select using (true);
create policy "news_public_insert" on public.news for insert with check (true);
create policy "news_public_update" on public.news for update using (true) with check (true);
create policy "news_public_delete" on public.news for delete using (true);

-- Optional sample row so /mercado is not empty
insert into public.news (title, summary, category, icon, read_time, content)
values (
  'Nova Lei de Licitações: o que sua empresa precisa saber',
  'Entenda as principais mudanças trazidas pela Lei 14.133 e como se preparar.',
  'Análise Jurídica',
  'fas fa-newspaper',
  '5 min de leitura',
  'Conteúdo completo da notícia aqui.'
)
on conflict do nothing;

-- =====================================================
-- 5) analytics_events table
--    One row per pageview. Duration + scroll_depth are
--    updated when the user leaves the page.
-- =====================================================
create table if not exists public.analytics_events (
  id                bigint generated always as identity primary key,
  session_id        text not null,
  event_type        text not null default 'pageview',
  path              text,
  article_id        bigint references public.news(id) on delete set null,
  duration_seconds  int not null default 0,
  scroll_depth      int not null default 0,
  read_flag         boolean not null default false,
  user_agent        text,
  referrer          text,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create index if not exists idx_analytics_session   on public.analytics_events (session_id);
create index if not exists idx_analytics_article   on public.analytics_events (article_id);
create index if not exists idx_analytics_created   on public.analytics_events (created_at desc);

drop trigger if exists analytics_touch_updated on public.analytics_events;
create trigger analytics_touch_updated
  before update on public.analytics_events
  for each row execute function public.touch_updated_at();

alter table public.analytics_events enable row level security;

drop policy if exists "analytics_public_insert" on public.analytics_events;
drop policy if exists "analytics_public_update" on public.analytics_events;
drop policy if exists "analytics_public_select" on public.analytics_events;

-- Anyone can insert their own pageview and update its duration/scroll.
create policy "analytics_public_insert" on public.analytics_events for insert with check (true);
create policy "analytics_public_update" on public.analytics_events for update using (true) with check (true);
-- SELECT is open too so the admin dashboard can read aggregates client-side.
-- (Aggregates are not sensitive; if you want to lock this down later, wrap reads in SECURITY DEFINER RPCs.)
create policy "analytics_public_select" on public.analytics_events for select using (true);
