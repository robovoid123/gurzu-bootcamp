use gurzu_task5;

create table users (
	id int not null auto_increment,
	name varchar(250),
	email varchar(250) unique not null,
	password varchar(250),	
	address varchar(250),
	primary key (id)
);

insert into users (name, email, password, address) values 
('frodo', 'frodo@bagend.com', 'myprecious@123', 'shire'),
('sam', 'sam@sire.com', 'potatos@123', 'shire'),
('gandalf', 'gandalf@middleearth.com', 'toodoldforthisshit@123', 'middle earth'),
('merry', 'merry@sire.com', 'weneed2ndbreakfast@123', 'shire');


create table tasks (
	id int not null auto_increment,
	title varchar(250) not null,
	detail varchar(250),
	primary key (id)
);

create table user_task (
	id int not null auto_increment,
	user_id int,
	task_id int,
	primary key (id),
	foreign key (user_id) references users(id) on delete cascade,
	foreign key (task_id) references tasks(id)
);

insert into tasks (title, detail) values
('destroy ring', 'throw ring into mount doom'),
('unite men', 'bring all men of middle earth together to defeat saroun'),
('second breakfast', 'dont think other people know about second breakfast tho'),
('cook potato', 'boil em mash em stick em in a stew'),
('save middle earth', 'defeat the dark lord or say bye bye to middle earth'),
('leave middle earth', 'one way trip to the undying land');

insert into user_task (user_id, task_id) values 
(1, 1),
(1, 3),
(1, 5),
(1, 6),
(2, 3),
(2, 4),
(2, 5),
(3, 2),
(3, 5),
(3, 6),
(4, 3),
(4, 5);

select name, email, address, title as task_title, detail as task_detail
from tasks left outer join user_task on tasks.id = user_task.task_id 
left outer join users on user_task.user_id = users.id;