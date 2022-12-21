drop database if exists kittycafe;
create database kittycafe;
use kittycafe;

create table roles(
	id_role int auto_increment primary key,
    role varchar(20) not null
);

create table users(
	id_user int auto_increment primary key,
    username varchar(40) not null,
    password text not null,
    id_role int not null,
    status boolean not null,
    email varchar(40),
    phone_number varchar(15),
    constraint fk_role foreign key (id_role) references roles(id_role) 
);

create table categories(
	id_category int auto_increment primary key,
    title varchar(40) not null
);

create table promotions(
	id_promotion int auto_increment primary key,
    title varchar(80) not null,
    description text not null,
    start_date date not null,
    end_date date not null
);

create table products(
	id_product int auto_increment primary key,
    title varchar(80) not null,
    description text not null,
    price double not null,
    stock int,
    id_category int not null,
    constraint fk_category foreign key (id_category) references categories (id_category)
);

create table clients(
	id_client int auto_increment primary key,
    fullname varchar(40) not null,
    email varchar(20) not null,
    visits int
);

create table orders(
	id_order int auto_increment primary key,
    description text not null,
    date_order date not null,
    total double not null,
    id_client int not null,
    id_user int not null,
    constraint fk_client foreign key (id_client) references clients(id_client),
    constraint fk_user foreign key (id_user) references users(id_user)
); 

create table providers(
	id_provider int auto_increment primary key,
    fullname varchar(40) not null,
    address text not null,
    phone_number varchar(15) not null,
    provides varchar(40) not null
);

insert into roles(role) values("Empleado");
insert into roles(role) values("Supervisor");
insert into roles(role) values("Gerente");

/*Roles: 1-> Empleados (pedidos) 2-> Supervisor (productos, pedidos,proveedores) 3->Gerente (todo)*/
insert into users (username, password, id_role, status, email, phone_number) values ('mkebss', 'mkebss', 3, 1, 'jmadsec14@gmail.com','7771568481');
insert into users (username, password, id_role, status, email, phone_number) values ('smarianne', 'smarianne', 3, 1, 'asdads@gmail.com','7771234567');
insert into users (username, password, id_role, status, email, phone_number) values ('zesua', 'zesua', 2, 1, 'adpaaa@gmail.com','7775468312');
insert into users (username, password, id_role, status, email, phone_number) values ('rulas', 'rulas', 1, 1, 'pasodpaosd@gmail.com','7778945627');

insert into categories(title) values("Everyday B-Day Cakes");
insert into categories(title) values("Desserts");
insert into categories(title) values("Signature Salads");
insert into categories(title) values("Toasts");
insert into categories(title) values("Mocktails");
insert into categories(title) values("Tés y Frapps");
insert into categories(title) values("Cafe Creations");
insert into categories(title) values("Bebidas Frías");
insert into categories(title) values("Fuente de Sodas");
insert into categories(title) values("Toppings");

insert into promotions(title, description, start_date, end_date) values("Kitty Monday", "2x1 en Mocktails después de las 16:00 hrs.","2022-12-01","2023-02-28");
insert into promotions(title, description, start_date, end_date) values("Wednesday Keroppi Salads", "Todas las ensaladas a $80.00 todos los miércoles","2022-10-01","2022-12-31");
insert into promotions(title, description, start_date, end_date) values("Cinnamoroll Coffee", "Un Hello Kitty Capuccino gratis en la compra de un Cinnamoroll","2022-12-01","2022-12-31");

insert into products(title, description, price, stock, id_category) values("Hello Kitty Cheesecake (rebanada)", "Pastel de queso crema y mascarpone estilo americano acompañado de frambuesas frescas decorado con una pieza de chocolate macizo.", 135, 20, 1);
insert into products(title, description, price, stock, id_category) values("Hello Kitty Strawberry Cream Cake (rebanada)", "Bizcocho de fresas frescas con coulis dulce y crema tradicional, embetunado y decorado con piezas de chocolate blanco.", 140, 10, 1);
insert into products(title, description, price, stock, id_category) values("Hello Kitty All Day Breakfast Belgian Waffles", "Suave waffle estilo belga acompañado de compota de la casa de manzana, frutos rojos o piña.", 140, 30, 2);
insert into products(title, description, price, stock, id_category) values("Hello Kitty Smoked Salmon Toast", "Salmón ahumado acompañado de espinaca baby, puré de aguacate, cebolla morada en pluma, zumo de limón, jitomate cherry, sal, pimienta, brotes de cilantro y gotas de aceite de trufa negra, sobre una rebanada de pan de hogaza campesino tostado.", 190, 15, 4);

insert into clients(fullname, email, visits) values("Ximena Zepeda", "ximena@gmail.com", 8);
insert into clients(fullname, email, visits) values("Marianne Santos", "marianne@gmail.com", 3);
insert into clients(fullname, email, visits) values("Miguel Aguario", "miguel@gmail.com", 1);
insert into clients(fullname, email, visits) values("Raúl Domínguez", "raul@gmail.com", 5);

insert into orders(description, date_order, total, id_client, id_user) values("Orden Número 1", "2022-12-10", 215, 2, 4);
insert into orders(description, date_order, total, id_client, id_user) values("Orden Número 2", "2022-12-10", 200, 3, 4);
insert into orders(description, date_order, total, id_client, id_user) values("Orden Número 3", "2022-12-10", 820, 1, 4);
insert into orders(description, date_order, total, id_client, id_user) values("Orden Número 4", "2022-12-10", 150, 4, 4);

insert into providers(fullname, address, phone_number, provides) values("Bahama Heladería", "Esta es la direccion de Bahama Heladería", "777-369-35-48", "Toppings");
insert into providers(fullname, address, phone_number, provides) values("Semilla del Cielo", "Esta es la direccion de Semilla del Cielo", "777-389-36-98", "Café");
insert into providers(fullname, address, phone_number, provides) values("Pastelería Las Mimosas", "Esta es la direccion de Pastelería Las Mimosas", "777-743-56-98", "Pasteles");
insert into providers(fullname, address, phone_number, provides) values("Agua Bonafont", "Esta es la direccion de Bonafont", "777-963-85-21", "Agua embotellada");

delimiter //
create trigger update_visits
after insert on orders
for each row
begin
update clients set visits = visits + 1 where id_client = new.id_client;
end;

create or replace view get_orders as 
select orders.id_order as id, orders.description, orders.date_order, orders.total, clients.fullname as cliente, users.username as empleado from orders 
inner join clients on orders.id_client = clients.id_client inner join users on orders.id_user = users.id_user;