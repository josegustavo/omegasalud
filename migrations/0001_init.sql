-- Migration number: 0001 	 2025-11-22T00:00:00.000Z
-- Customers Table
CREATE TABLE customers (
  id TEXT PRIMARY KEY, -- UUID stored as text
  phone TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now')) NOT NULL,
  last_order_at TEXT
);

-- Orders Table
CREATE TABLE orders (
  id TEXT PRIMARY KEY, -- UUID stored as text
  order_code TEXT UNIQUE NOT NULL,
  customer_id TEXT NOT NULL,
  items TEXT NOT NULL, -- JSON stored as text
  total REAL NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TEXT DEFAULT (datetime('now')) NOT NULL,
  FOREIGN KEY (customer_id) REFERENCES customers(id)
);

-- Indexes for performance
CREATE INDEX idx_orders_customer_id ON orders(customer_id);
CREATE INDEX idx_customers_phone ON customers(phone);
