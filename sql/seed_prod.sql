DELETE FROM prod_products;
DELETE FROM prod_partners;
DELETE FROM prod_orders;
DELETE FROM prod_order_items;
DELETE FROM prod_order_log;

INSERT INTO prod_partners (code, name) VALUES ('GRE', 'GreenCard');

INSERT INTO prod_products (sku, title, price, currency, category, brand, stock, weight) VALUES ('asdf', 'sdfer', 1000, 'HUF', 'asdf', 'sdf', NULL, 12.4);

