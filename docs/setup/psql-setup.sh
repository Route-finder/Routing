#!/bin/bash

# Enter heroku's psql shell
heroku pg:psql

# Re-Create tables
create table floorspreus ( shelves json NOT NULL, floor int NOT NULL, mincode varchar(8) NOT NULL ) ;

create table booklist IF NOT EXISTS (
    isbn INT PRIMARY KEY,
    author VARCHAR(50),
    title VARCHAR(150),
    pub_year INT,
    call_no VARCHAR(40)
);
