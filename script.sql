create table products
(
    id_product serial primary key,
    name       varchar(255) not null,
    price      integer      not null
);

create table commands
(
    id_command   serial primary key,
    date         timestamp default CURRENT_TIMESTAMP not null,
    client_email varchar(255)                        not null,
    id_product   integer                             not null,
    FOREIGN KEY (id_product) references products(id_product)
);