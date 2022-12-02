-- inserting into department table
INSERT INTO department (name) VALUES ("Sales"),("Engineering"),("Finance"),("Legal");

-- inserting into roles table
Insert INTO roles (title, salary, department_id) value ("Sales Lead", 100000, 1),
						        ("Salespersoin", 80000, 1),
                                                        ("Lead Engineer", 150000, 2),
                                                        ("Software Engineer", 120000, 2),
                                                        ("Account Manager", 160000, 3),
                                                        ("Accountant", 125000, 3),
                                                        ("Legal Team Lead", 250000, 4),
                                                         ("Lawyer", 190000, 4);


-- inserting into employee table
insert into employee (first_name, last_name, role_id, manager_id) value ("John", "Doe", 1, null),
									("Mike", "Chan", 2, 1),
									("Ashley", "Rodriquez",3, null),
									("Kevin", "Tupik", 4, 3),
									("Kunal", "Singh", 5, null),
									("Malia", "Brown", 6, 5),
									("Sarah", "Lourd", 7, null),
									("Tom", "Allen", 8, 7);