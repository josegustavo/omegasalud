-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Customers Table (Simplified)
create table public.customers (
  id uuid primary key default uuid_generate_v4(),
  phone text unique not null,
  name text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  last_order_at timestamp with time zone
);

-- Orders Table (Added order_code)
create table public.orders (
  id uuid primary key default uuid_generate_v4(),
  order_code text unique not null, -- Short unique code e.g. ORD-1234
  customer_id uuid references public.customers(id) not null,
  items jsonb not null,
  total numeric not null,
  status text default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS Policies
alter table public.customers enable row level security;
alter table public.orders enable row level security;

create policy "Allow public read access" on public.customers for select using (true);
create policy "Allow public read access" on public.orders for select using (true);
