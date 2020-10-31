DROP TABLE IF EXISTS uat_order_log;
DROP TABLE IF EXISTS uat_order_items;
DROP TABLE IF EXISTS uat_orders;
DROP TABLE IF EXISTS uat_customers;
DROP TABLE IF EXISTS uat_products;
DROP TABLE IF EXISTS uat_partners;

CREATE TABLE uat_partners(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    code VARCHAR(20),
    name VARCHAR(100),
    UNIQUE KEY `u_code` (code)
);

CREATE TABLE uat_products(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    partner_code VARCHAR(20),
    sku VARCHAR(100) NOT NULL,
    title VARCHAR(100) NOT NULL,
    price DECIMAL(15,2) NOT NULL,
    currency VARCHAR(10) NOT NULL,
    category VARCHAR(100), -- KLOR
    brand VARCHAR(100),
    stock INT,
    weight DECIMAL(10,3), -- in KG
    INDEX partner_ind (partner_code),
    FOREIGN KEY (partner_code)
        REFERENCES uat_partners(code)
        ON DELETE CASCADE
);

CREATE TABLE uat_customers(
    email VARCHAR(250) NOT NULL,
    partner_code VARCHAR(20) NOT NULL,
    newsletter CHAR(1) NOT NULL, -- Y, N
    company_name VARCHAR(250) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_ame VARCHAR(100) NOT NULL,
    phone VARCHAR(100) NOT NULL,
    address VARCHAR(250) NOT NULL,
    country_code CHAR(3) NOT NULL, -- ISO
    city VARCHAR(250) NOT NULL,
    region VARCHAR(250),
    zip VARCHAR(10),
    INDEX partner_ind (partner_code),
    registration_date DATETIME,
    UNIQUE KEY `u_email_partner` (email, partner_code),
    FOREIGN KEY (partner_code)
        REFERENCES uat_partners(code)
        ON DELETE CASCADE
);

CREATE TABLE uat_orders(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    order_id VARCHAR(20),
    partner_code VARCHAR(20),
    customer_email VARCHAR(250),
    order_status CHAR(15) NOT NULL, -- OPEN, ARCHIVED, CANCELED
    shipment_status CHAR(15) NOT NULL, -- PENDING, SHIPPED, PART_SHIPPED
    payment_status CHAR(15) NOT NULL, -- PENDING, AUTHORIZED, PAID, VOIDED, REFUNDED, UNPAID, PART_PAID, PART_REFUND
    payment_mode CHAR(15) NOT NULL, -- COD_CASH, COD_CARD, BANK_TRANSFER, CARD
    chargeback_status CHAR(15) NOT NULL, -- EMTPY, OPEN, SUBMITTED, WON, LOST
    delivery_mode CHAR(15), -- PERS_COLL, HOME, GLS, ...
    delivery_price DECIMAL(15,2) NOT NULL,
    delivery_currency VARCHAR(10) NOT NULL,
    billing_name VARCHAR(100) NOT NULL,
    billing_city VARCHAR(100) NOT NULL,
    billing_street VARCHAR(100) NOT NULL,
    billing_zip VARCHAR(5) NOT NULL,
    billing_is_company VARCHAR(1) NOT NULL, -- Y, N
    billing_tax_number VARCHAR(15),
    shipping_name VARCHAR(100) NOT NULL,
    shipping_city VARCHAR(100) NOT NULL,
    shipping_street VARCHAR(100) NOT NULL,
    shipping_zip VARCHAR(5) NOT NULL,
    shipping_remark VARCHAR(200),
    created_date DATETIME NOT NULL,
    creator VARCHAR(100) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    phone_country VARCHAR(5) NOT NULL,
    updated_date DATETIME,
    updater VARCHAR(100),
    INDEX partner_customer_ind (partner_code, customer_email),
    UNIQUE KEY `u_order_id` (order_id)
    FOREIGN KEY (partner_code, customer_email)
        REFERENCES uat_customers(partner_code, email)
        ON DELETE CASCADE
) AUTO_INCREMENT = 11512;

CREATE TABLE uat_order_items(
    order_id INT,
    position INT,
    sku VARCHAR(100) NOT NULL,
    price DECIMAL(15,2),
    currency VARCHAR(10),
    quantity INT,
    INDEX order_ind (order_id),
    FOREIGN KEY (order_id)
        REFERENCES uat_orders(id)
        ON DELETE CASCADE
);

CREATE TABLE uat_order_log(
    timestamp TIMESTAMP NOT NULL,
    author VARCHAR(100) NOT NULL,
    type CHAR(100) NOT NULL, -- CREATED, ...
    body VARCHAR(10000),
    order_id INT,
    INDEX order_ind (order_id),
    FOREIGN KEY (order_id)
        REFERENCES uat_orders(id)
        ON DELETE CASCADE
);

