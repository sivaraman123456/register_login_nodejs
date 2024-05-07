CREATE DATABASE User;

CREATE Table Register (
user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
name varchar(255) not null,
email varchar(255) not null,
password varchar(255) not null

);