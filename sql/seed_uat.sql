DELETE FROM uat_products;
DELETE FROM uat_partners;
DELETE FROM uat_orders;
DELETE FROM uat_order_items;
DELETE FROM uat_order_log;

INSERT INTO prod_partners (code, name) VALUES ('GRE', 'GreenCard');

INSERT INTO prod_products (sku, title, price, currency, category, brand, stock, weight) VALUES ('asdf', 'sdfer', 1000, 'HUF', 'asdf', 'sdf', NULL, 12.4);

