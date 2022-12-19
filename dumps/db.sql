CREATE DATABASE store;

CREATE TABLE store.products (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    price DECIMAL(5, 2) NOT NULL,
    stock INTEGER NOT NULL
);

INSERT INTO store.products (name, price, stock) 
VALUES ('refrigerante', 3.5, 10), ('coxinha', 5.5, 7), ('misto quente', 12.0, 10)
;


CREATE TABLE store.customers (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(200) NOT NULL,
    password VARCHAR(100) NOT NULL
);

INSERT INTO store.customers (name, email, password) 
VALUES ('Emma', 'emma@mail.com', 1234), ('Oliver', 'oliver@mail.com', 1111), ('Amelia', 'amelia@mail.com', 5555);


CREATE TABLE store.sales (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    customer_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL, 
    quantity INTEGER NOT NULL,
    order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES store.customers (id),
    FOREIGN KEY (product_id) REFERENCES store.products (id)
);


INSERT INTO store.sales(customer_id, product_id, quantity)
VALUES (1,1, 1), (1, 2, 1), (2, 1, 2), (2, 3, 1), (3, 2, 2);