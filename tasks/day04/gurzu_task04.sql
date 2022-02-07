create table users (
	id int not null auto_increment,
	name varchar(30),
	primary key (id)
);

create table department (
	id int not null auto_increment ,
	name varchar(20),
	primary key (id)
);

create table user_department (
id int not null auto_increment ,
user_id int,
department_id int,
primary key (id),
foreign key (user_id) references users(id),
foreign key (department_id) references department(id)
);


insert into users (name) values ('frodo');
set @person_id = LAST_INSERT_ID();
insert ignore into department (name) values ('IT');
set @it_dpt_id = LAST_INSERT_ID();
insert ignore into user_department (user_id, department_id) values (@person_id, @it_dpt_id);
insert ignore into department (name) values ('Admin');
set @admin_dpt_id = LAST_INSERT_ID();
insert ignore into users (name) values ('sam');
set @person_id = LAST_INSERT_ID();
insert ignore into user_department (user_id, department_id) values (@person_id, @admin_dpt_id);
insert ignore into user_department (user_id, department_id) values (@person_id, @it_dpt_id);

select u.name, d.name as dpt_name from users u
left outer join user_department ud on u.id=ud.user_id
left outer join department d on ud.department_id=d.id;


