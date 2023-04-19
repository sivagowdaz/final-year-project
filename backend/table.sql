create database asub;


create table admin(name varchar(30),
email varchar(30) unique, 
admin_id char(10) primary key);
create table department(name varchar(30), 
department_id char(10) primary key, 
admin_id char(10) references admin(admin_id) ondelete cascade);


create table classroom(name varchar(30),
classroom_id char(10) primary key, 
teacher_id char(10) references teacher(teacher_id) on delete cascade, 
number_of_students numeric(3, 0) default 0);


create table student(name varchar(30), 
email varchar(30) unique, 
student_id char(10) primary key, 
classroom_id char(10) references classroom(classroom_id) on delete cascade, 
password varchar(300));


create table subject(name varchar(50), 
subject_id char(10) primary key, 
classroom_id char(10) references classroom(classroom_id) on delete cascade);


create table teacher(name varchar(30), 
email varchar(30) unique, 
password varchar(300) not null, 
is_class_adviser boolean default false, 
teacher_id char(10) primary key, 
department_id char(10) references department(department_id) on delete cascade);